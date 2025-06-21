// src/components/Student/MyProjects.tsx
import React from 'react';
import { Users, Calendar, CheckSquare, Clock } from 'lucide-react';
import { parseEmailName } from '../../utils/parseEmailName';

interface MyProjectsProps {
  projectData: {
    projectName: string;
    description: string;
    members: string[]; // emails
  };
}

export default function MyProjects({ projectData }: MyProjectsProps) {
  const projectCreated = new Date('2024-01-15');
  const projectDeadline = new Date('2024-03-15');

  const getDaysRemaining = () => {
    const now = new Date();
    const diff = projectDeadline.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
        <p className="text-gray-600 mt-1">Overview of your current project</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-6 text-white">
          <h2 className="text-2xl font-bold mb-2">
            {projectData.projectName}
          </h2>
          <p className="text-primary-100 opacity-90">
            {projectData.description}
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* Team Members */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Team Members
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectData.members.map((email, idx) => {
                const displayName = parseEmailName(email);
                return (
                  <div
                    key={idx}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">
                        {displayName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {displayName}
                      </p>
                      <p className="text-xs text-gray-500">{email}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="bg-primary-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <CheckSquare className="h-8 w-8 text-primary-600" />
              </div>
              <p className="text-sm text-gray-600">Created</p>
              <p className="font-bold text-gray-900">
                {projectCreated.toLocaleDateString()}
              </p>
            </div>
            <div>
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600">Deadline</p>
              <p className="font-bold text-gray-900">
                {projectDeadline.toLocaleDateString()}
              </p>
            </div>
            <div>
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Clock className="h-8 w-8 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600">Days Left</p>
              <p className="font-bold text-gray-900">{getDaysRemaining()}</p>
            </div>
            <div>
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-600" />
              </div>
              <p className="text-sm text-gray-600">Team Size</p>
              <p className="font-bold text-gray-900">
                {projectData.members.length + 1}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
