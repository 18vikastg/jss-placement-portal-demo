import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const TestimonialsSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Software Engineer",
            company: "Google",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b776?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "The platform helped me land my dream job at Google. The mentorship program and interview preparation were exceptional. I went from campus to Google in just 3 months!"
        },
        {
            name: "Rahul Kumar",
            role: "Data Scientist", 
            company: "Microsoft",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "Amazing experience! The AI-powered job matching feature connected me with opportunities I never would have found otherwise. The career guidance was top-notch."
        },
        {
            name: "Ananya Patel",
            role: "Product Manager",
            company: "Amazon",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "From being a confused final year student to getting placed at Amazon as a PM, this platform transformed my career trajectory completely. Highly recommended!"
        },
        {
            name: "Arjun Singh",
            role: "Frontend Developer",
            company: "Netflix",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "The skill development programs and coding bootcamps offered here are world-class. Got placed at Netflix with a 40% salary hike from my previous job!"
        },
        {
            name: "Sneha Reddy",
            role: "UI/UX Designer",
            company: "Spotify",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "The design portfolio review sessions and one-on-one mentoring helped me build an impressive portfolio that caught Spotify's attention. Forever grateful!"
        }
    ]

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Success Stories from Our Community
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Hear from professionals who transformed their careers through our platform
                    </p>
                </div>

                <div className="relative">
                    <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Profile Section */}
                            <div className="flex-shrink-0 text-center md:text-left">
                                <div className="relative mb-6">
                                    <img
                                        src={testimonials[currentTestimonial].image}
                                        alt={testimonials[currentTestimonial].name}
                                        className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0 border-4 border-purple-100"
                                    />
                                    <div className="absolute -top-2 -right-2 bg-purple-600 text-white p-2 rounded-full">
                                        <Quote className="w-4 h-4" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                    {testimonials[currentTestimonial].name}
                                </h3>
                                <p className="text-purple-600 font-medium mb-1">
                                    {testimonials[currentTestimonial].role}
                                </p>
                                <p className="text-gray-500 text-sm mb-4">
                                    at {testimonials[currentTestimonial].company}
                                </p>
                                <div className="flex justify-center md:justify-start">
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial Text */}
                            <div className="flex-1">
                                <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                                    "{testimonials[currentTestimonial].text}"
                                </blockquote>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                        onClick={prevTestimonial}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <button 
                        onClick={nextTestimonial}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Testimonial Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentTestimonial === index ? 'bg-purple-600' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Success Story?</h3>
                        <p className="text-gray-600 mb-6">Join thousands of successful professionals who found their dream jobs through our platform</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                                Start Your Journey
                            </button>
                            <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300">
                                Watch Success Stories
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection
