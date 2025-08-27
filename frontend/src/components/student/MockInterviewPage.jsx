import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../shared/NavbarNew'
import { useSelector } from 'react-redux'
import { 
    Mic, 
    Brain, 
    Target, 
    BarChart3, 
    Users, 
    Star, 
    ArrowRight, 
    Play, 
    CheckCircle, 
    Zap,
    Database,
    Monitor,
    MessageSquare,
    Award,
    User,
    Settings,
    Eye,
    ExternalLink
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { toast } from 'sonner'
import axios from 'axios'

const MockInterviewPage = () => {
    const { user } = useSelector(store => store.auth)
    const [hasLoggedAccess, setHasLoggedAccess] = useState(false)

    // Log page access when component mounts
    useEffect(() => {
        if (user && !hasLoggedAccess) {
            logPageAccess()
            setHasLoggedAccess(true)
        }
    }, [user, hasLoggedAccess])

    const logPageAccess = async () => {
        try {
            await axios.post('/api/v1/student/mock-interview/log', {
                action: 'page_access'
            }, { withCredentials: true })
        } catch (error) {
            console.log('Failed to log page access:', error)
        }
    }

    const handleStartInterview = async () => {
        try {
            // Log the "Start Interview" click
            await axios.post('/api/v1/student/mock-interview/log', {
                action: 'start_interview_clicked'
            }, { withCredentials: true })
            
            // Open the external app
            window.open('https://ai-mock-interview-qx7g.vercel.app/', '_blank')
            toast.success('Opening AI Mock Interview Platform...')
        } catch (error) {
            console.log('Failed to log start interview:', error)
            // Still open the app even if logging fails
            window.open('https://ai-mock-interview-qx7g.vercel.app/', '_blank')
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    }

    const features = [
        {
            icon: Brain,
            title: "AI-Driven Smart Questions",
            description: "Dynamic question generation based on your role, experience level, and industry focus",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: MessageSquare,
            title: "Real-time Feedback",
            description: "Instant analysis of your responses with actionable improvement suggestions",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Target,
            title: "Role-based Customization",
            description: "Tailored interview scenarios for different job positions and seniority levels",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: BarChart3,
            title: "Performance Analytics",
            description: "Comprehensive reports with scoring, trends, and areas for improvement",
            color: "from-orange-500 to-red-500"
        }
    ]

    const techStack = [
        { name: "Next.js", color: "bg-black text-white" },
        { name: "React", color: "bg-blue-500 text-white" },
        { name: "TypeScript", color: "bg-blue-600 text-white" },
        { name: "Tailwind CSS", color: "bg-teal-500 text-white" },
        { name: "Gemini AI", color: "bg-purple-600 text-white" },
        { name: "PostgreSQL", color: "bg-blue-700 text-white" },
        { name: "Vercel", color: "bg-black text-white" },
        { name: "Clerk Auth", color: "bg-indigo-600 text-white" }
    ]

    const usageSteps = [
        {
            step: 1,
            title: "Create Profile",
            description: "Set up your profile with career goals and target roles",
            icon: User
        },
        {
            step: 2,
            title: "Choose Interview Type",
            description: "Select from technical, behavioral, or mixed interview formats",
            icon: Settings
        },
        {
            step: 3,
            title: "Practice Session",
            description: "Engage with AI interviewer and answer questions naturally",
            icon: Play
        },
        {
            step: 4,
            title: "Review Performance",
            description: "Analyze feedback, scores, and improvement recommendations",
            icon: Eye
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navbar />
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                                <Mic className="w-10 h-10 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
                        AI-Powered Mock Interview
                    </h1>
                    
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Transform your interview skills with cutting-edge AI technology. Get personalized feedback, 
                        practice with realistic scenarios, and land your dream job with confidence.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 text-sm font-medium">
                            <Brain className="w-4 h-4 mr-2" />
                            AI-Powered
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium">
                            <Target className="w-4 h-4 mr-2" />
                            Role-Specific
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-medium">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Analytics
                        </Badge>
                    </div>
                </motion.div>

                {/* Key Features */}
                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                        Powerful Features for Interview Success
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group"
                            >
                                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                                    <CardHeader className="text-center pb-4">
                                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <CardTitle className="text-lg font-semibold text-gray-900">
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 text-center leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* System Architecture */}
                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                        System Architecture
                    </h2>
                    
                    <div className="bg-gradient-to-r from-slate-100 to-gray-100 rounded-3xl p-8 shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                    <Monitor className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                                <p className="text-gray-600">Next.js + React + TypeScript</p>
                                <p className="text-sm text-gray-500">Responsive UI with Tailwind CSS</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <Brain className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">AI Engine</h3>
                                <p className="text-gray-600">Google Gemini AI</p>
                                <p className="text-sm text-gray-500">Natural language processing</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                    <Database className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Database</h3>
                                <p className="text-gray-600">PostgreSQL</p>
                                <p className="text-sm text-gray-500">Secure data storage</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                        Built with Modern Technology
                    </h2>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Badge className={`${tech.color} px-6 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300`}>
                                    {tech.name}
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Usage Instructions */}
                <motion.div variants={itemVariants} className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                        How to Get Started
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {usageSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative"
                            >
                                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                                    <CardHeader className="text-center pb-4">
                                        <div className="relative mb-4">
                                            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                                <step.icon className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                {step.step}
                                            </div>
                                        </div>
                                        <CardTitle className="text-lg font-semibold text-gray-900">
                                            {step.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 text-center leading-relaxed">
                                            {step.description}
                                        </p>
                                    </CardContent>
                                </Card>
                                
                                {/* Arrow for desktop */}
                                {index < usageSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <ArrowRight className="w-8 h-8 text-gray-400" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div 
                    variants={itemVariants}
                    className="text-center bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-3xl p-12 shadow-2xl"
                >
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Ace Your Next Interview?
                        </h2>
                        
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Join thousands of students who have improved their interview skills with our AI-powered platform. 
                            Start practicing today and boost your confidence!
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                onClick={handleStartInterview}
                                size="lg"
                                className="bg-white text-emerald-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                            >
                                <Mic className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                                🚀 Start Interview
                                <ExternalLink className="w-5 h-5 ml-3" />
                            </Button>
                            
                            <div className="flex items-center text-white/80 text-sm">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Free to use • No credit card required
                            </div>
                        </div>
                        
                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/70 text-sm">
                            <div className="flex items-center">
                                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                                4.8/5 Average Rating
                            </div>
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2" />
                                10,000+ Students Practiced
                            </div>
                            <div className="flex items-center">
                                <Award className="w-4 h-4 mr-2" />
                                95% Success Rate
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Student Info */}
                {user && (
                    <motion.div variants={itemVariants} className="mt-12">
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Welcome, {user.fullname}!</h3>
                                        <p className="text-gray-600">Ready to practice and improve your interview skills?</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}

export default MockInterviewPage
