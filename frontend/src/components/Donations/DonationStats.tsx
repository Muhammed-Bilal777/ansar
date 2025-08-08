"use client"

import { useMemo } from 'react'
import { TrendingUp, Users, Target, Calendar } from 'lucide-react'
import type { Donation } from '../types/donation'

interface DonationStatsProps {
    donations: Donation[]
}

export function DonationStats({ donations }: DonationStatsProps) {
    const stats = useMemo(() => {
        const totalRaised = donations.reduce((sum, donation) => sum + donation.currentAmount, 0)
        const totalTarget = donations.reduce((sum, donation) => sum + donation.targetAmount, 0)
        const totalDonors = donations.reduce((sum, donation) => sum + donation.donors.length, 0)
        const activeCampaigns = donations.filter(d => d.status).length
        const averageProgress = donations.length > 0 ?
            donations.reduce((sum, donation) => sum + (donation.currentAmount / donation.targetAmount), 0) / donations.length * 100 : 0

        return {
            totalRaised,
            totalTarget,
            totalDonors,
            activeCampaigns,
            averageProgress
        }
    }, [donations])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const statCards = [
        {
            title: 'Total Raised',
            value: formatCurrency(stats.totalRaised),
            icon: TrendingUp,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            change: '+12.5%',
            changeColor: 'text-green-600'
        },
        {
            title: 'Total Donors',
            value: stats.totalDonors.toLocaleString(),
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            change: '+8.2%',
            changeColor: 'text-blue-600'
        },
        {
            title: 'Active Campaigns',
            value: stats.activeCampaigns.toString(),
            icon: Target,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
            change: '+3',
            changeColor: 'text-orange-600'
        },
        {
            title: 'Average Progress',
            value: `${stats.averageProgress.toFixed(1)}%`,
            icon: Calendar,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
            change: '+5.1%',
            changeColor: 'text-purple-600'
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <div className="flex items-center mt-2">
                                <span className={`text-sm font-medium ${stat.changeColor}`}>
                                    {stat.change}
                                </span>
                                <span className="text-sm text-gray-500 ml-1">vs last month</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-full ${stat.bgColor}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
