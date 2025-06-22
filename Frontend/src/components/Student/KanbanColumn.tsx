// src/components/Student/KanbanColumn.tsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard'; // Ensure this path is correct

// Define Task interface here as it's used in this component
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

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void; // Use Partial<Task> for updates
}

export default function KanbanColumn({ id, title, color, tasks, onTaskUpdate }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex-1 min-w-[300px] rounded-lg p-4 shadow-sm
        ${color} // Apply the background color passed from KanbanBoard
        h-full max-h-[80vh] overflow-y-auto // Make column scrollable
      `}
    >
      <h3 className="text-lg font-semibold text-gray-700 mb-4 capitalize flex items-center justify-between">
        {title}
        <span className="text-sm font-medium bg-gray-200 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </h3>
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onTaskUpdate={onTaskUpdate} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}