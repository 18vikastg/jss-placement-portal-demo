import { Button } from './ui/button';
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { 
    ExternalLink, 
    Building2, 
    Briefcase, 
    Globe,
    GraduationCap
} from 'lucide-react';

const JobSearchModal = ({ isOpen, onClose, searchData }) => {
    if (!searchData || !isOpen) return null;

    const { type, data, options } = searchData;

    const handleOptionClick = (url) => {
        window.open(url, '_blank');
        onClose();
    };

    const getIcon = (label, platform) => {
        if (label.includes('Main') || label.includes('Career')) return <Building2 className="w-5 h-5" />;
        if (label.includes('Student') || label.includes('Graduate')) return <GraduationCap className="w-5 h-5" />;
        if (label.includes('Search') || platform) return <Briefcase className="w-5 h-5" />;
        return <Globe className="w-5 h-5" />;
    };

    const getPlatformColor = (platform) => {
        switch (platform) {
            case 'linkedin': return 'bg-blue-600 hover:bg-blue-700';
            case 'naukri': return 'bg-purple-600 hover:bg-purple-700';
            case 'indeed': return 'bg-green-600 hover:bg-green-700';
            case 'glassdoor': return 'bg-teal-600 hover:bg-teal-700';
            default: return 'bg-red-600 hover:bg-red-700';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {type === 'company' ? (
                            <>
                                <Building2 className="w-5 h-5 text-red-600" />
                                {data?.name} Career Opportunities
                            </>
                        ) : (
                            <>
                                <Briefcase className="w-5 h-5 text-red-600" />
                                {data?.title} Job Search
                            </>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {type === 'company' 
                            ? `Explore career opportunities at ${data?.name}` 
                            : `Find ${data?.title} positions on leading job portals`
                        }
                    </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-3">
                    {options.map((option, index) => (
                        <Button
                            key={index}
                            onClick={() => handleOptionClick(option.url)}
                            className={`w-full justify-start gap-3 h-12 ${
                                option.platform ? getPlatformColor(option.platform) : 'bg-red-600 hover:bg-red-700'
                            }`}
                            variant="default"
                        >
                            {getIcon(option.label, option.platform)}
                            <span className="flex-1 text-left">{option.label}</span>
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                    ))}
                </div>

                {type === 'company' && data && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">
                            <p><strong>Industry:</strong> {data.industry}</p>
                            <p><strong>Location:</strong> {data.location}</p>
                            <p><strong>Open Positions:</strong> {data.openPositions}+</p>
                            <p><strong>Rating:</strong> ⭐ {data.rating}/5</p>
                        </div>
                    </div>
                )}

                {type === 'role' && data && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600">
                            <p><strong>Category:</strong> {data.category}</p>
                            <p><strong>Level:</strong> {data.level}</p>
                            <p><strong>Avg Salary:</strong> {data.avgSalary}</p>
                            <p><strong>Skills:</strong> {data.skills.join(', ')}</p>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default JobSearchModal;
