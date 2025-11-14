# Enhanced UI Components

This directory contains enhanced UI components for the Philippine Scene Finder application, implementing the amber minimal theme with improved functionality, accessibility, and user experience.

## Components Overview

### Input Components

#### `Input`
Enhanced base input component with validation states and icon support.

**Features:**
- Multiple variants: default, error, success, warning
- Size variants: sm, md, lg
- Icon support with left/right positioning
- Validation state indicators
- Accessibility compliant

**Usage:**
```tsx
<Input 
  placeholder="Enter text"
  error="This field is required"
  icon={<Search />}
  iconPosition="left"
/>
```

#### `FloatingInput`
Input component with animated floating labels.

**Features:**
- Smooth label animations
- Helper text support
- Validation state styling
- Accessibility compliant with proper labeling

**Usage:**
```tsx
<FloatingInput 
  label="Email Address"
  helperText="We'll never share your email"
  error="Please enter a valid email"
/>
```

#### `PasswordInput`
Specialized input for password fields with visibility toggle.

**Features:**
- Show/hide password functionality
- Accessibility compliant
- Consistent styling with other inputs

**Usage:**
```tsx
<PasswordInput placeholder="Enter your password" />
```

#### `SearchInput`
Input component optimized for search functionality.

**Features:**
- Built-in search icon
- Clear button when value is present
- Search-specific styling

**Usage:**
```tsx
<SearchInput 
  placeholder="Search locations..."
  onClear={() => setValue("")}
/>
```

### Select Components

#### `SearchableSelect`
Enhanced select component with search functionality.

**Features:**
- Real-time search filtering
- Keyboard navigation
- Clear functionality
- Custom option rendering
- Accessibility compliant

**Usage:**
```tsx
<SearchableSelect
  options={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" }
  ]}
  placeholder="Select country"
  searchPlaceholder="Search countries..."
  clearable
  onValueChange={(value) => console.log(value)}
/>
```

### Date Components

#### `DatePicker`
Enhanced date picker with calendar integration.

**Features:**
- Calendar popup with smooth animations
- Date validation (min/max dates)
- Clear functionality
- Error state support
- Accessibility compliant

**Usage:**
```tsx
<DatePicker
  date={selectedDate}
  onDateChange={setSelectedDate}
  placeholder="Select date"
  minDate={new Date()}
  maxDate={new Date(2025, 11, 31)}
  clearable
  error="Please select a valid date"
/>
```

#### `DateRangePicker`
Date range picker for selecting date ranges.

**Features:**
- Dual calendar view
- Range selection
- Date validation
- Clear functionality
- Accessibility compliant

**Usage:**
```tsx
<DateRangePicker
  dateRange={selectedRange}
  onDateRangeChange={setSelectedRange}
  placeholder="Select date range"
  clearable
/>
```

### File Upload Component

#### `FileUpload`
Drag-and-drop file upload component.

**Features:**
- Drag and drop functionality
- File type validation
- File size validation
- Multiple file support
- Preview functionality
- Progress indicators
- Accessibility compliant

**Usage:**
```tsx
<FileUpload
  onFilesChange={(files) => setFiles(files)}
  maxFiles={3}
  maxSize={5 * 1024 * 1024} // 5MB
  acceptedFileTypes={["image/*", "application/pdf"]}
  showPreview
  error="File too large"
/>
```

### Form Components

#### Enhanced Form Integration
All components integrate seamlessly with `react-hook-form` and include proper validation display.

**Features:**
- React Hook Form integration
- Zod schema validation support
- Consistent error messaging
- Accessibility compliant form structure

**Usage:**
```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <FloatingInput label="Email Address" {...field} />
          </FormControl>
          <FormDescription>
            We'll never share your email.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

#### `FormFieldWrapper`
Utility component for consistent validation message display.

**Usage:**
```tsx
<FormFieldWrapper error="Error message" success="Success message">
  <Input placeholder="Your input" />
