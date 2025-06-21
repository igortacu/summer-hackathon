import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';

// --- Contribution Graph Code (Interfaces, Helpers, Components) ---

// 1. Interfaces
interface Contribution {
  date: string;
  count: number;
}

interface DayData extends Contribution {
  isPlaceholder: boolean;
}

interface TooltipProps {
  content: string | null;
  position: { x: number; y: number } | null;
}

// 2. Helper Functions
const generateMockData = (startDate: Date, endDate: Date): Contribution[] => {
  const data: Contribution[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (Math.random() > 0.3) {
      const count = Math.floor(Math.random() * 10) + 1;
      data.push({
        date: currentDate.toISOString().split('T')[0],
        count,
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};



const getColor = (count: number): string => {
  if (count === 0) return 'bg-white'; // fallback for 0
  if (count <= 2) return 'bg-[#F3D5B5]';
  if (count <= 4) return 'bg-[#E7BC91]';
  if (count <= 6) return 'bg-[#D4A276]';
  if (count <= 8) return 'bg-[#BC8A5F]';
  if (count <= 10) return 'bg-[#A47148]';
  if (count <= 12) return 'bg-[#8B5E34]';
  if (count <= 14) return 'bg-[#6F4518]';
  if (count <= 16) return 'bg-[#603808]';
  return 'bg-[#583101]';
};

// 3. Tooltip Component
const ContributionTooltip: React.FC<TooltipProps> = ({ content, position }) => {
  if (!content || !position) return null;

  return (
    <div
      className="absolute z-50 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-sm dark:bg-gray-100 dark:text-gray-900 pointer-events-none"
      style={{ left: position.x, top: position.y, transform: 'translate(-50%, -110%)' }}
    >
      {content}
    </div>
  );
};

// 4. ContributionGraph Component
const ContributionGraph: React.FC<{ data: Contribution[] }> = ({ data }) => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const graphRef = useRef<HTMLDivElement>(null); // Ref for the graph container

  const contributionsMap = new Map(data.map(item => [item.date, item.count]));
  
  const today = new Date();
  const yearAgo = new Date(today);
  yearAgo.setFullYear(today.getFullYear() - 1);
  yearAgo.setDate(yearAgo.getDate() + 1);

  const days: DayData[] = [];
  let currentDate = new Date(yearAgo);
  
  // Align to a Monday-start week. (0 = Sun, 1 = Mon, ...)
  const firstDayOfWeek = (currentDate.getDay() === 0) ? 6 : currentDate.getDay() - 1;
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ date: `placeholder-${i}`, count: 0, isPlaceholder: true });
  }

  while (currentDate <= today) {
    const dateString = currentDate.toISOString().split('T')[0];
    days.push({
      date: dateString,
      count: contributionsMap.get(dateString) || 0,
      isPlaceholder: false,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const handleMouseEnter = (day: DayData, event: React.MouseEvent<HTMLDivElement>) => {
    if (day.isPlaceholder || !graphRef.current) return;
    const graphRect = graphRef.current.getBoundingClientRect();
    const cellRect = event.currentTarget.getBoundingClientRect();
    const date = new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const content = `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${date}`;
    setTooltipContent(content);
    setTooltipPosition({
      x: cellRect.left - graphRect.left + cellRect.width / 2,
      y: cellRect.top - graphRect.top,
    });
  };

  const handleMouseLeave = () => {
    setTooltipContent(null);
    setTooltipPosition(null);
  };
  
  const monthLabels: { name: string; column: number }[] = [];
  let lastMonth = -1;

  days.forEach((day, index) => {
    if (day.isPlaceholder) return;
    const currentMonth = new Date(day.date).getMonth();
    if (currentMonth !== lastMonth) {
      monthLabels.push({
        name: new Date(day.date).toLocaleString('default', { month: 'short' }),
        column: Math.floor(index / 7),
      });
      lastMonth = currentMonth;
    }
  });
  
  return (
    <div className="relative" ref={graphRef}>
      <ContributionTooltip content={tooltipContent} position={tooltipPosition} />
      <div className="flex">
        <div className="grid grid-rows-7 gap-1 pr-2 text-xs text-gray-500 shrink-0">
            <div className="h-4"></div>
            <div className="h-4">Mon</div>
            <div className="h-4"></div>
            <div className="h-4">Wed</div>
            <div className="h-4"></div>
            <div className="h-4">Fri</div>
            <div className="h-4"></div>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="relative h-4 mb-1 text-xs text-gray-500">
            {monthLabels.map(({ name, column }) => (
              <div key={`${name}-${column}`} className="absolute" style={{ left: `calc(${column} * (1rem + 0.25rem))` }}>
                {name}
              </div>
            ))}
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {days.map((day, index) => (
              <div
                key={day.isPlaceholder ? `ph-${index}` : day.date}
                className={`w-4 h-4 rounded-sm ${day.isPlaceholder ? 'bg-transparent' : getColor(day.count)}`}
                onMouseEnter={(e) => handleMouseEnter(day, e)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end mt-4 text-xs text-gray-500">
        <span>Less</span>
        <div className="w-4 h-4 mx-1 rounded-sm bg-[#FFEDD8]"></div>
        <div className="w-4 h-4 mx-1 rounded-sm bg-[#E7BC91]"></div>
        <div className="w-4 h-4 mx-1 rounded-sm bg-[#A47148]"></div>
        <div className="w-4 h-4 mx-1 rounded-sm bg-[#6F4518]"></div>
        <div className="w-4 h-4 mx-1 rounded-sm bg-[#583101]"></div>
        <span>More</span>
      </div>
    </div>
  );
};


// --- Main Statistics Component ---

export default function Statistics() {
  // Mock data for original charts
  const taskStatusData = [
  { name: 'Completed', value: 8, color: '#A67C52' },   // muted gold
  { name: 'In Progress', value: 3, color: '#D6BFA8' }, // camel
  { name: 'To Do', value: 4, color: '#BFA07A' },       // warm taupe
  { name: 'Overdue', value: 1, color: '#F5E9DA' }      // light sand
];
  const weeklyProgressData = [
    { week: 'Week 1', completed: 2, assigned: 3 },
    { week: 'Week 2', completed: 4, assigned: 5 },
    { week: 'Week 3', completed: 6, assigned: 7 },
    { week: 'Week 4', completed: 8, assigned: 9 },
    { week: 'Week 5', completed: 8, assigned: 12 }
  ];
  const commitmentData = [
    { day: 'Mon', hours: 4 }, { day: 'Tue', hours: 6 }, { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 8 }, { day: 'Fri', hours: 5 }, { day: 'Sat', hours: 2 },
    { day: 'Sun', hours: 1 }
  ];
  const performanceData = [
    { month: 'Jan', onTime: 85, quality: 90 }, { month: 'Feb', onTime: 78, quality: 85 },
    { month: 'Mar', onTime: 92, quality: 95 }, { month: 'Apr', onTime: 88, quality: 88 },
    { month: 'May', onTime: 95, quality: 92 }
  ];
  const stats = [
    { title: 'Completion Rate', value: '75%', change: '+12%', icon: Target, color: 'text-green-600', bgColor: 'bg-green-100' },
    { title: 'On-Time Delivery', value: '88%', change: '+5%', icon: Clock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { title: 'Quality Score', value: '92%', change: '+8%', icon: Award, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
    { title: 'Productivity', value: '85%', change: '+15%', icon: TrendingUp, color: 'text-amber-600', bgColor: 'bg-amber-100' }
  ];
  
  // State and effect for Contribution Graph data
  const [contributions, setContributions] = useState<Contribution[]>([]);
  useEffect(() => {
    const today = new Date();
    const yearAgo = new Date();
    yearAgo.setFullYear(today.getFullYear() - 1);
    setContributions(generateMockData(yearAgo, today));
  }, []);

  const totalContributions = contributions.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
        <p className="text-gray-600 mt-1">Detailed insights into your performance and progress</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- INSERTED CONTRIBUTION GRAPH --- */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Contribution Activity</h3>
        <p className="text-sm text-gray-500 mb-4">{totalContributions} contributions in the last year</p>
        <ContributionGraph data={contributions} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Task Status Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskStatusData} cx="50%" cy="50%" labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80} fill="#8884d8" dataKey="value"
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
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4"><h4 className="font-medium text-gray-900 mb-2">🎯 Strong Performance</h4><p className="text-sm text-gray-600">Your completion rate has improved by 12% this month, showing consistent progress.</p></div>
          <div className="bg-white rounded-lg p-4"><h4 className="font-medium text-gray-900 mb-2">⚡ Peak Productivity</h4><p className="text-sm text-gray-600">Thursday is your most productive day with an average of 8 hours of focused work.</p></div>
          <div className="bg-white rounded-lg p-4"><h4 className="font-medium text-gray-900 mb-2">📈 Quality Improvement</h4><p className="text-sm text-gray-600">Your work quality score has increased to 92%, reflecting attention to detail.</p></div>
          <div className="bg-white rounded-lg p-4"><h4 className="font-medium text-gray-900 mb-2">🎯 Focus Area</h4><p className="text-sm text-gray-600">Consider addressing the 1 overdue task to maintain your excellent track record.</p></div>
        </div>
      </div>
    </div>
  );
}
