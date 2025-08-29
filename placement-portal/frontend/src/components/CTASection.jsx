import { ArrowRight, Play, Download, Users, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const CTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-red-900 via-red-800 to-red-700 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-0 left-0 w-72 h-72 bg-red-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-white">
                        <div className="mb-8">
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
                                <Users className="w-4 h-4 mr-2" />
                                Join 5,000+ JSSATE Students
                            </span>
                            <h2 className="text-5xl font-bold leading-tight mb-6">
                                Your Dream Career
                                <span className="block text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text">
                                    Starts at JSSATE
                                </span>
                            </h2>
                            <p className="text-xl text-red-100 leading-relaxed mb-8">
                                Get personalized job recommendations, expert career guidance, and access to exclusive opportunities from top companies through JSS Academy of Technical Education.
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-4 mb-8">
                            {[
                                "AI-powered job matching",
                                "One-on-one career mentorship", 
                                "Industry-recognized certifications",
                                "Direct company connections"
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <span className="text-red-100">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/signup">
                                <Button className="bg-white text-red-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl transition-all duration-300 group">
                                    Get Started Free
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-all duration-300 group">
                                <Play className="w-5 h-5 mr-2" />
                                Watch Demo
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Statistics */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white border border-white/20">
                            <div className="text-4xl font-bold mb-2">95%</div>
                            <div className="text-red-200">Placement Success Rate</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white border border-white/20">
                            <div className="text-4xl font-bold mb-2">₹8.5L</div>
                            <div className="text-red-200">Average Package</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white border border-white/20">
                            <div className="text-4xl font-bold mb-2">200+</div>
                            <div className="text-red-200">Top Recruiters</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white border border-white/20">
                            <div className="text-4xl font-bold mb-2">25+</div>
                            <div className="text-red-200">Years Excellence</div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Ready to Launch Your Career at JSSATE?
                        </h3>
                        <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                            Join thousands of successful professionals who transformed their careers through PrepLink. 
                            Start your journey today and unlock endless opportunities with JSSATE Bengaluru.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-xl">
                                    Create Free Account
                                </Button>
                            </Link>
                            <Button variant="link" className="text-white hover:text-red-200 font-medium">
                                <Download className="w-4 h-4 mr-2" />
                                Download Career Guide
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTASection
