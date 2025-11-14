import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input, FloatingInput, PasswordInput, SearchInput } from "@/components/ui/input"
import { SearchableSelect } from "@/components/ui/select"
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker"
import { FileUpload } from "@/components/ui/file-upload"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormFieldWrapper,
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Example form schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  country: z.string().min(1, "Please select a country"),
  birthDate: z.date().optional(),
  searchTerm: z.string().optional(),
  profileImage: z.any().optional(),
})

type FormData = z.infer<typeof formSchema>

// Sample data for select
const countryOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "ph", label: "Philippines" },
  { value: "jp", label: "Japan" },
  { value: "kr", label: "South Korea" },
  { value: "sg", label: "Singapore" },
]

export function FormExamples() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      country: "",
      searchTerm: "",
    },
  })

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Form Components Demo</CardTitle>
          <CardDescription>
            Demonstration of all enhanced input and form components with validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Floating Input */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FloatingInput
                          label="Full Name"
                          helperText="Enter your first and last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Regular Input with validation */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        We'll never share your email with anyone else.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Input */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Must be at least 8 characters long.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Searchable Select */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <SearchableSelect
                          options={countryOptions}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select your country"
                          searchPlaceholder="Search countries..."
                          clearable
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date Picker */}
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          onDateChange={field.onChange}
                          placeholder="Select your birth date"
                          maxDate={new Date()}
                          clearable
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Search Input */}
                <FormField
                  control={form.control}
                  name="searchTerm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Search</FormLabel>
                      <FormControl>
                        <SearchInput
                          placeholder="Search for something..."
                          onClear={() => field.onChange("")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Try typing something and use the clear button.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              {/* File Upload */}
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <FileUpload
                        onFilesChange={(files) => field.onChange(files[0])}
                        maxFiles={1}
                        acceptedFileTypes={["image/*"]}
                        maxSize={2 * 1024 * 1024} // 2MB
                        showPreview
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a profile image (max 2MB, images only).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Range Picker */}
              <FormItem>
                <FormLabel>Date Range Example</FormLabel>
                <DateRangePicker
                  placeholder="Select a date range"
                  clearable
                />
                <FormDescription>
                  This is a standalone date range picker example.
                </FormDescription>
              </FormItem>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit">
                  Submit Form
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Standalone Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Standalone Component Examples</CardTitle>
          <CardDescription>
            Examples of components used outside of react-hook-form
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Variants */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Input Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Default input" />
              <Input placeholder="Error state" error="This field is required" />
              <Input placeholder="Success state" success="Looks good!" />
              <Input placeholder="Warning state" warning="Please double-check this" />
            </div>
          </div>

          {/* Floating Input Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Floating Label Inputs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatingInput label="Username" />
              <FloatingInput 
                label="Email" 
                type="email" 
                helperText="We'll send you updates here"
              />
              <FloatingInput 
                label="Phone Number" 
                error="Invalid phone number format"
              />
              <FloatingInput 
                label="Website" 
                success="Valid URL format"
              />
            </div>
          </div>

          {/* Form Field Wrapper Examples */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Form Field Wrappers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormFieldWrapper error="This is an error message">
                <Input placeholder="Input with error" />
              </FormFieldWrapper>
              <FormFieldWrapper success="This is a success message">
                <Input placeholder="Input with success" />
              </FormFieldWrapper>
              <FormFieldWrapper warning="This is a warning message">
                <Input placeholder="Input with warning" />
              </FormFieldWrapper>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}