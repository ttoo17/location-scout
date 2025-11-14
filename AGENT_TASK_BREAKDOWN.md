# 🚀 PHILIPPINE SCENE FINDER - AGENT TASK BREAKDOWN

**Project**: Location Scout Marketplace
**Status**: Needs Critical Fixes
**Total Issues**: 49 identified
**Priority**: Fix ALL broken functionality first, then polish

---

## 📊 QUICK STATS

- **Critical Blockers**: 3 tasks
- **High Priority**: 7 tasks
- **Medium Priority**: 23 tasks
- **Low Priority**: 16 tasks
- **Total Agents Needed**: ~30 parallel tasks possible

---

## 🎯 EXECUTION STRATEGY

**Phase 1**: Critical blockers (3 agents)
**Phase 2**: High priority fixes (7 agents)
**Phase 3**: Medium priority (15 agents in parallel)
**Phase 4**: Polish & testing (10+ agents)

---

# 🔴 PHASE 1: CRITICAL BLOCKERS (DO FIRST)

## AGENT-001: Install Dependencies
**Priority**: 🔴 CRITICAL
**Estimated Time**: 2 minutes
**Files**: `package.json`

### Task
Install all project dependencies

### Steps
1. Run: `npm install` or `bun install`
2. Verify `node_modules` exists
3. Run: `npm run dev` to test build
4. Report any installation errors

### Success Criteria
- [ ] `node_modules` directory exists
- [ ] `npm run dev` starts without errors
- [ ] App loads at localhost

---

## AGENT-002: Fix AuthContext Missing User Property
**Priority**: 🔴 CRITICAL
**Estimated Time**: 15 minutes
**Files**:
- `src/contexts/AuthContext.tsx`
- `src/components/Navigation.tsx`

### Task
Add missing `user` property to AuthContext that Navigation.tsx is trying to access

### Current Issue
```typescript
// AuthContext.tsx - MISSING user property
interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
  // user is MISSING but Navigation.tsx uses it!
}

// Navigation.tsx line 42 - BREAKS
const { isAuthenticated, userRole, logout, user } = useAuth();
// Then uses: user?.avatar, user?.name, user?.email
```

### Steps
1. Open `src/contexts/AuthContext.tsx`
2. Create User interface:
   ```typescript
   interface User {
     id: number;
     name: string;
     email: string;
     avatar?: string;
     role: UserRole;
   }
   ```
3. Update AuthContextType:
   ```typescript
   interface AuthContextType {
     isAuthenticated: boolean;
     userRole: UserRole;
     user: User | null;  // ADD THIS
     login: (role: UserRole, user?: User) => void;
     logout: () => void;
   }
   ```
4. Update AuthProvider state:
   ```typescript
   const [user, setUser] = useState<User | null>(null);
   ```
5. Update login function to accept and set user
6. Update logout to clear user: `setUser(null)`
7. Add user to context value
8. Test in Navigation.tsx

### Success Criteria
- [ ] No TypeScript errors in AuthContext.tsx
- [ ] No TypeScript errors in Navigation.tsx
- [ ] User avatar/name displays when logged in
- [ ] Navigation menu works without crashes

---

## AGENT-003: Fix BookingModal Type Mismatch
**Priority**: 🔴 CRITICAL
**Estimated Time**: 20 minutes
**Files**:
- `src/components/BookingModal.tsx`
- `src/pages/ScoutProfile.tsx`

### Task
Fix type mismatch where ScoutProfile passes incomplete Location object to BookingModal

### Current Issue
```typescript
// BookingModal expects full Location interface:
interface Location {
  id: string;
  title: string;
  heroImage: string;
  price: number;
  location: string;
  rating: number;
  reviews: number;
  metadata?: LocationMetadata;
}

// But ScoutProfile.tsx line 422-432 passes:
<BookingModal
  location={{
    id: scout.id,
    title: `Book ${scout.name}`,
    location: scout.location,
    price: 0
  }}
  // Missing: heroImage, rating, reviews, metadata
/>
```

### Steps - OPTION A (Recommended)
1. Make BookingModal properties optional:
   ```typescript
   interface BookingModalProps {
     location: {
       id: string;
       title: string;
       heroImage?: string;  // Make optional
       price?: number;      // Make optional
       location: string;
       rating?: number;     // Make optional
       reviews?: number;    // Make optional
       metadata?: LocationMetadata;
     };
     isOpen: boolean;
     onClose: () => void;
   }
   ```
2. Update BookingModal to handle missing properties with defaults
3. Test booking flow from ScoutProfile

### Steps - OPTION B (Alternative)
1. Update ScoutProfile to pass complete Location object:
   ```typescript
   <BookingModal
     location={{
       id: scout.id,
       title: `Book ${scout.name}`,
       location: scout.location,
       price: scout.hourlyRate || 0,
       heroImage: scout.avatar || '',
       rating: scout.rating || 0,
       reviews: scout.reviews || 0,
     }}
   />
   ```

### Success Criteria
- [ ] No TypeScript errors in BookingModal.tsx
- [ ] No TypeScript errors in ScoutProfile.tsx
- [ ] Booking modal opens without crashes
- [ ] Can complete booking flow

---

# 🟠 PHASE 2: HIGH PRIORITY FIXES

## AGENT-004: Enable TypeScript Strict Mode
**Priority**: 🟠 HIGH
**Estimated Time**: 30 minutes
**Files**: `tsconfig.json`, potentially many .tsx files

### Task
Enable strict TypeScript mode to catch type errors

