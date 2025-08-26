import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Loader2, Plus, X } from 'lucide-react';

const PlacementPreferencesForm = ({ isOpen, onClose, user, onUpdate, loading }) => {
    const [formData, setFormData] = useState({
        interestedDomains: user?.profile?.placementPreferences?.interestedDomains || [],
        jobTypes: user?.profile?.placementPreferences?.jobTypes || [],
        locationPreferences: user?.profile?.placementPreferences?.locationPreferences || [],
        minSalary: user?.profile?.placementPreferences?.expectedSalary?.min || '',
        maxSalary: user?.profile?.placementPreferences?.expectedSalary?.max || '',
        workPreference: user?.profile?.placementPreferences?.workPreference || '',
        companySize: user?.profile?.placementPreferences?.companySize || []
    });

    const [newItem, setNewItem] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            minSalary: parseFloat(formData.minSalary) || 0,
            maxSalary: parseFloat(formData.maxSalary) || 0
        };
        await onUpdate(data);
        onClose();
    };

    const addItem = (category, predefinedValue = null) => {
        const value = predefinedValue || newItem.trim();
        if (value && !formData[category].includes(value)) {
            setFormData(prev => ({
                ...prev,
                [category]: [...prev[category], value]
            }));
            if (!predefinedValue) setNewItem('');
        }
    };

    const removeItem = (category, index) => {
        setFormData(prev => ({
            ...prev,
            [category]: prev[category].filter((_, i) => i !== index)
        }));
    };

    const predefinedDomains = [
        'Software Development', 'Data Science', 'Machine Learning', 'Web Development',
        'Mobile Development', 'DevOps', 'Cybersecurity', 'Cloud Computing',
        'AI/ML', 'Blockchain', 'Game Development', 'UI/UX Design'
    ];

    const predefinedJobTypes = [
        'Full-time', 'Part-time', 'Internship', 'Contract', 'Remote', 'Hybrid'
    ];

    const predefinedLocations = [
        'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune',
        'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur', 'Remote', 'Any Location'
    ];

    const predefinedCompanySizes = [
        'Startup (1-50)', 'Small (51-200)', 'Medium (201-1000)', 
        'Large (1001-5000)', 'Enterprise (5000+)'
    ];

    const ItemSection = ({ title, category, predefinedItems, placeholder }) => (
        <div className="space-y-3">
            <Label className="text-sm font-semibold">{title}</Label>
            
            {/* Selected items */}
            <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {formData[category].map((item, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {item}
                        <X
                            className="h-3 w-3 cursor-pointer hover:text-red-500"
                            onClick={() => removeItem(category, index)}
                        />
                    </Badge>
                ))}
                {formData[category].length === 0 && (
                    <span className="text-sm text-gray-400">No {title.toLowerCase()} selected</span>
                )}
            </div>

            {/* Predefined options */}
            {predefinedItems && (
                <div className="space-y-2">
                    <p className="text-xs text-gray-500">Quick add:</p>
                    <div className="flex flex-wrap gap-2">
                        {predefinedItems.map((item) => (
                            <Button
                                key={item}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addItem(category, item)}
                                disabled={formData[category].includes(item)}
                                className="text-xs h-8"
                            >
                                <Plus className="h-3 w-3 mr-1" />
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Custom input */}
            <div className="flex gap-2">
                <Input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder={placeholder}
                    className="text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem(category))}
                />
                <Button 
                    type="button" 
                    size="sm" 
                    onClick={() => addItem(category)}
                    disabled={!newItem.trim() || formData[category].includes(newItem.trim())}
                >
                    Add
                </Button>
            </div>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Placement Preferences</DialogTitle>
                    <DialogDescription>
                        Set your career preferences and placement goals to match with relevant opportunities.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <ItemSection
                            title="Interested Domains"
                            category="interestedDomains"
                            predefinedItems={predefinedDomains}
                            placeholder="Add custom domain..."
                        />

                        <ItemSection
                            title="Job Types"
                            category="jobTypes"
                            predefinedItems={predefinedJobTypes}
                            placeholder="Add custom job type..."
                        />

                        <ItemSection
                            title="Location Preferences"
                            category="locationPreferences"
                            predefinedItems={predefinedLocations}
                            placeholder="Add custom location..."
                        />

                        <ItemSection
                            title="Company Size Preference"
                            category="companySize"
                            predefinedItems={predefinedCompanySizes}
                            placeholder="Add custom company size..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="minSalary">Minimum Expected Salary (LPA)</Label>
                            <Input
                                id="minSalary"
                                type="number"
                                step="0.1"
                                min="0"
                                value={formData.minSalary}
                                onChange={(e) => setFormData(prev => ({ ...prev, minSalary: e.target.value }))}
                                placeholder="e.g., 6.0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="maxSalary">Maximum Expected Salary (LPA)</Label>
                            <Input
                                id="maxSalary"
                                type="number"
                                step="0.1"
                                min="0"
                                value={formData.maxSalary}
                                onChange={(e) => setFormData(prev => ({ ...prev, maxSalary: e.target.value }))}
                                placeholder="e.g., 12.0"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="workPreference">Work Preference</Label>
                        <Select 
                            value={formData.workPreference} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, workPreference: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select work preference" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="onsite">On-site</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                                <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Preferences
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PlacementPreferencesForm;