</FormFieldWrapper>
```

## Accessibility Features

All components include:
- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast support
- Semantic HTML structure

## Theming

Components use the amber minimal theme with:
- OKLCH color space for consistent colors
- CSS custom properties for easy theming
- Responsive design patterns
- Smooth animations and transitions

## Testing

Components include comprehensive test coverage:
- Unit tests for all components
- Accessibility testing
- User interaction testing
- Form validation testing

Run tests with:
```bash
npm test
```

## Examples

See `form-examples.tsx` for comprehensive usage examples of all components working together.

### Navigation System

#### Enhanced Navigation Components
Modern navigation system with glass morphism effects, smooth animations, and comprehensive user experience.

**Features:**
- **Glass Morphism Design**: Backdrop blur effects with transparency and modern aesthetics
- **Responsive Layout**: Mobile-first design with hamburger menu and full-screen overlay
- **Smooth Animations**: CSS transitions for hover states, menu toggles, and active indicators
- **Integrated Search**: Built-in search functionality with focus animations and mobile optimization
- **User Avatar Dropdown**: Profile management with avatar, user actions, and role-based access
- **Smart Breadcrumbs**: Automatic route detection with customizable labels and icons
- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **Performance**: Optimized animations and efficient state management

**Basic Usage:**
```tsx
import Navigation from '@/components/Navigation'

// Navigation is automatically included in the app layout
<Navigation />
```

**Breadcrumb Usage:**
```tsx
import { SmartBreadcrumb } from '@/components/ui/breadcrumb'

<SmartBreadcrumb 
  showHome={true}
  maxItems={4}
  routes={[
    { path: '/custom', label: 'Custom Page', icon: <Icon /> }
  ]}
/>
```

**Manual Breadcrumb:**
```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink to="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Card System

#### Enhanced Card Components
Comprehensive card component system with multiple variants, animations, and specialized components.

**Features:**
- **8 Card Variants**: default, elevated, outlined, glass, interactive, gradient, featured, minimal
- **Hover Animations**: subtle scale, moderate scale, bounce, glow effects
- **Interactive States**: clickable, hoverable, disabled states with proper accessibility
- **Loading Skeletons**: 5 predefined skeleton types (default, location, profile, article, product)
- **Responsive Layouts**: CardGrid and CardList components with customizable spacing
- **Specialized Components**: ImageCard, StatsCard, ActionCard for specific use cases
- **Size Variants**: xs, sm, md, lg, xl with consistent spacing
- **Glass Morphism**: Modern backdrop blur effects with transparency
- **Accessibility**: Full keyboard navigation, ARIA attributes, focus management

**Basic Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

<Card variant="elevated" animation="subtle">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

**Interactive Card:**
```tsx
<Card 
  variant="interactive" 
  animation="moderate"
  onClick={() => console.log('Card clicked')}
>
  <CardContent>Clickable card with hover effects</CardContent>
</Card>
```

**Image Card:**
```tsx
import { ImageCard } from '@/components/ui/card'

<ImageCard
  src="/image.jpg"
  alt="Description"
  aspectRatio="photo"
  variant="glass"
  overlay={<div className="p-4 text-white">Overlay content</div>}
>
  <CardContent>Additional content below image</CardContent>
</ImageCard>
```

**Stats Card:**
```tsx
import { StatsCard } from '@/components/ui/card'

<StatsCard
  title="Total Users"
  value="12,345"
  description="Active users this month"
  color="amber"
  trend={{
    value: 12.5,
    label: 'from last month',
    direction: 'up'
  }}
  icon={<UserIcon />}
/>
```

**Card Grid Layout:**
```tsx
import { CardGrid } from '@/components/ui/card'

<CardGrid columns={3} gap="md">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</CardGrid>
```

**Loading States:**
```tsx
import { CardSkeleton } from '@/components/ui/card'

<CardSkeleton type="location" />
<Card loading>Content</Card>
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Optimized bundle size
- Lazy loading support
- Efficient re-rendering
- Memory leak prevention