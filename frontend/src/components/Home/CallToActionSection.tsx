export function CallToActionSection() {
    return (
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Save Children From Hunger</h2>
                <h3 className="text-xl md:text-2xl mb-6 opacity-90">BECOME A PART OF THE WORLD LOREM IPSUM</h3>
                <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
                    Join our mission to end child hunger and malnutrition. Your support can provide meals, nutrition programs, and
                    sustainable food solutions to children and families in need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-orange-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                        Donate Now
                    </button>
                    <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-orange-500 transition-colors">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    )
}
