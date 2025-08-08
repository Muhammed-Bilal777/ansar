export function StatsSection() {
    const stats = [
        { number: "365", label: "Days of Service" },
        { number: "2200", label: "People Helped" },
        { number: "155", label: "Active Projects" },
    ]

    return (
        <section className="py-16 bg-orange-500 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                            <div className="text-xl opacity-90">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
