import { useState, useEffect, useCallback } from 'react'
import Navbar from '../shared/NavbarNew'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import useGetProfile from '@/hooks/useGetProfile'
import useUpdateProfile from '@/hooks/useUpdateProfile'
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
import { Progress } from '../ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

// Import form components
import PersonalInfoForm from '../profile/PersonalInfoForm'
import AcademicInfoForm from '../profile/AcademicInfoForm'
import SkillsProjectsForm from '../profile/SkillsProjectsForm'
import DocumentsForm from '../profile/DocumentsForm'
import PlacementPreferencesForm from '../profile/PlacementPreferencesForm'

const StudentDashboardPreplink = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    
    // Use custom hooks for profile management
    const { loading: profileLoading } = useGetProfile()
    const { 
        updatePersonalInfo, 
        updateAcademicInfo, 
        updateSkillsAndProjects, 
        updatePlacementPreferences,
        uploadDocument,
        loading: updateLoading 
    } = useUpdateProfile()

    // Enhanced profile completion calculation for Preplink (5 sections, 20% each)
    const calculateProfileCompletion = useCallback(() => {
        const profile = user?.profile || {}
        
        // Use backend calculation if available
        if (profile.profileCompletion !== undefined) {
            return profile.profileCompletion
        }
        
        // Fallback calculation
        let completion = 0
        
        // Section 1: Personal Information (20%)
        const personalInfo = profile.personalInfo || {}
        const personalFields = [
            personalInfo.usn, 
            personalInfo.dateOfBirth, 
            personalInfo.address?.current, 
            personalInfo.gender
        ]
        const personalCompleted = personalFields.filter(field => field && field !== '').length
        completion += (personalCompleted / personalFields.length) * 20
        
        // Section 2: Academic Information (20%) 
        const academicInfo = profile.academicInfo || {}
        const academicFields = [
            academicInfo.department,
            academicInfo.semester,
            academicInfo.cgpa,
            academicInfo.tenthMarks?.percentage,
            academicInfo.twelfthMarks?.percentage
        ]
        const academicCompleted = academicFields.filter(field => field !== undefined && field !== null && field !== '').length
        completion += (academicCompleted / academicFields.length) * 20
        
        // Section 3: Skills & Projects (20%)
        const skillsInfo = profile.skillsAndProjects || {}
        const skillsHasContent = (
            (skillsInfo.programmingLanguages?.length > 0 ? 1 : 0) +
            (skillsInfo.projects?.length > 0 ? 1 : 0) +
            (skillsInfo.frameworks?.length > 0 ? 1 : 0)
        )
        completion += Math.min(skillsHasContent / 3, 1) * 20
        
        // Section 4: Documents (20%)
        const documents = profile.documents || {}
        const documentsFields = [
            documents.resume?.fileUrl,
            documents.profilePicture?.fileUrl
        ]
        const documentsCompleted = documentsFields.filter(field => field && field !== '').length
        completion += (documentsCompleted / documentsFields.length) * 20
        
        // Section 5: Placement Preferences (20%)
        const preferences = profile.placementPreferences || {}
        const preferencesFields = [
            preferences.interestedDomains?.length > 0,
            preferences.locationPreferences?.length > 0,
            preferences.expectedSalary?.min
        ]
        const preferencesCompleted = preferencesFields.filter(field => field).length
        completion += (preferencesCompleted / preferencesFields.length) * 20
        
        return Math.round(completion)
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

    // Profile completion state
    const [profileCompletion, setProfileCompletion] = useState(0)

    // Form modal states
    const [showPersonalForm, setShowPersonalForm] = useState(false)
    const [showAcademicForm, setShowAcademicForm] = useState(false)
    const [showSkillsForm, setShowSkillsForm] = useState(false)
    const [showResumeForm, setShowResumeForm] = useState(false)
    const [showPreferencesForm, setShowPreferencesForm] = useState(false)

    // Enhanced form handlers with toast notifications
    const handlePersonalInfoUpdate = async (data) => {
        try {
            await updatePersonalInfo(data)
            toast.success('Personal information updated successfully!')
        } catch (error) {
            toast.error('Failed to update personal information')
            console.error('Error updating personal info:', error)
        }
    }

    const handleAcademicInfoUpdate = async (data) => {
        try {
            await updateAcademicInfo(data)
            toast.success('Academic information updated successfully!')
        } catch (error) {
            toast.error('Failed to update academic information')
            console.error('Error updating academic info:', error)
        }
    }

    const handleSkillsProjectsUpdate = async (data) => {
        try {
            await updateSkillsAndProjects(data)
            toast.success('Skills & projects updated successfully!')
        } catch (error) {
            toast.error('Failed to update skills and projects')
            console.error('Error updating skills and projects:', error)
        }
    }

    const handleDocumentUpload = async (file, documentType, additionalData = {}) => {
        try {
            await uploadDocument(file, documentType, additionalData)
            toast.success(`${documentType} uploaded successfully!`)
        } catch (error) {
            toast.error(`Failed to upload ${documentType}`)
            console.error('Error uploading document:', error)
        }
    }

    const handlePlacementPreferencesUpdate = async (data) => {
        try {
            await updatePlacementPreferences(data)
            toast.success('Placement preferences updated successfully!')
        } catch (error) {
            toast.error('Failed to update placement preferences')
            console.error('Error updating placement preferences:', error)
        }
    }

    // Update profile completion when component mounts or user data changes
    useEffect(() => {
        setProfileCompletion(calculateProfileCompletion())
    }, [user, calculateProfileCompletion])

    // Mock data for placement drives
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8 text-white">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                                🎓 Welcome to Preplink, {user?.fullname || 'Student'}!
                            </h1>
                            <p className="text-blue-100 text-base sm:text-lg mb-4">
                                {profileCompletion === 0 
                                    ? "Let's build your placement profile to unlock opportunities" 
                                    : profileCompletion === 100 
                                    ? "🎉 You're ready for placements! Explore opportunities below."
                                    : "Keep going! Complete your profile to unlock all features."
                                }
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                <Badge className={`text-xs sm:text-sm font-medium ${user?.profile?.semester ? 'bg-white text-blue-600' : 'bg-white/20 text-white border border-white/40'}`}>
                                    📚 {user?.profile?.semester ? `Semester ${user.profile.semester}` : 'Add Semester'}
                                </Badge>
                                <Badge className={`text-xs sm:text-sm font-medium ${user?.profile?.branch ? 'bg-white text-blue-600' : 'bg-white/20 text-white border border-white/40'}`}>
                                    💻 {user?.profile?.branch || 'Add Branch'}
                                </Badge>
                                <Badge className={`text-xs sm:text-sm font-medium ${user?.profile?.cgpa ? 'bg-white text-blue-600' : 'bg-white/20 text-white border border-white/40'}`}>
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

                {/* Profile Completion Progress */}
                <Card className="bg-white shadow-lg mb-6 sm:mb-8">
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
                            <Progress value={profileCompletion} className="h-3" />
                            {profileCompletion === 100 && (
                                <p className="text-green-600 text-sm font-medium">🎉 Profile Complete! You&apos;re ready for placements!</p>
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
                    <Card className="bg-white shadow-lg mb-6 sm:mb-8">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                🎉 Active Placement Opportunities
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base">
                                Your profile is complete. Apply to these amazing opportunities!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
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

                            {/* Active Drives */}
                            {upcomingDrives.map((drive) => (
                                <div key={drive.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Briefcase className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sm sm:text-base">{drive.company}</h4>
                                                <p className="text-gray-600 text-xs sm:text-sm">{drive.role}</p>
                                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                                    <Badge className="bg-green-100 text-green-800 text-xs">
                                                        💰 {drive.package}
                                                    </Badge>
                                                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                                                        📊 Min {drive.eligibility}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">Deadline</p>
                                                <p className="text-sm font-medium">{drive.deadline}</p>
                                            </div>
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                                                Apply Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Quick Actions for Incomplete Profiles */}
                {profileCompletion < 100 && (
                    <Card className="bg-white shadow-lg">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                                Next Steps
                            </CardTitle>
                            <CardDescription className="text-sm sm:text-base">
                                Complete these sections to unlock placement opportunities
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {getSectionCompletion().personal !== 20 && (
                                <Button 
                                    onClick={() => setShowPersonalForm(true)}
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full justify-start text-xs sm:text-sm border-blue-200 hover:bg-blue-50"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Complete Personal Information
                                </Button>
                            )}
                            {getSectionCompletion().academic !== 20 && (
                                <Button 
                                    onClick={() => setShowAcademicForm(true)}
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full justify-start text-xs sm:text-sm border-blue-200 hover:bg-blue-50"
                                >
                                    <GraduationCap className="w-4 h-4 mr-2" />
                                    Add Academic Details
                                </Button>
                            )}
                            {getSectionCompletion().skills !== 20 && (
                                <Button 
                                    onClick={() => setShowSkillsForm(true)}
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full justify-start text-xs sm:text-sm border-blue-200 hover:bg-blue-50"
                                >
                                    <Code className="w-4 h-4 mr-2" />
                                    Add Skills & Projects
                                </Button>
                            )}
                            {getSectionCompletion().resume !== 20 && (
                                <Button 
                                    onClick={() => setShowResumeForm(true)}
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full justify-start text-xs sm:text-sm border-blue-200 hover:bg-blue-50"
                                >
                                    <FileText className="w-4 h-4 mr-2" />
                                    Upload Resume
                                </Button>
                            )}
                            {getSectionCompletion().preferences !== 20 && (
                                <Button 
                                    onClick={() => setShowPreferencesForm(true)}
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full justify-start text-xs sm:text-sm border-blue-200 hover:bg-blue-50"
                                >
                                    <Target className="w-4 h-4 mr-2" />
                                    Set Placement Preferences
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Modals would go here - for now just placeholders */}
            {showPersonalForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Personal Information
                                <Button variant="ghost" size="sm" onClick={() => setShowPersonalForm(false)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Personal information form would go here...</p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Add other modals similarly */}
            
            {/* Form Modals */}
            <PersonalInfoForm
                isOpen={showPersonalForm}
                onClose={() => setShowPersonalForm(false)}
                user={user}
                onUpdate={handlePersonalInfoUpdate}
                loading={updateLoading}
            />
            
            <AcademicInfoForm
                isOpen={showAcademicForm}
                onClose={() => setShowAcademicForm(false)}
                user={user}
                onUpdate={handleAcademicInfoUpdate}
                loading={updateLoading}
            />
            
            <SkillsProjectsForm
                isOpen={showSkillsForm}
                onClose={() => setShowSkillsForm(false)}
                user={user}
                onUpdate={handleSkillsProjectsUpdate}
                loading={updateLoading}
            />
            
            <DocumentsForm
                isOpen={showResumeForm}
                onClose={() => setShowResumeForm(false)}
                user={user}
                onUpdate={handleDocumentUpload}
                loading={updateLoading}
            />
            
            <PlacementPreferencesForm
                isOpen={showPreferencesForm}
                onClose={() => setShowPreferencesForm(false)}
                user={user}
                onUpdate={handlePlacementPreferencesUpdate}
                loading={updateLoading}
            />
        </div>
    )
}

export default StudentDashboardPreplink
