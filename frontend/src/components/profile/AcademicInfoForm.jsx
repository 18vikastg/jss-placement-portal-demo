import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Loader2 } from 'lucide-react';

const AcademicInfoForm = ({ isOpen, onClose, user, onUpdate, loading }) => {
    const [formData, setFormData] = useState({
        department: user?.profile?.academicInfo?.department || '',
        batch: user?.profile?.academicInfo?.batch || '',
        semester: user?.profile?.academicInfo?.semester || '',
        cgpa: user?.profile?.academicInfo?.cgpa || '',
        percentage: user?.profile?.academicInfo?.percentage || '',
        tenthPercentage: user?.profile?.academicInfo?.tenthMarks?.percentage || '',
        tenthBoard: user?.profile?.academicInfo?.tenthMarks?.board || '',
        tenthYear: user?.profile?.academicInfo?.tenthMarks?.yearOfPassing || '',
        twelfthPercentage: user?.profile?.academicInfo?.twelfthMarks?.percentage || '',
        twelfthBoard: user?.profile?.academicInfo?.twelfthMarks?.board || '',
        twelfthYear: user?.profile?.academicInfo?.twelfthMarks?.yearOfPassing || '',
        backlogCount: user?.profile?.academicInfo?.backlogs?.count || 0,
        backlogSubjects: user?.profile?.academicInfo?.backlogs?.subjects?.join(', ') || '',
        achievements: user?.profile?.academicInfo?.achievements?.join(', ') || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            semester: parseInt(formData.semester),
            cgpa: parseFloat(formData.cgpa),
            percentage: parseFloat(formData.percentage),
            tenthPercentage: parseFloat(formData.tenthPercentage),
            tenthYear: parseInt(formData.tenthYear),
            twelfthPercentage: parseFloat(formData.twelfthPercentage),
            twelfthYear: parseInt(formData.twelfthYear),
            backlogCount: parseInt(formData.backlogCount),
            backlogSubjects: formData.backlogSubjects.split(',').map(s => s.trim()).filter(s => s),
            achievements: formData.achievements.split(',').map(s => s.trim()).filter(s => s)
        };
        await onUpdate(data);
        onClose();
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Academic Information</DialogTitle>
                    <DialogDescription>
                        Add your academic details including CGPA, marks, and achievements.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select value={formData.department} onValueChange={(value) => handleChange('department', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                                    <SelectItem value="Information Science">Information Science</SelectItem>
                                    <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                                    <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                                    <SelectItem value="Chemical Engineering">Chemical Engineering</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="batch">Batch</Label>
                            <Input
                                id="batch"
                                value={formData.batch}
                                onChange={(e) => handleChange('batch', e.target.value)}
                                placeholder="e.g., 2021-2025"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="semester">Current Semester</Label>
                            <Select value={formData.semester} onValueChange={(value) => handleChange('semester', value)}>
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
                        <div className="space-y-2">
                            <Label htmlFor="cgpa">CGPA</Label>
                            <Input
                                id="cgpa"
                                type="number"
                                step="0.01"
                                max="10"
                                value={formData.cgpa}
                                onChange={(e) => handleChange('cgpa', e.target.value)}
                                placeholder="e.g., 8.5"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="percentage">Percentage</Label>
                            <Input
                                id="percentage"
                                type="number"
                                step="0.01"
                                max="100"
                                value={formData.percentage}
                                onChange={(e) => handleChange('percentage', e.target.value)}
                                placeholder="e.g., 85.5"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">10th Grade Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="tenthPercentage">10th Percentage</Label>
                                <Input
                                    id="tenthPercentage"
                                    type="number"
                                    step="0.01"
                                    max="100"
                                    value={formData.tenthPercentage}
                                    onChange={(e) => handleChange('tenthPercentage', e.target.value)}
                                    placeholder="e.g., 95.0"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tenthBoard">Board</Label>
                                <Input
                                    id="tenthBoard"
                                    value={formData.tenthBoard}
                                    onChange={(e) => handleChange('tenthBoard', e.target.value)}
                                    placeholder="e.g., CBSE, ICSE, State Board"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tenthYear">Year of Passing</Label>
                                <Input
                                    id="tenthYear"
                                    type="number"
                                    value={formData.tenthYear}
                                    onChange={(e) => handleChange('tenthYear', e.target.value)}
                                    placeholder="e.g., 2019"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">12th Grade Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="twelfthPercentage">12th Percentage</Label>
                                <Input
                                    id="twelfthPercentage"
                                    type="number"
                                    step="0.01"
                                    max="100"
                                    value={formData.twelfthPercentage}
                                    onChange={(e) => handleChange('twelfthPercentage', e.target.value)}
                                    placeholder="e.g., 92.0"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="twelfthBoard">Board</Label>
                                <Input
                                    id="twelfthBoard"
                                    value={formData.twelfthBoard}
                                    onChange={(e) => handleChange('twelfthBoard', e.target.value)}
                                    placeholder="e.g., CBSE, ICSE, State Board"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="twelfthYear">Year of Passing</Label>
                                <Input
                                    id="twelfthYear"
                                    type="number"
                                    value={formData.twelfthYear}
                                    onChange={(e) => handleChange('twelfthYear', e.target.value)}
                                    placeholder="e.g., 2021"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="backlogCount">Number of Backlogs</Label>
                            <Input
                                id="backlogCount"
                                type="number"
                                min="0"
                                value={formData.backlogCount}
                                onChange={(e) => handleChange('backlogCount', e.target.value)}
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="backlogSubjects">Backlog Subjects (if any)</Label>
                            <Input
                                id="backlogSubjects"
                                value={formData.backlogSubjects}
                                onChange={(e) => handleChange('backlogSubjects', e.target.value)}
                                placeholder="Subject 1, Subject 2"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="achievements">Academic Achievements</Label>
                        <Textarea
                            id="achievements"
                            value={formData.achievements}
                            onChange={(e) => handleChange('achievements', e.target.value)}
                            placeholder="Academic awards, scholarships, etc. (comma separated)"
                            rows={3}
                        />
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

export default AcademicInfoForm;
