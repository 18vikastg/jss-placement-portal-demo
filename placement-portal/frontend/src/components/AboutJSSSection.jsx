import { Button } from './ui/button';
import { GraduationCap, Users, Trophy, Building2 } from 'lucide-react';

const AboutJSSSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-gray-200 rounded-2xl p-4 md:p-8 shadow-sm">
                    {/* Left side - Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-medium">
                                <Building2 className="w-4 h-4 mr-2" />
                                Since 1997
                            </span>
                            <h2 className="text-4xl font-bold text-gray-900">
                                JSS Academy of 
                                <span className="block text-red-700">Technical Education</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Located in the heart of Bengaluru, JSS Academy of Technical Education has been a beacon of excellence in technical education for over two decades. Our campus nurtures innovation, creativity, and professional growth.
                            </p>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <GraduationCap className="w-6 h-6 text-red-700" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">15,000+</div>
                                        <div className="text-sm text-gray-600">Alumni Network</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Users className="w-6 h-6 text-blue-700" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">95%</div>
                                        <div className="text-sm text-gray-600">Placement Rate</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Trophy className="w-6 h-6 text-green-700" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">25+</div>
                                        <div className="text-sm text-gray-600">Years Excellence</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Building2 className="w-6 h-6 text-purple-700" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">200+</div>
                                        <div className="text-sm text-gray-600">Partner Companies</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                                className="bg-red-700 hover:bg-red-800 text-white px-8 py-3"
                                onClick={() => window.open('https://www.jssateb.ac.in/', '_blank')}
                            >
                                Learn More About JSS
                            </Button>
                            <Button 
                                variant="outline" 
                                className="border-red-700 text-red-700 hover:bg-red-50 px-8 py-3"
                                onClick={() => window.open('https://www.jssateb.ac.in/', '_blank')}
                            >
                                Campus Virtual Tour
                            </Button>
                        </div>
                    </div>

                    {/* Right side - JSS Front Image */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img 
                                src="/jss front.jpeg" 
                                alt="JSS Academy of Technical Education Campus" 
                                className="w-full h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl">
                                    <h3 className="font-semibold text-gray-900">JSS Academy Campus</h3>
                                    <p className="text-sm text-gray-600">Bengaluru, Karnataka</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative elements removed for codebase cleanliness */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutJSSSection;
