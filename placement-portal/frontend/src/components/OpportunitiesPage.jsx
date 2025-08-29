import React, { useState } from 'react';
import Navbar from './shared/NavbarNew';
import { 
    Search, 
    Filter, 
    MapPin, 
    Building2, 
    Clock, 
    DollarSign, 
    Users, 
    TrendingUp,
    BookOpen,
    Award,
    Target,
    Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { TECH_ROLES, COMPANIES } from '@/utils/constants';

const OpportunitiesPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Development', 'Data', 'Design', 'Operations', 'AI/ML'];

    const filteredRoles = TECH_ROLES.filter(role => {
        const matchesSearch = role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             role.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || role.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Explore Career
                            <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                                Opportunities
                            </span>
                        </h1>
                        <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed mb-8">
                            Discover tech roles that match your passion and skills. From frontend to AI/ML, 
                            find your perfect career path at JSSATE&apos;s placement portal.
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <div className="flex bg-white rounded-2xl p-2 shadow-2xl">
                                <Search className="w-6 h-6 text-gray-400 ml-4 my-auto" />
                                <input
                                    type="text"
                                    placeholder="Search roles, skills, or technologies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 px-4 py-4 text-lg text-gray-800 outline-none rounded-l-2xl"
                                />
                                <Button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl">
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                variant={selectedCategory === category ? "default" : "outline"}
                                className={`px-6 py-2 rounded-full transition-all ${
                                    selectedCategory === category
                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                        : 'text-gray-600 hover:text-red-600 hover:border-red-200'
                                }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Roles List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Available Roles ({filteredRoles.length})
                            </h2>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Filter className="w-4 h-4" />
                                Filters
                            </Button>
                        </div>

                        <div className="grid gap-6">
                            {filteredRoles.map((role) => (
                                <div
                                    key={role.id}
                                    onClick={() => setSelectedRole(role)}
                                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                                        selectedRole?.id === role.id 
                                            ? 'border-red-200 bg-red-50' 
                                            : 'border-transparent hover:border-red-100'
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">{role.icon}</div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                        {role.title}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <Building2 className="w-4 h-4" />
                                                            {role.category}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <TrendingUp className="w-4 h-4" />
                                                            {role.level}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <DollarSign className="w-4 h-4" />
                                                            {role.avgSalary}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button 
                                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Handle apply action
                                                    }}
                                                >
                                                    View Jobs
                                                </Button>
                                            </div>
                                            
                                            <p className="text-gray-600 mb-4 leading-relaxed">
                                                {role.description}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {role.skills.map((skill, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Career Insights */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-red-600" />
                                Career Insights
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                                    <h4 className="font-semibold text-blue-900 mb-2">Most In-Demand</h4>
                                    <p className="text-blue-700 text-sm">Full Stack Developers are 40% more likely to get hired</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                                    <h4 className="font-semibold text-green-900 mb-2">Growing Field</h4>
                                    <p className="text-green-700 text-sm">AI/ML roles show 60% year-over-year growth</p>
                                </div>
                                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                                    <h4 className="font-semibold text-purple-900 mb-2">High Salary</h4>
                                    <p className="text-purple-700 text-sm">Data Scientists earn 25% above market average</p>
                                </div>
                            </div>
                        </div>

                        {/* Top Companies Hiring */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-red-600" />
                                Top Companies Hiring
                            </h3>
                            <div className="space-y-3">
                                {COMPANIES.slice(0, 5).map((company) => (
                                    <div key={company.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">{company.name}</div>
                                            <div className="text-sm text-gray-500">{company.openPositions} open positions</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <Button className="w-full bg-white text-red-600 hover:bg-red-50">
                                    <Target className="w-4 h-4 mr-2" />
                                    Career Assessment
                                </Button>
                                <Button className="w-full bg-red-500 hover:bg-red-400 text-white">
                                    <Users className="w-4 h-4 mr-2" />
                                    Join JSSATE Community
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Role Detail Modal/Section */}
            {selectedRole && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-5xl">{selectedRole.icon}</div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900">{selectedRole.title}</h2>
                                        <p className="text-lg text-gray-600">{selectedRole.category} • {selectedRole.level}</p>
                                    </div>
                                </div>
                                <Button 
                                    variant="outline" 
                                    onClick={() => setSelectedRole(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </Button>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Role Description</h3>
                                    <p className="text-gray-600 leading-relaxed">{selectedRole.description}</p>
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Required Skills</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedRole.skills.map((skill, index) => (
                                            <span 
                                                key={index}
                                                className="px-4 py-2 bg-red-100 text-red-800 rounded-full font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <h4 className="font-semibold text-gray-900 mb-1">Experience Level</h4>
                                        <p className="text-gray-600">{selectedRole.level}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <h4 className="font-semibold text-gray-900 mb-1">Average Salary</h4>
                                        <p className="text-gray-600">{selectedRole.avgSalary}</p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-4">
                                    <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                                        Find {selectedRole.title} Jobs
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        Learn Required Skills
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OpportunitiesPage;
