
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Star, Heart, Settings, User, CreditCard, Eye, MessageSquare, Bookmark, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import mockDataService, { Property, User as UserType, Booking, MockDataServiceError } from "@/services/mockDataService";

const UserDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [allProperties] = useState<Property[]>(mockDataService.getProperties());

  useEffect(() => {
    try {
      // Mock current user - in real app this would come from auth context
      const user = mockDataService.getUser(1);
      if (user) {
        setCurrentUser(user);
        try {
          setUserBookings(mockDataService.getBookingsByUser(1));
        } catch (error) {
          console.error('Error loading bookings', error);
          toast({ title: "Warning", description: "Could not load all bookings", variant: "destructive" });
        }
        try {
          setSavedProperties(mockDataService.getUserSavedProperties(1));
        } catch (error) {
          console.error('Error loading saved properties', error);
          toast({ title: "Warning", description: "Could not load saved properties", variant: "destructive" });
        }
      } else {
        toast({ title: "Warning", description: "Could not load user profile", variant: "destructive" });
      }
    } catch (error) {
      console.error('Error initializing user dashboard', error);
      toast({ title: "Error", description: "Failed to load user data", variant: "destructive" });
    }
  }, [toast]);

  const toggleSaveProperty = (propertyId: number) => {
    try {
      if (!propertyId || typeof propertyId !== 'number') {
        toast({ title: "Error", description: "Invalid property ID.", variant: "destructive" });
        return;
      }

      const property = allProperties.find(p => p.id === propertyId);
      if (!property) {
        toast({ title: "Error", description: "Property not found.", variant: "destructive" });
        return;
      }

      if (!currentUser) {
        toast({ title: "Error", description: "User not logged in.", variant: "destructive" });
        return;
      }

      try {
        const isSaved = mockDataService.isPropertySavedByUser(currentUser.id, propertyId);

        if (isSaved) {
          mockDataService.unsavePropertyForUser(currentUser.id, propertyId);
          setSavedProperties(prev => prev.filter(p => p.id !== propertyId));
          toast({ title: "Property Removed", description: `Removed ${property.name} from saved properties.` });
        } else {
          mockDataService.savePropertyForUser(currentUser.id, propertyId);
          setSavedProperties(prev => [...prev, property]);
          toast({ title: "Property Saved", description: `Added ${property.name} to saved properties.` });
        }
      } catch (error) {
        console.error('Error toggling save property', error);
        const errorMessage = error instanceof MockDataServiceError ? error.message : 'Failed to save property';
        toast({ title: "Error", description: errorMessage, variant: "destructive" });
      }
    } catch (error) {
      console.error('Error in toggleSaveProperty', error);
      toast({ title: "Error", description: "An unexpected error occurred", variant: "destructive" });
    }
  };

  const handleViewProperty = (propertyId: number) => {
    navigate(`/location/${propertyId}`);
  };

  const handleViewImages = (propertyId: number) => {
    navigate(`/image/${propertyId}/0`);
  };

  const handleBrowseLocations = () => {
    navigate('/');
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* User Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                {currentUser.name}
                {currentUser.isVerified && <Badge variant="secondary">Verified</Badge>}
              </CardTitle>
              <CardDescription>{currentUser.profile.bio}</CardDescription>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {currentUser.profile.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(currentUser.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{currentUser.stats.totalBookings || 0}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{savedProperties.length}</p>
                <p className="text-sm text-muted-foreground">Saved Properties</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{currentUser.stats.reviewsGiven || 0}</p>
                <p className="text-sm text-muted-foreground">Reviews Given</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{currentUser.stats.totalSpent || "₱0"}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="saved">Saved Properties</TabsTrigger>
          <TabsTrigger value="browse">Browse Properties</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>View and manage your property bookings</CardDescription>
            </CardHeader>
            <CardContent>
              {userBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No bookings yet. Start exploring properties!</p>
                  <Button onClick={handleBrowseLocations} className="bg-coral-500 hover:bg-coral-600">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Browse Locations
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBookings.map((booking) => {
                    const property = allProperties.find(p => p.id === booking.propertyId);
                    return (
                      <Card key={booking.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold hover:text-coral-600 transition-colors">
                                {property?.name || "Unknown Property"}
                              </h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {property?.location}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span>
                                <span>{booking.totalDays} days</span>
                                <span className="font-semibold">₱{booking.totalAmount.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'completed' ? 'secondary' : 'outline'}>
                                {booking.status}
                              </Badge>
                              {property && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleViewProperty(property.id)}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Saved Properties</CardTitle>
                  <CardDescription>Properties you've saved for later</CardDescription>
                </div>
                <Button onClick={handleBrowseLocations} variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Browse More
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {savedProperties.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No saved properties yet. Browse and save properties you're interested in!</p>
                  <Button onClick={handleBrowseLocations} className="bg-coral-500 hover:bg-coral-600">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Browse Locations
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedProperties.map((property) => (
                    <Card key={property.id} className="group hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={property.images[0]?.url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"} 
                          alt={property.name} 
                          className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                          onClick={() => handleViewProperty(property.id)}
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="opacity-90 hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewImages(property.id);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="opacity-90 hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveProperty(property.id);
                            }}
                          >
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 
                          className="font-semibold cursor-pointer hover:text-coral-600 transition-colors"
                          onClick={() => handleViewProperty(property.id)}
                        >
                          {property.name}
                        </h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{property.rating}</span>
                          </div>
                          <span className="font-semibold text-coral-600">{property.price}/day</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {property.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleViewProperty(property.id)}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewImages(property.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="browse" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Browse Properties</CardTitle>
                  <CardDescription>Discover amazing filming and photography locations</CardDescription>
                </div>
                <Button onClick={handleBrowseLocations} className="bg-coral-500 hover:bg-coral-600">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View All Locations
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allProperties.slice(0, 6).map((property) => (
                  <Card key={property.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={property.images[0]?.url || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"} 
                        alt={property.name} 
                        className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                        onClick={() => handleViewProperty(property.id)}
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-90 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewImages(property.id);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-90 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveProperty(property.id);
                          }}
                        >
                          <Heart className={`h-4 w-4 ${savedProperties.some(p => p.id === property.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 
                        className="font-semibold cursor-pointer hover:text-coral-600 transition-colors"
                        onClick={() => handleViewProperty(property.id)}
                      >
                        {property.name}
                      </h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{property.rating}</span>
                        </div>
                        <span className="font-semibold text-coral-600">{property.price}/day</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {property.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleViewProperty(property.id)}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewImages(property.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input defaultValue={currentUser.name} />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue={currentUser.email} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <Input defaultValue={currentUser.profile.bio} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input defaultValue={currentUser.profile.location} />
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <Input defaultValue={currentUser.profile.company} />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
