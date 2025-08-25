import { useState, useEffect } from 'react'
import Navbar from '../shared/NavbarNew'
import { useSelector } from 'react-redux'
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

const StudentDashboard = () => {
    const { user } = useSelector(store => store.auth)
    const [stats, setStats] = useState({
        activeApplications: 5,
        upcomingInterviews: 2,
        completedDrives: 3,
        notifications: 8
    })

    // Profile completion state
    const [profileCompletion, setProfileCompletion] = useState(45) // Mock completion percentage
    const [showProfileWizard, setShowProfileWizard] = useState(false)

    // Quick actions modal states
    const [showPersonalForm, setShowPersonalForm] = useState(false)
    const [showAcademicForm, setShowAcademicForm] = useState(false)
    const [showSkillsForm, setShowSkillsForm] = useState(false)

    // Form data states
    const [personalData, setPersonalData] = useState({
        usn: '',
        phone: '',
        address: '',
        dateOfBirth: ''
    })

    const [academicData, setAcademicData] = useState({
        branch: '',
        semester: '',
        cgpa: '',
        tenthMarks: '',
        twelfthMarks: ''
    })

    const [skillsData, setSkillsData] = useState({
        technicalSkills: '',
        projects: '',
        internships: ''
    })

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

    const handlePersonalSubmit = (e) => {
        e.preventDefault()
        console.log('Personal Data:', personalData)
        setShowPersonalForm(false)
        setProfileCompletion(prev => Math.min(prev + 15, 100))
    }

    const handleAcademicSubmit = (e) => {
        e.preventDefault()
        console.log('Academic Data:', academicData)
        setShowAcademicForm(false)
        setProfileCompletion(prev => Math.min(prev + 20, 100))
    }

    const handleSkillsSubmit = (e) => {
        e.preventDefault()
        console.log('Skills Data:', skillsData)
        setShowSkillsForm(false)
        setProfileCompletion(prev => Math.min(prev + 25, 100))
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
                                <Badge className="bg-white text-red-600 text-xs sm:text-sm font-medium">
                                    📚 Final Year
                                </Badge>
                                <Badge className="bg-white text-red-600 text-xs sm:text-sm font-medium">
                                    💻 Computer Science
                                </Badge>
                                <Badge className="bg-white text-red-600 text-xs sm:text-sm font-medium">
                                    🎯 CGPA: 8.5
                                </Badge>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Completion Alert - Responsive */}
                {profileCompletion < 80 && (
                    <Card className="mb-6 sm:mb-8 border-l-4 border-l-orange-500 bg-orange-50">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertCircle className="w-5 h-5 text-orange-600" />
                                        <h3 className="font-semibold text-orange-800">Complete Your Profile</h3>
                                    </div>
                                    <p className="text-orange-700 text-sm sm:text-base mb-3">
                                        Your profile is {profileCompletion}% complete. Add more details to increase your placement opportunities!
                                    </p>
                                    <div className="w-full bg-orange-200 rounded-full h-3 mb-3">
                                        <div 
                                            className="bg-orange-600 h-3 rounded-full transition-all duration-300" 
                                            style={{ width: `${profileCompletion}%` }}
                                        ></div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                                        <Button 
                                            onClick={() => setShowPersonalForm(true)}
                                            variant="outline" 
                                            size="sm" 
                                            className="text-orange-700 border-orange-300 hover:bg-orange-100 text-xs sm:text-sm"
                                        >
                                            <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            Personal Info
                                        </Button>
                                        <Button 
                                            onClick={() => setShowAcademicForm(true)}
                                            variant="outline" 
                                            size="sm" 
                                            className="text-orange-700 border-orange-300 hover:bg-orange-100 text-xs sm:text-sm"
                                        >
                                            <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            Academic Details
                                        </Button>
                                        <Button 
                                            onClick={() => setShowSkillsForm(true)}
                                            variant="outline" 
                                            size="sm" 
                                            className="text-orange-700 border-orange-300 hover:bg-orange-100 text-xs sm:text-sm"
                                        >
                                            <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                            Skills & Projects
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

                {/* Main Content Grid - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Quick Actions - Enhanced */}
                        <Card className="bg-white shadow-lg">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                                    Quick Actions
                                </CardTitle>
                                <CardDescription className="text-sm sm:text-base">
                                    Complete your profile and take action on your placement journey
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <Button 
                                        onClick={() => setShowPersonalForm(true)}
                                        className="bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 p-4 h-auto"
                                    >
                                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <div className="text-left">
                                            <div className="font-medium text-sm sm:text-base">Update Personal Info</div>
                                            <div className="text-xs opacity-90">Contact details, USN</div>
                                        </div>
                                    </Button>

                                    <Button 
                                        onClick={() => setShowAcademicForm(true)}
                                        variant="outline" 
                                        className="border-red-200 text-red-700 hover:bg-red-50 flex items-center justify-center gap-2 p-4 h-auto"
                                    >
                                        <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <div className="text-left">
                                            <div className="font-medium text-sm sm:text-base">Academic Details</div>
                                            <div className="text-xs opacity-70">CGPA, Marks, Branch</div>
                                        </div>
                                    </Button>

                                    <Button 
                                        onClick={() => setShowSkillsForm(true)}
                                        variant="outline" 
                                        className="border-red-200 text-red-700 hover:bg-red-50 flex items-center justify-center gap-2 p-4 h-auto"
                                    >
                                        <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <div className="text-left">
                                            <div className="font-medium text-sm sm:text-base">Skills & Projects</div>
                                            <div className="text-xs opacity-70">Technical skills, Projects</div>
                                        </div>
                                    </Button>

                                    <Button 
                                        variant="outline" 
                                        className="border-red-200 text-red-700 hover:bg-red-50 flex items-center justify-center gap-2 p-4 h-auto"
                                    >
                                        <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <div className="text-left">
                                            <div className="font-medium text-sm sm:text-base">Upload Resume</div>
                                            <div className="text-xs opacity-70">PDF format preferred</div>
                                        </div>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upcoming Placement Drives */}
                        <Card className="bg-white shadow-lg">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                    <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                    Upcoming Placement Drives
                                </CardTitle>
                                <CardDescription className="text-sm sm:text-base">
                                    Don&apos;t miss these exciting opportunities
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {upcomingDrives.map((drive) => (
                                    <div key={drive.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <Briefcase className="w-6 h-6 text-gray-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-sm sm:text-base">{drive.company}</h4>
                                                    <p className="text-gray-600 text-xs sm:text-sm">{drive.role}</p>
                                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                                        <Badge className="bg-green-100 text-green-800 text-xs">
                                                            {drive.package}
                                                        </Badge>
                                                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                                                            Min {drive.eligibility}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500">Deadline</p>
                                                    <p className="text-sm font-medium">{drive.deadline}</p>
                                                </div>
                                                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs">
                                                    Apply Now
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

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
