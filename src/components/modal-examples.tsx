import React, { useState } from 'react'
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
  useModalState
} from './ui/modal'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Settings, 
  Image as ImageIcon,
  Calendar,
  MessageSquare,
  Trash2,
  Edit,
  Plus
} from 'lucide-react'

// Example component showcasing the modal system
export function ModalExamples() {
  const [stackedModals, setStackedModals] = useState(0)
  
  // Modal state hooks for different examples
  const basicModal = useModalState()
  const confirmModal = useModalState()
  const formModal = useModalState()
  const fullscreenModal = useModalState()
  const nestedModal = useModalState()

  const handleStackedModal = () => {
    setStackedModals(prev => prev + 1)
  }

  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Comprehensive Modal System</h1>
        <p className="text-muted-foreground mb-8">
          Unified modal framework with size variants, backdrop blur, focus management, and modal stacking
        </p>

        {/* Modal Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Modal Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>📐 Size Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 12 size options (xs to 7xl)</li>
                  <li>• Full and fullscreen modes</li>
                  <li>• Responsive sizing</li>
                  <li>• Custom size support</li>
                  <li>• Automatic content fitting</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎨 Visual Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Default, destructive, success</li>
                  <li>• Warning and info variants</li>
                  <li>• Custom color schemes</li>
                  <li>• Backdrop blur effects</li>
                  <li>• Smooth animations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🔄 Modal Stacking</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Automatic z-index management</li>
                  <li>• Multiple modal support</li>
                  <li>• Focus trap management</li>
                  <li>• Backdrop layering</li>
                  <li>• Stack level tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⌨️ Focus Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Automatic focus trapping</li>
                  <li>• Keyboard navigation</li>
                  <li>• Escape key handling</li>
                  <li>• Return focus on close</li>
                  <li>• Screen reader support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎭 Animations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Smooth enter/exit transitions</li>
                  <li>• Backdrop fade effects</li>
                  <li>• Scale and slide animations</li>
                  <li>• Customizable timing</li>
                  <li>• Hardware acceleration</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🛠️ Developer Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• useModalState hook</li>
                  <li>• TypeScript support</li>
                  <li>• Composable components</li>
                  <li>• Event callbacks</li>
                  <li>• Easy customization</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive Examples</h2>
          
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Modals</TabsTrigger>
              <TabsTrigger value="sizes">Size Variants</TabsTrigger>
              <TabsTrigger value="variants">Visual Variants</TabsTrigger>
              <TabsTrigger value="stacking">Modal Stacking</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Modal Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {/* Simple Modal */}
                    <Modal open={basicModal.isOpen} onOpenChange={basicModal.setIsOpen}>
                      <ModalTrigger asChild>
                        <Button onClick={basicModal.open}>Simple Modal</Button>
                      </ModalTrigger>
                      <ModalContent size="md">
                        <ModalHeader>
                          <ModalTitle>Simple Modal</ModalTitle>
                          <ModalDescription>
                            This is a basic modal with default styling and behavior.
                          </ModalDescription>
                        </ModalHeader>
                        <div className="py-4">
                          <p className="text-sm text-muted-foreground">
                            Modal content goes here. This modal demonstrates the basic functionality
                            with proper focus management and keyboard navigation.
                          </p>
                        </div>
                        <ModalFooter>
                          <ModalClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </ModalClose>
                          <Button onClick={basicModal.close}>Confirm</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    {/* Confirmation Modal */}
                    <Modal open={confirmModal.isOpen} onOpenChange={confirmModal.setIsOpen}>
                      <ModalTrigger asChild>
                        <Button variant="destructive" onClick={confirmModal.open}>
                          Delete Item
                        </Button>
                      </ModalTrigger>
                      <ModalContent size="sm" variant="destructive">
                        <ModalHeader>
                          <ModalTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            Confirm Deletion
                          </ModalTitle>
                          <ModalDescription>
                            Are you sure you want to delete this item? This action cannot be undone.
                          </ModalDescription>
                        </ModalHeader>
                        <ModalFooter>
                          <ModalClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </ModalClose>
                          <Button variant="destructive" onClick={confirmModal.close}>
                            Delete
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    {/* Form Modal */}
                    <Modal open={formModal.isOpen} onOpenChange={formModal.setIsOpen}>
                      <ModalTrigger asChild>
                        <Button variant="outline" onClick={formModal.open}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Item
                        </Button>
                      </ModalTrigger>
                      <ModalContent size="lg">
                        <ModalHeader>
                          <ModalTitle>Add New Item</ModalTitle>
                          <ModalDescription>
                            Fill out the form below to add a new item to your collection.
                          </ModalDescription>
                        </ModalHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter item name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" placeholder="Enter description" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" placeholder="Enter category" />
                          </div>
                        </div>
                        <ModalFooter>
                          <ModalClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </ModalClose>
                          <Button onClick={formModal.close}>Add Item</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sizes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Modal Size Variants</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Choose from 12 different size options to fit your content
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { size: 'xs', label: 'Extra Small' },
                      { size: 'sm', label: 'Small' },
                      { size: 'md', label: 'Medium' },
                      { size: 'lg', label: 'Large' },
                      { size: 'xl', label: 'Extra Large' },
                      { size: '2xl', label: '2X Large' },
                      { size: '3xl', label: '3X Large' },
                      { size: '4xl', label: '4X Large' },
                      { size: '5xl', label: '5X Large' },
                      { size: '6xl', label: '6X Large' },
                      { size: '7xl', label: '7X Large' },
                      { size: 'full', label: 'Full Size' }
                    ].map(({ size, label }) => (
                      <Modal key={size}>
                        <ModalTrigger asChild>
                          <Button variant="outline" size="sm" className="text-xs">
                            {size.toUpperCase()}
                          </Button>
                        </ModalTrigger>
                        <ModalContent size={size as any}>
                          <ModalHeader>
                            <ModalTitle>{label} Modal</ModalTitle>
                            <ModalDescription>
                              This is a {label.toLowerCase()} modal ({size}) demonstrating the size variant.
                            </ModalDescription>
                          </ModalHeader>
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground">
                              Modal content scales appropriately with the selected size variant.
                              The {size} size provides {size === 'xs' ? 'minimal' : size === 'full' ? 'maximum' : 'optimal'} space for content.
                            </p>
                          </div>
                          <ModalFooter>
                            <ModalClose asChild>
                              <Button>Close</Button>
                            </ModalClose>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="variants" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visual Variants</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Different visual styles for different contexts
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { variant: 'default', label: 'Default', icon: Settings },
                      { variant: 'destructive', label: 'Destructive', icon: AlertTriangle },
                      { variant: 'success', label: 'Success', icon: CheckCircle },
                      { variant: 'warning', label: 'Warning', icon: AlertTriangle },
                      { variant: 'info', label: 'Info', icon: Info }
                    ].map(({ variant, label, icon: Icon }) => (
                      <Modal key={variant}>
                        <ModalTrigger asChild>
                          <Button 
                            variant={variant === 'destructive' ? 'destructive' : 'outline'}
                            className="flex items-center gap-2"
                          >
                            <Icon className="h-4 w-4" />
                            {label}
                          </Button>
                        </ModalTrigger>
                        <ModalContent size="md" variant={variant as any}>
                          <ModalHeader>
                            <ModalTitle className="flex items-center gap-2">
                              <Icon className="h-5 w-5" />
                              {label} Modal
                            </ModalTitle>
                            <ModalDescription>
                              This modal uses the {variant} variant styling.
                            </ModalDescription>
                          </ModalHeader>
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground">
                              The {variant} variant provides appropriate visual cues for {variant} actions or information.
                            </p>
                          </div>
                          <ModalFooter>
                            <ModalClose asChild>
                              <Button variant="outline">Close</Button>
                            </ModalClose>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stacking" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Modal Stacking</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Demonstrate multiple modals with proper z-index management
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Button onClick={handleStackedModal}>
                        Open Stacked Modal
                      </Button>
                      <Badge variant="secondary">
                        Active Modals: {stackedModals}
                      </Badge>
                    </div>
                    
                    {/* Render stacked modals */}
                    {Array.from({ length: stackedModals }, (_, index) => (
                      <Modal 
                        key={index} 
                        open={true} 
                        onOpenChange={(open) => {
                          if (!open) {
                            setStackedModals(prev => Math.max(0, prev - 1))
                          }
                        }}
                      >
                        <ModalContent size="md" level={index + 1}>
                          <ModalHeader>
                            <ModalTitle>Modal Level {index + 1}</ModalTitle>
                            <ModalDescription>
                              This is modal number {index + 1} in the stack.
                            </ModalDescription>
                          </ModalHeader>
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground mb-4">
                              Each modal is properly layered with appropriate z-index values.
                              The backdrop becomes progressively darker with each level.
                            </p>
                            {index < 2 && (
                              <Button onClick={handleStackedModal} size="sm">
                                Open Another Modal
                              </Button>
                            )}
                          </div>
                          <ModalFooter>
                            <ModalClose asChild>
                              <Button>Close This Modal</Button>
                            </ModalClose>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Features</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fullscreen mode, nested modals, and custom controls
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {/* Fullscreen Modal */}
                    <Modal open={fullscreenModal.isOpen} onOpenChange={fullscreenModal.setIsOpen}>
                      <ModalTrigger asChild>
                        <Button onClick={fullscreenModal.open}>
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Fullscreen Modal
                        </Button>
                      </ModalTrigger>
                      <ModalContent 
                        size="fullscreen" 
                        showFullscreenButton={true}
                        className="bg-black text-white"
                      >
                        <ModalHeader className="text-center">
                          <ModalTitle className="text-2xl">Fullscreen Experience</ModalTitle>
                          <ModalDescription className="text-gray-300">
                            This modal takes up the entire screen for immersive content.
                          </ModalDescription>
                        </ModalHeader>
                        <div className="flex-1 flex items-center justify-center py-8">
                          <div className="text-center space-y-4">
                            <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/50 rounded-full mx-auto flex items-center justify-center">
                              <ImageIcon className="h-16 w-16" />
                            </div>
                            <p className="text-lg text-gray-300">
                              Perfect for image galleries, video players, or immersive experiences.
                            </p>
                          </div>
                        </div>
                        <ModalFooter className="justify-center">
                          <ModalClose asChild>
                            <Button variant="outline">Exit Fullscreen</Button>
                          </ModalClose>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    {/* Nested Modal */}
                    <Modal open={nestedModal.isOpen} onOpenChange={nestedModal.setIsOpen}>
                      <ModalTrigger asChild>
                        <Button variant="outline" onClick={nestedModal.open}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Nested Modal
                        </Button>
                      </ModalTrigger>
                      <ModalContent size="lg">
                        <ModalHeader>
                          <ModalTitle>Parent Modal</ModalTitle>
                          <ModalDescription>
                            This modal can open child modals while maintaining proper focus management.
                          </ModalDescription>
                        </ModalHeader>
                        <div className="py-4 space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Click the button below to open a nested modal. The system will properly
                            manage focus and z-index layering.
                          </p>
                          
                          <Modal>
                            <ModalTrigger asChild>
                              <Button>Open Nested Modal</Button>
                            </ModalTrigger>
                            <ModalContent size="md">
                              <ModalHeader>
                                <ModalTitle>Nested Modal</ModalTitle>
                                <ModalDescription>
                                  This is a modal opened from within another modal.
                                </ModalDescription>
                              </ModalHeader>
                              <div className="py-4">
                                <p className="text-sm text-muted-foreground">
                                  Focus is properly trapped within this nested modal.
                                  When closed, focus returns to the parent modal.
                                </p>
                              </div>
                              <ModalFooter>
                                <ModalClose asChild>
                                  <Button>Close Nested</Button>
                                </ModalClose>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </div>
                        <ModalFooter>
                          <ModalClose asChild>
                            <Button variant="outline">Close Parent</Button>
                          </ModalClose>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Technical Implementation */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Technical Implementation</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Modal Stack Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Singleton Pattern</h4>
                    <p className="text-muted-foreground">
                      ModalStackManager uses singleton pattern to maintain global modal state.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Z-Index Calculation</h4>
                    <p className="text-muted-foreground">
                      Each modal gets z-index = 50 + (level * 10) for proper layering.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Focus Management</h4>
                    <p className="text-muted-foreground">
                      Automatic focus trapping and restoration using Radix UI primitives.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">Portal Rendering</h4>
                    <p className="text-muted-foreground">
                      Modals render in portals to avoid z-index and overflow issues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Body Scroll Lock</h4>
                    <p className="text-muted-foreground">
                      Prevents background scrolling when modals are open.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Animation Optimization</h4>
                    <p className="text-muted-foreground">
                      Hardware-accelerated CSS animations for smooth transitions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ModalExamples