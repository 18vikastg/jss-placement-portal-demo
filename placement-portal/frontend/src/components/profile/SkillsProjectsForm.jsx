import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Loader2, Plus, X } from 'lucide-react';

const SkillsProjectsForm = ({ isOpen, onClose, user, onUpdate, loading }) => {
    const [formData, setFormData] = useState({
        programmingLanguages: user?.profile?.skillsAndProjects?.programmingLanguages || [],
        frameworks: user?.profile?.skillsAndProjects?.frameworks || [],
        databases: user?.profile?.skillsAndProjects?.databases || [],
        tools: user?.profile?.skillsAndProjects?.tools || [],
        certifications: user?.profile?.skillsAndProjects?.certifications || [],
        projects: user?.profile?.skillsAndProjects?.projects || []
    });

    const [newSkill, setNewSkill] = useState('');
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        technologies: [],
        githubLink: '',
        liveLink: '',
        duration: '',
        role: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onUpdate(formData);
        onClose();
    };

    const addSkill = (category) => {
        if (newSkill.trim()) {
            setFormData(prev => ({
                ...prev,
                [category]: [...prev[category], newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const removeSkill = (category, index) => {
        setFormData(prev => ({
            ...prev,
            [category]: prev[category].filter((_, i) => i !== index)
        }));
    };

    const addProject = () => {
        if (newProject.title && newProject.description) {
            setFormData(prev => ({
                ...prev,
                projects: [...prev.projects, { ...newProject }]
            }));
            setNewProject({
                title: '',
                description: '',
                technologies: [],
                githubLink: '',
                liveLink: '',
                duration: '',
                role: ''
            });
        }
    };

    const removeProject = (index) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }));
    };

    const SkillSection = ({ title, category, placeholder }) => (
        <div className="space-y-2">
            <Label>{title}</Label>
            <div className="flex flex-wrap gap-2 mb-2">
                {formData[category].map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => removeSkill(category, index)}
                        />
                    </Badge>
                ))}
            </div>
            <div className="flex gap-2">
                <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder={placeholder}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(category))}
                />
                <Button 
                    type="button" 
                    size="sm" 
                    onClick={() => addSkill(category)}
                    disabled={!newSkill.trim()}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Skills & Projects</DialogTitle>
                    <DialogDescription>
                        Add your technical skills and project experience to showcase your capabilities.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SkillSection
                            title="Programming Languages"
                            category="programmingLanguages"
                            placeholder="e.g., JavaScript, Python, Java"
                        />
                        <SkillSection
                            title="Frameworks & Libraries"
                            category="frameworks"
                            placeholder="e.g., React, Node.js, Django"
                        />
                        <SkillSection
                            title="Databases"
                            category="databases"
                            placeholder="e.g., MongoDB, MySQL, PostgreSQL"
                        />
                        <SkillSection
                            title="Tools & Technologies"
                            category="tools"
                            placeholder="e.g., Git, Docker, AWS"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-lg font-semibold">Projects</Label>
                            <Button type="button" size="sm" onClick={() => {
                                const projectsSection = document.getElementById('add-project-section');
                                projectsSection.scrollIntoView({ behavior: 'smooth' });
                            }}>
                                <Plus className="h-4 w-4 mr-1" />
                                Add Project
                            </Button>
                        </div>
                        
                        <div className="space-y-4">
                            {formData.projects.map((project, index) => (
                                <div key={index} className="border rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold">{project.title}</h4>
                                            <p className="text-sm text-gray-600">{project.description}</p>
                                            {project.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {project.technologies.map((tech, i) => (
                                                        <Badge key={i} variant="outline" className="text-xs">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeProject(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div id="add-project-section" className="border rounded-lg p-4 space-y-4">
                            <h4 className="font-semibold">Add New Project</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="projectTitle">Project Title</Label>
                                    <Input
                                        id="projectTitle"
                                        value={newProject.title}
                                        onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Enter project title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="projectRole">Your Role</Label>
                                    <Input
                                        id="projectRole"
                                        value={newProject.role}
                                        onChange={(e) => setNewProject(prev => ({ ...prev, role: e.target.value }))}
                                        placeholder="e.g., Full Stack Developer"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="projectDescription">Description</Label>
                                <Textarea
                                    id="projectDescription"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Describe your project..."
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="githubLink">GitHub Link</Label>
                                    <Input
                                        id="githubLink"
                                        value={newProject.githubLink}
                                        onChange={(e) => setNewProject(prev => ({ ...prev, githubLink: e.target.value }))}
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="liveLink">Live Demo Link</Label>
                                    <Input
                                        id="liveLink"
                                        value={newProject.liveLink}
                                        onChange={(e) => setNewProject(prev => ({ ...prev, liveLink: e.target.value }))}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="projectDuration">Duration</Label>
                                <Input
                                    id="projectDuration"
                                    value={newProject.duration}
                                    onChange={(e) => setNewProject(prev => ({ ...prev, duration: e.target.value }))}
                                    placeholder="e.g., 3 months"
                                />
                            </div>

                            <Button 
                                type="button" 
                                onClick={addProject}
                                disabled={!newProject.title || !newProject.description}
                                className="w-full"
                            >
                                Add Project
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SkillsProjectsForm;
