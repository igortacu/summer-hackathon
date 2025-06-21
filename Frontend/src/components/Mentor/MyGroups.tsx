import React, { useState } from 'react';
import { Users, Calendar, CheckSquare, Eye, MessageSquare, FileText } from 'lucide-react';
import GroupDetailsModal from './GroupDetailsModal';

export default function MyGroups() {
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  // Mock groups data
  const groups = [
    {
      id: 1,
      name: "StudyBuddy Mobile App",
      description: "A mobile application that helps students find study groups on campus and connect with peers in their courses. The app will feature real-time matching, study session scheduling, and progress tracking.",
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
        { id: 1, title: 'User Authentication System', status: 'completed', assignee: 'John Doe', dueDate: '2024-12-10' },
        { id: 2, title: 'Database Schema Design', status: 'overdue', assignee: 'Jane Smith', dueDate: '2024-12-12' },
        { id: 3, title: 'UI Wireframes Creation', status: 'in-progress', assignee: 'Mike Johnson', dueDate: '2024-12-15' },
        { id: 4, title: 'Project Planning', status: 'completed', assignee: 'Sarah Wilson', dueDate: '2024-12-08' }
      ]
    },
    {
      id: 2,
      name: "EcoTracker Web Platform",
      description: "A comprehensive web platform for tracking environmental impact and promoting sustainable practices among students and faculty members.",
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
        { id: 1, title: 'Carbon Footprint Calculator', status: 'in-progress', assignee: 'Alex Brown', dueDate: '2024-12-18' },
        { id: 2, title: 'Data Visualization Dashboard', status: 'overdue', assignee: 'Emma Davis', dueDate: '2024-12-11' },
        { id: 3, title: 'User Interface Design', status: 'todo', assignee: 'Chris Lee', dueDate: '2024-12-20' }
      ]
    },
    {
      id: 3,
      name: "Campus Navigator AR",
      description: "An innovative augmented reality application to help new students navigate the campus and find facilities using their mobile devices.",
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
        { id: 1, title: 'AR Navigation System', status: 'completed', assignee: 'David Kim', dueDate: '2024-12-08' },
        { id: 2, title: 'Location Services Integration', status: 'completed', assignee: 'Sophie Chen', dueDate: '2024-12-09' },
        { id: 3, title: 'Final Testing & QA', status: 'in-progress', assignee: 'Ryan Taylor', dueDate: '2024-12-16' }
      ]
    }
  ];

  const handleViewGroup = (group: any) => {
    setSelectedGroup(group);
    setShowGroupModal(true);
  };

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
    return 'bg-primary-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Groups</h1>
        <p className="text-gray-600 mt-1">Manage and monitor all your student groups</p>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {groups.map(group => (
          <div
            key={group.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{group.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(group.status)}`}>
                  {group.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">{group.description}</p>
            </div>

            {/* Stats */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{group.members.length}</p>
                  <p className="text-xs text-gray-600">Members</p>
                </div>
                <div className="text-center">
                  <div className="bg-success-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <CheckSquare className="h-5 w-5 text-success-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{group.completedTasks}</p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
                <div className="text-center">
                  <div className="bg-warning-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-warning-600" />
                  </div>
                  <p className="text-lg font-bold text-gray-900">{group.totalTasks}</p>
                  <p className="text-xs text-gray-600">Total Tasks</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
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

              {/* Last Activity */}
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                Last activity: {group.lastActivity}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewGroup(group)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Chat
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors text-sm">
                  <FileText className="h-4 w-4 mr-1" />
                  Review
                </button>
              </div>
            </div>
          </div>
        ))}
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