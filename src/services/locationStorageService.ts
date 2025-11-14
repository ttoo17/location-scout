// Service for managing location uploads in localStorage and mock service

import mockDataService, { Property, Metadata } from './mockDataService';

export interface LocationUpload {
  id?: number;
  title: string;
  description: string;
  location: string;
  price: string;
  sizeM2: string;
  powerAmps: string;
  maxCrew: string;
  parking: boolean;
  tags: string[];
  images: File[];
  createdAt?: string;
}

class LocationStorageService {
  private readonly STORAGE_KEY = 'uploadedLocations';
  private readonly DRAFT_KEY = 'locationDraft';

  /**
   * Save a location to the system (localStorage and mock service)
   */
  saveLocation(locationData: LocationUpload): LocationUpload & { id: number } {
    try {
      // Create property object for mock service
      const property: Omit<Property, 'id'> = {
        name: locationData.title,
        description: locationData.description,
        location: locationData.location,
        category: locationData.tags[0] || 'General',
        price: `₱${locationData.price}`,
        status: 'Active',
        bookings: 0,
        rating: 0,
        lastUpdated: new Date().toISOString(),
        views: 0,
        revenue: '₱0',
        ownerId: 1, // Default owner ID
        images: [], // Images would be handled separately
        features: locationData.tags,
        tags: locationData.tags,
        amenities: this.getAmenitiesFromData(locationData),
        attachedMovies: [],
        metadata: {
          sizeM2: parseInt(locationData.sizeM2) || 0,
          powerAmps: parseInt(locationData.powerAmps) || 0,
          maxCrew: parseInt(locationData.maxCrew) || 0,
          parking: locationData.parking,
          coordinates: { lat: 0, lng: 0 }, // Would need geocoding
          ceilingHeight: 0,
          naturalLight: locationData.tags.includes('Natural Light'),
          soundProofing: false,
          loadingAccess: false,
          greenScreen: false,
          cyc: false,
          grip: false,
          catering: false,
          makeupRoom: false,
          clientArea: false,
        }
      };

      // Add to mock service
      const savedProperty = mockDataService.addProperty(property);

      // Also save to localStorage for local persistence
      const locations = this.getLocations();
      const newLocation: LocationUpload & { id: number } = {
        ...locationData,
        id: savedProperty.id,
        createdAt: new Date().toISOString(),
      };

      locations.push(newLocation);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(locations));

      // Clear draft
      this.clearDraft();

      return newLocation;
    } catch (error) {
      console.error('Error saving location:', error);
      throw new Error('Failed to save location. Please try again.');
    }
  }

  /**
   * Get all saved locations
   */
  getLocations(): LocationUpload[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error retrieving locations:', error);
      return [];
    }
  }

  /**
   * Get a specific location by ID
   */
  getLocation(id: number): LocationUpload | null {
    try {
      const locations = this.getLocations();
      return locations.find(loc => loc.id === id) || null;
    } catch (error) {
      console.error('Error retrieving location:', error);
      return null;
    }
  }

  /**
   * Save draft data
   */
  saveDraft(locationData: Partial<LocationUpload>): void {
    try {
      localStorage.setItem(this.DRAFT_KEY, JSON.stringify(locationData));
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  }

  /**
   * Get draft data
   */
  getDraft(): Partial<LocationUpload> | null {
    try {
      const stored = localStorage.getItem(this.DRAFT_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error retrieving draft:', error);
      return null;
    }
  }

  /**
   * Clear draft data
   */
  clearDraft(): void {
    try {
      localStorage.removeItem(this.DRAFT_KEY);
    } catch (error) {
      console.error('Error clearing draft:', error);
    }
  }

  /**
   * Validate location data
   */
  validateLocation(locationData: Partial<LocationUpload>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!locationData.title || locationData.title.trim() === '') {
      errors.push('Location title is required');
    }

    if (!locationData.description || locationData.description.trim() === '') {
      errors.push('Description is required');
    }

    if (!locationData.location || locationData.location.trim() === '') {
      errors.push('Location is required');
    }

    if (!locationData.price || locationData.price.trim() === '') {
      errors.push('Price is required');
    }

    if (!locationData.sizeM2 || parseInt(locationData.sizeM2) <= 0) {
      errors.push('Valid size is required');
    }

    if (!locationData.powerAmps || parseInt(locationData.powerAmps) <= 0) {
      errors.push('Valid power capacity is required');
    }

    if (!locationData.maxCrew || parseInt(locationData.maxCrew) <= 0) {
      errors.push('Valid max crew size is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Helper method to extract amenities from form data
   */
  private getAmenitiesFromData(locationData: LocationUpload): string[] {
    const amenities: string[] = [];

    if (locationData.parking) {
      amenities.push('Parking');
    }

    if (locationData.tags.includes('Natural Light')) {
      amenities.push('Natural Light');
    }

    if (locationData.tags.includes('Rooftop')) {
      amenities.push('Rooftop Access');
    }

    return amenities;
  }
}

const locationStorageService = new LocationStorageService();
export default locationStorageService;
