import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  clearable?: boolean
  minDate?: Date
  maxDate?: Date
  error?: string
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ 
    date, 
    onDateChange, 
    placeholder = "Pick a date",
    disabled = false,
    className,
    clearable = false,
    minDate,
    maxDate,
    error
  }, ref) => {
    const [open, setOpen] = React.useState(false)

    const handleSelect = (selectedDate: Date | undefined) => {
      onDateChange?.(selectedDate)
      setOpen(false)
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onDateChange?.(undefined)
    }

    return (
      <div className={cn("relative", className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
                error && "border-destructive focus-visible:ring-destructive"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : placeholder}
              {clearable && date && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="ml-auto p-1 hover:bg-accent rounded-sm transition-colors"
                  aria-label="Clear date"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              disabled={(date) => {
                if (minDate && date < minDate) return true
                if (maxDate && date > maxDate) return true
                return false
              }}
              autoFocus
            />
          </PopoverContent>
        </Popover>
        {error && (
          <p className="mt-1 text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
DatePicker.displayName = "DatePicker"

export interface DateRangePickerProps {
  dateRange?: DateRange
  onDateRangeChange?: (dateRange: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  clearable?: boolean
  minDate?: Date
  maxDate?: Date
  error?: string
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  ({ 
    dateRange, 
    onDateRangeChange, 
    placeholder = "Pick a date range",
    disabled = false,
    className,
    clearable = false,
    minDate,
    maxDate,
    error
  }, ref) => {
    const [open, setOpen] = React.useState(false)

    const handleSelect = (selectedRange: DateRange | undefined) => {
      onDateRangeChange?.(selectedRange)
      if (selectedRange?.from && selectedRange?.to) {
        setOpen(false)
      }
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onDateRangeChange?.(undefined)
    }

    const formatDateRange = (range: DateRange | undefined) => {
      if (!range?.from) return placeholder
      if (!range.to) return format(range.from, "PPP")
      return `${format(range.from, "PPP")} - ${format(range.to, "PPP")}`
    }

    return (
      <div className={cn("relative", className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange?.from && "text-muted-foreground",
                error && "border-destructive focus-visible:ring-destructive"
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateRange(dateRange)}
              {clearable && dateRange?.from && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="ml-auto p-1 hover:bg-accent rounded-sm transition-colors"
                  aria-label="Clear date range"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleSelect}
              numberOfMonths={2}
              disabled={(date) => {
                if (minDate && date < minDate) return true
                if (maxDate && date > maxDate) return true
                return false
              }}
              autoFocus
            />
          </PopoverContent>
        </Popover>
        {error && (
          <p className="mt-1 text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
DateRangePicker.displayName = "DateRangePicker"

export { DatePicker, DateRangePicker }