import { Heart, Users, Target } from "lucide-react"

export function ServicesSection() {
    const services = [
        {
            icon: Heart,
            title: "CHARITY HELP",
            description:
                "We provide direct assistance to families and individuals in need through our comprehensive charity programs.",
        },
        {
            icon: Users,
            title: "VOLUNTEER",
            description: "Join our community of dedicated volunteers and make a meaningful impact in your local community.",
        },
        {
            icon: Target,
            title: "FUNDRAISING",
            description:
                "Support our fundraising initiatives to help us reach more people and expand our charitable programs.",
        },
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-orange-500 text-white p-8 rounded-lg text-center hover:bg-orange-600 transition-colors"
                        >
                            <service.icon className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                            <p className="opacity-90">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
