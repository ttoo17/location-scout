
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash, X, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PropertyImage } from "@/services/mockDataService";

interface ImageGalleryProps {
  propertyId: string;
  images: PropertyImage[];
  onAddImage: (propertyId: string, imageData: Omit<PropertyImage, "id">) => void;
  onUpdateImage: (propertyId: string, imageId: string, updates: Partial<PropertyImage>) => void;
  onDeleteImage: (propertyId: string, imageId: string) => void;
}

const FILM_PHOTO_TAGS = [
  // Lighting
  "natural-light", "artificial-light", "golden-hour", "blue-hour", "dramatic-lighting", "soft-light", "hard-light", "backlit", "rim-light", "fill-light",
  // Shot Types
  "wide-angle", "close-up", "medium-shot", "establishing-shot", "aerial", "drone", "handheld", "tripod", "steadicam",
  // Seasons/Weather
  "spring", "summer", "autumn", "winter", "sunny", "cloudy", "overcast", "rainy", "stormy", "foggy", "misty",
  // Location Types
  "interior", "exterior", "urban", "rural", "industrial", "residential", "commercial", "historic", "modern", "vintage",
  // Colors
  "monochrome", "high-contrast", "saturated", "desaturated", "warm-tones", "cool-tones", "blue", "red", "green", "yellow", "orange", "purple", "black", "white", "gray",
  // Technical
  "4k", "8k", "raw", "log", "hdr", "low-key", "high-key", "shallow-dof", "deep-focus", "bokeh",
  // Production
  "commercial", "documentary", "narrative", "music-video", "corporate", "wedding", "fashion", "portrait", "landscape", "architecture"
];

const ImageGallery = ({ propertyId, images, onAddImage, onUpdateImage, onDeleteImage }: ImageGalleryProps) => {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<PropertyImage | null>(null);
  const [newImageData, setNewImageData] = useState({
    url: "",
    title: "",
    description: "",
    alt: "",
    tags: [] as string[],
    isPrimary: false
  });

  const handleAddImage = () => {
    if (!newImageData.url || !newImageData.title) {
      toast({ title: "Missing Information", description: "Please provide at least URL and title.", variant: "destructive" });
      return;
    }

    onAddImage(propertyId, newImageData);
    setNewImageData({ url: "", title: "", description: "", alt: "", tags: [], isPrimary: false });
    setIsAddModalOpen(false);
    toast({ title: "Image Added", description: "New image has been added to the property." });
  };

  const handleUpdateImage = () => {
    if (!editingImage) return;
    
    onUpdateImage(propertyId, editingImage.id, editingImage);
    setEditingImage(null);
    toast({ title: "Image Updated", description: "Image has been updated successfully." });
  };

  const handleDeleteImage = (imageId: string, imageTitle: string) => {
    onDeleteImage(propertyId, imageId);
    toast({ title: "Image Deleted", description: `"${imageTitle}" has been removed.`, variant: "destructive" });
  };

  const addTag = (tag: string, isNewImage: boolean = false) => {
    if (isNewImage) {
      if (!newImageData.tags.includes(tag)) {
        setNewImageData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      }
    } else if (editingImage) {
      if (!editingImage.tags.includes(tag)) {
        setEditingImage({ ...editingImage, tags: [...editingImage.tags, tag] });
      }
    }
  };

  const removeTag = (tagIndex: number, isNewImage: boolean = false) => {
    if (isNewImage) {
      setNewImageData(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== tagIndex) }));
    } else if (editingImage) {
      setEditingImage({ ...editingImage, tags: editingImage.tags.filter((_, i) => i !== tagIndex) });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Image Gallery ({images.length})</h3>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Image URL"
                value={newImageData.url}
                onChange={(e) => setNewImageData(prev => ({ ...prev, url: e.target.value }))}
              />
              <Input
                placeholder="Title"
                value={newImageData.title}
                onChange={(e) => setNewImageData(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="Description"
                value={newImageData.description}
                onChange={(e) => setNewImageData(prev => ({ ...prev, description: e.target.value }))}
              />
              <Input
                placeholder="Alt text"
                value={newImageData.alt}
                onChange={(e) => setNewImageData(prev => ({ ...prev, alt: e.target.value }))}
              />
              
              <div>
                <label className="text-sm font-medium mb-2 block">Tags (Film/Photo specific)</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {FILM_PHOTO_TAGS.map(tag => (
                    <Badge 
                      key={tag} 
                      variant={newImageData.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => addTag(tag, true)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {newImageData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(index, true)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="primary"
                  checked={newImageData.isPrimary}
                  onCheckedChange={(checked) => setNewImageData(prev => ({ ...prev, isPrimary: !!checked }))}
                />
                <label htmlFor="primary" className="text-sm">Set as Primary Image</label>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleAddImage} className="flex-1">Add Image</Button>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative">
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-48 object-cover"
              />
              {image.isPrimary && (
                <Star className="absolute top-2 left-2 h-5 w-5 fill-yellow-400 text-yellow-400" />
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setEditingImage(image)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash className="h-3 w-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Image</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{image.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteImage(image.id, image.title)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <CardContent className="p-3">
              <h4 className="font-medium truncate">{image.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {image.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                ))}
                {image.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">+{image.tags.length - 3}</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Image Modal */}
      <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          {editingImage && (
            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={editingImage.title}
                onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={editingImage.description}
                onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })}
              />
              <Input
                placeholder="Alt text"
                value={editingImage.alt}
                onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
              />
              
              <div>
                <label className="text-sm font-medium mb-2 block">Tags (Film/Photo specific)</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {FILM_PHOTO_TAGS.map(tag => (
                    <Badge 
                      key={tag} 
                      variant={editingImage.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => addTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {editingImage.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-primary"
                  checked={editingImage.isPrimary}
                  onCheckedChange={(checked) => setEditingImage({ ...editingImage, isPrimary: !!checked })}
                />
                <label htmlFor="edit-primary" className="text-sm">Set as Primary Image</label>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleUpdateImage} className="flex-1">Update Image</Button>
                <Button variant="outline" onClick={() => setEditingImage(null)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
