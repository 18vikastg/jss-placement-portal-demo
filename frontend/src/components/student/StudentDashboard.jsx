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
    Star
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const StudentDashboard = () => {
    const { user } = useSelector(store => store.auth)
    const [stats, setStats] = useState({
        activeApplications: 5,
        upcomingInterviews: 2,
        completedDrives: 3,
        notifications: 8
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-8 mb-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                Welcome back, {user?.fullname || 'Student'}! 👋
                            </h1>
                            <p className="text-red-100 text-lg">
                                Ready to accelerate your placement journey with PrepLink?
                            </p>
                            <div className="mt-4 flex items-center gap-4">
                                <Badge className="bg-white text-red-600 text-sm font-medium">
                                    📚 Final Year
                                </Badge>
                                <Badge className="bg-white text-red-600 text-sm font-medium">
                                    💻 Computer Science
                                </Badge>
                                <Badge className="bg-white text-red-600 text-sm font-medium">
                                    🎯 CGPA: 8.5
                                </Badge>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                                <User className="w-12 h-12 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Active Applications</p>
                                    <p className="text-3xl font-bold text-blue-600">{stats.activeApplications}</p>
                                </div>
                                <Briefcase className="w-10 h-10 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Upcoming Interviews</p>
                                    <p className="text-3xl font-bold text-orange-600">{stats.upcomingInterviews}</p>
                                </div>
                                <Calendar className="w-10 h-10 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Completed Drives</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.completedDrives}</p>
                                </div>
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">New Notifications</p>
                                    <p className="text-3xl font-bold text-red-600">{stats.notifications}</p>
                                </div>
                                <Bell className="w-10 h-10 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Actions */}
                        <Card className="bg-white shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="w-5 h-5 text-red-600" />
                                    Quick Actions
                                </CardTitle>
                                <CardDescription>
                                    Fast access to key placement activities
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Button className="h-20 flex flex-col items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
                                        <Briefcase className="w-6 h-6" />
                                        <span className="text-sm">Browse Jobs</span>
                                    </Button>
                                    <Button className="h-20 flex flex-col items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200">
                                        <User className="w-6 h-6" />
                                        <span className="text-sm">Update Profile</span>
                                    </Button>
                                    <Button className="h-20 flex flex-col items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200">
                                        <BookOpen className="w-6 h-6" />
                                        <span className="text-sm">Practice Tests</span>
                                    </Button>
                                    <Button className="h-20 flex flex-col items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200">
                                        <Award className="w-6 h-6" />
                                        <span className="text-sm">Certificates</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upcoming Placement Drives */}
                        <Card className="bg-white shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-red-600" />
                                    Upcoming Placement Drives
                                </CardTitle>
                                <CardDescription>
                                    Don't miss these exciting opportunities
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {upcomingDrives.map((drive) => (
                                        <div key={drive.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                                                        {drive.company.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">{drive.company}</h3>
                                                        <p className="text-gray-600">{drive.role}</p>
                                                        <div className="flex items-center gap-4 mt-1">
                                                            <Badge variant="outline" className="text-green-600 border-green-200">
                                                                ₹{drive.package}
                                                            </Badge>
                                                            <span className="text-sm text-gray-500">
                                                                Min CGPA: {drive.eligibility}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">Deadline</p>
                                                    <p className="font-semibold text-red-600">{drive.deadline}</p>
                                                    <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                                                        Apply Now
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Recent Notifications */}
                        <Card className="bg-white shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-red-600" />
                                    Recent Updates
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {recentNotifications.map((notification) => (
                                        <div key={notification.id} className="border-l-4 border-red-200 pl-3 py-2">
                                            <p className="text-sm text-gray-800">{notification.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full mt-4">
                                    View All Notifications
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Links */}
                        <Card className="bg-white shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-red-600" />
                                    Quick Links
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Button variant="ghost" className="w-full justify-start">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Resume Builder
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Users className="w-4 h-4 mr-2" />
                                        Alumni Network
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                        Placement Statistics
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Clock className="w-4 h-4 mr-2" />
                                        Interview Schedule
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Placement Progress */}
                        <Card className="bg-white shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-red-600" />
                                    Your Progress
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm">
                                            <span>Profile Completion</span>
                                            <span>85%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm">
                                            <span>Applications Sent</span>
                                            <span>5/10</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '50%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm">
                                            <span>Skill Assessment</span>
                                            <span>70%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div className="bg-purple-600 h-2 rounded-full" style={{width: '70%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard
