import { Code, Database, Palette, Monitor, Globe, Smartphone, TrendingUp, BarChart, Brain } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const techRoles = [
    {
        name: "Full Stack Developer",
        icon: Code,
        color: "bg-blue-100 text-blue-600 border-blue-200",
        count: "150+ jobs",
        growth: "+25%",
        trending: true
    },
    {
        name: "Frontend Developer", 
        icon: Monitor,
        color: "bg-green-100 text-green-600 border-green-200",
        count: "120+ jobs",
        growth: "+20%",
        trending: true
    },
    {
        name: "Backend Developer",
        icon: Database,
        color: "bg-purple-100 text-purple-600 border-purple-200",
        count: "110+ jobs",
        growth: "+15%",
        trending: false
    },
    {
        name: "UI/UX Designer",
        icon: Palette,
        color: "bg-pink-100 text-pink-600 border-pink-200",
        count: "55+ jobs",
        growth: "+18%",
        trending: false
    },
    {
        name: "Data Scientist",
        icon: BarChart,
        color: "bg-orange-100 text-orange-600 border-orange-200",
        count: "85+ jobs",
        growth: "+35%",
        trending: true
    },
    {
        name: "Mobile Developer",
        icon: Smartphone,
        color: "bg-indigo-100 text-indigo-600 border-indigo-200",
        count: "65+ jobs",
        growth: "+12%",
        trending: false
    },
    {
        name: "DevOps Engineer",
        icon: Globe,
        color: "bg-red-100 text-red-600 border-red-200",
        count: "75+ jobs",
        growth: "+30%",
        trending: true
    },
    {
        name: "ML Engineer",
        icon: Brain,
        color: "bg-yellow-100 text-yellow-600 border-yellow-200",
        count: "45+ jobs",
        growth: "+40%",
        trending: true
    }
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Explore Tech Roles
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover in-demand technology roles with growth potential and competitive salaries
                    </p>
                </div>

                <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {techRoles.map((role, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <div 
                                    onClick={() => searchJobHandler(role.name)}
                                    className="group cursor-pointer"
                                >
                                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-2 relative overflow-hidden">
                                        {role.trending && (
                                            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                Hot 🔥
                                            </div>
                                        )}
                                        
                                        <div className={`w-16 h-16 ${role.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <role.icon className="w-8 h-8" />
                                        </div>
                                        
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {role.name}
                                        </h3>
                                        
                                        <div className="space-y-2 mb-4">
                                            <p className="text-sm text-gray-500">
                                                {role.count}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600 font-medium text-sm">
                                                    {role.growth}
                                                </span>
                                                <span className="text-xs text-gray-400">growth</span>
                                            </div>
                                        </div>
                                        
                                        <Button 
                                            variant="outline" 
                                            className="w-full group-hover:bg-red-50 group-hover:border-red-200 group-hover:text-red-600 transition-all duration-300"
                                        >
                                            Explore Roles
                                        </Button>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>

                {/* View All Categories Button */}
                <div className="text-center mt-12">
                    <Button 
                        onClick={() => navigate("/opportunities")}
                        className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-3 text-lg font-semibold"
                    >
                        Explore All Tech Roles
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default CategoryCarousel