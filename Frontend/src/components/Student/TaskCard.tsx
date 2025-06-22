// src/components/Student/TaskCard.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { User, Calendar } from 'lucide-react'; // Import icons

// Define Task interface here to ensure consistency and type safety within this component
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
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
}

export default function TaskCard({ task, onTaskUpdate }: TaskCardProps) {
  // useSortable hook for DND-Kit functionality
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging // This boolean indicates if the current item is being dragged
  } = useSortable({ id: task.id });

  // Apply transforms and transitions for smooth drag animation
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Add visual feedback when dragging
    opacity: isDragging ? 0.7 : 1, // Make the dragged card slightly transparent
    zIndex: isDragging ? 10 : 0, // Ensure the dragged card is on top of others
  };

  // Helper function to determine priority badge color
  const getPriorityColorClass = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'; // Changed to yellow for medium priority
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to determine the left border color based on statusColor
  const getBorderColorClass = (statusColor: 'green' | 'yellow' | 'red') => {
    switch (statusColor) {
      case 'green':
        return 'border-green-500';
      case 'yellow':
        return 'border-yellow-500';
      case 'red':
        return 'border-red-500';
      default:
        return 'border-gray-300'; // Default if statusColor is not matched
    }
  };

  return (
    <div
      ref={setNodeRef} // Connects the DOM node to dnd-kit
      style={style} // Applies dynamic styles for dragging
      {...attributes} // Attributes for accessibility and drag-and-drop
      {...listeners} // Event listeners for drag-and-drop interactions
      className={`
        bg-white rounded-lg p-4 shadow-md border-l-4
        ${getBorderColorClass(task.statusColor)} // Apply border color based on task status color
        ${isDragging ? 'ring-2 ring-primary-500' : ''} // Add a ring when dragging for visual emphasis
        cursor-grab active:cursor-grabbing // Cursor styles for drag interaction
      `}
    >
      {/* Task Title and Priority Badge */}
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900 text-lg pr-2">{task.title}</h4>
        <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full whitespace-nowrap ${getPriorityColorClass(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {/* Task Description (only renders if description exists) */}
      {task.description && (
        <p className="text-gray-700 text-sm mb-3">{task.description}</p>
      )}

      {/* Assigned To and Points */}
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <User className="w-4 h-4 mr-2" /> {/* User icon */}
        <span>{task.assignedTo}</span> {/* Assigned user's name (e.g., "You", "John Doe") */}
        <span className="ml-2 font-medium text-gray-600"># {task.points}pts</span> {/* Task points */}
      </div>

      {/* Due Date */}
      <div className="flex items-center text-gray-500 text-sm">
        <Calendar className="w-4 h-4 mr-2" /> {/* Calendar icon */}
        <span>{task.dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span> {/* Formatted due date */}
      </div>
    </div>
  );
}