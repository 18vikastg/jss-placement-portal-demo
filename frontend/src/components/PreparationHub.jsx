import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Target, Clock, Star, Bookmark, Filter, Grid, List } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const PREPARATION_API_END_POINT = "http://localhost:8001/api/v1/preparation";

const PreparationHub = () => {
    const [resources, setResources] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        subcategory: '',
        type: '',
        difficulty: '',
        search: ''
    });
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        fetchResources();
        fetchCategories();
    }, [filters]);

    const fetchResources = async (page = 1) => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams({
                ...filters,
                page,
                limit: 12
            });

            const response = await axios.get(`${PREPARATION_API_END_POINT}/resources?${queryParams}`, {
                withCredentials: true
            });

            if (response.data.success) {
                setResources(response.data.resources);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            console.error('Error fetching resources:', error);
            toast.error('Failed to load resources');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${PREPARATION_API_END_POINT}/categories`);
            if (response.data.success) {
                setCategories(response.data.categories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            ...(key === 'category' && { subcategory: '' }) // Reset subcategory when category changes
        }));
    };

    const toggleBookmark = async (resourceId) => {
        try {
            const response = await axios.put(
                `${PREPARATION_API_END_POINT}/bookmark/${resourceId}`,
                {},
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                // Update local state
                setResources(prev => prev.map(resource => 
                    resource._id === resourceId 
                        ? { ...resource, isBookmarked: response.data.isBookmarked }
                        : resource
                ));
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
            toast.error('Please login to bookmark resources');
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'bg-green-100 text-green-800';
            case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'Advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Video': return '🎥';
            case 'Article': return '📄';
            case 'Course': return '📚';
            case 'Practice Test': return '✍️';
            case 'Tool': return '🛠️';
            case 'PDF': return '📋';
            case 'Website': return '🌐';
            default: return '📖';
        }
    };

    const ResourceCard = ({ resource }) => (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                        {resource.difficulty}
                    </span>
                </div>
                <button
                    onClick={() => toggleBookmark(resource._id)}
                    className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${
                        resource.isBookmarked ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                >
                    <Bookmark className="w-4 h-4" fill={resource.isBookmarked ? 'currentColor' : 'none'} />
                </button>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{resource.description}</p>

            <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{resource.provider}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{resource.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                    <span>{resource.rating}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">
                        {tag}
                    </span>
                ))}
                {resource.tags.length > 3 && (
                    <span className="text-gray-400 text-xs">+{resource.tags.length - 3}</span>
                )}
            </div>

            <div className="flex space-x-2">
                <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                >
                    Start Learning
                </a>
                <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                    Details
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Preparation Hub</h1>
                            <p className="text-gray-600 mt-1">Your one-stop destination for placement preparation</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                            <div className="flex items-center space-x-2 mb-4">
                                <Filter className="w-5 h-5 text-gray-500" />
                                <h2 className="font-semibold text-gray-900">Filters</h2>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search resources..."
                                        value={filters.search}
                                        onChange={(e) => handleFilterChange('search', e.target.value)}
                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat._id} ({cat.count})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Subcategory Filter */}
                            {filters.category && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                                    <select
                                        value={filters.subcategory}
                                        onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">All Subcategories</option>
                                        {categories
                                            .find(cat => cat._id === filters.category)
                                            ?.subcategories.map((subcat) => (
                                                <option key={subcat} value={subcat}>
                                                    {subcat}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}

                            {/* Difficulty Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                                <select
                                    value={filters.difficulty}
                                    onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Levels</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>

                            {/* Type Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Types</option>
                                    <option value="Video">Video</option>
                                    <option value="Article">Article</option>
                                    <option value="Course">Course</option>
                                    <option value="Practice Test">Practice Test</option>
                                    <option value="Tool">Tool</option>
                                    <option value="PDF">PDF</option>
                                    <option value="Website">Website</option>
                                </select>
                            </div>

                            {/* Clear Filters */}
                            <button
                                onClick={() => setFilters({
                                    category: '',
                                    subcategory: '',
                                    type: '',
                                    difficulty: '',
                                    search: ''
                                })}
                                className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    {pagination.totalResources || 0} Resources Found
                                </h3>
                                {filters.category && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        in {filters.category}
                                        {filters.subcategory && ` > ${filters.subcategory}`}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        )}

                        {/* Resources Grid */}
                        {!loading && (
                            <div className={`${
                                viewMode === 'grid' 
                                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                                    : 'space-y-4'
                            }`}>
                                {resources.map((resource) => (
                                    <ResourceCard key={resource._id} resource={resource} />
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && resources.length === 0 && (
                            <div className="text-center py-12">
                                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search terms</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <div className="flex space-x-2">
                                    {pagination.hasPrevPage && (
                                        <button
                                            onClick={() => fetchResources(pagination.currentPage - 1)}
                                            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            Previous
                                        </button>
                                    )}
                                    
                                    <span className="px-3 py-2 bg-blue-600 text-white rounded-md">
                                        {pagination.currentPage}
                                    </span>
                                    
                                    {pagination.hasNextPage && (
                                        <button
                                            onClick={() => fetchResources(pagination.currentPage + 1)}
                                            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreparationHub;
