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
    
    // Calculate profile completion
    const calculateProfileCompletion = () => {
        const profile = user?.profile || {}
        let completion = 0
        
        // Basic info (25%)
        if (user?.fullname) completion += 5
        if (user?.email) completion += 5
        if (user?.phoneNumber) completion += 5
        if (profile?.bio) completion += 5
        if (profile?.profilePhoto) completion += 5
        
        // Academic info (25%)
        if (profile?.academicInfo?.department) completion += 8
        if (profile?.academicInfo?.semester) completion += 8
        if (profile?.academicInfo?.cgpa) completion += 9
        
        // Skills & Projects (25%)
        if (profile?.skills?.length > 0) completion += 8
        if (profile?.skillsAndProjects?.projects?.length > 0) completion += 8
        if (profile?.skillsAndProjects?.internships?.length > 0) completion += 9
        
        // Documents (25%)
        if (profile?.resume) completion += 15
        if (profile?.documents?.certificates?.length > 0) completion += 10
        
        return Math.min(Math.round(completion), 100)
    }
    
    const profileCompletion = calculateProfileCompletion()
    
    // Profile sections for completion tracking
    const profileSections = [
        {
            title: 'Personal Information',
            completed: !!(user?.fullname && user?.email && user?.phoneNumber && user?.profile?.bio),
            icon: User,
            color: 'bg-blue-500'
        },
        {
            title: 'Academic Details',
            completed: !!(user?.profile?.academicInfo?.department && user?.profile?.academicInfo?.semester && user?.profile?.academicInfo?.cgpa),
            icon: GraduationCap,
            color: 'bg-green-500'
        },
        {
            title: 'Skills & Projects',
            completed: !!(user?.profile?.skills?.length > 0 && user?.profile?.skillsAndProjects?.projects?.length > 0),
            icon: Code,
            color: 'bg-purple-500'
        },
        {
            title: 'Resume & Documents',
            completed: !!(user?.profile?.resume),
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
                                    src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                                    alt="profile" 
                                />
                            </Avatar>
                            <div className='text-center sm:text-left flex-1'>
                                <h1 className='font-bold text-3xl text-gray-900 mb-2'>{user?.fullname}</h1>
                                <p className='text-gray-600 text-lg mb-4'>{user?.profile?.bio || 'No bio added yet'}</p>
                                
                                {/* Quick Info Badges */}
                                <div className='flex flex-wrap gap-2 justify-center sm:justify-start mb-4'>
                                    {user?.profile?.academicInfo?.department && (
                                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                            <GraduationCap className="w-4 h-4 mr-1" />
                                            {user.profile.academicInfo.department}
                                        </Badge>
                                    )}
                                    {user?.profile?.academicInfo?.semester && (
                                        <Badge className="bg-green-100 text-green-800 border-green-200">
                                            Sem {user.profile.academicInfo.semester}
                                        </Badge>
                                    )}
                                    {user?.profile?.academicInfo?.cgpa && (
                                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                                            CGPA: {user.profile.academicInfo.cgpa}
                                        </Badge>
                                    )}
                                </div>
                                
                                {/* Contact Info */}
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-3 text-gray-600'>
                                        <Mail className="w-5 h-5" />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-gray-600'>
                                        <Phone className="w-5 h-5" />
                                        <span>{user?.phoneNumber}</span>
                                    </div>
                                    {user?.profile?.personalInfo?.address?.current && (
                                        <div className='flex items-center gap-3 text-gray-600'>
                                            <MapPin className="w-5 h-5" />
                                            <span>{user.profile.personalInfo.address.current}</span>
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
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {profileSections.map((section, index) => (
                                            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${section.completed ? section.color : 'bg-gray-200'}`}>
                                                    <section.icon className={`w-4 h-4 ${section.completed ? 'text-white' : 'text-gray-400'}`} />
                                                </div>
                                                <span className={`text-sm ${section.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {section.title}
                                                </span>
                                                {section.completed && (
                                                    <Star className="w-4 h-4 text-yellow-500 ml-auto" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <Button onClick={() => setOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                                        <Pen className="w-4 h-4 mr-2" />
                                        Update Profile
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </motion.div>

                {/* Skills Section */}
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
                        {user?.profile?.skills?.length > 0 ? (
                            user.profile.skills.map((skill, index) => (
                                <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-200 px-4 py-2 text-sm">
                                    {skill}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No skills added yet. Update your profile to add skills.</p>
                        )}
                    </div>
                </motion.div>

                {/* Resume Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className='bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8'
                >
                    <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2'>
                        <FileText className="w-6 h-6 text-orange-500" />
                        Resume & Documents
                    </h2>
                    <div className='space-y-4'>
                        {user?.profile?.resume ? (
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
                            <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-600">No resume uploaded yet</p>
                                <Button 
                                    onClick={() => setOpen(true)} 
                                    className="mt-3"
                                    variant="outline"
                                >
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