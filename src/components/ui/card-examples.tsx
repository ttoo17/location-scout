import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardSkeleton,
  CardGrid,
  CardList,
  ImageCard,
  StatsCard,
  ActionCard
} from './card'
import { Button } from './button'

// Example component showcasing all card variants and features
export function CardExamples() {
  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Enhanced Card System</h1>
        <p className="text-muted-foreground mb-8">
          Comprehensive card components with variants, animations, and interactive states
        </p>

        {/* Basic Card Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Card Variants</h2>
          <CardGrid columns={4} gap="md">
            <Card variant="default">
              <CardHeader>
                <CardTitle size="md">Default Card</CardTitle>
                <CardDescription>Standard card with border and shadow</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the default card variant with subtle styling.</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle size="md">Elevated Card</CardTitle>
                <CardDescription>Card with enhanced shadow and hover effects</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Elevated cards have more prominent shadows and lift on hover.</p>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle size="md">Outlined Card</CardTitle>
                <CardDescription>Card with prominent border styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Outlined cards emphasize the border with hover effects.</p>
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle size="md">Glass Card</CardTitle>
                <CardDescription>Modern glass morphism effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Glass cards use backdrop blur and transparency effects.</p>
              </CardContent>
            </Card>
          </CardGrid>
        </section>

        {/* Interactive Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive Cards</h2>
          <CardGrid columns={3} gap="md">
            <Card variant="interactive" animation="subtle">
              <CardHeader>
                <CardTitle size="md">Interactive Card</CardTitle>
                <CardDescription>Click me for interaction</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card responds to hover and click events.</p>
              </CardContent>
            </Card>

            <Card variant="featured" animation="moderate">
              <CardHeader>
                <CardTitle size="md">Featured Card</CardTitle>
                <CardDescription>Special gradient styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Featured cards use gradient backgrounds and enhanced styling.</p>
              </CardContent>
            </Card>

            <Card variant="gradient" animation="glow">
              <CardHeader>
                <CardTitle size="md">Gradient Card</CardTitle>
                <CardDescription>Amber gradient theme</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Gradient cards use the amber theme colors.</p>
              </CardContent>
            </Card>
          </CardGrid>
        </section>

        {/* Image Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Image Cards</h2>
          <CardGrid columns={3} gap="md">
            <ImageCard
              src="/placeholder.svg"
              alt="Square aspect ratio"
              aspectRatio="square"
              variant="elevated"
              overlay={
                <div className="p-4 text-white">
                  <h3 className="font-semibold">Square Image</h3>
                  <p className="text-sm opacity-90">1:1 aspect ratio</p>
                </div>
              }
            >
              <CardContent>
                <p>Image card with square aspect ratio and overlay content.</p>
              </CardContent>
            </ImageCard>

            <ImageCard
              src="/placeholder.svg"
              alt="Photo aspect ratio"
              aspectRatio="photo"
              variant="outlined"
            >
              <CardHeader>
                <CardTitle size="sm">Photo Card</CardTitle>
                <CardDescription>4:3 aspect ratio</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Perfect for photo galleries and portfolios.</p>
              </CardContent>
            </ImageCard>

            <ImageCard
              src="/placeholder.svg"
              alt="Video aspect ratio"
              aspectRatio="video"
              variant="glass"
            >
              <CardHeader>
                <CardTitle size="sm">Video Card</CardTitle>
                <CardDescription>16:9 aspect ratio</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Ideal for video thumbnails and media content.</p>
              </CardContent>
            </ImageCard>
          </CardGrid>
        </section>

        {/* Stats Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Statistics Cards</h2>
          <CardGrid columns={4} gap="md">
            <StatsCard
              title="Total Users"
              value="12,345"
              description="Active users this month"
              color="amber"
              trend={{
                value: 12.5,
                label: 'from last month',
                direction: 'up'
              }}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              }
            />

            <StatsCard
              title="Revenue"
              value="$45,678"
              description="Monthly revenue"
              color="green"
              trend={{
                value: 8.2,
                label: 'from last month',
                direction: 'up'
              }}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              }
            />

            <StatsCard
              title="Conversion Rate"
              value="3.24%"
              description="Average conversion"
              color="blue"
              trend={{
                value: -2.1,
                label: 'from last month',
                direction: 'down'
              }}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />

            <StatsCard
              title="Bounce Rate"
              value="42.3%"
              description="Page bounce rate"
              color="red"
              trend={{
                value: 0,
                label: 'no change',
                direction: 'neutral'
              }}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
          </CardGrid>
        </section>

        {/* Action Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Action Cards</h2>
          <CardGrid columns={2} gap="md">
            <ActionCard
              title="Create New Project"
              description="Start a new project with our templates"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              actions={
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Learn More</Button>
                  <Button size="sm">Get Started</Button>
                </div>
              }
              badge={
                <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                  New
                </span>
              }
            >
              <p className="text-sm text-muted-foreground">
                Choose from over 50 professionally designed templates to kickstart your project.
              </p>
            </ActionCard>

            <ActionCard
              title="Import Data"
              description="Import your existing data seamlessly"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              }
              actions={
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">View Guide</Button>
                  <Button size="sm">Import Now</Button>
                </div>
              }
            >
              <p className="text-sm text-muted-foreground">
                Support for CSV, JSON, and Excel files with automatic field mapping.
              </p>
            </ActionCard>
          </CardGrid>
        </section>

        {/* Loading States */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Loading States</h2>
          <CardGrid columns={4} gap="md">
            <CardSkeleton type="default" />
            <CardSkeleton type="location" />
            <CardSkeleton type="profile" />
            <CardSkeleton type="article" />
          </CardGrid>
        </section>

        {/* Card Layouts */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Card Layouts</h2>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Grid Layout</h3>
            <CardGrid columns={3} gap="lg">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} variant="outlined">
                  <CardHeader>
                    <CardTitle size="sm">Grid Item {i + 1}</CardTitle>
                    <CardDescription>Item in grid layout</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Content for grid item {i + 1}</p>
                  </CardContent>
                </Card>
              ))}
            </CardGrid>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">List Layout</h3>
            <CardList gap="md">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} variant="elevated">
                  <CardHeader>
                    <CardTitle size="sm">List Item {i + 1}</CardTitle>
                    <CardDescription>Item in list layout</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Content for list item {i + 1} with more detailed information.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">Action</Button>
                  </CardFooter>
                </Card>
              ))}
            </CardList>
          </div>
        </section>

        {/* Size Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Size Variants</h2>
          <div className="flex flex-wrap gap-4 items-start">
            <Card size="xs" variant="outlined">
              <CardContent>
                <p className="text-sm">Extra Small</p>
              </CardContent>
            </Card>
            <Card size="sm" variant="outlined">
              <CardContent>
                <p className="text-sm">Small</p>
              </CardContent>
            </Card>
            <Card size="md" variant="outlined">
              <CardContent>
                <p>Medium (Default)</p>
              </CardContent>
            </Card>
            <Card size="lg" variant="outlined">
              <CardContent>
                <p>Large</p>
              </CardContent>
            </Card>
            <Card size="xl" variant="outlined">
              <CardContent>
                <p>Extra Large</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CardExamples