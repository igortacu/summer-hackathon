import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Bot,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import KanbanBoard from './KanbanBoard';
import AIAssistant from './AIAssistant';
import StatsCards from './StatsCards';

interface DashboardProps {
  projectData: any;
}

export default function Dashboard({ projectData }: DashboardProps) {
  const [showAI, setShowAI] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const tasks = [
    {
      id: '1',
      title: 'Research existing solutions',
      description: 'Analyze competitor apps and identify key features',
      assignedTo: 'Research Analyst',
      status: 'done' as const,
      priority: 'high' as const,
      dueDate: new Date(Date.now() - 86400000), // Yesterday
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
      dueDate: new Date(Date.now() + 172800000), // 2 days from now
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
      dueDate: new Date(Date.now() + 43200000), // 12 hours from now
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
      dueDate: new Date(Date.now() + 259200000), // 3 days from now
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
      dueDate: new Date(Date.now() - 43200000), // 12 hours ago (overdue)
      statusColor: 'red' as const,
      points: 40,
      tags: ['database', 'backend']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{projectData.name}</h1>
            <p className="text-gray-600 mt-1">Track your progress and manage tasks</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAI(!showAI)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-accent-600 to-accent-700 text-white rounded-lg hover:from-accent-700 hover:to-accent-800 transition-all"
            >
              <Bot className="h-4 w-4 mr-2" />
              Ask Bublik AI
            </button>
            <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
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
        <button className="flex items-center px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3">
          <KanbanBoard tasks={tasks} onTaskUpdate={() => {}} />
        </div>

        {/* AI Assistant Sidebar */}
        {showAI && (
          <div className="lg:col-span-1">
            <AIAssistant onClose={() => setShowAI(false)} />
          </div>
        )}
      </div>
    </div>
  );
}