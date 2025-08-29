import { 
    BookOpen, 
    Target, 
    Users, 
    Trophy, 
    Shield, 
    Zap,
    CheckCircle,
    Star
} from 'lucide-react'

const FeaturesSection = () => {
    const features = [
        {
            icon: Target,
            title: "Personalized Job Matching",
            description: "AI-powered algorithm matches you with jobs based on your skills, preferences, and career goals.",
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: Users,
            title: "Industry Expert Mentorship",
            description: "Get guidance from experienced professionals and industry leaders to accelerate your career growth.",
            color: "bg-green-100 text-green-600"
        },
        {
            icon: BookOpen,
            title: "Skill Development Programs",
            description: "Access exclusive training programs and certifications to enhance your skillset and marketability.",
            color: "bg-purple-100 text-purple-600"
        },
        {
            icon: Trophy,
            title: "Top Company Partnerships",
            description: "Direct access to opportunities at Fortune 500 companies and leading startups across industries.",
            color: "bg-orange-100 text-orange-600"
        },
        {
            icon: Shield,
            title: "Verified Opportunities",
            description: "All job postings are verified and legitimate. No fake listings or spam - just real opportunities.",
            color: "bg-red-100 text-red-600"
        },
        {
            icon: Zap,
            title: "Instant Application Process",
            description: "Apply to multiple jobs with one click. Save time with our streamlined application system.",
            color: "bg-yellow-100 text-yellow-600"
        }
    ]

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Why Choose Our Placement Portal?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We provide comprehensive career solutions designed specifically for students and professionals
                        looking to make their mark in the industry.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Success Stories Metrics */}
                <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold mb-4">Success Stories That Inspire</h3>
                        <p className="text-blue-100 text-lg">Join thousands of successful professionals who started their journey with us</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">98%</div>
                            <div className="text-blue-100">Job Satisfaction Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">50+</div>
                            <div className="text-blue-100">Industry Partners</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">24hrs</div>
                            <div className="text-blue-100">Average Response Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold mb-2">₹12L</div>
                            <div className="text-blue-100">Average Package</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection
