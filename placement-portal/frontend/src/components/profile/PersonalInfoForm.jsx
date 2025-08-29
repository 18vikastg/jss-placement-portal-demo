import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const PersonalInfoForm = ({ isOpen, onClose, user, onUpdate, loading }) => {
    const [formData, setFormData] = useState({
        usn: user?.profile?.personalInfo?.usn || '',
        alternatePhone: user?.profile?.personalInfo?.alternatePhone || '',
        currentAddress: user?.profile?.personalInfo?.address?.current || '',
        permanentAddress: user?.profile?.personalInfo?.address?.permanent || '',
        dateOfBirth: user?.profile?.personalInfo?.dateOfBirth ? new Date(user?.profile?.personalInfo?.dateOfBirth) : null,
        gender: user?.profile?.personalInfo?.gender || '',
        bloodGroup: user?.profile?.personalInfo?.bloodGroup || '',
        fatherName: user?.profile?.personalInfo?.fatherName || '',
        motherName: user?.profile?.personalInfo?.motherName || '',
        guardianContact: user?.profile?.personalInfo?.guardianContact || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toISOString() : null
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
                    <DialogTitle>Personal Information</DialogTitle>
                    <DialogDescription>
                        Update your personal details including contact information and family details.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="usn">USN</Label>
                            <Input
                                id="usn"
                                value={formData.usn}
                                onChange={(e) => handleChange('usn', e.target.value)}
                                placeholder="Enter your USN"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="alternatePhone">Alternate Phone</Label>
                            <Input
                                id="alternatePhone"
                                value={formData.alternatePhone}
                                onChange={(e) => handleChange('alternatePhone', e.target.value)}
                                placeholder="Enter alternate phone number"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="currentAddress">Current Address</Label>
                        <Input
                            id="currentAddress"
                            value={formData.currentAddress}
                            onChange={(e) => handleChange('currentAddress', e.target.value)}
                            placeholder="Enter your current address"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="permanentAddress">Permanent Address</Label>
                        <Input
                            id="permanentAddress"
                            value={formData.permanentAddress}
                            onChange={(e) => handleChange('permanentAddress', e.target.value)}
                            placeholder="Enter your permanent address"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date of Birth</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !formData.dateOfBirth && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.dateOfBirth ? (
                                            format(formData.dateOfBirth, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formData.dateOfBirth}
                                        onSelect={(date) => handleChange('dateOfBirth', date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="bloodGroup">Blood Group</Label>
                            <Select value={formData.bloodGroup} onValueChange={(value) => handleChange('bloodGroup', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select blood group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                    <SelectItem value="O+">O+</SelectItem>
                                    <SelectItem value="O-">O-</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="guardianContact">Guardian Contact</Label>
                            <Input
                                id="guardianContact"
                                value={formData.guardianContact}
                                onChange={(e) => handleChange('guardianContact', e.target.value)}
                                placeholder="Guardian phone number"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fatherName">Father's Name</Label>
                            <Input
                                id="fatherName"
                                value={formData.fatherName}
                                onChange={(e) => handleChange('fatherName', e.target.value)}
                                placeholder="Enter father's name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="motherName">Mother's Name</Label>
                            <Input
                                id="motherName"
                                value={formData.motherName}
                                onChange={(e) => handleChange('motherName', e.target.value)}
                                placeholder="Enter mother's name"
                            />
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

export default PersonalInfoForm;
