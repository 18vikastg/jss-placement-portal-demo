import { useState, useEffect } from 'react';
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    GraduationCap, 
    Briefcase, 
    Code, 
    ExternalLink,
    Github,
    Calendar,
    Award,
    Target
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const LinkFolioPortfolio = ({ profileData, onEdit, onClose }) => {
    const [activeSection, setActiveSection] = useState('personal');

    const sections = [
        { id: 'personal', title: 'Personal Info', icon: User },
        { id: 'education', title: 'Education', icon: GraduationCap },
        { id: 'experience', title: 'Experience', icon: Briefcase },
        { id: 'projects', title: 'Projects', icon: Code },
        { id: 'skills', title: 'Skills', icon: Target }
    ];

    const renderPersonalSection = () => (
        <div className="space-y-6">
            <div className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mx-auto mb-4">
                    {profileData?.profilePicture ? (
                        <img src={profileData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-16 h-16 text-gray-400" />
                    )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{profileData?.fullName || 'Your Name'}</h1>
                <p className="text-lg text-gray-600 mt-2">{profileData?.objective || 'Professional objective will appear here'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-red-600" />
                    <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium">{profileData?.email || 'email@example.com'}</div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-red-600" />
                    <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium">{profileData?.phone || '+91 XXXXX XXXXX'}</div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium">{profileData?.location || 'City, State'}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderEducationSection = () => (
        <div className="space-y-6">
            {profileData?.education?.length > 0 ? (
                profileData.education.map((edu, index) => (
                    <Card key={index} className="border-l-4 border-l-red-600">
                        <CardHeader>
                            <CardTitle className="text-xl">{edu.institution}</CardTitle>
                            <div className="flex items-center gap-4 text-gray-600">
                                <span>{edu.degree} in {edu.field}</span>
                                <span>•</span>
                                <span>{edu.startYear} - {edu.endYear}</span>
                                {edu.grade && (
                                    <>
                                        <span>•</span>
                                        <span className="font-medium">{edu.grade}</span>
                                    </>
                                )}
                            </div>
                        </CardHeader>
                        {edu.achievements && (
                            <CardContent>
                                <div className="flex items-start gap-2">
                                    <Award className="w-4 h-4 text-yellow-600 mt-0.5" />
                                    <p className="text-gray-700">{edu.achievements}</p>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                ))
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No education information added yet</p>
                </div>
            )}
        </div>
    );

    const renderExperienceSection = () => (
        <div className="space-y-6">
            {profileData?.experience?.length > 0 && profileData.experience[0]?.company ? (
                profileData.experience.map((exp, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-600">
                        <CardHeader>
                            <CardTitle className="text-xl">{exp.position}</CardTitle>
                            <div className="flex items-center gap-4 text-gray-600">
                                <span className="font-medium">{exp.company}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        {exp.description && (
                            <CardContent>
                                <p className="text-gray-700">{exp.description}</p>
                            </CardContent>
                        )}
                    </Card>
                ))
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No work experience added yet</p>
                </div>
            )}
        </div>
    );

    const renderProjectsSection = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileData?.projects?.length > 0 && profileData.projects[0]?.title ? (
                profileData.projects.map((project, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 mb-4">{project.description}</p>
                            
                            {project.technologies.length > 0 && (
                                <div className="mb-4">
                                    <div className="text-sm font-medium text-gray-500 mb-2">Technologies:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, techIndex) => (
                                            <Badge key={techIndex} variant="secondary">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex gap-2">
                                {project.liveLink && (
                                    <Button size="sm" variant="outline" asChild>
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            Live Demo
                                        </a>
                                    </Button>
                                )}
                                {project.githubLink && (
                                    <Button size="sm" variant="outline" asChild>
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-4 h-4 mr-1" />
                                            GitHub
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                    <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No projects added yet</p>
                </div>
            )}
        </div>
    );

    const renderSkillsSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
                {profileData?.skills?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                            <Badge key={index} variant="default" className="bg-red-600 hover:bg-red-700">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No skills added yet</p>
                )}
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4">Job Interests</h3>
                {profileData?.interestedJobs?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {profileData.interestedJobs.map((job, index) => (
                            <Badge key={index} variant="outline" className="border-red-200 text-red-700">
                                {job}
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No job interests added yet</p>
                )}
            </div>
        </div>
    );

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'personal': return renderPersonalSection();
            case 'education': return renderEducationSection();
            case 'experience': return renderExperienceSection();
            case 'projects': return renderProjectsSection();
            case 'skills': return renderSkillsSection();
            default: return renderPersonalSection();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold text-red-600">LinkFolio</h1>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">{profileData?.fullName || 'Your Portfolio'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button onClick={onEdit} variant="outline" size="sm">
                                Edit Portfolio
                            </Button>
                            <Button onClick={onClose} variant="ghost" size="sm">
                                Back to Dashboard
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-4 sticky top-8">
                            <nav className="space-y-2">
                                {sections.map((section) => {
                                    const Icon = section.icon;
                                    const isActive = activeSection === section.id;
                                    
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                                isActive 
                                                    ? 'bg-red-600 text-white' 
                                                    : 'hover:bg-gray-50 text-gray-700'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{section.title}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {renderSectionContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkFolioPortfolio;
