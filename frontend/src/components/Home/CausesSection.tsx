export function CausesSection() {
    const causes = [
        {
            title: "SPONSOR A CHILD TODAY",
            description: "Help provide education, healthcare, and nutrition to children in need.",
            image: "/classroom-learning.png",
            raised: "$15,000",
            goal: "$25,000",
        },
        {
            title: "SPONSOR A CHILD TODAY",
            description: "Support our mission to provide clean water and sanitation facilities.",
            image: "/happy-children-playing.png",
            raised: "$8,500",
            goal: "$15,000",
        },
        {
            title: "SPONSOR A CHILD TODAY",
            description: "Help us build schools and educational facilities in underserved communities.",
            image: "/diverse-children-smiling.png",
            raised: "$22,000",
            goal: "$30,000",
        },
    ]

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Recent Causes</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our latest initiatives and see how your contributions are making a real difference in communities
                        around the world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {causes.map((cause, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            <img src={cause.image || "/placeholder.svg"} alt={cause.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{cause.title}</h3>
                                <p className="text-gray-600 mb-4">{cause.description}</p>

                                <div className="mb-4">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Raised: {cause.raised}</span>
                                        <span>Goal: {cause.goal}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                                    </div>
                                </div>

                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-medium transition-colors">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
