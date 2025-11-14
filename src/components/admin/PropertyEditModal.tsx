
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageGallery from "./ImageGallery";
import { Property, PropertyImage } from "@/services/mockDataService";

interface PropertyEditModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (propertyId: number, updates: Partial<Property>) => void;
  onAddImage: (propertyId: number, imageData: Omit<PropertyImage, "id">) => void;
  onUpdateImage: (propertyId: number, imageId: number, updates: Partial<PropertyImage>) => void;
  onDeleteImage: (propertyId: number, imageId: number) => void;
}

const PropertyEditModal = ({ property, isOpen, onClose, onSave, onAddImage, onUpdateImage, onDeleteImage }: PropertyEditModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Property>>({});
  const [newFeature, setNewFeature] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newAmenity, setNewAmenity] = useState("");

  const handleSave = () => {
    if (!property) return;
    
    onSave(property.id, formData);
    toast({ title: "Property Updated", description: "Changes have been saved successfully." });
    onClose();
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData(prev => ({
      ...prev,
      features: [...(prev.features || property?.features || []), newFeature.trim()]
    }));
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: (prev.features || property?.features || []).filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    setFormData(prev => ({
      ...prev,
      tags: [...(prev.tags || property?.tags || []), newTag.trim()]
    }));
    setNewTag("");
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: (prev.tags || property?.tags || []).filter((_, i) => i !== index)
    }));
  };

  const addAmenity = () => {
    if (!newAmenity.trim()) return;
    setFormData(prev => ({
      ...prev,
      amenities: [...(prev.amenities || property?.amenities || []), newAmenity.trim()]
    }));
    setNewAmenity("");
  };

  const removeAmenity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: (prev.amenities || property?.amenities || []).filter((_, i) => i !== index)
    }));
  };

  const updateMetadata = (key: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...(prev.metadata || property?.metadata),
        [key]: value
      }
    }));
  };

  if (!property) return null;

  const currentFeatures = formData.features || property.features;
  const currentTags = formData.tags || property.tags;
  const currentAmenities = formData.amenities || property.amenities;
  const currentMetadata = { ...property.metadata, ...formData.metadata };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property: {property.name}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Property Details</TabsTrigger>
            <TabsTrigger value="technical">Technical Specs</TabsTrigger>
            <TabsTrigger value="images">Images ({property.images.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Property Name</label>
                <Input
                  defaultValue={property.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input
                  defaultValue={property.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                  defaultValue={property.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Studio">Studio</SelectItem>
                    <SelectItem value="Location">Location</SelectItem>
                    <SelectItem value="Beach">Beach</SelectItem>
                    <SelectItem value="Mountain">Mountain</SelectItem>
                    <SelectItem value="Urban">Urban</SelectItem>
                    <SelectItem value="Nature">Nature</SelectItem>
                    <SelectItem value="Historical">Historical</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                    <SelectItem value="Residential">Residential</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Price per Day</label>
                <Input
                  defaultValue={property.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                defaultValue={property.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Features</label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add feature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addFeature()}
                />
                <Button size="sm" onClick={addFeature}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {currentFeatures.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {feature}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeFeature(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Tags</label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button size="sm" onClick={addTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {currentTags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeTag(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Amenities</label>
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Add amenity"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addAmenity()}
                />
                <Button size="sm" onClick={addAmenity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {currentAmenities.map((amenity, index) => (
                  <Badge key={index} variant="default" className="flex items-center gap-1">
                    {amenity}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => removeAmenity(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Space Size (m²)</label>
                <Input
                  type="number"
                  value={currentMetadata.sizeM2}
                  onChange={(e) => updateMetadata('sizeM2', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Power Supply (Amps)</label>
                <Input
                  type="number"
                  value={currentMetadata.powerAmps}
                  onChange={(e) => updateMetadata('powerAmps', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Max Crew Size</label>
                <Input
                  type="number"
                  value={currentMetadata.maxCrew}
                  onChange={(e) => updateMetadata('maxCrew', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Ceiling Height (m)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={currentMetadata.ceilingHeight || 0}
                  onChange={(e) => updateMetadata('ceilingHeight', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Studio Features</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parking"
                    checked={currentMetadata.parking}
                    onCheckedChange={(checked) => updateMetadata('parking', checked)}
                  />
                  <label htmlFor="parking" className="text-sm">Parking Available</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="naturalLight"
                    checked={currentMetadata.naturalLight}
                    onCheckedChange={(checked) => updateMetadata('naturalLight', checked)}
                  />
                  <label htmlFor="naturalLight" className="text-sm">Natural Light</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="soundProofing"
                    checked={currentMetadata.soundProofing}
                    onCheckedChange={(checked) => updateMetadata('soundProofing', checked)}
                  />
                  <label htmlFor="soundProofing" className="text-sm">Sound Proofing</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="loadingAccess"
                    checked={currentMetadata.loadingAccess}
                    onCheckedChange={(checked) => updateMetadata('loadingAccess', checked)}
                  />
                  <label htmlFor="loadingAccess" className="text-sm">Loading Access</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="greenScreen"
                    checked={currentMetadata.greenScreen}
                    onCheckedChange={(checked) => updateMetadata('greenScreen', checked)}
                  />
                  <label htmlFor="greenScreen" className="text-sm">Green Screen</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cyc"
                    checked={currentMetadata.cyc}
                    onCheckedChange={(checked) => updateMetadata('cyc', checked)}
                  />
                  <label htmlFor="cyc" className="text-sm">Cyc Wall</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="grip"
                    checked={currentMetadata.grip}
                    onCheckedChange={(checked) => updateMetadata('grip', checked)}
                  />
                  <label htmlFor="grip" className="text-sm">Grip Equipment</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="catering"
                    checked={currentMetadata.catering}
                    onCheckedChange={(checked) => updateMetadata('catering', checked)}
                  />
                  <label htmlFor="catering" className="text-sm">Catering Area</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="makeupRoom"
                    checked={currentMetadata.makeupRoom}
                    onCheckedChange={(checked) => updateMetadata('makeupRoom', checked)}
                  />
                  <label htmlFor="makeupRoom" className="text-sm">Makeup Room</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="clientArea"
                    checked={currentMetadata.clientArea}
                    onCheckedChange={(checked) => updateMetadata('clientArea', checked)}
                  />
                  <label htmlFor="clientArea" className="text-sm">Client Area</label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images">
            <ImageGallery
              propertyId={property.id}
              images={property.images}
              onAddImage={onAddImage}
              onUpdateImage={onUpdateImage}
              onDeleteImage={onDeleteImage}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyEditModal;
