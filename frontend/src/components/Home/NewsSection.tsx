import { Calendar, User } from "lucide-react"

export function NewsSection() {
    const news = [
        {
            title: "New School Built in Rural Community",
            excerpt:
                "We are proud to announce the completion of our latest educational facility, providing learning opportunities for over 200 children.",
            image: "/new-school-building-children.png",
            date: "March 15, 2024",
            author: "Admin",
        },
        {
            title: "Clean Water Initiative Reaches 1000 Families",
            excerpt:
                "Our water purification project has successfully provided clean drinking water to communities across three villages.",
            image: "/placeholder.svg?height=200&width=300",
            date: "March 10, 2024",
            author: "Admin",
        },
        {
            title: "Annual Fundraising Gala Raises Record Amount",
            excerpt:
                "Thanks to our generous supporters, this year's gala raised over $500,000 for our various charitable programs.",
            image: "/placeholder.svg?height=200&width=300",
            date: "March 5, 2024",
            author: "Admin",
        },
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Latest News</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay updated with our latest projects, achievements, and community impact stories.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {news.map((article, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span className="mr-4">{article.date}</span>
                                    <User className="w-4 h-4 mr-2" />
                                    <span>{article.author}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{article.title}</h3>
                                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                <button className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
