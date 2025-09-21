import { useEffect, useState } from 'react';
import { X, TrendingUp, BarChart, PieChart, Users } from 'lucide-react';

const WelcomeModal = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has seen the welcome modal before
        const hasSeenWelcome = localStorage.getItem('jss-portal-welcome-seen');
        if (!hasSeenWelcome) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('jss-portal-welcome-seen', 'true');
    };

    const handleExploreAnalytics = () => {
        window.open('http://localhost:3002', '_blank');
        handleClose();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-white bg-opacity-20 p-3 rounded-full">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Welcome to JSS Portal!</h2>
                            <p className="text-blue-100">Discover our new Placement Analytics Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            🎉 New Feature: Interactive Placement Analytics
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Explore comprehensive placement statistics, interactive charts, department-wise analysis, 
                            and multi-year trends to understand JSS Academy&apos;s placement excellence.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <BarChart className="w-5 h-5 text-blue-600" />
                                <span className="font-semibold text-gray-900">Interactive Charts</span>
                            </div>
                            <p className="text-sm text-gray-600">Department-wise placement rates and package distributions</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-purple-600" />
                                <span className="font-semibold text-gray-900">Trend Analysis</span>
                            </div>
                            <p className="text-sm text-gray-600">Multi-year placement performance visualization</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <PieChart className="w-5 h-5 text-green-600" />
                                <span className="font-semibold text-gray-900">Detailed Insights</span>
                            </div>
                            <p className="text-sm text-gray-600">Comprehensive statistics and performance metrics</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-5 h-5 text-orange-600" />
                                <span className="font-semibold text-gray-900">Recruiter Data</span>
                            </div>
                            <p className="text-sm text-gray-600">Top recruiting companies and hiring trends</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                            onClick={handleExploreAnalytics}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                        >
                            🚀 Explore Analytics Dashboard
                        </button>
                        <button 
                            onClick={handleClose}
                            className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
                        >
                            Continue to Portal
                        </button>
                    </div>

                    {/* Quick Access Info */}
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            💡 <strong>Quick Access:</strong> You can always find the Analytics Dashboard in the navigation bar 
                            (📊 Analytics) or in the placement statistics section on the homepage.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;
