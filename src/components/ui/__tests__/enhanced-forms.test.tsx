import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FloatingInput, SearchInput, PasswordInput } from '../input'
import { SearchableSelect } from '../select'
import { DatePicker } from '../date-picker'
import { FileUpload } from '../file-upload'

// Mock date-fns format function
vi.mock('date-fns', () => ({
  format: vi.fn((date, formatStr) => {
    if (formatStr === 'PPP') {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
    return date.toString()
  })
}))

describe('Enhanced Form Components', () => {
  describe('FloatingInput', () => {
    it('renders with floating label', () => {
      render(<FloatingInput label="Test Label" />)
      expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
    })

    it('shows helper text when provided', () => {
      render(<FloatingInput label="Test" helperText="This is helper text" />)
      expect(screen.getByText('This is helper text')).toBeInTheDocument()
    })

    it('displays error state correctly', () => {
      render(<FloatingInput label="Test" error="This is an error" />)
      expect(screen.getByText('This is an error')).toBeInTheDocument()
    })
  })

  describe('SearchInput', () => {
    it('renders with search icon', () => {
      render(<SearchInput placeholder="Search..." />)
      const input = screen.getByPlaceholderText('Search...')
      expect(input).toBeInTheDocument()
      expect(input.type).toBe('search')
    })

    it('shows clear button when there is a value', async () => {
      const user = userEvent.setup()
      const onClear = vi.fn()
      
      render(<SearchInput onClear={onClear} />)
      const input = screen.getByRole('searchbox')
      
      await user.type(input, 'test')
      
      const clearButton = screen.getByLabelText('Clear search')
      expect(clearButton).toBeInTheDocument()
      
      await user.click(clearButton)
      expect(onClear).toHaveBeenCalled()
    })
  })

  describe('PasswordInput', () => {
    it('toggles password visibility', async () => {
      const user = userEvent.setup()
      
      render(<PasswordInput />)
      const input = screen.getByRole('textbox', { hidden: true })
      const toggleButton = screen.getByLabelText('Show password')
      
      expect(input.type).toBe('password')
      
      await user.click(toggleButton)
      expect(input.type).toBe('text')
      expect(screen.getByLabelText('Hide password')).toBeInTheDocument()
    })
  })

  describe('SearchableSelect', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ]

    it('renders with placeholder', () => {
      render(
        <SearchableSelect 
          options={options} 
          placeholder="Select an option" 
        />
      )
      expect(screen.getByText('Select an option')).toBeInTheDocument()
    })

    it('filters options based on search term', async () => {
      const user = userEvent.setup()
      
      render(<SearchableSelect options={options} />)
      
      // Open the select
      await user.click(screen.getByRole('combobox'))
      
      // Type in search
      const searchInput = screen.getByPlaceholderText('Search options...')
      await user.type(searchInput, 'Option 1')
      
      // Should show filtered results
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
    })
  })

  describe('FileUpload', () => {
    it('renders upload area', () => {
      render(<FileUpload />)
      expect(screen.getByText('Click to upload or drag and drop')).toBeInTheDocument()
    })

    it('shows error message when provided', () => {
      render(<FileUpload error="File too large" />)
      expect(screen.getByText('File too large')).toBeInTheDocument()
    })

    it('handles file selection', async () => {
      const onFilesChange = vi.fn()
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
      
      render(<FileUpload onFilesChange={onFilesChange} />)
      
      const input = screen.getByRole('textbox', { hidden: true })
      await userEvent.upload(input, file)
      
      expect(onFilesChange).toHaveBeenCalledWith([file])
    })
  })
})