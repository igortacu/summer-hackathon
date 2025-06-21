// src/components/Student/MyTasks.tsx
import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  AlertTriangle,
  Tag,
  Filter
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  statusColor: 'green' | 'yellow' | 'red';
  points: number;
  tags: string[];
}

interface MyTasksProps {
  tasks: Task[];
  userRole: string;
}

export default function MyTasks({ tasks, userRole }: MyTasksProps) {
  const [filterStatus, setFilterStatus] = useState<'all'|'todo'|'in-progress'|'done'>('all');

  // only get tasks assigned to me
  const myTasks = tasks.filter(t => t.assignedTo === userRole);

  const getTasksByStatus = (status: 'all'|'todo'|'in-progress'|'done') => {
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

  const getPriorityClasses = (p: 'low'|'medium'|'high') => {
    switch (p) {
      case 'high':
        return 'bg-error-100 text-error-800 border-error-200';
      case 'medium':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'low':
        return 'bg-success-100 text-success-800 border-success-200';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const delta = Math.ceil((date.getTime() - now.getTime()) / (1000*3600*24));
    if (delta === 0) return 'Today';
    if (delta === 1) return 'Tomorrow';
    if (delta < 0) return `${Math.abs(delta)} days ago`;
    return `In ${delta} days`;
  };

  const columns = [
    { id: 'todo' as const,     title: 'To Do',      color: 'border-gray-300' },
    { id: 'in-progress' as const, title: 'Doing',   color: 'border-primary-300' },
    { id: 'done' as const,     title: 'Done',      color: 'border-success-300' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600 mt-1">Tasks assigned specifically to you</p>
      </div>

      {/* Filter */}
      <div className="mb-6 flex items-center space-x-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="in-progress">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col => (
          <div key={col.id} className={`bg-white rounded-xl border-2 ${col.color} p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">{col.title}</h3>
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {getTasksByStatus(col.id).length}
              </span>
            </div>

            <div className="space-y-4">
              {getTasksByStatus(col.id).map(task => (
                <div
                  key={task.id}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-900 text-sm leading-tight">
                      {task.title}
                    </h4>
                    {getStatusIcon(task.statusColor)}
                  </div>

                  <p className="text-gray-600 text-xs mb-3">{task.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityClasses(task.priority)}`}>
                        {task.priority} priority
                      </span>
                      <span className="text-xs font-medium text-primary-600">
                        {task.points} pts
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      Due {formatDate(task.dueDate)}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {task.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded"
                        >
                          <Tag className="h-2 w-2 mr-1" />{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
