import * as React from "react"
import { Upload, X, File, Image, AlertCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const fileUploadVariants = cva(
  "relative border-2 border-dashed rounded-lg transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border hover:border-primary/50 hover:bg-accent/50",
        error: "border-destructive bg-destructive/5",
        success: "border-green-500 bg-green-50 dark:bg-green-950/20",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof fileUploadVariants> {
  onFilesChange?: (files: File[]) => void
  maxFiles?: number
  maxSize?: number // in bytes
  acceptedFileTypes?: string[]
  showPreview?: boolean
  error?: string
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({
    className,
    variant,
    size,
    onFilesChange,
    maxFiles = 1,
    maxSize = 5 * 1024 * 1024, // 5MB default
    acceptedFileTypes = ["image/*"],
    showPreview = true,
    error,
    disabled,
    ...props
  }, ref) => {
    const [files, setFiles] = React.useState<File[]>([])
    const [isDragOver, setIsDragOver] = React.useState(false)
    const [uploadError, setUploadError] = React.useState<string>("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    const computedVariant = error || uploadError ? "error" : variant

    const validateFile = (file: File): string | null => {
      if (file.size > maxSize) {
        return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
      }
      
      if (acceptedFileTypes.length > 0) {
        const isValidType = acceptedFileTypes.some(type => {
          if (type.endsWith("/*")) {
            return file.type.startsWith(type.slice(0, -1))
          }
          return file.type === type
        })
        
        if (!isValidType) {
          return `File type not supported. Accepted types: ${acceptedFileTypes.join(", ")}`
        }
      }
      
      return null
    }

    const handleFiles = (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles)
      const validFiles: File[] = []
      let errorMessage = ""

      for (const file of fileArray) {
        const validationError = validateFile(file)
        if (validationError) {
          errorMessage = validationError
          break
        }
        validFiles.push(file)
      }

      if (errorMessage) {
        setUploadError(errorMessage)
        return
      }

      if (files.length + validFiles.length > maxFiles) {
        setUploadError(`Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed`)
        return
      }

      setUploadError("")
      const updatedFiles = maxFiles === 1 ? validFiles : [...files, ...validFiles]
      setFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      
      if (disabled) return
      
      const droppedFiles = e.dataTransfer.files
      handleFiles(droppedFiles)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files)
      }
    }

    const removeFile = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index)
      setFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
      setUploadError("")
    }

    const openFileDialog = () => {
      if (!disabled) {
        inputRef.current?.click()
      }
    }

    const getFileIcon = (file: File) => {
      if (file.type.startsWith("image/")) {
        return <Image className="w-4 h-4" />
      }
      return <File className="w-4 h-4" />
    }

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes"
      const k = 1024
      const sizes = ["Bytes", "KB", "MB", "GB"]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    return (
      <div className="space-y-4">
        <div
          className={cn(
            fileUploadVariants({ variant: computedVariant, size, className }),
            isDragOver && "border-primary bg-primary/5",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input
            ref={ref || inputRef}
            type="file"
            className="hidden"
            multiple={maxFiles > 1}
            accept={acceptedFileTypes.join(",")}
            onChange={handleInputChange}
            disabled={disabled}
            {...props}
          />
          
          <div className="flex flex-col items-center justify-center text-center cursor-pointer">
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-foreground mb-1">
              {isDragOver ? "Drop files here" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground">
              {acceptedFileTypes.join(", ")} up to {Math.round(maxSize / 1024 / 1024)}MB
            </p>
            {maxFiles > 1 && (
              <p className="text-xs text-muted-foreground mt-1">
                Maximum {maxFiles} files
              </p>
            )}
          </div>
        </div>

        {(error || uploadError) && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="w-4 h-4" />
            {error || uploadError}
          </div>
        )}

        {showPreview && files.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Uploaded Files</h4>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(file)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"

export { FileUpload, fileUploadVariants }