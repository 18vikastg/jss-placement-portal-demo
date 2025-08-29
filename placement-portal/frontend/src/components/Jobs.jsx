import { useEffect, useState } from 'react'
import Navbar from './shared/NavbarNew'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { 
    Search, 
    Filter, 
    MapPin, 
    Building2, 
    DollarSign, 
    Clock,
    Briefcase
} from 'lucide-react';
import { Button } from './ui/button';
import { SAMPLE_JOBS, TECH_ROLES, COMPANIES } from '@/utils/constants';
import { showJobSearchOptions } from '@/utils/redirectHelpers';
import JobSearchModal from './JobSearchModal';

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    
    // Local state for enhanced search functionality
    const [localSearchQuery, setLocalSearchQuery] = useState(searchedQuery || '');
    const [selectedRole, setSelectedRole] = useState('All');
    const [selectedCompany, setSelectedCompany] = useState('All');
    const [selectedSalary, setSelectedSalary] = useState('All');
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Use sample data if no backend jobs available
    const jobsToDisplay = allJobs.length > 0 ? allJobs : SAMPLE_JOBS;

    // Filter options
    const roles = ['All', ...TECH_ROLES.map(role => role.title)];
    const companies = ['All', ...COMPANIES.map(company => company.name)];
    const salaryRanges = ['All', '0-5 LPA', '5-10 LPA', '10-15 LPA', '15+ LPA'];

    // Search suggestions
    useEffect(() => {
        if (localSearchQuery.length > 1) {
            const roleSuggestions = TECH_ROLES
                .filter(role => role.title.toLowerCase().includes(localSearchQuery.toLowerCase()))
                .map(role => ({ type: 'role', value: role.title, icon: '💻' }));
            
            const companySuggestions = COMPANIES
                .filter(company => company.name.toLowerCase().includes(localSearchQuery.toLowerCase()))
                .map(company => ({ type: 'company', value: company.name, icon: '🏢' }));
            
            setSuggestions([...roleSuggestions.slice(0, 3), ...companySuggestions.slice(0, 3)]);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [localSearchQuery]);

    // Filter jobs based on search criteria
    useEffect(() => {
        let filtered = [...jobsToDisplay];

        // Search filter
        if (localSearchQuery) {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
                (job.skills && job.skills.some(skill => skill.toLowerCase().includes(localSearchQuery.toLowerCase())))
            );
        }

        // Role filter
        if (selectedRole !== 'All') {
            filtered = filtered.filter(job => job.title.includes(selectedRole.split(' ')[0]));
        }

        // Company filter
        if (selectedCompany !== 'All') {
            filtered = filtered.filter(job => job.company === selectedCompany);
        }

        // Salary filter
        if (selectedSalary !== 'All') {
            // Add salary filtering logic here if needed
        }

        setFilteredJobs(filtered);
    }, [localSearchQuery, selectedRole, selectedCompany, selectedSalary, jobsToDisplay]);

    const handleSearch = () => {
        dispatch(setSearchedQuery(localSearchQuery));
        setShowSuggestions(false);
        
        // Show job search options modal if query matches company or role
        if (localSearchQuery.trim()) {
            const searchOptions = showJobSearchOptions(localSearchQuery);
            if (searchOptions.options.length > 0) {
                setModalData(searchOptions);
                setShowModal(true);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocalSearchQuery(suggestion.value);
        dispatch(setSearchedQuery(suggestion.value));
        setShowSuggestions(false);
        
        // Show modal for the selected suggestion
        const searchOptions = showJobSearchOptions(suggestion.value);
        if (searchOptions.options.length > 0) {
            setModalData(searchOptions);
            setShowModal(true);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Search Header */}
            <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Find Your Dream
                            <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                                Career Opportunity
                            </span>
                        </h1>
                        <p className="text-xl text-red-100 max-w-2xl mx-auto mb-8">
                            Explore exciting job opportunities from leading companies through JSSATE
                        </p>
                        
                        {/* Enhanced Search Bar */}
                        <div className="max-w-3xl mx-auto relative">
                            <div className="flex bg-white rounded-2xl p-2 shadow-2xl">
                                <Search className="w-6 h-6 text-gray-400 ml-4 my-auto" />
                                <input
                                    type="text"
                                    placeholder="Search by role, company, or skills..."
                                    value={localSearchQuery}
                                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    onFocus={() => localSearchQuery.length > 1 && setShowSuggestions(true)}
                                    className="flex-1 px-4 py-4 text-lg text-gray-800 outline-none"
                                />
                                <Button 
                                    onClick={handleSearch}
                                    className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl"
                                >
                                    Search Jobs
                                </Button>
                            </div>

                            {/* Search Suggestions */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                                    <div className="p-3">
                                        {suggestions.map((suggestion, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleSuggestionClick(suggestion)}
                                                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="text-xl">{suggestion.icon}</span>
                                                <div>
                                                    <div className="font-medium text-gray-900">{suggestion.value}</div>
                                                    <div className="text-sm text-gray-500 capitalize">{suggestion.type}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {/* Role Filter */}
                        <select 
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>

                        {/* Company Filter */}
                        <select 
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        >
                            {companies.map(company => (
                                <option key={company} value={company}>{company}</option>
                            ))}
                        </select>

                        {/* Salary Filter */}
                        <select 
                            value={selectedSalary}
                            onChange={(e) => setSelectedSalary(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                        >
                            {salaryRanges.map(range => (
                                <option key={range} value={range}>{range}</option>
                            ))}
                        </select>

                        <Button variant="outline" className="flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Advanced Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className="flex items-center justify-between mb-8">
                    <h1 className='font-bold text-2xl text-gray-900 flex items-center gap-2'>
                        <Briefcase className="w-6 h-6 text-red-600" />
                        Available Jobs ({filteredJobs.length})
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                            <option>Most Recent</option>
                            <option>Salary (High to Low)</option>
                            <option>Company Rating</option>
                            <option>Relevance</option>
                        </select>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-md text-center">
                        <div className="text-2xl font-bold text-red-600">{filteredJobs.length}</div>
                        <div className="text-sm text-gray-600">Open Positions</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-md text-center">
                        <div className="text-2xl font-bold text-green-600">{COMPANIES.length}+</div>
                        <div className="text-sm text-gray-600">Top Companies</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-md text-center">
                        <div className="text-2xl font-bold text-blue-600">₹9.2L</div>
                        <div className="text-sm text-gray-600">Avg Salary</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-md text-center">
                        <div className="text-2xl font-bold text-purple-600">98%</div>
                        <div className="text-sm text-gray-600">Placement Rate</div>
                    </div>
                </div>

                {/* Jobs Grid */}
                {filteredJobs.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredJobs.map((job, index) => (
                            <div key={job._id || index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                                            <Building2 className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
                                            <p className="text-red-600 font-semibold">{job.company}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <DollarSign className="w-4 h-4" />
                                        {job.salary}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        {job.experience}
                                    </div>
                                </div>
                                
                                {job.skills && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {job.skills.slice(0, 3).map((skill, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium border border-red-200">
                                                {skill}
                                            </span>
                                        ))}
                                        {job.skills.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                                +{job.skills.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                )}
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        {job.posted || 'Recently posted'}
                                    </span>
                                    <Button 
                                        size="sm"
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">💼</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs match your criteria</h3>
                        <p className="text-gray-600 mb-6">Try adjusting your search terms or filters to find more opportunities</p>
                        <Button 
                            onClick={() => {
                                setLocalSearchQuery('');
                                setSelectedRole('All');
                                setSelectedCompany('All');
                                setSelectedSalary('All');
                                dispatch(setSearchedQuery(''));
                            }}
                            variant="outline"
                            className="border-red-600 text-red-600 hover:bg-red-50"
                        >
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Job Search Modal */}
            <JobSearchModal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                searchData={modalData}
            />
        </div>
    )
}

export default Jobs