import React, { useState, useEffect, useCallback } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  X, 
  MapPin, 
  Camera, 
  Tag, 
  Calendar, 
  DollarSign,
  Users,
  Zap,
  Car,
  Wifi,
  Coffee,
  Shield,
  Star,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  Image as ImageIcon,
  Save,
  RotateCcw
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { FileUpload } from './ui/file-upload'
import { DatePicker } from './ui/date-picker'
import { cn } from '@/lib/utils'
import { format, addDays, isSameDay, isAfter, isBefore } from 'date-fns'

// Types
interface Property {
  id: string
  title: string
  description: string
  location: string
  address: string
  price: number
  currency: string
  images: PropertyImage[]
  tags: string[]
  amenities: string[]
  specifications: PropertySpecs
  availability: AvailabilitySlot[]
  status: 'active' | 'inactive' | 'pending' | 'draft'
  rating: number
  reviews: number
  views: number
  bookings: number
  createdAt: Date
  updatedAt: Date
  owner: PropertyOwner
}

interface PropertyImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

interface PropertySpecs {
  sizeM2: number
  maxCapacity: number
  powerAmps: number
  ceilingHeight: number
  parking: boolean
  wifi: boolean
  airConditioning: boolean
  kitchen: boolean
  restroom: boolean
  security: boolean
}

interface AvailabilitySlot {
  date: Date
  status: 'available' | 'booked' | 'blocked'
  price?: number
  note?: string
}

interface PropertyOwner {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
}

interface PropertyManagementProps {
  properties?: Property[]
  onPropertySave?: (property: Property) => void
  onPropertyDelete?: (propertyId: string) => void
  onPropertyStatusChange?: (propertyId: string, status: Property['status']) => void
}

// Mock data
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Photography Studio in Makati',
    description: 'A spacious photography studio with professional lighting equipment and clean white walls.',
    location: 'Makati, Metro Manila',
    address: '123 Ayala Avenue, Makati City',
    price: 15000,
    currency: 'PHP',
    images: [
      { id: '1', url: '/api/placeholder/400/300', alt: 'Studio interior', isPrimary: true, order: 1 },
      { id: '2', url: '/api/placeholder/400/300', alt: 'Lighting setup', isPrimary: false, order: 2 }
    ],
    tags: ['studio', 'photography', 'professional', 'lighting'],
    amenities: ['Professional Lighting', 'Backdrop System', 'Changing Room', 'Equipment Storage'],
    specifications: {
      sizeM2: 500,
      maxCapacity: 25,
      powerAmps: 30,
      ceilingHeight: 4,
      parking: true,
      wifi: true,
      airConditioning: true,
      kitchen: false,
      restroom: true,
      security: true
    },
    availability: [],
    status: 'active',
    rating: 4.8,
    reviews: 127,
    views: 2340,
    bookings: 45,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-01'),
    owner: {
      id: '1',
      name: 'Maria Santos',
      email: 'maria@example.com',
      phone: '+63 917 123 4567',
      avatar: '/api/placeholder/40/40'
    }
  }
]

const availableTags = [
  'studio', 'photography', 'professional', 'lighting', 'outdoor', 'indoor',
  'rooftop', 'garden', 'industrial', 'modern', 'vintage', 'minimalist',
  'spacious', 'cozy', 'natural-light', 'artificial-light', 'backdrop',
  'equipment', 'changing-room', 'makeup-room', 'parking', 'accessible'
]

const availableAmenities = [
  'Professional Lighting', 'Backdrop System', 'Changing Room', 'Makeup Room',
  'Equipment Storage', 'Props Collection', 'Wardrobe Rack', 'Full-Length Mirror',
  'Sound System', 'Video Equipment', 'Tripods', 'Reflectors', 'Softboxes',
  'Ring Lights', 'Color Gels', 'Seamless Paper', 'Cyclorama Wall'
]

