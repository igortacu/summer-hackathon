import React from 'react';
import { Clock, AlertTriangle, CheckCircle, User, Tag } from 'lucide-react';
import { Task } from '../../types';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export default function KanbanBoard({ tasks, onTaskUpdate }: KanbanBoardProps) {
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-50 border-gray-200' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-primary-50 border-primary-200' },
    { id: 'done', title: 'Done', color: 'bg-success-50 border-success-200' }
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getStatusIcon = (statusColor: string) => {
    switch (statusColor) {
      case 'green':
        return <CheckCircle className="h-4 w-4 text-success-500" />;
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map(column => (
        <div key={column.id} className={`rounded-xl border-2 border-dashed ${column.color} p-4`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">{column.title}</h3>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
              {getTasksByStatus(column.id).length}
            </span>
          </div>

          <div className="space-y-3">
            {getTasksByStatus(column.id).map(task => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Task header */}
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-900 text-sm leading-tight">
                    {task.title}
                  </h4>
                  {getStatusIcon(task.statusColor)}
                </div>

                {/* Task description */}
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
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

                  {/* Assigned to */}
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="h-3 w-3 mr-1" />
                    {task.assignedTo}
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
                          className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
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
                <p className="text-sm">No tasks yet</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}