import { useState, useEffect, useCallback } from 'react'
import Navbar from '../shared/NavbarNew'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { 
    User, 
    FileText, 
    Briefcase, 
    Bell, 
    TrendingUp,
    Calendar,
    Target,
    Award,
    BookOpen,
    Users,
    Clock,
    CheckCircle,
    AlertCircle,
    Star,
    Edit,
    Plus,
    ArrowRight,
    GraduationCap,
    Code,
    Phone,
    Mail,
    MapPin,
    Upload,
    X
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { PROFILE_API_END_POINT } from '@/utils/constants'

const StudentDashboard = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [stats, setStats] = useState({
        activeApplications: 0,
        upcomingInterviews: 0,
        completedDrives: 0,
        notifications: 1 // Keep at least 1 for profile completion notification
    })

    // Form data states - initialize empty for new users
    const [personalData, setPersonalData] = useState({
        usn: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        department: '',
        year: ''
    })

    const [academicData, setAcademicData] = useState({
        branch: '',
        semester: '',
        cgpa: '',
        tenthMarks: '',
        twelfthMarks: '',
        backlogs: '',
        achievements: ''
    })

    const [skillsData, setSkillsData] = useState({
        technicalSkills: '',
        projects: '',
        internships: '',
        certifications: ''
    })

    const [preferencesData, setPreferencesData] = useState({
        preferredDomains: '',
        locationPreferences: '',
        expectedSalary: ''
    })

    // Resume upload state
    const [resumeFile, setResumeFile] = useState(null)
    const [resumeUploading, setResumeUploading] = useState(false)

    // Enhanced profile completion calculation for Preplink (5 sections, 20% each)
    const calculateProfileCompletion = useCallback(() => {
        let completion = 0
        const profile = user?.profile || {}
        
        // Section 1: Personal Information (20%)
        const personalFields = [user?.fullname, user?.email, user?.phoneNumber, profile?.studentId, profile?.branch, profile?.semester]
        const personalCompleted = personalFields.filter(field => field && field !== '').length
        if (personalCompleted >= 5) completion += 20
        
        // Section 2: Academic Information (20%) 
        const academicFields = [profile?.cgpa, profile?.tenthMarks, profile?.twelfthMarks]
        const academicCompleted = academicFields.filter(field => field && field !== '').length
        if (academicCompleted >= 3) completion += 20
        
        // Section 3: Skills & Technical Info (20%)
        const skillsCompleted = (profile?.skills?.length > 0) + 
                              (profile?.projects && profile?.projects !== '') + 
                              (profile?.internships && profile?.internships !== '')
        if (skillsCompleted >= 2) completion += 20
        
        // Section 4: Resume & Documents (20%)
        if (profile?.resume) completion += 20
        
        // Section 5: Placement Preferences (20%) - Optional but recommended
        const preferencesCompleted = (profile?.preferredDomains?.length > 0) + 
                                   (profile?.locationPreferences?.length > 0)
        if (preferencesCompleted >= 1) completion += 20
        
        return completion
    }, [user])

    // Calculate individual section completions for detailed progress
    const getSectionCompletion = useCallback(() => {
        const profile = user?.profile || {}
        
        return {
            personal: user?.fullname && user?.email && user?.phoneNumber && profile?.studentId && profile?.branch && profile?.semester ? 20 : 0,
            academic: profile?.cgpa && profile?.tenthMarks && profile?.twelfthMarks ? 20 : 0,
            skills: ((profile?.skills?.length > 0) + (profile?.projects !== '') + (profile?.internships !== '')) >= 2 ? 20 : 0,
            resume: profile?.resume ? 20 : 0,
            preferences: ((profile?.preferredDomains?.length > 0) + (profile?.locationPreferences?.length > 0)) >= 1 ? 20 : 0
        }
    }, [user])

    // Profile completion state - starts empty for new users
    const [profileCompletion, setProfileCompletion] = useState(0) // Start with 0, will be calculated

    // Quick actions modal states  
    const [showPersonalForm, setShowPersonalForm] = useState(false)
    const [showAcademicForm, setShowAcademicForm] = useState(false)
    const [showSkillsForm, setShowSkillsForm] = useState(false)
    const [showResumeForm, setShowResumeForm] = useState(false)
    const [showPreferencesForm, setShowPreferencesForm] = useState(false)

    // Update profile completion when component mounts or user data changes
    useEffect(() => {
        setProfileCompletion(calculateProfileCompletion())
    }, [user, calculateProfileCompletion])

    // Update stats based on profile completion
    useEffect(() => {
        setStats({
            activeApplications: profileCompletion === 0 ? 0 : 5,
            upcomingInterviews: profileCompletion === 0 ? 0 : 2,
            completedDrives: profileCompletion === 0 ? 0 : 3,
            notifications: profileCompletion === 0 ? 1 : 8
        })
    }, [profileCompletion])

    // Mock data for upcoming drives
    const upcomingDrives = [
        {
            id: 1,
            company: 'Google',
            role: 'Software Engineer',
            package: '45 LPA',
            deadline: '2025-09-15',
            eligibility: '8.0 CGPA',
            logo: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png'
        },
        {
            id: 2,
            company: 'Microsoft',
            role: 'SDE Intern',
            package: '1.2 LPM',
            deadline: '2025-09-20',
            eligibility: '7.5 CGPA',
            logo: 'https://logos-world.net/wp-content/uploads/2020/08/Microsoft-Logo.png'
        }
    ]

    const recentNotifications = [
        {
            id: 1,
            message: 'Google placement drive registration is now open',
            time: '2 hours ago',
            type: 'placement'
        },
        {
            id: 2,
            message: 'Interview scheduled for Amazon on Sept 25, 2025',
            time: '1 day ago',
            type: 'interview'
        },
        {
            id: 3,
            message: 'You have been shortlisted for TCS technical round',
            time: '2 days ago',
            type: 'result'
        }
    ]

    const handlePersonalSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${PROFILE_API_END_POINT}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: personalData.phone,
                    // Note: We'll need to update the backend to handle these fields
                    studentId: personalData.usn,
                    address: personalData.address,
                    dateOfBirth: personalData.dateOfBirth
                }),
                credentials: 'include'
            })
            
            const data = await response.json()
            if (data.success) {
                dispatch(setUser(data.user))
                toast.success('Personal information updated successfully!')
                setShowPersonalForm(false)
                setTimeout(() => setProfileCompletion(calculateProfileCompletion()), 100)
            } else {
                toast.error(data.message || 'Failed to update personal information')
            }
        } catch (error) {
            console.error('Error updating personal info:', error)
            toast.error('Failed to update personal information')
        }
    }

    const handleAcademicSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${PROFILE_API_END_POINT}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Note: We'll need to update the backend to handle these fields
                    branch: academicData.branch,
                    semester: academicData.semester,
                    cgpa: academicData.cgpa,
                    tenthMarks: academicData.tenthMarks,
                    twelfthMarks: academicData.twelfthMarks
                }),
                credentials: 'include'
            })
            
            const data = await response.json()
            if (data.success) {
                dispatch(setUser(data.user))
                toast.success('Academic details updated successfully!')
                setShowAcademicForm(false)
                setTimeout(() => setProfileCompletion(calculateProfileCompletion()), 100)
            } else {
                toast.error(data.message || 'Failed to update academic details')
            }
        } catch (error) {
            console.error('Error updating academic details:', error)
            toast.error('Failed to update academic details')
        }
    }

    const handleSkillsSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${PROFILE_API_END_POINT}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    skills: skillsData.technicalSkills,
                    // Note: We'll need to update the backend to handle these fields
                    projects: skillsData.projects,
                    internships: skillsData.internships
                }),
                credentials: 'include'
            })
            
            const data = await response.json()
            if (data.success) {
                dispatch(setUser(data.user))
                toast.success('Skills and experience updated successfully!')
                setShowSkillsForm(false)
                setTimeout(() => setProfileCompletion(calculateProfileCompletion()), 100)
            } else {
                toast.error(data.message || 'Failed to update skills and experience')
            }
        } catch (error) {
            console.error('Error updating skills:', error)
            toast.error('Failed to update skills and experience')
        }
    }

    const handleResumeUpload = async (file) => {
        if (!file) return
        
        setResumeUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        
        try {
            const response = await fetch(`${PROFILE_API_END_POINT}/update`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
            
            const data = await response.json()
            if (data.success) {
                console.log('Resume uploaded successfully:', data)
                toast.success('Resume uploaded successfully!')
                
                // Update user state with new resume data
                dispatch(setUser(data.user))
                setResumeFile(file)
                setTimeout(() => setProfileCompletion(calculateProfileCompletion()), 100)
            } else {
                console.error('Resume upload failed:', data.message)
                toast.error(data.message || 'Resume upload failed')
            }
        } catch (error) {
            console.error('Resume upload error:', error)
            toast.error('Failed to upload resume. Please try again.')
        } finally {
            setResumeUploading(false)
        }
    }

    const handleResumeFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.type === 'application/pdf') {
                if (file.size <= 5 * 1024 * 1024) { // 5MB limit
                    handleResumeUpload(file)
                } else {
                    toast.error('File size should be less than 5MB')
                }
            } else {
                toast.error('Please select a PDF file')
            }
        }
        // Reset the input value so the same file can be selected again
        e.target.value = ''
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Welcome Header - Responsive */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8 text-white">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                                Welcome back, {user?.fullname || 'Student'}! 👋
                            </h1>
                            <p className="text-red-100 text-base sm:text-lg mb-4">
                                Ready to accelerate your placement journey with PrepLink?
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                <Badge className={`text-xs sm:text-sm font-medium ${user?.profile?.semester ? 'bg-white text-red-600' : 'bg-white/20 text-white border border-white/40'}`}>
                                    📚 {user?.profile?.semester ? `Semester ${user.profile.semester}` : 'Complete Profile'}
                                </Badge>
                                <Badge className={`text-xs sm:text-sm font-medium ${user?.profile?.branch ? 'bg-white text-red-600' : 'bg-white/20 text-white border border-white/40'}`}>
                                    💻 {user?.profile?.branch || 'Add Branch'}
                                </Badge>
                                <Badge className={`text-xs sm:text-sm font-medium ${user?.profile?.cgpa ? 'bg-white text-red-600' : 'bg-white/20 text-white border border-white/40'}`}>
                                    🎯 {user?.profile?.cgpa ? `CGPA: ${user.profile.cgpa}` : 'Add CGPA'}
                                </Badge>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center">
                                {user?.profile?.profilePhoto ? (
                                    <img 
                                        src={user.profile.profilePhoto} 
                                        alt="Profile" 
                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Completion Alert - Always show when incomplete */}
                {profileCompletion < 100 && (
                    <Card className={`mb-6 sm:mb-8 border-l-4 ${profileCompletion === 0 ? 'border-l-red-500 bg-red-50' : 'border-l-orange-500 bg-orange-50'}`}>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertCircle className={`w-5 h-5 ${profileCompletion === 0 ? 'text-red-600' : 'text-orange-600'}`} />
                                        <h3 className={`font-semibold ${profileCompletion === 0 ? 'text-red-800' : 'text-orange-800'}`}>
                                            {profileCompletion === 0 ? 'Setup Your Profile' : 'Complete Your Profile'}
                                        </h3>
                                    </div>
                                    <p className={`${profileCompletion === 0 ? 'text-red-700' : 'text-orange-700'} text-sm sm:text-base mb-3`}>
                                        {profileCompletion === 0 
                                            ? 'Start by adding your personal, academic details and skills to get placement opportunities!'
                                            : `Your profile is ${profileCompletion}% complete. Add more details to increase your placement opportunities!`
                                        }
                                    </p>
                                    <div className={`w-full ${profileCompletion === 0 ? 'bg-red-200' : 'bg-orange-200'} rounded-full h-3 mb-3`}>
                                        <div 
                                            className={`${profileCompletion === 0 ? 'bg-red-600' : 'bg-orange-600'} h-3 rounded-full transition-all duration-300`} 
                                            style={{ width: `${Math.max(profileCompletion, 5)}%` }}
                                        ></div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                                        <Button 
                                            onClick={() => setShowPersonalForm(true)}
                                            variant="outline" 
                                            size="sm" 
                                            className={`${profileCompletion === 0 ? 'text-red-700 border-red-300 hover:bg-red-100' : 'text-orange-700 border-orange-300 hover:bg-orange-100'} text-xs sm:text-sm`}
                                        >
                                            <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            {personalData.usn ? '✓ Personal Info' : 'Personal Info'}
                                        </Button>
                                        <Button 
                                            onClick={() => setShowAcademicForm(true)}
                                            variant="outline" 
                                            size="sm" 
                                            className={`${profileCompletion === 0 ? 'text-red-700 border-red-300 hover:bg-red-100' : 'text-orange-700 border-orange-300 hover:bg-orange-100'} text-xs sm:text-sm`}
                                        >
                                            <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            {academicData.branch ? '✓ Academic Details' : 'Academic Details'}
                                        </Button>
                                        <Button 
                                            onClick={() => setShowSkillsForm(true)}
                                            variant="outline" 
                                            size="sm" 
                                            className={`${profileCompletion === 0 ? 'text-red-700 border-red-300 hover:bg-red-100' : 'text-orange-700 border-orange-300 hover:bg-orange-100'} text-xs sm:text-sm`}
                                        >
                                            <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            {skillsData.technicalSkills ? '✓ Skills & Projects' : 'Skills & Projects'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Quick Stats - Responsive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Active Applications</p>
                                    <p className="text-xl sm:text-3xl font-bold text-blue-600">{stats.activeApplications}</p>
                                </div>
                                <Briefcase className="w-6 h-6 sm:w-10 sm:h-10 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Interviews</p>
                                    <p className="text-xl sm:text-3xl font-bold text-green-600">{stats.upcomingInterviews}</p>
                                </div>
                                <Calendar className="w-6 h-6 sm:w-10 sm:h-10 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Completed</p>
                                    <p className="text-xl sm:text-3xl font-bold text-purple-600">{stats.completedDrives}</p>
                                </div>
                                <CheckCircle className="w-6 h-6 sm:w-10 sm:h-10 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Notifications</p>
                                    <p className="text-xl sm:text-3xl font-bold text-red-600">{stats.notifications}</p>
                                </div>
                                <Bell className="w-6 h-6 sm:w-10 sm:h-10 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Empty Profile Onboarding - Show only when profile is completely empty */}
                {profileCompletion === 0 && (
                    <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-indigo-200">
                        <CardContent className="p-6 sm:p-8 text-center">
                            <div className="max-w-2xl mx-auto">
                                <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <Star className="w-8 h-8 text-indigo-600" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-3">
                                    Welcome to PrepLink! 🎉
                                </h3>
                                <p className="text-indigo-700 mb-6 text-sm sm:text-base">
                                    You&apos;re one step away from unlocking amazing placement opportunities! Complete your profile to get started with personalized job recommendations and company applications.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button 
                                        onClick={() => setShowPersonalForm(true)}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        Start with Personal Info
                                    </Button>
                                    <Button 
                                        onClick={() => setShowAcademicForm(true)}
                                        variant="outline" 
                                        className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                                    >
                                        <GraduationCap className="w-4 h-4 mr-2" />
                                        Add Academic Details
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Main Content - Preplink Profile Completion System */}
                <div className="space-y-6 sm:space-y-8">
                    {/* Profile Completion Progress */}
                    <Card className="bg-white shadow-lg">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                Profile Completion Journey
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base">
                                Complete your profile to unlock placement opportunities
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                                    <span className="text-sm font-bold text-blue-600">{profileCompletion}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${profileCompletion}%` }}
                                    ></div>
                                </div>
                                {profileCompletion === 100 && (
                                    <p className="text-green-600 text-sm font-medium">🎉 Profile Complete! You're ready for placements!</p>
                                )}
                            </div>

                            {/* Section Breakdown */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Personal Information */}
                                <div 
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                        getSectionCompletion().personal === 20 
                                            ? 'border-green-500 bg-green-50' 
                                            : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                                    }`}
                                    onClick={() => setShowPersonalForm(true)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <User className={`w-5 h-5 ${getSectionCompletion().personal === 20 ? 'text-green-600' : 'text-gray-600'}`} />
                                            <span className="font-medium text-sm">Personal Info</span>
                                        </div>
                                        {getSectionCompletion().personal === 20 ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Plus className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">Name, USN, Department, Contact</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${getSectionCompletion().personal === 20 ? 'bg-green-500' : 'bg-gray-300'}`}
                                            style={{ width: `${getSectionCompletion().personal === 20 ? 100 : 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">20% of profile</span>
                                </div>

                                {/* Academic Information */}
                                <div 
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                        getSectionCompletion().academic === 20 
                                            ? 'border-green-500 bg-green-50' 
                                            : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                                    }`}
                                    onClick={() => setShowAcademicForm(true)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <GraduationCap className={`w-5 h-5 ${getSectionCompletion().academic === 20 ? 'text-green-600' : 'text-gray-600'}`} />
                                            <span className="font-medium text-sm">Academic Info</span>
                                        </div>
                                        {getSectionCompletion().academic === 20 ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Plus className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">CGPA, 10th/12th Marks, Achievements</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${getSectionCompletion().academic === 20 ? 'bg-green-500' : 'bg-gray-300'}`}
                                            style={{ width: `${getSectionCompletion().academic === 20 ? 100 : 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">20% of profile</span>
                                </div>

                                {/* Skills & Technical */}
                                <div 
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                        getSectionCompletion().skills === 20 
                                            ? 'border-green-500 bg-green-50' 
                                            : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                                    }`}
                                    onClick={() => setShowSkillsForm(true)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Code className={`w-5 h-5 ${getSectionCompletion().skills === 20 ? 'text-green-600' : 'text-gray-600'}`} />
                                            <span className="font-medium text-sm">Skills & Tech</span>
                                        </div>
                                        {getSectionCompletion().skills === 20 ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Plus className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">Programming, Projects, Internships</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${getSectionCompletion().skills === 20 ? 'bg-green-500' : 'bg-gray-300'}`}
                                            style={{ width: `${getSectionCompletion().skills === 20 ? 100 : 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">20% of profile</span>
                                </div>

                                {/* Resume & Documents */}
                                <div 
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                        getSectionCompletion().resume === 20 
                                            ? 'border-green-500 bg-green-50' 
                                            : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                                    }`}
                                    onClick={() => setShowResumeForm(true)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <FileText className={`w-5 h-5 ${getSectionCompletion().resume === 20 ? 'text-green-600' : 'text-gray-600'}`} />
                                            <span className="font-medium text-sm">Resume & Docs</span>
                                        </div>
                                        {getSectionCompletion().resume === 20 ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Upload className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">Resume PDF, Certificates</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${getSectionCompletion().resume === 20 ? 'bg-green-500' : 'bg-gray-300'}`}
                                            style={{ width: `${getSectionCompletion().resume === 20 ? 100 : 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">20% of profile</span>
                                </div>

                                {/* Placement Preferences */}
                                <div 
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                                        getSectionCompletion().preferences === 20 
                                            ? 'border-green-500 bg-green-50' 
                                            : 'border-gray-300 bg-gray-50 hover:border-blue-400'
                                    }`}
                                    onClick={() => setShowPreferencesForm(true)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Target className={`w-5 h-5 ${getSectionCompletion().preferences === 20 ? 'text-green-600' : 'text-gray-600'}`} />
                                            <span className="font-medium text-sm">Preferences</span>
                                        </div>
                                        {getSectionCompletion().preferences === 20 ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Plus className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">Job Domains, Locations, Salary</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${getSectionCompletion().preferences === 20 ? 'bg-green-500' : 'bg-gray-300'}`}
                                            style={{ width: `${getSectionCompletion().preferences === 20 ? 100 : 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">20% of profile</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Placement Opportunities - Show when profile is complete */}
                    {profileCompletion === 100 && (
                        <Card className="bg-white shadow-lg">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                    🎉 You&apos;re Ready for Placements!
                                </CardTitle>
                                <CardDescription className="text-sm sm:text-base">
                                    Your profile is complete. Explore active opportunities below.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="font-semibold text-green-800">Profile Summary</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-600">Name:</span>
                                            <p className="font-medium">{user?.fullname}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">USN:</span>
                                            <p className="font-medium">{user?.profile?.studentId || 'Not set'}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Branch:</span>
                                            <p className="font-medium">{user?.profile?.branch || 'Not set'}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">CGPA:</span>
                                            <p className="font-medium">{user?.profile?.cgpa || 'Not set'}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                                        variant="outline" 
                                        className="border-red-200 text-red-700 hover:bg-red-50 flex items-center justify-center gap-2 p-4 h-auto"
                                    >
                                        <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <div className="text-left">
                                            <div className="font-medium text-sm sm:text-base">Skills & Projects</div>
                                            <div className="text-xs opacity-70">Technical skills, Projects</div>
                                        </div>
                                    </Button>

                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleResumeFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            id="resume-upload"
                                        />
                                        <Button 
                                            variant="outline" 
                                            className="border-red-200 text-red-700 hover:bg-red-50 flex items-center justify-center gap-2 p-4 h-auto w-full"
                                            disabled={resumeUploading}
                                        >
                                            <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <div className="text-left flex-1">
                                                <div className="font-medium text-sm sm:text-base">
                                                    {resumeUploading ? 'Uploading...' : user?.profile?.resume ? '✓ Resume Uploaded' : 'Upload Resume'}
                                                </div>
                                                <div className="text-xs opacity-70">
                                                    {user?.profile?.resumeOriginalName || 'PDF format preferred (Max 5MB)'}
                                                </div>
                                                {user?.profile?.resume && (
                                                    <a 
                                                        href={user.profile.resume} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-blue-600 hover:underline"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        View Resume →
                                                    </a>
                                                )}
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                    
                    {/* Placement Opportunities - Show when profile is complete */}
                    {profileCompletion === 100 && (
                        <Card className="bg-white shadow-lg">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                    🎉 You&apos;re Ready for Placements!
                                </CardTitle>
                                <CardDescription className="text-sm sm:text-base">
                                    Your profile is complete. Explore active opportunities below.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="font-semibold text-green-800">Profile Summary</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-600">Name:</span>
                                            <p className="font-medium">{user?.fullname}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">USN:</span>
                                            <p className="font-medium">{user?.profile?.studentId || 'Not set'}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Branch:</span>
                                            <p className="font-medium">{user?.profile?.branch || 'Not set'}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">CGPA:</span>
                                            <p className="font-medium">{user?.profile?.cgpa || 'Not set'}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Right Sidebar */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Recent Notifications */}
                        <Card className="bg-white shadow-lg">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                                    Recent Notifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {recentNotifications.map((notification) => (
                                    <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 mb-1">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-gray-500">{notification.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" className="w-full mt-4 text-xs sm:text-sm">
                                    View All Notifications
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Links */}
                        <Card className="bg-white shadow-lg">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                                    Quick Links
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm">
                                    <FileText className="w-4 h-4 mr-2" />
                                    View Applications
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Interview Schedule
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    Placement Resources
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm">
                                    <Users className="w-4 h-4 mr-2" />
                                    Placement Committee
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Personal Information Modal */}
                {showPersonalForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Personal Information
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowPersonalForm(false)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePersonalSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="usn">USN</Label>
                                        <Input
                                            id="usn"
                                            placeholder="e.g., 1JS22CS001"
                                            value={personalData.usn}
                                            onChange={(e) => setPersonalData(prev => ({...prev, usn: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            placeholder="+91 9876543210"
                                            value={personalData.phone}
                                            onChange={(e) => setPersonalData(prev => ({...prev, phone: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            placeholder="Your address"
                                            value={personalData.address}
                                            onChange={(e) => setPersonalData(prev => ({...prev, address: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <Input
                                            id="dob"
                                            type="date"
                                            value={personalData.dateOfBirth}
                                            onChange={(e) => setPersonalData(prev => ({...prev, dateOfBirth: e.target.value}))}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                                        Save Personal Information
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Academic Information Modal */}
                {showAcademicForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Academic Details
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowAcademicForm(false)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleAcademicSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="branch">Branch</Label>
                                        <Input
                                            id="branch"
                                            placeholder="e.g., Computer Science Engineering"
                                            value={academicData.branch}
                                            onChange={(e) => setAcademicData(prev => ({...prev, branch: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="semester">Current Semester</Label>
                                        <Input
                                            id="semester"
                                            placeholder="e.g., 6"
                                            value={academicData.semester}
                                            onChange={(e) => setAcademicData(prev => ({...prev, semester: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="cgpa">Current CGPA</Label>
                                        <Input
                                            id="cgpa"
                                            placeholder="e.g., 8.5"
                                            value={academicData.cgpa}
                                            onChange={(e) => setAcademicData(prev => ({...prev, cgpa: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="tenthMarks">10th Marks (%)</Label>
                                        <Input
                                            id="tenthMarks"
                                            placeholder="e.g., 85.5"
                                            value={academicData.tenthMarks}
                                            onChange={(e) => setAcademicData(prev => ({...prev, tenthMarks: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="twelfthMarks">12th/Diploma Marks (%)</Label>
                                        <Input
                                            id="twelfthMarks"
                                            placeholder="e.g., 90.2"
                                            value={academicData.twelfthMarks}
                                            onChange={(e) => setAcademicData(prev => ({...prev, twelfthMarks: e.target.value}))}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                                        Save Academic Details
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Skills Information Modal */}
                {showSkillsForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    Skills & Projects
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowSkillsForm(false)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSkillsSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="technicalSkills">Technical Skills</Label>
                                        <Input
                                            id="technicalSkills"
                                            placeholder="e.g., JavaScript, Python, React"
                                            value={skillsData.technicalSkills}
                                            onChange={(e) => setSkillsData(prev => ({...prev, technicalSkills: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="projects">Projects</Label>
                                        <Input
                                            id="projects"
                                            placeholder="Brief description of your projects"
                                            value={skillsData.projects}
                                            onChange={(e) => setSkillsData(prev => ({...prev, projects: e.target.value}))}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="internships">Internships/Experience</Label>
                                        <Input
                                            id="internships"
                                            placeholder="Internship details"
                                            value={skillsData.internships}
                                            onChange={(e) => setSkillsData(prev => ({...prev, internships: e.target.value}))}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                                        Save Skills & Projects
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentDashboard
