import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Users, Briefcase, GraduationCap, Calendar, ChevronRight, FileSpreadsheet, Clock } from 'lucide-react';

const EnhancedFacultyDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 450,
    placedStudents: 380,
    averagePackage: '12.5 LPA',
    upcomingInterviews: 8
  });

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: 'Microsoft Technical Interview',
      date: '2025-09-20',
      time: '10:00 AM',
      type: 'Interview'
    },
    {
      id: 2,
      title: 'Resume Workshop',
      date: '2025-09-22',
      time: '2:00 PM',
      type: 'Workshop'
    },
    {
      id: 3,
      title: 'Google Placement Drive',
      date: '2025-09-25',
      time: '9:00 AM',
      type: 'Placement'
    }
  ]);

  const quickActions = [
    {
      title: 'View Student Reports',
      icon: FileSpreadsheet,
      path: '/faculty/students',
      description: 'Access detailed student placement statistics'
    },
    {
      title: 'Manage Placements',
      icon: Briefcase,
      path: '/faculty/placements',
      description: 'Overview of ongoing placement activities'
    },
    {
      title: 'Schedule Interviews',
      icon: Calendar,
      path: '/faculty/schedule',
      description: 'Coordinate upcoming interviews and events'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/faculty/dashboard/classic'}>
            Switch to Classic View
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-gray-500">Registered in placement cell</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Placed Students</CardTitle>
              <GraduationCap className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.placedStudents}</div>
              <p className="text-xs text-gray-500">84.4% placement rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Average Package</CardTitle>
              <Briefcase className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averagePackage}</div>
              <p className="text-xs text-gray-500">Across all placements</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
              <Calendar className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingInterviews}</div>
              <p className="text-xs text-gray-500">Next 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions and Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently accessed features and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center text-center space-y-2"
                      onClick={() => window.location.href = action.path}
                    >
                      <action.icon className="w-6 h-6" />
                      <div className="font-medium">{action.title}</div>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next 7 days schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFacultyDashboard;
