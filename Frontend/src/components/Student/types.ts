// src/components/Student/types.ts
export interface AiTask {
  title: string;
  description: string;
  assignedRole: string;
  priority: 'low' | 'medium' | 'high';
  estimatedDays: number;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToRole?: string;    // optional so TaskModal can omit it
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  statusColor: 'green' | 'yellow' | 'red';
  points: number;
  tags: string[];
}
