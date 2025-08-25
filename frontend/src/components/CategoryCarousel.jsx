import { Code, Database, Palette, Monitor, Globe, Smartphone, TrendingUp, BarChart } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    {
        name: "Frontend Developer",
        icon: Monitor,
        color: "bg-blue-100 text-blue-600 border-blue-200",
        count: "500+ jobs"
    },
    {
        name: "Backend Developer", 
        icon: Database,
        color: "bg-green-100 text-green-600 border-green-200",
        count: "400+ jobs"
    },
    {
        name: "Data Science",
        icon: BarChart,
        color: "bg-purple-100 text-purple-600 border-purple-200",
        count: "300+ jobs"
    },
    {
        name: "UI/UX Designer",
        icon: Palette,
        color: "bg-pink-100 text-pink-600 border-pink-200",
        count: "250+ jobs"
    },
    {
        name: "Full Stack Developer",
        icon: Code,
        color: "bg-orange-100 text-orange-600 border-orange-200",
        count: "450+ jobs"
    },
    {
        name: "Mobile Developer",
        icon: Smartphone,
        color: "bg-indigo-100 text-indigo-600 border-indigo-200",
        count: "200+ jobs"
    },
    {
        name: "DevOps Engineer",
        icon: Globe,
        color: "bg-red-100 text-red-600 border-red-200",
        count: "180+ jobs"
    },
    {
        name: "Product Manager",
        icon: TrendingUp,
        color: "bg-yellow-100 text-yellow-600 border-yellow-200",
        count: "150+ jobs"
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
                        Explore Job Categories
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover opportunities across different domains and find the perfect role that matches your skills
                    </p>
                </div>

                <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {categories.map((category, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <div 
                                    onClick={() => searchJobHandler(category.name)}
                                    className="group cursor-pointer"
                                >
                                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-2">
                                        <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <category.icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4">
                                            {category.count}
                                        </p>
                                        <Button 
                                            variant="outline" 
                                            className="w-full group-hover:bg-red-50 group-hover:border-red-200 group-hover:text-red-600 transition-all duration-300"
                                        >
                                            Explore Jobs
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
                        onClick={() => navigate("/jobs")}
                        className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-3 text-lg font-semibold"
                    >
                        View All Job Categories
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default CategoryCarousel