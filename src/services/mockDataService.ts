
import mockProperties from '../data/mockProperties.json';
import mockUsers from '../data/mockUsers.json';
import mockBookings from '../data/mockBookings.json';
import mockMessages from '../data/mockMessages.json';
import mockStats from '../data/mockStats.json';

// Custom error class for service-level errors
class MockDataServiceError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'MockDataServiceError';
  }
}

// Logging utility
const logger = {
  error: (message: string, error?: any) => {
    console.error(`[MockDataService] ${message}`, error);
  },
  warn: (message: string) => {
    console.warn(`[MockDataService] ${message}`);
  },
  info: (message: string) => {
    console.info(`[MockDataService] ${message}`);
  }
};

export interface Property {
  id: number;
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
  ownerId: number;
  images: Image[];
  features: string[];
  tags: string[];
  amenities: string[];
  attachedMovies: Movie[];
  metadata: Metadata;
}

export interface Image {
  id: number;
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
  id: number;
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
  id: number;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  isVerified: boolean;
  profile: Profile;
  stats: Stats;
  savedProperties: number[];
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
  id: number;
  propertyId: number;
  userId: number;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalAmount: number;
  status: string;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  propertyId: number;
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
    try {
      // Load properties from JSON - ensure consistent ID types
      if (!mockProperties || !Array.isArray(mockProperties)) {
        throw new MockDataServiceError('Invalid mock properties data', 'INVALID_PROPERTIES');
      }
      this.properties = mockProperties.map(property => ({
        ...property,
        id: Number(property.id) // Ensure IDs are numbers
      }));
      logger.info(`Loaded ${this.properties.length} properties`);

      // Load users and normalize their data structure
      if (!mockUsers || !Array.isArray(mockUsers)) {
        throw new MockDataServiceError('Invalid mock users data', 'INVALID_USERS');
      }
      this.users = mockUsers.map((user: any) => ({
        id: Number(user.id), // Ensure IDs are numbers
        name: user.name || 'Unknown User',
        email: user.email || '',
        avatar: user.avatar || '',
        joinDate: user.joinDate || new Date().toISOString(),
        isVerified: user.isVerified || false,
        profile: user.profile || { bio: '', location: '', company: '' },
        savedProperties: (user.savedProperties || []).map((id: any) => Number(id)), // Ensure saved property IDs are numbers
        role: user.role,
        preferences: user.preferences,
        scoutProfile: user.scoutProfile,
        stats: {
          totalBookings: user.stats?.totalBookings || 0,
          reviewsGiven: user.stats?.reviewsGiven || 0,
          totalSpent: user.stats?.totalSpent || "₱0",
          // Scout-specific stats (optional)
          propertiesListed: user.stats?.propertiesListed,
          totalEarnings: user.stats?.totalEarnings,
          averageRating: user.stats?.averageRating,
          responseRate: user.stats?.responseRate
        }
      }));
      logger.info(`Loaded ${this.users.length} users`);

      // Ensure booking IDs are consistent
      if (!mockBookings || !Array.isArray(mockBookings)) {
        throw new MockDataServiceError('Invalid mock bookings data', 'INVALID_BOOKINGS');
      }
      this.bookings = mockBookings.map(booking => ({
        ...booking,
        id: Number(booking.id),
        propertyId: Number(booking.propertyId),
        userId: Number(booking.userId)
      }));
      logger.info(`Loaded ${this.bookings.length} bookings`);

      // Transform messages to match our simple Message interface
      if (!mockMessages || !Array.isArray(mockMessages)) {
        throw new MockDataServiceError('Invalid mock messages data', 'INVALID_MESSAGES');
      }
      this.messages = mockMessages.flatMap(conversation =>
        conversation.messages.map(msg => ({
          id: Number(msg.id),
          senderId: Number(msg.senderId),
          receiverId: Number(msg.receiverId),
          propertyId: Number(conversation.propertyId),
          timestamp: msg.timestamp,
          content: msg.content
        }))
      );
      logger.info(`Loaded ${this.messages.length} messages`);

      // Set next ID based on existing data
      const allIds = [
        ...this.properties.map(p => p.id),
        ...this.users.map(u => u.id),
        ...this.bookings.map(b => b.id),
        ...this.messages.map(m => m.id)
      ];
      this.nextId = (allIds.length > 0 ? Math.max(...allIds) : 999) + 1;
    } catch (error) {
      logger.error('Failed to load mock data', error);
      // Initialize with empty arrays to prevent crashes
      this.properties = [];
      this.users = [];
      this.bookings = [];
      this.messages = [];
      this.nextId = 1000;
      throw new MockDataServiceError('Failed to initialize mock data service', 'INIT_FAILED');
    }
  }

  // Property methods
  getProperties(): Property[] {
    try {
      if (!this.properties || !Array.isArray(this.properties)) {
        logger.warn('Properties array is invalid');
        return [];
      }
      return this.properties;
    } catch (error) {
      logger.error('Error getting properties', error);
      return [];
    }
  }

  getProperty(id: number): Property | undefined {
    try {
      if (typeof id !== 'number' || id <= 0) {
        logger.warn(`Invalid property ID: ${id}`);
        return undefined;
      }
      const property = this.properties.find(p => p.id === id);
      if (!property) {
        logger.warn(`Property with ID ${id} not found`);
      }
      return property;
    } catch (error) {
      logger.error(`Error getting property ${id}`, error);
      return undefined;
    }
  }

  addProperty(property: Omit<Property, 'id'>): Property {
    try {
      if (!property) {
        throw new MockDataServiceError('Property data is required', 'MISSING_PROPERTY_DATA');
      }
      if (!property.name || !property.location) {
        throw new MockDataServiceError('Property name and location are required', 'INVALID_PROPERTY_DATA');
      }
      const newProperty = { ...property, id: this.nextId++ } as Property;
      this.properties.push(newProperty);
      logger.info(`Property added with ID ${newProperty.id}`);
      return newProperty;
    } catch (error) {
      logger.error('Error adding property', error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to add property', 'ADD_PROPERTY_FAILED');
    }
  }

  updateProperty(id: number, updates: Partial<Property>): void {
    try {
      if (typeof id !== 'number' || id <= 0) {
        throw new MockDataServiceError(`Invalid property ID: ${id}`, 'INVALID_ID');
      }
      if (!updates) {
        throw new MockDataServiceError('Updates data is required', 'MISSING_UPDATES');
      }
      const index = this.properties.findIndex(p => p.id === id);
      if (index === -1) {
        logger.warn(`Property with ID ${id} not found for update`);
        return;
      }
      this.properties[index] = { ...this.properties[index], ...updates };
      logger.info(`Property ${id} updated`);
    } catch (error) {
      logger.error(`Error updating property ${id}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to update property', 'UPDATE_PROPERTY_FAILED');
    }
  }

  deleteProperty(id: number): void {
    try {
      if (typeof id !== 'number' || id <= 0) {
        throw new MockDataServiceError(`Invalid property ID: ${id}`, 'INVALID_ID');
      }
      const initialLength = this.properties.length;
      this.properties = this.properties.filter(p => p.id !== id);
      if (this.properties.length === initialLength) {
        logger.warn(`Property with ID ${id} not found for deletion`);
      } else {
        logger.info(`Property ${id} deleted`);
      }
    } catch (error) {
      logger.error(`Error deleting property ${id}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to delete property', 'DELETE_PROPERTY_FAILED');
    }
  }

  // Image management methods
  addImageToProperty(propertyId: number, imageData: Omit<Image, "id">): void {
    try {
      if (typeof propertyId !== 'number' || propertyId <= 0) {
        throw new MockDataServiceError(`Invalid property ID: ${propertyId}`, 'INVALID_ID');
      }
      if (!imageData) {
        throw new MockDataServiceError('Image data is required', 'MISSING_IMAGE_DATA');
      }
      const property = this.getProperty(propertyId);
      if (!property) {
        throw new MockDataServiceError(`Property ${propertyId} not found`, 'PROPERTY_NOT_FOUND');
      }
      if (!property.images) {
        property.images = [];
      }
      const newImage = { ...imageData, id: this.nextId++ };
      property.images.push(newImage);
      logger.info(`Image added to property ${propertyId}`);
    } catch (error) {
      logger.error(`Error adding image to property ${propertyId}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to add image', 'ADD_IMAGE_FAILED');
    }
  }

  updatePropertyImage(propertyId: number, imageId: number, updates: Partial<Image>): void {
    try {
      if (typeof propertyId !== 'number' || propertyId <= 0) {
        throw new MockDataServiceError(`Invalid property ID: ${propertyId}`, 'INVALID_ID');
      }
      if (typeof imageId !== 'number' || imageId <= 0) {
        throw new MockDataServiceError(`Invalid image ID: ${imageId}`, 'INVALID_IMAGE_ID');
      }
      if (!updates) {
        throw new MockDataServiceError('Updates data is required', 'MISSING_UPDATES');
      }
      const property = this.getProperty(propertyId);
      if (!property) {
        throw new MockDataServiceError(`Property ${propertyId} not found`, 'PROPERTY_NOT_FOUND');
      }
      if (!property.images || property.images.length === 0) {
        logger.warn(`No images found for property ${propertyId}`);
        return;
      }
      const imageIndex = property.images.findIndex(img => img.id === imageId);
      if (imageIndex === -1) {
        logger.warn(`Image ${imageId} not found in property ${propertyId}`);
        return;
      }
      property.images[imageIndex] = { ...property.images[imageIndex], ...updates };
      logger.info(`Image ${imageId} updated for property ${propertyId}`);
    } catch (error) {
      logger.error(`Error updating image ${imageId} for property ${propertyId}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to update image', 'UPDATE_IMAGE_FAILED');
    }
  }

  deletePropertyImage(propertyId: number, imageId: number): void {
    try {
      if (typeof propertyId !== 'number' || propertyId <= 0) {
        throw new MockDataServiceError(`Invalid property ID: ${propertyId}`, 'INVALID_ID');
      }
      if (typeof imageId !== 'number' || imageId <= 0) {
        throw new MockDataServiceError(`Invalid image ID: ${imageId}`, 'INVALID_IMAGE_ID');
      }
      const property = this.getProperty(propertyId);
      if (!property) {
        throw new MockDataServiceError(`Property ${propertyId} not found`, 'PROPERTY_NOT_FOUND');
      }
      if (!property.images || property.images.length === 0) {
        logger.warn(`No images found for property ${propertyId}`);
        return;
      }
      const initialLength = property.images.length;
      property.images = property.images.filter(img => img.id !== imageId);
      if (property.images.length === initialLength) {
        logger.warn(`Image ${imageId} not found in property ${propertyId}`);
      } else {
        logger.info(`Image ${imageId} deleted from property ${propertyId}`);
      }
    } catch (error) {
      logger.error(`Error deleting image ${imageId} from property ${propertyId}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to delete image', 'DELETE_IMAGE_FAILED');
    }
  }

  // User methods
  getUsers(): User[] {
    try {
      if (!this.users || !Array.isArray(this.users)) {
        logger.warn('Users array is invalid');
        return [];
      }
      return this.users;
    } catch (error) {
      logger.error('Error getting users', error);
      return [];
    }
  }

  getUser(id: number): User | undefined {
    try {
      if (typeof id !== 'number' || id <= 0) {
        logger.warn(`Invalid user ID: ${id}`);
        return undefined;
      }
      const user = this.users.find(u => u.id === id);
      if (!user) {
        logger.warn(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      logger.error(`Error getting user ${id}`, error);
      return undefined;
    }
  }

  addUser(user: User): void {
    try {
      if (!user) {
        throw new MockDataServiceError('User data is required', 'MISSING_USER_DATA');
      }
      if (!user.name || !user.email) {
        throw new MockDataServiceError('User name and email are required', 'INVALID_USER_DATA');
      }
      this.users.push(user);
      logger.info(`User added with ID ${user.id}`);
    } catch (error) {
      logger.error('Error adding user', error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to add user', 'ADD_USER_FAILED');
    }
  }

  updateUser(id: number, updatedUser: User): void {
    try {
      if (typeof id !== 'number' || id <= 0) {
        throw new MockDataServiceError(`Invalid user ID: ${id}`, 'INVALID_ID');
      }
      if (!updatedUser) {
        throw new MockDataServiceError('Updated user data is required', 'MISSING_USER_DATA');
      }
      const index = this.users.findIndex(u => u.id === id);
      if (index === -1) {
        logger.warn(`User with ID ${id} not found for update`);
        return;
      }
      this.users[index] = { ...this.users[index], ...updatedUser };
      logger.info(`User ${id} updated`);
    } catch (error) {
      logger.error(`Error updating user ${id}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to update user', 'UPDATE_USER_FAILED');
    }
  }

  deleteUser(id: number): void {
    try {
      if (typeof id !== 'number' || id <= 0) {
        throw new MockDataServiceError(`Invalid user ID: ${id}`, 'INVALID_ID');
      }
      const initialLength = this.users.length;
      this.users = this.users.filter(u => u.id !== id);
      if (this.users.length === initialLength) {
        logger.warn(`User with ID ${id} not found for deletion`);
      } else {
        logger.info(`User ${id} deleted`);
      }
    } catch (error) {
      logger.error(`Error deleting user ${id}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to delete user', 'DELETE_USER_FAILED');
    }
  }

  // Booking methods
  getBookings(): Booking[] {
    try {
      if (!this.bookings || !Array.isArray(this.bookings)) {
        logger.warn('Bookings array is invalid');
        return [];
      }
      return this.bookings;
    } catch (error) {
      logger.error('Error getting bookings', error);
      return [];
    }
  }

  getBooking(id: number): Booking | undefined {
    try {
      if (typeof id !== 'number' || id <= 0) {
        logger.warn(`Invalid booking ID: ${id}`);
        return undefined;
      }
      const booking = this.bookings.find(b => b.id === id);
      if (!booking) {
        logger.warn(`Booking with ID ${id} not found`);
      }
      return booking;
    } catch (error) {
      logger.error(`Error getting booking ${id}`, error);
      return undefined;
    }
  }

  getBookingsByUser(userId: number): Booking[] {
    try {
      if (typeof userId !== 'number' || userId <= 0) {
        logger.warn(`Invalid user ID: ${userId}`);
        return [];
      }
      return this.bookings.filter(booking => booking.userId === userId);
    } catch (error) {
      logger.error(`Error getting bookings for user ${userId}`, error);
      return [];
    }
  }

  addBooking(booking: Booking): void {
    try {
      if (!booking) {
        throw new MockDataServiceError('Booking data is required', 'MISSING_BOOKING_DATA');
      }
      if (!booking.propertyId || !booking.userId) {
        throw new MockDataServiceError('Booking propertyId and userId are required', 'INVALID_BOOKING_DATA');
      }
      this.bookings.push(booking);
      logger.info(`Booking added with ID ${booking.id}`);
    } catch (error) {
      logger.error('Error adding booking', error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to add booking', 'ADD_BOOKING_FAILED');
    }
  }

  updateBooking(id: number, updatedBooking: Booking): void {
    try {
      if (typeof id !== 'number' || id <= 0) {
        throw new MockDataServiceError(`Invalid booking ID: ${id}`, 'INVALID_ID');
      }
      if (!updatedBooking) {
        throw new MockDataServiceError('Updated booking data is required', 'MISSING_BOOKING_DATA');
      }
      const index = this.bookings.findIndex(b => b.id === id);
      if (index === -1) {
        logger.warn(`Booking with ID ${id} not found for update`);
        return;
      }
      this.bookings[index] = { ...this.bookings[index], ...updatedBooking };
      logger.info(`Booking ${id} updated`);
    } catch (error) {
      logger.error(`Error updating booking ${id}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to update booking', 'UPDATE_BOOKING_FAILED');
    }
  }

  deleteBooking(id: number): void {
    try {
      if (typeof id !== 'number' || id <= 0) {
        throw new MockDataServiceError(`Invalid booking ID: ${id}`, 'INVALID_ID');
      }
      const initialLength = this.bookings.length;
      this.bookings = this.bookings.filter(b => b.id !== id);
      if (this.bookings.length === initialLength) {
        logger.warn(`Booking with ID ${id} not found for deletion`);
      } else {
        logger.info(`Booking ${id} deleted`);
      }
    } catch (error) {
      logger.error(`Error deleting booking ${id}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to delete booking', 'DELETE_BOOKING_FAILED');
    }
  }

  // Message methods
  getMessages(): Message[] {
    try {
      if (!this.messages || !Array.isArray(this.messages)) {
        logger.warn('Messages array is invalid');
        return [];
      }
      return this.messages;
    } catch (error) {
      logger.error('Error getting messages', error);
      return [];
    }
  }

  getMessage(id: number): Message | undefined {
    try {
      if (typeof id !== 'number' || id <= 0) {
        logger.warn(`Invalid message ID: ${id}`);
        return undefined;
      }
      const message = this.messages.find(m => m.id === id);
      if (!message) {
        logger.warn(`Message with ID ${id} not found`);
      }
      return message;
    } catch (error) {
      logger.error(`Error getting message ${id}`, error);
      return undefined;
    }
  }

  addMessage(message: Message): void {
    try {
      if (!message) {
        throw new MockDataServiceError('Message data is required', 'MISSING_MESSAGE_DATA');
      }
      if (!message.senderId || !message.receiverId || !message.content) {
        throw new MockDataServiceError('Message senderId, receiverId, and content are required', 'INVALID_MESSAGE_DATA');
      }
      this.messages.push(message);
      logger.info(`Message added with ID ${message.id}`);
    } catch (error) {
      logger.error('Error adding message', error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to add message', 'ADD_MESSAGE_FAILED');
    }
  }

  updateMessage(id: number, updatedMessage: Message): void {
    try {
      if (typeof id !== 'number' || id <= 0) {
        throw new MockDataServiceError(`Invalid message ID: ${id}`, 'INVALID_ID');
      }
      if (!updatedMessage) {
        throw new MockDataServiceError('Updated message data is required', 'MISSING_MESSAGE_DATA');
      }
      const index = this.messages.findIndex(m => m.id === id);
      if (index === -1) {
        logger.warn(`Message with ID ${id} not found for update`);
        return;
      }
      this.messages[index] = { ...this.messages[index], ...updatedMessage };
      logger.info(`Message ${id} updated`);
    } catch (error) {
      logger.error(`Error updating message ${id}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to update message', 'UPDATE_MESSAGE_FAILED');
    }
  }

  deleteMessage(id: number): void {
    try {
      if (typeof id !== 'number' || id <= 0) {
        throw new MockDataServiceError(`Invalid message ID: ${id}`, 'INVALID_ID');
      }
      const initialLength = this.messages.length;
      this.messages = this.messages.filter(m => m.id !== id);
      if (this.messages.length === initialLength) {
        logger.warn(`Message with ID ${id} not found for deletion`);
      } else {
        logger.info(`Message ${id} deleted`);
      }
    } catch (error) {
      logger.error(`Error deleting message ${id}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to delete message', 'DELETE_MESSAGE_FAILED');
    }
  }

  // User saved properties
  getUserSavedProperties(userId: number): Property[] {
    try {
      if (typeof userId !== 'number' || userId <= 0) {
        logger.warn(`Invalid user ID: ${userId}`);
        return [];
      }
      const user = this.getUser(userId);
      if (!user) {
        logger.warn(`User ${userId} not found for saved properties`);
        return [];
      }
      if (!user.savedProperties || !Array.isArray(user.savedProperties)) {
        logger.warn(`User ${userId} has invalid savedProperties`);
        return [];
      }
      return user.savedProperties
        .map(propertyId => this.getProperty(propertyId))
        .filter((property): property is Property => property !== undefined);
    } catch (error) {
      logger.error(`Error getting saved properties for user ${userId}`, error);
      return [];
    }
  }

  savePropertyForUser(userId: number, propertyId: number): void {
    try {
      if (typeof userId !== 'number' || userId <= 0) {
        throw new MockDataServiceError(`Invalid user ID: ${userId}`, 'INVALID_USER_ID');
      }
      if (typeof propertyId !== 'number' || propertyId <= 0) {
        throw new MockDataServiceError(`Invalid property ID: ${propertyId}`, 'INVALID_PROPERTY_ID');
      }
      const user = this.getUser(userId);
      if (!user) {
        throw new MockDataServiceError(`User ${userId} not found`, 'USER_NOT_FOUND');
      }
      const property = this.getProperty(propertyId);
      if (!property) {
        throw new MockDataServiceError(`Property ${propertyId} not found`, 'PROPERTY_NOT_FOUND');
      }
      if (!user.savedProperties) {
        user.savedProperties = [];
      }
      if (!user.savedProperties.includes(propertyId)) {
        user.savedProperties.push(propertyId);
        logger.info(`Property ${propertyId} saved for user ${userId}`);
      } else {
        logger.warn(`Property ${propertyId} is already saved by user ${userId}`);
      }
    } catch (error) {
      logger.error(`Error saving property ${propertyId} for user ${userId}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to save property', 'SAVE_PROPERTY_FAILED');
    }
  }

  unsavePropertyForUser(userId: number, propertyId: number): void {
    try {
      if (typeof userId !== 'number' || userId <= 0) {
        throw new MockDataServiceError(`Invalid user ID: ${userId}`, 'INVALID_USER_ID');
      }
      if (typeof propertyId !== 'number' || propertyId <= 0) {
        throw new MockDataServiceError(`Invalid property ID: ${propertyId}`, 'INVALID_PROPERTY_ID');
      }
      const user = this.getUser(userId);
      if (!user) {
        logger.warn(`User ${userId} not found for unsave operation`);
        return;
      }
      if (!user.savedProperties || !Array.isArray(user.savedProperties)) {
        logger.warn(`User ${userId} has invalid savedProperties`);
        return;
      }
      const initialLength = user.savedProperties.length;
      user.savedProperties = user.savedProperties.filter(id => id !== propertyId);
      if (user.savedProperties.length === initialLength) {
        logger.warn(`Property ${propertyId} was not saved by user ${userId}`);
      } else {
        logger.info(`Property ${propertyId} unsaved for user ${userId}`);
      }
    } catch (error) {
      logger.error(`Error unsaving property ${propertyId} for user ${userId}`, error);
      throw error instanceof MockDataServiceError ? error : new MockDataServiceError('Failed to unsave property', 'UNSAVE_PROPERTY_FAILED');
    }
  }

  isPropertySavedByUser(userId: number, propertyId: number): boolean {
    try {
      if (typeof userId !== 'number' || userId <= 0) {
        logger.warn(`Invalid user ID: ${userId}`);
        return false;
      }
      if (typeof propertyId !== 'number' || propertyId <= 0) {
        logger.warn(`Invalid property ID: ${propertyId}`);
        return false;
      }
      const user = this.getUser(userId);
      if (!user) {
        logger.warn(`User ${userId} not found`);
        return false;
      }
      if (!user.savedProperties || !Array.isArray(user.savedProperties)) {
        logger.warn(`User ${userId} has invalid savedProperties`);
        return false;
      }
      return user.savedProperties.includes(propertyId);
    } catch (error) {
      logger.error(`Error checking if property ${propertyId} is saved by user ${userId}`, error);
      return false;
    }
  }

  // Stats methods
  getStats(): any {
    try {
      if (!mockStats) {
        logger.warn('Stats data is undefined');
        return {};
      }
      return mockStats;
    } catch (error) {
      logger.error('Error getting stats', error);
      return {};
    }
  }

  getPropertyStats(propertyId: number): any {
    try {
      if (typeof propertyId !== 'number' || propertyId <= 0) {
        logger.warn(`Invalid property ID: ${propertyId}`);
        return null;
      }
      const property = this.getProperty(propertyId);
      if (!property) {
        logger.warn(`Property ${propertyId} not found for stats`);
        return null;
      }
      return {
        views: property.views || 0,
        bookings: property.bookings || 0,
        revenue: property.revenue || "₱0"
      };
    } catch (error) {
      logger.error(`Error getting stats for property ${propertyId}`, error);
      return null;
    }
  }

  searchProperties(query: string): Property[] {
    try {
      if (!query || typeof query !== 'string') {
        logger.warn('Invalid search query');
        return this.properties;
      }
      if (!query.trim()) {
        return this.properties;
      }
      const lowerQuery = query.toLowerCase();
      return this.properties.filter(property => {
        if (!property) return false;
        return (
          property.name?.toLowerCase().includes(lowerQuery) ||
          property.location?.toLowerCase().includes(lowerQuery) ||
          property.description?.toLowerCase().includes(lowerQuery) ||
          (property.tags && property.tags.some(tag => tag?.toLowerCase().includes(lowerQuery)))
        );
      });
    } catch (error) {
      logger.error(`Error searching properties with query "${query}"`, error);
      return this.properties;
    }
  }

  filterPropertiesByTags(tags: string[]): Property[] {
    try {
      if (!tags || !Array.isArray(tags)) {
        logger.warn('Invalid tags filter');
        return this.properties;
      }
      if (tags.length === 0) {
        return this.properties;
      }
      return this.properties.filter(property => {
        if (!property || !property.tags || !Array.isArray(property.tags)) return false;
        return tags.some(tag =>
          property.tags.some(propertyTag =>
            propertyTag?.toLowerCase().includes(tag?.toLowerCase())
          )
        );
      });
    } catch (error) {
      logger.error('Error filtering properties by tags', error);
      return this.properties;
    }
  }

  filterPropertiesByPriceRange(minPrice: number, maxPrice: number): Property[] {
    try {
      if (typeof minPrice !== 'number' || typeof maxPrice !== 'number') {
        logger.warn(`Invalid price range: ${minPrice} - ${maxPrice}`);
        return this.properties;
      }
      if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice) {
        logger.warn(`Invalid price range: min must be >= 0 and <= max`);
        return this.properties;
      }
      return this.properties.filter(property => {
        try {
          if (!property || !property.price) return false;
          const price = parseInt(property.price.replace(/[^\d]/g, ''));
          return !isNaN(price) && price >= minPrice && price <= maxPrice;
        } catch {
          return false;
        }
      });
    } catch (error) {
      logger.error(`Error filtering properties by price range ${minPrice} - ${maxPrice}`, error);
      return this.properties;
    }
  }

  filterPropertiesByLocation(location: string): Property[] {
    try {
      if (!location || typeof location !== 'string') {
        logger.warn('Invalid location filter');
        return this.properties;
      }
      if (!location.trim()) {
        return this.properties;
      }
      const lowerLocation = location.toLowerCase();
      return this.properties.filter(property =>
        property && property.location?.toLowerCase().includes(lowerLocation)
      );
    } catch (error) {
      logger.error(`Error filtering properties by location "${location}"`, error);
      return this.properties;
    }
  }

  filterProperties(filters: {
    query?: string;
    tags?: string[];
    priceRange?: [number, number];
    location?: string;
  }): Property[] {
    try {
      if (!filters) {
        logger.warn('No filters provided');
        return this.properties;
      }

      let result = this.properties;

      if (filters.query) {
        result = this.searchProperties(filters.query);
      }

      if (filters.tags && Array.isArray(filters.tags) && filters.tags.length > 0) {
        result = result.filter(property => {
          if (!property || !property.tags || !Array.isArray(property.tags)) return false;
          return filters.tags!.some(tag =>
            property.tags.some(propertyTag =>
              propertyTag?.toLowerCase().includes(tag?.toLowerCase())
            )
          );
        });
      }

      if (filters.priceRange && Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
        const [minPrice, maxPrice] = filters.priceRange;
        if (typeof minPrice === 'number' && typeof maxPrice === 'number') {
          result = result.filter(property => {
            try {
              if (!property || !property.price) return false;
              const price = parseInt(property.price.replace(/[^\d]/g, ''));
              return !isNaN(price) && price >= minPrice && price <= maxPrice;
            } catch {
              return false;
            }
          });
        }
      }

      if (filters.location && typeof filters.location === 'string') {
        const lowerLocation = filters.location.toLowerCase();
        result = result.filter(property =>
          property && property.location?.toLowerCase().includes(lowerLocation)
        );
      }

      return result;
    } catch (error) {
      logger.error('Error filtering properties', error);
      return this.properties;
    }
  }
}

const mockDataService = new MockDataService();
export default mockDataService;
export { MockDataServiceError };
