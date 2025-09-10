import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    GraduationCap, 
    Briefcase, 
    Code, 
    Target,
    Plus,
    Edit,
    Eye,
    Save,
    Upload,
    X,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Star,
    Link as LinkIcon,
    Github,
    ExternalLink
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const LinkFolioBuilder = ({ onClose }) => {
    const { user } = useSelector(store => store.auth);
    const [currentStep, setCurrentStep] = useState(1);
    const [showPreview, setShowPreview] = useState(false);
    
    // Profile data state
    const [profileData, setProfileData] = useState({
        // Personal Information
        fullName: user?.fullname || '',
        email: user?.email || '',
        phone: '',
        location: '',
        objective: '',
        profilePicture: null,
        
        // Education
        education: [{
            institution: '',
            degree: '',
            field: '',
            startYear: '',
            endYear: '',
            grade: '',
            achievements: ''
        }],
        
        // Experience
        experience: [{
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
            current: false
        }],
        
        // Projects
        projects: [{
            title: '',
            description: '',
            technologies: [],
            liveLink: '',
            githubLink: '',
            image: null
        }],
        
        // Skills
        skills: [],
        
        // Interested Jobs
        interestedJobs: []
    });

    const [tempSkill, setTempSkill] = useState('');
    const [tempJob, setTempJob] = useState('');

    const steps = [
        { id: 1, title: 'Personal Info', icon: User },
        { id: 2, title: 'Education', icon: GraduationCap },
        { id: 3, title: 'Experience', icon: Briefcase },
        { id: 4, title: 'Projects', icon: Code },
        { id: 5, title: 'Skills & Interests', icon: Target }
    ];

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('linkfolio-profile', JSON.stringify(profileData));
    }, [profileData]);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('linkfolio-profile');
        if (saved) {
            setProfileData({ ...profileData, ...JSON.parse(saved) });
        }
    }, []);

    const handleInputChange = (section, field, value, index = null) => {
        setProfileData(prev => {
            if (index !== null) {
                const newArray = [...prev[section]];
                newArray[index] = { ...newArray[index], [field]: value };
                return { ...prev, [section]: newArray };
            } else {
                return { ...prev, [section]: value };
            }
        });
    };

    const addArrayItem = (section, template) => {
        setProfileData(prev => ({
            ...prev,
            [section]: [...prev[section], { ...template }]
        }));
    };

    const removeArrayItem = (section, index) => {
        setProfileData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const addSkill = () => {
        if (tempSkill.trim() && !profileData.skills.includes(tempSkill.trim())) {
            setProfileData(prev => ({
                ...prev,
                skills: [...prev.skills, tempSkill.trim()]
            }));
            setTempSkill('');
        }
    };

    const removeSkill = (skill) => {
        setProfileData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skill)
        }));
    };

    const addJob = () => {
        if (tempJob.trim() && !profileData.interestedJobs.includes(tempJob.trim())) {
            setProfileData(prev => ({
                ...prev,
                interestedJobs: [...prev.interestedJobs, tempJob.trim()]
            }));
            setTempJob('');
        }
    };

    const removeJob = (job) => {
        setProfileData(prev => ({
            ...prev,
            interestedJobs: prev.interestedJobs.filter(j => j !== job)
        }));
    };

    const handleFileUpload = (field, file, index = null) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (index !== null) {
                handleInputChange('projects', field, e.target.result, index);
            } else {
                setProfileData(prev => ({ ...prev, [field]: e.target.result }));
            }
        };
        reader.readAsDataURL(file);
    };

    const getCompletionPercentage = () => {
        let completed = 0;
        let total = 0;

        // Personal info (5 fields)
        const personalFields = ['fullName', 'email', 'phone', 'location', 'objective'];
        personalFields.forEach(field => {
            total++;
            if (profileData[field]) completed++;
        });

        // Education (at least one entry with basic info)
        total++;
        if (profileData.education[0]?.institution && profileData.education[0]?.degree) completed++;

        // Experience (optional but adds value)
        total++;
        if (profileData.experience[0]?.company && profileData.experience[0]?.position) completed++;

        // Projects (at least one)
        total++;
        if (profileData.projects[0]?.title && profileData.projects[0]?.description) completed++;

        // Skills
        total++;
        if (profileData.skills.length > 0) completed++;

        return Math.round((completed / total) * 100);
    };

    const renderPersonalInfo = () => (
        <div className="space-y-6">
            <div className="text-center">
                <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {profileData.profilePicture ? (
                            <img src={profileData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-12 h-12 text-gray-400" />
                        )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-red-600 text-white p-1 rounded-full cursor-pointer hover:bg-red-700">
                        <Upload className="w-3 h-3" />
                        <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => e.target.files[0] && handleFileUpload('profilePicture', e.target.files[0])}
                        />
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => handleInputChange('fullName', null, e.target.value)}
                        placeholder="Enter your full name"
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', null, e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', null, e.target.value)}
                        placeholder="Enter your phone number"
                    />
                </div>
                <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', null, e.target.value)}
                        placeholder="City, State"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="objective">Professional Objective *</Label>
                <Textarea
                    id="objective"
                    value={profileData.objective}
                    onChange={(e) => handleInputChange('objective', null, e.target.value)}
                    placeholder="Write a brief description about your career goals and what you're looking for..."
                    rows={3}
                />
            </div>
        </div>
    );

    const renderEducation = () => (
        <div className="space-y-6">
            {profileData.education.map((edu, index) => (
                <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Education {index + 1}</h4>
                        {profileData.education.length > 1 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeArrayItem('education', index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Institution *</Label>
                            <Input
                                value={edu.institution}
                                onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                                placeholder="University/College name"
                            />
                        </div>
                        <div>
                            <Label>Degree *</Label>
                            <Input
                                value={edu.degree}
                                onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                                placeholder="B.Tech, M.Tech, etc."
                            />
                        </div>
                        <div>
                            <Label>Field of Study</Label>
                            <Input
                                value={edu.field}
                                onChange={(e) => handleInputChange('education', 'field', e.target.value, index)}
                                placeholder="Computer Science, etc."
                            />
                        </div>
                        <div>
                            <Label>Grade/CGPA</Label>
                            <Input
                                value={edu.grade}
                                onChange={(e) => handleInputChange('education', 'grade', e.target.value, index)}
                                placeholder="8.5 CGPA or 85%"
                            />
                        </div>
                        <div>
                            <Label>Start Year</Label>
                            <Input
                                value={edu.startYear}
                                onChange={(e) => handleInputChange('education', 'startYear', e.target.value, index)}
                                placeholder="2020"
                            />
                        </div>
                        <div>
                            <Label>End Year</Label>
                            <Input
                                value={edu.endYear}
                                onChange={(e) => handleInputChange('education', 'endYear', e.target.value, index)}
                                placeholder="2024"
                            />
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <Label>Achievements (Optional)</Label>
                        <Textarea
                            value={edu.achievements}
                            onChange={(e) => handleInputChange('education', 'achievements', e.target.value, index)}
                            placeholder="Dean's list, scholarships, etc."
                            rows={2}
                        />
                    </div>
                </Card>
            ))}
            
            <Button
                onClick={() => addArrayItem('education', {
                    institution: '', degree: '', field: '', startYear: '', endYear: '', grade: '', achievements: ''
                })}
                variant="outline"
                className="w-full border-dashed border-2 border-red-200 text-red-600 hover:bg-red-50"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Education
            </Button>
        </div>
    );

    const renderExperience = () => (
        <div className="space-y-6">
            {profileData.experience.map((exp, index) => (
                <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Experience {index + 1}</h4>
                        {profileData.experience.length > 1 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeArrayItem('experience', index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Company/Organization</Label>
                            <Input
                                value={exp.company}
                                onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                                placeholder="Company name"
                            />
                        </div>
                        <div>
                            <Label>Position/Role</Label>
                            <Input
                                value={exp.position}
                                onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                                placeholder="Software Developer Intern"
                            />
                        </div>
                        <div>
                            <Label>Start Date</Label>
                            <Input
                                type="date"
                                value={exp.startDate}
                                onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                            />
                        </div>
                        <div>
                            <Label>End Date</Label>
                            <Input
                                type="date"
                                value={exp.endDate}
                                onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                                disabled={exp.current}
                            />
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                id={`current-${index}`}
                                checked={exp.current}
                                onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
                            />
                            <Label htmlFor={`current-${index}`}>Currently working here</Label>
                        </div>
                        
                        <Label>Description</Label>
                        <Textarea
                            value={exp.description}
                            onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                        />
                    </div>
                </Card>
            ))}
            
            <Button
                onClick={() => addArrayItem('experience', {
                    company: '', position: '', startDate: '', endDate: '', description: '', current: false
                })}
                variant="outline"
                className="w-full border-dashed border-2 border-red-200 text-red-600 hover:bg-red-50"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
            </Button>
        </div>
    );

    const renderProjects = () => (
        <div className="space-y-6">
            {profileData.projects.map((project, index) => (
                <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Project {index + 1}</h4>
                        {profileData.projects.length > 1 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeArrayItem('projects', index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <Label>Project Title *</Label>
                            <Input
                                value={project.title}
                                onChange={(e) => handleInputChange('projects', 'title', e.target.value, index)}
                                placeholder="My Awesome Project"
                            />
                        </div>
                        
                        <div>
                            <Label>Description *</Label>
                            <Textarea
                                value={project.description}
                                onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                                placeholder="Describe what this project does and your role in it..."
                                rows={3}
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Live Link (Optional)</Label>
                                <Input
                                    value={project.liveLink}
                                    onChange={(e) => handleInputChange('projects', 'liveLink', e.target.value, index)}
                                    placeholder="https://myproject.com"
                                />
                            </div>
                            <div>
                                <Label>GitHub Link (Optional)</Label>
                                <Input
                                    value={project.githubLink}
                                    onChange={(e) => handleInputChange('projects', 'githubLink', e.target.value, index)}
                                    placeholder="https://github.com/username/project"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <Label>Technologies Used</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {project.technologies.map((tech, techIndex) => (
                                    <Badge key={techIndex} variant="secondary" className="gap-1">
                                        {tech}
                                        <X 
                                            className="w-3 h-3 cursor-pointer" 
                                            onClick={() => {
                                                const newTechs = project.technologies.filter((_, i) => i !== techIndex);
                                                handleInputChange('projects', 'technologies', newTechs, index);
                                            }}
                                        />
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add technology (e.g., React, Node.js)"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const tech = e.target.value.trim();
                                            if (tech && !project.technologies.includes(tech)) {
                                                handleInputChange('projects', 'technologies', [...project.technologies, tech], index);
                                                e.target.value = '';
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
            
            <Button
                onClick={() => addArrayItem('projects', {
                    title: '', description: '', technologies: [], liveLink: '', githubLink: '', image: null
                })}
                variant="outline"
                className="w-full border-dashed border-2 border-red-200 text-red-600 hover:bg-red-50"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
            </Button>
        </div>
    );

    const renderSkillsAndInterests = () => (
        <div className="space-y-6">
            <div>
                <Label>Technical Skills</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {profileData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                            {skill}
                            <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Input
                        value={tempSkill}
                        onChange={(e) => setTempSkill(e.target.value)}
                        placeholder="Add a skill (e.g., JavaScript, Python)"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button onClick={addSkill} size="sm">Add</Button>
                </div>
            </div>

            <div>
                <Label>Interested Job Roles</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {profileData.interestedJobs.map((job, index) => (
                        <Badge key={index} variant="outline" className="gap-1">
                            {job}
                            <X className="w-3 h-3 cursor-pointer" onClick={() => removeJob(job)} />
                        </Badge>
                    ))}
                </div>
                <div className="flex gap-2">
                    <Input
                        value={tempJob}
                        onChange={(e) => setTempJob(e.target.value)}
                        placeholder="Add job interest (e.g., Software Developer, Data Scientist)"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addJob())}
                    />
                    <Button onClick={addJob} size="sm">Add</Button>
                </div>
            </div>
        </div>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return renderPersonalInfo();
            case 2: return renderEducation();
            case 3: return renderExperience();
            case 4: return renderProjects();
            case 5: return renderSkillsAndInterests();
            default: return renderPersonalInfo();
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return profileData.fullName && profileData.email && profileData.phone && profileData.location && profileData.objective;
            case 2:
                return profileData.education[0]?.institution && profileData.education[0]?.degree;
            case 3:
                return true; // Experience is optional
            case 4:
                return profileData.projects[0]?.title && profileData.projects[0]?.description;
            case 5:
                return true; // Skills are optional but recommended
            default:
                return false;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">LinkFolio Builder</h2>
                            <p className="text-red-100">Create your professional portfolio</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-sm text-red-100">Profile Completion</div>
                                <div className="text-xl font-bold">{getCompletionPercentage()}%</div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="text-white hover:bg-red-600"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Step Indicators */}
                <div className="bg-gray-50 px-6 py-4">
                    <div className="flex items-center justify-between">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isCompleted = currentStep > step.id;
                            
                            return (
                                <div key={step.id} className="flex items-center">
                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                                        isActive ? 'bg-red-600 text-white' : 
                                        isCompleted ? 'bg-green-600 text-white' : 
                                        'bg-gray-200 text-gray-600'
                                    }`}>
                                        {isCompleted ? (
                                            <CheckCircle className="w-4 h-4" />
                                        ) : (
                                            <Icon className="w-4 h-4" />
                                        )}
                                        <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                                    </div>
                                    {step.id < steps.length && (
                                        <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[50vh]">
                    {renderStepContent()}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </Button>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowPreview(true)}
                            className="flex items-center gap-2"
                        >
                            <Eye className="w-4 h-4" />
                            Preview
                        </Button>

                        {currentStep < steps.length ? (
                            <Button
                                onClick={() => setCurrentStep(currentStep + 1)}
                                disabled={!isStepValid()}
                                className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    // Save and close
                                    localStorage.setItem('linkfolio-profile', JSON.stringify(profileData));
                                    onClose();
                                }}
                                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save Portfolio
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <Dialog open={showPreview} onOpenChange={setShowPreview}>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Portfolio Preview</DialogTitle>
                        </DialogHeader>
                        {/* Portfolio preview content would go here */}
                        <div className="text-center py-8">
                            <p className="text-gray-600">Portfolio preview will be displayed here</p>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default LinkFolioBuilder;
