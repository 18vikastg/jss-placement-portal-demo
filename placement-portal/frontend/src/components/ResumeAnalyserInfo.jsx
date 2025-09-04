import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from './shared/NavbarNew'
import { 
    ArrowLeft, 
    FileText, 
    Brain, 
    Target, 
    TrendingUp,
    Zap,
    Award,
    ExternalLink,
    Play,
    Sparkles
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

const ResumeAnalyserInfo = () => {
    const [isAnalyserStarting, setIsAnalyserStarting] = useState(false)

    const startAnalysis = () => {
        setIsAnalyserStarting(true)
        // Open the AI Resume Analyser in a new tab
        window.open('http://localhost:5001', '_blank')
        // Reset the loading state after a short delay
        setTimeout(() => setIsAnalyserStarting(false), 2000)
    }

    const features = [
        {
            icon: Brain,
            title: "AI-Powered Analysis",
            description: "Advanced machine learning algorithms analyze your resume comprehensively"
        },
        {
            icon: Target,
            title: "Skill Gap Detection",
            description: "Identifies missing skills and suggests improvements for your target roles"
        },
        {
            icon: TrendingUp,
            title: "ATS Optimization",
            description: "Ensures your resume passes Applicant Tracking Systems with high scores"
        },
        {
            icon: Award,
            title: "Industry Standards",
            description: "Compares your resume against current industry standards and best practices"
        },
        {
            icon: Sparkles,
            title: "Personalized Recommendations",
            description: "Get tailored suggestions to make your resume stand out to recruiters"
        },
        {
            icon: FileText,
            title: "Format Analysis",
            description: "Analyzes layout, structure, and readability for maximum impact"
        }
    ]

    const benefits = [
        "🎯 Increase your chances of getting shortlisted by 40%",
        "⚡ Get instant feedback in under 30 seconds",
        "📊 Detailed scoring with improvement areas",
        "🔍 Keyword optimization for job applications",
        "📈 Track your resume improvement over time",
        "🏆 Compare with industry benchmarks"
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
            <Navbar />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
                {/* Back Button */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <Link to="/student/dashboard">
                        <Button variant="outline" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </motion.div>

                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mb-6">
                        <Brain className="w-10 h-10 text-white" />
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
                        AI Resume Analyser
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                        Get your resume analyzed by cutting-edge AI technology. Receive personalized recommendations 
                        to boost your chances of landing your dream job at JSS Academy of Technical Education.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <Badge className="px-4 py-2 bg-red-100 text-red-700 border-red-200">
                            ✨ AI-Powered
                        </Badge>
                        <Badge className="px-4 py-2 bg-orange-100 text-orange-700 border-orange-200">
                            ⚡ Instant Results
                        </Badge>
                        <Badge className="px-4 py-2 bg-green-100 text-green-700 border-green-200">
                            🔒 Completely Free
                        </Badge>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button 
                            onClick={startAnalysis}
                            disabled={isAnalyserStarting}
                            size="lg"
                            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                        >
                            {isAnalyserStarting ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                    />
                                    Starting Analysis...
                                </>
                            ) : (
                                <>
                                    <Play className="w-6 h-6 mr-2" />
                                    Start Analysis
                                    <ExternalLink className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Benefits Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-lg">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                                Why Choose Our AI Resume Analyser?
                            </CardTitle>
                            <CardDescription className="text-lg">
                                Transform your resume into a job-winning document
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100"
                                    >
                                        <div className="text-2xl">{benefit.split(' ')[0]}</div>
                                        <div className="font-medium text-gray-700">{benefit.substring(2)}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Features Grid */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-12"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features</h2>
                        <p className="text-gray-600 text-lg">Advanced AI technology working for your career success</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="group"
                            >
                                <Card className="h-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                                    <CardHeader className="pb-4">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 mb-4 group-hover:scale-110 transition-transform">
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <CardTitle className="text-lg font-semibold text-gray-800">
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* How It Works */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-12"
                >
                    <Card className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-3xl shadow-xl">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-2xl font-bold mb-2">How It Works</CardTitle>
                            <CardDescription className="text-red-100 text-lg">
                                Simple 3-step process to analyze your resume
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { number: "1", title: "Upload", desc: "Upload your resume in PDF format" },
                                    { number: "2", title: "Analyze", desc: "AI processes and analyzes your content" },
                                    { number: "3", title: "Improve", desc: "Get actionable insights and recommendations" }
                                ].map((step, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 + index * 0.2 }}
                                        className="text-center"
                                    >
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm text-2xl font-bold mb-4">
                                            {step.number}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                        <p className="text-red-100">{step.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-center"
                >
                    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-lg p-8">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Boost Your Resume?</h2>
                            <p className="text-xl text-gray-600 mb-6">
                                Join thousands of JSS students who have improved their resumes with our AI technology
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button 
                                    onClick={startAnalysis}
                                    disabled={isAnalyserStarting}
                                    size="lg"
                                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                                >
                                    {isAnalyserStarting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                            />
                                            Starting Analysis...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-6 h-6 mr-2" />
                                            Start AI Analysis Now
                                            <ExternalLink className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                            
                            <Link to="/student/dashboard">
                                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default ResumeAnalyserInfo
