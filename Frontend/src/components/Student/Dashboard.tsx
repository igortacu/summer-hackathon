// src/components/Student/Dashboard.tsx
import React, { useState, useMemo } from 'react';
import {
  Plus,
  Filter,
  Search
} from 'lucide-react';
import KanbanBoard from './KanbanBoard'; // Uses your KanbanBoard
import StatsCards from './StatsCards';
import TaskModal from './TaskModal'; // Ensure TaskModal is correctly imported
import { parseEmailName } from '../../utils/parseEmailName';

interface AiTask {
  title: string;
  description: string;
  assignedRole: string;
  priority: 'low' | 'medium' | 'high';
  estimatedDays: number;
  tags: string[];
}

// Ensure this Task interface is consistent across Dashboard, KanbanBoard, and TaskCard
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

interface DashboardProps {
  projectData: {
    projectName: string;
    description?: string;
    members: string[]; // emails
    roles: string[];   // roles list from setup (e.g., ['Developer', 'Designer'])
  };
  problemData: {
    tasks: AiTask[];
    assignments?: Record<number, string>;
  };
  userEmail: string;
}

export default function Dashboard({
  projectData,
  problemData,
  userEmail
}: DashboardProps) {

  const myDisplayName = useMemo(() => {
    // Assuming userEmail is something like "john.doe@example.com" and you want "You"
    return 'You';
  }, [userEmail]);


  const [filterStatus, setFilterStatus] =
    useState<'all' | 'todo' | 'in-progress' | 'done'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  function getStatusColor(dueDate?: Date): 'green' | 'yellow' | 'red' {
    if (!dueDate) return 'green';
    const diffDays = (dueDate.getTime() - Date.now()) / (1000 * 3600 * 24);
    if (diffDays < 0) return 'red';
    // Tasks due within 24 hours are "yellow"
    if (diffDays < 1) return 'yellow';
    return 'green';
  }

  const [boardTasks, setBoardTasks] = useState<Task[]>(() => {
    const initialTasks = problemData.tasks || [];
    const initialAssignments = problemData.assignments || {};

    return initialTasks.map((t, i) => {
      // Calculate dueDate based on current date + estimatedDays
      const due = new Date();
      due.setDate(due.getDate() + t.estimatedDays); // Sets date relative to current date

      const assignedUser = initialAssignments[i];

      // Determine if the assigned user is "You" based on parsing their email/name
      // This is crucial for the "You" display on the card
      const assignedDisplayName = assignedUser
        ? (parseEmailName(assignedUser) === parseEmailName(userEmail) ? 'You' : parseEmailName(assignedUser))
        : 'Unassigned';

      return {
        id: String(i),
        title: t.title,
        description: t.description,
        assignedTo: assignedDisplayName, // Use the display name "You" or actual member name
        status: 'todo', // Default status for new tasks
        priority: t.priority,
        dueDate: due,
        statusColor: getStatusColor(due),
        points: t.estimatedDays, // Using estimatedDays as points
        tags: t.tags
      };
    });
  });

  const totalTasks = boardTasks.length;
  const completedTasks = boardTasks.filter(t => t.status === 'done').length;
  const onTimeTasks = boardTasks.filter(t => getStatusColor(t.dueDate) === 'green').length;
  const nearDueTasks = boardTasks.filter(t => getStatusColor(t.dueDate) === 'yellow').length;
  const overdueTasks = boardTasks.filter(t => getStatusColor(t.dueDate) === 'red').length;
  const totalPoints = boardTasks.reduce((sum, t) => sum + t.points, 0);

  const memberPoints: Record<string, number> = {};
  // Include "You" in the list of possible assignees for stats calculation
  const allPossibleAssignees = ['You', ...projectData.members.map(parseEmailName)];
  allPossibleAssignees.forEach(assignee => {
    memberPoints[assignee] = 0;
  });

  boardTasks.forEach(task => {
    if (memberPoints.hasOwnProperty(task.assignedTo)) {
      memberPoints[task.assignedTo] += task.points;
    }
  });

  const stats = {
    totalTasks,
    completedTasks,
    onTimeTasks,
    nearDueTasks,
    overdueTasks,
    totalPoints,
    memberPoints
  };

  const filtered = boardTasks.filter(t => {
    const matchSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      filterStatus === 'all' || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Filter tasks to show only those assigned to "You" in the Dashboard
  const myTasks = filtered.filter(t => t.assignedTo === myDisplayName);


  const handleAddTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };
  const handleSaveTask = (data: Omit<Task, 'id' | 'statusColor' | 'status'>) => {
    if (editingTask) {
      setBoardTasks(prev =>
        prev.map(t =>
          t.id === editingTask.id
            ? {
                ...t,
                ...data,
                status: t.status, // Preserve the existing status for edited tasks
                statusColor: getStatusColor(data.dueDate)
              }
            : t
        )
      );
    } else {
      const newTask: Task = {
        ...data,
        id: Date.now().toString(),
        status: 'todo', // Always 'todo' for newly created tasks
        statusColor: getStatusColor(data.dueDate)
      };
      setBoardTasks(prev => [...prev, newTask]);
    }
    setIsTaskModalOpen(false);
  };
  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setBoardTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t, ...updates, statusColor: getStatusColor(updates.dueDate ?? t.dueDate) }
          : t
      )
    );
  };

  // Generate the list of assignable users for the TaskModal
  const assignableUsers = useMemo(() => {
    const membersAsDisplayNames = projectData.members.map(memberEmail => {
      // Use myDisplayName (which is 'You') for the current user's email, otherwise parse the name
      return parseEmailName(memberEmail) === parseEmailName(userEmail) ? myDisplayName : parseEmailName(memberEmail);
    });
    // Add "Unassigned" as an option and remove any duplicate display names
    const uniqueAssignableUsers = Array.from(new Set(['Unassigned', ...membersAsDisplayNames]));
    return uniqueAssignableUsers;
  }, [projectData.members, userEmail, myDisplayName]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-gray-900">{projectData.projectName}</h1>
          <p className="text-gray-600 mt-1">Track your progress and manage tasks</p>
        </div>
        <button
          onClick={handleAddTask}
          className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> New Task
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        <StatsCards stats={stats} />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center flex-1">
          <div className="relative flex-1 mb-4 sm:mb-0 sm:mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Completed</option>
          </select>
        </div>
        <button
          onClick={() => setShowFilters(f => !f)}
          className="mt-4 sm:mt-0 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2 inline" /> Filters
        </button>
      </div>

      {/* Optional Advanced Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">{/* advanced filters */}</div>
      )}

      {/* Kanban Board - Now displays only "My Tasks" (tasks assigned to 'You') */}
      <div className="overflow-x-auto">
        <KanbanBoard tasks={myTasks} onTaskUpdate={handleTaskUpdate} />
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        assignableUsers={assignableUsers}
      />
    </div>
  );
}