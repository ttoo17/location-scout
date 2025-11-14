import React, { useState } from 'react'
import LoginModal from './LoginModal'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  LogIn, 
  UserPlus, 
  Shield, 
  Eye, 
  Mail, 
  Lock, 
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Chrome,
  Facebook,
  Github,
  Smartphone,
  Globe,
  Key,
  Settings
} from 'lucide-react'

// Mock user state
interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar: string
  provider?: string
}

// Feature showcase component
const AuthFeatures: React.FC = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogIn className="h-5 w-5" />
          Login System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Email and password authentication</li>
          <li>• Remember me functionality</li>
          <li>• Real-time form validation</li>
          <li>• Loading states and feedback</li>
          <li>• Error handling and recovery</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Complete user registration form</li>
          <li>• Password strength indicator</li>
          <li>• Phone number validation</li>
          <li>• Terms and conditions acceptance</li>
          <li>• Email verification flow</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Password Security
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Password strength checking</li>
          <li>• Visual strength indicators</li>
          <li>• Password visibility toggle</li>
          <li>• Forgot password flow</li>
          <li>• Reset link email system</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Social Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Google OAuth integration</li>
          <li>• Facebook login support</li>
          <li>• GitHub authentication</li>
          <li>• One-click social sign-in</li>
          <li>• Account linking capabilities</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          User Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Smooth modal transitions</li>
          <li>• Mobile-responsive design</li>
          <li>• Keyboard navigation support</li>
          <li>• Accessibility compliance</li>
          <li>• Multi-step form flows</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• Configurable features</li>
          <li>• Enable/disable social login</li>
          <li>• Toggle registration</li>
          <li>• Customize initial mode</li>
          <li>• Flexible callback handling</li>
        </ul>
      </CardContent>
    </Card>
  </div>
)

// Authentication flow demo
const AuthFlowDemo: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Login Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">1</span>
            </div>
            <div>
              <h4 className="font-medium">Email & Password</h4>
              <p className="text-sm text-muted-foreground">
                Enter credentials with real-time validation
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">2</span>
            </div>
            <div>
              <h4 className="font-medium">Authentication</h4>
              <p className="text-sm text-muted-foreground">
                Secure login with loading feedback
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">3</span>
            </div>
            <div>
              <h4 className="font-medium">Success</h4>
              <p className="text-sm text-muted-foreground">
                Redirect to dashboard or callback
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>Registration Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">1</span>
            </div>
            <div>
              <h4 className="font-medium">Personal Info</h4>
              <p className="text-sm text-muted-foreground">
                Name, email, and phone validation
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">2</span>
            </div>
            <div>
              <h4 className="font-medium">Password Security</h4>
              <p className="text-sm text-muted-foreground">
                Strong password with strength indicator
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">3</span>
            </div>
            <div>
              <h4 className="font-medium">Email Verification</h4>
              <p className="text-sm text-muted-foreground">
                Verify email before account activation
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>Password Reset Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">1</span>
            </div>
            <div>
              <h4 className="font-medium">Email Request</h4>
              <p className="text-sm text-muted-foreground">
                Enter email for password reset
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">2</span>
            </div>
            <div>
              <h4 className="font-medium">Reset Link</h4>
              <p className="text-sm text-muted-foreground">
                Secure reset link sent to email
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">3</span>
            </div>
            <div>
              <h4 className="font-medium">New Password</h4>
              <p className="text-sm text-muted-foreground">
                Set new password and login
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>Social Login Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">1</span>
            </div>
            <div>
              <h4 className="font-medium">Provider Selection</h4>
              <p className="text-sm text-muted-foreground">
                Choose Google, Facebook, or GitHub
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">2</span>
            </div>
            <div>
              <h4 className="font-medium">OAuth Flow</h4>
              <p className="text-sm text-muted-foreground">
                Secure third-party authentication
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-primary">3</span>
            </div>
            <div>
              <h4 className="font-medium">Account Creation</h4>
              <p className="text-sm text-muted-foreground">
                Automatic account setup and login
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Usage examples component
const UsageExamples: React.FC = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Basic Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import LoginModal from './LoginModal'

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [user, setUser] = useState(null)

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    console.log('User logged in:', userData)
  }

  const handleRegisterSuccess = (userData) => {
    setUser(userData)
    console.log('User registered:', userData)
  }

  return (
    <>
      <Button onClick={() => setIsLoginOpen(true)}>
        Login
      </Button>
      
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </>
  )
}`}
        </pre>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Advanced Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`<LoginModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onLoginSuccess={handleLogin}
  onRegisterSuccess={handleRegister}
  initialMode="register"
  enableSocialLogin={true}
  enableRegistration={true}
  enableForgotPassword={true}
/>`}
        </pre>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Social Login Only</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`<LoginModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onLoginSuccess={handleLogin}
  enableSocialLogin={true}
  enableRegistration={false}
  enableForgotPassword={false}
