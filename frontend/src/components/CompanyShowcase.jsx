import { useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const CompanyShowcase = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const companies = [
        {
            name: "Google",
            logo: "https://logo.clearbit.com/google.com",
            description: "Leading technology company focused on internet services and products",
            openings: 25,
            avgPackage: "₹45 LPA",
            tags: ["Tech", "AI/ML", "Cloud"]
        },
        {
            name: "Microsoft",
            logo: "https://logo.clearbit.com/microsoft.com", 
            description: "Multinational technology corporation developing software and cloud services",
            openings: 18,
            avgPackage: "₹42 LPA",
            tags: ["Software", "Cloud", "AI"]
        },
        {
            name: "Amazon",
            logo: "https://logo.clearbit.com/amazon.com",
            description: "E-commerce and cloud computing leader with global operations",
            openings: 32,
            avgPackage: "₹38 LPA", 
            tags: ["E-commerce", "AWS", "Logistics"]
        },
        {
            name: "Meta",
            logo: "https://logo.clearbit.com/meta.com",
            description: "Social media and virtual reality technology company",
            openings: 15,
            avgPackage: "₹50 LPA",
            tags: ["Social Media", "VR", "AI"]
        },
        {
            name: "Netflix",
            logo: "https://logo.clearbit.com/netflix.com",
            description: "Streaming entertainment service with global reach",
            openings: 12,
            avgPackage: "₹35 LPA",
            tags: ["Entertainment", "Streaming", "Tech"]
        },
        {
            name: "Spotify",
            logo: "https://logo.clearbit.com/spotify.com",
            description: "Audio streaming and media services provider",
            openings: 8,
            avgPackage: "₹32 LPA",
            tags: ["Music", "Streaming", "Tech"]
        }
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(companies.length / 3))
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(companies.length / 3)) % Math.ceil(companies.length / 3))
    }

    const displayedCompanies = companies.slice(currentSlide * 3, (currentSlide + 1) * 3)

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Top Companies Hiring
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get placed at industry-leading companies that offer excellent career growth and competitive packages
                    </p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedCompanies.map((company, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors">
                                        <img 
                                            src={company.logo} 
                                            alt={company.name}
                                            className="w-10 h-10 object-contain"
                                            onError={(e) => {
                                                e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=6366f1&color=fff&size=40`
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                                        <div className="flex items-center text-blue-600 text-sm">
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            View Company
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">{company.description}</p>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Open Positions</span>
                                        <span className="font-semibold text-green-600">{company.openings} Jobs</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Average Package</span>
                                        <span className="font-semibold text-blue-600">{company.avgPackage}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-6">
                                    {company.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                                    View All Jobs
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: Math.ceil(companies.length / 3) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CompanyShowcase
