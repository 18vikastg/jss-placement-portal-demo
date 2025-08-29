import { useState } from 'react'
import Navbar from '../shared/NavbarNew'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
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
    TrendingUp, 
    Search, 
    Filter, 
    Download,
    Calendar,
    Building2,
    Users,
    DollarSign,
    FileText,
    Eye
} from 'lucide-react'

// Mock placement data
const mockPlacements = [
    {
        _id: '1',
        company: 'Google',
        role: 'Software Engineer',
        package: '45 LPA',
        type: 'Full-time',
        studentsSelected: 3,
        totalApplicants: 25,
        date: '2024-01-15',
        status: 'Completed',
        location: 'Bangalore',
        eligibility: {
            minCGPA: 8.0,
            branches: ['Computer Science', 'IT']
        }
    },
    {
        _id: '2',
        company: 'Microsoft',
        role: 'Software Development Engineer',
        package: '52 LPA',
        type: 'Full-time',
        studentsSelected: 2,
        totalApplicants: 30,
        date: '2024-01-20',
        status: 'Completed',
        location: 'Hyderabad',
        eligibility: {
            minCGPA: 8.5,
            branches: ['Computer Science', 'IT', 'Electronics']
        }
    },
    {
        _id: '3',
        company: 'Amazon',
        role: 'SDE Intern',
        package: '1.2 LPM',
        type: 'Internship',
        studentsSelected: 5,
        totalApplicants: 40,
        date: '2024-02-01',
        status: 'In Progress',
        location: 'Remote',
        eligibility: {
            minCGPA: 7.5,
            branches: ['Computer Science', 'IT', 'Electronics', 'Mechanical']
        }
    },
    {
        _id: '4',
        company: 'TCS',
        role: 'Software Engineer',
        package: '3.5 LPA',
        type: 'Full-time',
        studentsSelected: 15,
        totalApplicants: 60,
        date: '2024-02-10',
        status: 'Upcoming',
        location: 'Multiple Cities',
        eligibility: {
            minCGPA: 6.0,
            branches: ['All Branches']
        }
    },
    {
        _id: '5',
        company: 'Infosys',
        role: 'Systems Engineer',
        package: '3.2 LPA',
        type: 'Full-time',
        studentsSelected: 20,
        totalApplicants: 80,
        date: '2024-02-15',
        status: 'Completed',
        location: 'Mysore',
        eligibility: {
            minCGPA: 6.5,
            branches: ['All Branches']
        }
    }
];

const FacultyPlacements = () => {
    const [placements, setPlacements] = useState(mockPlacements);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterType, setFilterType] = useState('All');

    const statuses = ['All', 'Completed', 'In Progress', 'Upcoming'];
    const types = ['All', 'Full-time', 'Internship'];

    const filteredPlacements = placements.filter(placement => {
        const matchesSearch = placement.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            placement.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || placement.status === filterStatus;
        const matchesType = filterType === 'All' || placement.type === filterType;
        
        return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed':
                return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
            case 'In Progress':
                return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
            case 'Upcoming':
                return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getTypeBadge = (type) => {
        return type === 'Internship' 
            ? <Badge variant="outline" className="text-purple-600 border-purple-200">Internship</Badge>
            : <Badge variant="outline" className="text-blue-600 border-blue-200">Full-time</Badge>;
    };

    // Calculate stats
    const totalPlacements = placements.filter(p => p.status === 'Completed').length;
    const totalStudentsPlaced = placements
        .filter(p => p.status === 'Completed')
        .reduce((sum, p) => sum + p.studentsSelected, 0);
    const averagePackage = placements
        .filter(p => p.status === 'Completed' && p.type === 'Full-time')
        .reduce((sum, p) => sum + parseFloat(p.package.replace(' LPA', '')), 0) / 
        placements.filter(p => p.status === 'Completed' && p.type === 'Full-time').length;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Placement Dashboard</h1>
                                <p className="text-gray-600">Track and manage campus placements</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Export Report
                            </Button>
                            <Button className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Generate Report
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Placements</p>
                                <p className="text-2xl font-bold text-gray-900">{totalPlacements}</p>
                            </div>
                            <Building2 className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Students Placed</p>
                                <p className="text-2xl font-bold text-green-600">{totalStudentsPlaced}</p>
                            </div>
                            <Users className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Avg Package</p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    ₹{averagePackage ? averagePackage.toFixed(1) : 0} LPA
                                </p>
                            </div>
                            <DollarSign className="w-8 h-8 text-yellow-600" />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Upcoming Drives</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {placements.filter(p => p.status === 'Upcoming').length}
                                </p>
                            </div>
                            <Calendar className="w-8 h-8 text-red-600" />
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
                                    placeholder="Search companies or roles..."
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
                        <select 
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        >
                            {types.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            More Filters
                        </Button>
                    </div>
                </div>

                {/* Placements Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <Table>
                        <TableCaption>Campus placement drives and results</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Package</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Selected/Applied</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPlacements.map((placement) => (
                                <TableRow key={placement._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                                                {placement.company.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium">{placement.company}</p>
                                                <p className="text-sm text-gray-500">{placement.location}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <p className="font-medium">{placement.role}</p>
                                        <p className="text-sm text-gray-500">
                                            Min CGPA: {placement.eligibility.minCGPA}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono font-bold text-green-600">
                                            ₹{placement.package}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {getTypeBadge(placement.type)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-center">
                                            <p className="font-bold text-lg">{placement.studentsSelected}</p>
                                            <p className="text-sm text-gray-500">/ {placement.totalApplicants}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(placement.date).toLocaleDateString('en-IN')}
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(placement.status)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Details
                                            </Button>
                                        </div>
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

export default FacultyPlacements;
