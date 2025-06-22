// src/components/Student/TaskModal.tsx

import React, { useState, useEffect, FormEvent } from 'react';
import { X } from 'lucide-react';

// Simplified Task interface for the form
interface TaskData {
  title: string;
  description: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string; // Use string for input type='date'
  points: number;
  tags: string; // Use a single string for easier input
}

// Re-import the main Task interface to match Dashboard's
interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToRole?: string;    // <— make this optional
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  statusColor: 'green' | 'yellow' | 'red';
  points: number;
  tags: string[];
}
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Allow assignedToRole to come through if provided
  onSave: (
    data: Omit<Task, 'id' | 'status' | 'statusColor'> & { assignedToRole?: string }
  ) => void;
  task: Task | null;
  assignableUsers: string[];
}

const DEFAULT_FORM_STATE: TaskData = {
  title: '',
  description: '',
  assignedTo: '',
  priority: 'medium',
  dueDate: new Date().toISOString().split('T')[0], //YYYY-MM-DD
  points: 1,
  tags: '',
};

export default function TaskModal({ isOpen, onClose, onSave, task, assignableUsers }: TaskModalProps) {
  const [formData, setFormData] = useState<TaskData>(DEFAULT_FORM_STATE);

  useEffect(() => {
    if (isOpen) {
      if (task) {
        // If editing, populate form with existing task data
        setFormData({
          title: task.title,
          description: task.description,
          assignedTo: task.assignedTo,
          priority: task.priority,
          dueDate: task.dueDate.toISOString().split('T')[0],
          points: task.points,
          tags: task.tags.join(', '),
        });
      } else {
        // If creating new, reset to default state
        setFormData(DEFAULT_FORM_STATE);
        // Set default assignedTo to the first available user if editing and no assignedTo is set
        // Or if creating a new task, default to the first user if available
        if (assignableUsers.length > 0) {
            setFormData(prev => ({ ...prev, assignedTo: assignableUsers[0] }));
        }
      }
    }
  }, [isOpen, task, assignableUsers]); // Add assignableUsers to dependencies

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'points' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
onSave({
  ...formData,
  dueDate: new Date(formData.dueDate),
  tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
  // you can optionally pass assignedToRole here, but Dashboard will default if missing
});

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg m-4 z-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            {/* Assigned To Dropdown */}
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Assign To</label>
              <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                <option value="" disabled>Select a user</option>
                {assignableUsers.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Points */}
              <div>
                <label htmlFor="points" className="block text-sm font-medium text-gray-700">Points</label>
                <input type="number" name="points" value={formData.points} min="0" onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
              <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm" />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              {task ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}