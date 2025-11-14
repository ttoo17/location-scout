
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, MapPin, DollarSign, Users, Zap, Car, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import locationStorageService from "../services/locationStorageService";

const UploadLocation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    sizeM2: '',
    powerAmps: '',
    maxCrew: '',
    parking: false,
    tags: [] as string[],
    images: [] as File[]
  });

  const availableTags = [
    "Photography Studio",
    "Video Production", 
    "Industrial Design",
    "Rooftop",
    "Natural Light",
    "Warehouse",
    "Modern",
    "Vintage",
    "Outdoor",
    "Beach",
    "Urban",
    "Rustic",
    "Corporate",
    "Creative Space"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = locationStorageService.validateLocation(formData);

    if (!validation.isValid) {
      // Show error toast for each validation error
      validation.errors.forEach(error => {
        toast.error(error, {
          description: 'Please complete all required fields',
          duration: 4000,
        });
      });
      return;
    }

    // Check if at least one image is uploaded
    if (formData.images.length === 0) {
      toast.error('Please upload at least one photo', {
        description: 'Add photos to showcase your location',
        duration: 4000,
      });
      return;
    }

    try {
      // Save location to localStorage and mock service
      const savedLocation = locationStorageService.saveLocation(formData);

      // Show success toast
      toast.success('Location uploaded successfully! 🎉', {
        description: `Your "${formData.title}" has been listed and is now visible to scouts.`,
        duration: 4000,
      });

      // Navigate to home page after brief delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error saving location:', error);
      toast.error('Failed to upload location', {
        description: 'Please try again later',
        duration: 4000,
      });
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Location</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your amazing space with filmmakers and photographers across the Philippines. 
            Join our community of location scouts and start earning today.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-coral-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step < currentStep ? 'bg-coral-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Modern Photography Studio in Makati"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your location, its unique features, and what makes it perfect for productions..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Makati City, Metro Manila"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="inline h-4 w-4 mr-1" />
                    Price per Day (₱) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="e.g., 5000"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details & Amenities */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Details & Amenities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Size (m²) *
                  </label>
                  <input
                    type="number"
                    value={formData.sizeM2}
                    onChange={(e) => handleInputChange('sizeM2', e.target.value)}
                    placeholder="e.g., 100"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Zap className="inline h-4 w-4 mr-1" />
                    Power (Amps) *
                  </label>
                  <input
                    type="number"
                    value={formData.powerAmps}
                    onChange={(e) => handleInputChange('powerAmps', e.target.value)}
                    placeholder="e.g., 60"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Max Crew Size *
                  </label>
                  <input
                    type="number"
                    value={formData.maxCrew}
                    onChange={(e) => handleInputChange('maxCrew', e.target.value)}
                    placeholder="e.g., 20"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="parking"
                  checked={formData.parking}
                  onChange={(e) => handleInputChange('parking', e.target.checked)}
                  className="w-5 h-5 text-coral-600 border-gray-300 rounded focus:ring-coral-500"
                />
                <label htmlFor="parking" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Parking Available
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Categories & Tags
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        formData.tags.includes(tag)
                          ? "bg-coral-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-coral-50 hover:text-coral-600 border border-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Photos */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Photos</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-coral-500 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Upload Your Photos
                  </p>
                  <p className="text-gray-500 text-sm">
                    Drag and drop or click to select multiple images
                  </p>
                </label>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-coral-500 text-white rounded-xl font-medium hover:bg-coral-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-coral-500 to-orange-500 text-white rounded-xl font-medium hover:from-coral-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                List My Location
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadLocation;
