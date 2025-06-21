import React from 'react';
import { X, Users, Calendar, CheckSquare, Clock, AlertTriangle } from 'lucide-react';

interface GroupDetailsModalProps {
  group: any;
  onClose: () => void;
}

export default function GroupDetailsModal({ group, onClose }: GroupDetailsModalProps) {
  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'in-progress':
        return 'bg-warning-100 text-warning-800';
      case 'overdue':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckSquare className="h-4 w-4 text-success-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-warning-600" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-error-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{group.name}</h2>
            <p className="text-gray-600 mt-1">{group.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-600">Progress</p>
                  <p className="text-2xl font-bold text-primary-700">{group.progress}%</p>
                </div>
                <div className="bg-primary-100 p-3 rounded-lg">
                  <CheckSquare className="h-5 w-5 text-primary-600" />
                </div>
              </div>
            </div>
            <div className="bg-secondary-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Members</p>
                  <p className="text-2xl font-bold text-secondary-700">{group.members.length}</p>
                </div>
                <div className="bg-secondary-100 p-3 rounded-lg">
                  <Users className="h-5 w-5 text-secondary-600" />
                </div>
              </div>
            </div>
            <div className="bg-warning-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warning-600">Tasks</p>
                  <p className="text-2xl font-bold text-warning-700">{group.completedTasks}/{group.totalTasks}</p>
                </div>
                <div className="bg-warning-100 p-3 rounded-lg">
                  <Calendar className="h-5 w-5 text-warning-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.members.map((member: any, index: number) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">All Tasks</h3>
            <div className="space-y-3">
              {group.tasks.map((task: any) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    {getTaskIcon(task.status)}
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
                      <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full ${getTaskStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}