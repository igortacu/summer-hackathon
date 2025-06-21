import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

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
  onTaskUpdate: (taskId: string, updates: any) => void;
}

export default function KanbanColumn({ id, title, color, tasks, onTaskUpdate }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div className="flex flex-col">
      <div className={`${color} rounded-lg p-4 mb-4`}>
        <h3 className="font-semibold text-gray-800 flex items-center justify-between">
          {title}
          <span className="bg-white text-gray-600 text-sm px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </h3>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 space-y-3 min-h-[400px] p-2 rounded-lg border-2 border-dashed transition-colors ${
          isOver 
            ? 'border-primary-400 bg-primary-50' 
            : 'border-gray-200 bg-gray-50/50'
        }`}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onTaskUpdate={onTaskUpdate}
            />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400">
            <p className="text-sm">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
}