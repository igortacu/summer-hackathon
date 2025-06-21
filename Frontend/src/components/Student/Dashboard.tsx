import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Plus,
  Filter,
  Search
} from 'lucide-react';
import KanbanBoard from './KanbanBoard';
import StatsCards from './StatsCards';
import TaskModal from './TaskModal';

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
  projectData: any;
}

export default function Dashboard({ projectData }: DashboardProps) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Mock data for demonstration
  const stats = {
    totalTasks: 12,
    completedTasks: 4,
    onTimeTasks: 8,
    nearDueTasks: 2,
    overdueTasks: 1,
    totalPoints: 240,
    memberPoints: {
      'self': 65,
      'john@example.com': 45,
      'jane@example.com': 70,
      'mike@example.com': 60
    }
  };

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Research existing solutions',
      description: 'Analyze competitor apps and identify key features',
      assignedTo: 'Research Analyst',
      status: 'done' as const,
      priority: 'high' as const,
      dueDate: new Date(Date.now() - 86400000),
      statusColor: 'green' as const,
      points: 25,
      tags: ['research', 'analysis']
    },
    {
      id: '2',
      title: 'Design system architecture',
      description: 'Create technical architecture diagrams and tech stack decisions',
      assignedTo: 'Backend Developer',
      status: 'in-progress' as const,
      priority: 'high' as const,
      dueDate: new Date(Date.now() + 172800000),
      statusColor: 'green' as const,
      points: 35,
      tags: ['architecture', 'backend']
    },
    {
      id: '3',
      title: 'Create wireframes',
      description: 'Design user interface wireframes for all main screens',
      assignedTo: 'UI/UX Designer',
      status: 'in-progress' as const,
      priority: 'medium' as const,
      dueDate: new Date(Date.now() + 43200000),
      statusColor: 'yellow' as const,
      points: 30,
      tags: ['design', 'ui']
    },
    {
      id: '4',
      title: 'Setup development environment',
      description: 'Configure development tools and CI/CD pipeline',
      assignedTo: 'Frontend Developer',
      status: 'todo' as const,
      priority: 'medium' as const,
      dueDate: new Date(Date.now() + 259200000),
      statusColor: 'green' as const,
      points: 20,
      tags: ['setup', 'devops']
    },
    {
      id: '5',
      title: 'Database schema design',
      description: 'Design database structure and relationships',
      assignedTo: 'Backend Developer',
      status: 'todo' as const,
      priority: 'high' as const,
      dueDate: new Date(Date.now() - 43200000),
      statusColor: 'red' as const,
      points: 40,
      tags: ['database', 'backend']
    }
  ]);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'statusColor'>) => {
    if (editingTask) {
      // Update existing task
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData, statusColor: getStatusColor(taskData.dueDate) }
          : task
      ));
    } else {
      // Create new task
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        statusColor: getStatusColor(taskData.dueDate)
      };
      setTasks(prev => [...prev, newTask]);
    }
  };

  const getStatusColor = (dueDate: Date): 'green' | 'yellow' | 'red' => {
    const now = new Date();
    const timeDiff = dueDate.getTime() - now.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff < 0) return 'red'; // Overdue
    if (daysDiff < 1) return 'yellow'; // Due soon
    return 'green'; // On time
  };

  const handleTaskUpdate = (taskId: string, updates: any) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{projectData?.name || 'Project Dashboard'}</h1>
            <p className="text-gray-600 mt-1">Track your progress and manage tasks</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAddTask}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Filters and Search */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Completed</option>
          </select>
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">All Members</option>
                <option value="self">Me</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">All Dates</option>
                <option value="overdue">Overdue</option>
                <option value="today">Due Today</option>
                <option value="week">This Week</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <KanbanBoard tasks={filteredTasks} onTaskUpdate={handleTaskUpdate} />

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
}