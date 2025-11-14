import React, { useState, useEffect, useMemo } from 'react'
import { format, differenceInDays, addDays, isBefore, isAfter, isSameDay } from 'date-fns'
import { Calendar, Clock, Users, CreditCard, MapPin, Star, AlertCircle, CheckCircle2, X } from 'lucide-react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose
} from './ui/modal'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { DatePicker } from './ui/date-picker'
import { cn } from '@/lib/utils'

// Types
interface Location {
  id: string
  title: string
  heroImage: string
  price: number
  location: string
  rating: number
  reviews: number
  metadata: {
    sizeM2: number
    powerAmps: number
    maxCrew: number
    parking: boolean
  }
}

interface BookingDetails {
  startDate: Date | undefined
  endDate: Date | undefined
  crewSize: number
  contactName: string
  contactEmail: string
  contactPhone: string
  projectDescription: string
  specialRequests: string
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  location: Location
  onBookingConfirm?: (booking: BookingDetails & { totalCost: number }) => void
}

// Mock availability data (in a real app, this would come from an API)
const mockAvailability = {
  unavailableDates: [
    new Date(2024, 11, 15), // Dec 15
    new Date(2024, 11, 16), // Dec 16
    new Date(2024, 11, 25), // Dec 25
    new Date(2024, 11, 26), // Dec 26
    new Date(2025, 0, 1),   // Jan 1
  ],
  partiallyAvailable: [
    new Date(2024, 11, 20), // Dec 20
    new Date(2024, 11, 21), // Dec 21
  ]
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  location,
  onBookingConfirm
}) => {
  const [step, setStep] = useState<'booking' | 'confirmation' | 'success'>('booking')
  const [isLoading, setIsLoading] = useState(false)
  const [availabilityLoading, setAvailabilityLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    startDate: undefined,
    endDate: undefined,
    crewSize: 1,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    projectDescription: '',
    specialRequests: ''
  })

  // Calculate booking duration and pricing
  const bookingDuration = useMemo(() => {
    if (!bookingDetails.startDate || !bookingDetails.endDate) return 0
    return differenceInDays(bookingDetails.endDate, bookingDetails.startDate) + 1
  }, [bookingDetails.startDate, bookingDetails.endDate])

  const baseCost = useMemo(() => {
    return bookingDuration * location.price
  }, [bookingDuration, location.price])

  const crewSurcharge = useMemo(() => {
    const extraCrew = Math.max(0, bookingDetails.crewSize - location.metadata.maxCrew)
    return extraCrew * 500 * bookingDuration // ₱500 per extra crew member per day
  }, [bookingDetails.crewSize, location.metadata.maxCrew, bookingDuration])

  const serviceFee = useMemo(() => {
    return Math.round((baseCost + crewSurcharge) * 0.1) // 10% service fee
  }, [baseCost, crewSurcharge])

  const totalCost = useMemo(() => {
    return baseCost + crewSurcharge + serviceFee
  }, [baseCost, crewSurcharge, serviceFee])

  // Check date availability
  const isDateUnavailable = (date: Date) => {
    return mockAvailability.unavailableDates.some(unavailableDate => 
      isSameDay(date, unavailableDate)
    )
  }

  const isDatePartiallyAvailable = (date: Date) => {
    return mockAvailability.partiallyAvailable.some(partialDate => 
      isSameDay(date, partialDate)
    )
  }

  // Validate booking form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!bookingDetails.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!bookingDetails.endDate) {
      newErrors.endDate = 'End date is required'
    }
    if (bookingDetails.startDate && bookingDetails.endDate && 
        isBefore(bookingDetails.endDate, bookingDetails.startDate)) {
      newErrors.endDate = 'End date must be after start date'
    }
    if (bookingDetails.crewSize < 1) {
      newErrors.crewSize = 'Crew size must be at least 1'
    }
    if (!bookingDetails.contactName.trim()) {
      newErrors.contactName = 'Contact name is required'
    }
    if (!bookingDetails.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(bookingDetails.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email'
    }
    if (!bookingDetails.contactPhone.trim()) {
      newErrors.contactPhone = 'Phone number is required'
    }
    if (!bookingDetails.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required'
    }

    // Check for unavailable dates in range
    if (bookingDetails.startDate && bookingDetails.endDate) {
      const dateRange: Date[] = []
      let currentDate = new Date(bookingDetails.startDate)
      while (currentDate <= bookingDetails.endDate) {
        dateRange.push(new Date(currentDate))
        currentDate = addDays(currentDate, 1)
      }
      
      const hasUnavailableDates = dateRange.some(date => isDateUnavailable(date))
      if (hasUnavailableDates) {
        newErrors.dateRange = 'Selected date range includes unavailable dates'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setStep('confirmation')
  }

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    setIsLoading(true)
    
    // Simulate booking confirmation API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    onBookingConfirm?.({
      ...bookingDetails,
      totalCost
    })
    
    setIsLoading(false)
    setStep('success')
  }

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('booking')
        setBookingDetails({
          startDate: undefined,
          endDate: undefined,
          crewSize: 1,
          contactName: '',
          contactEmail: '',
          contactPhone: '',
          projectDescription: '',
          specialRequests: ''
        })
        setErrors({})
      }, 300)
    }
  }, [isOpen])

  // Check availability when dates change
  useEffect(() => {
    if (bookingDetails.startDate && bookingDetails.endDate) {
      setAvailabilityLoading(true)
      // Simulate availability check
      setTimeout(() => {
        setAvailabilityLoading(false)
      }, 800)
    }
  }, [bookingDetails.startDate, bookingDetails.endDate])

  const renderBookingForm = () => (
    <div className="space-y-6">
      {/* Location Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <img
              src={location.heroImage}
              alt={location.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg line-clamp-1">{location.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span>{location.location}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="text-sm font-medium">{location.rating}</span>
                  <span className="text-sm text-muted-foreground">({location.reviews} reviews)</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  ₱{location.price.toLocaleString()}/day
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Date Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Select Dates
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <DatePicker
              date={bookingDetails.startDate}
              onDateChange={(date) => setBookingDetails(prev => ({ ...prev, startDate: date }))}
              placeholder="Select start date"
              disabled={(date) => isBefore(date, new Date()) || isDateUnavailable(date)}
              className={errors.startDate ? 'border-destructive' : ''}
            />
            {errors.startDate && (
              <p className="text-sm text-destructive">{errors.startDate}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <DatePicker
              date={bookingDetails.endDate}
              onDateChange={(date) => setBookingDetails(prev => ({ ...prev, endDate: date }))}
              placeholder="Select end date"
              disabled={(date) => 
                isBefore(date, bookingDetails.startDate || new Date()) || 
                isDateUnavailable(date)
              }
              className={errors.endDate ? 'border-destructive' : ''}
            />
            {errors.endDate && (
              <p className="text-sm text-destructive">{errors.endDate}</p>
            )}
          </div>
        </div>

        {errors.dateRange && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <p className="text-sm text-destructive">{errors.dateRange}</p>
          </div>
        )}

        {availabilityLoading && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Checking availability...</p>
          </div>
        )}
      </div>

      {/* Crew Size */}
      <div className="space-y-2">
        <Label htmlFor="crewSize" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Crew Size
        </Label>
        <Input
          id="crewSize"
          type="number"
          min="1"
          max="100"
          value={bookingDetails.crewSize}
          onChange={(e) => setBookingDetails(prev => ({ 
            ...prev, 
            crewSize: parseInt(e.target.value) || 1 
          }))}
          className={errors.crewSize ? 'border-destructive' : ''}
        />
        {bookingDetails.crewSize > location.metadata.maxCrew && (
          <p className="text-sm text-amber-600">
            Additional crew surcharge applies (max capacity: {location.metadata.maxCrew})
          </p>
        )}
        {errors.crewSize && (
          <p className="text-sm text-destructive">{errors.crewSize}</p>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactName">Full Name *</Label>
            <Input
              id="contactName"
              value={bookingDetails.contactName}
              onChange={(e) => setBookingDetails(prev => ({ 
                ...prev, 
                contactName: e.target.value 
              }))}
              className={errors.contactName ? 'border-destructive' : ''}
            />
            {errors.contactName && (
              <p className="text-sm text-destructive">{errors.contactName}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Phone Number *</Label>
            <Input
              id="contactPhone"
              value={bookingDetails.contactPhone}
              onChange={(e) => setBookingDetails(prev => ({ 
                ...prev, 
                contactPhone: e.target.value 
              }))}
              className={errors.contactPhone ? 'border-destructive' : ''}
            />
            {errors.contactPhone && (
              <p className="text-sm text-destructive">{errors.contactPhone}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Email Address *</Label>
          <Input
            id="contactEmail"
            type="email"
            value={bookingDetails.contactEmail}
            onChange={(e) => setBookingDetails(prev => ({ 
              ...prev, 
              contactEmail: e.target.value 
            }))}
            className={errors.contactEmail ? 'border-destructive' : ''}
          />
          {errors.contactEmail && (
            <p className="text-sm text-destructive">{errors.contactEmail}</p>
          )}
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Project Details</h3>
        
        <div className="space-y-2">
          <Label htmlFor="projectDescription">Project Description *</Label>
          <textarea
            id="projectDescription"
            rows={3}
            value={bookingDetails.projectDescription}
            onChange={(e) => setBookingDetails(prev => ({ 
              ...prev, 
              projectDescription: e.target.value 
            }))}
            className={cn(
              "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              errors.projectDescription ? 'border-destructive' : ''
            )}
            placeholder="Describe your project, shoot requirements, and any specific needs..."
          />
          {errors.projectDescription && (
            <p className="text-sm text-destructive">{errors.projectDescription}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
          <textarea
            id="specialRequests"
            rows={2}
            value={bookingDetails.specialRequests}
            onChange={(e) => setBookingDetails(prev => ({ 
              ...prev, 
              specialRequests: e.target.value 
            }))}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Any additional equipment, setup requirements, or special arrangements..."
          />
        </div>
      </div>

      {/* Pricing Summary */}
      {bookingDuration > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Pricing Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Base rate ({bookingDuration} day{bookingDuration > 1 ? 's' : ''})</span>
              <span>₱{baseCost.toLocaleString()}</span>
            </div>
            
            {crewSurcharge > 0 && (
              <div className="flex justify-between text-amber-600">
                <span>Extra crew surcharge</span>
                <span>₱{crewSurcharge.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Service fee (10%)</span>
              <span>₱{serviceFee.toLocaleString()}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₱{totalCost.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Confirm Your Booking</h3>
        <p className="text-muted-foreground">
          Please review your booking details before confirming
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Location:</span>
              <p className="font-medium">{location.title}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Dates:</span>
              <p className="font-medium">
                {bookingDetails.startDate && format(bookingDetails.startDate, 'MMM dd')} - {' '}
                {bookingDetails.endDate && format(bookingDetails.endDate, 'MMM dd, yyyy')}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <p className="font-medium">{bookingDuration} day{bookingDuration > 1 ? 's' : ''}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Crew Size:</span>
              <p className="font-medium">{bookingDetails.crewSize} people</p>
            </div>
            <div>
              <span className="text-muted-foreground">Contact:</span>
              <p className="font-medium">{bookingDetails.contactName}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Cost:</span>
              <p className="font-semibold text-lg">₱{totalCost.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Important Notes:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• A 50% deposit is required to confirm your booking</li>
          <li>• Cancellations made 48+ hours in advance receive full refund</li>
          <li>• Weather-related cancellations are fully refundable</li>
          <li>• You will receive a confirmation email with detailed instructions</li>
        </ul>
      </div>
    </div>
  )

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
        <p className="text-muted-foreground">
          Your booking request has been submitted successfully. You'll receive a confirmation email shortly.
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking ID:</span>
              <span className="font-mono">BK-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="secondary">Pending Confirmation</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        The location owner will review your request and respond within 24 hours.
      </p>
    </div>
  )

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size={step === 'booking' ? '3xl' : 'lg'} className="max-h-[90vh] overflow-y-auto">
        <ModalHeader>
          <ModalTitle>
            {step === 'booking' && 'Book Location'}
            {step === 'confirmation' && 'Confirm Booking'}
            {step === 'success' && 'Booking Confirmed'}
          </ModalTitle>
          {step === 'booking' && (
            <ModalDescription>
              Fill out the details below to request a booking for this location.
            </ModalDescription>
          )}
        </ModalHeader>

        <div className="py-4">
          {step === 'booking' && renderBookingForm()}
          {step === 'confirmation' && renderConfirmation()}
          {step === 'success' && renderSuccess()}
        </div>

        <ModalFooter>
          {step === 'booking' && (
            <>
              <ModalClose asChild>
                <Button variant="outline">Cancel</Button>
              </ModalClose>
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading || bookingDuration === 0}
                className="min-w-[120px]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  'Review Booking'
                )}
              </Button>
            </>
          )}
          
          {step === 'confirmation' && (
            <>
              <Button 
                variant="outline" 
                onClick={() => setStep('booking')}
                disabled={isLoading}
              >
                Back to Edit
              </Button>
              <Button 
                onClick={handleConfirmBooking} 
                disabled={isLoading}
                className="min-w-[120px]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Confirming...
                  </div>
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </>
          )}
          
          {step === 'success' && (
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default BookingModal