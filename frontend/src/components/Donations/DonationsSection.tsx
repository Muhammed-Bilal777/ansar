"use client"

import { useState, useMemo } from 'react'
import { Calendar, Users, TrendingUp, Filter, Search, RefreshCw } from 'lucide-react'
import { DONATIONS_DATA } from '../../constants/donation'
import { DonationStats } from './DonationStats'
import { DonationChart } from './DonationChartProps'
import { DonationCard } from './DonationCard'


export function DonationsSection() {
    // Filter only active donations
    const donations = DONATIONS_DATA.filter(donation => donation.status)

    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'amount'>('recent')

    // Get unique categories
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(donations.map(d => d.category))]
        return cats
    }, [donations])

    // Filter and sort donations
    const filteredDonations = useMemo(() => {
        let filtered = donations.filter(donation => {
            const matchesCategory = selectedCategory === 'All' || donation.category === selectedCategory
            const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                donation.description.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesCategory && matchesSearch
        })

        // Sort donations
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'progress':
                    return (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount)
                case 'amount':
                    return b.currentAmount - a.currentAmount
                case 'recent':
                default:
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            }
        })

        return filtered
    }, [donations, selectedCategory, searchTerm, sortBy])

    const handleRefresh = () => {
        // Placeholder for future API integration
        console.log('Refreshing donations data...')
        // You can add your API call here later
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Active Donations</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Support our ongoing charitable initiatives and see the real-time impact of your contributions.
                    </p>

                    <button
                        onClick={handleRefresh}
                        className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>Refresh Data</span>
                    </button>
                </div>

                {/* Statistics Overview */}
                <DonationStats donations={donations} />

                {/* Charts */}
                <div className="mb-12">
                    <DonationChart donations={donations} />
                </div>

                {/* Filters and Search */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search donations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center space-x-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-gray-500" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'recent' | 'progress' | 'amount')}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="recent">Most Recent</option>
                                <option value="progress">Highest Progress</option>
                                <option value="amount">Highest Amount</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Donations Grid */}
                {filteredDonations.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No donations found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDonations.map((donation) => (
                            <DonationCard key={donation._id} donation={donation} />
                        ))}
                    </div>
                )}

                {/* Load More Button */}
                {filteredDonations.length > 0 && (
                    <div className="text-center mt-12">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium transition-colors">
                            View All Donations
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
