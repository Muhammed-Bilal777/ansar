"use client"

import { useState } from 'react'
import { Calendar, Users, Heart, Share2, ExternalLink } from 'lucide-react'
import type { Donation } from '../types/donation'


interface DonationCardProps {
    donation: Donation
}

export function DonationCard({ donation }: DonationCardProps) {
    const [imageError, setImageError] = useState(false)

    const progressPercentage = (donation.currentAmount / donation.targetAmount) * 100
    const daysLeft = Math.ceil((new Date(donation.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getCategoryColor = (category: string) => {
        const colors = {
            'Medical': 'bg-red-100 text-red-600',
            'Education': 'bg-blue-100 text-blue-600',
            'Emergency': 'bg-yellow-100 text-yellow-600',
            'Food': 'bg-green-100 text-green-600',
            'Housing': 'bg-purple-100 text-purple-600',
        }
        return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-600'
    }

    const handleDonate = () => {
        // Implement donation logic here
        console.log('Donate to:', donation._id)
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: donation.title,
                text: donation.description,
                url: window.location.href + '/donations/' + donation.slug,
            })
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(window.location.href + '/donations/' + donation.slug)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    src={imageError ? "/placeholder.svg?height=200&width=400" : donation.image}
                    alt={donation.title}
                    onError={() => setImageError(true)}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(donation.category)}`}>
                        {donation.category}
                    </span>
                </div>

                {/* Share Button */}
                <button
                    onClick={handleShare}
                    className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all duration-200"
                >
                    <Share2 className="w-4 h-4 text-gray-600" />
                </button>

                {/* Urgency Indicator */}
                {daysLeft <= 30 && daysLeft > 0 && (
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {daysLeft} days left
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{donation.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{donation.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Raised: {formatCurrency(donation.currentAmount)}</span>
                        <span>Goal: {formatCurrency(donation.targetAmount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                        <span className="text-orange-600 font-medium">{progressPercentage.toFixed(1)}% funded</span>
                        <span className="text-gray-500">{donation.donors.length} donors</span>
                    </div>
                </div>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {formatDate(donation.deadline)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{donation.donors.length} supporters</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                    <button
                        onClick={handleDonate}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                        <Heart className="w-4 h-4" />
                        <span>Donate Now</span>
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-600 hover:text-orange-500 hover:border-orange-500 rounded-md transition-colors flex items-center justify-center">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
