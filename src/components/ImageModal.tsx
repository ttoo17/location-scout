import React, { useState, useEffect, useCallback, useRef } from 'react'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  Share2, 
  Play, 
  Pause, 
  Maximize2,
  Minimize2,
  Grid3X3
} from 'lucide-react'
import {
  Modal,
  ModalContent,
  ModalClose
} from './ui/modal'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

// Types
export interface ImageData {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  photographer?: string
  location?: string
  tags?: string[]
}

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: ImageData[]
  initialIndex?: number
  showThumbnails?: boolean
  showInfo?: boolean
  enableSlideshow?: boolean
  enableZoom?: boolean
  enableDownload?: boolean
  enableShare?: boolean
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  showThumbnails = true,
  showInfo = true,
  enableSlideshow = true,
  enableZoom = true,
  enableDownload = true,
  enableShare = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isSlideshow, setIsSlideshow] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showThumbnailStrip, setShowThumbnailStrip] = useState(showThumbnails)
  const [showImageInfo, setShowImageInfo] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentImage = images[currentIndex]

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    resetImageTransform()
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    resetImageTransform()
  }, [images.length])

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index)
    resetImageTransform()
  }, [])

  // Transform functions
  const resetImageTransform = useCallback(() => {
    setZoom(1)
    setRotation(0)
    setPosition({ x: 0, y: 0 })
  }, [])

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.5, 5))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.5, 0.5))
  }, [])

  const handleRotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360)
  }, [])

  // Slideshow functions
  const startSlideshow = useCallback(() => {
    setIsSlideshow(true)
    slideshowIntervalRef.current = setInterval(() => {
      goToNext()
    }, 3000)
  }, [goToNext])

  const stopSlideshow = useCallback(() => {
    setIsSlideshow(false)
    if (slideshowIntervalRef.current) {
      clearInterval(slideshowIntervalRef.current)
      slideshowIntervalRef.current = null
    }
  }, [])

  // Mouse/touch handlers for pan functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }, [zoom, position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }, [isDragging, dragStart, zoom])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Download function
  const handleDownload = useCallback(async () => {
    if (!currentImage) return
    
    try {
      const response = await fetch(currentImage.src)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = currentImage.title || `image-${currentIndex + 1}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }, [currentImage, currentIndex])

  // Share function
  const handleShare = useCallback(async () => {
    if (!currentImage) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title || 'Image',
          text: currentImage.description || 'Check out this image',
          url: currentImage.src
        })
      } catch (error) {
        console.error('Share failed:', error)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(currentImage.src)
        // You could show a toast notification here
      } catch (error) {
        console.error('Copy to clipboard failed:', error)
      }
    }
  }, [currentImage])

  // Fullscreen functions
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          goToNext()
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case ' ':
          e.preventDefault()
          if (enableSlideshow) {
            isSlideshow ? stopSlideshow() : startSlideshow()
          }
          break
        case '+':
        case '=':
          e.preventDefault()
          if (enableZoom) handleZoomIn()
          break
        case '-':
          e.preventDefault()
          if (enableZoom) handleZoomOut()
          break
        case 'r':
          e.preventDefault()
          handleRotate()
          break
        case '0':
          e.preventDefault()
          resetImageTransform()
          break
        case 'i':
          e.preventDefault()
          setShowImageInfo(prev => !prev)
          break
        case 't':
          e.preventDefault()
          setShowThumbnailStrip(prev => !prev)
          break
        case 'f':
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [
    isOpen, 
    goToNext, 
    goToPrevious, 
    onClose, 
    isSlideshow, 
    startSlideshow, 
    stopSlideshow,
    handleZoomIn,
    handleZoomOut,
    handleRotate,
    resetImageTransform,
    toggleFullscreen,
    enableSlideshow,
    enableZoom
  ])

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      resetImageTransform()
      setShowImageInfo(false)
    } else {
      stopSlideshow()
      resetImageTransform()
    }
  }, [isOpen, initialIndex, resetImageTransform, stopSlideshow])

  // Cleanup slideshow on unmount
  useEffect(() => {
    return () => {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current)
      }
    }
  }, [])

  if (!currentImage) return null

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent 
        size="full" 
        className="p-0 bg-black/95 border-none"
        ref={containerRef}
      >
        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
                {currentIndex + 1} / {images.length}
              </Badge>
              {currentImage.title && (
                <h2 className="text-white font-medium text-lg">{currentImage.title}</h2>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              {enableZoom && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5}
                    className="text-white hover:bg-white/20"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-white text-sm min-w-[3rem] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={zoom >= 5}
                    className="text-white hover:bg-white/20"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Rotate */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRotate}
                className="text-white hover:bg-white/20"
              >
                <RotateCw className="h-4 w-4" />
              </Button>

              {/* Slideshow */}
              {enableSlideshow && images.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={isSlideshow ? stopSlideshow : startSlideshow}
                  className="text-white hover:bg-white/20"
                >
                  {isSlideshow ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              )}

              {/* Info Toggle */}
              {showInfo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowImageInfo(prev => !prev)}
                  className={cn(
                    "text-white hover:bg-white/20",
                    showImageInfo && "bg-white/20"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              )}

              {/* Thumbnail Toggle */}
              {showThumbnails && images.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowThumbnailStrip(prev => !prev)}
                  className={cn(
                    "text-white hover:bg-white/20",
                    showThumbnailStrip && "bg-white/20"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              )}

              {/* Fullscreen */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>

              {/* Download */}
              {enableDownload && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="text-white hover:bg-white/20"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}

              {/* Share */}
              {enableShare && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="text-white hover:bg-white/20"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              )}

              {/* Close */}
              <ModalClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </ModalClose>
            </div>
          </div>
        </div>

        {/* Main Image Container */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="lg"
                onClick={goToPrevious}
                className="absolute left-4 z-40 text-white hover:bg-white/20 rounded-full w-12 h-12"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={goToNext}
                className="absolute right-4 z-40 text-white hover:bg-white/20 rounded-full w-12 h-12"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              ref={imageRef}
              src={currentImage.src}
              alt={currentImage.alt}
              className={cn(
                "max-w-full max-h-full object-contain transition-transform duration-200",
                zoom > 1 && "cursor-move",
                isDragging && "cursor-grabbing"
              )}
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                transformOrigin: 'center center'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              draggable={false}
            />
          </div>
        </div>

        {/* Image Info Panel */}
        {showInfo && showImageInfo && currentImage && (
          <div className="absolute right-4 top-20 bottom-4 w-80 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white overflow-y-auto">
            <h3 className="font-semibold text-lg mb-2">{currentImage.title}</h3>
            {currentImage.description && (
              <p className="text-sm text-gray-300 mb-3">{currentImage.description}</p>
            )}
            
            <div className="space-y-2 text-sm">
              {currentImage.photographer && (
                <div>
                  <span className="text-gray-400">Photographer:</span>
                  <span className="ml-2">{currentImage.photographer}</span>
                </div>
              )}
              {currentImage.location && (
                <div>
                  <span className="text-gray-400">Location:</span>
                  <span className="ml-2">{currentImage.location}</span>
                </div>
              )}
              {currentImage.tags && currentImage.tags.length > 0 && (
                <div>
                  <span className="text-gray-400">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentImage.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Thumbnail Strip */}
        {showThumbnails && showThumbnailStrip && images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToImage(index)}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                    index === currentIndex 
                      ? "border-white shadow-lg scale-110" 
                      : "border-transparent hover:border-white/50"
                  )}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="absolute bottom-4 left-4 text-xs text-gray-400 space-y-1 opacity-50 hover:opacity-100 transition-opacity">
          <div>← → Navigate • Space Slideshow • + - Zoom</div>
          <div>R Rotate • I Info • T Thumbnails • F Fullscreen • Esc Close</div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ImageModal