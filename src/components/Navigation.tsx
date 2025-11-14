
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Search, 
  Menu, 
  X, 
  Camera, 
  Users, 
  Upload, 
  LogIn, 
  LogOut,
  User,
  Settings,
  ChevronDown,
  Bell,
  Heart,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "./LoginModal";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, userRole, logout, user } = useAuth();
  const searchRef = useRef<HTMLInputElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Locations", icon: Camera },
    { path: "/scouts", label: "Scouts", icon: Users },
    { path: "/upload", label: "List Location", icon: Upload },
  ];

  const handleLogoClick = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      searchRef.current?.blur();
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key for mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="glass-nav sticky top-0 z-50 border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 hover:scale-105"
            >
              <div className="relative">
                <Camera className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                LocationScout
              </span>
            </button>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className={cn(
                  "relative transition-all duration-300",
                  isSearchFocused && "scale-105"
                )}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    ref={searchRef}
                    type="text"
                    placeholder="Search locations, scouts, or places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="pl-10 pr-4 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all duration-200"
                  />
                </div>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group",
                    isActive(item.path)
                      ? "text-primary bg-primary/10 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
              
              {/* Notifications */}
              {isAuthenticated && (
                <Button variant="ghost" size="sm" className="relative ml-2">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
              )}

              {/* Auth Section */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 ml-2 hover:bg-accent/50">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/favorites" className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Favorites
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-locations" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        My Locations
                      </Link>
                    </DropdownMenuItem>
                    {userRole === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="ml-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={cn(
                    "absolute inset-0 h-6 w-6 transition-all duration-300",
                    isMenuOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  )} 
                />
                <X 
                  className={cn(
                    "absolute inset-0 h-6 w-6 transition-all duration-300",
                    isMenuOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                  )} 
                />
              </div>
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border/50"
              />
            </form>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={cn(
          "md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-md transition-all duration-300 ease-out",
          isMenuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-full pointer-events-none"
        )}>
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium transition-all duration-200",
                    "animate-fade-in-up",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border/50 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                      Favorites
                    </Link>
                    {userRole === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 w-full transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 w-full transition-colors"
                  >
                    <LogIn className="h-5 w-5" />
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Navigation;
