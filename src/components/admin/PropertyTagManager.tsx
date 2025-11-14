
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PropertyTagManagerProps {
  propertyId: string;
  tags: string[];
  onAddTag: (propertyId: string, tag: string) => void;
  onDeleteTag: (propertyId: string, tagIndex: number) => void;
  onUpdateTag: (propertyId: string, tagIndex: number, newTag: string) => void;
}

const PropertyTagManager = ({ propertyId, tags, onAddTag, onDeleteTag, onUpdateTag }: PropertyTagManagerProps) => {
  const { toast } = useToast();
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    onAddTag(propertyId, newTag.trim());
    setNewTag("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add tag (e.g., romantic, beach, sunset)"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleAddTag} className="bg-coral-500 hover:bg-coral-600">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-3 py-1 flex items-center gap-2">
            <span className="text-sm">{tag}</span>
            <Button
              size="sm"
              variant="ghost"
              className="h-4 w-4 p-0 hover:bg-red-100"
              onClick={() => onDeleteTag(propertyId, index)}
            >
              <X className="h-3 w-3 text-red-500" />
            </Button>
          </Badge>
        ))}
      </div>
      
      {tags.length === 0 && (
        <p className="text-sm text-gray-500">No tags added yet. Add tags to help users find this property.</p>
      )}
    </div>
  );
};

export default PropertyTagManager;
