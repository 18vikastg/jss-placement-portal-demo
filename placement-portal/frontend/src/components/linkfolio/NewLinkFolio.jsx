import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { 
    User, 
    Edit,
    CheckCircle,
    Star,
    Users,
    MessageCircle,
    UserPlus,
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
    Upload,
    Lock,
    Camera,
    Settings,
    Megaphone,
    Filter
} from 'lucide-react';
import { Button } from '../ui/button';
import { 
    profileStorage, 
    alumniStorage, 
    messagesStorage, 
    notificationsStorage,
    scheduledLinksStorage,
    validateProfileData
} from './storage.js';

import { 
    filterAlumni
} from './helpers.js';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const NewLinkFolio = ({ onClose }) => {
    // Main state management
    const [currentPage, setCurrentPage] = useState('home');
    const [currentTab, setCurrentTab] = useState('Portfolio');
    const [userProfile, setUserProfile] = useState(null);
    const [hasProfile, setHasProfile] = useState(false);
    
    // Form data states
    const [skills, setSkills] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [profilePicture, setProfilePicture] = useState(null);
    
    // Alumni data states
    const [alumniData, setAlumniData] = useState([]);
    const [filteredAlumni, setFilteredAlumni] = useState([]);
    
    // Link states
    const [linkedUsers, setLinkedUsers] = useState(new Set());
    const [scheduledLinks, setScheduledLinks] = useState([]);
    
    // Messaging and notification states  
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);

    
    // Load saved profile data on component mount
    // Load saved profile from localStorage
    const loadSavedProfile = useCallback(() => {
        const profileData = profileStorage.load();
        if (profileData) {
            setUserProfile(profileData);
            setHasProfile(true);
            setSkills(profileData.skills || []);
            setJobs(profileData.interestedJobs || []);
            if (profileData.profilePicture) {
                setProfilePicture(profileData.profilePicture);
            }
        }
    }, []);

    // Initialize sample alumni data
    const initializeAlumniData = useCallback(() => {
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
                profilePicture: null,
                status: "available",
                isFeatured: true,
                isFollowing: alumniStorage.isFollowing(1),
                lastActive: "2 hours ago",
                availableSlots: [
                    { date: "2025-01-15", time: "10:00", duration: "30 min" },
                    { date: "2025-01-15", time: "15:30", duration: "45 min" },
                    { date: "2025-01-16", time: "14:00", duration: "30 min" }
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
                profilePicture: null,
                status: "busy",
                isFeatured: false,
                isFollowing: alumniStorage.isFollowing(2),
                lastActive: "1 day ago",
                availableSlots: [
                    { date: "2025-01-17", time: "09:00", duration: "30 min" },
                    { date: "2025-01-18", time: "16:00", duration: "45 min" }
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
                profilePicture: null,
                status: "available",
                isFeatured: true,
                isFollowing: alumniStorage.isFollowing(3),
                lastActive: "30 minutes ago",
                availableSlots: [
                    { date: "2025-01-15", time: "13:00", duration: "30 min" },
                    { date: "2025-01-16", time: "10:30", duration: "60 min" }
                ]
            }
        ];
        setAlumniData(alumni);
        setFilteredAlumni(alumni);
    }, []);

    // Initialize sample messaging data
    const initializeMessagingData = useCallback(() => {
        let messages = messagesStorage.load();
        
        // Initialize with sample data if no messages exist
        if (messages.length === 0) {
            const sampleMessages = [
                {
                    id: 1,
                    fromAlumniId: 1,
                    fromAlumniName: "Amit Walia",
                    fromAlumniCompany: "Google",
                    message: "Meet @ 1 PM",
                    timestamp: "2025-01-14T15:30:00Z",
                    isRead: false,
                    type: "meeting"
                },
                {
                    id: 2,
                    fromAlumniId: 2,
                    fromAlumniName: "Vivek A.",
                    fromAlumniCompany: "Microsoft",
                    message: "Nice Academy",
                    timestamp: "2025-01-14T10:15:00Z",
                    isRead: true,
                    type: "general"
                }
            ];
            messagesStorage.save(sampleMessages);
            messages = sampleMessages;
        }
        
        setFilteredMessages(messages);
    }, []);

    // Initialize sample notification data
    const initializeNotificationData = useCallback(() => {
        let notifications = notificationsStorage.load();
        
        // Initialize with sample data if no notifications exist
        if (notifications.length === 0) {
            const sampleNotifications = [
                {
                    id: 1,
                    title: "Link with Abhi@18:30",
                    description: "Scheduled meeting reminder",
                    timestamp: "2025-01-14T18:30:00Z",
                    type: "meeting",
                    isRead: false,
                    priority: "high"
                },
                {
                    id: 2,
                    title: "New Alumni Registration",
                    description: "5 new alumni joined the network this week",
                    timestamp: "2025-01-14T09:00:00Z",
                    type: "announcement",
                    isRead: true,
                    priority: "low"
                }
            ];
            notificationsStorage.save(sampleNotifications);
            notifications = sampleNotifications;
        }
        
        setFilteredNotifications(notifications);
    }, []);

    // Initialize scheduled links and linked users
    const initializeScheduledLinks = useCallback(() => {
        const links = scheduledLinksStorage.load();
        setScheduledLinks(links);
        
        // Initialize linked users set from existing scheduled links
        const linkedUserIds = new Set(links.map(link => link.alumniId));
        setLinkedUsers(linkedUserIds);
    }, []);

    // Navigation function
    const showPage = useCallback((pageName) => {
        setCurrentPage(pageName);
        window.scrollTo(0, 0);
    }, []);



    // Initialize component data on mount
    useEffect(() => {
        loadSavedProfile();
        initializeAlumniData();
        initializeMessagingData();
        initializeNotificationData();
        initializeScheduledLinks();
    }, [loadSavedProfile, initializeAlumniData, initializeMessagingData, initializeNotificationData, initializeScheduledLinks]);

    // Handle profile picture upload
    const handleProfilePictureChange = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    // Skills management
    const addSkill = useCallback((skill) => {
        if (skill && !skills.includes(skill)) {
            setSkills(prev => [...prev, skill]);
        }
    }, [skills]);

    const removeSkill = useCallback((skillToRemove) => {
        setSkills(prev => prev.filter(skill => skill !== skillToRemove));
    }, []);

    // Jobs management
    const addJob = useCallback((job) => {
        if (job && !jobs.includes(job)) {
            setJobs(prev => [...prev, job]);
        }
    }, [jobs]);

    const removeJob = useCallback((jobToRemove) => {
        setJobs(prev => prev.filter(job => job !== jobToRemove));
    }, []);

    // Save profile data
    const saveProfile = useCallback((profileData) => {
        const completeProfile = {
            ...profileData,
            skills,
            interestedJobs: jobs,
            profilePicture,
            createdAt: userProfile?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        const success = profileStorage.save(completeProfile);
        if (success) {
            setUserProfile(completeProfile);
            setHasProfile(true);
            showPage('portfolio');
        } else {
            alert('Failed to save profile. Please try again.');
        }
    }, [skills, jobs, profilePicture, userProfile?.createdAt, showPage]);

    // Toggle follow alumni
    const toggleFollow = useCallback((alumniId) => {
        alumniStorage.toggleFollow(alumniId);
        setAlumniData(prev => prev.map(alumni => 
            alumni.id === alumniId 
                ? { ...alumni, isFollowing: alumniStorage.isFollowing(alumniId) }
                : alumni
        ));
    }, []);

    // Toggle link with alumni - schedule meeting and create notification
    const toggleLink = useCallback((alumniId) => {
        const alumni = alumniData.find(a => a.id === alumniId);
        if (!alumni) return;

        const isCurrentlyLinked = linkedUsers.has(alumniId);
        
        setLinkedUsers(prev => {
            const newSet = new Set(prev);
            if (isCurrentlyLinked) {
                newSet.delete(alumniId);
            } else {
                newSet.add(alumniId);
                
                // Schedule a meeting time (use available slots or default)
                const meetingTime = alumni.availableSlots && alumni.availableSlots.length > 0 
                    ? alumni.availableSlots[0].time 
                    : "18:30";
                
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                // Create scheduled link
                const newLink = {
                    id: Date.now(),
                    alumniId,
                    alumniName: alumni.name,
                    alumniCompany: alumni.company,
                    date: tomorrow.toISOString().split('T')[0],
                    time: meetingTime,
                    status: 'scheduled',
                    createdAt: new Date().toISOString()
                };
                
                setScheduledLinks(prev => {
                    const updated = [...prev, newLink];
                    scheduledLinksStorage.save(updated);
                    return updated;
                });
                
                // Add notification for scheduled meeting
                const newNotification = {
                    id: Date.now() + Math.random(),
                    title: `Link with ${alumni.name}@${meetingTime}`,
                    description: `Scheduled meeting reminder with ${alumni.name} from ${alumni.company}`,
                    timestamp: new Date().toISOString(),
                    type: "meeting",
                    isRead: false,
                    priority: "high"
                };
                
                // Add notification to the filtered list and save to storage
                setFilteredNotifications(prev => {
                    const updated = [newNotification, ...prev];
                    notificationsStorage.save(updated);
                    return updated;
                });
                
                // Add success message
                const newMessage = {
                    id: Date.now() + 1,
                    fromAlumniId: alumniId,
                    fromAlumniName: alumni.name,
                    fromAlumniCompany: alumni.company,
                    message: `Meeting scheduled @ ${meetingTime}`,
                    timestamp: new Date().toISOString(),
                    isRead: false,
                    type: "meeting"
                };
                
                setFilteredMessages(prev => {
                    const updated = [newMessage, ...prev];
                    messagesStorage.save(updated);
                    return updated;
                });
                
                // Show success feedback
                if (typeof window !== 'undefined') {
                    const successMsg = document.createElement('div');
                    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
                    successMsg.textContent = `✓ Meeting scheduled with ${alumni.name} at ${meetingTime}`;
                    document.body.appendChild(successMsg);
                    
                    setTimeout(() => {
                        document.body.removeChild(successMsg);
                    }, 3000);
                }
            }
            return newSet;
        });
    }, [alumniData, linkedUsers]);

    // Utility function for time ago
    const getTimeAgo = useCallback((timestamp) => {
        const now = new Date();
        const messageTime = new Date(timestamp);
        const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    }, []);

    // Render Home Page
    const renderHomePage = () => (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex flex-col items-center mb-8">
                    <img 
                        src="/jss logo.png" 
                        alt="JSS Academy of Technical Education Logo" 
                        className="w-32 h-32 object-contain mb-4"
                    />
                    <span className="text-lg text-gray-600 font-medium">JSS Academy of Technical Education</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    Welcome to <span className="bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent">LinkFolio</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Your professional networking platform. Create your account, set up your profile, and showcase your professional portfolio.
                </p>
                <div className="flex justify-center gap-4">
                    <Button 
                        onClick={() => showPage('signup')} 
                        className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                    >
                        Get Started
                    </Button>
                    {hasProfile && (
                        <Button 
                            onClick={() => showPage('portfolio')} 
                            variant="outline"
                            className="px-8 py-4 rounded-lg font-medium text-lg border-2 border-red-600 text-red-600 hover:bg-red-50"
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
                    <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                        <img 
                            src="/jss logo.png" 
                            alt="JSS Academy of Technical Education Logo" 
                            className="w-16 h-16 object-contain rounded-full"
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Join <span className="bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent">LinkFolio</span>
                    </h2>
                    <p className="text-gray-600">Create your account and start building your professional network</p>
                </div>

                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-8">
                        <form className="space-y-6" onSubmit={(e) => {
                            e.preventDefault();
                            showPage('profile');
                        }}>
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-2">Username</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input 
                                        type="text" 
                                        placeholder="Enter your username" 
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-2">Email Address</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-2">Password</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                <CheckCircle className="w-5 h-5" />
                                Create Account
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account? <a href="#" className="font-medium text-red-700 hover:text-red-800">Sign in here</a>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    // Profile Setup Component
    const ProfileSetup = () => {
        const [formData, setFormData] = useState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            location: '',
            objective: ''
        });

        const [skillInput, setSkillInput] = useState('');
        const [jobInput, setJobInput] = useState('');

        const handleInputChange = (field, value) => {
            setFormData(prev => ({ ...prev, [field]: value }));
        };

        const handleSkillKeyPress = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (skillInput.trim()) {
                    addSkill(skillInput.trim());
                    setSkillInput('');
                }
            }
        };

        const handleJobKeyPress = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (jobInput.trim()) {
                    addJob(jobInput.trim());
                    setJobInput('');
                }
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            
            // Validate profile data using storage utility
            const validation = validateProfileData(formData);
            
            if (!validation.isValid) {
                alert(`Please fill in the following required fields: ${validation.missingFields.join(', ')}`);
                return;
            }

            if (validation.completionPercentage < 80) {
                const proceed = window.confirm(`Profile is only ${validation.completionPercentage}% complete. Continue anyway?`);
                if (!proceed) return;
            }

            saveProfile(formData);
        };

        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Complete Your <span className="bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent">Profile</span>
                        </h2>
                        <p className="text-gray-600">Fill in your professional details to create your portfolio</p>
                    </div>

                    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Profile Picture Upload */}
                                <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 text-center">
                                    <div className="w-32 h-32 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-red-200 shadow-lg overflow-hidden">
                                        {profilePicture ? (
                                            <img src={profilePicture} className="w-32 h-32 rounded-full object-cover" alt="Profile Preview" />
                                        ) : (
                                            <Camera className="w-12 h-12 text-red-600" />
                                        )}
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Profile Picture</h4>
                                    <p className="text-gray-600 mb-4">Upload a professional photo of yourself</p>
                                    <input
                                        type="file"
                                        id="profile-picture"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleProfilePictureChange}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => document.getElementById('profile-picture').click()}
                                        className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <Upload className="w-5 h-5" />
                                        Upload Photo
                                    </Button>
                                </div>

                                {/* Personal Information */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                                        <Badge className="bg-red-100 text-red-700">Required</Badge>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label className="block text-sm font-medium text-gray-700 mb-2">First Name *</Label>
                                            <Input
                                                type="text"
                                                placeholder="Enter your first name"
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</Label>
                                            <Input
                                                type="text"
                                                placeholder="Enter your last name"
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</Label>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</Label>
                                            <Input
                                                type="tel"
                                                placeholder="Enter your phone number"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label className="block text-sm font-medium text-gray-700 mb-2">Location *</Label>
                                            <Input
                                                type="text"
                                                placeholder="e.g., Bangalore, Karnataka - 560060"
                                                value={formData.location}
                                                onChange={(e) => handleInputChange('location', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <Label className="block text-sm font-medium text-gray-700 mb-2">Objective *</Label>
                                            <Textarea
                                                rows={4}
                                                placeholder="Write a brief objective about your career goals and aspirations..."
                                                value={formData.objective}
                                                onChange={(e) => handleInputChange('objective', e.target.value)}
                                                className="resize-none"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Skills Section */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Skills</h3>
                                    <div className="mb-4">
                                        <Input
                                            type="text"
                                            placeholder="Enter a skill and press Enter"
                                            value={skillInput}
                                            onChange={(e) => setSkillInput(e.target.value)}
                                            onKeyPress={handleSkillKeyPress}
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map(skill => (
                                            <Badge 
                                                key={skill}
                                                className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                                            >
                                                {skill}
                                                <button 
                                                    type="button"
                                                    onClick={() => removeSkill(skill)} 
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Interested Jobs Section */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Interested Jobs</h3>
                                    <div className="mb-4">
                                        <Input
                                            type="text"
                                            placeholder="Enter a job title and press Enter"
                                            value={jobInput}
                                            onChange={(e) => setJobInput(e.target.value)}
                                            onKeyPress={handleJobKeyPress}
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {jobs.map(job => (
                                            <Badge 
                                                key={job}
                                                className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                                            >
                                                {job}
                                                <button 
                                                    type="button"
                                                    onClick={() => removeJob(job)} 
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                    <Button 
                                        type="button"
                                        onClick={() => showPage('signup')} 
                                        variant="outline"
                                        className="px-6 py-3"
                                    >
                                        Previous
                                    </Button>
                                    <div className="flex gap-3">
                                        <Button 
                                            type="button"
                                            onClick={() => showPage('portfolio')} 
                                            variant="outline"
                                        >
                                            Complete Later
                                        </Button>
                                        <Button 
                                            type="submit"
                                            className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white"
                                        >
                                            Complete Profile
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    };

    // Portfolio Display Component
    const PortfolioDisplay = () => {
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header Section */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-12">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
                                    {userProfile?.firstName}
                                    <span className="block bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent">
                                        {userProfile?.lastName}
                                    </span>
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-gray-600 text-lg">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5" />
                                        <span>{userProfile?.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5" />
                                        <span>{userProfile?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5" />
                                        <span>{userProfile?.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-12">
                                <div className="w-48 h-48 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-red-200 shadow-lg">
                                    {userProfile?.profilePicture ? (
                                        <img src={userProfile.profilePicture} className="w-48 h-48 rounded-full object-cover" alt="Profile" />
                                    ) : (
                                        <span className="text-6xl font-bold text-red-700">
                                            {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Objective Section */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Objective</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {userProfile?.objective}
                        </p>
                    </CardContent>
                </Card>

                {/* Skills and Jobs Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Star className="w-6 h-6 text-red-600" />
                                <h2 className="text-xl font-bold text-gray-900">Skills</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills.length > 0 ? skills.map(skill => (
                                    <Badge 
                                        key={skill}
                                        className="bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {skill}
                                    </Badge>
                                )) : (
                                    <p className="text-gray-500 italic">No skills added yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Briefcase className="w-6 h-6 text-red-600" />
                                <h2 className="text-xl font-bold text-gray-900">Interested Jobs</h2>
                            </div>
                            <div className="space-y-3">
                                {jobs.length > 0 ? jobs.map(job => (
                                    <div key={job} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-all duration-300">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <span className="font-medium text-gray-700">{job}</span>
                                    </div>
                                )) : (
                                    <p className="text-gray-500 italic">No job interests added yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    };

    // Enhanced Alumni Network Component with Advanced Search
    const AlumniNetwork = () => {
        const [localSearchTerm, setLocalSearchTerm] = useState('');
        const [showFilters, setShowFilters] = useState(false);
        const [selectedFilters, setSelectedFilters] = useState({
            company: '',
            status: '',
            graduationYear: '',
            following: false,
            featured: false
        });

        // Apply filters function
        const applyFilters = useCallback(() => {
            const filtered = filterAlumni(alumniData, {
                search: localSearchTerm,
                ...selectedFilters
            });
            setFilteredAlumni(filtered);
        }, [localSearchTerm, selectedFilters]);

        // Debounced search effect
        useEffect(() => {
            const timeoutId = setTimeout(applyFilters, 300);
            return () => clearTimeout(timeoutId);
        }, [applyFilters]);

        // Initialize filtered alumni
        useEffect(() => {
            setFilteredAlumni(alumniData);
        }, []);

        // Handle search input change
        const handleSearchChange = (e) => {
            setLocalSearchTerm(e.target.value);
        };

        // Handle filter changes
        const handleFilterChange = (filterKey, value) => {
            setSelectedFilters(prev => ({
                ...prev,
                [filterKey]: value
            }));
        };

        // Clear all filters
        const clearFilters = () => {
            setSelectedFilters({
                company: '',
                status: '',
                graduationYear: '',
                following: false,
                featured: false
            });
            setLocalSearchTerm('');
        };

        // Get unique values for filter options
        const getUniqueCompanies = () => [...new Set(alumniData.map(a => a.company))];
        const getUniqueGraduationYears = () => [...new Set(alumniData.map(a => a.graduationYear))].sort((a, b) => b - a);

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">AlumniLink</h1>
                                <p className="text-gray-600">Connect with JSSATE alumni and expand your professional network</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <Badge variant="outline" className="text-sm">
                                        {filteredAlumni.length} alumni found
                                    </Badge>
                                    {Object.values(selectedFilters).some(v => v !== '' && v !== false) && (
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={clearFilters}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Clear filters
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2"
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                            </Button>
                        </div>

                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                type="text"
                                placeholder="Search alumni by name, company, skills, or position..."
                                className="pl-10 pr-10"
                                value={localSearchTerm}
                                onChange={handleSearchChange}
                            />
                            {localSearchTerm && (
                                <button
                                    onClick={() => setLocalSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>

                        {/* Advanced Filters */}
                        {showFilters && (
                            <Card className="mb-6 border-2 border-dashed border-gray-200">
                                <CardContent className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {/* Company Filter */}
                                        <div>
                                            <Label className="text-sm font-medium mb-2 block">Company</Label>
                                            <select
                                                value={selectedFilters.company}
                                                onChange={(e) => handleFilterChange('company', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            >
                                                <option value="">All Companies</option>
                                                {getUniqueCompanies().map(company => (
                                                    <option key={company} value={company}>{company}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Status Filter */}
                                        <div>
                                            <Label className="text-sm font-medium mb-2 block">Status</Label>
                                            <select
                                                value={selectedFilters.status}
                                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            >
                                                <option value="">All Status</option>
                                                <option value="available">Available</option>
                                                <option value="busy">Busy</option>
                                            </select>
                                        </div>

                                        {/* Graduation Year Filter */}
                                        <div>
                                            <Label className="text-sm font-medium mb-2 block">Graduation Year</Label>
                                            <select
                                                value={selectedFilters.graduationYear}
                                                onChange={(e) => handleFilterChange('graduationYear', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                            >
                                                <option value="">All Years</option>
                                                {getUniqueGraduationYears().map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Quick Filters */}
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium block">Quick Filters</Label>
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFilters.featured}
                                                        onChange={(e) => handleFilterChange('featured', e.target.checked)}
                                                        className="rounded border-gray-300"
                                                    />
                                                    <span className="text-sm">Featured Only</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFilters.following}
                                                        onChange={(e) => handleFilterChange('following', e.target.checked)}
                                                        className="rounded border-gray-300"
                                                    />
                                                    <span className="text-sm">Following Only</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAlumni.map(alumni => (
                        <Card key={alumni.id} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
                                            <Badge className="bg-yellow-100 text-yellow-700 text-xs">Featured</Badge>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mb-1">{alumni.position}</p>
                                    <p className="text-sm text-gray-500 mb-2">{alumni.company}</p>
                                    <Badge className={
                                        alumni.status === 'available' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-yellow-100 text-yellow-700'
                                    }>
                                        {alumni.status === 'available' ? 'Available' : 'Busy'}
                                    </Badge>
                                </div>
                                
                                <div className="space-y-3 mb-4">
                                    <div className="flex flex-wrap gap-1 justify-center">
                                        {alumni.skills.slice(0, 3).map(skill => (
                                            <Badge key={skill} className="bg-red-100 text-red-700 text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                        {alumni.skills.length > 3 && (
                                            <Badge className="bg-gray-100 text-gray-600 text-xs">
                                                +{alumni.skills.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 text-center">
                                        {alumni.bio.substring(0, 80)}{alumni.bio.length > 80 ? '...' : ''}
                                    </p>
                                </div>
                                
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => toggleFollow(alumni.id)}
                                        variant="outline"
                                        className={`flex-1 flex items-center justify-center gap-2 ${
                                            alumni.isFollowing 
                                                ? 'bg-red-100 text-red-700 border-red-200' 
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        {alumni.isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                                        {alumni.isFollowing ? 'Following' : 'Follow'}
                                    </Button>
                                    <Button 
                                        onClick={() => toggleLink(alumni.id)}
                                        className={`flex-1 ${
                                            linkedUsers.has(alumni.id) 
                                                ? 'bg-green-600 hover:bg-green-700' 
                                                : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                                        } text-white`}
                                    >
                                        <CalendarPlus className="w-4 h-4 mr-2" />
                                        {linkedUsers.has(alumni.id) ? 'Linked' : 'Link'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    };

    // Messages Component
    const MessagesComponent = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
                            <p className="text-gray-600">Alumni messages and conversations</p>
                        </div>
                        <Button variant="outline" className="flex items-center gap-2">
                            <CheckCheck className="w-4 h-4" />
                            Mark All Read
                        </Button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Search messages..."
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-0">
                    {filteredMessages.length > 0 ? filteredMessages.map(message => (
                        <div key={message.id} className={`p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer ${!message.isRead ? 'bg-red-50 border-l-4 border-l-red-500' : ''}`}>
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
                    )) : (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageCircle className="w-12 h-12 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Messages Yet</h3>
                            <p className="text-gray-600">Alumni will be able to send you messages here</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );

    // Notifications Component
    const NotificationsComponent = () => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
                            <p className="text-gray-600">Important updates, events and announcements</p>
                        </div>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            Clear All
                        </Button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Search notifications..."
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNotifications.length > 0 ? filteredNotifications.map(notification => (
                    <Card key={notification.id} className={`bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${!notification.isRead ? 'ring-2 ring-red-200' : ''}`}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {notification.type === 'meeting' && (
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-4 h-4 text-blue-600" />
                                        </div>
                                    )}
                                    {notification.type === 'announcement' && (
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <Megaphone className="w-4 h-4 text-green-600" />
                                        </div>
                                    )}
                                    {notification.type === 'system' && (
                                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <Settings className="w-4 h-4 text-yellow-600" />
                                        </div>
                                    )}
                                    <div className={`w-3 h-3 rounded-full ${
                                        notification.priority === 'high' ? 'bg-red-500' : 
                                        notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}></div>
                                </div>
                                {!notification.isRead && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                            </div>
                            
                            <h3 className="font-semibold text-gray-900 mb-2">{notification.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{notification.description}</p>
                            
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">{getTimeAgo(notification.timestamp)}</span>
                                <Badge className={
                                    notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                                    notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                }>
                                    {notification.priority.toUpperCase()}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                )) : (
                    <div className="col-span-2 text-center py-12">
                        <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Bell className="w-12 h-12 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Notifications</h3>
                        <p className="text-gray-600">You&apos;re all caught up! Check back later for updates</p>
                    </div>
                )}
            </div>
        </div>
    );

    // Portfolio Page with Sidebar Navigation
    const PortfolioPage = () => (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 sticky top-0 h-screen">
                <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <img 
                                src="/jss logo.png" 
                                alt="JSS Academy Logo" 
                                className="w-10 h-10 object-contain"
                            />
                            <h2 className="text-xl font-bold text-gray-900">LinkFolio</h2>
                        </div>
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
                {currentTab === 'Portfolio' && <PortfolioDisplay />}
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
                {currentTab === 'AlumniLink' && <AlumniNetwork />}
                {currentTab === 'Messaging' && <MessagesComponent />}
                {currentTab === 'Notification' && <NotificationsComponent />}
            </div>
        </div>
    );

    // Main Render Logic
    return (
        <div className="relative min-h-screen">
            {/* Navigation Bar */}
            <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16">
                    <div className="flex items-center">
                        <div className="flex items-center space-x-4">
                            <img 
                                src="/jss logo.png" 
                                alt="JSS Academy Logo" 
                                className="w-12 h-12 object-contain"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">LinkFolio</h1>
                                <span className="text-xs text-gray-600 font-medium">JSSATE Bengaluru</span>
                            </div>
                        </div>
                    </div>

                    {/* Step Indicator */}
                    {currentPage !== 'portfolio' && (
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                currentPage === 'signup' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' : 
                                ['profile', 'portfolio'].includes(currentPage) ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                                1
                            </div>
                            <div className="w-8 h-0.5 bg-gray-200"></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                currentPage === 'profile' ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' : 
                                currentPage === 'portfolio' ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                                2
                            </div>
                            <div className="w-8 h-0.5 bg-gray-200"></div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                currentPage === 'portfolio' ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                                3
                            </div>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => showPage('home')}>Home</Button>
                        <Button variant="ghost" onClick={() => showPage('signup')}>Signup</Button>
                        <Button variant="ghost" onClick={() => showPage('profile')}>Profile Setup</Button>
                        <Button variant="ghost" onClick={() => showPage('portfolio')}>Portfolio</Button>
                        {onClose && (
                            <Button variant="outline" onClick={onClose}>
                                <X className="w-4 h-4 mr-2" />
                                Close
                            </Button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            {currentPage === 'home' && renderHomePage()}
            {currentPage === 'signup' && renderSignupPage()}
            {currentPage === 'profile' && <ProfileSetup />}
            {currentPage === 'portfolio' && <PortfolioPage />}
        </div>
    );
};

NewLinkFolio.propTypes = {
    onClose: PropTypes.func
};

export default NewLinkFolio;
