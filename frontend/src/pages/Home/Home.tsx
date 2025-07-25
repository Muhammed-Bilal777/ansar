"use client"
import "./index.css"


import {
    Heart,
    Users,
    Globe,
    Calendar,
    MapPin,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    ArrowRight,
    Star,
} from "lucide-react"

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useEffect, useState } from "react"
import { GraduationCap, Building2 } from "lucide-react"
import { getFromLocalStorage } from "../../utils/localStorage/storage"

// Dummy donation data
const donationsData = {
    school: [
        {
            id: 1,
            title: "Build New Classrooms for Rural School",
            description:
                "Help us construct modern classrooms with proper facilities for underprivileged children in rural areas. This project will benefit over 200 students.",
            totalAmount: 50000,
            amountRaised: 32000,
            balanceAmount: 18000,
            lastDate: "2024-06-15",
            category: "school",
            image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=250&fit=crop",
        },
        {
            id: 2,
            title: "School Library Development Project",
            description:
                "Creating a well-equipped library with books, computers, and study materials to enhance learning opportunities for students.",
            totalAmount: 25000,
            amountRaised: 18500,
            balanceAmount: 6500,
            lastDate: "2024-05-20",
            category: "school",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
        },
        {
            id: 3,
            title: "Student Scholarship Program",
            description:
                "Providing scholarships to deserving students from low-income families to continue their education without financial burden.",
            totalAmount: 75000,
            amountRaised: 45000,
            balanceAmount: 30000,
            lastDate: "2024-07-10",
            category: "school",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
        },
    ],
    widow: [
        {
            id: 4,
            title: "Widow Empowerment Training Program",
            description:
                "Skill development and vocational training for widows to help them become financially independent and support their families.",
            totalAmount: 40000,
            amountRaised: 28000,
            balanceAmount: 12000,
            lastDate: "2024-05-30",
            category: "widow",
            image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=250&fit=crop",
        },
        {
            id: 5,
            title: "Monthly Support for Elderly Widows",
            description:
                "Providing monthly financial assistance and healthcare support for elderly widows who have no other source of income.",
            totalAmount: 60000,
            amountRaised: 42000,
            balanceAmount: 18000,
            lastDate: "2024-06-25",
            category: "widow",
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
        },
        {
            id: 6,
            title: "Widow Housing Assistance Program",
            description:
                "Help widows secure safe and affordable housing by providing rental assistance and home improvement support.",
            totalAmount: 80000,
            amountRaised: 35000,
            balanceAmount: 45000,
            lastDate: "2024-08-01",
            category: "widow",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
        },
    ],
    hospital: [
        {
            id: 7,
            title: "Free Medical Camp for Rural Areas",
            description:
                "Organizing free medical camps in remote villages to provide basic healthcare services and medicines to underserved communities.",
            totalAmount: 35000,
            amountRaised: 26000,
            balanceAmount: 9000,
            lastDate: "2024-04-15",
            category: "hospital",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
        },
        {
            id: 8,
            title: "Children's Cancer Treatment Fund",
            description:
                "Supporting families with children battling cancer by covering treatment costs, medications, and hospital expenses.",
            totalAmount: 100000,
            amountRaised: 65000,
            balanceAmount: 35000,
            lastDate: "2024-07-20",
            category: "hospital",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
        },
        {
            id: 9,
            title: "Medical Equipment for Community Hospital",
            description:
                "Purchasing essential medical equipment and upgrading facilities at the community hospital to serve more patients effectively.",
            totalAmount: 120000,
            amountRaised: 78000,
            balanceAmount: 42000,
            lastDate: "2024-06-30",
            category: "hospital",
            image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=250&fit=crop",
        },
    ],
}

// Dummy news data with images
const newsData = [
    {
        id: 1,
        title: "Annual Charity Gala Raises Record Funds",
        description: "Our annual charity gala was a tremendous success, raising over $100,000 for various causes.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=120&h=120&fit=crop",
        date: "March 15, 2024",
    },
    {
        id: 2,
        title: "New School Opens in Rural Community",
        description: "Thanks to generous donations, we've opened a new school serving 300 children in rural areas.",
        image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=120&h=120&fit=crop",
        date: "March 10, 2024",
    },
    {
        id: 3,
        title: "Medical Mission Reaches Remote Villages",
        description: "Our medical team provided free healthcare to over 500 people in remote mountain villages.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=120&h=120&fit=crop",
        date: "March 5, 2024",
    },
]

