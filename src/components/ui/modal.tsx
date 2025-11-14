import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

// Modal context for managing stacking and focus
interface ModalContextValue {
  level: number
  onClose: () => void
  isFullscreen: boolean
  setFullscreen: (fullscreen: boolean) => void
}

const ModalContext = React.createContext<ModalContextValue | null>(null)

// Modal stack manager
class ModalStackManager {
  private static instance: ModalStackManager
  private stack: string[] = []
  private listeners: Set<() => void> = new Set()

  static getInstance(): ModalStackManager {
    if (!ModalStackManager.instance) {
      ModalStackManager.instance = new ModalStackManager()
    }
    return ModalStackManager.instance
  }

  push(id: string): number {
    this.stack.push(id)
    this.notifyListeners()
    return this.stack.length
  }

  remove(id: string): void {
    const index = this.stack.indexOf(id)
    if (index > -1) {
      this.stack.splice(index, 1)
      this.notifyListeners()
    }
  }

  getLevel(id: string): number {
    return this.stack.indexOf(id) + 1
  }

  getTopLevel(): number {
    return this.stack.length
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener())
  }
}

// Enhanced overlay with backdrop blur
const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    blur?: boolean
    level?: number
  }
>(({ className, blur = true, level = 1, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 bg-black/50 transition-all duration-300",
      blur && "backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    style={{
      zIndex: 50 + level * 10,
      backgroundColor: `rgba(0, 0, 0, ${Math.min(0.5 + (level - 1) * 0.1, 0.8)})`
    }}
    {...props}
  />
))
ModalOverlay.displayName = "ModalOverlay"

// Modal content variants
const modalContentVariants = cva(
  [
    "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
    "grid w-full gap-4 border bg-background shadow-lg",
    "transition-all duration-300 ease-out",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
    "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
    "focus:outline-none"
  ],
  {
    variants: {
      size: {
        xs: "max-w-xs p-4 rounded-lg",
        sm: "max-w-sm p-4 rounded-lg",
        md: "max-w-md p-6 rounded-lg",
        lg: "max-w-lg p-6 rounded-lg",
        xl: "max-w-xl p-6 rounded-lg",
        "2xl": "max-w-2xl p-8 rounded-lg",
        "3xl": "max-w-3xl p-8 rounded-lg",
        "4xl": "max-w-4xl p-8 rounded-lg",
        "5xl": "max-w-5xl p-8 rounded-lg",
        "6xl": "max-w-6xl p-8 rounded-lg",
        "7xl": "max-w-7xl p-8 rounded-lg",
        full: "w-[95vw] h-[95vh] max-w-none p-8 rounded-lg",
        fullscreen: "w-screen h-screen max-w-none p-0 rounded-none top-0 left-0 translate-x-0 translate-y-0"
      },
      variant: {
        default: "border-border",
        destructive: "border-destructive/50 bg-destructive/5",
        success: "border-green-500/50 bg-green-500/5",
        warning: "border-yellow-500/50 bg-yellow-500/5",
        info: "border-blue-500/50 bg-blue-500/5"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
)

// Enhanced modal content
const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & 
  VariantProps<typeof modalContentVariants> & {
    showCloseButton?: boolean
    showFullscreenButton?: boolean
    blur?: boolean
    level?: number
    onFullscreenChange?: (fullscreen: boolean) => void
  }
>(({ 
  className, 
  children, 
  size, 
  variant,
  showCloseButton = true,
  showFullscreenButton = false,
  blur = true,
  level = 1,
  onFullscreenChange,
  ...props 
}, ref) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  
  const handleFullscreenToggle = () => {
    const newFullscreen = !isFullscreen
    setIsFullscreen(newFullscreen)
    onFullscreenChange?.(newFullscreen)
  }

  const contextValue: ModalContextValue = {
    level,
    onClose: () => {}, // Will be set by Modal component
    isFullscreen,
    setFullscreen: setIsFullscreen
  }

  return (
    <DialogPrimitive.Portal>
      <ModalOverlay blur={blur} level={level} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          modalContentVariants({ 
            size: isFullscreen ? "fullscreen" : size, 
            variant, 
            className 
          })
        )}
        style={{
          zIndex: 50 + level * 10 + 1
        }}
        {...props}
      >
        <ModalContext.Provider value={contextValue}>
          {/* Header with controls */}
          {(showCloseButton || showFullscreenButton) && (
            <div className="absolute right-4 top-4 flex items-center gap-1">
              {showFullscreenButton && size !== "fullscreen" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFullscreenToggle}
                  className="h-8 w-8 p-0 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  </span>
                </Button>
              )}
              
              {showCloseButton && (
                <DialogPrimitive.Close asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogPrimitive.Close>
              )}
            </div>
          )}
          
          {children}
        </ModalContext.Provider>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
})
ModalContent.displayName = "ModalContent"

// Modal root component with stack management
const Modal = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> & {
    id?: string
  }
>(({ id, onOpenChange, ...props }, ref) => {
  const modalId = React.useId()
  const finalId = id || modalId
  const [level, setLevel] = React.useState(1)
  const stackManager = ModalStackManager.getInstance()

  React.useEffect(() => {
    if (props.open) {
      const newLevel = stackManager.push(finalId)
      setLevel(newLevel)
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      
      return () => {
        stackManager.remove(finalId)
        // Only restore body scroll if no other modals are open
        if (stackManager.getTopLevel() === 0) {
          document.body.style.overflow = 'unset'
        }
      }
    }
  }, [props.open, finalId, stackManager])

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      stackManager.remove(finalId)
      if (stackManager.getTopLevel() === 0) {
        document.body.style.overflow = 'unset'
      }
    }
    onOpenChange?.(open)
  }

  return (
    <DialogPrimitive.Root
      onOpenChange={handleOpenChange}
      {...(props as any)}
    />
  )
})
Modal.displayName = "Modal"

// Modal components
const ModalTrigger = DialogPrimitive.Trigger
const ModalClose = DialogPrimitive.Close
const ModalPortal = DialogPrimitive.Portal

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left mb-4",
      className
    )}
    {...props}
  />
))
ModalHeader.displayName = "ModalHeader"

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6",
      className
    )}
    {...props}
  />
))
ModalFooter.displayName = "ModalFooter"

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = "ModalTitle"

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ModalDescription.displayName = "ModalDescription"

// Hook to use modal context
const useModal = () => {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a Modal component")
  }
  return context
}

// Utility hook for managing modal state
const useModalState = (defaultOpen = false) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  
  const open = React.useCallback(() => setIsOpen(true), [])
  const close = React.useCallback(() => setIsOpen(false), [])
  const toggle = React.useCallback(() => setIsOpen(prev => !prev), [])
  
  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen
  }
}

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
  ModalPortal,
  ModalOverlay,
  useModal,
  useModalState,
  modalContentVariants
}