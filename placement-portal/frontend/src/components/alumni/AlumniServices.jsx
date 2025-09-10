import { useState } from 'react'
import { 
    Users, 
    MessageCircle, 
    Briefcase, 
    Building,
    MapPin,
    Star,
    Search,
    Calendar,
    TrendingUp,
    Award,
    BookOpen,
    User,
    CheckCircle,
    ExternalLink
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const AlumniServices = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedBatch, setSelectedBatch] = useState('all')
    const [selectedDepartment, setSelectedDepartment] = useState('all')
    const [showConnectModal, setShowConnectModal] = useState(false)
    const [selectedAlumni, setSelectedAlumni] = useState(null)

    const getInitials = (name) => {
        if (!name) return ''
        return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().substring(0, 2)
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const alumniList = [
        {
            id: 1,
            name: 'Rajesh Kumar',
            batch: '2020',
            department: 'Computer Science',
            currentRole: 'Senior Software Engineer',
            company: 'Google',
            location: 'Bangalore, India',
            skills: ['React', 'Node.js', 'System Design'],
            availability: 'Available for mentoring',
            responseRate: '95%',
            menteeCount: 25,
            verified: true,
            rating: 4.9
        },
        {
            id: 2,
            name: 'Priya Sharma',
            batch: '2019',
            department: 'Information Science',
            currentRole: 'Product Manager',
            company: 'Microsoft',
            location: 'Seattle, USA',
            skills: ['Product Strategy', 'Data Analysis'],
            availability: 'Limited availability',
            responseRate: '87%',
            menteeCount: 18,
            verified: true,
            rating: 4.8
        }
    ]

    const filteredAlumni = alumniList.filter(alumni => {
        const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            alumni.company.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesBatch = selectedBatch === 'all' || alumni.batch === selectedBatch
        const matchesDepartment = selectedDepartment === 'all' || alumni.department === selectedDepartment
        return matchesSearch && matchesBatch && matchesDepartment
    })

    const handleConnectAlumni = (alumni) => {
        setSelectedAlumni(alumni)
        setShowConnectModal(true)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-red-700 to-red-900 text-white">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-2">JSS Alumni Network</h1>
                    <p className="text-red-100 text-lg">Connect, Learn, and Grow with JSS Alumni</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <Tabs defaultValue="network" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="network">Alumni Network</TabsTrigger>
                        <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                    </TabsList>

                    <TabsContent value="network" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Find Alumni</CardTitle>
                                <CardDescription>Search and connect with JSS alumni</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <Input
                                                placeholder="Search alumni..."
                                                className="pl-10"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAlumni.map((alumni) => (
                                <Card key={alumni.id} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold">
                                                    {getInitials(alumni.name)}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900">{alumni.name}</h3>
                                                <p className="text-sm text-gray-600">{alumni.currentRole}</p>
                                                <p className="text-sm font-medium text-gray-900">{alumni.company}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        Batch {alumni.batch}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4">
                                            <Button
                                                size="sm"
                                                className="w-full"
                                                onClick={() => handleConnectAlumni(alumni)}
                                            >
                                                <MessageCircle className="w-4 h-4 mr-2" />
                                                Connect
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="mentorship">
                        <Card>
                            <CardHeader>
                                <CardTitle>Mentorship Program</CardTitle>
                                <CardDescription>Connect with alumni mentors</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Mentorship features coming soon...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="events">
                        <Card>
                            <CardHeader>
                                <CardTitle>Networking Events</CardTitle>
                                <CardDescription>Join alumni events and sessions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Events features coming soon...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="resources">
                        <Card>
                            <CardHeader>
                                <CardTitle>Career Resources</CardTitle>
                                <CardDescription>Access career guides and resources</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Resources features coming soon...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <Dialog open={showConnectModal} onOpenChange={setShowConnectModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Connect with {selectedAlumni?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                placeholder="What would you like to discuss?"
                            />
                        </div>
                        <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Introduce yourself..."
                                className="min-h-[100px]"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => setShowConnectModal(false)} variant="outline" className="flex-1">
                                Cancel
                            </Button>
                            <Button className="flex-1">
                                Send Request
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AlumniServices
