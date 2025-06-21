import React from 'react';
import { CheckSquare, Clock, AlertTriangle, TrendingUp, Trophy, Users } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalTasks: number;
    completedTasks: number;
    onTimeTasks: number;
    nearDueTasks: number;
    overdueTasks: number;
    totalPoints: number;
    memberPoints: { [key: string]: number };
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const completionRate = Math.round((stats.completedTasks / stats.totalTasks) * 100);
  const onTimeRate = Math.round((stats.onTimeTasks / stats.totalTasks) * 100);

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      icon: CheckSquare,
      color: 'bg-primary-500',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-700'
    },
    {
      title: 'Completed',
      value: `${stats.completedTasks} (${completionRate}%)`,
      icon: CheckSquare,
      color: 'bg-success-500',
      bgColor: 'bg-success-50',
      textColor: 'text-success-700'
    },
    {
      title: 'Near Due',
      value: stats.nearDueTasks,
      icon: Clock,
      color: 'bg-warning-500',
      bgColor: 'bg-warning-50',
      textColor: 'text-warning-700'
    },
    {
      title: 'Overdue',
      value: stats.overdueTasks,
      icon: AlertTriangle,
      color: 'bg-error-500',
      bgColor: 'bg-error-50',
      textColor: 'text-error-700'
    },
    {
      title: 'On-Time Rate',
      value: `${onTimeRate}%`,
      icon: TrendingUp,
      color: 'bg-secondary-500',
      bgColor: 'bg-secondary-50',
      textColor: 'text-secondary-700'
    },
    {
      title: 'Total Points',
      value: stats.totalPoints,
      icon: Trophy,
      color: 'bg-accent-500',
      bgColor: 'bg-accent-50',
      textColor: 'text-accent-700'
    }
  ];

  return (
    <div className="mb-8">
      {/* Main stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-xl p-4 border border-gray-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-xl font-bold ${stat.textColor} mt-1`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team member points */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Users className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(stats.memberPoints).map(([member, points]) => (
            <div key={member} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-medium">
                    {member === 'self' ? 'You' : member.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {member === 'self' ? 'You' : member.split('@')[0]}
                </span>
              </div>
              <span className="text-sm font-bold text-primary-600">{points} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}