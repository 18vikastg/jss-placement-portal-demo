import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PlacementDashboard = () => {
    const [placementData, setPlacementData] = useState(null);
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';
                const [latestResponse, trendsResponse] = await Promise.all([
                    axios.get(`${apiUrl}/api/v1/placement/placement-stats/latest`),
                    axios.get(`${apiUrl}/api/v1/placement/placement-stats/trends`)
                ]);
                
                setPlacementData(latestResponse.data.data);
                setTrends(trendsResponse.data.data);
                setLoading(false);
            } catch (error) {
                console.warn('API not available, using demo data:', error.message);
                // Comprehensive fallback data for demo purposes
                const demoData = {
                    year: 2023,
                    overallPlacementPercentage: 86.0,
                    highestPackage: 43.17,
                    averagePackage: 6.8,
                    totalOffers: 456,
                    totalCompanies: 125,
                    topRecruiters: [
                        { name: "TCS", domain: "IT Services" },
                        { name: "Infosys", domain: "IT Services" },
                        { name: "Microsoft", domain: "Technology" },
                        { name: "Amazon", domain: "E-commerce/Cloud" },
                        { name: "Google", domain: "Technology" },
                        { name: "Apple", domain: "Technology" },
                        { name: "Wipro", domain: "IT Services" },
                        { name: "Accenture", domain: "Consulting" },
                        { name: "IBM", domain: "Technology" },
                        { name: "Deloitte", domain: "Consulting" },
                        { name: "Capgemini", domain: "Consulting" },
                        { name: "Oracle", domain: "Software" }
                    ],
                    departmentWiseStats: [
                        {
                            department: "Computer Science and Engineering",
                            totalStudents: 120,
                            studentsPlaced: 108,
                            placementPercentage: 90.0,
                            highestPackage: 43.17,
                            averagePackage: 8.2
                        },
                        {
                            department: "Information Science and Engineering",
                            totalStudents: 90,
                            studentsPlaced: 81,
                            placementPercentage: 90.0,
                            highestPackage: 28.5,
                            averagePackage: 7.8
                        },
                        {
                            department: "Electronics and Communication Engineering",
                            totalStudents: 80,
                            studentsPlaced: 68,
                            placementPercentage: 85.0,
                            highestPackage: 18.5,
                            averagePackage: 6.2
                        },
                        {
                            department: "Mechanical Engineering",
                            totalStudents: 80,
                            studentsPlaced: 64,
                            placementPercentage: 80.0,
                            highestPackage: 12.5,
                            averagePackage: 5.8
                        },
                        {
                            department: "Electronics and Instrumentation Engineering",
                            totalStudents: 40,
                            studentsPlaced: 32,
                            placementPercentage: 80.0,
                            highestPackage: 15.2,
                            averagePackage: 6.0
                        },
                        {
                            department: "Civil Engineering",
                            totalStudents: 40,
                            studentsPlaced: 32,
                            placementPercentage: 80.0,
                            highestPackage: 8.5,
                            averagePackage: 4.8
                        }
                    ]
                };

                const trendsData = [
                    {
                        year: 2022,
                        overallPlacementPercentage: 82.4,
                        averagePackage: 6.2,
                        totalOffers: 425,
                        totalCompanies: 110
                    },
                    demoData
                ];

                setPlacementData(demoData);
                setTrends(trendsData);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!placementData) return null;

    const departmentData = placementData.departmentWiseStats.map(dept => ({
        name: dept.department.replace(' Engineering', '').replace('Science and ', ''),
        percentage: dept.placementPercentage,
        placed: dept.studentsPlaced,
        total: dept.totalStudents
    }));

    const packageData = placementData.departmentWiseStats.map(dept => ({
        name: dept.department.replace(' Engineering', '').replace('Science and ', ''),
        highest: dept.highestPackage,
        average: dept.averagePackage
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Placement Analytics Dashboard</h2>
                <div className="text-sm text-gray-600">Academic Year {placementData.year}</div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                    <div className="text-2xl font-bold">{placementData.overallPlacementPercentage}%</div>
                    <div className="text-blue-100">Overall Placement Rate</div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                    <div className="text-2xl font-bold">₹{placementData.highestPackage}L</div>
                    <div className="text-green-100">Highest Package</div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                    <div className="text-2xl font-bold">{placementData.totalOffers}</div>
                    <div className="text-purple-100">Total Offers</div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                    <div className="text-2xl font-bold">{placementData.totalCompanies}+</div>
                    <div className="text-orange-100">Recruiting Companies</div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Department-wise Placement Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Department-wise Placement Rates</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={departmentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fontSize: 12 }}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis />
                            <Tooltip 
                                formatter={(value, name) => [
                                    name === 'percentage' ? `${value}%` : value,
                                    name === 'percentage' ? 'Placement Rate' : name
                                ]}
                            />
                            <Legend />
                            <Bar dataKey="percentage" fill="#8884d8" name="Placement %" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Package Distribution */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Package Distribution by Department</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={packageData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="name" 
                                tick={{ fontSize: 12 }}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis />
                            <Tooltip 
                                formatter={(value) => [`₹${value} LPA`, '']}
                            />
                            <Legend />
                            <Bar dataKey="highest" fill="#82ca9d" name="Highest Package" />
                            <Bar dataKey="average" fill="#8884d8" name="Average Package" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Placement Trends */}
            {trends.length > 1 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Placement Trends Over Years</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={trends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="overallPlacementPercentage" fill="#8884d8" name="Placement %" />
                            <Bar dataKey="averagePackage" fill="#82ca9d" name="Avg Package (LPA)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Top Recruiters Grid */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Top Recruiting Companies</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {placementData.topRecruiters.slice(0, 12).map((recruiter, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="font-semibold text-sm">{recruiter.name}</div>
                            <div className="text-xs text-gray-600">{recruiter.domain}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Department Statistics Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Detailed Department Statistics</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="text-left p-3">Department</th>
                                <th className="text-center p-3">Total Students</th>
                                <th className="text-center p-3">Students Placed</th>
                                <th className="text-center p-3">Placement %</th>
                                <th className="text-center p-3">Highest Package</th>
                                <th className="text-center p-3">Average Package</th>
                            </tr>
                        </thead>
                        <tbody>
                            {placementData.departmentWiseStats.map((dept, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-3 font-medium">{dept.department}</td>
                                    <td className="p-3 text-center">{dept.totalStudents}</td>
                                    <td className="p-3 text-center">{dept.studentsPlaced}</td>
                                    <td className="p-3 text-center">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            dept.placementPercentage >= 85 ? 'bg-green-100 text-green-800' :
                                            dept.placementPercentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {dept.placementPercentage}%
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">₹{dept.highestPackage} LPA</td>
                                    <td className="p-3 text-center">₹{dept.averagePackage} LPA</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PlacementDashboard;
