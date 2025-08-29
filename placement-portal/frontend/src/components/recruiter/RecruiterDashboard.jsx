import { useState, useEffect } from 'react'
import Navbar from '../shared/NavbarNew'
import { useSelector } from 'react-redux'
import { 
    Users, 
    Search, 
    Filter,
    Download,
    Eye,
    Mail,
    Phone,
    MapPin,
    Building2,
    GraduationCap,
    Award,
    Star,
    CheckCircle,
    Calendar,
    Briefcase,
    TrendingUp,
    BookOpen,
    Code,
    Heart,
    MessageCircle
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

const RecruiterDashboard = () => {
    const { user } = useSelector(store => store.auth)
    const [activeTab, setActiveTab] = useState('discover')
    const [searchTerm, setSearchTerm] = useState('')
    const [filterBranch, setFilterBranch] = useState('all')
    const [filterCGPA, setFilterCGPA] = useState('all')
    const [filterSkills, setFilterSkills] = useState('all')

    // Mock data - in real app, this would come from API
    const [dashboardStats, setDashboardStats] = useState({
        totalCandidates: 120,
        shortlistedCandidates: 15,
        interviewsScheduled: 8,
        avgCGPA: 8.2,
        topSkills: ['JavaScript', 'Python', 'Java', 'React']
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
                skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
                projects: [
                    {
                        title: 'E-commerce Platform',
                        description: 'Full-stack web application with payment integration',
                        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
                    },
                    {
                        title: 'Social Media App',
                        description: 'Real-time messaging and post sharing application',
                        technologies: ['React Native', 'Firebase', 'Socket.io']
                    }
                ],
                internships: [
                    {
                        company: 'Tech Solutions Pvt Ltd',
                        role: 'Software Development Intern',
                        duration: '3 months',
                        description: 'Developed REST APIs and frontend components'
                    }
                ],
                achievements: ['College Hackathon Winner 2024', 'Best Project Award'],
                address: 'Bangalore, Karnataka',
                dateOfBirth: '2003-05-15',
                tenthMarks: 95.2,
                twelfthMarks: 92.8
            },
            placementStatus: 'Available',
            expectedSalary: '8-12 LPA',
            preferredLocations: ['Bangalore', 'Hyderabad', 'Chennai'],
            isShortlisted: false,
            profileViews: 23,
            lastActive: '2 hours ago'
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
                skills: ['Java', 'Spring Boot', 'MySQL', 'React', 'Docker'],
                projects: [
                    {
                        title: 'Hospital Management System',
                        description: 'Complete hospital management with patient records',
                        technologies: ['Java', 'Spring Boot', 'MySQL', 'React']
                    }
                ],
                internships: [
                    {
                        company: 'Healthcare IT Solutions',
                        role: 'Backend Developer Intern',
                        duration: '6 months',
                        description: 'Built scalable backend systems'
                    }
                ],
                achievements: ['Dean\'s List - 4 semesters', 'Technical Paper Published'],
                address: 'Mumbai, Maharashtra',
                dateOfBirth: '2003-08-22',
                tenthMarks: 96.5,
                twelfthMarks: 94.2
            },
            placementStatus: 'Available',
            expectedSalary: '10-15 LPA',
            preferredLocations: ['Mumbai', 'Pune', 'Bangalore'],
            isShortlisted: true,
            profileViews: 45,
            lastActive: '1 day ago'
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
                skills: ['Python', 'Django', 'PostgreSQL', 'AWS', 'Machine Learning'],
                projects: [
                    {
                        title: 'AI Chatbot',
                        description: 'Natural language processing chatbot for customer service',
                        technologies: ['Python', 'TensorFlow', 'Flask', 'NLP']
                    }
                ],
                internships: [
                    {
                        company: 'AI Innovations Lab',
                        role: 'ML Intern',
                        duration: '4 months',
                        description: 'Worked on computer vision projects'
                    }
                ],
                achievements: ['AI/ML Workshop Certification', 'Open Source Contributor'],
                address: 'Delhi, India',
                dateOfBirth: '2003-12-10',
                tenthMarks: 88.7,
                twelfthMarks: 91.3
            },
            placementStatus: 'Available',
            expectedSalary: '6-10 LPA',
            preferredLocations: ['Delhi', 'Gurgaon', 'Noida'],
            isShortlisted: false,
            profileViews: 18,
            lastActive: '3 hours ago'
        }
    ])

    const [shortlistedStudents, setShortlistedStudents] = useState([])

    useEffect(() => {
        setShortlistedStudents(students.filter(student => student.isShortlisted))
    }, [students])

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             student.profile.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             student.profile.skills.some(skill => 
                                 skill.toLowerCase().includes(searchTerm.toLowerCase())
                             )
        
        const matchesBranch = filterBranch === 'all' || student.profile.branch.toLowerCase().includes(filterBranch.toLowerCase())
        
        const matchesCGPA = filterCGPA === 'all' || 
                           (filterCGPA === '8+' && student.profile.cgpa >= 8.0) ||
                           (filterCGPA === '7-8' && student.profile.cgpa >= 7.0 && student.profile.cgpa < 8.0) ||
                           (filterCGPA === '6-7' && student.profile.cgpa >= 6.0 && student.profile.cgpa < 7.0)
        
        const matchesSkills = filterSkills === 'all' || 
                             student.profile.skills.some(skill => 
                                 skill.toLowerCase().includes(filterSkills.toLowerCase())
                             )
        
        return matchesSearch && matchesBranch && matchesCGPA && matchesSkills
    })

    const handleShortlist = (studentId) => {
        setStudents(prev => prev.map(student => 
            student._id === studentId 
                ? { ...student, isShortlisted: !student.isShortlisted }
                : student
        ))
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Available':
                return <Badge className="bg-green-100 text-green-800">Available</Badge>
            case 'Interviewing':
                return <Badge className="bg-blue-100 text-blue-800">Interviewing</Badge>
            case 'Placed':
                return <Badge className="bg-purple-100 text-purple-800">Placed</Badge>
            default:
                return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Recruiter Welcome Header */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8 text-white">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                                Recruiter Portal - {user?.fullname || 'Recruiter'}
                            </h1>
                            <p className="text-purple-100 text-base sm:text-lg mb-4">
                                Discover and connect with top talent from JSS Academy
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                <Badge className="bg-white text-purple-600 text-xs sm:text-sm font-medium">
                                    🏢 Talent Acquisition
                                </Badge>
                                <Badge className="bg-white text-purple-600 text-xs sm:text-sm font-medium">
                                    🎯 JSS Partnership
                                </Badge>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center">
                                <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 mb-6 sm:mb-8">
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Total Candidates</p>
                                    <p className="text-xl sm:text-2xl font-bold text-purple-600">{dashboardStats.totalCandidates}</p>
                                </div>
                                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Shortlisted</p>
                                    <p className="text-xl sm:text-2xl font-bold text-green-600">{shortlistedStudents.length}</p>
                                </div>
                                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Interviews</p>
                                    <p className="text-xl sm:text-2xl font-bold text-blue-600">{dashboardStats.interviewsScheduled}</p>
                                </div>
                                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Avg CGPA</p>
                                    <p className="text-xl sm:text-2xl font-bold text-orange-600">{dashboardStats.avgCGPA}</p>
                                </div>
                                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Profile Views</p>
                                    <p className="text-xl sm:text-2xl font-bold text-red-600">156</p>
                                </div>
                                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <Button 
                        onClick={() => setActiveTab('discover')}
                        variant={activeTab === 'discover' ? 'default' : 'outline'}
                        className={activeTab === 'discover' ? 'bg-purple-600 text-white' : ''}
                    >
                        Discover Talent
                    </Button>
                    <Button 
                        onClick={() => setActiveTab('shortlisted')}
                        variant={activeTab === 'shortlisted' ? 'default' : 'outline'}
                        className={activeTab === 'shortlisted' ? 'bg-purple-600 text-white' : ''}
                    >
                        Shortlisted ({shortlistedStudents.length})
                    </Button>
                    <Button 
                        onClick={() => setActiveTab('analytics')}
                        variant={activeTab === 'analytics' ? 'default' : 'outline'}
                        className={activeTab === 'analytics' ? 'bg-purple-600 text-white' : ''}
                    >
                        Analytics
                    </Button>
                </div>

                {/* Tab Content */}
                {activeTab === 'discover' && (
                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <CardTitle className="flex items-center gap-2">
                                    <Search className="w-5 h-5 text-purple-600" />
                                    Discover Candidates
                                </CardTitle>
                                <div className="flex flex-wrap gap-2">
                                    <div className="relative">
                                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <Input
                                            placeholder="Search by name, skills, USN..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 w-64"
                                        />
                                    </div>
                                    <select 
                                        value={filterBranch}
                                        onChange={(e) => setFilterBranch(e.target.value)}
                                        className="px-3 py-2 border rounded-md text-sm"
                                    >
                                        <option value="all">All Branches</option>
                                        <option value="computer">Computer Science</option>
                                        <option value="information">Information Science</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="mechanical">Mechanical</option>
                                    </select>
                                    <select 
                                        value={filterCGPA}
                                        onChange={(e) => setFilterCGPA(e.target.value)}
                                        className="px-3 py-2 border rounded-md text-sm"
                                    >
                                        <option value="all">All CGPA</option>
                                        <option value="8+">8.0+ CGPA</option>
                                        <option value="7-8">7.0-8.0 CGPA</option>
                                        <option value="6-7">6.0-7.0 CGPA</option>
                                    </select>
                                    <select 
                                        value={filterSkills}
                                        onChange={(e) => setFilterSkills(e.target.value)}
                                        className="px-3 py-2 border rounded-md text-sm"
                                    >
                                        <option value="all">All Skills</option>
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                        <option value="java">Java</option>
                                        <option value="react">React</option>
                                    </select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredStudents.map((student) => (
                                    <Card key={student._id} className="border hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={student.profile.profilePhoto} alt={student.fullname} />
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{student.fullname}</h3>
                                                        <p className="text-sm text-gray-500">{student.profile.usn}</p>
                                                        <p className="text-sm text-gray-600">{student.profile.branch}</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant={student.isShortlisted ? "default" : "outline"}
                                                    onClick={() => handleShortlist(student._id)}
                                                    className={student.isShortlisted ? "bg-red-600 hover:bg-red-700" : ""}
                                                >
                                                    <Heart className={`w-4 h-4 ${student.isShortlisted ? 'fill-current' : ''}`} />
                                                </Button>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-500">CGPA</span>
                                                    <span className="font-semibold text-lg">{student.profile.cgpa}</span>
                                                </div>

                                                <div>
                                                    <span className="text-sm text-gray-500 mb-2 block">Skills</span>
                                                    <div className="flex flex-wrap gap-1">
                                                        {student.profile.skills.slice(0, 4).map((skill, index) => (
                                                            <Badge key={index} variant="secondary" className="text-xs">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                        {student.profile.skills.length > 4 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{student.profile.skills.length - 4} more
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <span className="text-sm text-gray-500">Expected Salary</span>
                                                    <p className="font-medium">{student.expectedSalary}</p>
                                                </div>

                                                <div>
                                                    <span className="text-sm text-gray-500">Preferred Locations</span>
                                                    <p className="text-sm">{student.preferredLocations.join(', ')}</p>
                                                </div>

                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span>{student.profileViews} profile views</span>
                                                    <span>Active {student.lastActive}</span>
                                                </div>

                                                <div className="flex gap-2 pt-3">
                                                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        View Profile
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="flex-1">
                                                        <MessageCircle className="w-4 h-4 mr-1" />
                                                        Contact
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {filteredStudents.length === 0 && (
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
                                    <p className="text-gray-500">Try adjusting your search filters to find more candidates.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'shortlisted' && (
                    <Card className="bg-white shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="w-5 h-5 text-purple-600" />
                                Shortlisted Candidates ({shortlistedStudents.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {shortlistedStudents.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Candidate</TableHead>
                                                <TableHead>Branch</TableHead>
                                                <TableHead>CGPA</TableHead>
                                                <TableHead>Skills</TableHead>
                                                <TableHead>Expected Salary</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {shortlistedStudents.map((student) => (
                                                <TableRow key={student._id}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarImage src={student.profile.profilePhoto} alt={student.fullname} />
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-medium">{student.fullname}</div>
                                                                <div className="text-sm text-gray-500">{student.profile.usn}</div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{student.profile.branch}</TableCell>
                                                    <TableCell>
                                                        <span className="font-semibold">{student.profile.cgpa}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-1">
                                                            {student.profile.skills.slice(0, 3).map((skill, index) => (
                                                                <Badge key={index} variant="secondary" className="text-xs">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{student.expectedSalary}</TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button size="sm" variant="outline">
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                            <Button size="sm" variant="outline">
                                                                <Mail className="w-4 h-4" />
                                                            </Button>
                                                            <Button size="sm" variant="outline">
                                                                <Calendar className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No shortlisted candidates yet</h3>
                                    <p className="text-gray-500">Start discovering talent and shortlist candidates that match your requirements.</p>
                                    <Button 
                                        onClick={() => setActiveTab('discover')}
                                        className="mt-4 bg-purple-600 hover:bg-purple-700"
                                    >
                                        Discover Candidates
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'analytics' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        <Card className="bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-purple-600" />
                                    Top Skills in Demand
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {dashboardStats.topSkills.map((skill, index) => (
                                        <div key={skill} className="flex justify-between items-center">
                                            <span className="text-sm font-medium">{skill}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-purple-600 h-2 rounded-full" 
                                                        style={{ width: `${90 - (index * 15)}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-500">{90 - (index * 15)}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="w-5 h-5 text-purple-600" />
                                    CGPA Distribution
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">9.0+ CGPA</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">25%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">8.0-9.0 CGPA</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">45%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">7.0-8.0 CGPA</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">25%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Below 7.0 CGPA</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-red-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">5%</span>
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

export default RecruiterDashboard
