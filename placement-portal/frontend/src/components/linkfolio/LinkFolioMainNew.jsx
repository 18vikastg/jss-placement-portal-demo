import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    User, 
    Eye, 
    Edit,
    ArrowLeft,
    CheckCircle,
    Star,
    Users,
    MessageCircle,
    UserPlus,
    Sparkles,
    Calendar,
    Mail,
    Bell,
    Briefcase,
    MapPin,
    Phone,
    X,
    Trash2,
    Clock,
    UserCheck,
    CalendarPlus,
    Search,
    CheckCheck,
    Target
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const LinkFolioMainNew = ({ onClose }) => {
    const { user } = useSelector(store => store.auth);
    
    // Main state management - simplified from NewLinkFolio-main
    const [currentPage, setCurrentPage] = useState('home');
    const [currentTab, setCurrentTab] = useState('Portfolio');
    const [profileData, setProfileData] = useState(null);
    const [hasProfile, setHasProfile] = useState(false);
    
    // Profile builder state
    const [skills, setSkills] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [profileForm, setProfileForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        objective: '',
        profilePicture: null
    });
    
    // Alumni network state
    const [alumniData, setAlumniData] = useState([]);
    const [messagesData, setMessagesData] = useState([]);
    const [notificationsData, setNotificationsData] = useState([]);

    // Load saved data on component mount
    const loadSavedProfile = useCallback(() => {
        const saved = localStorage.getItem('linkfolioProfile');
        if (saved) {
            const data = JSON.parse(saved);
            setProfileData(data);
            setHasProfile(checkIfProfileExists(data));
            setSkills(data.skills || []);
            setJobs(data.interestedJobs || []);
            setProfileForm({
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                phone: data.phone || '',
                location: data.location || '',
                objective: data.objective || '',
                profilePicture: data.profilePicture || null
            });
        }
    }, []);

    useEffect(() => {
        loadSavedProfile();
        initializeData();
    }, [loadSavedProfile]);

    const checkIfProfileExists = (data) => {
        if (!data) return false;
        return data.firstName && data.lastName && data.email && data.phone && data.objective;
    };

    const getProfileCompletionPercentage = () => {
        if (!profileData) return 0;
        
        let completed = 0;
        let total = 6; // Basic fields count
        
        const personalFields = ['firstName', 'lastName', 'email', 'phone', 'location', 'objective'];
        personalFields.forEach(field => {
            if (profileData[field]) completed++;
        });

        return Math.round((completed / total) * 100);
    };

    const initializeData = () => {
        // Initialize alumni data - directly from NewLinkFolio-main
        const alumni = [
            {
                id: 1,
                name: "Amit Walia",
                email: "amit.walia@example.com",
                company: "Google",
                position: "Software Engineer",
                graduationYear: 2020,
                skills: ["React", "Node.js", "Python", "Machine Learning"],
                bio: "Passionate software engineer with expertise in web development and AI.",
                status: "available",
                isFeatured: true,
                isFollowing: false,
                lastActive: "2 hours ago"
            },
            {
                id: 2,
                name: "Vivek A.",
                email: "vivek.a@example.com",
                company: "Microsoft",
                position: "Product Manager",
                graduationYear: 2019,
                skills: ["Product Management", "Data Analysis", "Strategy"],
                bio: "Product manager focused on creating user-centric solutions.",
                status: "busy",
                isFeatured: false,
                isFollowing: true,
                lastActive: "1 day ago"
            },
            {
                id: 3,
                name: "Samarth Hegde",
                email: "samarth.hegde@example.com",
                company: "Amazon",
                position: "DevOps Engineer",
                graduationYear: 2021,
                skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
                bio: "DevOps engineer specializing in cloud infrastructure and automation.",
                status: "available",
                isFeatured: true,
                isFollowing: false,
                lastActive: "30 minutes ago"
            },
            {
                id: 4,
                name: "Sanjana M",
                email: "sanjana.m@example.com",
                company: "Flipkart",
                position: "UI/UX Designer",
                graduationYear: 2022,
                skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
                bio: "Creative designer passionate about user experience and interface design.",
                status: "available",
                isFeatured: false,
                isFollowing: true,
                lastActive: "5 minutes ago"
            }
        ];
        setAlumniData(alumni);

        // Initialize messages - directly from NewLinkFolio-main
        const messages = [
            {
                id: 1,
                fromAlumniId: 1,
                fromAlumniName: "Amit Walia",
                fromAlumniCompany: "Google",
                message: "Meet @ 1 PM",
                timestamp: "2025-09-09T15:30:00Z",
                isRead: false,
                type: "meeting"
            },
            {
                id: 2,
                fromAlumniId: 2,
                fromAlumniName: "Vivek A.",
                fromAlumniCompany: "Microsoft",
                message: "Nice Academy",
                timestamp: "2025-09-09T10:15:00Z",
                isRead: true,
                type: "general"
            },
            {
                id: 3,
                fromAlumniId: 3,
                fromAlumniName: "Samarth Hegde",
                fromAlumniCompany: "Amazon",
                message: "Busy...",
                timestamp: "2025-09-08T14:20:00Z",
                isRead: false,
                type: "status"
            },
            {
                id: 4,
                fromAlumniId: 4,
                fromAlumniName: "Sanjana M",
                fromAlumniCompany: "Flipkart",
                message: "Bye :)",
                timestamp: "2025-09-08T09:45:00Z",
                isRead: true,
                type: "general"
            }
        ];
        setMessagesData(messages);

        // Initialize notifications - directly from NewLinkFolio-main
        const notifications = [
            {
                id: 1,
                title: "Link with Abhi@18:30",
                description: "Scheduled meeting reminder",
                timestamp: "2025-09-09T18:30:00Z",
                type: "meeting",
                isRead: false,
                priority: "high"
            },
            {
                id: 2,
                title: "Link with Bhushan@13:30",
                description: "Upcoming meeting reminder",
                timestamp: "2025-09-09T13:30:00Z",
                type: "meeting",
                isRead: false,
                priority: "high"
            },
            {
                id: 3,
                title: "New Alumni Registration",
                description: "5 new alumni joined the network this week",
                timestamp: "2025-09-09T09:00:00Z",
                type: "announcement",
                isRead: true,
                priority: "low"
            }
        ];
        setNotificationsData(notifications);
    };

    // Helper functions
    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    };

    // Main navigation
    const showPage = (pageName) => {
        setCurrentPage(pageName);
        if (pageName === 'portfolio') {
            setCurrentTab('Portfolio');
        }
    };

    // Profile functions
    const addSkill = (skill) => {
        if (skill && !skills.includes(skill)) {
            setSkills([...skills, skill]);
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const addJob = (job) => {
        if (job && !jobs.includes(job)) {
            setJobs([...jobs, job]);
        }
    };

    const removeJob = (jobToRemove) => {
        setJobs(jobs.filter(job => job !== jobToRemove));
    };

    const saveProfile = () => {
        const profileToSave = {
            ...profileForm,
            skills,
            interestedJobs: jobs,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem('linkfolioProfile', JSON.stringify(profileToSave));
        setProfileData(profileToSave);
        setHasProfile(checkIfProfileExists(profileToSave));
        alert('Profile saved successfully!');
        showPage('portfolio');
    };

    // Render Home Page - directly implementing NewLinkFolio-main design
    const renderHomePage = () => (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-32 h-32 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mb-4">
                        <Sparkles className="w-16 h-16 text-white" />
                    </div>
                    <span className="text-lg text-gray-600 font-medium">JSS Academy of Technical Education</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    Welcome to <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">LinkFolio</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Your professional networking platform. Create your account, set up your profile, and showcase your professional portfolio.
                </p>
                <div className="flex justify-center gap-4">
                    <Button 
                        onClick={() => showPage('signup')} 
                        className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg"
                    >
                        Get Started
                    </Button>
                    {hasProfile && (
                        <Button 
                            onClick={() => showPage('portfolio')} 
                            variant="outline"
                            className="px-8 py-4 rounded-lg font-medium text-lg"
                        >
                            View Portfolio
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );

    // Render Signup Page - directly implementing NewLinkFolio-main design
    const renderSignupPage = () => (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Join <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">LinkFolio</span>
                    </h2>
                    <p className="text-gray-600">Create your account and start building your professional network</p>
                </div>

                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your username" 
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Create a password" 
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                />
                            </div>
                            <div className="flex items-center justify-between pt-6">
                                <Button 
                                    onClick={() => showPage('home')} 
                                    variant="outline"
                                    className="px-6 py-3"
                                >
                                    Back
                                </Button>
                                <Button 
                                    onClick={() => showPage('profile')} 
                                    className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white px-6 py-3"
                                >
                                    Create Account
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    // Render Profile Setup Page - directly implementing NewLinkFolio-main design
    const renderProfilePage = () => (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Complete Your <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Profile</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        Tell us about yourself to create an impressive portfolio
                    </p>
                </div>

                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-8">
                        {/* Personal Information */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                                    <input 
                                        type="text" 
                                        value={profileForm.firstName}
                                        onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                                        placeholder="Enter your first name" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                                    <input 
                                        type="text" 
                                        value={profileForm.lastName}
                                        onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                                        placeholder="Enter your last name" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                    <input 
                                        type="email" 
                                        value={profileForm.email}
                                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                                        placeholder="Enter your email" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                    <input 
                                        type="tel" 
                                        value={profileForm.phone}
                                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                                        placeholder="Enter your phone number" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                                    <input 
                                        type="text" 
                                        value={profileForm.location}
                                        onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                                        placeholder="Enter your location" 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Career Objective *</label>
                                    <textarea 
                                        rows="4" 
                                        value={profileForm.objective}
                                        onChange={(e) => setProfileForm({...profileForm, objective: e.target.value})}
                                        placeholder="Describe your career goals and aspirations..." 
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none bg-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Skills</h3>
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Enter a skill and press Enter" 
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addSkill(e.target.value.trim());
                                            e.target.value = '';
                                        }
                                    }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {skills.map(skill => (
                                    <span key={skill} className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                                        {skill}
                                        <button onClick={() => removeSkill(skill)} className="text-red-500 hover:text-red-700">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Interested Jobs Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Interested Jobs</h3>
                            <div className="mb-4">
                                <input 
                                    type="text" 
                                    placeholder="Enter a job title and press Enter" 
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addJob(e.target.value.trim());
                                            e.target.value = '';
                                        }
                                    }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {jobs.map(job => (
                                    <span key={job} className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                                        {job}
                                        <button onClick={() => removeJob(job)} className="text-red-500 hover:text-red-700">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                            <Button onClick={() => showPage('signup')} variant="outline">
                                Previous
                            </Button>
                            <div className="flex gap-3">
                                <Button 
                                    onClick={() => showPage('portfolio')} 
                                    variant="outline"
                                >
                                    Complete Later
                                </Button>
                                <Button 
                                    onClick={saveProfile} 
                                    className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white"
                                >
                                    Complete Profile
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    // Render Portfolio Page with Sidebar - directly implementing NewLinkFolio-main design
    const renderPortfolioPage = () => (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 sticky top-0 h-screen">
                <div className="p-4">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">LinkFolio</h2>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { name: 'Portfolio', icon: User },
                            { name: 'Edit Portfolio', icon: Edit },
                            { name: 'AlumniLink', icon: Users },
                            { name: 'Messaging', icon: MessageCircle },
                            { name: 'Notification', icon: Bell }
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.name}
                                    onClick={() => setCurrentTab(tab.name)}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                                        currentTab === tab.name
                                            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-red-700'
                                    }`}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    <span className="font-medium">{tab.name}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
                {currentTab === 'Portfolio' && renderPortfolioContent()}
                {currentTab === 'AlumniLink' && renderAlumniLinkContent()}
                {currentTab === 'Messaging' && renderMessagingContent()}
                {currentTab === 'Notification' && renderNotificationContent()}
                {currentTab === 'Edit Portfolio' && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="text-center py-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Portfolio</h2>
                            <p className="text-gray-600 mb-6">Portfolio editing features coming soon!</p>
                            <Button onClick={() => showPage('profile')} className="bg-gradient-to-r from-red-700 to-red-900 text-white">
                                Go to Profile Setup
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    // Render Portfolio Content - directly implementing NewLinkFolio-main design
    const renderPortfolioContent = () => {
        if (!hasProfile) {
            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <User className="w-12 h-12 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Profile Found</h2>
                        <p className="text-gray-600 text-lg mb-6">
                            Please complete your profile setup to view your portfolio.
                        </p>
                        <Button 
                            onClick={() => showPage('profile')} 
                            className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white"
                        >
                            Setup Profile
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-8">
                    <CardContent className="p-12">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
                                    {profileData?.firstName}
                                    <span className="block bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent">
                                        {profileData?.lastName}
                                    </span>
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-gray-600 text-lg">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5" />
                                        <span>{profileData?.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5" />
                                        <span>{profileData?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5" />
                                        <span>{profileData?.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-12">
                                <div className="w-48 h-48 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-red-200 shadow-lg">
                                    {profileData?.profilePicture ? (
                                        <img src={profileData.profilePicture} className="w-48 h-48 rounded-full object-cover" alt="Profile" />
                                    ) : (
                                        <span className="text-6xl font-bold text-red-700">
                                            {profileData?.firstName?.[0]}{profileData?.lastName?.[0]}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Objective Section */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-8">
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Objective</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {profileData?.objective}
                        </p>
                    </CardContent>
                </Card>

                {/* Skills and Jobs Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Skills Section */}
                    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Star className="w-6 h-6 text-red-600" />
                                <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {profileData?.skills?.length > 0 ? (
                                    profileData.skills.map(skill => (
                                        <span key={skill} className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No skills added yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Interested Jobs Section */}
                    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Briefcase className="w-6 h-6 text-red-600" />
                                <h2 className="text-xl font-bold text-gray-900">Interested Jobs</h2>
                            </div>
                            <div className="space-y-3">
                                {profileData?.interestedJobs?.length > 0 ? (
                                    profileData.interestedJobs.map(job => (
                                        <div key={job} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-all duration-300">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            <span className="font-medium text-gray-700">{job}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No job interests added yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    };

    // Alumni Link Content - simplified from NewLinkFolio-main
    const renderAlumniLinkContent = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-6">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">AlumniLink</h1>
                            <p className="text-gray-600">Connect with JSSATE alumni and expand your professional network</p>
                        </div>
                    </div>

                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search alumni by name, company, or skills..." 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {alumniData.map(alumni => (
                    <Card key={alumni.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                            <div className="text-center mb-4">
                                <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-red-200">
                                    <span className="text-2xl font-bold text-red-700">
                                        {alumni.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <h3 className="text-lg font-bold text-gray-900">{alumni.name}</h3>
                                    {alumni.isFeatured && (
                                        <Badge className="bg-yellow-100 text-yellow-700">Featured</Badge>
                                    )}
                                </div>
                                <p className="text-gray-600 mb-1">{alumni.position}</p>
                                <p className="text-sm text-gray-500 mb-2">{alumni.company}</p>
                                <Badge variant={alumni.status === 'available' ? 'default' : 'secondary'} className={alumni.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                                    {alumni.status === 'available' ? 'Available' : 'Busy'}
                                </Badge>
                            </div>
                            
                            <div className="space-y-3 mb-4">
                                <div className="flex flex-wrap gap-1 justify-center">
                                    {alumni.skills.slice(0, 3).map(skill => (
                                        <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                                    ))}
                                    {alumni.skills.length > 3 && (
                                        <Badge variant="outline" className="text-xs">+{alumni.skills.length - 3}</Badge>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 text-center">
                                    {alumni.bio.substring(0, 80)}{alumni.bio.length > 80 ? '...' : ''}
                                </p>
                            </div>
                            
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    size="sm"
                                >
                                    {alumni.isFollowing ? <UserCheck className="w-4 h-4 mr-1" /> : <UserPlus className="w-4 h-4 mr-1" />}
                                    {alumni.isFollowing ? 'Following' : 'Follow'}
                                </Button>
                                <Button
                                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white"
                                    size="sm"
                                >
                                    <CalendarPlus className="w-4 h-4 mr-1" />
                                    Link
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );

    // Messaging Content - simplified from NewLinkFolio-main
    const renderMessagingContent = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-6">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
                            <p className="text-gray-600">Alumni messages and conversations</p>
                        </div>
                        <Button variant="outline">
                            <CheckCheck className="w-4 h-4 mr-2" />
                            Mark All Read
                        </Button>
                    </div>

                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search messages..." 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-0">
                    {messagesData.map(message => (
                        <div 
                            key={message.id} 
                            className={`p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer ${
                                !message.isRead ? 'bg-red-50 border-l-4 border-l-red-500' : 'bg-white'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center border-2 border-red-200">
                                    <span className="text-sm font-bold text-red-700">
                                        {message.fromAlumniName.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-semibold text-gray-900">{message.fromAlumniName}</h3>
                                        <span className="text-sm text-gray-500">{message.fromAlumniCompany}</span>
                                        {!message.isRead && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                                    </div>
                                    <p className="text-gray-700 mb-1">{message.message}</p>
                                    <p className="text-sm text-gray-500">{getTimeAgo(message.timestamp)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {message.type === 'meeting' && <Calendar className="w-5 h-5 text-blue-500" />}
                                    {message.type === 'status' && <Clock className="w-5 h-5 text-yellow-500" />}
                                    {message.type === 'general' && <MessageCircle className="w-5 h-5 text-gray-400" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );

    // Notification Content - simplified from NewLinkFolio-main
    const renderNotificationContent = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-6">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
                            <p className="text-gray-600">Important updates, events and announcements</p>
                        </div>
                        <Button variant="outline">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear All
                        </Button>
                    </div>

                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search notifications..." 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {notificationsData.map(notification => (
                    <Card 
                        key={notification.id} 
                        className={`bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                            !notification.isRead ? 'ring-2 ring-red-200' : ''
                        }`}
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {notification.type === 'meeting' && <Calendar className="w-6 h-6 text-blue-500" />}
                                    {notification.type === 'announcement' && <Bell className="w-6 h-6 text-green-500" />}
                                    <div className={`w-3 h-3 rounded-full ${notification.priority === 'high' ? 'bg-red-500' : notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                                </div>
                                {!notification.isRead && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{notification.title}</h3>
                            <p className="text-gray-600 mb-4">{notification.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{getTimeAgo(notification.timestamp)}</span>
                                <Badge variant="outline" className="capitalize">
                                    {notification.priority}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );

    // Main render function
    if (currentPage === 'home') return renderHomePage();
    if (currentPage === 'signup') return renderSignupPage();
    if (currentPage === 'profile') return renderProfilePage();
    if (currentPage === 'portfolio') return renderPortfolioPage();

    // Default header navigation view
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                                        LinkFolio
                                    </h1>
                                    <p className="text-xs text-gray-500">JSSATE Bengaluru</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button onClick={() => showPage('home')} variant="ghost">Home</Button>
                            <Button onClick={() => showPage('signup')} variant="ghost">Signup</Button>
                            <Button onClick={() => showPage('profile')} variant="ghost">Profile Setup</Button>
                            <Button onClick={() => showPage('portfolio')} variant="ghost">Portfolio</Button>
                            {onClose && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onClose}
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Dashboard
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Welcome Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome to LinkFolio, {user?.fullname?.split(' ')[0] || 'Student'}! 👋
                    </h2>
                    <p className="text-lg text-gray-600">
                        Create your professional portfolio and connect with JSS alumni network
                    </p>
                </div>

                {/* Main Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card 
                        onClick={() => showPage('profile')}
                        className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-red-50 to-red-100 border-red-200 cursor-pointer"
                    >
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <Badge variant="secondary" className="bg-red-100 text-red-700">
                                    {hasProfile ? 'Continue' : 'Start'}
                                </Badge>
                            </div>
                            <CardTitle className="text-xl text-gray-900">Portfolio Builder</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                {hasProfile 
                                    ? 'Continue building your professional portfolio'
                                    : 'Create a stunning portfolio in easy steps'
                                }
                            </p>
                            <Button className="w-full bg-red-600 hover:bg-red-700">
                                <Edit className="w-4 h-4 mr-2" />
                                {hasProfile ? 'Continue Building' : 'Start Building'}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card 
                        onClick={() => hasProfile && showPage('portfolio')}
                        className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                            hasProfile 
                                ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' 
                                : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                        }`}
                    >
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                    hasProfile ? 'bg-green-500' : 'bg-gray-400'
                                }`}>
                                    <Eye className="w-6 h-6 text-white" />
                                </div>
                                <Badge variant="secondary" className={
                                    hasProfile ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                }>
                                    {hasProfile ? 'Ready' : 'Locked'}
                                </Badge>
                            </div>
                            <CardTitle className="text-xl text-gray-900">View Portfolio</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                {hasProfile 
                                    ? 'Preview your beautiful portfolio'
                                    : 'Complete your profile to unlock preview'
                                }
                            </p>
                            <Button 
                                disabled={!hasProfile}
                                className={`w-full ${
                                    hasProfile 
                                        ? 'bg-green-600 hover:bg-green-700' 
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                View Portfolio
                            </Button>
                        </CardContent>
                    </Card>

                    <Card 
                        onClick={() => showPage('portfolio')}
                        className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 cursor-pointer"
                    >
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                    Network
                                </Badge>
                            </div>
                            <CardTitle className="text-xl text-gray-900">Alumni Connect</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Connect with JSS alumni working at top companies
                            </p>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                <UserPlus className="w-4 h-4 mr-2" />
                                Explore Network
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Progress Overview */}
                {hasProfile && (
                    <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Profile Progress</h3>
                                    <p className="text-sm text-gray-600">Complete your portfolio to stand out</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-blue-600">{getProfileCompletionPercentage()}%</div>
                                    <div className="text-sm text-gray-500">Complete</div>
                                </div>
                            </div>
                            <Progress value={getProfileCompletionPercentage()} className="h-3 mb-4" />
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span>Profile created</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-orange-500" />
                                    <span>Continue enhancing</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

LinkFolioMainNew.propTypes = {
    onClose: PropTypes.func
};

export default LinkFolioMainNew;