/>`}
        </pre>
      </CardContent>
    </Card>
  </div>
)

// Main examples component
export function LoginModalExamples() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'login' | 'register' | 'forgot-password'>('login')
  const [user, setUser] = useState<User | null>(null)
  const [loginHistory, setLoginHistory] = useState<unknown[]>([])
  const [modalConfig, setModalConfig] = useState({
    enableSocialLogin: true,
    enableRegistration: true,
    enableForgotPassword: true
  })

  const handleLoginSuccess = (userData: User) => {
    setUser(userData)
    setLoginHistory(prev => [...prev, {
      ...userData,
      loginTime: new Date(),
      method: userData.provider ? `${userData.provider} OAuth` : 'Email/Password'
    }])
  }

  const handleRegisterSuccess = (userData: User) => {
    setUser(userData)
    setLoginHistory(prev => [...prev, {
      ...userData,
      loginTime: new Date(),
      method: 'Registration'
    }])
  }

  const handleLogout = () => {
    setUser(null)
  }

  const openModal = (mode: 'login' | 'register' | 'forgot-password') => {
    setModalMode(mode)
    setIsModalOpen(true)
  }

  return (
    <div className="p-8 space-y-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">LoginModal with Enhanced Authentication</h1>
        <p className="text-muted-foreground mb-8">
          Complete authentication system with login, registration, password reset, and social login
        </p>

        {/* Current User Status */}
        {user && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-green-900">
                      Welcome, {user.firstName} {user.lastName}!
                    </h3>
                    <p className="text-sm text-green-700">{user.email}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Authentication Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Authentication Features</h2>
          <AuthFeatures />
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive Examples</h2>
          
          <Tabs defaultValue="demo" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
              <TabsTrigger value="flows">Auth Flows</TabsTrigger>
              <TabsTrigger value="usage">Usage Examples</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="demo" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LogIn className="h-5 w-5" />
                      Login Demo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Test the login flow with email and password authentication.
                    </p>
                    <Button onClick={() => openModal('login')} className="w-full">
                      Open Login Modal
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      Registration Demo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Try the registration flow with password strength validation.
                    </p>
                    <Button onClick={() => openModal('register')} className="w-full">
                      Open Registration Modal
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Password Reset Demo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Test the forgot password flow and email reset system.
                    </p>
                    <Button onClick={() => openModal('forgot-password')} className="w-full">
                      Open Reset Modal
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Login History */}
              {loginHistory.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Authentication History</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Recent authentication attempts and methods used
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {loginHistory.slice(-5).reverse().map((entry, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <img
                              src={entry.avatar}
                              alt={`${entry.firstName} ${entry.lastName}`}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-sm">
                                {entry.firstName} {entry.lastName}
                              </p>
                              <p className="text-xs text-muted-foreground">{entry.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="text-xs">
                              {entry.method}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {entry.loginTime.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="flows" className="space-y-4">
              <AuthFlowDemo />
            </TabsContent>
            
            <TabsContent value="usage" className="space-y-4">
              <UsageExamples />
            </TabsContent>
            
            <TabsContent value="config" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Modal Configuration</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Customize the authentication modal behavior
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Enable Social Login</label>
                          <input
                            type="checkbox"
                            checked={modalConfig.enableSocialLogin}
                            onChange={(e) => setModalConfig(prev => ({ 
                              ...prev, 
                              enableSocialLogin: e.target.checked 
                            }))}
                            className="rounded"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Enable Registration</label>
                          <input
                            type="checkbox"
                            checked={modalConfig.enableRegistration}
                            onChange={(e) => setModalConfig(prev => ({ 
                              ...prev, 
                              enableRegistration: e.target.checked 
                            }))}
                            className="rounded"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Enable Forgot Password</label>
                          <input
                            type="checkbox"
                            checked={modalConfig.enableForgotPassword}
                            onChange={(e) => setModalConfig(prev => ({ 
                              ...prev, 
                              enableForgotPassword: e.target.checked 
                            }))}
                            className="rounded"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium">Available Social Providers</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Chrome className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Google OAuth</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Facebook className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Facebook Login</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Github className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">GitHub OAuth</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <Button 
                        onClick={() => openModal('login')} 
                        variant="outline"
                        className="w-full"
                      >
                        Test Login
                      </Button>
                      <Button 
                        onClick={() => openModal('register')} 
                        variant="outline"
                        className="w-full"
                      >
                        Test Register
                      </Button>
                      <Button 
                        onClick={() => openModal('forgot-password')} 
                        variant="outline"
                        className="w-full"
                      >
                        Test Reset
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Security Features */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Security Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Password Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Minimum 8 characters required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Uppercase and lowercase letters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Numbers and special characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Real-time strength indicator</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Form Validation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Email format validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Philippine phone number format</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Password confirmation matching</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Real-time error feedback</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  User Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Mobile-responsive design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Keyboard navigation support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Loading states and feedback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Accessibility compliance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Login Modal */}
        <LoginModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
          initialMode={modalMode}
          {...modalConfig}
        />
      </div>
    </div>
  )
}

export default LoginModalExamples