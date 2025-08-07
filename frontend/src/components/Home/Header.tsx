"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Phone, Mail, MapPin, Heart } from "lucide-react"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const navigation = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Causes", href: "/causes" },
        { name: "News", href: "/news" },
        { name: "Contact", href: "/contact" },
    ]

    return (
        <header className="bg-white shadow-sm">
            {/* Top Bar */}
            <div className="bg-gray-800 text-white py-2">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>+91 81236 73585</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>info@ansarfoundation.org</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>#777 Tippu Nagar, Kerebilchi, Davangere 577218</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <Heart className="w-8 h-8 text-orange-500" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">CHARITY</h1>
                            <p className="text-sm text-gray-600">Ansar Foundation</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`text-gray-700 hover:text-orange-500 font-medium transition-colors ${location.pathname === item.href ? "text-orange-500" : ""
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Donate Button */}
                    <div className="hidden md:block">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                            Donate Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <nav className="flex flex-col space-y-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`text-gray-700 hover:text-orange-500 font-medium transition-colors ${location.pathname === item.href ? "text-orange-500" : ""
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors w-fit">
                                Donate Now
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
