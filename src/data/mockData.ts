
import mockDataService from '../services/mockDataService';

// Export the original mockLocations with consistent string IDs
export const mockLocations = mockDataService.getProperties().map(property => ({
  id: property.id, // IDs are already strings
  title: property.name,
  heroImage: property.images[0]?.url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  gallery: property.images.slice(1).map(img => img.url),
  tags: property.tags,
  price: parseInt(property.price.replace(/[^\d]/g, '')),
  location: property.location,
  rating: property.rating,
  reviews: property.bookings,
  metadata: {
    sizeM2: property.metadata.sizeM2,
    powerAmps: property.metadata.powerAmps,
    maxCrew: property.metadata.maxCrew,
    parking: property.metadata.parking
  }
}));

// Data loaded successfully

// Export the service for direct access
export { default as mockDataService } from '../services/mockDataService';