// Dummy volunteer data
const volunteersData = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Program Coordinator",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=250&h=250&fit=crop",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Medical Volunteer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&h=250&fit=crop",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Education Specialist",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=250&h=250&fit=crop",
    },
    {
        id: 4,
        name: "David Thompson",
        role: "Community Outreach",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=250&fit=crop",
    },
]

// Dummy testimonial data
const testimonialsData = [
    {
        id: 1,
        name: "Maria Santos",
        role: "Beneficiary",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop",
        text: "Thanks to this organization, my children now have access to quality education. Their support has changed our lives completely.",
    },
    {
        id: 2,
        name: "James Wilson",
        role: "Donor",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
        text: "I've been supporting this charity for 5 years. Their transparency and impact make me confident in my donations.",
    },
    {
        id: 3,
        name: "Lisa Anderson",
        role: "Volunteer",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop",
        text: "Volunteering here has been incredibly rewarding. Seeing the direct impact of our work motivates me every day.",
    },
]

// Dummy gallery images
const galleryImages = [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
]

// Dummy news articles
const latestNews = [
    {
        id: 1,
        title: "Community Health Initiative Launches",
        description: "New program provides free health screenings and vaccinations to underserved communities.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
        date: "March 20, 2024",
    },
    {
        id: 2,
        title: "Education Program Expands to 5 New Schools",
        description: "Our literacy program now reaches over 1,000 children across rural and urban areas.",
        image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=200&fit=crop",
        date: "March 18, 2024",
    },
    {
        id: 3,
        title: "Volunteer Recognition Awards Ceremony",
        description: "Celebrating the dedication and impact of our amazing volunteers who make our work possible.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
        date: "March 15, 2024",
    },
]

