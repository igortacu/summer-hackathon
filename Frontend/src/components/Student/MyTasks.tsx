import React, { useState } from 'react';
import { CheckSquare, Clock, AlertTriangle, User, Tag, Filter } from 'lucide-react';

export default function MyTasks() {
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock tasks data - only tasks assigned to current user
  const myTasks = [
    {
      id: '1',
      title: 'Implement user authentication',
      description: 'Create login and registration forms with validation',
      status: 'done' as const,
      priority: 'high' as const,
      dueDate: new Date(Date.now() - 86400000),
      statusColor: 'green' as const,
      points: 35,
      tags: ['frontend', 'auth']
    },
    {
      id: '2',
      title: 'Design responsive navigation',
      description: 'Create mobile-friendly navigation component',
      status: 'in-progress' as const,
      priority: 'medium' as const,
      dueDate: new Date(Date.now() + 43200000),
      statusColor: 'yellow' as const,
      points: 25,
      tags: ['frontend', 'ui']
    },
    {
      id: '3',
      title: 'Setup development environment',
      description: 'Configure development tools and CI/CD pipeline',
      status: 'todo' as const,
      priority: 'medium' as const,
      dueDate: new Date(Date.now() + 259200000),
      statusColor: 'green' as const,
      points: 20,
      tags: ['setup', 'devops']
    },
    {
      id: '4',
      title: 'Create user profile page',
      description: 'Design and implement user profile management',
      status: 'todo' as const,
      priority: 'low' as const,
      dueDate: new Date(Date.now() + 432000000),
      statusColor: 'green' as const,
      points: 30,
      tags: ['frontend', 'profile']
    },
    {
      id: '5',
      title: 'Fix responsive issues',
      description: 'Address mobile layout problems on dashboard',
      status: 'todo' as const,
      priority: 'high' as const,
      dueDate: new Date(Date.now() - 43200000),
      statusColor: 'red' as const,
      points: 15,
      tags: ['frontend', 'bug']
    }
  ];

  const getTasksByStatus = (status: string) => {
    if (status === 'all') return myTasks;
    return myTasks.filter(task => task.status === status);
  };

  const getStatusIcon = (statusColor: string) => {
    switch (statusColor) {
      case 'green':
        return <CheckSquare className="h-4 w-4 text-success-500" />;
      case 'yellow':
        return <Clock className="h-4 w-4 text-warning-500" />;
      case 'red':
        return <AlertTriangle className="h-4 w-4 text-error-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-error-100 text-error-800 border-error-200';
      case 'medium':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'low':
        return 'bg-success-100 text-success-800 border-success-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 0) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
  };

  const columns = [
    { id: 'todo', title: 'To Do', color: 'border-gray-300' },
    { id: 'in-progress', title: 'Doing', color: 'border-primary-300' },
    { id: 'done', title: 'Done', color: 'border-success-300' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600 mt-1">Tasks assigned specifically to you</p>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <div key={column.id} className={`bg-white rounded-xl border-2 ${column.color} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{column.title}</h3>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {getTasksByStatus(column.id).length}
              </span>
            </div>

            <div className="space-y-4">
              {getTasksByStatus(column.id).map(task => (
                <div
                  key={task.id}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                >
                  {/* Task header */}
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-900 text-sm leading-tight">
                      {task.title}
                    </h4>
                    {getStatusIcon(task.statusColor)}
                  </div>

                  {/* Task description */}
                  <p className="text-gray-600 text-xs mb-3">
                    {task.description}
                  </p>

                  {/* Task metadata */}
                  <div className="space-y-2">
                    {/* Priority and points */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(task.priority)}`}>
                        {task.priority} priority
                      </span>
                      <span className="text-xs font-medium text-primary-600">
                        {task.points} pts
                      </span>
                    </div>

                    {/* Due date */}
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      Due {formatDate(task.dueDate)}
                    </div>

                    {/* Tags */}
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded"
                          >
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {getTasksByStatus(column.id).length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No tasks in this column</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}