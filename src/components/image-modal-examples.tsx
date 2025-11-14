import React, { useState } from 'react'
import ImageModal from './ImageModal'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Image as ImageIcon, 
  Play, 
  ZoomIn, 
  RotateCw, 
  Download, 
  Share2,
  Grid3X3,
  Maximize2,
  Camera,
  MapPin,
  Tag,
  Eye,
  Heart,
  Star
} from 'lucide-react'

// Mock image data
const mockImages = [
  {
    id: '1',
    src: '/api/placeholder/1200/800',
    alt: 'Modern Photography Studio Interior',
    title: 'Modern Photography Studio Interior',
    description: 'A spacious photography studio with professional lighting equipment and clean white walls, perfect for portrait and product photography.',
    photographer: 'Maria Santos',
    location: 'Makati, Metro Manila',
    tags: ['studio', 'photography', 'professional', 'lighting', 'interior']
  },
  {
    id: '2',
    src: '/api/placeholder/1200/800',
    alt: 'Rooftop Venue City Skyline',
    title: 'Rooftop Venue with City Skyline',
    description: 'Stunning rooftop location offering panoramic views of the city skyline, ideal for fashion shoots and commercial photography.',
    photographer: 'Juan dela Cruz',
    location: 'BGC, Taguig',
    tags: ['rooftop', 'skyline', 'urban', 'fashion', 'commercial']
  },
  {
    id: '3',
    src: '/api/placeholder/1200/800',
    alt: 'Beach Resort Location',
    title: 'Tropical Beach Resort Location',
    description: 'Beautiful beachfront resort with crystal clear waters and white sand, perfect for lifestyle and travel photography.',
    photographer: 'Anna Reyes',
    location: 'Batangas',
    tags: ['beach', 'resort', 'tropical', 'lifestyle', 'travel']
  },
  {
    id: '4',
    src: '/api/placeholder/1200/800',
    alt: 'Industrial Warehouse Space',
    title: 'Industrial Warehouse Space',
    description: 'Raw industrial space with exposed brick walls and high ceilings, great for edgy fashion shoots and music videos.',
    photographer: 'Carlos Mendoza',
    location: 'Quezon City',
    tags: ['industrial', 'warehouse', 'raw', 'fashion', 'music video']
  },
  {
    id: '5',
    src: '/api/placeholder/1200/800',
    alt: 'Garden Venue Natural Light',
    title: 'Garden Venue with Natural Light',
    description: 'Lush garden setting with abundant natural light filtering through trees, perfect for romantic and nature-themed shoots.',
    photographer: 'Sofia Garcia',
    location: 'Tagaytay',
    tags: ['garden', 'natural light', 'romantic', 'nature', 'outdoor']
  },
  {
    id: '6',
    src: '/api/placeholder/1200/800',
    alt: 'Minimalist Office Space',
    title: 'Minimalist Office Space',
    description: 'Clean, modern office environment with floor-to-ceiling windows and minimalist design, ideal for corporate photography.',
    photographer: 'Robert Tan',
    location: 'Ortigas, Pasig',
    tags: ['office', 'minimalist', 'corporate', 'modern', 'professional']
  }
]

