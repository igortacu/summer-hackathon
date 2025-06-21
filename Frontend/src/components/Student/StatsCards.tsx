import { useState, useEffect } from 'react'; // Import useEffect as well for initial random value
import { CheckSquare, Clock, AlertTriangle, TrendingUp, Trophy, Users } from 'lucide-react';
import PointsDetail from './Mark_assign'; // Assuming mark_assign.tsx is in the same directory or adjust path

interface StatsCardsProps {
  stats: {
    // We'll generate totalPoints internally now, so it's not strictly needed from props
    // totalPoints: number; // You might remove this from the actual prop interface if it's always random
    totalTasks: number;
    completedTasks: number;
    onTimeTasks: number;
    nearDueTasks: number;
    overdueTasks: number;
    memberPoints: { [key: string]: number };
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const [showPointsDetail, setShowPointsDetail] = useState(false);
  const [randomTotalPoints, setRandomTotalPoints] = useState(0); // New state for random points

  // Generate random points when the component mounts
  useEffect(() => {
    // Generate a random number between 50 and 100 for total points
    const minPoints = 50;
    const maxPoints = 100;
    const generatedPoints = Math.floor(Math.random() * (maxPoints - minPoints + 1)) + minPoints;
    setRandomTotalPoints(generatedPoints);
  }, []); // Empty dependency array means this runs once on mount

  const completionRate = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;
  const onTimeRate = stats.totalTasks > 0 ? Math.round((stats.onTimeTasks / stats.totalTasks) * 100) : 0;

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.totalTasks, // Still uses original stats.totalTasks if provided
      icon: CheckSquare,
      color: 'bg-primary-500',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-700',
      onClick: undefined,
    },
    {
      title: 'Completed',
      value: `${stats.completedTasks} (${completionRate}%)`,
      icon: CheckSquare,
      color: 'bg-success-500',
      bgColor: 'bg-success-50',
      textColor: 'text-success-700',
      onClick: undefined,
    },
    {
      title: 'Near Due',
      value: stats.nearDueTasks,
      icon: Clock,
      color: 'bg-warning-500',
      bgColor: 'bg-warning-50',
      textColor: 'text-warning-700',
      onClick: undefined,
    },
    {
      title: 'Overdue',
      value: stats.overdueTasks,
      icon: AlertTriangle,
      color: 'bg-error-500',
      bgColor: 'bg-error-50',
      textColor: 'text-error-700',
      onClick: undefined,
    },
    {
      title: 'On-Time Rate',
      value: `${onTimeRate}%`,
      icon: TrendingUp,
      color: 'bg-secondary-500',
      bgColor: 'bg-secondary-50',
      textColor: 'text-secondary-700',
      onClick: undefined,
    },
    {
      title: 'Total Points',
      value: randomTotalPoints, // Use the generated random points here
      icon: Trophy,
      color: 'bg-accent-500',
      bgColor: 'bg-accent-50',
      textColor: 'text-accent-700',
      onClick: () => setShowPointsDetail(true),
    }
  ];

  return (
    <div className="mb-8">
      {/* Main stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} rounded-xl p-4 border border-gray-200 cursor-pointer`}
              onClick={stat.onClick}
            >
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

      {/* Points Detail Modal/Component */}
      {showPointsDetail && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl relative max-w-3xl w-full m-4">
            <button
              onClick={() => setShowPointsDetail(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
            {/* Pass randomTotalPoints as a prop */}
            <PointsDetail currentTotalPoints={randomTotalPoints} />
          </div>
        </div>
      )}
    </div>
  );
}