const PropertyManagement: React.FC<PropertyManagementProps> = ({
  properties = mockProperties,
  onPropertySave,
  onPropertyDelete,
  onPropertyStatusChange
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [editForm, setEditForm] = useState<Partial<Property>>({})
  const [tagInput, setTagInput] = useState('')
  const [amenityInput, setAmenityInput] = useState('')
  const [availabilityDate, setAvailabilityDate] = useState<Date | null>(null)
  const [availabilityStatus, setAvailabilityStatus] = useState<'available' | 'booked' | 'blocked'>('available')
  const [availabilityPrice, setAvailabilityPrice] = useState('')
  const [availabilityNote, setAvailabilityNote] = useState('')

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handle property selection
  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property)
    setEditForm(property)
    setIsEditing(false)
  }

  // Handle form updates
  const updateEditForm = (updates: Partial<Property>) => {
    setEditForm(prev => ({ ...prev, ...updates }))
  }

  // Handle tag management
  const addTag = (tag: string) => {
    if (tag && editForm.tags && !editForm.tags.includes(tag)) {
      updateEditForm({ tags: [...editForm.tags, tag] })
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    if (editForm.tags) {
      updateEditForm({ tags: editForm.tags.filter(tag => tag !== tagToRemove) })
    }
  }

  // Handle amenity management
  const addAmenity = (amenity: string) => {
    if (amenity && editForm.amenities && !editForm.amenities.includes(amenity)) {
      updateEditForm({ amenities: [...editForm.amenities, amenity] })
      setAmenityInput('')
    }
  }

  const removeAmenity = (amenityToRemove: string) => {
    if (editForm.amenities) {
      updateEditForm({ amenities: editForm.amenities.filter(amenity => amenity !== amenityToRemove) })
    }
  }

  // Handle availability management
  const addAvailabilitySlot = () => {
    if (availabilityDate && editForm.availability) {
      const newSlot: AvailabilitySlot = {
        date: availabilityDate,
        status: availabilityStatus,
        price: availabilityPrice ? parseFloat(availabilityPrice) : undefined,
        note: availabilityNote || undefined
      }
      
      const updatedAvailability = editForm.availability.filter(slot => 
        !isSameDay(slot.date, availabilityDate)
      )
      updatedAvailability.push(newSlot)
      
      updateEditForm({ availability: updatedAvailability })
      setAvailabilityDate(null)
      setAvailabilityPrice('')
      setAvailabilityNote('')
    }
  }

  const removeAvailabilitySlot = (date: Date) => {
    if (editForm.availability) {
      updateEditForm({
        availability: editForm.availability.filter(slot => !isSameDay(slot.date, date))
      })
    }
  }

  // Handle image upload
  const handleImageUpload = (files: File[]) => {
    // In a real app, you would upload to a server and get URLs back
    const newImages: PropertyImage[] = files.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      alt: file.name,
      isPrimary: editForm.images?.length === 0 && index === 0,
      order: (editForm.images?.length || 0) + index + 1
    }))
    
    updateEditForm({
      images: [...(editForm.images || []), ...newImages]
    })
  }

  const removeImage = (imageId: string) => {
    if (editForm.images) {
      updateEditForm({
        images: editForm.images.filter(img => img.id !== imageId)
      })
    }
  }

  const setPrimaryImage = (imageId: string) => {
    if (editForm.images) {
      updateEditForm({
        images: editForm.images.map(img => ({
          ...img,
          isPrimary: img.id === imageId
        }))
      })
    }
  }

  // Handle save
  const handleSave = () => {
    if (editForm && selectedProperty) {
      const updatedProperty: Property = {
        ...selectedProperty,
        ...editForm,
        updatedAt: new Date()
      }
      onPropertySave?.(updatedProperty)
      setSelectedProperty(updatedProperty)
      setIsEditing(false)
    }
  }

  // Handle status change
  const handleStatusChange = (propertyId: string, status: Property['status']) => {
    onPropertyStatusChange?.(propertyId, status)
    if (selectedProperty?.id === propertyId) {
      setSelectedProperty(prev => prev ? { ...prev, status } : null)
      updateEditForm({ status })
    }
  }

  const renderPropertyList = () => (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Property Cards */}
      <div className="grid gap-4">
        {filteredProperties.map(property => (
          <Card 
            key={property.id} 
            className={cn(
              "cursor-pointer transition-colors hover:bg-muted/50",
              selectedProperty?.id === property.id && "ring-2 ring-primary"
            )}
            onClick={() => handlePropertySelect(property)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <img
                  src={property.images[0]?.url || '/api/placeholder/80/60'}
                  alt={property.title}
                  className="w-20 h-15 rounded-lg object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold truncate">{property.title}</h3>
                    <Badge 
                      variant={
                        property.status === 'active' ? 'default' :
                        property.status === 'pending' ? 'secondary' :
                        property.status === 'inactive' ? 'destructive' : 'outline'
                      }
                      className="ml-2"
                    >
                      {property.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>₱{property.price.toLocaleString()}/day</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span>{property.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{property.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{property.bookings} bookings</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPropertyDetails = () => {
    if (!selectedProperty) {
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a property to view details</p>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{selectedProperty.title}</h2>
            <p className="text-muted-foreground">{selectedProperty.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            {isEditing && (
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            {renderDetailsTab()}
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            {renderImagesTab()}
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            {renderAvailabilityTab()}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {renderAnalyticsTab()}
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  const renderDetailsTab = () => (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editForm.title || ''}
              onChange={(e) => updateEditForm({ title: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              rows={4}
              value={editForm.description || ''}
              onChange={(e) => updateEditForm({ description: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-input rounded-md bg-background disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editForm.location || ''}
                onChange={(e) => updateEditForm({ location: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (₱/day)</Label>
              <Input
                id="price"
                type="number"
                value={editForm.price || ''}
                onChange={(e) => updateEditForm({ price: parseFloat(e.target.value) || 0 })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Input
              id="address"
              value={editForm.address || ''}
              onChange={(e) => updateEditForm({ address: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          {/* Status Management */}
          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex gap-2">
              {(['active', 'inactive', 'pending', 'draft'] as const).map(status => (
                <Button
                  key={status}
                  variant={editForm.status === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    if (isEditing) {
                      updateEditForm({ status })
                    } else {
                      handleStatusChange(selectedProperty!.id, status)
                    }
                  }}
                  disabled={!isEditing && editForm.status === status}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Specifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sizeM2">Size (m²)</Label>
              <Input
                id="sizeM2"
                type="number"
                value={editForm.specifications?.sizeM2 || ''}
                onChange={(e) => updateEditForm({
                  specifications: {
                    ...editForm.specifications!,
                    sizeM2: parseFloat(e.target.value) || 0
                  }
                })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxCapacity">Max Capacity</Label>
              <Input
                id="maxCapacity"
                type="number"
                value={editForm.specifications?.maxCapacity || ''}
                onChange={(e) => updateEditForm({
                  specifications: {
                    ...editForm.specifications!,
                    maxCapacity: parseInt(e.target.value) || 0
                  }
                })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="powerAmps">Power (Amps)</Label>
              <Input
                id="powerAmps"
                type="number"
                value={editForm.specifications?.powerAmps || ''}
                onChange={(e) => updateEditForm({
                  specifications: {
                    ...editForm.specifications!,
                    powerAmps: parseInt(e.target.value) || 0
                  }
                })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ceilingHeight">Ceiling Height (m)</Label>
              <Input
                id="ceilingHeight"
                type="number"
                step="0.1"
                value={editForm.specifications?.ceilingHeight || ''}
                onChange={(e) => updateEditForm({
                  specifications: {
                    ...editForm.specifications!,
                    ceilingHeight: parseFloat(e.target.value) || 0
                  }
                })}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Amenities Checkboxes */}
          <div className="space-y-3">
            <Label>Facilities</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'parking', label: 'Parking', icon: Car },
                { key: 'wifi', label: 'WiFi', icon: Wifi },
                { key: 'airConditioning', label: 'A/C', icon: Zap },
                { key: 'kitchen', label: 'Kitchen', icon: Coffee },
                { key: 'restroom', label: 'Restroom', icon: Users },
                { key: 'security', label: 'Security', icon: Shield }
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={key}
                    checked={editForm.specifications?.[key as keyof PropertySpecs] as boolean || false}
                    onChange={(e) => updateEditForm({
                      specifications: {
                        ...editForm.specifications!,
                        [key]: e.target.checked
                      }
                    })}
                    disabled={!isEditing}
                    className="rounded"
                  />
                  <Label htmlFor={key} className="flex items-center gap-2 text-sm">
                    <Icon className="h-4 w-4" />
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag(tagInput)
                  }
                }}
              />
              <Button onClick={() => addTag(tagInput)} disabled={!tagInput}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {editForm.tags?.map(tag => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
                {isEditing && (
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>

          {isEditing && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Suggested tags:</p>
              <div className="flex flex-wrap gap-1">
                {availableTags
                  .filter(tag => !editForm.tags?.includes(tag))
                  .slice(0, 10)
                  .map(tag => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      onClick={() => addTag(tag)}
                      className="text-xs"
                    >
                      {tag}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add amenity..."
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addAmenity(amenityInput)
                  }
                }}
              />
              <Button onClick={() => addAmenity(amenityInput)} disabled={!amenityInput}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="space-y-2">
            {editForm.amenities?.map(amenity => (
              <div key={amenity} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm">{amenity}</span>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAmenity(amenity)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Common amenities:</p>
              <div className="grid grid-cols-2 gap-1">
                {availableAmenities
                  .filter(amenity => !editForm.amenities?.includes(amenity))
                  .slice(0, 8)
                  .map(amenity => (
                    <Button
                      key={amenity}
                      variant="outline"
                      size="sm"
                      onClick={() => addAmenity(amenity)}
                      className="text-xs justify-start"
                    >
                      {amenity}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderImagesTab = () => (
    <div className="space-y-6">
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Images</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              onFilesSelected={handleImageUpload}
              accept="image/*"
              multiple
              maxFiles={10}
              maxSize={5 * 1024 * 1024} // 5MB
            />
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {editForm.images?.map(image => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {image.isPrimary && (
                <Badge className="absolute top-2 left-2">Primary</Badge>
              )}
              {isEditing && (
                <div className="absolute top-2 right-2 flex gap-1">
                  {!image.isPrimary && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setPrimaryImage(image.id)}
                    >
                      <Star className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            <CardContent className="p-3">
              <p className="text-sm truncate">{image.alt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderAvailabilityTab = () => (
    <div className="space-y-6">
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Add Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <DatePicker
                  date={availabilityDate}
                  onDateChange={setAvailabilityDate}
                  placeholder="Select date"
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <select
                  value={availabilityStatus}
                  onChange={(e) => setAvailabilityStatus(e.target.value as string)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Custom Price (optional)</Label>
                <Input
                  type="number"
                  placeholder="₱"
                  value={availabilityPrice}
                  onChange={(e) => setAvailabilityPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Note (optional)</Label>
                <Input
                  placeholder="Note..."
                  value={availabilityNote}
                  onChange={(e) => setAvailabilityNote(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={addAvailabilitySlot} disabled={!availabilityDate}>
              <Plus className="h-4 w-4 mr-2" />
              Add Availability
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Availability Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {editForm.availability && editForm.availability.length > 0 ? (
              <div className="space-y-2">
                {editForm.availability
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium">
                          {format(slot.date, 'MMM dd, yyyy')}
                        </div>
                        <Badge 
                          variant={
                            slot.status === 'available' ? 'default' :
                            slot.status === 'booked' ? 'destructive' : 'secondary'
                          }
                        >
                          {slot.status}
                        </Badge>
                        {slot.price && (
                          <span className="text-sm text-muted-foreground">
                            ₱{slot.price.toLocaleString()}
                          </span>
                        )}
                        {slot.note && (
                          <span className="text-sm text-muted-foreground">
                            {slot.note}
                          </span>
                        )}
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAvailabilitySlot(slot.date)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No availability slots configured</p>
                <p className="text-sm">Add availability slots to manage bookings</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalyticsTab = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{selectedProperty?.views.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">Total page views</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{selectedProperty?.bookings}</div>
          <p className="text-sm text-muted-foreground">Total bookings</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{selectedProperty?.rating}</div>
          <p className="text-sm text-muted-foreground">{selectedProperty?.reviews} reviews</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₱{((selectedProperty?.bookings || 0) * (selectedProperty?.price || 0)).toLocaleString()}
          </div>
          <p className="text-sm text-muted-foreground">Estimated total</p>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-full">
      {/* Property List */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Properties ({filteredProperties.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4">
              {renderPropertyList()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Details */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardContent className="p-6">
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              {renderPropertyDetails()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PropertyManagement