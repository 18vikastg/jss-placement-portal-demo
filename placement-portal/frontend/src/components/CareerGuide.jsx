import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './shared/NavbarNew';
import { 
    ArrowLeft, 
    Target, 
    TrendingUp, 
    Briefcase,
    DollarSign,
    BookOpen,
    Users,
    Lightbulb,
    Loader2,
    ExternalLink,
    CheckCircle2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { toast } from 'sonner';

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8001';

const CareerGuide = () => {
    const [careerRole, setCareerRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [careerGuide, setCareerGuide] = useState(null);
    const [serviceAvailable, setServiceAvailable] = useState(true);

    const suggestedRoles = [
        { name: 'Full-Stack Developer', trend: '🔥', growth: '+25%' },
        { name: 'Data Scientist', trend: '🔥', growth: '+35%' },
        { name: 'AI/ML Engineer', trend: '🔥', growth: '+40%' },
        { name: 'Cybersecurity Analyst', trend: '⚡', growth: '+20%' },
        { name: 'DevOps Engineer', trend: '⚡', growth: '+30%' },
        { name: 'Cloud Architect', trend: '🚀', growth: '+28%' }
    ];

    const handleGenerateGuide = async () => {
        if (!careerRole.trim()) {
            toast.error('Please enter a career role');
            return;
        }

        setIsLoading(true);
        setCareerGuide(null);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/career-guide/generate`, {
                careerRole
            });

            if (response.data.success) {
                setCareerGuide(response.data.data);
                setServiceAvailable(true);
                toast.success('Career guide generated successfully!');
            } else {
                toast.error(response.data.message || 'Failed to generate career guide');
            }
        } catch (error) {
            console.error('Career guide error:', error);
            if (error.response?.status === 503) {
                setServiceAvailable(false);
                toast.error('Career Guide service is currently unavailable. Starting it...');
                toast.info('Please start the AI Career Coach service on port 3001');
            } else {
                toast.error('Failed to generate career guide');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link to="/student/dashboard">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                AI Career Guide & Roadmaps
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Get personalized career guidance powered by AI
                            </p>
                        </div>
                    </div>
                </motion.div>

                {!serviceAvailable && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="border-orange-200 bg-orange-50 mb-6">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <ExternalLink className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-orange-900 mb-2">
                                            Service Not Running
                                        </h3>
                                        <p className="text-orange-800 text-sm mb-3">
                                            The AI Career Coach service needs to be started. Please run:
                                        </p>
                                        <code className="block bg-orange-100 p-3 rounded text-sm text-orange-900 font-mono mb-3">
                                            cd ai-career-coach && npm run dev
                                        </code>
                                        <p className="text-orange-800 text-sm">
                                            The service will start on port 3001. Once running, refresh this page.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {!careerGuide ? (
                    <>
                        {/* Input Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="border-2 border-indigo-100 shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-2xl">What career path are you interested in?</CardTitle>
                                    <CardDescription>
                                        Enter any role or domain to get a comprehensive career guide with roadmap
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex gap-2">
                                        <Input
                                            type="text"
                                            placeholder="e.g., Full-Stack Developer, Data Scientist, AI Engineer..."
                                            value={careerRole}
                                            onChange={(e) => setCareerRole(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleGenerateGuide()}
                                            className="flex-1 h-12 text-lg"
                                            disabled={isLoading}
                                        />
                                        <Button 
                                            onClick={handleGenerateGuide}
                                            disabled={isLoading || !careerRole.trim()}
                                            className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    Generate Guide
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {/* Suggested Roles */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-3">
                                            🔥 Trending Career Paths
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {suggestedRoles.map((role, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="px-4 py-2 cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                                                    onClick={() => setCareerRole(role.name)}
                                                >
                                                    <span className="mr-2">{role.trend}</span>
                                                    {role.name}
                                                    <span className="ml-2 text-green-600 text-xs">{role.growth}</span>
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Features Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
                        >
                            {[
                                {
                                    icon: Target,
                                    title: 'Personalized Roadmap',
                                    description: '4-phase learning path from beginner to expert'
                                },
                                {
                                    icon: TrendingUp,
                                    title: 'Market Insights',
                                    description: 'Salary ranges, demand, and growth outlook'
                                },
                                {
                                    icon: Briefcase,
                                    title: 'Job Responsibilities',
                                    description: 'Clear breakdown of role expectations'
                                },
                                {
                                    icon: DollarSign,
                                    title: 'Salary Information',
                                    description: 'Global and India-specific compensation data'
                                },
                                {
                                    icon: BookOpen,
                                    title: 'Learning Resources',
                                    description: 'Curated courses, books, and practice platforms'
                                },
                                {
                                    icon: Users,
                                    title: 'Career Opportunities',
                                    description: 'Diverse paths and specializations'
                                }
                            ].map((feature, index) => (
                                <Card key={index} className="border-2 hover:border-indigo-200 transition-colors">
                                    <CardContent className="p-6">
                                        <feature.icon className="w-10 h-10 text-indigo-600 mb-3" />
                                        <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                        <p className="text-gray-600 text-sm">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    </>
                ) : (
                    // Career Guide Results
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {/* Title */}
                        <Card className="border-2 border-indigo-200">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-3xl">{careerGuide.data?.title || 'Career Guide'}</CardTitle>
                                    <Button onClick={() => { setCareerGuide(null); setCareerRole(''); }}>
                                        Generate Another
                                    </Button>
                                </div>
                                <CardDescription className="text-base mt-2">
                                    {careerGuide.data?.introduction}
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Responsibilities */}
                        {careerGuide.data?.responsibilities && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Briefcase className="w-6 h-6 text-indigo-600" />
                                        Key Responsibilities
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {careerGuide.data.responsibilities.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}

                        {/* Salary & Market Info */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {careerGuide.data?.salaryRange && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <DollarSign className="w-6 h-6 text-green-600" />
                                            Salary Range
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-lg font-semibold">{careerGuide.data.salaryRange}</p>
                                    </CardContent>
                                </Card>
                            )}
                            
                            {careerGuide.data?.marketDemand && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <TrendingUp className="w-6 h-6 text-blue-600" />
                                            Market Demand
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{careerGuide.data.marketDemand}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Learning Roadmap */}
                        {careerGuide.data?.roadmap && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="w-6 h-6 text-indigo-600" />
                                        Learning Roadmap
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {careerGuide.data.roadmap.map((phase, index) => (
                                            <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-semibold text-lg">{phase.title}</h4>
                                                    <Badge variant="secondary">{phase.duration}</Badge>
                                                </div>
                                                <p className="text-gray-600 mb-3">{phase.description}</p>
                                                {phase.skills && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {phase.skills.map((skill, idx) => (
                                                            <Badge key={idx} variant="outline">{skill}</Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CareerGuide;