export default function Homepage() {
    const [activeCategory, setActiveCategory] = useState("school")

    // Calculate summary data
    const calculateSummary = () => {
        const categories = ["school", "widow", "hospital"]
        return categories.map((category: any) => {
            const categoryData = donationsData[category]
            const totalAmount = categoryData.reduce((sum: any, item: any) => sum + item.totalAmount, 0)
            const totalRaised = categoryData.reduce((sum: any, item: any) => sum + item.amountRaised, 0)
            const totalProjects = categoryData.length

            return {
                category,
                totalAmount,
                totalRaised,
                totalProjects,
                icon: category === "school" ? GraduationCap : category === "widow" ? Heart : Building2,
            }
        })
    }

    // Prepare chart data
    const getChartData = () => {
        const currentData = donationsData[activeCategory]
        return currentData.map((item: any) => ({
            name: item.title.substring(0, 20) + "...",
            raised: item.amountRaised,
            remaining: item.balanceAmount,
            total: item.totalAmount,
        }))
    }

    // Pie chart data
    const getPieChartData = () => {
        const summary = calculateSummary()
        return summary.map((item, index) => ({
            name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
            value: item.totalRaised,
            color: ["#0C7715", "#F50595", "#059669"][index],
        }))
    }

    const formatCurrency = (amount: any) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    useEffect(() => {
        const user = getFromLocalStorage('user')
        if (user) {
            console.log(user);
        }

    }, [])
    const formatDate = (dateString: any) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <div className="homepage">
            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <Heart className="logo-icon" />
                            <span className="logo-text">CHARITY</span>
                        </div>
                        <nav className="nav">
                            <a href="#">Home</a>
                            <a href="#">About</a>
                            <a href="#">Causes</a>
                            <a href="#">Gallery</a>
                            <a href="#">News</a>
                            <a href="#">Contact</a>
                        </nav>
                        <div className="header-contact">
                            <div className="phone-info">
                                <Phone style={{ width: "16px", height: "16px" }} />
                                <span>+1 234 567 890</span>
                            </div>
                            <button className="btn btn-primary">Donate Now</button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>WE NEED YOUR SUPPORT</h1>
                            <p>
                                Join us in making a difference in the lives of those who need it most. Together, we can create lasting
                                change and build stronger communities through education, healthcare, and empowerment programs.
                            </p>
                            <div className="hero-buttons">
                                <button className="btn btn-primary">Donate Now</button>
                                <button className="btn btn-outline">Learn More</button>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img
                                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop"
                                alt="Happy family receiving support"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <Heart className="feature-icon" />
                            <h3>CHARITY HELP</h3>
                            <p>
                                Providing direct assistance to families and individuals in need through our comprehensive support
                                programs.
                            </p>
                        </div>
                        <div className="feature-card">
                            <Users className="feature-icon" />
                            <h3>VOLUNTEER</h3>
                            <p>Join our dedicated team of volunteers and make a hands-on difference in your community and beyond.</p>
                        </div>
                        <div className="feature-card">
                            <Globe className="feature-icon" />
                            <h3>FUNDRAISING</h3>
                            <p>
                                Supporting sustainable fundraising initiatives that create long-term impact for communities worldwide.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="content-section">
                <div className="container">
                    <div className="content-grid">
                        <div className="news-list">
                            {newsData.map((item) => (
                                <div key={item.id} className="news-card">
                                    <img src={item.image || "/placeholder.svg"} alt={item.title} />
                                    <div className="news-content">
                                        <div className="news-date">
                                            <Calendar style={{ width: "16px", height: "16px" }} />
                                            <span>{item.date}</span>
                                        </div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="donation-card">
                            <h3>Charity For Education</h3>
                            <img
                                src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=200&fit=crop"
                                alt="Education charity"
                            />
                            <p>
                                Support our education initiatives that provide quality learning opportunities to children in underserved
                                communities. Your donation helps build schools, train teachers, and provide essential learning
                                materials.
                            </p>
                            <button className="btn btn-primary" style={{ width: "100%" }}>
                                Donate Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Causes */}
            <section className="causes">
                <div className="container">
                    <div className="section-header">
                        <h2>Recent Causes</h2>
                        <p>
                            Discover our latest initiatives and see how your support can make a meaningful impact in communities
                            around the world.
                        </p>
                    </div>
                    <div className="causes-grid">
                        <div className="cause-card">
                            <img
                                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop"
                                alt="Child education"
                            />
                            <div className="cause-content">
                                <h3>SPONSOR A CHILD TODAY</h3>
                                <p>Provide a child with access to education, healthcare, and nutritious meals for a brighter future.</p>
                                <div className="progress-info">
                                    <span>Raised: $2,500</span>
                                    <span>Goal: $5,000</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "50%" }}></div>
                                </div>
                                <button className="btn btn-primary" style={{ width: "100%" }}>
                                    Donate Now
                                </button>
                            </div>
                        </div>
                        <div className="cause-card">
                            <img
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop"
                                alt="Medical care"
                            />
                            <div className="cause-content">
                                <h3>MEDICAL CARE FOR ALL</h3>
                                <p>Help us provide essential medical care and treatments to those who cannot afford healthcare.</p>
                                <div className="progress-info">
                                    <span>Raised: $8,200</span>
                                    <span>Goal: $12,000</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "68%" }}></div>
                                </div>
                                <button className="btn btn-primary" style={{ width: "100%" }}>
                                    Donate Now
                                </button>
                            </div>
                        </div>
                        <div className="cause-card">
                            <img
                                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop"
                                alt="Women empowerment"
                            />
                            <div className="cause-content">
                                <h3>EMPOWER WOMEN</h3>
                                <p>Support programs that provide skills training and economic opportunities for women in need.</p>
                                <div className="progress-info">
                                    <span>Raised: $4,800</span>
                                    <span>Goal: $8,000</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: "60%" }}></div>
                                </div>
                                <button className="btn btn-primary" style={{ width: "100%" }}>
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Donations Section */}
            <section className="donations">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Donation Campaigns</h2>
                        <p>
                            Support our various causes and make a difference in the lives of those who need it most. Track the
                            progress of our ongoing campaigns.
                        </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="donations-summary">
                        {calculateSummary().map((summary, index) => {
                            const IconComponent = summary.icon
                            return (
                                <div key={summary.category} className="summary-card">
                                    <IconComponent className="summary-icon" />
                                    <h3 className="summary-title">
                                        {summary.category.charAt(0).toUpperCase() + summary.category.slice(1)} Campaigns
                                    </h3>
                                    <div className="summary-amount">{formatCurrency(summary.totalRaised)}</div>
                                    <div className="summary-count">{summary.totalProjects} Active Projects</div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Category Filters */}
                    <div className="donations-categories">
                        {["school", "widow", "hospital"].map((category) => (
                            <button
                                key={category}
                                className={`category-btn ${activeCategory === category ? "active" : ""}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)} Campaigns
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="donations-content">
                        {/* Donations List */}
                        <div className="donations-list">
                            {donationsData[activeCategory].map((donation: any) => {
                                const progressPercentage = Math.round((donation.amountRaised / donation.totalAmount) * 100)

                                return (
                                    <div key={donation.id} className="donation-item">
                                        <div className="donation-header">
                                            <div>
                                                <h3 className="donation-title">{donation.title}</h3>
                                                <span className="donation-category">{donation.category}</span>
                                            </div>
                                        </div>

                                        <p className="donation-description">{donation.description}</p>

                                        <div className="donation-stats">
                                            <div className="stat-item">
                                                <div className="stat-value">{formatCurrency(donation.totalAmount)}</div>
                                                <div className="stat-label">Goal</div>
                                            </div>
                                            <div className="stat-item">
                                                <div className="stat-value">{formatCurrency(donation.amountRaised)}</div>
                                                <div className="stat-label">Raised</div>
                                            </div>
                                            <div className="stat-item">
                                                <div className="stat-value">{formatCurrency(donation.balanceAmount)}</div>
                                                <div className="stat-label">Remaining</div>
                                            </div>
                                        </div>

                                        <div className="donation-progress">
                                            <div className="progress-header">
                                                <span>Progress</span>
                                                <span className="progress-percentage">{progressPercentage}%</span>
                                            </div>
                                            <div className="progress-bar">
                                                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                                            </div>
                                        </div>

                                        <div className="donation-footer">
                                            <div className="last-date">
                                                <strong>Deadline:</strong> {formatDate(donation.lastDate)}
                                            </div>
                                            <button className="btn btn-primary">Donate Now</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Chart Container */}
                        <div className="chart-container">
                            <div className="chart-header">
                                <h3 className="chart-title">Campaign Analytics</h3>
                                <p className="chart-subtitle">
                                    {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Category Overview
                                </p>
                            </div>

                            {/* Bar Chart */}
                            <div className="chart-wrapper">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={getChartData()}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" fontSize={12} />
                                        <YAxis fontSize={12} />
                                        <Tooltip formatter={(value) => formatCurrency(value)} />
                                        <Bar dataKey="raised" fill="#0C7715" name="Amount Raised" />
                                        <Bar dataKey="remaining" fill="#F50595" name="Remaining" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Legend */}
                            <div className="chart-legend">
                                {donationsData[activeCategory].map((item: any, index: any) => (
                                    <div key={item.id} className="legend-item">
                                        <div className="legend-info">
                                            <div
                                                className="legend-color"
                                                style={{ backgroundColor: index % 2 === 0 ? "#0C7715" : "#F50595" }}
                                            ></div>
                                            <span className="legend-name">{item.title.substring(0, 25)}...</span>
                                        </div>
                                        <span className="legend-amount">{formatCurrency(item.amountRaised)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Overall Pie Chart */}
                    <div style={{ marginTop: "48px" }}>
                        <div className="section-header">
                            <h3>Overall Donations Distribution</h3>
                        </div>
                        <div
                            style={{
                                height: "400px",
                                background: "white",
                                borderRadius: "12px",
                                padding: "24px",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={getPieChartData()}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {getPieChartData().map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => formatCurrency(value)} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <h2>BECOME A PART OF THE WORLD CHANGE</h2>
                    <p>
                        Join thousands of supporters who are making a real difference in communities worldwide. Your contribution,
                        no matter the size, creates lasting impact and hope for those who need it most.
                    </p>
                    <div className="cta-buttons">
                        <button className="btn btn-white">Join Us Today</button>
                        <button className="btn btn-outline-white">Learn More</button>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="gallery">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Gallery</h2>
                    </div>
                    <div className="gallery-grid">
                        {galleryImages.map((image, index) => (
                            <div key={index} className="gallery-item">
                                <img src={image || "/placeholder.svg"} alt={`Gallery ${index + 1}`} />
                                <div className="gallery-overlay">
                                    <ArrowRight />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="mission">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Mission</h2>
                    </div>
                    <div className="mission-grid">
                        {[
                            { title: "Charity For Education", icon: "📚" },
                            { title: "Save The Hungry Child", icon: "🍽️" },
                            { title: "Charity For Homeless", icon: "🏠" },
                            { title: "Help For Hungry Child", icon: "❤️" },
                            { title: "Save For Homeless", icon: "🤝" },
                            { title: "Charity For Education", icon: "🎓" },
                        ].map((mission, index) => (
                            <div key={index} className="mission-card">
                                <div className="mission-icon">{mission.icon}</div>
                                <h3>{mission.title}</h3>
                                <p>
                                    Making a lasting impact through dedicated programs that address critical needs in our communities.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="stats">
                <div className="container">
                    <div className="stats-grid">
                        <div>
                            <div className="stat-number">365</div>
                            <p className="stat-label">Days of Help</p>
                        </div>
                        <div>
                            <div className="stat-number">2200</div>
                            <p className="stat-label">People Helped</p>
                        </div>
                        <div>
                            <div className="stat-number">155</div>
                            <p className="stat-label">Volunteers</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Volunteers */}
            <section className="volunteers">
                <div className="container">
                    <div className="section-header">
                        <h2>Meet Our Volunteers</h2>
                    </div>
                    <div className="volunteers-grid">
                        {volunteersData.map((volunteer) => (
                            <div key={volunteer.id} className="volunteer-card">
                                <img src={volunteer.image || "/placeholder.svg"} alt={volunteer.name} />
                                <div className="volunteer-info">
                                    <h3>{volunteer.name}</h3>
                                    <p className="volunteer-role">{volunteer.role}</p>
                                    <div className="social-links">
                                        <Facebook />
                                        <Twitter />
                                        <Instagram />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <div className="container">
                    <div className="section-header">
                        <h2>Testimonials</h2>
                    </div>
                    <div className="testimonials-grid">
                        {testimonialsData.map((testimonial) => (
                            <div key={testimonial.id} className="testimonial-card">
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="star" />
                                    ))}
                                </div>
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <div className="testimonial-author">
                                    <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                                    <div>
                                        <div className="author-name">{testimonial.name}</div>
                                        <div className="author-role">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News */}
            <section className="news">
                <div className="container">
                    <div className="section-header">
                        <h2>Latest News</h2>
                    </div>
                    <div className="news-grid">
                        {latestNews.map((article) => (
                            <div key={article.id} className="news-item">
                                <img src={article.image || "/placeholder.svg"} alt={article.title} />
                                <div className="news-item-content">
                                    <span className="badge">News</span>
                                    <h3>{article.title}</h3>
                                    <p>{article.description}</p>
                                    <div className="news-meta">
                                        <Calendar />
                                        <span>{article.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <div className="logo" style={{ marginBottom: "24px" }}>
                                <Heart className="logo-icon" />
                                <span className="logo-text">CHARITY</span>
                            </div>
                            <p>
                                We are dedicated to creating positive change in communities worldwide through education, healthcare, and
                                empowerment programs. Join us in making a difference.
                            </p>
                            <div className="social-links">
                                <Facebook />
                                <Twitter />
                                <Instagram />
                                <Youtube />
                            </div>
                        </div>
                        <div className="footer-section">
                            <h3>Quick Links</h3>
                            <ul className="footer-links">
                                <li>
                                    <a href="#">About Us</a>
                                </li>
                                <li>
                                    <a href="#">Our Causes</a>
                                </li>
                                <li>
                                    <a href="#">Volunteer</a>
                                </li>
                                <li>
                                    <a href="#">Gallery</a>
                                </li>
                                <li>
                                    <a href="#">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h3>Contact Info</h3>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <MapPin />
                                    <span>123 Charity Street, Hope City, HC 12345</span>
                                </div>
                                <div className="contact-item">
                                    <Phone />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="contact-item">
                                    <Mail />
                                    <span>info@charityorganization.org</span>
                                </div>
                            </div>
                        </div>
                        <div className="footer-section">
                            <h3>Newsletter</h3>
                            <p>Subscribe to our newsletter to get updates about our causes and events.</p>
                            <div className="newsletter-form">
                                <input type="email" placeholder="Your email address" />
                                <button className="btn btn-primary">Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2024 Charity Organization. All rights reserved. | Privacy Policy | Terms of Service</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
