
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import LocationDetail from "./pages/LocationDetail";
import ImageDetail from "./pages/ImageDetail";
import LocationScouts from "./pages/LocationScouts";
import ScoutProfile from "./pages/ScoutProfile";
import UploadLocation from "./pages/UploadLocation";
import HowItWorks from "./pages/HowItWorks";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import MyLocations from "./pages/MyLocations";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navigation />
              <main className="flex-1">
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/location/:id" element={<LocationDetail />} />
                    <Route path="/image/:locationId/:imageIndex" element={<ImageDetail />} />
                    <Route path="/scouts" element={<LocationScouts />} />
                    <Route path="/scout/:id" element={<ScoutProfile />} />
                    <Route path="/upload" element={<UploadLocation />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/my-locations" element={<MyLocations />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
