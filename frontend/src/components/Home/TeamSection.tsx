export function TeamSection() {
    const team = [
        {
            name: "Sarah Johnson",
            role: "Program Director",
            image: "/professional-woman-smiling.png",
            description: "Leading our educational initiatives with over 10 years of experience in nonprofit management.",
        },
        {
            name: "Michael Chen",
            role: "Community Outreach",
            image: "/professional-man-smiling.png",
            description: "Connecting with communities and building partnerships to expand our reach and impact.",
        },
        {
            name: "Emily Rodriguez",
            role: "Healthcare Coordinator",
            image: "/placeholder-onpeg.png",
            description: "Overseeing our medical assistance programs and health education initiatives.",
        },
        {
            name: "David Thompson",
            role: "Volunteer Manager",
            image: "/friendly-man-volunteers.png",
            description: "Coordinating our volunteer programs and ensuring meaningful engagement opportunities.",
        },
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Volunteers</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our dedicated team of volunteers and staff members work tirelessly to make a positive impact in communities
                        worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                                <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
