
import mockProperties from '../data/mockProperties.json';
import mockUsers from '../data/mockUsers.json';
import mockBookings from '../data/mockBookings.json';
import mockMessages from '../data/mockMessages.json';
import mockStats from '../data/mockStats.json';

export interface Property {
  id: string;
  name: string;
  location: string;
  category: string;
  price: string;
  status: string;
  bookings: number;
  rating: number;
  description: string;
  lastUpdated: string;
  views: number;
  revenue: string;
  ownerId: string;
  images: Image[];
  features: string[];
  tags: string[];
  amenities: string[];
  attachedMovies: Movie[];
  metadata: Metadata;
}

export interface Image {
  id: string;
  url: string;
  title: string;
  description: string;
  alt: string;
  tags: string[];
  isPrimary: boolean;
}

// Add PropertyImage alias for backward compatibility
export type PropertyImage = Image;

export interface Movie {
  id: string;
  title: string;
  year: string;
  role: string;
  description: string;
  genre: string;
  director: string;
  imdbUrl: string;
  trailerUrl: string;
}

export interface Metadata {
  sizeM2: number;
  powerAmps: number;
  maxCrew: number;
  parking: boolean;
  coordinates: Coordinates;
  ceilingHeight: number;
  naturalLight: boolean;
  soundProofing: boolean;
  loadingAccess: boolean;
  greenScreen: boolean;
  cyc: boolean;
  grip: boolean;
  catering: boolean;
  makeupRoom: boolean;
  clientArea: boolean;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  isVerified: boolean;
  profile: Profile;
  stats: Stats;
  savedProperties: string[];
  role?: string;
  preferences?: any;
  scoutProfile?: any;
}

export interface Profile {
  bio: string;
  location: string;
  company: string;
}

export interface Stats {
  totalBookings: number;
  reviewsGiven: number;
  totalSpent: string;
  // Optional scout-specific stats
  propertiesListed?: number;
  totalEarnings?: string;
  averageRating?: number;
  responseRate?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
  status: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  propertyId: string;
  timestamp: string;
  content: string;
}

class MockDataService {
  private properties: Property[] = [];
  private users: User[] = [];
  private bookings: Booking[] = [];
  private messages: Message[] = [];
  private nextId = 1000;

  constructor() {
    this.loadMockData();
  }

  private loadMockData() {
    // Load properties from JSON - ensure consistent ID types
    this.properties = mockProperties.map(property => ({
      ...property,
      id: String(property.id), // Convert IDs to strings
      ownerId: String(property.ownerId) // Convert owner ID to string
    }));

    // Load users and normalize their data structure
    this.users = mockUsers.map((user: any) => ({
      id: String(user.id), // Convert IDs to strings
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      joinDate: user.joinDate,
      isVerified: user.isVerified,
      profile: user.profile,
      savedProperties: (user.savedProperties || []).map((id: any) => String(id)), // Convert saved property IDs to strings
      role: user.role,
      preferences: user.preferences,
      scoutProfile: user.scoutProfile,
      stats: {
        totalBookings: user.stats.totalBookings || 0,
        reviewsGiven: user.stats.reviewsGiven || 0,
        totalSpent: user.stats.totalSpent || "₱0",
        // Scout-specific stats (optional)
        propertiesListed: user.stats.propertiesListed,
        totalEarnings: user.stats.totalEarnings,
        averageRating: user.stats.averageRating,
        responseRate: user.stats.responseRate
      }
    }));

    // Ensure booking IDs are consistent
    this.bookings = mockBookings.map(booking => ({
      ...booking,
      id: String(booking.id), // Convert to string
      propertyId: String(booking.propertyId), // Convert to string
      userId: String(booking.userId) // Convert to string
    }));

    // Transform messages to match our simple Message interface
    this.messages = mockMessages.flatMap(conversation =>
      conversation.messages.map(msg => ({
        id: String(msg.id), // Convert to string
        senderId: String(msg.senderId), // Convert to string
        receiverId: String(msg.receiverId), // Convert to string
        propertyId: String(conversation.propertyId), // Convert to string
        timestamp: msg.timestamp,
        content: msg.content
      }))
    );

    // Set next ID based on existing data (convert string IDs back to numbers for incrementing)
    const allIds = [
      ...this.properties.map(p => parseInt(p.id)),
      ...this.users.map(u => parseInt(u.id)),
      ...this.bookings.map(b => parseInt(b.id)),
      ...this.messages.map(m => parseInt(m.id))
    ].filter(id => !isNaN(id));

    this.nextId = (allIds.length > 0 ? Math.max(...allIds) : 0) + 1;
  }

  // Property methods
  getProperties(): Property[] {
    return this.properties;
  }

  getProperty(id: string): Property | undefined {
    return this.properties.find(p => p.id === id);
  }

  addProperty(property: Omit<Property, 'id'>): Property {
    const newProperty = { ...property, id: String(this.nextId++) };
    this.properties.push(newProperty);
    return newProperty;
  }

  updateProperty(id: string, updates: Partial<Property>): void {
    const index = this.properties.findIndex(p => p.id === id);
    if (index !== -1) {
      this.properties[index] = { ...this.properties[index], ...updates };
    }
  }

  deleteProperty(id: string): void {
    this.properties = this.properties.filter(p => p.id !== id);
  }

