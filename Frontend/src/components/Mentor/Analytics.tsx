import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Trophy, TrendingUp, Users, Target } from 'lucide-react';

export default function Analytics() {
  // Mock data for analytics
  const groupPerformanceData = [
    { name: 'Campus Navigator AR', score: 92, onTime: 95, quality: 88, collaboration: 94 },
    { name: 'StudyBuddy Mobile', score: 85, onTime: 82, quality: 90, collaboration: 83 },
    { name: 'EcoTracker Web', score: 78, onTime: 75, quality: 85, collaboration: 75 },
    { name: 'Library System', score: 71, onTime: 68, quality: 78, collaboration: 68 },
    { name: 'Event Planner', score: 65, onTime: 60, quality: 72, collaboration: 63 }
  ];

  const taskCompletionData = [
    { week: 'Week 1', completed: 45, assigned: 50 },
    { week: 'Week 2', completed: 52, assigned: 60 },
    { week: 'Week 3', completed: 48, assigned: 55 },
    { week: 'Week 4', completed: 65, assigned: 70 },
    { week: 'Week 5', completed: 58, assigned: 65 }
  ];

  const skillDistributionData = [
    { name: 'Frontend', value: 35, color: '#3b82f6' },
    { name: 'Backend', value: 28, color: '#10b981' },
    { name: 'UI/UX', value: 20, color: '#f59e0b' },
    { name: 'DevOps', value: 10, color: '#ef4444' },
    { name: 'QA', value: 7, color: '#8b5cf6' }
  ];

  const monthlyProgressData = [
    { month: 'Jan', avgScore: 72 },
    { month: 'Feb', avgScore: 75 },
    { month: 'Mar', avgScore: 78 },
    { month: 'Apr', avgScore: 82 },
    { month: 'May', avgScore: 85 }
  ];

  const topGroups = groupPerformanceData.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Performance insights and group rankings</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">78.2</p>
              <p className="text-sm text-success-600 mt-1">+5.2% from last month</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Groups</p>
              <p className="text-2xl font-bold text-secondary-600 mt-1">5</p>
              <p className="text-sm text-success-600 mt-1">All groups active</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-accent-600 mt-1">84%</p>
              <p className="text-sm text-success-600 mt-1">+8% improvement</p>
            </div>
            <div className="bg-accent-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-accent-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Performer</p>
              <p className="text-2xl font-bold text-warning-600 mt-1">92</p>
              <p className="text-sm text-gray-600 mt-1">Campus Navigator</p>
            </div>
            <div className="bg-warning-100 p-3 rounded-lg">
              <Trophy className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Group Rankings */}
      <div className="mb-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Group Rankings (Best to Worst)</h3>
        <div className="space-y-4">
          {groupPerformanceData.map((group, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-600' :
                  'bg-gray-300'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{group.name}</h4>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span>On-time: {group.onTime}%</span>
                    <span>Quality: {group.quality}%</span>
                    <span>Collaboration: {group.collaboration}%</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">{group.score}</div>
                <div className="text-sm text-gray-500">Overall Score</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Task Completion Trends */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Completion Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="assigned" fill="#e5e7eb" name="Assigned" />
              <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Skill Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skillDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {skillDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Progress */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Progress Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Groups</h3>
          <div className="space-y-4">
            {topGroups.map((group, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    'bg-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{group.name}</h4>
                    <p className="text-sm text-gray-600">Consistently high performance</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary-600">{group.score}</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🏆 Exceptional Performance</h4>
            <p className="text-sm text-gray-600">Campus Navigator AR team is leading with 92% overall score, showing excellent collaboration and on-time delivery.</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">📈 Improving Trends</h4>
            <p className="text-sm text-gray-600">Overall completion rates have improved by 8% this month, indicating better project management.</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">⚠️ Areas for Attention</h4>
            <p className="text-sm text-gray-600">Event Planner team needs additional support to improve their 65% score and meet deadlines.</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">🎯 Skill Balance</h4>
            <p className="text-sm text-gray-600">Frontend skills dominate at 35%, consider encouraging more backend and DevOps learning.</p>
          </div>
        </div>
      </div>
    </div>
  );
}