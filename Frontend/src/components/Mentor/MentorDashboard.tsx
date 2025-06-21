import React, { useState } from 'react';
import { Users, MessageSquare, FileText, BarChart3, Star, Calendar, Eye } from 'lucide-react';
import GroupDetailsModal from './GroupDetailsModal';

export default function MentorDashboard() {
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  // Mock data for groups
  const groups = [
    {
      id: 1,
      name: "StudyBuddy Mobile App",
      description: "A mobile application that helps students find study groups on campus and connect with peers in their courses.",
      members: [
        { name: 'John Doe', role: 'Frontend Developer', email: 'john@example.com' },
        { name: 'Jane Smith', role: 'Backend Developer', email: 'jane@example.com' },
        { name: 'Mike Johnson', role: 'UI/UX Designer', email: 'mike@example.com' },
        { name: 'Sarah Wilson', role: 'Team Lead', email: 'sarah@example.com' }
      ],
      progress: 65,
      status: "active",
      lastActivity: "2 hours ago",
      overdueTasks: 1,
      completedTasks: 8,
      totalTasks: 12,
      tasks: [
        { id: 1, title: 'User Authentication', status: 'completed', assignee: 'John Doe', dueDate: '2024-12-10' },
        { id: 2, title: 'Database Design', status: 'overdue', assignee: 'Jane Smith', dueDate: '2024-12-12' },
        { id: 3, title: 'UI Wireframes', status: 'in-progress', assignee: 'Mike Johnson', dueDate: '2024-12-15' }
      ]
    },
    {
      id: 2,
      name: "EcoTracker Web Platform",
      description: "A web platform for tracking environmental impact and promoting sustainable practices among students.",
      members: [
        { name: 'Alex Brown', role: 'Full Stack Developer', email: 'alex@example.com' },
        { name: 'Emma Davis', role: 'Data Analyst', email: 'emma@example.com' },
        { name: 'Chris Lee', role: 'Frontend Developer', email: 'chris@example.com' },
        { name: 'Lisa Wang', role: 'Project Manager', email: 'lisa@example.com' },
        { name: 'Tom Garcia', role: 'Backend Developer', email: 'tom@example.com' }
      ],
      progress: 40,
      status: "active",
      lastActivity: "1 day ago",
      overdueTasks: 2,
      completedTasks: 6,
      totalTasks: 15,
      tasks: [
        { id: 1, title: 'Carbon Calculator', status: 'in-progress', assignee: 'Alex Brown', dueDate: '2024-12-18' },
        { id: 2, title: 'Data Visualization', status: 'overdue', assignee: 'Emma Davis', dueDate: '2024-12-11' },
        { id: 3, title: 'User Dashboard', status: 'todo', assignee: 'Chris Lee', dueDate: '2024-12-20' }
      ]
    },
    {
      id: 3,
      name: "Campus Navigator AR",
      description: "An augmented reality application to help new students navigate the campus and find facilities.",
      members: [
        { name: 'David Kim', role: 'AR Developer', email: 'david@example.com' },
        { name: 'Sophie Chen', role: 'Mobile Developer', email: 'sophie@example.com' },
        { name: 'Ryan Taylor', role: 'Backend Developer', email: 'ryan@example.com' }
      ],
      progress: 85,
      status: "review",
      lastActivity: "3 hours ago",
      overdueTasks: 0,
      completedTasks: 11,
      totalTasks: 13,
      tasks: [
        { id: 1, title: 'AR Navigation', status: 'completed', assignee: 'David Kim', dueDate: '2024-12-08' },
        { id: 2, title: 'Location Services', status: 'completed', assignee: 'Sophie Chen', dueDate: '2024-12-09' },
        { id: 3, title: 'Final Testing', status: 'in-progress', assignee: 'Ryan Taylor', dueDate: '2024-12-16' }
      ]
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

  const handleViewGroup = (group: any) => {
    setSelectedGroup(group);
    setShowGroupModal(true);
  };

  const handleChatWithGroup = (groupId: number) => {
    // Implement chat functionality
    console.log('Opening chat for group:', groupId);
    alert('Chat functionality would open here');
  };

  const handleReviewGroup = (groupId: number) => {
    // Implement review functionality
    console.log('Opening review for group:', groupId);
    alert('Code review interface would open here');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#bc8a5f]">Mentor Dashboard</h1>
        <p className="text-[#603808] mt-1">Monitor and guide your student groups</p>
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
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(group.status)}`}>
                        {group.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{group.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {group.members.length} members
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
                    <button 
                      onClick={() => handleViewGroup(group)}
                      className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button 
                      onClick={() => handleChatWithGroup(group.id)}
                      className="flex items-center px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Chat
                    </button>
                    <button 
                      onClick={() => handleReviewGroup(group.id)}
                      className="flex items-center px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                    >
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

      {/* Group Details Modal */}
      {showGroupModal && selectedGroup && (
        <GroupDetailsModal
          group={selectedGroup}
          onClose={() => setShowGroupModal(false)}
        />
      )}
    </div>
  );
}