  // Image management methods
  addImageToProperty(propertyId: string, imageData: Omit<Image, "id">): void {
    const property = this.getProperty(propertyId);
    if (property) {
      const newImage = { ...imageData, id: String(this.nextId++) };
      property.images.push(newImage);
    }
  }

  updatePropertyImage(propertyId: string, imageId: string, updates: Partial<Image>): void {
    const property = this.getProperty(propertyId);
    if (property) {
      const imageIndex = property.images.findIndex(img => img.id === imageId);
      if (imageIndex !== -1) {
        property.images[imageIndex] = { ...property.images[imageIndex], ...updates };
      }
    }
  }

  deletePropertyImage(propertyId: string, imageId: string): void {
    const property = this.getProperty(propertyId);
    if (property) {
      property.images = property.images.filter(img => img.id !== imageId);
    }
  }

  // User methods
  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  updateUser(id: string, updatedUser: User): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
    }
  }

  deleteUser(id: string): void {
    this.users = this.users.filter(u => u.id !== id);
  }

  // Booking methods
  getBookings(): Booking[] {
    return this.bookings;
  }

  getBooking(id: string): Booking | undefined {
    return this.bookings.find(b => b.id === id);
  }

   getBookingsByUser(userId: string): Booking[] {
    return this.bookings.filter(booking => booking.userId === userId);
  }

  addBooking(booking: Booking): void {
    this.bookings.push(booking);
  }

  updateBooking(id: string, updatedBooking: Booking): void {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      this.bookings[index] = { ...this.bookings[index], ...updatedBooking };
    }
  }

  deleteBooking(id: string): void {
    this.bookings = this.bookings.filter(b => b.id !== id);
  }

  // Message methods
  getMessages(): Message[] {
    return this.messages;
  }

  getMessage(id: string): Message | undefined {
    return this.messages.find(m => m.id === id);
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  updateMessage(id: string, updatedMessage: Message): void {
    const index = this.messages.findIndex(m => m.id === id);
    if (index !== -1) {
      this.messages[index] = { ...this.messages[index], ...updatedMessage };
    }
  }

  deleteMessage(id: string): void {
    this.messages = this.messages.filter(m => m.id !== id);
  }

  // User saved properties
  getUserSavedProperties(userId: string): Property[] {
    const user = this.getUser(userId);
    if (!user) return [];

    return user.savedProperties.map(propertyId => {
      const property = this.getProperty(propertyId);
      return property!;
    }).filter(Boolean);
  }

  savePropertyForUser(userId: string, propertyId: string): void {
    const user = this.getUser(userId);
    if (!user) return;

    if (!user.savedProperties.includes(propertyId)) {
      user.savedProperties.push(propertyId);
    }
  }

  unsavePropertyForUser(userId: string, propertyId: string): void {
    const user = this.getUser(userId);
    if (!user) return;

    user.savedProperties = user.savedProperties.filter(id => id !== propertyId);
  }

  isPropertySavedByUser(userId: string, propertyId: string): boolean {
    const user = this.getUser(userId);
    if (!user) return false;

    return user.savedProperties.includes(propertyId);
  }

  // Stats methods
  getStats(): any {
    return mockStats;
  }

  getPropertyStats(propertyId: string): any {
    const property = this.getProperty(propertyId);
    if (!property) return null;

    return {
      views: property.views,
      bookings: property.bookings,
      revenue: property.revenue
    };
  }

  searchProperties(query: string): Property[] {
    if (!query.trim()) return this.properties;
    
    const lowerQuery = query.toLowerCase();
    return this.properties.filter(property => 
      property.name.toLowerCase().includes(lowerQuery) ||
      property.location.toLowerCase().includes(lowerQuery) ||
      property.description.toLowerCase().includes(lowerQuery) ||
      property.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  filterPropertiesByTags(tags: string[]): Property[] {
    if (tags.length === 0) return this.properties;
    
    return this.properties.filter(property =>
      tags.some(tag => 
        property.tags.some(propertyTag => 
          propertyTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }

  filterPropertiesByPriceRange(minPrice: number, maxPrice: number): Property[] {
    return this.properties.filter(property => {
      const price = parseInt(property.price.replace(/[^\d]/g, ''));
      return price >= minPrice && price <= maxPrice;
    });
  }

  filterPropertiesByLocation(location: string): Property[] {
    if (!location.trim()) return this.properties;
    
    const lowerLocation = location.toLowerCase();
    return this.properties.filter(property =>
      property.location.toLowerCase().includes(lowerLocation)
    );
  }

  filterProperties(filters: {
    query?: string;
    tags?: string[];
    priceRange?: [number, number];
    location?: string;
  }): Property[] {
    let result = this.properties;

    if (filters.query) {
      result = this.searchProperties(filters.query);
    }

    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(property =>
        filters.tags!.some(tag => 
          property.tags.some(propertyTag => 
            propertyTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      result = result.filter(property => {
        const price = parseInt(property.price.replace(/[^\d]/g, ''));
        return price >= minPrice && price <= maxPrice;
      });
    }

    if (filters.location) {
      const lowerLocation = filters.location.toLowerCase();
      result = result.filter(property =>
        property.location.toLowerCase().includes(lowerLocation)
      );
    }

    return result;
  }
}

const mockDataService = new MockDataService();
export default mockDataService;
