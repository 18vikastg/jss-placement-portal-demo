import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './shared/NavbarNew'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Mail, Pen, User, GraduationCap, Code, FileText, MapPin, Phone, Star, Target, Briefcase, Download } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);
    
    // Calculate profile completion based on actual user data
    const calculateProfileCompletion = () => {
        if (!user) return 0;
        
        let completion = 0;
        
        // Basic registration info is already complete (fullname, email, phone)
        completion += 30; // Base registration data
        
        // Bio (15%)
        if (user?.profile?.bio && user.profile.bio.trim()) completion += 15;
        
        // Academic info (25%)
        if (user?.profile?.branch && user.profile.branch.trim()) completion += 8;
        if (user?.profile?.semester) completion += 8;
        if (user?.profile?.cgpa) completion += 9;
        
        // Skills (15%)
        if (user?.profile?.skills && user.profile.skills.length > 0 && user.profile.skills.some(skill => skill && skill.trim())) {
            completion += 15;
        }
        
        // Resume (15%)
        if (user?.profile?.resume && user.profile.resume.trim()) completion += 15;
        
        return Math.min(Math.round(completion), 100);
    }
    
    const profileCompletion = calculateProfileCompletion()
    
    // Profile sections for completion tracking - only show what user has actually entered
    const profileSections = [
        {
            title: 'Personal Information',
            completed: !!(user?.profile?.bio && user.profile.bio.trim()),
            icon: User,
            color: 'bg-blue-500'
        },
        {
            title: 'Academic Details',
            completed: !!(user?.profile?.branch?.trim() && user?.profile?.semester && user?.profile?.cgpa),
            icon: GraduationCap,
            color: 'bg-green-500'
        },
        {
            title: 'Skills',
            completed: !!(user?.profile?.skills && user.profile.skills.length > 0 && user.profile.skills.some(skill => skill && skill.trim())),
            icon: Code,
            color: 'bg-purple-500'
        },
        {
            title: 'Resume',
            completed: !!(user?.profile?.resume && user.profile.resume.trim()),
            icon: FileText,
            color: 'bg-orange-500'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Navbar />
            
            {/* Hero Section with Profile Overview */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8'
                >
                    <div className='flex flex-col lg:flex-row justify-between gap-8'>
                        <div className='flex flex-col sm:flex-row items-center lg:items-start gap-6 flex-1'>
                            <Avatar className="h-32 w-32 ring-4 ring-blue-100">
                                <AvatarImage 
                                    src={user?.profile?.profilePhoto && user.profile.profilePhoto.trim() && !user.profile.profilePhoto.includes('shutterstock') 
                                        ? user.profile.profilePhoto 
                                        : "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                                    alt="profile" 
                                />
                            </Avatar>
                            <div className='text-center sm:text-left flex-1'>
                                <h1 className='font-bold text-3xl text-gray-900 mb-2'>{user?.fullname || 'Unknown User'}</h1>
                                <p className='text-gray-600 text-lg mb-4'>
                                    {user?.profile?.bio && user.profile.bio.trim() ? user.profile.bio.trim() : 'No bio added yet'}
                                </p>
                                
                                {/* Academic Badges - Only show if data exists */}
                                <div className='flex flex-wrap gap-2 justify-center sm:justify-start mb-4'>
                                    {user?.profile?.branch?.trim() && (
                                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                            <GraduationCap className="w-4 h-4 mr-1" />
                                            {user.profile.branch}
                                        </Badge>
                                    )}
                                    {user?.profile?.semester && (
                                        <Badge className="bg-green-100 text-green-800 border-green-200">
                                            Sem {user.profile.semester}
                                        </Badge>
                                    )}
                                    {user?.profile?.cgpa && (
                                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                                            CGPA: {user.profile.cgpa}
                                        </Badge>
                                    )}
                                </div>
                                
                                {/* Contact Info - From registration only */}
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-3 text-gray-600'>
                                        <Mail className="w-5 h-5" />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-gray-600'>
                                        <Phone className="w-5 h-5" />
                                        <span>{user?.phoneNumber}</span>
                                    </div>
                                    {user?.profile?.address?.trim() && (
                                        <div className='flex items-center gap-3 text-gray-600'>
                                            <MapPin className="w-5 h-5" />
                                            <span>{user.profile.address}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {/* Profile Completion Card */}
                        <div className='lg:w-80'>
                            <Card className="border-l-4 border-l-blue-500">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Target className="w-5 h-5 text-blue-500" />
                                        Profile Completion
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-1">{profileCompletion}%</div>
                                        <Progress value={profileCompletion} className="h-3" />
                                        <p className="text-sm text-gray-500 mt-2">
                                            {profileCompletion < 50 ? "Get started by filling your basic info" : 
                                             profileCompletion < 80 ? "You're doing great! Keep adding more details" : 
                                             "Excellent! Your profile looks complete"}
                                        </p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {profileSections.map((section, index) => (
                                            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setOpen(true)}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${section.completed ? section.color : 'bg-gray-200'}`}>
                                                    <section.icon className={`w-4 h-4 ${section.completed ? 'text-white' : 'text-gray-400'}`} />
                                                </div>
                                                <span className={`text-sm flex-1 ${section.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {section.title}
                                                </span>
                                                {section.completed ? (
                                                    <Star className="w-4 h-4 text-yellow-500" />
                                                ) : (
                                                    <span className="text-xs text-gray-400">Pending</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <Button onClick={() => setOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                                        <Pen className="w-4 h-4 mr-2" />
                                        {profileCompletion < 100 ? "Complete Profile" : "Update Profile"}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8'
                >
                    <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                        <Code className="w-6 h-6 text-purple-500" />
                        Skills & Expertise
                    </h2>
                    <div className='flex flex-wrap gap-3'>
                        {user?.profile?.skills && user.profile.skills.length > 0 && user.profile.skills.some(skill => skill && skill.trim()) ? (
                            user.profile.skills
                                .filter(skill => skill && skill.trim())
                                .map((skill, index) => (
                                    <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2 text-sm">
                                        {skill.trim()}
                                    </Badge>
                                ))
                        ) : (
                            <div className="w-full text-center py-8">
                                <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg mb-2">No skills added yet</p>
                                <p className="text-gray-400 text-sm mb-4">Add your technical skills to showcase your expertise</p>
                                <Button 
                                    onClick={() => setOpen(true)} 
                                    variant="outline"
                                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                                >
                                    <Code className="w-4 h-4 mr-2" />
                                    Add Skills
                                </Button>
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8'
                >
                    <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                        <FileText className="w-6 h-6 text-orange-500" />
                        Resume
                    </h2>
                    <div className='space-y-4'>
                        {user?.profile?.resume && user.profile.resume.trim() ? (
                            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{user?.profile?.resumeOriginalName || 'Resume.pdf'}</p>
                                        <p className="text-sm text-gray-600">Uploaded resume</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={user.profile.resume} target="_blank" rel="noopener noreferrer">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download
                                    </a>
                                </Button>
                            </div>
                        ) : (
                            <div className="p-8 border-2 border-dashed border-gray-300 rounded-xl text-center">
                                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg mb-2">No resume uploaded yet</p>
                                <p className="text-gray-400 text-sm mb-4">Upload your resume to improve your profile visibility</p>
                                <Button 
                                    onClick={() => setOpen(true)} 
                                    className="bg-orange-500 hover:bg-orange-600"
                                >
                                    <FileText className="w-4 h-4 mr-2" />
                                    Upload Resume
                                </Button>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Applied Jobs Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8'
                >
                    <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                        <Briefcase className="w-6 h-6 text-green-500" />
                        Applied Jobs
                    </h2>
                    <AppliedJobTable />
                </motion.div>
            </div>
            
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile