import React from 'react';
import { Users, Calendar, CheckSquare, Clock } from 'lucide-react';

interface MyProjectsProps {
  projectData: any;
}

export default function MyProjects({ projectData }: MyProjectsProps) {
  // Mock project data
  const project = {
    name: projectData?.name || 'StudyBuddy Mobile App',
    description: projectData?.description || 'A mobile application that helps students find study groups on campus and connect with peers in their courses.',
    members: [
      { name: 'You', role: 'Frontend Developer', email: 'you@example.com' },
      { name: 'John Doe', role: 'Backend Developer', email: 'john@example.com' },
      { name: 'Jane Smith', role: 'UI/UX Designer', email: 'jane@example.com' },
      { name: 'Mike Johnson', role: 'Team Lead', email: 'mike@example.com' }
    ],
    totalTasks: 12,
    completedTasks: 4,
    inProgressTasks: 3,
    todoTasks: 5,
    createdAt: new Date('2024-01-15'),
    deadline: new Date('2024-03-15')
  };

  const getProgressPercentage = () => {
    return Math.round((project.completedTasks / project.totalTasks) * 100);
  };

  const getDaysRemaining = () => {
    const now = new Date();
    const diffTime = project.deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
        <p className="text-gray-600 mt-1">Overview of your current project</p>
      </div>

      {/* Project Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
          <p className="text-primary-100 opacity-90">{project.description}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <CheckSquare className="h-8 w-8 text-primary-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{project.totalTasks}</p>
              <p className="text-sm text-gray-600">Total Tasks</p>
            </div>
            <div className="text-center">
              <div className="bg-success-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <CheckSquare className="h-8 w-8 text-success-600" />
              </div>
              <p className="text-2xl font-bold text-success-600">{project.completedTasks}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center">
              <div className="bg-warning-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Clock className="h-8 w-8 text-warning-600" />
              </div>
              <p className="text-2xl font-bold text-warning-600">{project.inProgressTasks}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-gray-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{getDaysRemaining()}</p>
              <p className="text-sm text-gray-600">Days Left</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
              <span className="text-lg font-bold text-primary-600">{getProgressPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.members.map((member, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}