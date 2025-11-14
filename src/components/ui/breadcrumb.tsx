import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ className, separator, ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="breadcrumb"
    className={cn("flex", className)}
    {...props}
  />
))
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : Link

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-colors hover:text-foreground inline-flex items-center gap-1.5",
        className
      )}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

// Enhanced Breadcrumb component with automatic route detection
interface BreadcrumbRoute {
  path: string
  label: string
  icon?: React.ReactNode
}

interface SmartBreadcrumbProps {
  routes?: BreadcrumbRoute[]
  className?: string
  showHome?: boolean
  maxItems?: number
}

const SmartBreadcrumb = React.forwardRef<
  HTMLElement,
  SmartBreadcrumbProps
>(({ routes = [], className, showHome = true, maxItems = 4 }, ref) => {
  const currentPath = window.location.pathname
  const pathSegments = currentPath.split('/').filter(Boolean)
  
  // Default route mapping
  const defaultRoutes: Record<string, BreadcrumbRoute> = {
    '': { path: '/', label: 'Home', icon: <Home className="h-3 w-3" /> },
    'scouts': { path: '/scouts', label: 'Location Scouts' },
    'upload': { path: '/upload', label: 'List Location' },
    'admin': { path: '/admin', label: 'Admin Dashboard' },
    'location': { path: '/location', label: 'Location Details' },
    'profile': { path: '/profile', label: 'Profile' },
    'favorites': { path: '/favorites', label: 'Favorites' },
    'my-locations': { path: '/my-locations', label: 'My Locations' },
    'how-it-works': { path: '/how-it-works', label: 'How It Works' },
    'support': { path: '/support', label: 'Support' },
    'privacy': { path: '/privacy', label: 'Privacy Policy' },
    'terms': { path: '/terms', label: 'Terms of Service' },
  }

  // Merge custom routes with defaults
  const routeMap = routes.reduce((acc, route) => {
    const key = route.path.replace('/', '') || ''
    acc[key] = route
    return acc
  }, { ...defaultRoutes })

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbRoute[] = []
  
  if (showHome && currentPath !== '/') {
    breadcrumbItems.push(routeMap[''])
  }

  let currentPathBuild = ''
  pathSegments.forEach((segment, index) => {
    currentPathBuild += `/${segment}`
    const route = routeMap[segment]
    
    if (route) {
      breadcrumbItems.push({
        ...route,
        path: currentPathBuild
      })
    } else {
      // Create a default route for unknown segments
      breadcrumbItems.push({
        path: currentPathBuild,
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      })
    }
  })

  // Handle max items with ellipsis
  const displayItems = breadcrumbItems.length > maxItems 
    ? [
        breadcrumbItems[0],
        { path: '', label: '...', icon: null },
        ...breadcrumbItems.slice(-2)
      ]
    : breadcrumbItems

  const isLastItem = (index: number) => index === displayItems.length - 1

  return (
    <Breadcrumb ref={ref} className={className}>
      <BreadcrumbList>
        {displayItems.map((item, index) => (
          <React.Fragment key={`${item.path}-${index}`}>
            <BreadcrumbItem>
              {item.label === '...' ? (
                <BreadcrumbEllipsis />
              ) : isLastItem(index) ? (
                <BreadcrumbPage className="flex items-center gap-1.5">
                  {item.icon}
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink to={item.path} className="flex items-center gap-1.5">
                  {item.icon}
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLastItem(index) && item.label !== '...' && (
              <BreadcrumbSeparator />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
})
SmartBreadcrumb.displayName = "SmartBreadcrumb"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  SmartBreadcrumb,
}