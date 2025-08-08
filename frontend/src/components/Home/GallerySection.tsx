export function GallerySection() {
    const images = [
        "/community-volunteers.png",
        "/children-learning.png",
        "/placeholder-8dh4u.png",
        "/food-distribution.png",
        "/community-building.png",
        "/clean-water-initiative.png",
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Gallery</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        See the impact of our work through these moments captured from our various programs and initiatives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow group"
                        >
                            <img
                                src={image || "/placeholder.svg"}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                <button className="opacity-0 group-hover:opacity-100 bg-orange-500 text-white px-4 py-2 rounded-md transition-opacity">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
