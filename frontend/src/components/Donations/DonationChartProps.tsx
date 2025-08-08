"use client"

import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import type { Donation } from '../types/donation'


interface DonationChartProps {
    donations: Donation[]
}

export function DonationChart({ donations }: DonationChartProps) {
    const chartData = useMemo(() => {
        // Category-wise data
        const categoryData = donations.reduce((acc, donation) => {
            const category = donation.category
            if (!acc[category]) {
                acc[category] = {
                    category,
                    totalRaised: 0,
                    totalTarget: 0,
                    count: 0
                }
            }
            acc[category].totalRaised += donation.currentAmount
            acc[category].totalTarget += donation.targetAmount
            acc[category].count += 1
            return acc
        }, {} as Record<string, any>)

        const categoryChartData = Object.values(categoryData)

        // Monthly progress data (mock data for demo)
        const monthlyData = [
            { month: 'Jan', amount: 12000 },
            { month: 'Feb', amount: 19000 },
            { month: 'Mar', amount: 15000 },
            { month: 'Apr', amount: 25000 },
            { month: 'May', amount: 22000 },
            { month: 'Jun', amount: 30000 },
        ]

        return { categoryChartData, monthlyData }
    }, [donations])

    const COLORS = ['#f97316', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Category Distribution Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Donations by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData.categoryChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis tickFormatter={formatCurrency} />
                        <Tooltip
                            formatter={(value: number) => [formatCurrency(value), 'Amount Raised']}
                            labelStyle={{ color: '#374151' }}
                        />
                        <Bar dataKey="totalRaised" fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Category Distribution Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Category Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData.categoryChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="totalRaised"
                        >
                            {chartData.categoryChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [formatCurrency(value), 'Amount Raised']} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Monthly Trend Line Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg lg:col-span-2">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Donation Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={formatCurrency} />
                        <Tooltip
                            formatter={(value: number) => [formatCurrency(value), 'Donations']}
                            labelStyle={{ color: '#374151' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#f97316"
                            strokeWidth={3}
                            dot={{ fill: '#f97316', strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8, stroke: '#f97316', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
