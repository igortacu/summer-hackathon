import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';

export default function Statistics() {
  // Mock data for charts
  const taskStatusData = [
    { name: 'Completed', value: 8, color: '#22c55e' },
    { name: 'In Progress', value: 3, color: '#f59e0b' },
    { name: 'To Do', value: 4, color: '#6b7280' },
    { name: 'Overdue', value: 1, color: '#ef4444' }
  ];

  const weeklyProgressData = [
    { week: 'Week 1', completed: 2, assigned: 3 },
    { week: 'Week 2', completed: 4, assigned: 5 },
    { week: 'Week 3', completed: 6, assigned: 7 },
    { week: 'Week 4', completed: 8, assigned: 9 },
    { week: 'Week 5', completed: 8, assigned: 12 }
  ];

  const commitmentData = [
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 6 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 8 },
    { day: 'Fri', hours: 5 },
    { day: 'Sat', hours: 2 },
    { day: 'Sun', hours: 1 }
  ];

  const performanceData = [
    { month: 'Jan', onTime: 85, quality: 90 },
    { month: 'Feb', onTime: 78, quality: 85 },
    { month: 'Mar', onTime: 92, quality: 95 },
    { month: 'Apr', onTime: 88, quality: 88 },
    { month: 'May', onTime: 95, quality: 92 }
  ];

  const stats = [
    {
      title: 'Completion Rate',
      value: '75%',
      change: '+12%',
      icon: Target,
      color: 'text-success-600',
      bgColor: 'bg-success-100'
    },
    {
      title: 'On-Time Delivery',
      value: '88%',
      change: '+5%',
      icon: Clock,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      title: 'Quality Score',
      value: '92%',
      change: '+8%',
      icon: Award,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-100'
    },
    {
      title: 'Productivity',
      value: '85%',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-accent-600',
      bgColor: 'bg-accent-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
        <p className="text-gray-600 mt-1">Detailed insights into your performance and progress</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                  <p className="text-sm text-success-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Task Status Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="assigned" fill="#e5e7eb" name="Assigned" />
              <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Commitment */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Time Commitment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={commitmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="hours" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trends */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="onTime" stroke="#3b82f6" strokeWidth={2} name="On-Time %" />
              <Line type="monotone" dataKey="quality" stroke="#f97316" strokeWidth={2} name="Quality %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🎯 Strong Performance</h4>
            <p className="text-sm text-gray-600">Your completion rate has improved by 12% this month, showing consistent progress.</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">⚡ Peak Productivity</h4>
            <p className="text-sm text-gray-600">Thursday is your most productive day with an average of 8 hours of focused work.</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">📈 Quality Improvement</h4>
            <p className="text-sm text-gray-600">Your work quality score has increased to 92%, reflecting attention to detail.</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🎯 Focus Area</h4>
            <p className="text-sm text-gray-600">Consider addressing the 1 overdue task to maintain your excellent track record.</p>
          </div>
        </div>
      </div>
    </div>
  );
}