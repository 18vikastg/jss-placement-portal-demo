import { useState } from 'react'
import Navbar from '../shared/NavbarNew'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { 
    Search,
    Filter,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Eye,
    FileText,
    Building2,
    TrendingUp,
    Download
} from 'lucide-react'

const StudentApplications = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('All')

    // Mock application data
    const applications = [
        {
            id: 1,
            company: 'Google',
            role: 'Software Engineer',
            package: '45 LPA',
            appliedDate: '2025-08-15',
            status: 'Interview Scheduled',
            interviewDate: '2025-09-02',
            round: 'Technical Round 1',
            eligibility: 'Met',
            requirements: '8.0 CGPA, CSE/IT',
            jobType: 'Full-time',
            location: 'Bangalore'
        },
        {
            id: 2,
            company: 'Microsoft',
            role: 'SDE Intern',
            package: '1.2 LPM',
            appliedDate: '2025-08-10',
            status: 'Under Review',
            interviewDate: null,
            round: 'Resume Screening',
            eligibility: 'Met',
            requirements: '7.5 CGPA, CSE/IT/ECE',
            jobType: 'Internship',
            location: 'Hyderabad'
        },
        {
            id: 3,
            company: 'Amazon',
            role: 'Software Development Engineer',
            package: '28 LPA',
            appliedDate: '2025-08-05',
            status: 'Rejected',
            interviewDate: '2025-08-25',
            round: 'Final Round',
            eligibility: 'Met',
            requirements: '7.0 CGPA, All Branches',
            jobType: 'Full-time',
            location: 'Chennai'
        },
        {
            id: 4,
            company: 'TCS',
            role: 'Software Engineer',
            package: '3.5 LPA',
            appliedDate: '2025-07-28',
            status: 'Selected',
            interviewDate: '2025-08-20',
            round: 'HR Round',
            eligibility: 'Met',
            requirements: '6.0 CGPA, All Branches',
            jobType: 'Full-time',
            location: 'Multiple Cities'
        },
        {
            id: 5,
            company: 'Infosys',
            role: 'Systems Engineer',
            package: '3.2 LPA',
            appliedDate: '2025-07-20',
            status: 'Waiting for Results',
            interviewDate: '2025-08-18',
            round: 'Technical Round',
            eligibility: 'Met',
            requirements: '6.5 CGPA, All Branches',
            jobType: 'Full-time',
            location: 'Mysore'
        }
    ]

    const statuses = ['All', 'Under Review', 'Interview Scheduled', 'Selected', 'Rejected', 'Waiting for Results']

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            app.role.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === 'All' || app.status === filterStatus
        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Selected':
                return <Badge className="bg-green-100 text-green-800">Selected ✅</Badge>
            case 'Interview Scheduled':
                return <Badge className="bg-blue-100 text-blue-800">Interview Scheduled 📅</Badge>
            case 'Under Review':
                return <Badge className="bg-yellow-100 text-yellow-800">Under Review ⏳</Badge>
            case 'Rejected':
                return <Badge className="bg-red-100 text-red-800">Rejected ❌</Badge>
            case 'Waiting for Results':
                return <Badge className="bg-purple-100 text-purple-800">Waiting for Results ⏰</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Selected':
                return <CheckCircle className="w-5 h-5 text-green-600" />
            case 'Interview Scheduled':
                return <Calendar className="w-5 h-5 text-blue-600" />
            case 'Under Review':
                return <Clock className="w-5 h-5 text-yellow-600" />
            case 'Rejected':
                return <XCircle className="w-5 h-5 text-red-600" />
            case 'Waiting for Results':
                return <AlertCircle className="w-5 h-5 text-purple-600" />
            default:
                return <Clock className="w-5 h-5 text-gray-600" />
        }
    }

    // Calculate statistics
    const stats = {
        total: applications.length,
        selected: applications.filter(app => app.status === 'Selected').length,
        pending: applications.filter(app => 
            app.status === 'Under Review' || 
            app.status === 'Interview Scheduled' || 
            app.status === 'Waiting for Results'
        ).length,
        rejected: applications.filter(app => app.status === 'Rejected').length
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                                <p className="text-gray-600">Track your placement application progress</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Export Report
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Applications</p>
                                    <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                                </div>
                                <FileText className="w-10 h-10 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Selected</p>
                                    <p className="text-3xl font-bold text-green-600">{stats.selected}</p>
                                </div>
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">In Progress</p>
                                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                                </div>
                                <Clock className="w-10 h-10 text-yellow-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">Success Rate</p>
                                    <p className="text-3xl font-bold text-red-600">
                                        {stats.total > 0 ? Math.round((stats.selected / stats.total) * 100) : 0}%
                                    </p>
                                </div>
                                <TrendingUp className="w-10 h-10 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[300px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search by company or role..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        >
                            {statuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            More Filters
                        </Button>
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                    {filteredApplications.map((application) => (
                        <Card key={application.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                            {application.company.charAt(0)}
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900">{application.company}</h3>
                                                    <p className="text-gray-600 text-lg">{application.role}</p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <Badge variant="outline" className="text-green-600 border-green-200 font-semibold">
                                                            ₹{application.package}
                                                        </Badge>
                                                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                                                            {application.jobType}
                                                        </Badge>
                                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Building2 className="w-4 h-4" />
                                                            {application.location}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-right">
                                                    {getStatusBadge(application.status)}
                                                    <p className="text-sm text-gray-500 mt-2">
                                                        Applied: {new Date(application.appliedDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Current Round</p>
                                                    <p className="font-medium">{application.round}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Requirements</p>
                                                    <p className="font-medium">{application.requirements}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Eligibility</p>
                                                    <Badge className="bg-green-100 text-green-800">
                                                        {application.eligibility}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {application.interviewDate && (
                                                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-blue-600" />
                                                        <p className="text-sm font-medium text-blue-800">
                                                            Interview scheduled for {new Date(application.interviewDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-4 flex items-center gap-3">
                                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </Button>
                                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4" />
                                                    Application Status
                                                </Button>
                                                {application.status === 'Interview Scheduled' && (
                                                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                                        Prepare for Interview
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredApplications.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
                        <p className="text-gray-600">
                            {searchTerm || filterStatus !== 'All' 
                                ? 'Try adjusting your search or filter criteria'
                                : 'Start applying to placement opportunities to see them here'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentApplications
