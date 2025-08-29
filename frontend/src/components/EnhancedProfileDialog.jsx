import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
    Loader2, 
    User, 
    GraduationCap, 
    Code, 
    FileText, 
    Plus, 
    X, 
    Download,
    Save,
    Calendar,
    MapPin,
    Phone,
    Mail,
    Award,
    Briefcase,
    Github,
    Linkedin,
    Globe
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constants'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const EnhancedProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const [generateResumeLoading, setGenerateResumeLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    // Comprehensive profile state
    const [profileData, setProfileData] = useState({
        // Basic Information
        fullname: '',
        email: '',
        phoneNumber: '',
        bio: '',
        address: '',
        dateOfBirth: '',
        
        // Academic Information
        branch: '',
        semester: '',
        cgpa: '',
        university: 'JSS Academy of Technical Education',
        year: '',
        
        // Skills
        skills: [],
        
        // Experience
        experiences: [],
        
        // Projects
        projects: [],
        
        // Certifications
        certifications: [],
        
        // Social Links
        socialLinks: {
            github: '',
            linkedin: '',
            portfolio: ''
        },
        
        // Resume
        resume: null
    });

    const [newSkill, setNewSkill] = useState('');
    const [newExperience, setNewExperience] = useState({
        title: '',
        company: '',
        duration: '',
        description: ''
    });
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        technologies: '',
        link: ''
    });
    const [newCertification, setNewCertification] = useState({
        name: '',
        issuer: '',
        date: ''
    });

    // Initialize profile data when user data is available
    useEffect(() => {
        if (user) {
            setProfileData({
                fullname: user.fullname || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                bio: user.profile?.bio || '',
                address: user.profile?.address || '',
                dateOfBirth: user.profile?.dateOfBirth || '',
                branch: user.profile?.branch || '',
                semester: user.profile?.semester || '',
                cgpa: user.profile?.cgpa || '',
                university: user.profile?.university || 'JSS Academy of Technical Education',
                year: user.profile?.year || '',
                skills: user.profile?.skills || [],
                experiences: user.profile?.experiences || [],
                projects: user.profile?.projects || [],
                certifications: user.profile?.certifications || [],
                socialLinks: {
                    github: user.profile?.socialLinks?.github || '',
                    linkedin: user.profile?.socialLinks?.linkedin || '',
                    portfolio: user.profile?.socialLinks?.portfolio || ''
                },
                resume: user.profile?.resume || null
            });
        }
    }, [user]);

    const dispatch = useDispatch();

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSocialLinkChange = (platform, value) => {
        setProfileData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value
            }
        }));
    };

    const addSkill = () => {
        if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
            setProfileData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setProfileData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const addExperience = () => {
        if (newExperience.title.trim() && newExperience.company.trim()) {
            setProfileData(prev => ({
                ...prev,
                experiences: [...prev.experiences, { ...newExperience, id: Date.now() }]
            }));
            setNewExperience({ title: '', company: '', duration: '', description: '' });
        }
    };

    const removeExperience = (id) => {
        setProfileData(prev => ({
            ...prev,
            experiences: prev.experiences.filter(exp => exp.id !== id)
        }));
    };

    const addProject = () => {
        if (newProject.title.trim() && newProject.description.trim()) {
            setProfileData(prev => ({
                ...prev,
                projects: [...prev.projects, { ...newProject, id: Date.now() }]
            }));
            setNewProject({ title: '', description: '', technologies: '', link: '' });
        }
    };

    const removeProject = (id) => {
        setProfileData(prev => ({
            ...prev,
            projects: prev.projects.filter(project => project.id !== id)
        }));
    };

    const addCertification = () => {
        if (newCertification.name.trim() && newCertification.issuer.trim()) {
            setProfileData(prev => ({
                ...prev,
                certifications: [...prev.certifications, { ...newCertification, id: Date.now() }]
            }));
            setNewCertification({ name: '', issuer: '', date: '' });
        }
    };

    const removeCertification = (id) => {
        setProfileData(prev => ({
            ...prev,
            certifications: prev.certifications.filter(cert => cert.id !== id)
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileData(prev => ({
                ...prev,
                resume: file
            }));
        }
    };

    const saveProfile = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            
            // Add all profile data to formData
            Object.keys(profileData).forEach(key => {
                if (key === 'socialLinks') {
                    formData.append('socialLinks', JSON.stringify(profileData.socialLinks));
                } else if (Array.isArray(profileData[key])) {
                    formData.append(key, JSON.stringify(profileData[key]));
                } else if (profileData[key] !== null && profileData[key] !== '') {
                    formData.append(key, profileData[key]);
                }
            });

            const res = await axios.post(`${USER_API_END_POINT}/profile/enhanced-update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success('Profile updated successfully!');
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const generateResume = async () => {
        try {
            setGenerateResumeLoading(true);
            const response = await axios.post(`${USER_API_END_POINT}/profile/generate-resume`, {
                profileData
            }, {
                responseType: 'blob',
                withCredentials: true
            });

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${profileData.fullname}_Resume.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success('Resume generated and downloaded successfully!');
        } catch (error) {
            console.log(error);
            toast.error('Failed to generate resume');
        } finally {
            setGenerateResumeLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                        <User className="w-6 h-6" />
                        Complete Your Profile
                    </DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="academic">Academic</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                    </TabsList>

                    {/* Basic Information Tab */}
                    <TabsContent value="basic" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="fullname">Full Name *</Label>
                                        <Input
                                            id="fullname"
                                            value={profileData.fullname}
                                            onChange={(e) => handleInputChange('fullname', e.target.value)}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="phone">Phone Number *</Label>
                                        <Input
                                            id="phone"
                                            value={profileData.phoneNumber}
                                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <Input
                                            id="dob"
                                            type="date"
                                            value={profileData.dateOfBirth}
                                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        value={profileData.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        placeholder="Tell us about yourself..."
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        value={profileData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        placeholder="Enter your complete address"
                                        rows={2}
                                    />
                                </div>

                                {/* Social Links */}
                                <div className="space-y-3">
                                    <Label>Social Links</Label>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex items-center gap-2">
                                            <Github className="w-5 h-5 text-gray-600" />
                                            <Input
                                                value={profileData.socialLinks.github}
                                                onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                                                placeholder="GitHub profile URL"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Linkedin className="w-5 h-5 text-gray-600" />
                                            <Input
                                                value={profileData.socialLinks.linkedin}
                                                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                                                placeholder="LinkedIn profile URL"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-5 h-5 text-gray-600" />
                                            <Input
                                                value={profileData.socialLinks.portfolio}
                                                onChange={(e) => handleSocialLinkChange('portfolio', e.target.value)}
                                                placeholder="Portfolio website URL"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Academic Information Tab */}
                    <TabsContent value="academic" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5" />
                                    Academic Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="university">University/Institution</Label>
                                    <Input
                                        id="university"
                                        value={profileData.university}
                                        onChange={(e) => handleInputChange('university', e.target.value)}
                                        placeholder="JSS Academy of Technical Education"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="branch">Branch/Course</Label>
                                        <Select value={profileData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your branch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Computer Science Engineering">Computer Science Engineering</SelectItem>
                                                <SelectItem value="Information Science Engineering">Information Science Engineering</SelectItem>
                                                <SelectItem value="Electronics and Communication Engineering">Electronics and Communication Engineering</SelectItem>
                                                <SelectItem value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</SelectItem>
                                                <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                                                <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                                                <SelectItem value="Aerospace Engineering">Aerospace Engineering</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="year">Current Year</Label>
                                        <Select value={profileData.year} onValueChange={(value) => handleInputChange('year', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1st Year">1st Year</SelectItem>
                                                <SelectItem value="2nd Year">2nd Year</SelectItem>
                                                <SelectItem value="3rd Year">3rd Year</SelectItem>
                                                <SelectItem value="4th Year">4th Year</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="semester">Current Semester</Label>
                                        <Select value={profileData.semester} onValueChange={(value) => handleInputChange('semester', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select semester" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[1,2,3,4,5,6,7,8].map(sem => (
                                                    <SelectItem key={sem} value={sem.toString()}>{sem}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="cgpa">CGPA</Label>
                                        <Input
                                            id="cgpa"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="10"
                                            value={profileData.cgpa}
                                            onChange={(e) => handleInputChange('cgpa', e.target.value)}
                                            placeholder="Enter your CGPA"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Skills Tab */}
                    <TabsContent value="skills" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Code className="w-5 h-5" />
                                    Technical Skills
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <Input
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        placeholder="Add a skill (e.g., React, Python, Java)"
                                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                    />
                                    <Button onClick={addSkill} size="sm">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {profileData.skills.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                            {skill}
                                            <X 
                                                className="w-3 h-3 cursor-pointer hover:text-red-500" 
                                                onClick={() => removeSkill(skill)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Experience Tab */}
                    <TabsContent value="experience" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5" />
                                    Work Experience & Internships
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        value={newExperience.title}
                                        onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                                        placeholder="Job Title / Position"
                                    />
                                    <Input
                                        value={newExperience.company}
                                        onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                                        placeholder="Company Name"
                                    />
                                </div>
                                <Input
                                    value={newExperience.duration}
                                    onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
                                    placeholder="Duration (e.g., Jun 2023 - Aug 2023)"
                                />
                                <Textarea
                                    value={newExperience.description}
                                    onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                                    placeholder="Describe your role and achievements..."
                                    rows={3}
                                />
                                <Button onClick={addExperience} size="sm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Experience
                                </Button>

                                <div className="space-y-3">
                                    {profileData.experiences.map((exp) => (
                                        <div key={exp.id} className="p-4 border rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-semibold">{exp.title}</h4>
                                                    <p className="text-gray-600">{exp.company}</p>
                                                    <p className="text-sm text-gray-500">{exp.duration}</p>
                                                    <p className="text-sm mt-2">{exp.description}</p>
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => removeExperience(exp.id)}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Projects Tab */}
                    <TabsContent value="projects" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Code className="w-5 h-5" />
                                    Projects & Certifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Projects Section */}
                                <div>
                                    <h4 className="font-semibold mb-3">Projects</h4>
                                    <div className="space-y-3">
                                        <Input
                                            value={newProject.title}
                                            onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                                            placeholder="Project Title"
                                        />
                                        <Textarea
                                            value={newProject.description}
                                            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                                            placeholder="Project Description"
                                            rows={2}
                                        />
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input
                                                value={newProject.technologies}
                                                onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                                                placeholder="Technologies Used"
                                            />
                                            <Input
                                                value={newProject.link}
                                                onChange={(e) => setNewProject({...newProject, link: e.target.value})}
                                                placeholder="Project Link/GitHub"
                                            />
                                        </div>
                                        <Button onClick={addProject} size="sm">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Project
                                        </Button>
                                    </div>

                                    <div className="space-y-3 mt-4">
                                        {profileData.projects.map((project) => (
                                            <div key={project.id} className="p-4 border rounded-lg">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h5 className="font-semibold">{project.title}</h5>
                                                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                                                        <p className="text-sm text-blue-600 mt-1">Tech: {project.technologies}</p>
                                                        {project.link && (
                                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                                                                View Project →
                                                            </a>
                                                        )}
                                                    </div>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm"
                                                        onClick={() => removeProject(project.id)}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Certifications Section */}
                                <div>
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <Award className="w-4 h-4" />
                                        Certifications
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-3">
                                            <Input
                                                value={newCertification.name}
                                                onChange={(e) => setNewCertification({...newCertification, name: e.target.value})}
                                                placeholder="Certification Name"
                                            />
                                            <Input
                                                value={newCertification.issuer}
                                                onChange={(e) => setNewCertification({...newCertification, issuer: e.target.value})}
                                                placeholder="Issuing Organization"
                                            />
                                            <Input
                                                value={newCertification.date}
                                                onChange={(e) => setNewCertification({...newCertification, date: e.target.value})}
                                                placeholder="Date (e.g., Jan 2024)"
                                            />
                                        </div>
                                        <Button onClick={addCertification} size="sm">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Certification
                                        </Button>
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        {profileData.certifications.map((cert) => (
                                            <div key={cert.id} className="flex justify-between items-center p-3 border rounded-lg">
                                                <div>
                                                    <h6 className="font-medium">{cert.name}</h6>
                                                    <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                                                </div>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    onClick={() => removeCertification(cert.id)}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Resume Upload */}
                                <div>
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Resume Upload
                                    </h4>
                                    <Input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                        className="mb-3"
                                    />
                                    {profileData.resume && (
                                        <p className="text-sm text-green-600">✓ Resume uploaded</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4 border-t">
                    <Button 
                        variant="outline" 
                        onClick={() => setOpen(false)}
                        disabled={loading || generateResumeLoading}
                    >
                        Cancel
                    </Button>
                    
                    <div className="flex gap-3">
                        <Button 
                            onClick={generateResume}
                            disabled={loading || generateResumeLoading}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {generateResumeLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                                <Download className="w-4 h-4 mr-2" />
                            )}
                            Generate Resume PDF
                        </Button>
                        
                        <Button 
                            onClick={saveProfile}
                            disabled={loading || generateResumeLoading}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            Save Profile
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EnhancedProfileDialog;
