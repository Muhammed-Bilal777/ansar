"use client"

import { useState, useEffect } from "react"
import { Heart, Mail, Phone, MapPin, Calendar, CheckCircle, User, Shield, Clock } from "lucide-react"
import "./index.css"

import { useGetUserProfileQuery } from "../../features/user/userApiSlice"
import Loader from "../../utils/Loader"


interface DonationCause {
    _id: string
    title: string
    category: string
    targetAmount: number
    currentAmount: number
    image: string
}

interface Donation {
    donationId: DonationCause
    amount: number
    donatedAt: string
    _id: string
}

interface UserData {
    _id: string
    firstName: string
    lastName: string
    email: string
    role: string
    phone: string
    address: string
    isVerified: boolean
    donatedTo: Donation[]
    createdAt: string
    updatedAt: string
}

export default function UserComponent() {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("profile")
    const { isError, error, data, isLoading } = useGetUserProfileQuery(null)

    useEffect(() => {
        if (data?.user) {
            setUserData(data.user);
            setLoading(false)
        }
    }, [data]);

    if (isLoading) return <Loader />;



    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    if (loading) {
        return (
            <div className="profile-loading">
                <Loader />
            </div>
        )
    }

    if (!userData) {
        return <div className="profile-error">Failed to load user data. Please try again later.</div>
    }

    const totalDonated = userData.donatedTo.reduce((sum, donation) => sum + donation.amount, 0)

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-header-content">
                    <div className="profile-avatar">
                        <div className="profile-avatar-inner">
                            {userData.firstName.charAt(0)}
                            {userData.lastName.charAt(0)}
                        </div>
                        {userData.isVerified && (
                            <div className="profile-verified">
                                <CheckCircle size={20} />
                            </div>
                        )}
                    </div>
                    <div className="profile-header-info">
                        <h1 className="profile-name">
                            {userData.firstName} {userData.lastName}
                        </h1>
                        <div className="profile-meta">
                            <div className="profile-role">
                                <Shield size={16} />
                                <span>{userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}</span>
                            </div>
                            <div className="profile-joined">
                                <Clock size={16} />
                                <span>Joined {formatDate(userData.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-stats">
                    <div className="profile-stat">
                        <div className="stat-value">{userData.donatedTo.length}</div>
                        <div className="stat-label">Donations</div>
                    </div>
                    <div className="profile-stat">
                        <div className="stat-value">{formatCurrency(totalDonated)}</div>
                        <div className="stat-label">Total Donated</div>
                    </div>
                </div>
            </div>

            <div className="profile-tabs">
                <button
                    className={`profile-tab ${activeTab === "profile" ? "active" : ""}`}
                    onClick={() => setActiveTab("profile")}
                >
                    <User size={18} />
                    <span>Profile</span>
                </button>
                <button
                    className={`profile-tab ${activeTab === "donations" ? "active" : ""}`}
                    onClick={() => setActiveTab("donations")}
                >
                    <Heart size={18} />
                    <span>Donations</span>
                </button>
            </div>

            <div className="profile-content">
                {activeTab === "profile" && (
                    <div className="profile-details">
                        <div className="profile-card">
                            <h2 className="profile-card-title">Personal Information</h2>
                            <div className="profile-info-grid">
                                <div className="profile-info-item">
                                    <div className="info-label">Full Name</div>
                                    <div className="info-value">
                                        {userData.firstName} {userData.lastName}
                                    </div>
                                </div>
                                <div className="profile-info-item">
                                    <div className="info-label">Email Address</div>
                                    <div className="info-value">
                                        <Mail size={16} className="info-icon" />
                                        <span>{userData.email}</span>
                                    </div>
                                </div>
                                <div className="profile-info-item">
                                    <div className="info-label">Phone Number</div>
                                    <div className="info-value">
                                        <Phone size={16} className="info-icon" />
                                        <span>{userData.phone}</span>
                                    </div>
                                </div>
                                <div className="profile-info-item">
                                    <div className="info-label">Address</div>
                                    <div className="info-value">
                                        <MapPin size={16} className="info-icon" />
                                        <span>{userData.address}</span>
                                    </div>
                                </div>
                                <div className="profile-info-item">
                                    <div className="info-label">Account Status</div>
                                    <div className="info-value">
                                        {userData.isVerified ? (
                                            <span className="status verified">
                                                <CheckCircle size={16} />
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="status unverified">Unverified</span>
                                        )}
                                    </div>
                                </div>
                                <div className="profile-info-item">
                                    <div className="info-label">Member Since</div>
                                    <div className="info-value">
                                        <Calendar size={16} className="info-icon" />
                                        <span>{formatDate(userData.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-card">
                            <h2 className="profile-card-title">Account Summary</h2>
                            <div className="profile-summary">
                                <div className="summary-item">
                                    <div className="summary-icon donations-icon">
                                        <Heart size={24} />
                                    </div>
                                    <div className="summary-details">
                                        <div className="summary-value">{userData.donatedTo.length}</div>
                                        <div className="summary-label">Total Donations</div>
                                    </div>
                                </div>
                                <div className="summary-item">
                                    <div className="summary-icon amount-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                            <path d="M12 18V6" />
                                        </svg>
                                    </div>
                                    <div className="summary-details">
                                        <div className="summary-value">{formatCurrency(totalDonated)}</div>
                                        <div className="summary-label">Total Amount Donated</div>
                                    </div>
                                </div>
                                <div className="summary-item">
                                    <div className="summary-icon causes-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                        </svg>
                                    </div>
                                    <div className="summary-details">
                                        <div className="summary-value">
                                            {new Set(userData.donatedTo.map((donation) => donation.donationId.category)).size}
                                        </div>
                                        <div className="summary-label">Categories Supported</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "donations" && (
                    <div className="profile-donations">
                        <div className="profile-card">
                            <h2 className="profile-card-title">Donation History</h2>
                            <div className="donations-list">
                                {userData.donatedTo.length === 0 ? (
                                    <div className="no-donations">You haven't made any donations yet.</div>
                                ) : (
                                    userData.donatedTo.map((donation) => (
                                        <div key={donation._id} className="donation-item">
                                            <div className="donation-image">
                                                <img
                                                    src={
                                                        donation.donationId.image ||
                                                        `/placeholder.svg?height=80&width=80&query=medical+donation` ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={donation.donationId.title}
                                                />
                                                <div className="donation-category">{donation.donationId.category}</div>
                                            </div>
                                            <div className="donation-details">
                                                <h3 className="donation-title">{donation.donationId.title}</h3>
                                                <div className="donation-meta">
                                                    <div className="donation-date">
                                                        <Calendar size={14} />
                                                        <span>
                                                            {formatDate(donation.donatedAt)} at {formatTime(donation.donatedAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="donation-progress">
                                                    <div className="progress-info">
                                                        <span>
                                                            {formatCurrency(donation.donationId.currentAmount)} of{" "}
                                                            {formatCurrency(donation.donationId.targetAmount)}
                                                        </span>
                                                        <span>
                                                            {Math.round((donation.donationId.currentAmount / donation.donationId.targetAmount) * 100)}
                                                            %
                                                        </span>
                                                    </div>
                                                    <div className="progress-bar">
                                                        <div
                                                            className="progress-fill"
                                                            style={{
                                                                width: `${Math.min(
                                                                    (donation.donationId.currentAmount / donation.donationId.targetAmount) * 100,
                                                                    100,
                                                                )}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="donation-amount">
                                                <div className="amount-label">Your Donation</div>
                                                <div className="amount-value">{formatCurrency(donation.amount)}</div>
                                                <button className="donate-again-btn">Donate Again</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
