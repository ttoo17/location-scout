
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, MapPin, DollarSign, Check, X, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  propertyName: string;
  clientName: string;
  clientEmail: string;
  dates: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  amount: string;
  purpose: string;
  message?: string;
}

const BookingManager = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      propertyName: "Boracay Beach Resort",
      clientName: "John Smith",
      clientEmail: "john@example.com",
      dates: "Dec 15-17, 2024",
      status: "pending",
      amount: "₱15,000",
      purpose: "Wedding Photography",
      message: "Looking for romantic sunset shots for a wedding photoshoot."
    },
    {
      id: "2",
      propertyName: "Baguio Mountain View",
      clientName: "Maria Garcia",
      clientEmail: "maria@filmstudio.com",
      dates: "Jan 20-25, 2025",
      status: "confirmed",
      amount: "₱17,500",
      purpose: "Film Production",
      message: "Need location for dramatic mountain scenes in our upcoming film."
    },
    {
      id: "3",
      propertyName: "Boracay Beach Resort",
      clientName: "David Lee",
      clientEmail: "david@agency.com",
      dates: "Nov 28-30, 2024",
      status: "completed",
      amount: "₱12,000",
      purpose: "Commercial Shoot"
    }
  ]);

  const handleBookingAction = (bookingId: string, action: "confirm" | "cancel") => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: action === "confirm" ? "confirmed" : "cancelled" }
        : booking
    ));
    
    toast({
      title: `Booking ${action === "confirm" ? "Confirmed" : "Cancelled"}`,
      description: `The booking has been ${action === "confirm" ? "confirmed" : "cancelled"} successfully.`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "confirmed": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      case "completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-coral-500" />
          Booking Management ({bookings.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="border-l-4 border-l-coral-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{booking.propertyName}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {booking.clientName} ({booking.clientEmail})
                    </p>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {booking.dates}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    {booking.amount}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {booking.purpose}
                  </div>
                </div>

                {booking.message && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                      {booking.message}
                    </p>
                  </div>
                )}

                {booking.status === "pending" && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => handleBookingAction(booking.id, "confirm")}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Confirm
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleBookingAction(booking.id, "cancel")}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingManager;
