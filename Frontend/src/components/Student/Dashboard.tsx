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
    roles: string[];    // roles list from setup (e.g., ['Developer', 'Designer'])
  };
  problemData: {
    tasks: AiTask[];
    assignments?: Record<number, string>;
  };
  userEmail: string;
  // Add userRole here
  userRole: string; // This line fixes the error
}

export default function Dashboard({
  projectData,
  problemData,
  userEmail,
  userRole // Destructure userRole here
}: DashboardProps) {

  const myDisplayName = useMemo(() => {
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
    if (diffDays < 1) return 'yellow';
    return 'green';
  }

  const [boardTasks, setBoardTasks] = useState<Task[]>(() => {
    const initialTasksFromProps = problemData.tasks || [];
    const initialAssignmentsFromProps = problemData.assignments || {};

    const predefinedTasks: Task[] = [
      {
        id: '1',
        title: 'Design Homepage Layout',
        description: 'Create a modern and user-friendly layout for the website homepage.',
        assignedTo: myDisplayName,
        status: 'in-progress',
        priority: 'high',
        dueDate: (() => { const d = new Date(); d.setDate(d.getDate() + 3); return d; })(),
        statusColor: getStatusColor((() => { const d = new Date(); d.setDate(d.getDate() + 3); return d; })()),
        points: 5,
        tags: ['design', 'frontend']
      },
      {
        id: '2',
        title: 'Develop User Authentication',
        description: 'Implement secure user registration and login functionality.',
        assignedTo: 'Alice Johnson',
        status: 'todo',
        priority: 'high',
        dueDate: (() => { const d = new Date(); d.setDate(d.getDate() + 7); return d; })(),
        statusColor: getStatusColor((() => { const d = new Date(); d.setDate(d.getDate() + 7); return d; })()),
        points: 8,
        tags: ['backend', 'security']
      },
      {
        id: '3',
        title: 'Set up Database Schema',
        description: 'Define and implement the database structure for the project.',
        assignedTo: myDisplayName,
        status: 'todo',
        priority: 'medium',
        dueDate: (() => { const d = new Date(); d.setDate(d.getDate() + 5); return d; })(),
        statusColor: getStatusColor((() => { const d = new Date(); d.setDate(d.getDate() + 5); return d; })()),
        points: 6,
        tags: ['backend', 'database']
      },
      {
        id: '4',
        title: 'Write API Documentation',
        description: 'Document all public API endpoints with examples.',
        assignedTo: 'Bob Williams',
        status: 'in-progress',
        priority: 'low',
        dueDate: (() => { const d = new Date(); d.setDate(d.getDate() + 10); return d; })(),
        statusColor: getStatusColor((() => { const d = new Date(); d.setDate(d.getDate() + 10); return d; })()),
        points: 3,
        tags: ['documentation', 'api']
      },
      {
        id: '5',
        title: 'Conduct User Acceptance Testing (UAT)',
        description: 'Perform testing with end-users to gather feedback.',
        assignedTo: 'Charlie Brown',
        status: 'done',
        priority: 'medium',
        dueDate: (() => { const d = new Date(); d.setDate(d.getDate() - 2); return d; })(),
        statusColor: getStatusColor((() => { const d = new Date(); d.setDate(d.getDate() - 2); return d; })()),
        points: 4,
        tags: ['qa', 'testing']
      },
      {
        id: '6',
        title: 'Integrate Payment Gateway',
        description: 'Set up Stripe integration for secure payments.',
        assignedTo: myDisplayName,
        status: 'todo',
        priority: 'high',
        dueDate: (() => { const d = new Date(); d.setDate(d.getDate() + 14); return d; })(),
        statusColor: getStatusColor((() => { const d = new Date(); d.setDate(d.getDate() + 14); return d; })()),
        points: 10,
        tags: ['backend', 'payments']
      },
      {
        id: '7',
        title: 'Optimize Image Loading',
        description: 'Implement lazy loading and optimize image sizes for faster performance.',
        assignedTo: 'Alice Johnson',
        status: 'in-progress',
        priority: 'medium',
        dueDate: (() => { const d = new Date(); d.setDate(d.getDate() + 6); return d; })(),
        statusColor: getStatusColor((() => { const d = new Date(); d.setDate(d.getDate() + 6); return d; })()),
        points: 4,
        tags: ['frontend', 'performance']
      },
      {
        id: '8',
        title: 'Review Codebase',
        description: 'Conduct a thorough review of existing code for quality and best practices.',
        assignedTo: 'Bob Williams',
        status: 'todo',
        priority: 'low',
        dueDate: (() => { const d = new Date(); d.setDate(d.getDate() + 20); return d; })(),
        statusColor: getStatusColor((() => { const d = new Date(); d.setDate(d.getDate() + 20); return d; })()),
        points: 7,
        tags: ['development', 'review']
      },
      {
        id: '9',
        title: 'Prepare Project Presentation',
        description: 'Create slides and talking points for the end-of-sprint presentation.',
        assignedTo: myDisplayName,
        status: 'done',
        priority: 'medium',
        dueDate: (() => { const d = new Date(); d.setDate(d.getDate() - 5); return d; })(),
        statusColor: getStatusColor((() => { const d = new Date(); d.setDate(d.getDate() - 5); return d; })()),
        points: 3,
        tags: ['management', 'presentation']
      },
      {
        id: '10',
        title: 'Fix Critical Bug in Login',
        description: 'Address the reported bug where users cannot log in with correct credentials.',
        assignedTo: myDisplayName,
        status: 'in-progress',
        priority: 'high',
        dueDate: (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d; })(),
        statusColor: getStatusColor((() => { const d = new Date(); d.setDate(d.getDate() + 1); return d; })()),
        points: 5,
        tags: ['bug', 'urgent']
      },
    ];

    const combinedTasks = [
      ...initialTasksFromProps.map((t, i) => {
        const due = new Date();
        due.setDate(due.getDate() + t.estimatedDays);
        const assignedUser = initialAssignmentsFromProps[i];
        const assignedDisplayName = assignedUser
          ? (parseEmailName(assignedUser) === parseEmailName(userEmail) ? 'You' : parseEmailName(assignedUser))
          : 'Unassigned';

        return {
          id: `ai-${i}`,
          title: t.title,
          description: t.description,
          assignedTo: assignedDisplayName,
          status: 'todo' as 'todo',
          priority: t.priority,
          dueDate: due,
          statusColor: getStatusColor(due),
          points: t.estimatedDays,
          tags: t.tags
        };
      }),
      ...predefinedTasks
    ];

    const uniqueTasks = Array.from(new Map(combinedTasks.map(task => [task.id, task])).values());

    return uniqueTasks;
  });

  const totalTasks = boardTasks.length;
  const completedTasks = boardTasks.filter(t => t.status === 'done').length;
  const onTimeTasks = boardTasks.filter(t => getStatusColor(t.dueDate) === 'green').length;
  const nearDueTasks = boardTasks.filter(t => getStatusColor(t.dueDate) === 'yellow').length;
  const overdueTasks = boardTasks.filter(t => getStatusColor(t.dueDate) === 'red').length;
  const totalPoints = boardTasks.reduce((sum, t) => sum + t.points, 0);

  const memberPoints: Record<string, number> = {};
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
              status: t.status,
              statusColor: getStatusColor(data.dueDate)
            }
            : t
        )
      );
    } else {
      const newTask: Task = {
        ...data,
        id: Date.now().toString(),
        status: 'todo',
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

  const assignableUsers = useMemo(() => {
    const membersAsDisplayNames = projectData.members.map(memberEmail => {
      return parseEmailName(memberEmail) === parseEmailName(userEmail) ? myDisplayName : parseEmailName(memberEmail);
    });
    const uniqueAssignableUsers = Array.from(new Set(['Unassigned', ...membersAsDisplayNames]));
    return uniqueAssignableUsers;
  }, [projectData.members, userEmail, myDisplayName]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      <div className="mb-8">
        <StatsCards stats={stats} />
      </div>

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

      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"></div>
      )}

      <div className="overflow-x-auto">
        <KanbanBoard tasks={myTasks} onTaskUpdate={handleTaskUpdate} />
      </div>

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