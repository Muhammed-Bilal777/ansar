import { Quote } from "lucide-react"

export function TestimonialsSection() {
    const testimonials = [
        {
            quote:
                "The Ansar Foundation has been a beacon of hope in our community. Their educational programs have transformed the lives of countless children.",
            author: "Maria Garcia",
            role: "Community Leader",
        },
        {
            quote:
                "Thanks to their healthcare initiatives, our village now has access to clean water and medical care. We are forever grateful.",
            author: "Ahmed Hassan",
            role: "Village Elder",
        },
        {
            quote:
                "As a volunteer, I've witnessed firsthand the incredible impact this organization has on families in need. It's truly inspiring.",
            author: "Jennifer Smith",
            role: "Volunteer",
        },
    ]

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Testimonials</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Hear from the communities and individuals whose lives have been touched by our work.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <Quote className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                            <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                            <div>
                                <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                                <p className="text-orange-500">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