### Current Issue
```json
{
  "noImplicitAny": false,
  "strictNullChecks": false,
  "noUnusedParameters": false,
  "noUnusedLocals": false
}
```

### Steps
1. Open `tsconfig.json`
2. Update compiler options:
   ```json
   {
     "strict": true,
     "noUnusedLocals": true,
     "noUnusedParameters": true,
     "noImplicitAny": true,
     "strictNullChecks": true
   }
   ```
3. Run `npm run build` to see all errors
4. Fix errors incrementally:
   - Add null checks where needed
   - Type function parameters
   - Remove unused variables
5. Commit when all errors fixed

### Success Criteria
- [ ] `strict: true` enabled in tsconfig.json
- [ ] `npm run build` succeeds with no errors
- [ ] App runs without runtime errors

---

## AGENT-005: Create Missing Navigation Pages
**Priority**: 🟠 HIGH
**Estimated Time**: 45 minutes
**Files**: Create 3 new pages + update `src/App.tsx`

### Task
Create missing pages that Navigation links to

### Missing Pages
1. `/profile` - User profile page
2. `/favorites` - Saved/favorited locations
3. `/my-locations` - User's uploaded locations

### Steps

#### 1. Create `/src/pages/Profile.tsx`
```typescript
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function Profile() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        {/* Add profile edit form */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt={user?.name}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          {/* Add edit form fields */}
        </div>
      </div>
    </DashboardLayout>
  );
}
```

#### 2. Create `/src/pages/Favorites.tsx`
```typescript
import { useState } from "react";
import { LocationCard } from "@/components/LocationCard";
import { mockLocations } from "@/data/mockData";

export default function Favorites() {
  // TODO: Get actual favorites from user data
  const [favorites] = useState(mockLocations.slice(0, 4));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No favorites yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

#### 3. Create `/src/pages/MyLocations.tsx`
```typescript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LocationCard } from "@/components/LocationCard";
import { Plus } from "lucide-react";
import { mockLocations } from "@/data/mockData";

