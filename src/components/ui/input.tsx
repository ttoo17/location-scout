import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Eye, EyeOff, AlertCircle, CheckCircle2, Search, X } from "lucide-react"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-md border bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 md:text-sm",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-ring",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
        warning: "border-yellow-500 focus-visible:ring-yellow-500",
      },
      size: {
        sm: "h-8 px-2 py-1 text-sm",
        md: "h-10 px-3 py-2",
        lg: "h-12 px-4 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  error?: string
  success?: string
  warning?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    variant, 
    size, 
    error, 
    success, 
    warning,
    icon,
    iconPosition = "left",
    ...props 
  }, ref) => {
    // Determine variant based on validation states
    const computedVariant = error ? "error" : success ? "success" : warning ? "warning" : variant

    const hasIcon = !!icon
    const iconPadding = iconPosition === "left" ? "pl-10" : "pr-10"

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            inputVariants({ variant: computedVariant, size, className }),
            hasIcon && iconPadding
          )}
          ref={ref}
          {...props}
        />
        
        {icon && (
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground",
            iconPosition === "left" ? "left-3" : "right-3",
            size === "sm" && "w-4 h-4",
            size === "md" && "w-5 h-5", 
            size === "lg" && "w-6 h-6"
          )}>
            {icon}
          </div>
        )}

        {/* Validation icons */}
        {(error || success || warning) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {error && <AlertCircle className="w-4 h-4 text-destructive" />}
            {success && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            {warning && <AlertCircle className="w-4 h-4 text-yellow-500" />}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

// Floating Label Input Component
export interface FloatingInputProps extends InputProps {
  label: string
  helperText?: string
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, helperText, className, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    const generatedId = React.useId()
    const inputId = id || `floating-input-${generatedId}`
    const helperTextId = `${inputId}-helper`
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(!!e.target.value)
      props.onBlur?.(e)
    }
    
    React.useEffect(() => {
      setHasValue(!!props.value || !!props.defaultValue)
    }, [props.value, props.defaultValue])

    const isFloating = isFocused || hasValue

    return (
      <div className="relative">
        <Input
          ref={ref}
          id={inputId}
          className={cn("peer pt-6 pb-2", className)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=" "
          aria-describedby={helperText ? helperTextId : undefined}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-3 transition-all duration-200 pointer-events-none select-none",
            "origin-left transform-gpu",
            isFloating 
              ? "top-2 text-xs scale-75" 
              : "top-1/2 -translate-y-1/2 text-base",
            isFocused && "text-primary",
            props.error && "text-destructive",
            props.success && "text-green-500",
            props.warning && "text-yellow-500",
            !isFocused && !props.error && !props.success && !props.warning && "text-muted-foreground"
          )}
        >
          {label}
        </label>
        {helperText && (
          <p 
            id={helperTextId}
            className={cn(
              "mt-1 text-xs",
              props.error && "text-destructive",
              props.success && "text-green-500", 
              props.warning && "text-yellow-500",
              !props.error && !props.success && !props.warning && "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
FloatingInput.displayName = "FloatingInput"

// Password Input Component
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasswordInputProps extends Omit<InputProps, "type"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

// Search Input Component
export interface SearchInputProps extends Omit<InputProps, "type"> {
  onClear?: () => void
  clearable?: boolean
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, clearable = true, ...props }, ref) => {
    const [hasValue, setHasValue] = React.useState(false)

    React.useEffect(() => {
      setHasValue(!!props.value || !!props.defaultValue)
    }, [props.value, props.defaultValue])

    const handleClear = () => {
      onClear?.()
      setHasValue(false)
    }

    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={ref}
          type="search"
          className={cn("pl-10", clearable && hasValue && "pr-10", className)}
          {...props}
        />
        {clearable && hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { Input, FloatingInput, PasswordInput, SearchInput, inputVariants }
