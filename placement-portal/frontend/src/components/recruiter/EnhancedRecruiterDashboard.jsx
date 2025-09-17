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
    MessageCircle,
    Plus,
    FileText,
    Clock,
    BarChart2,
    PenTool,
    CheckSquare,
    AlertCircle
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

const EnhancedRecruiterDashboard = () => {
    // Inherit all state from original component
    const { user } = useSelector(store => store.auth)
    const [activeTab, setActiveTab] = useState('discover')
    const [searchTerm, setSearchTerm] = useState('')
    const [filterBranch, setFilterBranch] = useState('all')
    const [filterCGPA, setFilterCGPA] = useState('all')
    const [filterSkills, setFilterSkills] = useState('all')
    const [selectedCandidate, setSelectedCandidate] = useState(null)
    const [showScheduler, setShowScheduler] = useState(false)
    const [candidateNotes, setCandidateNotes] = useState({})

    // New state for enhanced features
    const [dashboardStats, setDashboardStats] = useState({
        totalCandidates: 120,
        shortlistedCandidates: 15,
        interviewsScheduled: 8,
        avgCGPA: 8.2,
        topSkills: ['JavaScript', 'Python', 'Java', 'React'],
        placementRate: 85,
        avgPackage: "12.5 LPA",
        activeJobs: 5,
        upcomingInterviews: [
            {
                id: 1,
                candidate: "Arjun Sharma",
                role: "Full Stack Developer",
                date: "2025-09-20",
                time: "10:00 AM",
                status: "Confirmed"
            },
            {
                id: 2,
                candidate: "Priya Patel",
                role: "Software Engineer",
                date: "2025-09-21",
                time: "2:00 PM",
                status: "Pending"
            }
        ],
        activeJobPostings: [
            {
                id: 1,
                role: "Senior Software Engineer",
                applications: 45,
                deadline: "2025-10-01"
            },
            {
                id: 2,
                role: "Product Manager",
                applications: 28,
                deadline: "2025-09-25"
            },
            {
                id: 3,
                role: "Data Scientist",
                applications: 32,
                deadline: "2025-09-30"
            }
        ],
        candidateFeedback: [
            {
                id: 1,
                candidate: "Rahul Kumar",
                rating: 4.5,
                notes: "Strong problem-solving skills, good cultural fit"
            }
        ]
    })

    // Inherit student data from original component
    const [students, setStudents] = useState([
        {
            _id: '1',
            fullname: 'Arjun Sharma',
            profile: {
                usn: '1JS20CS001',
                branch: 'Computer Science',
                cgpa: 8.7,
                skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
                profilePhoto: 'https://randomuser.me/api/portraits/men/32.jpg'
            },
            expectedSalary: '10 LPA',
            preferredLocations: ['Bangalore', 'Hyderabad'],
            profileViews: 120,
            lastActive: '2 hours ago',
            isShortlisted: false
        },
        {
            _id: '2',
            fullname: 'Priya Patel',
            profile: {
                usn: '1JS20IS002',
                branch: 'Information Science',
                cgpa: 8.2,
                skills: ['Python', 'Django', 'Java', 'React'],
                profilePhoto: 'https://randomuser.me/api/portraits/women/44.jpg'
            },
            expectedSalary: '12 LPA',
            preferredLocations: ['Pune', 'Mumbai'],
            profileViews: 98,
            lastActive: '1 day ago',
            isShortlisted: true
        },
        {
            _id: '3',
            fullname: 'Rahul Kumar',
            profile: {
                usn: '1JS20EC003',
                branch: 'Electronics',
                cgpa: 7.9,
                skills: ['C', 'Embedded Systems', 'Python'],
                profilePhoto: 'https://randomuser.me/api/portraits/men/45.jpg'
            },
            expectedSalary: '8 LPA',
            preferredLocations: ['Delhi', 'Noida'],
            profileViews: 75,
            lastActive: '3 hours ago',
            isShortlisted: false
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

    // New function for candidate notes
    const handleAddNote = (studentId, note) => {
        setCandidateNotes(prev => ({
            ...prev,
            [studentId]: [...(prev[studentId] || []), { id: Date.now(), text: note, date: new Date() }]
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Enhanced Header with Quick Actions */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-4 sm:p-8 mb-6 sm:mb-8 text-white">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                                Welcome back, {user?.fullname || 'Recruiter'}
                            </h1>
                            <p className="text-purple-100 text-base sm:text-lg">
                                You have {dashboardStats.upcomingInterviews.length} interviews scheduled this week
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                variant="secondary" 
                                className="bg-white text-purple-600 hover:bg-purple-50"
                                onClick={() => setActiveTab('jobs')}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Post New Job
                            </Button>
                            <Button 
                                variant="secondary" 
                                className="bg-white text-purple-600 hover:bg-purple-50"
                                onClick={() => setActiveTab('schedule')}
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                Schedule Interview
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Enhanced Stats Dashboard */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Active Jobs</p>
                                    <p className="text-2xl font-bold text-purple-600">{dashboardStats.activeJobs}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {dashboardStats.totalCandidates} total applicants
                                    </p>
                                </div>
                                <Briefcase className="w-8 h-8 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Placement Rate</p>
                                    <p className="text-2xl font-bold text-green-600">{dashboardStats.placementRate}%</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Avg package: {dashboardStats.avgPackage}
                                    </p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Interviews</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {dashboardStats.upcomingInterviews.length}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Next 7 days
                                    </p>
                                </div>
                                <Calendar className="w-8 h-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Shortlisted</p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {shortlistedStudents.length}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        of {dashboardStats.totalCandidates} candidates
                                    </p>
                                </div>
                                <Heart className="w-8 h-8 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Enhanced Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <Button 
                        onClick={() => setActiveTab('discover')}
                        variant={activeTab === 'discover' ? 'default' : 'outline'}
                        className={activeTab === 'discover' ? 'bg-purple-600 text-white' : ''}
                    >
                        <Users className="w-4 h-4 mr-2" />
                        Discover
                    </Button>
                    <Button 
                        onClick={() => setActiveTab('shortlisted')}
                        variant={activeTab === 'shortlisted' ? 'default' : 'outline'}
                        className={activeTab === 'shortlisted' ? 'bg-purple-600 text-white' : ''}
                    >
                        <Heart className="w-4 h-4 mr-2" />
                        Shortlisted ({shortlistedStudents.length})
                    </Button>
                    <Button 
                        onClick={() => setActiveTab('jobs')}
                        variant={activeTab === 'jobs' ? 'default' : 'outline'}
                        className={activeTab === 'jobs' ? 'bg-purple-600 text-white' : ''}
                    >
                        <Briefcase className="w-4 h-4 mr-2" />
                        Jobs
                    </Button>
                    <Button 
                        onClick={() => setActiveTab('schedule')}
                        variant={activeTab === 'schedule' ? 'default' : 'outline'}
                        className={activeTab === 'schedule' ? 'bg-purple-600 text-white' : ''}
                    >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                    </Button>
                    <Button 
                        onClick={() => setActiveTab('analytics')}
                        variant={activeTab === 'analytics' ? 'default' : 'outline'}
                        className={activeTab === 'analytics' ? 'bg-purple-600 text-white' : ''}
                    >
                        <BarChart2 className="w-4 h-4 mr-2" />
                        Analytics
                    </Button>
                </div>

                {/* Keep existing tab content for 'discover', 'shortlisted', and 'analytics' */}
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

                {/* New Jobs Management Tab */}
                {activeTab === 'jobs' && (
                    <div className="space-y-6">
                        {/* Active Job Postings */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-purple-600" />
                                        Active Job Postings
                                    </CardTitle>
                                    <Button className="bg-purple-600">
                                        <Plus className="w-4 h-4 mr-2" />
                                        New Job Post
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    {dashboardStats.activeJobPostings.map((job) => (
                                        <div 
                                            key={job.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <h3 className="font-medium text-lg">{job.role}</h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" />
                                                        {job.applications} applications
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        Deadline: {job.deadline}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <PenTool className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Job Analytics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Application Trends</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Applications this week</span>
                                            <span className="font-medium">+24%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Job Categories</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Software Development</span>
                                            <Badge>45%</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Data Science</span>
                                            <Badge>30%</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Product Management</span>
                                            <Badge>25%</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* New Schedule Management Tab */}
                {activeTab === 'schedule' && (
                    <div className="space-y-6">
                        {/* Upcoming Interviews */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-purple-600" />
                                        Upcoming Interviews
                                    </CardTitle>
                                    <Button className="bg-purple-600">
                                        Schedule New
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {dashboardStats.upcomingInterviews.map((interview) => (
                                        <div 
                                            key={interview.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <h3 className="font-medium">{interview.candidate}</h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                    <span>{interview.role}</span>
                                                    <span>•</span>
                                                    <span>{interview.date} at {interview.time}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge 
                                                    className={
                                                        interview.status === 'Confirmed' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }
                                                >
                                                    {interview.status}
                                                </Badge>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm">
                                                        <MessageCircle className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        <Calendar className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Interview Schedule Calendar */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Interview Slots</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium">Morning Slot</p>
                                                <p className="text-sm text-gray-500">10:00 AM - 1:00 PM</p>
                                            </div>
                                            <Badge variant="outline">3 Scheduled</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium">Afternoon Slot</p>
                                                <p className="text-sm text-gray-500">2:00 PM - 5:00 PM</p>
                                            </div>
                                            <Badge variant="outline">2 Scheduled</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Interview Types</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Code className="w-4 h-4 text-blue-600" />
                                                <span>Technical</span>
                                            </div>
                                            <Badge>5 scheduled</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-green-600" />
                                                <span>HR Round</span>
                                            </div>
                                            <Badge>3 scheduled</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Keep existing analytics tab with enhanced visualizations */}
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

export default EnhancedRecruiterDashboard
