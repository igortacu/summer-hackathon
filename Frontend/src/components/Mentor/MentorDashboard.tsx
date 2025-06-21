import React, { useState } from 'react';
import { Users, MessageSquare, FileText, BarChart3, Star, Calendar } from 'lucide-react';

export default function MentorDashboard() {
  const [activeGroup, setActiveGroup] = useState(null);

  // Mock data for groups
  const groups = [
    {
      id: 1,
      name: "StudyBuddy Mobile App",
      members: 4,
      progress: 65,
      status: "active",
      lastActivity: "2 hours ago",
      overdueTasks: 1,
      completedTasks: 8,
      totalTasks: 12
    },
    {
      id: 2,
      name: "EcoTracker Web Platform",
      members: 5,
      progress: 40,
      status: "active",
      lastActivity: "1 day ago",
      overdueTasks: 2,
      completedTasks: 6,
      totalTasks: 15
    },
    {
      id: 3,
      name: "Campus Navigator AR",
      members: 3,
      progress: 85,
      status: "review",
      lastActivity: "3 hours ago",
      overdueTasks: 0,
      completedTasks: 11,
      totalTasks: 13
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800';
      case 'review':
        return 'bg-warning-100 text-warning-800';
      case 'completed':
        return 'bg-primary-100 text-primary-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-success-500';
    if (progress >= 60) return 'bg-warning-500';
    return 'bg-error-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor and guide your student groups</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Groups</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">3</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <Users className="h-5 w-5 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-secondary-600 mt-1">12</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-lg">
              <Users className="h-5 w-5 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-warning-600 mt-1">7</p>
            </div>
            <div className="bg-warning-100 p-3 rounded-lg">
              <FileText className="h-5 w-5 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-accent-600 mt-1">63%</p>
            </div>
            <div className="bg-accent-100 p-3 rounded-lg">
              <BarChart3 className="h-5 w-5 text-accent-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Groups list */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Student Groups</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {groups.map(group => (
              <div
                key={group.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setActiveGroup(group.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(group.status)}`}>
                        {group.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {group.members} members
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {group.lastActivity}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FileText className="h-4 w-4 mr-2" />
                        {group.completedTasks}/{group.totalTasks} tasks
                      </div>
                      {group.overdueTasks > 0 && (
                        <div className="flex items-center text-sm text-error-600">
                          <Star className="h-4 w-4 mr-2" />
                          {group.overdueTasks} overdue
                        </div>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{group.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getProgressColor(group.progress)}`}
                          style={{ width: `${group.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button className="flex items-center px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Chat
                    </button>
                    <button className="flex items-center px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors">
                      <FileText className="h-4 w-4 mr-1" />
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}