import { useState } from 'react'
import Navbar from '../shared/NavbarNew'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Calendar,
    Book,
    Award,
    Upload,
    Edit,
    Save,
    Plus,
    X,
    GraduationCap,
    Code,
    FileText
} from 'lucide-react'

const StudentProfile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState({
        // Personal Information
        fullname: 'Arjun Sharma',
        usn: '1JS22CS184',
        email: 'arjun@jssate.ac.in',
        phone: '+91 9876543210',
        dateOfBirth: '2003-05-15',
        address: 'Bangalore, Karnataka',
        
        // Academic Information
        branch: 'Computer Science Engineering',
        batch: '2022-2026',
        currentSemester: 6,
        cgpa: 8.5,
        tenthMarks: 95.2,
        twelfthMarks: 92.8,
        
        // Skills & Interests
        technicalSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL'],
        softSkills: ['Communication', 'Leadership', 'Problem Solving', 'Teamwork'],
        interests: ['Web Development', 'Machine Learning', 'Data Science'],
        
        // Experience
        internships: [
            {
                id: 1,
                company: 'Tech Innovations Pvt Ltd',
                role: 'Software Development Intern',
                duration: 'Jun 2024 - Aug 2024',
                description: 'Developed responsive web applications using React and Node.js'
            }
        ],
        
        // Projects
        projects: [
            {
                id: 1,
                title: 'E-Commerce Website',
                description: 'Full-stack web application with payment integration',
                technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                link: 'https://github.com/username/ecommerce'
            },
            {
                id: 2,
                title: 'Task Management App',
                description: 'Mobile-responsive task tracker with real-time updates',
                technologies: ['React', 'Firebase', 'Material-UI'],
                link: 'https://github.com/username/taskmanager'
            }
        ],
        
        // Achievements & Certifications
        achievements: [
            'Winner - College Hackathon 2024',
            'Best Project Award - Web Development Course',
            'Dean\'s List - Semester 5'
        ],
        certifications: [
            {
                id: 1,
                name: 'AWS Cloud Practitioner',
                issuer: 'Amazon Web Services',
                date: '2024-03-15',
                file: null
            },
            {
                id: 2,
                name: 'Google Analytics Certified',
                issuer: 'Google',
                date: '2024-01-20',
                file: null
            }
        ]
    })

    const [newSkill, setNewSkill] = useState('')
    const [newCertification, setNewCertification] = useState({
        name: '',
        issuer: '',
        date: '',
        file: null
    })

    const handleSave = () => {
        setIsEditing(false)
        // Here you would typically save to backend
        console.log('Profile saved:', profile)
    }

    const addSkill = (category) => {
        if (newSkill.trim()) {
            setProfile(prev => ({
                ...prev,
                [category]: [...prev[category], newSkill.trim()]
            }))
            setNewSkill('')
        }
    }

    const removeSkill = (category, index) => {
        setProfile(prev => ({
            ...prev,
            [category]: prev[category].filter((_, i) => i !== index)
        }))
    }

    const addCertification = () => {
        if (newCertification.name && newCertification.issuer) {
            setProfile(prev => ({
                ...prev,
                certifications: [...prev.certifications, {
                    ...newCertification,
                    id: Date.now()
                }]
            }))
            setNewCertification({ name: '', issuer: '', date: '', file: null })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {profile.fullname.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{profile.fullname}</h1>
                                <p className="text-gray-600 text-lg">USN: {profile.usn}</p>
                                <p className="text-gray-600">{profile.branch} • Batch {profile.batch}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {isEditing ? (
                                <>
                                    <Button onClick={() => setIsEditing(false)} variant="outline">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={() => setIsEditing(true)} className="bg-red-600 hover:bg-red-700">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-red-600" />
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label>Full Name</Label>
                                        {isEditing ? (
                                            <Input 
                                                value={profile.fullname}
                                                onChange={(e) => setProfile({...profile, fullname: e.target.value})}
                                            />
                                        ) : (
                                            <p className="font-medium">{profile.fullname}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label>USN</Label>
                                        <p className="font-medium font-mono">{profile.usn}</p>
                                    </div>
                                    <div>
                                        <Label>Email</Label>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            <p className="font-medium">{profile.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Phone</Label>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                            {isEditing ? (
                                                <Input 
                                                    value={profile.phone}
                                                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                                />
                                            ) : (
                                                <p className="font-medium">{profile.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Date of Birth</Label>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-500" />
                                            {isEditing ? (
                                                <Input 
                                                    type="date"
                                                    value={profile.dateOfBirth}
                                                    onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                                                />
                                            ) : (
                                                <p className="font-medium">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Address</Label>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-gray-500" />
                                            {isEditing ? (
                                                <Input 
                                                    value={profile.address}
                                                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                                                />
                                            ) : (
                                                <p className="font-medium">{profile.address}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Academic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-red-600" />
                                    Academic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label>Branch</Label>
                                        <p className="font-medium">{profile.branch}</p>
                                    </div>
                                    <div>
                                        <Label>Batch</Label>
                                        <p className="font-medium">{profile.batch}</p>
                                    </div>
                                    <div>
                                        <Label>Current Semester</Label>
                                        <p className="font-medium">{profile.currentSemester}</p>
                                    </div>
                                    <div>
                                        <Label>CGPA</Label>
                                        <Badge className="bg-green-100 text-green-800 text-base font-bold">
                                            {profile.cgpa}/10.0
                                        </Badge>
                                    </div>
                                    <div>
                                        <Label>10th Marks</Label>
                                        <p className="font-medium">{profile.tenthMarks}%</p>
                                    </div>
                                    <div>
                                        <Label>12th Marks</Label>
                                        <p className="font-medium">{profile.twelfthMarks}%</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Skills */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Code className="w-5 h-5 text-red-600" />
                                    Skills & Competencies
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {/* Technical Skills */}
                                    <div>
                                        <Label className="text-base font-medium">Technical Skills</Label>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {profile.technicalSkills.map((skill, index) => (
                                                <Badge key={index} className="bg-blue-100 text-blue-800">
                                                    {skill}
                                                    {isEditing && (
                                                        <X 
                                                            className="w-3 h-3 ml-1 cursor-pointer" 
                                                            onClick={() => removeSkill('technicalSkills', index)}
                                                        />
                                                    )}
                                                </Badge>
                                            ))}
                                            {isEditing && (
                                                <div className="flex gap-2">
                                                    <Input 
                                                        placeholder="Add skill"
                                                        value={newSkill}
                                                        onChange={(e) => setNewSkill(e.target.value)}
                                                        className="w-24"
                                                    />
                                                    <Button 
                                                        size="sm" 
                                                        onClick={() => addSkill('technicalSkills')}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Soft Skills */}
                                    <div>
                                        <Label className="text-base font-medium">Soft Skills</Label>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {profile.softSkills.map((skill, index) => (
                                                <Badge key={index} className="bg-green-100 text-green-800">
                                                    {skill}
                                                    {isEditing && (
                                                        <X 
                                                            className="w-3 h-3 ml-1 cursor-pointer" 
                                                            onClick={() => removeSkill('softSkills', index)}
                                                        />
                                                    )}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Interests */}
                                    <div>
                                        <Label className="text-base font-medium">Areas of Interest</Label>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {profile.interests.map((interest, index) => (
                                                <Badge key={index} className="bg-purple-100 text-purple-800">
                                                    {interest}
                                                    {isEditing && (
                                                        <X 
                                                            className="w-3 h-3 ml-1 cursor-pointer" 
                                                            onClick={() => removeSkill('interests', index)}
                                                        />
                                                    )}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Projects */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-red-600" />
                                    Projects
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {profile.projects.map((project) => (
                                        <div key={project.id} className="border rounded-lg p-4">
                                            <h3 className="font-semibold text-lg">{project.title}</h3>
                                            <p className="text-gray-600 mt-1">{project.description}</p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {project.technologies.map((tech, index) => (
                                                    <Badge key={index} variant="outline">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                            {project.link && (
                                                <a 
                                                    href={project.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline mt-2 inline-block"
                                                >
                                                    View Project →
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Profile Completion */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Profile Completion</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span>Overall Progress</span>
                                        <span className="font-bold">85%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div className="bg-green-600 h-3 rounded-full" style={{width: '85%'}}></div>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p>✅ Personal Information</p>
                                        <p>✅ Academic Details</p>
                                        <p>✅ Skills & Projects</p>
                                        <p>⚠️ Upload Resume</p>
                                        <p>⚠️ Add Certifications</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Achievements */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="w-5 h-5 text-red-600" />
                                    Achievements
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {profile.achievements.map((achievement, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <Award className="w-4 h-4 text-yellow-500 mt-0.5" />
                                            <p className="text-sm">{achievement}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Certifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-red-600" />
                                    Certifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {profile.certifications.map((cert) => (
                                        <div key={cert.id} className="border rounded-lg p-3">
                                            <h4 className="font-medium">{cert.name}</h4>
                                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                                            <p className="text-xs text-gray-500">{new Date(cert.date).toLocaleDateString()}</p>
                                            {cert.file ? (
                                                <Button variant="outline" size="sm" className="mt-2">
                                                    <FileText className="w-3 h-3 mr-1" />
                                                    View Certificate
                                                </Button>
                                            ) : (
                                                <Button variant="ghost" size="sm" className="mt-2 text-blue-600">
                                                    <Upload className="w-3 h-3 mr-1" />
                                                    Upload Certificate
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    
                                    {isEditing && (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                            <h4 className="font-medium mb-3">Add New Certification</h4>
                                            <div className="space-y-2">
                                                <Input 
                                                    placeholder="Certification Name"
                                                    value={newCertification.name}
                                                    onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
                                                />
                                                <Input 
                                                    placeholder="Issuing Authority"
                                                    value={newCertification.issuer}
                                                    onChange={(e) => setNewCertification({...newCertification, issuer: e.target.value})}
                                                />
                                                <Input 
                                                    type="date"
                                                    value={newCertification.date}
                                                    onChange={(e) => setNewCertification({...newCertification, date: e.target.value})}
                                                />
                                                <Button onClick={addCertification} size="sm" className="w-full">
                                                    <Plus className="w-3 h-3 mr-1" />
                                                    Add Certification
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentProfile
