
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import UserDashboard from "@/components/admin/UserDashboard";
import ScoutDashboard from "@/components/admin/ScoutDashboard";
import mockDataService from "@/services/mockDataService";

const AdminDashboard = () => {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"user" | "scout" | "admin">("user");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    
    // Mock current user data - in real app this would come from auth context
    const mockCurrentUser = mockDataService.getUser(1);
    setCurrentUser(mockCurrentUser);

    if (userRole && (userRole === 'user' || userRole === 'scout' || userRole === 'admin')) {
      setUserType(userRole);
    }
  }, [isAuthenticated, userRole, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userType === 'user' ? 'My Dashboard' : 'Location Scout Dashboard'}
          </h1>
          <p className="text-gray-600">
            {userType === 'user' 
              ? 'Manage your bookings, saved properties, and profile'
              : 'Manage your properties, bookings, and client communications'
            }
          </p>
        </div>

        {/* User Type Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Dashboard Type</CardTitle>
            <CardDescription>Switch between user and scout dashboards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button 
                variant={userType === "user" ? "default" : "outline"}
                onClick={() => setUserType("user")}
                className="flex-1"
              >
                User Dashboard
              </Button>
              <Button 
                variant={userType === "scout" ? "default" : "outline"}
                onClick={() => setUserType("scout")}
                className="flex-1"
              >
                Location Scout Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Content */}
        {userType === "user" ? <UserDashboard /> : <ScoutDashboard />}
      </div>
    </div>
  );
};

export default AdminDashboard;
