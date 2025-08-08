import { GraduationCap, Heart, Users, Globe, Shield, Lightbulb } from "lucide-react"

export function MissionSection() {
    const missions = [
        {
            icon: GraduationCap,
            title: "Charity For Education",
            description: "Providing quality education and learning opportunities to underprivileged children worldwide.",
        },
        {
            icon: Heart,
            title: "Save The Hungry Child",
            description: "Fighting child malnutrition and hunger through sustainable food programs and nutrition support.",
        },
        {
            icon: Users,
            title: "Charity For Homeless",
            description: "Offering shelter, support, and rehabilitation services to homeless individuals and families.",
        },
        {
            icon: Globe,
            title: "Help For Homeless",
            description: "Creating sustainable solutions to address homelessness and provide long-term support.",
        },
        {
            icon: Shield,
            title: "Charity For Homeless",
            description: "Protecting vulnerable populations and providing emergency assistance during crises.",
        },
        {
            icon: Lightbulb,
            title: "Charity For Education",
            description: "Empowering communities through education, skills training, and capacity building programs.",
        },
    ]

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We are committed to creating positive change through our diverse range of charitable programs and
                        initiatives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {missions.map((mission, index) => (
                        <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <mission.icon className="w-8 h-8 text-orange-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{mission.title}</h3>
                            <p className="text-gray-600">{mission.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
