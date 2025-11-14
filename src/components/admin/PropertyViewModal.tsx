
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Edit, Calendar, DollarSign, Eye, Zap, Users, Square, Lightbulb, Volume2, Truck, Camera, Palette, Wrench, Coffee, Brush, Sofa } from "lucide-react";
import ImageGallery from "./ImageGallery";
import { Property, PropertyImage } from "@/services/mockDataService";

interface PropertyViewModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onAddImage: (propertyId: string, imageData: Omit<PropertyImage, "id">) => void;
  onUpdateImage: (propertyId: string, imageId: string, updates: Partial<PropertyImage>) => void;
  onDeleteImage: (propertyId: string, imageId: string) => void;
}

const PropertyViewModal = ({ property, isOpen, onClose, onEdit, onAddImage, onUpdateImage, onDeleteImage }: PropertyViewModalProps) => {
  if (!property) return null;

  const getFeatureIcon = (feature: string) => {
    const featureMap: Record<string, JSX.Element> = {
      'naturalLight': <Lightbulb className="h-4 w-4" />,
      'soundProofing': <Volume2 className="h-4 w-4" />,
      'loadingAccess': <Truck className="h-4 w-4" />,
      'greenScreen': <Camera className="h-4 w-4" />,
      'cyc': <Palette className="h-4 w-4" />,
      'grip': <Wrench className="h-4 w-4" />,
      'catering': <Coffee className="h-4 w-4" />,
      'makeupRoom': <Brush className="h-4 w-4" />,
      'clientArea': <Sofa className="h-4 w-4" />,
      'parking': <Square className="h-4 w-4" />
    };
    return featureMap[feature] || <Square className="h-4 w-4" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-coral-500" />
              {property.name}
            </DialogTitle>
            <Button onClick={onEdit} className="bg-coral-500 hover:bg-coral-600">
              <Edit className="h-4 w-4 mr-2" />
              Edit Property
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p className="text-lg">{property.location}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Price</span>
                </div>
                <p className="text-lg font-bold text-coral-600">{property.price}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Rating</span>
                </div>
                <p className="text-lg">{property.rating}/5</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Max Crew</span>
                </div>
                <p className="text-lg">{property.metadata.maxCrew} people</p>
              </CardContent>
            </Card>
          </div>

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Space Size</span>
                </div>
                <p className="text-lg">{property.metadata.sizeM2} m²</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Power Supply</span>
                </div>
                <p className="text-lg">{property.metadata.powerAmps} Amps</p>
              </CardContent>
            </Card>

            {property.metadata.ceilingHeight && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Square className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Ceiling Height</span>
                  </div>
                  <p className="text-lg">{property.metadata.ceilingHeight}m</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Status and Metrics */}
          <div className="flex flex-wrap gap-4">
            <Badge variant={property.status === "active" ? "default" : "secondary"}>
              {property.status}
            </Badge>
            <Badge variant="outline">{property.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              {property.views?.toLocaleString() || 0} views
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {property.bookings} bookings
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          {/* Studio Features Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Studio Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { key: 'naturalLight', label: 'Natural Light', icon: <Lightbulb className="h-4 w-4" /> },
                { key: 'soundProofing', label: 'Sound Proofing', icon: <Volume2 className="h-4 w-4" /> },
                { key: 'loadingAccess', label: 'Loading Access', icon: <Truck className="h-4 w-4" /> },
                { key: 'greenScreen', label: 'Green Screen', icon: <Camera className="h-4 w-4" /> },
                { key: 'cyc', label: 'Cyc Wall', icon: <Palette className="h-4 w-4" /> },
                { key: 'grip', label: 'Grip Equipment', icon: <Wrench className="h-4 w-4" /> },
                { key: 'catering', label: 'Catering Area', icon: <Coffee className="h-4 w-4" /> },
                { key: 'makeupRoom', label: 'Makeup Room', icon: <Brush className="h-4 w-4" /> },
                { key: 'clientArea', label: 'Client Area', icon: <Sofa className="h-4 w-4" /> },
                { key: 'parking', label: 'Parking', icon: <Square className="h-4 w-4" /> }
              ].map(({ key, label, icon }) => (
                <Card key={key} className={`p-3 ${property.metadata[key as keyof typeof property.metadata] ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  <div className="mt-1">
                    {property.metadata[key as keyof typeof property.metadata] ? (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">Available</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Not Available</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, index) => (
                <Badge key={index} variant="outline">{feature}</Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {property.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <ImageGallery
            propertyId={property.id}
            images={property.images}
            onAddImage={onAddImage}
            onUpdateImage={onUpdateImage}
            onDeleteImage={onDeleteImage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyViewModal;
