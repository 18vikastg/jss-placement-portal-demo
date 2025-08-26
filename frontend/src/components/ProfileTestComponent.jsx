import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useGetProfile from '@/hooks/useGetProfile';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { User, GraduationCap, Code, FileText, MapPin } from 'lucide-react';

const ProfileTestComponent = () => {
    const { user } = useSelector(store => store.auth);
    const { loading: profileLoading } = useGetProfile();
    const { 
        updatePersonalInfo,
        updateAcademicInfo,
        updateSkillsAndProjects,
        updatePlacementPreferences,
        uploadDocument,
        getProfileCompletion,
        loading: updateLoading 
    } = useUpdateProfile();

    const [profileCompletion, setProfileCompletion] = useState(0);
    const [sectionCompletions, setSectionCompletions] = useState({});
    const [formData, setFormData] = useState({
        usn: '',
        department: '',
        semester: '',
        cgpa: '',
        programmingLanguages: '',
        interestedDomains: ''
    });

    useEffect(() => {
        if (user?.profile) {
            const completion = user.profile.profileCompletion || 0;
            setProfileCompletion(completion);
            
            // Load existing data
            const personalInfo = user.profile.personalInfo || {};
            const academicInfo = user.profile.academicInfo || {};
            const skillsInfo = user.profile.skillsAndProjects || {};
            const preferences = user.profile.placementPreferences || {};
            
            setFormData({
                usn: personalInfo.usn || '',
                department: academicInfo.department || '',
                semester: academicInfo.semester || '',
                cgpa: academicInfo.cgpa || '',
                programmingLanguages: skillsInfo.programmingLanguages?.join(', ') || '',
                interestedDomains: preferences.interestedDomains?.join(', ') || ''
            });
        }
    }, [user]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleUpdatePersonal = async () => {
        try {
            await updatePersonalInfo({
                usn: formData.usn
            });
            toast.success('Personal information updated successfully!');
        } catch (error) {
            toast.error('Failed to update personal information');
        }
    };

    const handleUpdateAcademic = async () => {
        try {
            await updateAcademicInfo({
                department: formData.department,
                semester: parseInt(formData.semester),
                cgpa: parseFloat(formData.cgpa)
            });
            toast.success('Academic information updated successfully!');
        } catch (error) {
            toast.error('Failed to update academic information');
        }
    };

    const handleUpdateSkills = async () => {
        try {
            await updateSkillsAndProjects({
                programmingLanguages: formData.programmingLanguages.split(',').map(s => s.trim())
            });
            toast.success('Skills updated successfully!');
        } catch (error) {
            toast.error('Failed to update skills');
        }
    };

    const handleUpdatePreferences = async () => {
        try {
            await updatePlacementPreferences({
                interestedDomains: formData.interestedDomains.split(',').map(s => s.trim())
            });
            toast.success('Preferences updated successfully!');
        } catch (error) {
            toast.error('Failed to update preferences');
        }
    };

    const handleFileUpload = async (event, documentType) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            await uploadDocument(file, documentType);
            toast.success(`${documentType} uploaded successfully!`);
        } catch (error) {
            toast.error(`Failed to upload ${documentType}`);
        }
    };

    if (profileLoading) {
        return <div className="flex justify-center items-center h-64">Loading profile...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Preplink Profile Test</h1>
                <p className="text-gray-600">Test the enhanced profile completion system</p>
            </div>

            {/* Profile Completion Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile Completion
                    </CardTitle>
                    <CardDescription>
                        Complete your profile to increase your chances of placement
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm font-medium mb-2">
                                <span>Overall Progress</span>
                                <span>{profileCompletion}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                                    style={{ width: `${profileCompletion}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        {profileCompletion === 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-yellow-800 text-sm">
                                    🎯 Your profile is empty! Complete the sections below to get placement-ready.
                                </p>
                            </div>
                        )}
                        
                        {profileCompletion === 100 && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-green-800 text-sm">
                                    🎉 Congratulations! Your profile is 100% complete and ready for placements!
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Section 1: Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information (20%)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="usn">USN</Label>
                        <Input
                            id="usn"
                            value={formData.usn}
                            onChange={(e) => handleInputChange('usn', e.target.value)}
                            placeholder="Enter your USN"
                        />
                    </div>
                    <Button onClick={handleUpdatePersonal} disabled={updateLoading}>
                        Update Personal Info
                    </Button>
                </CardContent>
            </Card>

            {/* Section 2: Academic Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Academic Information (20%)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="department">Department</Label>
                            <Input
                                id="department"
                                value={formData.department}
                                onChange={(e) => handleInputChange('department', e.target.value)}
                                placeholder="e.g., Computer Science"
                            />
                        </div>
                        <div>
                            <Label htmlFor="semester">Semester</Label>
                            <Input
                                id="semester"
                                type="number"
                                value={formData.semester}
                                onChange={(e) => handleInputChange('semester', e.target.value)}
                                placeholder="e.g., 6"
                            />
                        </div>
                        <div>
                            <Label htmlFor="cgpa">CGPA</Label>
                            <Input
                                id="cgpa"
                                type="number"
                                step="0.01"
                                value={formData.cgpa}
                                onChange={(e) => handleInputChange('cgpa', e.target.value)}
                                placeholder="e.g., 8.5"
                            />
                        </div>
                    </div>
                    <Button onClick={handleUpdateAcademic} disabled={updateLoading}>
                        Update Academic Info
                    </Button>
                </CardContent>
            </Card>

            {/* Section 3: Skills */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Skills & Projects (20%)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="skills">Programming Languages</Label>
                        <Input
                            id="skills"
                            value={formData.programmingLanguages}
                            onChange={(e) => handleInputChange('programmingLanguages', e.target.value)}
                            placeholder="e.g., JavaScript, Python, Java"
                        />
                    </div>
                    <Button onClick={handleUpdateSkills} disabled={updateLoading}>
                        Update Skills
                    </Button>
                </CardContent>
            </Card>

            {/* Section 4: Documents */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Documents (20%)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="resume">Resume</Label>
                        <Input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileUpload(e, 'resume')}
                        />
                    </div>
                    <div>
                        <Label htmlFor="profilePicture">Profile Picture</Label>
                        <Input
                            id="profilePicture"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'profilePicture')}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Section 5: Placement Preferences */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Placement Preferences (20%)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="domains">Interested Domains</Label>
                        <Input
                            id="domains"
                            value={formData.interestedDomains}
                            onChange={(e) => handleInputChange('interestedDomains', e.target.value)}
                            placeholder="e.g., Software Development, Data Science"
                        />
                    </div>
                    <Button onClick={handleUpdatePreferences} disabled={updateLoading}>
                        Update Preferences
                    </Button>
                </CardContent>
            </Card>

            {/* Debug Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Debug Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">
                        {JSON.stringify({
                            profileCompletion,
                            userProfileStructure: user?.profile ? Object.keys(user.profile) : 'No profile',
                            formData
                        }, null, 2)}
                    </pre>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileTestComponent;
