import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, User, Flag, Hash, Clock } from 'lucide-react';

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

interface TaskCardProps {
  task: Task;
  onTaskUpdate: (taskId: string, updates: any) => void;
}

export default function TaskCard({ task, onTaskUpdate }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (statusColor: string) => {
    switch (statusColor) {
      case 'red': return 'border-l-red-500';
      case 'yellow': return 'border-l-yellow-500';
      case 'green': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const isOverdue = new Date() > task.dueDate;
  const isDueSoon = !isOverdue && (task.dueDate.getTime() - Date.now()) < 86400000; // 24 hours

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 border-l-4 ${getStatusColor(task.statusColor)} p-4 cursor-grab hover:shadow-md transition-all duration-200 ${
        isDragging ? 'opacity-50 rotate-3 scale-105 z-50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900 text-sm leading-tight flex-1 pr-2">
          {task.title}
        </h4>
        <div className="flex items-center space-x-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          {task.assignedTo && (
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              <span className="truncate max-w-20">{task.assignedTo}</span>
            </div>
          )}
          <div className="flex items-center">
            <Hash className="h-3 w-3 mr-1" />
            <span>{task.points}pts</span>
          </div>
        </div>
        
        <div className={`flex items-center ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-gray-500'}`}>
          <Calendar className="h-3 w-3 mr-1" />
          <span>{task.dueDate.toLocaleDateString()}</span>
          {isOverdue && <Clock className="h-3 w-3 ml-1" />}
        </div>
      </div>
    </div>
  );
}