// Gallery grid component
const ImageGallery: React.FC<{
  images: typeof mockImages
  onImageClick: (index: number) => void
  title: string
}> = ({ images, onImageClick, title }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <p className="text-sm text-muted-foreground">
        Click any image to open in the gallery viewer
      </p>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => onImageClick(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-xs font-medium truncate bg-black/50 px-2 py-1 rounded">
                {image.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

// Feature showcase component
const FeatureShowcase: React.FC = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Full-Screen Viewing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Immersive full-screen image display</li>
          <li>• Dark background for optimal viewing</li>
          <li>• Smooth transitions between images</li>
          <li>• Responsive design for all screen sizes</li>
          <li>• Touch and swipe support on mobile</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ZoomIn className="h-5 w-5" />
          Zoom & Pan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Zoom in up to 500% for detail viewing</li>
          <li>• Smooth pan functionality when zoomed</li>
          <li>• Mouse wheel zoom support</li>
          <li>• Touch pinch-to-zoom on mobile</li>
          <li>• Reset zoom with keyboard shortcut</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Slideshow Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Auto-advance slideshow with 3s intervals</li>
          <li>• Play/pause controls</li>
          <li>• Keyboard spacebar toggle</li>
          <li>• Seamless loop through all images</li>
          <li>• Visual indicators for slideshow state</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3X3 className="h-5 w-5" />
          Thumbnail Navigation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Thumbnail strip at bottom of viewer</li>
          <li>• Click to jump to any image instantly</li>
          <li>• Current image highlighting</li>
          <li>• Smooth scrolling for large galleries</li>
          <li>• Toggle visibility with keyboard shortcut</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RotateCw className="h-5 w-5" />
          Image Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Rotate images in 90° increments</li>
          <li>• Download original image files</li>
          <li>• Share images via native sharing</li>
          <li>• Fullscreen mode support</li>
          <li>• Image information panel</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Maximize2 className="h-5 w-5" />
          Keyboard Shortcuts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• ← → Arrow keys for navigation</li>
          <li>• Space bar for slideshow toggle</li>
          <li>• + - keys for zoom control</li>
          <li>• R key for rotation</li>
          <li>• I key for info panel toggle</li>
          <li>• T key for thumbnail toggle</li>
          <li>• F key for fullscreen</li>
          <li>• Esc key to close modal</li>
        </ul>
      </CardContent>
    </Card>
  </div>
)

// Usage examples component
const UsageExamples: React.FC = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Basic Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import ImageModal from './ImageModal'

const images = [
  {
    id: '1',
    src: '/image1.jpg',
    alt: 'Image 1',
    title: 'Beautiful Landscape'
  },
  // ... more images
]

function Gallery() {
  const [isOpen, setIsOpen] = useState(false)
  const [initialIndex, setInitialIndex] = useState(0)

  const openModal = (index) => {
    setInitialIndex(index)
    setIsOpen(true)
  }

  return (
    <>
      {/* Your gallery grid */}
      <ImageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        images={images}
        initialIndex={initialIndex}
      />
    </>
  )
}`}
        </pre>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Advanced Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`<ImageModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  images={images}
  initialIndex={0}
  showThumbnails={true}
  showInfo={true}
  enableSlideshow={true}
  enableZoom={true}
  enableDownload={true}
  enableShare={true}
/>`}
        </pre>
      </CardContent>
    </Card>
  </div>
)

// Main examples component
export function ImageModalExamples() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialIndex, setInitialIndex] = useState(0)
  const [modalConfig, setModalConfig] = useState({
    showThumbnails: true,
    showInfo: true,
    enableSlideshow: true,
    enableZoom: true,
    enableDownload: true,
    enableShare: true
  })

  const openModal = (index: number) => {
    setInitialIndex(index)
    setIsModalOpen(true)
  }

  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">ImageModal Gallery Viewer</h1>
        <p className="text-muted-foreground mb-8">
          Full-featured image gallery modal with zoom, pan, slideshow, and navigation
        </p>

        {/* Feature Overview */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Gallery Features</h2>
          <FeatureShowcase />
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive Examples</h2>
          
          <Tabs defaultValue="gallery" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="gallery">Image Gallery</TabsTrigger>
              <TabsTrigger value="features">Feature Demo</TabsTrigger>
              <TabsTrigger value="usage">Usage Examples</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gallery" className="space-y-4">
              <ImageGallery
                images={mockImages}
                onImageClick={openModal}
                title="Photography Location Gallery"
              />
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Navigation Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Arrow Navigation</h4>
                          <p className="text-sm text-muted-foreground">
                            Use left/right arrows or keyboard keys to navigate
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Thumbnail Strip</h4>
                          <p className="text-sm text-muted-foreground">
                            Click thumbnails to jump to any image instantly
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Image Counter</h4>
                          <p className="text-sm text-muted-foreground">
                            Always know your position in the gallery
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Interaction Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <ZoomIn className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">Zoom & Pan</h4>
                          <p className="text-sm text-muted-foreground">
                            Zoom up to 500% and pan around the image
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <RotateCw className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">Rotation</h4>
                          <p className="text-sm text-muted-foreground">
                            Rotate images in 90-degree increments
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Play className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">Slideshow</h4>
                          <p className="text-sm text-muted-foreground">
                            Auto-advance through images with timing control
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Information Display</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Photographer credits</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Location information</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Image tags and categories</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Detailed descriptions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Sharing & Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Download original images</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Native sharing support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Fullscreen viewing mode</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Favorite and bookmark</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="usage" className="space-y-4">
              <UsageExamples />
            </TabsContent>
            
            <TabsContent value="config" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Modal Configuration</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Customize the modal behavior by toggling these options
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Show Thumbnails</label>
                        <input
                          type="checkbox"
                          checked={modalConfig.showThumbnails}
                          onChange={(e) => setModalConfig(prev => ({ 
                            ...prev, 
                            showThumbnails: e.target.checked 
                          }))}
                          className="rounded"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Show Image Info</label>
                        <input
                          type="checkbox"
                          checked={modalConfig.showInfo}
                          onChange={(e) => setModalConfig(prev => ({ 
                            ...prev, 
                            showInfo: e.target.checked 
                          }))}
                          className="rounded"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Enable Slideshow</label>
                        <input
                          type="checkbox"
                          checked={modalConfig.enableSlideshow}
                          onChange={(e) => setModalConfig(prev => ({ 
                            ...prev, 
                            enableSlideshow: e.target.checked 
                          }))}
                          className="rounded"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Enable Zoom</label>
                        <input
                          type="checkbox"
                          checked={modalConfig.enableZoom}
                          onChange={(e) => setModalConfig(prev => ({ 
                            ...prev, 
                            enableZoom: e.target.checked 
                          }))}
                          className="rounded"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Enable Download</label>
                        <input
                          type="checkbox"
                          checked={modalConfig.enableDownload}
                          onChange={(e) => setModalConfig(prev => ({ 
                            ...prev, 
                            enableDownload: e.target.checked 
                          }))}
                          className="rounded"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Enable Share</label>
                        <input
                          type="checkbox"
                          checked={modalConfig.enableShare}
                          onChange={(e) => setModalConfig(prev => ({ 
                            ...prev, 
                            enableShare: e.target.checked 
                          }))}
                          className="rounded"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button onClick={() => openModal(0)} className="w-full">
                      Test Modal with Current Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Keyboard Shortcuts Reference */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Keyboard Shortcuts</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>← →</span>
                    <span className="text-muted-foreground">Navigate images</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Esc</span>
                    <span className="text-muted-foreground">Close modal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Space</span>
                    <span className="text-muted-foreground">Toggle slideshow</span>
                  </div>
                  <div className="flex justify-between">
                    <span>+ -</span>
                    <span className="text-muted-foreground">Zoom in/out</span>
                  </div>
                  <div className="flex justify-between">
                    <span>R</span>
                    <span className="text-muted-foreground">Rotate image</span>
                  </div>
                  <div className="flex justify-between">
                    <span>0</span>
                    <span className="text-muted-foreground">Reset zoom</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>I</span>
                    <span className="text-muted-foreground">Toggle info panel</span>
                  </div>
                  <div className="flex justify-between">
                    <span>T</span>
                    <span className="text-muted-foreground">Toggle thumbnails</span>
                  </div>
                  <div className="flex justify-between">
                    <span>F</span>
                    <span className="text-muted-foreground">Toggle fullscreen</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Image Modal */}
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          images={mockImages}
          initialIndex={initialIndex}
          {...modalConfig}
        />
      </div>
    </div>
  )
}

export default ImageModalExamples