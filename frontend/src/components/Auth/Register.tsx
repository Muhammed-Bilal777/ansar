"use client"
import "../../global-css/auth/index.css"
import { Heart, Eye, EyeOff, Mail, Lock, User, Phone, MapPinHouse } from "lucide-react"
import { useState } from "react"

import { toast } from "react-toastify"

import { useNavigate } from "react-router-dom"
import { useCreateUserMutation } from "../../features/user/userApiSlice"
import Loader from "../../utils/Loader"
export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
        subscribeNewsletter: false,
    })

    const [createUser, { isLoading, isSuccess, isError, error }] = useCreateUserMutation();


    if (isLoading) {
        return <Loader />
    }
    if (isSuccess) {
        toast.success("User created successfully!")
        navigate('/login')
    }
    if (isError && error) {
        const err = error as any
        console.log(err, "err")

        toast.error(err?.data?.message)

        return <div>Error</div>
    }

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!")
            return
        }
        try {
            await createUser(formData)
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    }
    return (
        <div className="auth-container">
            {/* Background with blur effect */}
            <div className="auth-background">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
                <div className="bg-shape shape-4"></div>
            </div>

            {/* Register Card */}
            <div className="auth-card register-card">
                <div className="auth-header">
                    <div className="logo">
                        <Heart className="logo-icon" />
                        <span className="logo-text">CHARITY</span>
                    </div>
                    <h1 className="auth-title">Join Our Mission</h1>
                    <p className="auth-subtitle">Create an account to start making a difference in the world</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <div className="input-wrapper">
                                <User className="input-icon" />
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="form-input"
                                    placeholder="First name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName" className="form-label">
                                Last Name
                            </label>
                            <div className="input-wrapper">
                                <User className="input-icon" />
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="form-input"
                                    placeholder="Last name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                            Phone Number
                        </label>
                        <div className="input-wrapper">
                            <Phone className="input-icon" />
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="form-input"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <div className="input-wrapper">
                            <MapPinHouse className="input-icon" />
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-input"
                                placeholder="Enter your City"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="form-input"
                                    placeholder="Create password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-input"
                                    placeholder="Confirm password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="form-options register-options">
                        <label className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleInputChange}
                                required
                            />
                            <span className="checkbox-custom"></span>I agree to the{" "}
                            <a href="#" className="terms-link">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="terms-link">
                                Privacy Policy
                            </a>
                        </label>

                        <label className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                name="subscribeNewsletter"
                                checked={formData.subscribeNewsletter}
                                onChange={handleInputChange}
                            />
                            <span className="checkbox-custom"></span>
                            Subscribe to our newsletter for updates
                        </label>
                    </div>

                    <button type="submit" className="auth-button">
                        Create Account
                    </button>

                    <div className="auth-divider">
                        <span>or</span>
                    </div>

                    <div className="social-login">
                        <button type="button" className="social-button google">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Sign up with Google
                        </button>
                        <button type="button" className="social-button facebook">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Sign up with Facebook
                        </button>
                    </div>

                    <div className="auth-footer">
                        <p>
                            Already have an account?{" "}
                            <a href="/login" className="auth-link">
                                Sign in here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
