import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BookOpen, Clock, Trophy, Target, TrendingUp, Bookmark } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const PREPARATION_API_END_POINT = "http://localhost:8001/api/v1/preparation";

const PreparationDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get(`${PREPARATION_API_END_POINT}/dashboard`, {
                withCredentials: true
            });

            if (response.data.success) {
                setDashboardData(response.data.dashboard);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">No Progress Data</h2>
                    <p className="text-gray-600">Start learning to see your progress here!</p>
                </div>
            </div>
        );
    }

    const { stats, categoryProgress, recentResources, studyPlan } = dashboardData;

    // Prepare chart data
    const progressData = categoryProgress.map(cat => ({
        category: cat._id,
        total: cat.totalResources,
        completed: cat.completedResources,
        percentage: Math.round((cat.completedResources / cat.totalResources) * 100)
    }));

    const pieData = [
        { name: 'Completed', value: stats.completedResources, color: '#10B981' },
        { name: 'In Progress', value: stats.inProgressResources, color: '#F59E0B' },
        { name: 'Not Started', value: stats.totalResources - stats.completedResources - stats.inProgressResources, color: '#EF4444' }
    ];

    const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${color}-100`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
                <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
                    <p className="text-gray-600 mt-1">Track your preparation progress and achievements</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={BookOpen}
                        title="Total Resources"
                        value={stats.totalResources}
                        color="blue"
                    />
                    <StatCard
                        icon={Trophy}
                        title="Completed"
                        value={stats.completedResources}
                        subtitle={`${Math.round((stats.completedResources / stats.totalResources) * 100)}% completion`}
                        color="green"
                    />
                    <StatCard
                        icon={Clock}
                        title="Time Spent"
                        value={`${Math.round(stats.totalTimeSpent / 60)}h`}
                        subtitle={`${stats.totalTimeSpent % 60}m`}
                        color="purple"
                    />
                    <StatCard
                        icon={Target}
                        title="Average Rating"
                        value={stats.averageRating ? stats.averageRating.toFixed(1) : 'N/A'}
                        subtitle="Your reviews"
                        color="yellow"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Progress by Category Chart */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress by Category</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={progressData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="completed" fill="#10B981" name="Completed" />
                                <Bar dataKey="total" fill="#E5E7EB" name="Total" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Overall Progress Pie Chart */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Resources */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                            <TrendingUp className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="space-y-4">
                            {recentResources.length > 0 ? (
                                recentResources.map((resource) => (
                                    <div key={resource._id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-shrink-0">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                resource.userProgress.status === 'completed' ? 'bg-green-100' :
                                                resource.userProgress.status === 'in_progress' ? 'bg-yellow-100' : 'bg-gray-100'
                                            }`}>
                                                <BookOpen className={`w-5 h-5 ${
                                                    resource.userProgress.status === 'completed' ? 'text-green-600' :
                                                    resource.userProgress.status === 'in_progress' ? 'text-yellow-600' : 'text-gray-600'
                                                }`} />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{resource.title}</p>
                                            <p className="text-xs text-gray-500">{resource.category}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">
                                                {new Date(resource.userProgress.lastAccessedAt).toLocaleDateString()}
                                            </p>
                                            <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-1">
                                                <div 
                                                    className={`h-1.5 rounded-full ${
                                                        resource.userProgress.status === 'completed' ? 'bg-green-600' :
                                                        resource.userProgress.status === 'in_progress' ? 'bg-yellow-600' : 'bg-gray-400'
                                                    }`}
                                                    style={{ width: `${resource.userProgress.progressPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">No recent activity</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Study Plan */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Study Plan</h2>
                            <Target className="w-5 h-5 text-gray-400" />
                        </div>
                        {studyPlan ? (
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-blue-900">{studyPlan.targetRole}</h3>
                                    <p className="text-sm text-blue-700 mt-1">
                                        {studyPlan.timelineWeeks} weeks • {studyPlan.weeklyHours}h/week
                                    </p>
                                    {studyPlan.targetCompanies.length > 0 && (
                                        <p className="text-xs text-blue-600 mt-2">
                                            Target: {studyPlan.targetCompanies.join(', ')}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-900">Focus Areas</h4>
                                    {studyPlan.focusAreas.map((area, index) => (
                                        <div key={index} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-700">{area.category}</span>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 rounded text-xs ${
                                                    area.priority === 'High' ? 'bg-red-100 text-red-800' :
                                                    area.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {area.priority}
                                                </span>
                                                <span className="text-gray-500">{area.allocatedHours}h</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500 mb-3">No study plan created</p>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                                    Create Study Plan
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreparationDashboard;
