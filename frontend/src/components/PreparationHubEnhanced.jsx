import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Search, 
    Filter, 
    BookOpen, 
    Star, 
    Clock, 
    TrendingUp,
    Heart,
    Code,
    Brain,
    Users,
    Target,
    Award,
    Play,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Zap,
    Lightbulb
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Navbar from './shared/NavbarNew'
import Scene3D from './3D/AnimatedBackground'
import EnhancementToggle from './ui/EnhancementToggle'
import WelcomeHelper from './ui/WelcomeHelper'
import axios from 'axios'
import { PREPARATION_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const PreparationHubEnhanced = () => {
    const [resources, setResources] = useState([])
    const [filteredResources, setFilteredResources] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [bookmarkedResources, setBookmarkedResources] = useState(new Set())
    const [loading, setLoading] = useState(true)
    const [activeCard, setActiveCard] = useState(null)
    const { user } = useSelector(store => store.auth)

    const categories = [
        { 
            name: 'All', 
            icon: Sparkles, 
            color: 'from-purple-500 to-pink-500',
            description: 'Everything you need'
        },
        { 
            name: 'Aptitude', 
            icon: Brain, 
            color: 'from-blue-500 to-cyan-500',
            description: 'Logic & reasoning'
        },
        { 
            name: 'Coding & DSA', 
            icon: Code, 
            color: 'from-green-500 to-emerald-500',
            description: 'Programming skills'
        },
        { 
            name: 'Mock Interviews', 
            icon: Users, 
            color: 'from-orange-500 to-red-500',
            description: 'Practice sessions'
        },
        { 
            name: 'Communication Skills', 
            icon: Target, 
            color: 'from-indigo-500 to-purple-500',
            description: 'Express yourself'
        },
        { 
            name: 'Company Specific', 
            icon: Award, 
            color: 'from-pink-500 to-rose-500',
            description: 'Targeted prep'
        },
        { 
            name: 'Career Growth', 
            icon: TrendingUp, 
            color: 'from-yellow-500 to-orange-500',
            description: 'Future planning'
        }
    ]

    const motivationalQuotes = [
        "🚀 Every expert was once a beginner. Keep going!",
        "💪 Success is the sum of small efforts repeated day in and day out.",
        "🌟 The future belongs to those who prepare for it today.",
        "🔥 Your only limit is your mind. Push beyond it!",
        "✨ Great things never come from comfort zones."
    ]

    const [currentQuote, setCurrentQuote] = useState(0)

    useEffect(() => {
        fetchResources()
        const quoteInterval = setInterval(() => {
            setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length)
        }, 4000)
        return () => clearInterval(quoteInterval)
    }, [])

    useEffect(() => {
        filterResources()
    }, [selectedCategory, searchTerm, resources])

    const fetchResources = async () => {
        try {
            const response = await axios.get(`${PREPARATION_API_END_POINT}/resources`, {
                withCredentials: true
            })
            setResources(response.data.resources)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching resources:', error)
            toast.error('Failed to load resources')
            setLoading(false)
        }
    }

    const filterResources = () => {
        let filtered = resources
        
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(resource => resource.category === selectedCategory)
        }
        
        if (searchTerm) {
            filtered = filtered.filter(resource =>
                resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        }
        
        setFilteredResources(filtered)
    }

    const toggleBookmark = async (resourceId) => {
        try {
            const isBookmarked = bookmarkedResources.has(resourceId)
            
            if (isBookmarked) {
                await axios.delete(`${PREPARATION_API_END_POINT}/bookmarks/${resourceId}`, {
                    withCredentials: true
                })
                setBookmarkedResources(prev => {
                    const newSet = new Set(prev)
                    newSet.delete(resourceId)
                    return newSet
                })
                toast.success('Bookmark removed')
            } else {
                await axios.post(`${PREPARATION_API_END_POINT}/bookmarks/${resourceId}`, {}, {
                    withCredentials: true
                })
                setBookmarkedResources(prev => new Set(prev).add(resourceId))
                toast.success('Bookmark added')
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error)
            toast.error('Failed to update bookmark')
        }
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'bg-green-100 text-green-800 border-green-200'
            case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'Advanced': return 'bg-red-100 text-red-800 border-red-200'
            default: return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <Navbar />
                <div className="flex items-center justify-center min-h-[80vh]">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <Navbar />
            
            {/* Hero Section with 3D Background */}
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
            >
                {/* 3D Background */}
                <div className="absolute inset-0 opacity-20">
                    <Scene3D variant="brain" />
                </div>
                
                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                            Your Journey to
                            <br />
                            <span className="inline-flex items-center gap-4">
                                Success Starts Here
                                <Sparkles className="w-12 h-12 text-yellow-500 animate-pulse" />
                            </span>
                        </h1>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                        >
                            {motivationalQuotes[currentQuote]}
                        </motion.p>
                        
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
                        >
                            <Button 
                                size="lg" 
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                <Zap className="w-6 h-6 mr-2" />
                                Start Your Preparation
                                <ArrowRight className="w-6 h-6 ml-2" />
                            </Button>
                            
                            <Button 
                                variant="outline" 
                                size="lg"
                                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold"
                            >
                                <Play className="w-6 h-6 mr-2" />
                                Watch Demo
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-30" />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Search and Filter Section */}
            <motion.section 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12"
            >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        {/* Search */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder="Search resources, topics, or skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-purple-500 bg-white/50"
                            />
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="flex gap-6 text-center">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="text-center"
                            >
                                <div className="text-2xl font-bold text-purple-600">{resources.length}</div>
                                <div className="text-sm text-gray-600">Resources</div>
                            </motion.div>
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="text-center"
                            >
                                <div className="text-2xl font-bold text-blue-600">{categories.length - 1}</div>
                                <div className="text-sm text-gray-600">Categories</div>
                            </motion.div>
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="text-center"
                            >
                                <div className="text-2xl font-bold text-emerald-600">{bookmarkedResources.size}</div>
                                <div className="text-sm text-gray-600">Bookmarked</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Categories Section */}
            <motion.section 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8"
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                    {categories.map((category) => {
                        const IconComponent = category.icon
                        const isActive = selectedCategory === category.name
                        
                        return (
                            <motion.div
                                key={category.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant={isActive ? "default" : "outline"}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`w-full h-auto p-6 rounded-2xl border-2 transition-all duration-300 ${
                                        isActive 
                                            ? `bg-gradient-to-br ${category.color} text-white shadow-xl border-transparent` 
                                            : 'bg-white/80 backdrop-blur-sm hover:bg-gray-50 border-gray-200 text-gray-700'
                                    }`}
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <IconComponent className={`w-8 h-8 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                                        <div className="text-center">
                                            <div className="font-semibold text-sm">{category.name}</div>
                                            <div className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                                                {category.description}
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                            </motion.div>
                        )
                    })}
                </div>
            </motion.section>

            {/* Resources Grid */}
            <motion.section 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8"
            >
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={selectedCategory + searchTerm}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredResources.map((resource, index) => (
                            <motion.div
                                key={resource._id}
                                variants={itemVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                onHoverStart={() => setActiveCard(resource._id)}
                                onHoverEnd={() => setActiveCard(null)}
                                className="group"
                            >
                                <Card className="h-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                    <CardHeader className="relative p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <Badge 
                                                className={`${getDifficultyColor(resource.difficulty)} px-3 py-1 rounded-full font-medium`}
                                            >
                                                {resource.difficulty}
                                            </Badge>
                                            <motion.button
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => toggleBookmark(resource._id)}
                                                className={`p-2 rounded-full transition-colors ${
                                                    bookmarkedResources.has(resource._id)
                                                        ? 'bg-red-100 text-red-500'
                                                        : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'
                                                }`}
                                            >
                                                <Heart className={`w-5 h-5 ${bookmarkedResources.has(resource._id) ? 'fill-current' : ''}`} />
                                            </motion.button>
                                        </div>
                                        
                                        <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                            {resource.title}
                                        </CardTitle>
                                        
                                        <CardDescription className="text-gray-600 leading-relaxed">
                                            {resource.description}
                                        </CardDescription>
                                    </CardHeader>
                                    
                                    <CardContent className="p-6 pt-0">
                                        <div className="space-y-4">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                                                    <Badge 
                                                        key={tagIndex}
                                                        variant="secondary" 
                                                        className="bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors rounded-full px-3 py-1"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                                {resource.tags.length > 3 && (
                                                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 rounded-full px-3 py-1">
                                                        +{resource.tags.length - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                            
                                            {/* Meta Info */}
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{resource.estimatedTime} mins</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Star className="w-4 h-4 text-yellow-500" />
                                                    <span>{resource.rating || '4.5'}</span>
                                                </div>
                                            </div>
                                            
                                            {/* Action Button */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: activeCard === resource._id ? 1 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Button 
                                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                                                    onClick={() => {
                                                        if (resource.url) {
                                                            window.open(resource.url, '_blank')
                                                        } else {
                                                            console.error('No URL found for resource:', resource)
                                                            toast.error('Sorry, no link available for this resource')
                                                        }
                                                    }}
                                                >
                                                    <Lightbulb className="w-5 h-5 mr-2" />
                                                    Start Learning
                                                    <ArrowRight className="w-5 h-5 ml-2" />
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
                
                {filteredResources.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 mx-auto mb-6">
                            <Scene3D variant="particles" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No resources found</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search or select a different category</p>
                        <Button 
                            onClick={() => {
                                setSearchTerm('')
                                setSelectedCategory('All')
                            }}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        >
                            <ArrowRight className="w-5 h-5 mr-2" />
                            View All Resources
                        </Button>
                    </motion.div>
                )}
            </motion.section>
            
            {/* Call to Action */}
            <motion.section 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16"
            >
                <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-600 border-0 rounded-3xl shadow-2xl overflow-hidden">
                    <CardContent className="p-12 text-center text-white relative">
                        <div className="absolute inset-0 opacity-10">
                            <Scene3D variant="books" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-4">Ready to Excel in Your Career?</h2>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                Join thousands of students who have transformed their careers with our preparation resources
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button 
                                    size="lg" 
                                    className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                                >
                                    <CheckCircle className="w-6 h-6 mr-2" />
                                    Track Your Progress
                                </Button>
                                <Button 
                                    size="lg" 
                                    variant="outline" 
                                    className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 text-lg"
                                >
                                    <Users className="w-6 h-6 mr-2" />
                                    Join Community
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.section>
            
            {/* Enhancement Toggle */}
            <EnhancementToggle />
            
            {/* Welcome Helper */}
            <WelcomeHelper />
        </div>
    )
}

export default PreparationHubEnhanced
