import { useState, useEffect } from 'react'
import Navbar from '../shared/NavbarNew'
import { useSelector } from 'react-redux'
import { 
    Users, 
    GraduationCap, 
    Briefcase, 
    TrendingUp,
    Calendar,
    Award,
    Search,
    Filter,
    Download,
    Eye,
    Mail,
    Phone,
    MapPin,
    Building2,
    BookOpen,
    CheckCircle,
    Clock,
    AlertCircle,
    Star,
    BarChart3,
    PieChart
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Avatar, AvatarImage } from '../ui/avatar'
import { 
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'

const FacultyDashboard = () => {
    const { user } = useSelector(store => store.auth)
    const [activeTab, setActiveTab] = useState('overview')
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')

    // Mock data - in real app, this would come from API
    const [dashboardStats, setDashboardStats] = useState({
        totalStudents: 120,
        placedStudents: 78,
        activeApplications: 156,
        upcomingInterviews: 23,
        averageCGPA: 7.8,
        placementRate: 65
    })

    const [students, setStudents] = useState([
        {
            _id: '1',
            fullname: 'Arjun Sharma',
            email: 'arjun@jssate.ac.in',
            phoneNumber: '9876543210',
            profile: {
                usn: '1JS22CS001',
                branch: 'Computer Science',
                batch: '2025',
                semester: 8,
                cgpa: 8.5,
                profilePhoto: 'https://github.com/shadcn.png',
                skills: ['JavaScript', 'React', 'Node.js', 'Python'],
                projects: 3,
                internships: 2
            },
            placementStatus: 'Placed',
            company: 'Google',
            package: '45 LPA',
            applicationCount: 8,
            interviewsAttended: 5
        },
        {
            _id: '2',
            fullname: 'Priya Patel',
            email: 'priya@jssate.ac.in',
            phoneNumber: '9876543211',
            profile: {
                usn: '1JS22CS002',
                branch: 'Computer Science',
                batch: '2025',
                semester: 8,
                cgpa: 9.1,
                profilePhoto: 'https://github.com/shadcn.png',
                skills: ['Java', 'Spring Boot', 'MySQL', 'React'],
                projects: 4,
                internships: 1
            },
            placementStatus: 'Interviewing',
            company: 'Microsoft',
            package: 'TBD',
            applicationCount: 12,
            interviewsAttended: 7
        },
        {
            _id: '3',
            fullname: 'Rahul Kumar',
            email: 'rahul@jssate.ac.in',
            phoneNumber: '9876543212',
            profile: {
                usn: '1JS22CS003',
                branch: 'Computer Science',
                batch: '2025',
                semester: 8,
                cgpa: 7.8,
                profilePhoto: 'https://github.com/shadcn.png',
                skills: ['Python', 'Django', 'PostgreSQL'],
                projects: 2,
                internships: 1
            },
            placementStatus: 'Applying',
            company: null,
            package: null,
            applicationCount: 5,
            interviewsAttended: 2
        }
    ])

    const [recentActivities, setRecentActivities] = useState([
        {
            id: 1,
            student: 'Arjun Sharma',
            activity: 'Got placed at Google',
            time: '2 hours ago',
            type: 'placement'
        },
        {
            id: 2,
            student: 'Priya Patel',
            activity: 'Interview scheduled with Microsoft',
            time: '1 day ago',
            type: 'interview'
        },
        {
            id: 3,
            student: 'Rahul Kumar',
            activity: 'Applied to TCS placement drive',
            time: '2 days ago',
            type: 'application'
        },
        {
            id: 4,
            student: 'Sneha Reddy',
            activity: 'Updated profile with new project',
            time: '3 days ago',
            type: 'profile'
        }
    ])

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             student.profile.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             student.profile.branch.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesFilter = filterStatus === 'all' || student.placementStatus.toLowerCase() === filterStatus.toLowerCase()
        
        return matchesSearch && matchesFilter
    })

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Placed':
                return <Badge className="bg-green-100 text-green-800">Placed</Badge>
            case 'Interviewing':
                return <Badge className="bg-blue-100 text-blue-800">Interviewing</Badge>
            case 'Applying':
                return <Badge className="bg-yellow-100 text-yellow-800">Applying</Badge>
            default:
                return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
        }
    }

    const getActivityIcon = (type) => {
        switch (type) {
            case 'placement':
                return <Award className="w-4 h-4 text-green-600" />
            case 'interview':
                return <Calendar className="w-4 h-4 text-blue-600" />
            case 'application':
                return <Briefcase className="w-4 h-4 text-orange-600" />
            case 'profile':
                return <Users className="w-4 h-4 text-purple-600" />
            default:
                return <Clock className="w-4 h-4 text-gray-600" />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Faculty Welcome Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8 text-white">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                                Faculty Dashboard - {user?.fullname || 'Faculty'}
                            </h1>
                            <p className="text-blue-100 text-base sm:text-lg mb-4">
                                Monitor student progress and placement activities
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                <Badge className="bg-white text-blue-600 text-xs sm:text-sm font-medium">
                                    📚 Placement Coordinator
                                </Badge>
                                <Badge className="bg-white text-blue-600 text-xs sm:text-sm font-medium">
                                    🏛️ JSS Academy
                                </Badge>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center">
                                <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6 mb-6 sm:mb-8">
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Total Students</p>
                                    <p className="text-xl sm:text-2xl font-bold text-blue-600">{dashboardStats.totalStudents}</p>
                                </div>
                                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Placed</p>
                                    <p className="text-xl sm:text-2xl font-bold text-green-600">{dashboardStats.placedStudents}</p>
                                </div>
                                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Applications</p>
                                    <p className="text-xl sm:text-2xl font-bold text-orange-600">{dashboardStats.activeApplications}</p>
                                </div>
                                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Interviews</p>
                                    <p className="text-xl sm:text-2xl font-bold text-purple-600">{dashboardStats.upcomingInterviews}</p>
                                </div>
                                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Avg CGPA</p>
                                    <p className="text-xl sm:text-2xl font-bold text-indigo-600">{dashboardStats.averageCGPA}</p>
                                </div>
                                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Placement %</p>
                                    <p className="text-xl sm:text-2xl font-bold text-red-600">{dashboardStats.placementRate}%</p>
                                </div>
                                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <Button 
                        onClick={() => setActiveTab('overview')}
                        variant={activeTab === 'overview' ? 'default' : 'outline'}
                        className={activeTab === 'overview' ? 'bg-blue-600 text-white' : ''}
                    >
                        Overview
                    </Button>
                    <Button 
                        onClick={() => setActiveTab('students')}
                        variant={activeTab === 'students' ? 'default' : 'outline'}
                        className={activeTab === 'students' ? 'bg-blue-600 text-white' : ''}
                    >
                        Students
                    </Button>
                    <Button 
                        onClick={() => setActiveTab('analytics')}
                        variant={activeTab === 'analytics' ? 'default' : 'outline'}
                        className={activeTab === 'analytics' ? 'bg-blue-600 text-white' : ''}
                    >
                        Analytics
                    </Button>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Recent Student Activities */}
                        <Card className="bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-600" />
                                    Recent Student Activities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        {getActivityIcon(activity.type)}
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                <span className="font-semibold">{activity.student}</span> - {activity.activity}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" className="w-full">
                                    View All Activities
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-blue-600" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export Student Data
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Notifications
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Schedule Events
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <BarChart3 className="w-4 h-4 mr-2" />
                                    Generate Reports
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'students' && (
                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    Student Management
                                </CardTitle>
                                <div className="flex flex-wrap gap-2">
                                    <div className="relative">
                                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            placeholder="Search students..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 w-64"
                                        />
                                    </div>
                                    <select 
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="px-3 py-2 border rounded-md text-sm"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="placed">Placed</option>
                                        <option value="interviewing">Interviewing</option>
                                        <option value="applying">Applying</option>
                                    </select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Student</TableHead>
                                            <TableHead>USN</TableHead>
                                            <TableHead>Branch</TableHead>
                                            <TableHead>CGPA</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Company</TableHead>
                                            <TableHead>Applications</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredStudents.map((student) => (
                                            <TableRow key={student._id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={student.profile.profilePhoto} alt={student.fullname} />
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{student.fullname}</div>
                                                            <div className="text-sm text-gray-500">{student.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-mono text-sm">{student.profile.usn}</TableCell>
                                                <TableCell>{student.profile.branch}</TableCell>
                                                <TableCell>
                                                    <span className="font-semibold">{student.profile.cgpa}</span>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(student.placementStatus)}</TableCell>
                                                <TableCell>
                                                    {student.company ? (
                                                        <div>
                                                            <div className="font-medium">{student.company}</div>
                                                            {student.package && (
                                                                <div className="text-sm text-green-600">{student.package}</div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">Not placed</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-center">
                                                        <div className="font-semibold">{student.applicationCount}</div>
                                                        <div className="text-xs text-gray-500">applications</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="outline">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="sm" variant="outline">
                                                            <Mail className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'analytics' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        <Card className="bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChart className="w-5 h-5 text-blue-600" />
                                    Placement Statistics
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Placed Students</span>
                                            <span>{dashboardStats.placedStudents}/{dashboardStats.totalStudents}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-green-600 h-3 rounded-full transition-all duration-300" 
                                                style={{ width: `${dashboardStats.placementRate}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Active Applications</span>
                                            <span>{dashboardStats.activeApplications}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-orange-600 h-3 rounded-full" style={{ width: '70%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span>Interview Success Rate</span>
                                            <span>75%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-blue-600" />
                                    Branch-wise Performance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Computer Science</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">85%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Information Science</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">78%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Electronics</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">72%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Mechanical</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">68%</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FacultyDashboard
