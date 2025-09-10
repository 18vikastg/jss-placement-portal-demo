import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
    User, 
    Eye, 
    Edit,
    Plus,
    TrendingUp,
    Award,
    Target
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import LinkFolioBuilder from './LinkFolioBuilder';
import LinkFolioPortfolio from './LinkFolioPortfolio';

const LinkFolioMain = ({ onClose }) => {
    const { user } = useSelector(store => store.auth);
    const [currentView, setCurrentView] = useState('main'); // 'main', 'builder', 'portfolio'
    const [profileData, setProfileData] = useState(null);
    const [hasProfile, setHasProfile] = useState(false);

    // Load profile data on component mount
    useEffect(() => {
        const saved = localStorage.getItem('linkfolio-profile');
        if (saved) {
            const data = JSON.parse(saved);
            setProfileData(data);
            setHasProfile(checkIfProfileExists(data));
        }
    }, []);

    const checkIfProfileExists = (data) => {
        if (!data) return false;
        return data.fullName && data.email && data.phone && data.objective;
    };

    const getProfileCompletionPercentage = () => {
        if (!profileData) return 0;
        
        let completed = 0;
        let total = 0;

        // Personal info (5 fields)
        const personalFields = ['fullName', 'email', 'phone', 'location', 'objective'];
        personalFields.forEach(field => {
            total++;
            if (profileData[field]) completed++;
        });

        // Education (at least one entry with basic info)
        total++;
        if (profileData.education?.[0]?.institution && profileData.education[0]?.degree) completed++;

        // Experience (optional but adds value)
        total++;
        if (profileData.experience?.[0]?.company && profileData.experience[0]?.position) completed++;

        // Projects (at least one)
        total++;
        if (profileData.projects?.[0]?.title && profileData.projects[0]?.description) completed++;

        // Skills
        total++;
        if (profileData.skills?.length > 0) completed++;

        return Math.round((completed / total) * 100);
    };

    const getProfileStats = () => {
        if (!profileData) return { education: 0, experience: 0, projects: 0, skills: 0 };
        
        return {
            education: profileData.education?.filter(edu => edu.institution).length || 0,
            experience: profileData.experience?.filter(exp => exp.company).length || 0,
            projects: profileData.projects?.filter(proj => proj.title).length || 0,
            skills: profileData.skills?.length || 0
        };
    };

    const handleBuilderClose = () => {
        // Reload profile data after builder closes
        const saved = localStorage.getItem('linkfolio-profile');
        if (saved) {
            const data = JSON.parse(saved);
            setProfileData(data);
            setHasProfile(checkIfProfileExists(data));
        }
        setCurrentView('main');
    };

    if (currentView === 'builder') {
        return <LinkFolioBuilder onClose={handleBuilderClose} />;
    }

    if (currentView === 'portfolio' && profileData) {
        return (
            <LinkFolioPortfolio 
                profileData={profileData}
                onEdit={() => setCurrentView('builder')}
                onClose={() => setCurrentView('main')}
            />
        );
    }

    const stats = getProfileStats();
    const completionPercentage = getProfileCompletionPercentage();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">LinkFolio</h2>
                            <p className="text-red-100">Professional Portfolio Builder for JSS Students</p>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="text-white hover:bg-red-600"
                        >
                            ✕
                        </Button>
                    </div>
                </div>

                <div className="p-6">
                    {!hasProfile ? (
                        // Welcome Screen for New Users
                        <div className="text-center space-y-6">
                            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                                <User className="w-12 h-12 text-red-600" />
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Welcome to LinkFolio, {user?.fullname}!
                                </h3>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Create a stunning professional portfolio that showcases your skills, projects, and achievements. 
                                    Stand out to recruiters and build your professional network with JSS alumni.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                                <Card className="text-center p-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <User className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h4 className="font-semibold mb-2">Professional Profile</h4>
                                    <p className="text-sm text-gray-600">Complete your professional information and showcase your achievements</p>
                                </Card>

                                <Card className="text-center p-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold mb-2">Project Showcase</h4>
                                    <p className="text-sm text-gray-600">Display your projects with live demos and GitHub links</p>
                                </Card>

                                <Card className="text-center p-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <Award className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h4 className="font-semibold mb-2">Alumni Network</h4>
                                    <p className="text-sm text-gray-600">Connect with JSS alumni and expand your professional network</p>
                                </Card>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    onClick={() => setCurrentView('builder')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Create My Portfolio
                                </Button>
                                <p className="text-sm text-gray-500">
                                    Takes about 5-10 minutes to complete
                                </p>
                            </div>
                        </div>
                    ) : (
                        // Dashboard for Existing Users
                        <div className="space-y-6">
                            {/* Profile Overview */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Welcome back, {profileData?.fullName || user?.fullname}!
                                    </h3>
                                    <p className="text-gray-600">Manage your professional portfolio</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-red-600">{completionPercentage}%</div>
                                    <div className="text-sm text-gray-500">Profile Complete</div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-blue-600">{stats.education}</div>
                                        <div className="text-sm text-gray-600">Education</div>
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-green-600">{stats.experience}</div>
                                        <div className="text-sm text-gray-600">Experience</div>
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-purple-600">{stats.projects}</div>
                                        <div className="text-sm text-gray-600">Projects</div>
                                    </CardContent>
                                </Card>
                                
                                <Card>
                                    <CardContent className="p-4 text-center">
                                        <div className="text-2xl font-bold text-orange-600">{stats.skills}</div>
                                        <div className="text-sm text-gray-600">Skills</div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Profile Completion Progress */}
                            {completionPercentage < 100 && (
                                <Card className="border-orange-200 bg-orange-50">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-orange-800">
                                            <Target className="w-5 h-5" />
                                            Complete Your Profile
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span>Profile Completion</span>
                                                <span className="font-medium">{completionPercentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${completionPercentage}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-sm text-orange-700">
                                                Complete your profile to make a stronger impression on recruiters!
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Button
                                    onClick={() => setCurrentView('portfolio')}
                                    className="h-auto p-6 bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <div className="flex items-center gap-4">
                                        <Eye className="w-8 h-8" />
                                        <div className="text-left">
                                            <div className="text-lg font-semibold">View Portfolio</div>
                                            <div className="text-sm opacity-90">See how your portfolio looks to others</div>
                                        </div>
                                    </div>
                                </Button>

                                <Button
                                    onClick={() => setCurrentView('builder')}
                                    variant="outline"
                                    className="h-auto p-6 border-2 border-red-200 hover:bg-red-50"
                                >
                                    <div className="flex items-center gap-4">
                                        <Edit className="w-8 h-8 text-red-600" />
                                        <div className="text-left">
                                            <div className="text-lg font-semibold text-red-600">Edit Portfolio</div>
                                            <div className="text-sm text-red-500">Update your information and projects</div>
                                        </div>
                                    </div>
                                </Button>
                            </div>

                            {/* Recent Skills */}
                            {profileData?.skills?.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Your Skills</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.skills.slice(0, 10).map((skill, index) => (
                                                <Badge key={index} variant="secondary">{skill}</Badge>
                                            ))}
                                            {profileData.skills.length > 10 && (
                                                <Badge variant="outline">+{profileData.skills.length - 10} more</Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LinkFolioMain;