export default function MyLocations() {
  const navigate = useNavigate();
  // TODO: Filter by actual user's locations
  const [myLocations] = useState(mockLocations.slice(0, 3));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Locations</h1>
          <Button onClick={() => navigate('/upload')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Location
          </Button>
        </div>

        {myLocations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't uploaded any locations yet</p>
            <Button onClick={() => navigate('/upload')}>
              Upload Your First Location
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

#### 4. Update `src/App.tsx` with routes
Add these routes:
```typescript
<Route path="/profile" element={<Profile />} />
<Route path="/favorites" element={<Favorites />} />
<Route path="/my-locations" element={<MyLocations />} />
```

### Success Criteria
- [ ] All 3 pages created
- [ ] Routes added to App.tsx
- [ ] Navigation menu links work (no 404s)
- [ ] Pages render without errors
- [ ] Protected routes require authentication

---

## AGENT-006: Add Admin Role Protection
**Priority**: 🟠 HIGH
**Estimated Time**: 15 minutes
**Files**: `src/pages/AdminDashboard.tsx`

### Task
Add role-based access control to admin dashboard

### Current Issue
```typescript
// Only checks isAuthenticated, not role!
if (!isAuthenticated) {
  navigate("/");
  return;
}
// Any logged-in user can access admin dashboard
```

### Steps
1. Open `src/pages/AdminDashboard.tsx`
2. Update the authentication check:
   ```typescript
   useEffect(() => {
     if (!isAuthenticated) {
       navigate("/");
       return;
     }

     // ADD THIS:
     if (userRole !== 'scout' && userRole !== 'admin') {
       navigate("/");
       toast({
         title: "Access Denied",
         description: "You don't have permission to access this page",
         variant: "destructive"
       });
       return;
     }
   }, [isAuthenticated, userRole, navigate]);
   ```
3. Test with different user roles

### Success Criteria
- [ ] Regular users redirected from /admin
- [ ] Only scouts/admins can access dashboard
- [ ] Toast notification shown on denied access
- [ ] No console errors

---

## AGENT-007: Fix Scout Profile Location Filtering
**Priority**: 🟠 HIGH
**Estimated Time**: 20 minutes
**Files**: `src/pages/ScoutProfile.tsx`

### Task
Fix scout profile showing ALL locations instead of only scout's locations

### Current Issue
```typescript
// Line 68-71 - Shows ALL locations!
const scoutLocations = mockLocations || [];
// Should filter by scoutId
```

### Steps
1. Open `src/pages/ScoutProfile.tsx`
2. Replace line 68-71 with:
   ```typescript
   const scoutLocations = useMemo(() => {
     if (!scout) return [];
     // Filter mockLocations by scout/owner
     return mockLocations.filter(loc =>
       loc.scoutId === scout.id ||
       loc.ownerId === scout.id
     );
   }, [scout]);
   ```
3. If locations don't have scoutId/ownerId, add them to mock data
4. Update `src/data/mockData.ts` to add scoutId to locations
5. Test that each scout only shows their locations

### Success Criteria
- [ ] Scout profile shows only their locations
- [ ] Different scouts show different locations
- [ ] No locations shown if scout has none
- [ ] Performance is acceptable (useMemo used)

---

## AGENT-008: Fix Date Picker Hardcoded Dates
**Priority**: 🟠 HIGH
**Estimated Time**: 15 minutes
**Files**: `src/components/BookingModal.tsx`

### Task
Replace hardcoded 2024/2025 dates with dynamic dates

### Current Issue
```typescript
// Lines with hardcoded past dates:
unavailableDates: [
  new Date(2024, 11, 15),  // December 2024 - past!
  new Date(2025, 0, 1),    // January 2025 - past!
]
```

### Steps
1. Open `src/components/BookingModal.tsx`
2. Create dynamic unavailable dates:
   ```typescript
   const generateUnavailableDates = () => {
     const today = new Date();
     const dates = [];

     // Example: Block every Sunday for next 3 months
     for (let i = 0; i < 90; i++) {
       const date = new Date(today);
       date.setDate(today.getDate() + i);
       if (date.getDay() === 0) { // Sunday
         dates.push(date);
       }
     }

     return dates;
   };
   ```
3. Use in component:
   ```typescript
   const [unavailableDates] = useState(generateUnavailableDates());
   ```
4. OR accept as prop from parent component
5. Test date picker shows correct unavailable dates

### Success Criteria
- [ ] No hardcoded 2024/2025 dates
- [ ] Unavailable dates are dynamic
- [ ] Date picker works for future bookings
- [ ] Past dates are disabled

---

## AGENT-009: Standardize ID Types
**Priority**: 🟠 HIGH
**Estimated Time**: 30 minutes
**Files**: Multiple files

### Task
Convert all IDs to consistent string type throughout app

### Current Issues
- `mockData.ts` uses strings: `id: property.id.toString()`
- `mockDataService.ts` uses numbers: `getProperty(id: number)`
- Routes use strings: `/location/:id`
- Type definitions conflict

### Steps
1. Update `src/services/mockDataService.ts`:
   ```typescript
   // Change all methods from:
   getProperty(id: number)
   // To:
   getProperty(id: string)

   // Update find logic:
   return this.properties.find(p => p.id.toString() === id);
   ```

2. Update all callers:
   ```typescript
   // Before:
   const property = mockDataService.getProperty(Number(id));

   // After:
   const property = mockDataService.getProperty(id);
   ```

3. Update type definitions:
   ```typescript
   interface Location {
     id: string; // was number
     // ...
   }
   ```

4. Search for all `Number(id)` conversions and remove
5. Test all pages that use IDs

### Success Criteria
- [ ] All IDs are strings
- [ ] No `Number()` conversions needed
- [ ] Routes work correctly
- [ ] No type errors
- [ ] Data lookup works

---

## AGENT-010: Implement Upload Location Save
**Priority**: 🟠 HIGH
**Estimated Time**: 25 minutes
**Files**: `src/pages/UploadLocation.tsx`

### Task
Actually save uploaded locations instead of just navigating away

### Current Issue
```typescript
// Line 69 - Does nothing!
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Submit location data to backend
  navigate('/');
};
```

### Steps
1. Open `src/pages/UploadLocation.tsx`
2. Import mockDataService
3. Create location object and save:
   ```typescript
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();

     try {
       const newLocation = {
         id: Date.now().toString(),
         title: formData.title,
         location: formData.location,
         price: Number(formData.price),
         description: formData.description,
         images: formData.images || [],
         heroImage: formData.images?.[0] || '',
         category: formData.category,
         amenities: formData.amenities,
         rules: formData.rules?.split('\n') || [],
         rating: 0,
         reviews: 0,
         availability: 'available',
         createdAt: new Date().toISOString(),
       };

       // Save to localStorage
       const existing = JSON.parse(localStorage.getItem('uploadedLocations') || '[]');
       existing.push(newLocation);
       localStorage.setItem('uploadedLocations', JSON.stringify(existing));

       // Show success toast
       toast({
         title: "Success!",
         description: "Your location has been uploaded successfully",
       });

       // Navigate after short delay
       setTimeout(() => navigate('/my-locations'), 1000);

     } catch (error) {
       toast({
         title: "Error",
         description: "Failed to upload location",
         variant: "destructive"
       });
     }
   };
   ```

4. Update MyLocations page to load from localStorage
5. Test upload flow

### Success Criteria
- [ ] Form submission saves to localStorage
- [ ] Success toast appears
- [ ] Navigates to my-locations
- [ ] Uploaded location appears in list
- [ ] Data persists on refresh

---

# 🟡 PHASE 3: MEDIUM PRIORITY FIXES

## AGENT-011: Add Search Filter URL Persistence
**Priority**: 🟡 MEDIUM
**Estimated Time**: 30 minutes
**Files**: `src/pages/Index.tsx`

### Task
Save filter state in URL params so filters persist on navigation

### Steps
1. Use React Router's useSearchParams
2. Update filters to read/write URL params:
   ```typescript
   const [searchParams, setSearchParams] = useSearchParams();

   // Read from URL
   const [searchQuery, setSearchQuery] = useState(
     searchParams.get('search') || ''
   );

   // Update URL when filter changes
   const handleSearchChange = (value: string) => {
     setSearchQuery(value);
     const newParams = new URLSearchParams(searchParams);
     if (value) {
       newParams.set('search', value);
     } else {
       newParams.delete('search');
     }
     setSearchParams(newParams);
   };
   ```
3. Apply to all filters (category, price, location)
4. Test sharing filtered URL

### Success Criteria
- [ ] Filters appear in URL
- [ ] Sharing URL preserves filters
- [ ] Back/forward buttons work
- [ ] Filters restore on page load

---

## AGENT-012: Add Loading States
**Priority**: 🟡 MEDIUM
**Estimated Time**: 45 minutes
**Files**: Multiple pages

### Task
Add loading skeletons while data loads

### Steps
1. Add loading state to Index.tsx:
   ```typescript
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     // Simulate data fetch
     setTimeout(() => setIsLoading(false), 500);
   }, []);

   if (isLoading) {
     return (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {[...Array(6)].map((_, i) => (
           <LocationCardSkeleton key={i} />
         ))}
       </div>
     );
   }
   ```

2. Add to LocationScouts.tsx
3. Add to ScoutProfile.tsx
4. Create ScoutCardSkeleton component
5. Use existing LocationCardSkeleton

### Success Criteria
- [ ] Loading skeletons show on initial load
- [ ] Smooth transition to actual content
- [ ] No layout shift
- [ ] Works on all pages

---

## AGENT-013: Fix Mobile Navigation Scroll
**Priority**: 🟡 MEDIUM
**Estimated Time**: 15 minutes
**Files**: `src/components/Navigation.tsx`

### Task
Add scroll container to mobile menu for long menus

### Steps
1. Open `src/components/Navigation.tsx`
2. Find mobile menu div (around line 275-280)
3. Wrap menu items in scroll container:
   ```typescript
   <div className="fixed inset-0 top-16 bg-white z-40 md:hidden">
     <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
       <nav className="container mx-auto px-4 py-6">
         {/* Menu items */}
       </nav>
     </div>
   </div>
   ```
4. Test with long menu on mobile

### Success Criteria
- [ ] Mobile menu scrolls if content too tall
- [ ] No content cut off
- [ ] Smooth scrolling
- [ ] Works on small screens

---

## AGENT-014: Add Error Handling to Mock Service
**Priority**: 🟡 MEDIUM
**Estimated Time**: 20 minutes
**Files**: `src/services/mockDataService.ts`

### Task
Add null checks and error handling for missing data

### Steps
1. Update all get methods:
   ```typescript
   getProperty(id: string) {
     const property = this.properties.find(p => p.id === id);
     if (!property) {
       console.error(`Property ${id} not found`);
       return null;
     }
     return property;
   }

   getUser(id: number) {
     const user = this.users.find(u => u.id === id);
     if (!user) {
       console.error(`User ${id} not found`);
       return null;
     }
     return user;
   }
   ```

2. Update callers to handle null:
   ```typescript
   const property = mockDataService.getProperty(id);
   if (!property) {
     return <div>Property not found</div>;
   }
   ```

3. Add to all pages using service
4. Test with invalid IDs

### Success Criteria
- [ ] No undefined crashes
- [ ] Errors logged to console
- [ ] Null checks in components
- [ ] Graceful error messages

---

## AGENT-015: Add ARIA Labels for Accessibility
**Priority**: 🟡 MEDIUM
**Estimated Time**: 30 minutes
**Files**: Multiple components

### Task
Add accessibility labels to interactive elements

### Steps
1. **Carousel arrows** in LocationCard.tsx:
   ```typescript
   <button aria-label="Previous image">
     <ChevronLeft />
   </button>
   <button aria-label="Next image">
     <ChevronRight />
   </button>
   ```

2. **Modal close buttons**:
   ```typescript
   <button aria-label="Close modal" onClick={onClose}>
     <X />
   </button>
   ```

3. **Search inputs**:
   ```typescript
   <input
     aria-label="Search locations"
     aria-describedby="search-help"
     placeholder="Search..."
   />
   <span id="search-help" className="sr-only">
     Search by location name or address
   </span>
   ```

4. **Icon buttons**:
   ```typescript
   <button aria-label="Add to favorites">
     <Heart />
   </button>
   ```

5. Run accessibility audit with browser tools

### Success Criteria
- [ ] All buttons have labels
- [ ] Form inputs have descriptions
- [ ] Screen reader friendly
- [ ] Passes basic a11y audit

---

## AGENT-016: Remove Duplicate Toast Hook
**Priority**: 🟡 MEDIUM
**Estimated Time**: 10 minutes
**Files**: Remove `src/components/ui/use-toast.ts`

### Task
Remove duplicate toast hook file

### Steps
1. Search for imports of `/components/ui/use-toast`
2. Update to use `/hooks/use-toast` instead
3. Delete `/src/components/ui/use-toast.ts`
4. Test toast notifications still work
5. Run build to check for errors

### Success Criteria
- [ ] Only one toast hook exists
- [ ] All imports updated
- [ ] Toasts still work
- [ ] No build errors

---

## AGENT-017: Implement Authentication Flow
**Priority**: 🟡 MEDIUM
**Estimated Time**: 60 minutes
**Files**: `src/components/LoginModal.tsx`, `src/contexts/AuthContext.tsx`

### Task
Implement actual login/signup functionality

### Steps
1. Update LoginModal to handle form submission
2. For MVP, use localStorage:
   ```typescript
   const handleLogin = async (email: string, password: string) => {
     // Get users from localStorage or mock data
     const users = JSON.parse(localStorage.getItem('users') || '[]');
     const user = users.find(u => u.email === email && u.password === password);

     if (user) {
       login(user.role, user);
       localStorage.setItem('currentUser', JSON.stringify(user));
       toast({ title: "Welcome back!" });
       onClose();
     } else {
       toast({
         title: "Login failed",
         description: "Invalid credentials",
         variant: "destructive"
       });
     }
   };
   ```

3. Add signup functionality
4. Load user on app init from localStorage
5. Add logout to clear localStorage
6. Hash passwords (use simple hash for MVP)

### Success Criteria
- [ ] Can create account
- [ ] Can login
- [ ] Session persists on refresh
- [ ] Can logout
- [ ] User data saves to localStorage

---

## AGENT-018: Implement Booking Persistence
**Priority**: 🟡 MEDIUM
**Estimated Time**: 30 minutes
**Files**: `src/components/BookingModal.tsx`

### Task
Save bookings to localStorage when submitted

### Steps
1. Update handleSubmit in BookingModal:
   ```typescript
   const handleSubmit = async (values: BookingFormData) => {
     setIsSubmitting(true);

     try {
       const booking = {
         id: Date.now().toString(),
         propertyId: location.id,
         userId: currentUser?.id,
         ...values,
         status: 'pending',
         createdAt: new Date().toISOString(),
       };

       // Save to localStorage
       const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
       bookings.push(booking);
       localStorage.setItem('bookings', JSON.stringify(bookings));

       setCurrentStep(2);
       toast({ title: "Booking confirmed!" });

     } catch (error) {
       toast({
         title: "Booking failed",
         variant: "destructive"
       });
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

2. Update admin dashboard to show real bookings
3. Add booking list to user profile

### Success Criteria
- [ ] Bookings save to localStorage
- [ ] Bookings appear in admin dashboard
- [ ] User can view their bookings
- [ ] Data persists on refresh

---

## AGENT-019: Implement Message Persistence
**Priority**: 🟡 MEDIUM
**Estimated Time**: 30 minutes
**Files**: `src/components/MessageModal.tsx`

### Task
Save messages to localStorage

### Steps
1. Update handleSendMessage:
   ```typescript
   const handleSendMessage = () => {
     if (!newMessage.trim()) return;

     const message = {
       id: Date.now().toString(),
       propertyId: property.id,
       senderId: currentUser?.id,
       recipientId: property.ownerId,
       content: newMessage,
       timestamp: new Date().toISOString(),
       read: false,
     };

     // Save to localStorage
     const messages = JSON.parse(localStorage.getItem('messages') || '[]');
     messages.push(message);
     localStorage.setItem('messages', JSON.stringify(messages));

     setMessages([...messages, message]);
     setNewMessage('');
   };
   ```

2. Load messages on modal open
3. Update message center to show real messages
4. Add unread count badge

### Success Criteria
- [ ] Messages save to localStorage
- [ ] Messages load on modal open
- [ ] Message center shows real data
- [ ] Unread count updates

---

## AGENT-020: Fix Data Model Consistency
**Priority**: 🟡 MEDIUM
**Estimated Time**: 45 minutes
**Files**: `src/services/mockDataService.ts`, `src/data/mockData.ts`

### Task
Standardize property structure across data sources

### Current Issues
- Service uses: `name, price (string), images, tags`
- MockData uses: `title, price (number), heroImage, gallery, tags`

### Steps
1. Choose one structure (use mockData structure)
2. Update mockDataService to match:
   ```typescript
   interface Property {
     id: string;
     title: string;        // not "name"
     price: number;        // not string
     heroImage: string;    // not "images[0]"
     gallery: string[];    // not "images"
     location: string;
     category: string;
     tags: string[];
     description: string;
     rating: number;
     reviews: number;
   }
   ```

3. Update service methods
4. Update all components using service
5. Test all pages

### Success Criteria
- [ ] One consistent structure
- [ ] No type conflicts
- [ ] All pages work
- [ ] Data displays correctly

---

## AGENT-021: Add Data Relationships
**Priority**: 🟡 MEDIUM
**Estimated Time**: 30 minutes
**Files**: Data model files

### Task
Add proper foreign key relationships to data

### Steps
1. Add relationships to booking model:
   ```typescript
   interface Booking {
     id: string;
     propertyId: string;
     scoutId: string;      // ADD
     userId: string;       // ADD
     // ...
   }
   ```

2. Add to properties:
   ```typescript
   interface Property {
     id: string;
     ownerId: string;      // ADD
     scoutId: string;      // ADD (if applicable)
     // ...
   }
   ```

3. Update mock data with IDs
4. Create helper methods:
   ```typescript
   getPropertyOwner(propertyId: string) {
     const property = this.getProperty(propertyId);
     if (!property) return null;
     return this.getUser(property.ownerId);
   }
   ```

### Success Criteria
- [ ] All relationships defined
- [ ] Mock data has proper IDs
- [ ] Helper methods work
- [ ] Can query related data

---

## AGENT-022: Add Zod Schema Validation
**Priority**: 🟡 MEDIUM
**Estimated Time**: 30 minutes
**Files**: Create `src/schemas/validation.ts`

### Task
Add runtime validation for data structures

### Steps
1. Create validation schemas:
   ```typescript
   import { z } from 'zod';

   export const PropertySchema = z.object({
     id: z.string(),
     title: z.string().min(1),
     price: z.number().positive(),
     location: z.string().min(1),
     heroImage: z.string().url(),
     gallery: z.array(z.string().url()),
     category: z.string(),
     tags: z.array(z.string()),
     description: z.string(),
     rating: z.number().min(0).max(5),
     reviews: z.number().min(0),
   });

   export const BookingSchema = z.object({
     startDate: z.date(),
     endDate: z.date(),
     numberOfPeople: z.number().int().positive(),
     specialRequests: z.string().optional(),
   });
   ```

2. Use in forms and data loading
3. Add validation errors display
4. Test with invalid data

### Success Criteria
- [ ] Schemas defined for main models
- [ ] Validation in forms
- [ ] Errors shown to user
- [ ] Invalid data rejected

---

## AGENT-023: Implement Responsive Tables
**Priority**: 🟡 MEDIUM
**Estimated Time**: 30 minutes
**Files**: `src/components/admin/ScoutDashboard.tsx`

### Task
Make admin tables responsive on mobile

### Steps
1. Wrap tables in ScrollArea:
   ```typescript
   import { ScrollArea } from "@/components/ui/scroll-area";

   <ScrollArea className="w-full">
     <Table>
       {/* table content */}
     </Table>
   </ScrollArea>
   ```

2. OR create card view for mobile:
   ```typescript
   <div className="hidden md:block">
     <Table>{/* desktop table */}</Table>
   </div>
   <div className="md:hidden space-y-4">
     {bookings.map(booking => (
       <Card key={booking.id}>
         {/* card layout */}
       </Card>
     ))}
   </div>
   ```

3. Test on mobile viewport
4. Ensure all data visible

### Success Criteria
- [ ] Tables scroll horizontally on mobile
- [ ] OR show card layout
- [ ] All data accessible
- [ ] Good UX on small screens

---

## AGENT-024: Add Input Sanitization
**Priority**: 🟡 MEDIUM
**Estimated Time**: 20 minutes
**Files**: All form components

### Task
Sanitize user inputs to prevent XSS

### Steps
1. Install DOMPurify: `npm install dompurify @types/dompurify`
2. Create utility function:
   ```typescript
   import DOMPurify from 'dompurify';

   export const sanitizeInput = (input: string): string => {
     return DOMPurify.sanitize(input, {
       ALLOWED_TAGS: [],
       ALLOWED_ATTR: []
     });
   };

   export const sanitizeHTML = (html: string): string => {
     return DOMPurify.sanitize(html);
   };
   ```

3. Use in all text inputs:
   ```typescript
   const handleInputChange = (value: string) => {
     const sanitized = sanitizeInput(value);
     setFormData({ ...formData, field: sanitized });
   };
   ```

4. Sanitize before rendering user content
5. Test with XSS attempts

### Success Criteria
- [ ] All inputs sanitized
- [ ] XSS attacks blocked
- [ ] Legitimate content works
- [ ] No console errors

---

## AGENT-025: Optimize Image Loading
**Priority**: 🟡 MEDIUM
**Estimated Time**: 30 minutes
**Files**: `src/components/LocationCard.tsx`, image components

### Task
Add lazy loading and optimization to images

### Steps
1. Add lazy loading to all images:
   ```typescript
   <img
     src={image}
     loading="lazy"
     decoding="async"
     alt={title}
   />
   ```

2. Add blur placeholder:
   ```typescript
   const [imageLoaded, setImageLoaded] = useState(false);

   <div className="relative">
     {!imageLoaded && (
       <div className="absolute inset-0 bg-gray-200 animate-pulse" />
     )}
     <img
       src={image}
       onLoad={() => setImageLoaded(true)}
       className={imageLoaded ? 'opacity-100' : 'opacity-0'}
     />
   </div>
   ```

3. Use responsive images:
   ```typescript
   <img
     srcSet={`
       ${image}?w=400 400w,
       ${image}?w=800 800w,
       ${image}?w=1200 1200w
     `}
     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
   />
   ```

4. Test loading performance

### Success Criteria
- [ ] Images lazy load
- [ ] Smooth loading transitions
- [ ] Better performance metrics
- [ ] No layout shift

---

# 🟢 PHASE 4: POLISH & IMPROVEMENTS

## AGENT-026: Add Comprehensive Tests
**Priority**: 🟢 LOW
**Estimated Time**: 2-3 hours
**Files**: Create `__tests__` directories

### Task
Add test coverage for critical components

### Steps
1. Install Vitest:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom
   ```

2. Configure vitest in package.json:
   ```json
   "scripts": {
     "test": "vitest",
     "test:ui": "vitest --ui"
   }
   ```

3. Create test files:
   - `src/contexts/__tests__/AuthContext.test.tsx`
   - `src/components/__tests__/LocationCard.test.tsx`
   - `src/components/__tests__/BookingModal.test.tsx`
   - `src/services/__tests__/mockDataService.test.ts`

4. Example test:
   ```typescript
   import { describe, it, expect } from 'vitest';
   import { render, screen } from '@testing-library/react';
   import { LocationCard } from '../LocationCard';

   describe('LocationCard', () => {
     it('renders location title', () => {
       const location = {
         id: '1',
         title: 'Test Location',
         // ... other props
       };

       render(<LocationCard location={location} />);
       expect(screen.getByText('Test Location')).toBeInTheDocument();
     });
   });
   ```

5. Aim for 70%+ coverage

### Success Criteria
- [ ] Test runner configured
- [ ] 20+ unit tests written
- [ ] Critical paths tested
- [ ] All tests passing
- [ ] Can run `npm test`

---

## AGENT-027: Add JSDoc Documentation
**Priority**: 🟢 LOW
**Estimated Time**: 60 minutes
**Files**: All component files

### Task
Add JSDoc comments to components and functions

### Steps
1. Add component documentation:
   ```typescript
   /**
    * LocationCard - Displays a location listing with image carousel
    *
    * @param {Object} props - Component props
    * @param {Location} props.location - Location data to display
    * @param {string} props.layout - Card layout variant (default|compact|wide)
    * @returns {JSX.Element} Location card component
    *
    * @example
    * <LocationCard
    *   location={myLocation}
    *   layout="compact"
    * />
    */
   export function LocationCard({ location, layout = "default" }) {
     // ...
   }
   ```

2. Document utility functions
3. Document service methods
4. Add type descriptions
5. Generate docs with TypeDoc

### Success Criteria
- [ ] All public APIs documented
- [ ] Examples included
- [ ] Types documented
- [ ] Can generate docs

---

## AGENT-028: Update README
**Priority**: 🟢 LOW
**Estimated Time**: 30 minutes
**Files**: `README.md`

### Task
Update README with project-specific information

### Steps
1. Replace template content with:
   ```markdown
   # Philippine Scene Finder

   A marketplace connecting filmmakers with location scouts and filming locations across the Philippines.

   ## Features
   - Browse and search locations
   - Book locations and scouts
   - Direct messaging
   - Admin dashboard
   - Property management

   ## Tech Stack
   - React 18 + TypeScript
   - Vite
   - Tailwind CSS
   - shadcn/ui
   - React Router
   - TanStack Query

   ## Getting Started

   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

   ## Project Structure
   [Add structure]

   ## Development
   [Add dev instructions]

   ## Testing
   [Add test instructions]
   ```

2. Add screenshots
3. Add API documentation
4. Add deployment instructions

### Success Criteria
- [ ] README is accurate
- [ ] Instructions work
- [ ] Screenshots included
- [ ] Professional presentation

---

## AGENT-029: Optimize Bundle Size
**Priority**: 🟢 LOW
**Estimated Time**: 45 minutes
**Files**: `vite.config.ts`, imports

### Task
Analyze and reduce bundle size

### Steps
1. Add bundle analyzer:
   ```bash
   npm install -D rollup-plugin-visualizer
   ```

2. Update vite.config.ts:
   ```typescript
   import { visualizer } from 'rollup-plugin-visualizer';

   export default defineConfig({
     plugins: [
       react(),
       visualizer({ open: true })
     ]
   });
   ```

3. Run build and analyze
4. Fix large imports:
   - Tree-shake unused components
   - Code split routes
   - Lazy load heavy components

5. Example lazy loading:
   ```typescript
   const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

   <Suspense fallback={<LoadingSpinner />}>
     <AdminDashboard />
   </Suspense>
   ```

### Success Criteria
- [ ] Bundle size measured
- [ ] Large chunks identified
- [ ] Code splitting implemented
- [ ] 20%+ size reduction

---

## AGENT-030: Remove Example Files
**Priority**: 🟢 LOW
**Estimated Time**: 10 minutes
**Files**: `src/components/*-examples.tsx`

### Task
Clean up example files from production code

### Steps
1. Create `/docs/examples` directory (if want to keep)
2. Move all `*-examples.tsx` files to docs
3. OR delete them entirely
4. Update any imports
5. Clean build

### Files to move/delete:
- accordion-examples.tsx
- alert-dialog-examples.tsx
- aspect-ratio-examples.tsx
- avatar-examples.tsx
- badge-examples.tsx
- breadcrumb-examples.tsx
- button-examples.tsx
- calendar-examples.tsx
- card-examples.tsx
- carousel-examples.tsx
- chart-examples.tsx

### Success Criteria
- [ ] No example files in src/
- [ ] Build succeeds
- [ ] Smaller bundle size
- [ ] Examples preserved if needed

---

## AGENT-031: Add Error Logging Service
**Priority**: 🟢 LOW
**Estimated Time**: 30 minutes
**Files**: Create `src/services/errorLogger.ts`

### Task
Implement centralized error logging

### Steps
1. Create error logger:
   ```typescript
   interface ErrorLog {
     message: string;
     stack?: string;
     timestamp: string;
     userId?: string;
     route?: string;
     severity: 'error' | 'warning' | 'info';
   }

   class ErrorLogger {
     private logs: ErrorLog[] = [];

     log(error: Error, severity: 'error' | 'warning' = 'error') {
       const log: ErrorLog = {
         message: error.message,
         stack: error.stack,
         timestamp: new Date().toISOString(),
         userId: getCurrentUser()?.id,
         route: window.location.pathname,
         severity,
       };

       this.logs.push(log);

       // Send to backend or localStorage
       localStorage.setItem('errorLogs', JSON.stringify(this.logs));

       // In production: send to Sentry, LogRocket, etc.
       console.error('Error logged:', log);
     }

     getLogs() {
       return this.logs;
     }
   }

   export const errorLogger = new ErrorLogger();
   ```

2. Use in ErrorBoundary
3. Use in try/catch blocks
4. Add to admin dashboard to view errors

### Success Criteria
- [ ] Centralized error logging
- [ ] Errors saved to localStorage
- [ ] Admin can view error logs
- [ ] Ready for backend integration

---

## AGENT-032: Improve Color Contrast
**Priority**: 🟢 LOW
**Estimated Time**: 20 minutes
**Files**: `tailwind.config.ts`, component files

### Task
Ensure WCAG AA color contrast compliance

### Steps
1. Run accessibility audit in Chrome DevTools
2. Identify failing contrast ratios
3. Update colors in tailwind.config:
   ```typescript
   colors: {
     coral: {
       50: '#fff5f3',  // Adjust for better contrast
       600: '#d84315', // Darker for text
       700: '#bf360c', // Even darker
     }
   }
   ```

4. Update text colors on light backgrounds
5. Test with contrast checker
6. Re-run audit

### Success Criteria
- [ ] All text meets WCAG AA
- [ ] Interactive elements meet AA
- [ ] Audit passes
- [ ] Colors still look good

---

## AGENT-033: Add SEO Meta Tags
**Priority**: 🟢 LOW
**Estimated Time**: 30 minutes
**Files**: `index.html`, add react-helmet

### Task
Improve SEO with proper meta tags

### Steps
1. Install react-helmet:
   ```bash
   npm install react-helmet-async
   ```

2. Add to each page:
   ```typescript
   import { Helmet } from 'react-helmet-async';

   <Helmet>
     <title>Philippine Scene Finder - Find Perfect Film Locations</title>
     <meta name="description" content="Discover unique filming locations across the Philippines. Connect with professional location scouts." />
     <meta property="og:title" content="Philippine Scene Finder" />
     <meta property="og:description" content="..." />
     <meta property="og:image" content="..." />
     <meta name="twitter:card" content="summary_large_image" />
   </Helmet>
   ```

3. Add dynamic meta based on content
4. Add structured data (JSON-LD)
5. Test with SEO tools

### Success Criteria
- [ ] Meta tags on all pages
- [ ] Open Graph tags
- [ ] Twitter cards
- [ ] Structured data
- [ ] Good SEO score

---

## AGENT-034: Add Analytics
**Priority**: 🟢 LOW
**Estimated Time**: 30 minutes
**Files**: Create analytics service

### Task
Add basic analytics tracking

### Steps
1. Create analytics service:
   ```typescript
   class Analytics {
     trackPageView(path: string) {
       // Send to analytics service
       console.log('Page view:', path);
       // Google Analytics, Plausible, etc.
     }

     trackEvent(event: string, data?: any) {
       console.log('Event:', event, data);
     }

     trackBooking(bookingId: string) {
       this.trackEvent('booking_completed', { bookingId });
     }
   }

   export const analytics = new Analytics();
   ```

2. Track route changes:
   ```typescript
   useEffect(() => {
     analytics.trackPageView(location.pathname);
   }, [location]);
   ```

3. Track key events:
   - Bookings
   - Messages sent
   - Searches
   - Location views

### Success Criteria
- [ ] Analytics service created
- [ ] Page views tracked
- [ ] Events tracked
- [ ] Ready for real analytics tool

---

## AGENT-035: Add Keyboard Shortcuts
**Priority**: 🟢 LOW
**Estimated Time**: 30 minutes
**Files**: Create keyboard handler

### Task
Add keyboard shortcuts for power users

### Steps
1. Create keyboard service:
   ```typescript
   const useKeyboardShortcuts = () => {
     useEffect(() => {
       const handleKeyPress = (e: KeyboardEvent) => {
         // Cmd/Ctrl + K - Open search
         if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
           e.preventDefault();
           openSearch();
         }

         // Cmd/Ctrl + B - Open bookings
         if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
           e.preventDefault();
           navigate('/admin');
         }

         // ESC - Close modals
         if (e.key === 'Escape') {
           closeAllModals();
         }
       };

       window.addEventListener('keydown', handleKeyPress);
       return () => window.removeEventListener('keydown', handleKeyPress);
     }, []);
   };
   ```

2. Add shortcuts help dialog (? key)
3. Document shortcuts in UI
4. Test shortcuts

### Success Criteria
- [ ] Common shortcuts work
- [ ] Help dialog shows shortcuts
- [ ] No conflicts with browser
- [ ] Good UX

---

# 📝 SUMMARY

## Quick Reference

### By Priority
- **🔴 Critical (3)**: MUST do first - Dependencies, AuthContext, BookingModal
- **🟠 High (7)**: Core functionality - Pages, auth, data
- **🟡 Medium (19)**: Important improvements - UX, persistence, validation
- **🟢 Low (11)**: Polish - Tests, docs, optimization

### By Estimated Time
- **Quick (< 20 min)**: 8 tasks
- **Medium (20-45 min)**: 18 tasks
- **Long (> 45 min)**: 9 tasks

### Parallel Execution Map

**Wave 1 (Critical - Sequential)**:
1. AGENT-001 → AGENT-002 → AGENT-003

**Wave 2 (High Priority - Can be parallel)**:
- AGENT-004, 005, 006, 007, 008, 009, 010 (all parallel)

**Wave 3 (Medium Priority - Highly parallel)**:
- AGENT-011 through AGENT-025 (15 agents can work simultaneously)

**Wave 4 (Polish - Parallel)**:
- AGENT-026 through AGENT-035 (10 agents can work simultaneously)

---

## Success Metrics

### App is "Working" when:
- [ ] All Critical blockers fixed
- [ ] All High priority fixes done
- [ ] No console errors
- [ ] All pages load
- [ ] All buttons work
- [ ] Forms submit and save
- [ ] Navigation works
- [ ] Mobile responsive

### App is "Production Ready" when:
- [ ] All Medium priority fixes done
- [ ] Tests written and passing
- [ ] Accessibility audit passes
- [ ] Performance optimized
- [ ] Security hardened
- [ ] Documentation complete

---

## Next Steps After Tasks Complete

1. **Backend Integration**: Replace localStorage with real API
2. **Payment Integration**: Add payment processing for bookings
3. **Real-time Messaging**: WebSocket for live chat
4. **Image Upload**: Implement file upload for locations
5. **Advanced Search**: Elasticsearch or similar
6. **Mobile Apps**: React Native version
7. **Admin Analytics**: Advanced reporting

---

**Good luck! Each agent should take one task, complete it fully, test it, and mark it done before moving to the next one.**
