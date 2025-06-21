export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'mentor';
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  members: ProjectMember[];
  createdAt: Date;
  status: 'setup' | 'active' | 'completed';
}

export interface ProjectMember {
  userId: string;
  projectRole: string;
  joinedAt: Date;
  status: 'invited' | 'joined';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  projectId: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  createdAt: Date;
  tags: string[];
  points: number;
  statusColor: 'green' | 'yellow' | 'red';
}

export interface AIAssistant {
  suggestions: string[];
  taskRecommendations: Task[];
  problemAnalysis: string;
}

export interface Notification {
  id: string;
  type: 'task_assigned' | 'deadline_reminder' | 'weekly_digest' | 'task_completed';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  userId: string;
}

export interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  onTimeTasks: number;
  nearDueTasks: number;
  overdueTasks: number;
  totalPoints: number;
  memberPoints: { [userId: string]: number };
}