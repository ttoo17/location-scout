import React, { useState, useEffect, useCallback } from 'react'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Shield,
  Chrome,
  Facebook,
  Github
} from 'lucide-react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose
} from './ui/modal'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'
import { cn } from '@/lib/utils'

// Types
interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

interface ForgotPasswordData {
  email: string
}

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess?: (user: any) => void
  onRegisterSuccess?: (user: any) => void
  initialMode?: 'login' | 'register' | 'forgot-password'
  enableSocialLogin?: boolean
  enableRegistration?: boolean
  enableForgotPassword?: boolean
}

type AuthMode = 'login' | 'register' | 'forgot-password' | 'reset-sent' | 'verification-sent'

// Password strength checker
const checkPasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }
  
  const score = Object.values(checks).filter(Boolean).length
  
  return {
    score,
    checks,
    strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong'
  }
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onRegisterSuccess,
  initialMode = 'login',
  enableSocialLogin = true,
  enableRegistration = true,
  enableForgotPassword = true
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Form data states
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })
  
  const [forgotPasswordData, setForgotPasswordData] = useState<ForgotPasswordData>({
    email: ''
  })

  // Password strength for registration
  const passwordStrength = checkPasswordStrength(registerData.password)

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(\+63|0)?[0-9]{10}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {}

    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!loginData.password.trim()) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {}

    if (!registerData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!registerData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!registerData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(registerData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!registerData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(registerData.phone)) {
      newErrors.phone = 'Please enter a valid Philippine phone number'
    }

    if (!registerData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Password is too weak. Please include uppercase, lowercase, numbers, and special characters.'
    }

    if (!registerData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!registerData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateForgotPasswordForm = () => {
    const newErrors: Record<string, string> = {}

    if (!forgotPasswordData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(forgotPasswordData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Form submission handlers
  const handleLogin = async () => {
    if (!validateLoginForm()) return

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful login
      const user = {
        id: '1',
        email: loginData.email,
        firstName: 'John',
        lastName: 'Doe',
        avatar: '/api/placeholder/40/40'
      }
      
      onLoginSuccess?.(user)
      onClose()
    } catch (error) {
      setErrors({ general: 'Invalid email or password. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!validateRegisterForm()) return

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      // Mock successful registration
      const user = {
        id: '2',
        email: registerData.email,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        avatar: '/api/placeholder/40/40'
      }
      
      setMode('verification-sent')
      setTimeout(() => {
        onRegisterSuccess?.(user)
        onClose()
      }, 3000)
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!validateForgotPasswordForm()) return

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setMode('reset-sent')
    } catch (error) {
      setErrors({ general: 'Failed to send reset email. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  // Social login handlers
  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
    setIsLoading(true)
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const user = {
        id: '3',
        email: `user@${provider}.com`,
        firstName: 'Social',
        lastName: 'User',
        avatar: '/api/placeholder/40/40',
        provider
      }
      
      onLoginSuccess?.(user)
      onClose()
    } catch (error) {
      setErrors({ general: `${provider} login failed. Please try again.` })
    } finally {
      setIsLoading(false)
    }
  }

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
      setErrors({})
      setShowPassword(false)
      setShowConfirmPassword(false)
    } else {
      // Reset forms after modal closes
      setTimeout(() => {
        setLoginData({ email: '', password: '', rememberMe: false })
        setRegisterData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false
        })
        setForgotPasswordData({ email: '' })
        setErrors({})
      }, 300)
    }
  }, [isOpen, initialMode])

  // Clear errors when switching modes
  useEffect(() => {
    setErrors({})
  }, [mode])

  const renderPasswordStrengthIndicator = () => {
    if (!registerData.password) return null

    const { strength, checks } = passwordStrength
    
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-300",
                strength === 'weak' && "w-1/3 bg-red-500",
                strength === 'medium' && "w-2/3 bg-yellow-500",
                strength === 'strong' && "w-full bg-green-500"
              )}
            />
          </div>
          <Badge 
            variant={strength === 'strong' ? 'default' : 'secondary'}
            className={cn(
              "text-xs",
              strength === 'weak' && "bg-red-100 text-red-700",
              strength === 'medium' && "bg-yellow-100 text-yellow-700",
              strength === 'strong' && "bg-green-100 text-green-700"
            )}
          >
            {strength}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className={cn("flex items-center gap-1", checks.length ? "text-green-600" : "text-muted-foreground")}>
            <div className={cn("w-1 h-1 rounded-full", checks.length ? "bg-green-600" : "bg-muted-foreground")} />
            8+ characters
          </div>
          <div className={cn("flex items-center gap-1", checks.uppercase ? "text-green-600" : "text-muted-foreground")}>
            <div className={cn("w-1 h-1 rounded-full", checks.uppercase ? "bg-green-600" : "bg-muted-foreground")} />
            Uppercase
          </div>
          <div className={cn("flex items-center gap-1", checks.lowercase ? "text-green-600" : "text-muted-foreground")}>
            <div className={cn("w-1 h-1 rounded-full", checks.lowercase ? "bg-green-600" : "bg-muted-foreground")} />
            Lowercase
          </div>
          <div className={cn("flex items-center gap-1", checks.number ? "text-green-600" : "text-muted-foreground")}>
            <div className={cn("w-1 h-1 rounded-full", checks.number ? "bg-green-600" : "bg-muted-foreground")} />
            Number
          </div>
        </div>
      </div>
    )
  }

  const renderSocialLogins = () => {
    if (!enableSocialLogin) return null

    return (
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="w-full"
          >
            <Chrome className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading}
            className="w-full"
          >
            <Facebook className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('github')}
            disabled={isLoading}
            className="w-full"
          >
            <Github className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  const renderLoginForm = () => (
    <div className="space-y-4">
      {errors.general && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive">{errors.general}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
            className={cn("pl-10", errors.email && "border-destructive")}
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
            className={cn("pl-10 pr-10", errors.password && "border-destructive")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            id="remember"
            type="checkbox"
            checked={loginData.rememberMe}
            onChange={(e) => setLoginData(prev => ({ ...prev, rememberMe: e.target.checked }))}
            className="rounded border-gray-300"
          />
          <Label htmlFor="remember" className="text-sm">Remember me</Label>
        </div>
        
        {enableForgotPassword && (
          <button
            type="button"
            onClick={() => setMode('forgot-password')}
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </button>
        )}
      </div>

      {renderSocialLogins()}
    </div>
  )

  const renderRegisterForm = () => (
    <div className="space-y-4">
      {errors.general && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive">{errors.general}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder="First name"
              value={registerData.firstName}
              onChange={(e) => setRegisterData(prev => ({ ...prev, firstName: e.target.value }))}
              className={cn("pl-10", errors.firstName && "border-destructive")}
            />
          </div>
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Last name"
            value={registerData.lastName}
            onChange={(e) => setRegisterData(prev => ({ ...prev, lastName: e.target.value }))}
            className={errors.lastName ? "border-destructive" : ""}
          />
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="registerEmail">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="registerEmail"
            type="email"
            placeholder="Enter your email"
            value={registerData.email}
            onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
            className={cn("pl-10", errors.email && "border-destructive")}
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            placeholder="+63 9XX XXX XXXX"
            value={registerData.phone}
            onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
            className={cn("pl-10", errors.phone && "border-destructive")}
          />
        </div>
        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="registerPassword">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="registerPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={registerData.password}
            onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
            className={cn("pl-10 pr-10", errors.password && "border-destructive")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {renderPasswordStrengthIndicator()}
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={registerData.confirmPassword}
            onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            className={cn("pl-10 pr-10", errors.confirmPassword && "border-destructive")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <input
            id="acceptTerms"
            type="checkbox"
            checked={registerData.acceptTerms}
            onChange={(e) => setRegisterData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
            className="rounded border-gray-300 mt-1"
          />
          <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
            I agree to the{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </Label>
        </div>
        {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms}</p>}
      </div>

      {renderSocialLogins()}
    </div>
  )

  const renderForgotPasswordForm = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {errors.general && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive">{errors.general}</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="forgotEmail">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="forgotEmail"
            type="email"
            placeholder="Enter your email"
            value={forgotPasswordData.email}
            onChange={(e) => setForgotPasswordData(prev => ({ ...prev, email: e.target.value }))}
            className={cn("pl-10", errors.email && "border-destructive")}
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>
    </div>
  )

  const renderResetSent = () => (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Reset Link Sent!</h3>
        <p className="text-muted-foreground">
          We've sent a password reset link to <strong>{forgotPasswordData.email}</strong>
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or{' '}
            <button 
              onClick={() => setMode('forgot-password')}
              className="text-primary hover:underline"
            >
              try again
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const renderVerificationSent = () => (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <Mail className="h-8 w-8 text-blue-600" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Verify Your Email</h3>
        <p className="text-muted-foreground">
          We've sent a verification link to <strong>{registerData.email}</strong>
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Please check your email and click the verification link to complete your registration.
          </p>
        </CardContent>
      </Card>
    </div>
  )

  const getModalTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome Back'
      case 'register': return 'Create Account'
      case 'forgot-password': return 'Reset Password'
      case 'reset-sent': return 'Check Your Email'
      case 'verification-sent': return 'Verify Your Email'
      default: return 'Authentication'
    }
  }

  const getModalDescription = () => {
    switch (mode) {
      case 'login': return 'Sign in to your account to continue'
      case 'register': return 'Create a new account to get started'
      case 'forgot-password': return 'Reset your password'
      case 'reset-sent': return 'Password reset instructions sent'
      case 'verification-sent': return 'Account verification required'
      default: return ''
    }
  }

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="md" className="max-h-[90vh] overflow-y-auto">
        <ModalHeader>
          <ModalTitle>{getModalTitle()}</ModalTitle>
          <ModalDescription>{getModalDescription()}</ModalDescription>
        </ModalHeader>

        <div className="py-4">
          {mode === 'login' && renderLoginForm()}
          {mode === 'register' && renderRegisterForm()}
          {mode === 'forgot-password' && renderForgotPasswordForm()}
          {mode === 'reset-sent' && renderResetSent()}
          {mode === 'verification-sent' && renderVerificationSent()}
        </div>

        <ModalFooter>
          {mode === 'login' && (
            <>
              <div className="flex-1 text-center">
                {enableRegistration && (
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setMode('register')}
                      className="text-primary hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                )}
              </div>
              <Button onClick={handleLogin} disabled={isLoading} className="min-w-[100px]">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </>
          )}

          {mode === 'register' && (
            <>
              <Button
                variant="outline"
                onClick={() => setMode('login')}
                disabled={isLoading}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
              <Button onClick={handleRegister} disabled={isLoading} className="min-w-[120px]">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </>
          )}

          {mode === 'forgot-password' && (
            <>
              <Button
                variant="outline"
                onClick={() => setMode('login')}
                disabled={isLoading}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
              <Button onClick={handleForgotPassword} disabled={isLoading} className="min-w-[120px]">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </>
          )}

          {(mode === 'reset-sent' || mode === 'verification-sent') && (
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LoginModal