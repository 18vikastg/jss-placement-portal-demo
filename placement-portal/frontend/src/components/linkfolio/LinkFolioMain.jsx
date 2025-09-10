import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
    User, 
    Eye, 
    Edit,
    Plus,
    TrendingUp,
    Award,
    Target,
    ArrowLeft,
    CheckCircle,
    Star,
    Building,
    Users,
    MessageCircle,
    UserPlus,
    Sparkles,
    Calendar,
    Mail,
    Bell,
    Code,
    Briefcase,
    MapPin,
    Phone,
    Github,
    ExternalLink,
    Save,
    X,
    Trash2,
    Clock,
    UserCheck,
    CalendarPlus,
    Search,
    CheckCheck
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const LinkFolioMain = ({ onClose }) => {
    const { user } = useSelector(store => store.auth);
    
    // Main state management
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'signup', 'profile', 'portfolio'
    const [currentTab, setCurrentTab] = useState('Portfolio'); // Portfolio tabs
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
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [projects, setProjects] = useState([]);
    
    // Alumni network state
    const [alumniData, setAlumniData] = useState([]);
    const [filteredAlumni, setFilteredAlumni] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('all');
    const [scheduledLinks, setScheduledLinks] = useState([]);
    const [showLinkScheduler, setShowLinkScheduler] = useState(false);
    const [selectedAlumni, setSelectedAlumni] = useState(null);
    
    // Messaging state
    const [messagesData, setMessagesData] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    
    // Notifications state
    const [notificationsData, setNotificationsData] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);

    // Load saved data on component mount
    useEffect(() => {
        loadSavedProfile();
        initializeAlumniData();
        initializeMessagingData();
        initializeNotificationData();
    }, []);

    const loadSavedProfile = () => {
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
            setEducation(data.education || []);
            setExperience(data.experience || []);
            setProjects(data.projects || []);
        }
    };

    const checkIfProfileExists = (data) => {
        if (!data) return false;
        return data.firstName && data.lastName && data.email && data.phone && data.objective;
    };

    const getProfileCompletionPercentage = () => {
        if (!profileData) return 0;
        
        let completed = 0;
        let total = 0;

        // Personal info (5 fields)
        const personalFields = ['firstName', 'lastName', 'email', 'phone', 'location', 'objective'];
        personalFields.forEach(field => {
            total++;
            if (profileData[field]) completed++;
        });

        // Education (count entries)
        if (profileData.education && profileData.education.length > 0) {
            completed += 2;
        }
        total += 2;

        // Experience (count entries)  
        if (profileData.experience && profileData.experience.length > 0) {
            completed += 2;
        }
        total += 2;

        // Projects (count entries)
        if (profileData.projects && profileData.projects.length > 0) {
            completed += 2;
        }
        total += 2;

        // Skills (count if any exist)
        if (profileData.skills && profileData.skills.length > 0) {
            completed += 1;
        }
        total += 1;

        return Math.round((completed / total) * 100);
    };

    const initializeAlumniData = () => {
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
                lastActive: "2 hours ago",
                availableSlots: [
                    { date: "2025-09-12", time: "10:00", duration: "30 min" },
                    { date: "2025-09-12", time: "15:30", duration: "45 min" },
                    { date: "2025-09-13", time: "14:00", duration: "30 min" },
                    { date: "2025-09-14", time: "11:00", duration: "60 min" }
                ]
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
                lastActive: "1 day ago",
                availableSlots: [
                    { date: "2025-09-15", time: "09:00", duration: "30 min" },
                    { date: "2025-09-16", time: "16:00", duration: "45 min" }
                ]
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
                lastActive: "30 minutes ago",
                availableSlots: [
                    { date: "2025-09-12", time: "13:00", duration: "30 min" },
                    { date: "2025-09-13", time: "10:30", duration: "60 min" },
                    { date: "2025-09-14", time: "15:00", duration: "30 min" },
                    { date: "2025-09-17", time: "11:00", duration: "45 min" }
                ]
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
                lastActive: "5 minutes ago",
                availableSlots: [
                    { date: "2025-09-12", time: "14:00", duration: "30 min" },
                    { date: "2025-09-14", time: "10:00", duration: "45 min" },
                    { date: "2025-09-15", time: "16:30", duration: "30 min" }
                ]
            }
        ];
        setAlumniData(alumni);
        setFilteredAlumni(alumni);
        
        // Load scheduled links from localStorage
        const savedLinks = localStorage.getItem('scheduledLinks');
        if (savedLinks) {
            setScheduledLinks(JSON.parse(savedLinks));
        }
    };

    const initializeMessagingData = () => {
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
        setFilteredMessages(messages);
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

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const getNotificationTypeIcon = (type) => {
        switch(type) {
            case 'meeting':
                return <Calendar className="w-6 h-6 text-blue-500" />;
            case 'announcement':
                return <Bell className="w-6 h-6 text-green-500" />;
            case 'system':
                return <Star className="w-6 h-6 text-yellow-500" />;
            default:
                return <Bell className="w-6 h-6 text-gray-400" />;
        }
    };

    // Main page navigation
    const showPage = (pageName) => {
        setCurrentPage(pageName);
        if (pageName === 'portfolio') {
            setCurrentTab('Portfolio');
        }
    };

    // Profile builder functions
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

    const addEducation = () => {
        const newEducation = {
            id: Date.now(),
            level: '',
            institution: '',
            degree: '',
            grade: '',
            startYear: '',
            endYear: ''
        };
        setEducation([...education, newEducation]);
    };

    const addExperience = () => {
        const newExperience = {
            id: Date.now(),
            company: '',
            role: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        };
        setExperience([...experience, newExperience]);
    };

    const addProject = () => {
        const newProject = {
            id: Date.now(),
            title: '',
            description: '',
            technologies: '',
            link: '',
            startDate: '',
            endDate: ''
        };
        setProjects([...projects, newProject]);
    };

    const saveProfile = () => {
        const profileToSave = {
            ...profileForm,
            education,
            experience,
            projects,
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

    // Alumni functions
    const toggleFollow = (alumniId) => {
        setAlumniData(prev => prev.map(alumni => 
            alumni.id === alumniId 
                ? { ...alumni, isFollowing: !alumni.isFollowing }
                : alumni
        ));
        setFilteredAlumni(prev => prev.map(alumni => 
            alumni.id === alumniId 
                ? { ...alumni, isFollowing: !alumni.isFollowing }
                : alumni
        ));
    };

    const openLinkSchedulerForAlumni = (alumniId) => {
        const alumni = alumniData.find(a => a.id === alumniId);
        setSelectedAlumni(alumni);
        setShowLinkScheduler(true);
    };

    const scheduleLink = (alumniId, slot, message) => {
        const alumni = alumniData.find(a => a.id === alumniId);
        const [date, time] = slot.split('|');
        
        const newLink = {
            id: Date.now(),
            alumniId,
            alumniName: alumni.name,
            date,
            time,
            message,
            status: 'scheduled',
            createdAt: new Date().toISOString()
        };

        const updatedLinks = [...scheduledLinks, newLink];
        setScheduledLinks(updatedLinks);
        localStorage.setItem('scheduledLinks', JSON.stringify(updatedLinks));
        
        alert(`Link scheduled with ${alumni.name} for ${new Date(date).toLocaleDateString()} at ${time}`);
        setShowLinkScheduler(false);
        setSelectedAlumni(null);
    };

    // Message functions
    const markAsRead = (messageId) => {
        setMessagesData(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, isRead: true } : msg
        ));
        setFilteredMessages(prev => prev.map(msg => 
            msg.id === messageId ? { ...msg, isRead: true } : msg
        ));
    };

    const markAllAsRead = () => {
        setMessagesData(prev => prev.map(msg => ({ ...msg, isRead: true })));
        setFilteredMessages(prev => prev.map(msg => ({ ...msg, isRead: true })));
    };

    // Notification functions
    const markNotificationAsRead = (notificationId) => {
        setNotificationsData(prev => prev.map(notif => 
            notif.id === notificationId ? { ...notif, isRead: true } : notif
        ));
        setFilteredNotifications(prev => prev.map(notif => 
            notif.id === notificationId ? { ...notif, isRead: true } : notif
        ));
    };

    const clearAllNotifications = () => {
        setNotificationsData([]);
        setFilteredNotifications([]);
    };

    // Render Home Page
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

    // Render Signup Page
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

    // Render Profile Setup Page
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

                        {/* Education Section */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-900">Education</h3>
                                <Button onClick={addEducation} variant="outline">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Education
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {education.map(edu => (
                                    <Card key={edu.id} className="border border-gray-200">
                                        <CardContent className="p-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input 
                                                    type="text" 
                                                    placeholder="Institution" 
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder="Degree/Stream" 
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder="Grade/CGPA" 
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                                <input 
                                                    type="text" 
                                                    placeholder="Year (e.g., 2020-2024)" 
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
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

    const renderMainDashboard = () => {
        const completionPercentage = getProfileCompletionPercentage();
        const stepStatus = getStepStatus();

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
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onClose}
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Dashboard
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome to LinkFolio, {user?.fullname?.split(' ')[0] || 'Student'}! 👋
                        </h2>
                        <p className="text-lg text-gray-600">
                            Create your professional portfolio and connect with JSS alumni network
                        </p>
                    </div>

                    {/* Progress Overview */}
                    {hasProfile && (
                        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Profile Progress</h3>
                                        <p className="text-sm text-gray-600">Complete your portfolio to stand out</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
                                        <div className="text-sm text-gray-500">Complete</div>
                                    </div>
                                </div>
                                <Progress value={completionPercentage} className="h-3 mb-4" />
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span>{stepStatus.completed.length} steps completed</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Target className="w-4 h-4 text-orange-500" />
                                        <span>{5 - stepStatus.completed.length} steps remaining</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Main Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Portfolio Builder */}
                        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
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
                                        : 'Create a stunning portfolio in 5 easy steps'
                                    }
                                </p>
                                <Button 
                                    onClick={() => setCurrentView('builder')} 
                                    className="w-full bg-red-600 hover:bg-red-700"
                                >
                                    <Edit className="w-4 h-4 mr-2" />
                                    {hasProfile ? 'Continue Building' : 'Start Building'}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Portfolio Preview */}
                        <Card className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                            hasProfile 
                                ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' 
                                : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}>
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
                                    onClick={() => setCurrentView('portfolio')} 
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

                        {/* Alumni Network */}
                        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
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
                                <Button 
                                    onClick={() => setCurrentView('alumni')} 
                                    className="w-full bg-purple-600 hover:bg-purple-700"
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Explore Network
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Getting Started Guide for New Users */}
                    {!hasProfile && (
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                            <CardContent className="p-8">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Star className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Create Your Professional Portfolio
                                    </h3>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                        Build a stunning portfolio in just 5 steps and connect with 500+ JSS alumni working at top companies
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div className="text-center">
                                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-white font-bold">1</span>
                                        </div>
                                        <div className="text-sm font-medium">Personal Info</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-white font-bold">2</span>
                                        </div>
                                        <div className="text-sm font-medium">Education</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-white font-bold">3</span>
                                        </div>
                                        <div className="text-sm font-medium">Experience</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-white font-bold">4</span>
                                        </div>
                                        <div className="text-sm font-medium">Projects</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <span className="text-white font-bold">5</span>
                                        </div>
                                        <div className="text-sm font-medium">Skills & Jobs</div>
                                    </div>
                                </div>
                                
                                <div className="text-center mt-6">
                                    <Button 
                                        onClick={() => setCurrentView('builder')} 
                                        size="lg"
                                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8"
                                    >
                                        <Plus className="w-5 h-5 mr-2" />
                                        Start Building Portfolio
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        );
    };

    const renderAlumniNetwork = () => {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentView('main')}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                                <h1 className="text-2xl font-bold text-gray-900">Alumni Network</h1>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect with JSS Alumni</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Network with 500+ alumni working at top companies like Google, Microsoft, Amazon, and more
                        </p>
                    </div>
                    
                    {/* Alumni Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <Users className="w-12 h-12 text-blue-600 mb-4" />
                                <CardTitle>Alumni Directory</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">Browse through our extensive alumni network</p>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    <Building className="w-4 h-4 mr-2" />
                                    Browse Alumni
                                </Button>
                            </CardContent>
                        </Card>
                        
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <MessageCircle className="w-12 h-12 text-green-600 mb-4" />
                                <CardTitle>Mentorship</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">Get mentored by experienced professionals</p>
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    <Star className="w-4 h-4 mr-2" />
                                    Find Mentor
                                </Button>
                            </CardContent>
                        </Card>
                        
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
                                <CardTitle>Job Referrals</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">Get referred to positions at alumni companies</p>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                    <Award className="w-4 h-4 mr-2" />
                                    Request Referral
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Coming Soon Banner */}
                    <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
                        <p className="text-gray-600 mb-6">
                            Full alumni networking features are being integrated. Stay tuned for direct messaging, 
                            event notifications, and advanced search capabilities.
                        </p>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            In Development
                        </Badge>
                    </div>
                </div>
            </div>
        );
    };

    // Render different views based on currentView state
    if (currentView === 'builder') {
        return <LinkFolioBuilder onBack={() => setCurrentView('main')} />;
    }

    if (currentView === 'portfolio') {
        return <LinkFolioPortfolio onBack={() => setCurrentView('main')} />;
    }

    if (currentView === 'alumni') {
        return renderAlumniNetwork();
    }

    return renderMainDashboard();
};

export default LinkFolioMain;
