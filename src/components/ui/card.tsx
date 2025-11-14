import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-lg text-card-foreground transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-card border border-border shadow-sm hover:shadow-md",
        elevated: "bg-card shadow-lg hover:shadow-xl hover:-translate-y-1 border-0",
        outlined: "bg-card border-2 border-border shadow-none hover:border-primary/50 hover:shadow-sm",
        glass: "glass border border-white/20 shadow-glass backdrop-blur-md hover:bg-white/10 hover:shadow-xl hover:-translate-y-0.5",
        interactive: "bg-card border border-border shadow-sm hover:shadow-lg hover:-translate-y-2 cursor-pointer active:translate-y-0 active:shadow-md",
        gradient: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800 shadow-sm hover:shadow-md hover:from-amber-100 hover:to-amber-200 dark:hover:from-amber-900/30 dark:hover:to-amber-800/30",
        featured: "bg-gradient-to-br from-amber-100 via-amber-50 to-white dark:from-amber-900/40 dark:via-amber-950/20 dark:to-background border-2 border-amber-300 dark:border-amber-700 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-amber-400 dark:hover:border-amber-600",
        minimal: "bg-transparent border-0 shadow-none hover:bg-accent/50 rounded-md",
      },
      size: {
        xs: "p-2",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      padding: {
        none: "p-0",
        xs: "p-2",
        sm: "p-3",
        md: "p-4", 
        lg: "p-6",
        xl: "p-8",
      },
      animation: {
        none: "",
        subtle: "hover:scale-[1.02]",
        moderate: "hover:scale-105",
        bounce: "hover:animate-bounce-in",
        glow: "hover:shadow-glow",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animation: "none",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  loading?: boolean
  interactive?: boolean
  hoverable?: boolean
  clickable?: boolean
  disabled?: boolean
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    size, 
    padding, 
    animation,
    loading, 
    interactive, 
    hoverable,
    clickable,
    disabled,
    onClick,
    ...props 
  }, ref) => {
    // Determine the appropriate variant based on props
    let computedVariant = variant
    if (interactive && !variant) {
      computedVariant = "interactive"
    }
    
    // Handle loading state
    if (loading) {
      return <CardSkeleton className={className} variant={computedVariant} size={size} />
    }

    // Determine if card should be clickable
    const isClickable = clickable || interactive || onClick
    const isHoverable = hoverable || isClickable

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ 
            variant: computedVariant, 
            size, 
            padding, 
            animation: isHoverable ? animation : "none",
            className 
          }),
          {
            "cursor-pointer": isClickable && !disabled,
            "cursor-not-allowed opacity-60": disabled,
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2": isClickable,
          }
        )}
        onClick={disabled ? undefined : onClick}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        role={isClickable ? "button" : undefined}
        aria-disabled={disabled}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const cardHeaderVariants = cva(
  "flex flex-col space-y-1.5",
  {
    variants: {
      size: {
        xs: "p-2",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
)

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardHeaderVariants>
>(({ className, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardHeaderVariants({ size, className }))}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const cardTitleVariants = cva(
  "font-semibold leading-none tracking-tight",
  {
    variants: {
      size: {
        xs: "text-base",
        sm: "text-lg",
        md: "text-xl", 
        lg: "text-2xl",
        xl: "text-3xl",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
)

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof cardTitleVariants>
>(({ className, size, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(cardTitleVariants({ size, className }))}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const cardContentVariants = cva(
  "",
  {
    variants: {
      size: {
        xs: "p-2 pt-0",
        sm: "p-3 pt-0",
        md: "p-4 pt-0",
        lg: "p-6 pt-0",
        xl: "p-8 pt-0",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
)

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardContentVariants>
>(({ className, size, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(cardContentVariants({ size, className }))} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const cardFooterVariants = cva(
  "flex items-center",
  {
    variants: {
      size: {
        xs: "p-2 pt-0",
        sm: "p-3 pt-0",
        md: "p-4 pt-0", 
        lg: "p-6 pt-0",
        xl: "p-8 pt-0",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
)

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardFooterVariants>
>(({ className, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardFooterVariants({ size, className }))}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Card Skeleton Component
export interface CardSkeletonProps {
  className?: string
  variant?: VariantProps<typeof cardVariants>["variant"]
  size?: VariantProps<typeof cardVariants>["size"]
  showHeader?: boolean
  showContent?: boolean
  showFooter?: boolean
  showImage?: boolean
  lines?: number
  type?: "default" | "location" | "profile" | "article" | "product"
}

const CardSkeleton = React.forwardRef<HTMLDivElement, CardSkeletonProps>(
  ({ 
    className, 
    variant = "default", 
    size = "md",
    showHeader = true,
    showContent = true, 
    showFooter = false,
    showImage = false,
    lines = 3,
    type = "default"
  }, ref) => {
    // Predefined skeleton types for common use cases
    const skeletonTypes = {
      default: {
        showHeader: true,
        showContent: true,
        showFooter: false,
        showImage: false,
        lines: 3
      },
      location: {
        showHeader: true,
        showContent: true,
        showFooter: true,
        showImage: true,
        lines: 2
      },
      profile: {
        showHeader: true,
        showContent: true,
        showFooter: false,
        showImage: true,
        lines: 4
      },
      article: {
        showHeader: true,
        showContent: true,
        showFooter: true,
        showImage: true,
        lines: 5
      },
      product: {
        showHeader: true,
        showContent: true,
        showFooter: true,
        showImage: true,
        lines: 2
      }
    }

    const config = type !== "default" ? skeletonTypes[type] : {
      showHeader,
      showContent,
      showFooter,
      showImage,
      lines
    }

    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size, className }), "animate-pulse")}
      >
        {config.showImage && (
          <div className="aspect-video bg-muted rounded-t-lg mb-4"></div>
        )}
        
        {config.showHeader && (
          <CardHeader size={size}>
            <div className="flex items-center space-x-3">
              {type === "profile" && (
                <div className="w-10 h-10 bg-muted rounded-full flex-shrink-0"></div>
              )}
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-muted rounded w-3/4 animate-shimmer"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
            {type === "location" && (
              <div className="flex space-x-2 mt-2">
                <div className="h-6 bg-muted rounded-full w-16"></div>
                <div className="h-6 bg-muted rounded-full w-20"></div>
                <div className="h-6 bg-muted rounded-full w-12"></div>
              </div>
            )}
          </CardHeader>
        )}
        
        {config.showContent && (
          <CardContent size={size}>
            <div className="space-y-3">
              {Array.from({ length: config.lines }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-4 bg-muted rounded animate-shimmer",
                    i === config.lines - 1 ? "w-2/3" : "w-full"
                  )}
                  style={{
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
              
              {type === "product" && (
                <div className="flex items-center justify-between mt-4">
                  <div className="h-8 bg-muted rounded w-24"></div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                </div>
              )}
            </div>
          </CardContent>
        )}
        
        {config.showFooter && (
          <CardFooter size={size}>
            <div className="flex items-center justify-between w-full">
              <div className="flex space-x-2">
                <div className="h-8 bg-muted rounded w-20"></div>
                {type === "location" && (
                  <div className="h-8 bg-muted rounded w-16"></div>
                )}
              </div>
              <div className="h-8 bg-muted rounded w-16"></div>
            </div>
          </CardFooter>
        )}
      </div>
    )
  }
)
CardSkeleton.displayName = "CardSkeleton"

// Grid Card Layout Component
export interface CardGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  gap?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const CardGrid = React.forwardRef<HTMLDivElement, CardGridProps>(
  ({ children, columns = 3, gap = "md", className }, ref) => {
    const gridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
      6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
    }

    const gapClasses = {
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          gridCols[columns],
          gapClasses[gap],
          className
        )}
      >
        {children}
      </div>
    )
  }
)
CardGrid.displayName = "CardGrid"

// List Card Layout Component
export interface CardListProps {
  children: React.ReactNode
  gap?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const CardList = React.forwardRef<HTMLDivElement, CardListProps>(
  ({ children, gap = "md", className }, ref) => {
    const gapClasses = {
      sm: "space-y-3",
      md: "space-y-4", 
      lg: "space-y-6",
      xl: "space-y-8",
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col", gapClasses[gap], className)}
      >
        {children}
      </div>
    )
  }
)
CardList.displayName = "CardList"

// Enhanced Card Components for specific use cases

// Image Card Component
export interface ImageCardProps extends CardProps {
  src: string
  alt: string
  aspectRatio?: "square" | "video" | "photo" | "golden"
  imageClassName?: string
  overlay?: React.ReactNode
  lazy?: boolean
}

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  ({ 
    src, 
    alt, 
    aspectRatio = "photo", 
    imageClassName, 
    overlay, 
    lazy = true,
    children, 
    className,
    ...props 
  }, ref) => {
    const aspectClasses = {
      square: "aspect-square",
      video: "aspect-video",
      photo: "aspect-photo",
      golden: "aspect-golden"
    }

    return (
      <Card ref={ref} className={cn("overflow-hidden", className)} {...props}>
        <div className={cn("relative", aspectClasses[aspectRatio])}>
          <img
            src={src}
            alt={alt}
            loading={lazy ? "lazy" : "eager"}
            className={cn(
              "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
              imageClassName
            )}
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
              {overlay}
            </div>
          )}
        </div>
        {children}
      </Card>
    )
  }
)
ImageCard.displayName = "ImageCard"

// Stats Card Component
export interface StatsCardProps extends CardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label: string
    direction: "up" | "down" | "neutral"
  }
  color?: "default" | "amber" | "green" | "red" | "blue"
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ 
    title, 
    value, 
    description, 
    icon, 
    trend, 
    color = "default",
    className,
    ...props 
  }, ref) => {
    const colorClasses = {
      default: "border-border",
      amber: "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20",
      green: "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20",
      red: "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20",
      blue: "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20"
    }

    const trendColors = {
      up: "text-green-600 dark:text-green-400",
      down: "text-red-600 dark:text-red-400",
      neutral: "text-muted-foreground"
    }

    return (
      <Card 
        ref={ref} 
        className={cn("border-2", colorClasses[color], className)} 
        {...props}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold mt-2">{value}</p>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
              {trend && (
                <div className={cn("flex items-center mt-2 text-sm", trendColors[trend.direction])}>
                  <span className="font-medium">{trend.value > 0 ? '+' : ''}{trend.value}%</span>
                  <span className="ml-1">{trend.label}</span>
                </div>
              )}
            </div>
            {icon && (
              <div className="flex-shrink-0 ml-4 text-muted-foreground">
                {icon}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
StatsCard.displayName = "StatsCard"

// Action Card Component
export interface ActionCardProps extends CardProps {
  title: string
  description?: string
  icon?: React.ReactNode
  actions?: React.ReactNode
  badge?: React.ReactNode
}

const ActionCard = React.forwardRef<HTMLDivElement, ActionCardProps>(
  ({ 
    title, 
    description, 
    icon, 
    actions, 
    badge,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <Card 
        ref={ref} 
        className={cn("group hover:shadow-lg transition-all duration-300", className)} 
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {icon && (
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                  {icon}
                </div>
              )}
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                {description && (
                  <CardDescription className="mt-1">{description}</CardDescription>
                )}
              </div>
            </div>
            {badge && badge}
          </div>
        </CardHeader>
        {children && (
          <CardContent className="pt-0">
            {children}
          </CardContent>
        )}
        {actions && (
          <CardFooter className="pt-0">
            {actions}
          </CardFooter>
        )}
      </Card>
    )
  }
)
ActionCard.displayName = "ActionCard"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardSkeleton,
  CardGrid,
  CardList,
  ImageCard,
  StatsCard,
  ActionCard,
  cardVariants 
}
