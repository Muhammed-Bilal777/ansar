import { Heart, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Heart className="w-8 h-8 text-orange-500" />
                            <div>
                                <h3 className="text-xl font-bold">CHARITY</h3>
                                <p className="text-sm text-gray-400">Ansar Foundation</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-4">
                            We are dedicated to making a positive impact in communities worldwide through our charitable initiatives
                            and programs.
                        </p>
                        <div className="flex space-x-4">
                            <Facebook className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                            <Twitter className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                            <Instagram className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                            <Youtube className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/causes" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Our Causes
                                </Link>
                            </li>
                            <li>
                                <Link to="/news" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Latest News
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Our Services</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Education Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Healthcare
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Food & Nutrition
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Emergency Relief
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                                    Community Development
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-orange-500" />
                                <span className="text-gray-400">123 Charity Street, City, State 12345</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-orange-500" />
                                <span className="text-gray-400">+1 234 567 8900</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-orange-500" />
                                <span className="text-gray-400">info@ansarfoundation.org</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2024 Ansar Foundation. All rights reserved. | Privacy Policy | Terms of Service
                    </p>
                </div>
            </div>
        </footer>
    )
}
