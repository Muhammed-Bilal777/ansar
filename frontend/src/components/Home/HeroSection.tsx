export function HeroSection() {
    return (
        <section className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">WE NEED YOUR SUPPORT</h1>
                        <p className="text-xl mb-8 opacity-90">
                            Together we can make a difference in the lives of those who need it most. Your support helps us continue
                            our mission of hope and compassion.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-white text-orange-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                                Donate Now
                            </button>
                            <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-orange-500 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <img src="/happy-diverse-family.png" alt="Happy family" className="rounded-lg shadow-2xl" />
                    </div>
                </div>
            </div>
        </section>
    )
}
