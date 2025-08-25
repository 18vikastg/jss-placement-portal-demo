import { useEffect, useState } from 'react'
import Navbar from '../shared/NavbarNew'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
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
import { Badge } from '../ui/badge'
import { 
    Users, 
    Search, 
    Filter, 
    Download,
    Mail,
    Phone,
    GraduationCap,
    Award,
    Building2
} from 'lucide-react'

// Mock student data - in real app, this would come from API
const mockStudents = [
    {
        _id: '1',
        fullname: 'Arjun Sharma',
        email: 'arjun@jssate.ac.in',
        phoneNumber: '9876543210',
        profile: {
            studentId: 'JSS21CS001',
            branch: 'Computer Science',
            batch: '2025',
            semester: 8,
            cgpa: 8.5,
            profilePhoto: 'https://github.com/shadcn.png'
        },
        placementStatus: 'Placed',
        company: 'Google'
    },
    {
        _id: '2',
        fullname: 'Priya Patel',
        email: 'priya@jssate.ac.in',
        phoneNumber: '9876543211',
        profile: {
            studentId: 'JSS21CS002',
            branch: 'Computer Science',
            batch: '2025',
            semester: 8,
            cgpa: 9.1,
            profilePhoto: 'https://github.com/shadcn.png'
        },
        placementStatus: 'Placed',
        company: 'Microsoft'
    },
    {
        _id: '3',
        fullname: 'Vikram Singh',
        email: 'vikram@jssate.ac.in',
        phoneNumber: '9876543212',
        profile: {
            studentId: 'JSS21EC001',
            branch: 'Electronics',
            batch: '2025',
            semester: 8,
            cgpa: 7.8,
            profilePhoto: 'https://github.com/shadcn.png'
        },
        placementStatus: 'Seeking',
        company: null
    },
    {
        _id: '4',
        fullname: 'Sneha Reddy',
        email: 'sneha@jssate.ac.in',
        phoneNumber: '9876543213',
        profile: {
            studentId: 'JSS21ME001',
            branch: 'Mechanical',
            batch: '2025',
            semester: 8,
            cgpa: 8.2,
            profilePhoto: 'https://github.com/shadcn.png'
        },
        placementStatus: 'Interview',
        company: 'Amazon'
    }
];

const FacultyStudents = () => {
    const [students, setStudents] = useState(mockStudents);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBranch, setFilterBranch] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    const branches = ['All', 'Computer Science', 'Electronics', 'Mechanical', 'Civil'];
    const statuses = ['All', 'Placed', 'Seeking', 'Interview'];

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            student.profile.studentId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBranch = filterBranch === 'All' || student.profile.branch === filterBranch;
        const matchesStatus = filterStatus === 'All' || student.placementStatus === filterStatus;
        
        return matchesSearch && matchesBranch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Placed':
                return <Badge className="bg-green-100 text-green-800">Placed</Badge>;
            case 'Interview':
                return <Badge className="bg-yellow-100 text-yellow-800">Interview</Badge>;
            case 'Seeking':
                return <Badge className="bg-blue-100 text-blue-800">Seeking</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                                <p className="text-gray-600">Monitor and manage student placements</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Export Data
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Students</p>
                                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                            </div>
                            <GraduationCap className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Placed</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {students.filter(s => s.placementStatus === 'Placed').length}
                                </p>
                            </div>
                            <Award className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">In Process</p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {students.filter(s => s.placementStatus === 'Interview').length}
                                </p>
                            </div>
                            <Building2 className="w-8 h-8 text-yellow-600" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Placement Rate</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {Math.round((students.filter(s => s.placementStatus === 'Placed').length / students.length) * 100)}%
                                </p>
                            </div>
                            <Users className="w-8 h-8 text-red-600" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[300px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search students by name, email, or ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <select 
                            value={filterBranch}
                            onChange={(e) => setFilterBranch(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        >
                            {branches.map(branch => (
                                <option key={branch} value={branch}>{branch}</option>
                            ))}
                        </select>
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

                {/* Students Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <Table>
                        <TableCaption>Students under your supervision</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Branch</TableHead>
                                <TableHead>CGPA</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStudents.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={student.profile.profilePhoto} />
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{student.fullname}</p>
                                                <p className="text-sm text-gray-500">{student.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {student.profile.studentId}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{student.profile.branch}</p>
                                            <p className="text-sm text-gray-500">Batch {student.profile.batch}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono">
                                            {student.profile.cgpa}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(student.placementStatus)}
                                    </TableCell>
                                    <TableCell>
                                        {student.company ? (
                                            <span className="font-medium">{student.company}</span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Mail className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Phone className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">
                                            View Profile
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default FacultyStudents;
