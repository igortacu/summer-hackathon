import React, { useState } from 'react';
import { Plus, Mail, Send, ArrowRight, Users, CheckCircle } from 'lucide-react';

interface ProjectSetupProps {
  onComplete: (data: any) => void;
}

const ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Team Lead',
  'UI/UX Designer',
  'Quality Assurance',
  'DevOps Engineer',
  'Project Manager',
  'Research Analyst',
  'Data Scientist',
  'Mobile Developer'
];

export default function ProjectSetup({ onComplete }: ProjectSetupProps) {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    members: [] as string[],
    roles: {} as Record<string, string>
  });
  const [newEmail, setNewEmail] = useState('');

  const handleAddMember = () => {
    if (newEmail && !projectData.members.includes(newEmail)) {
      setProjectData(prev => ({
        ...prev,
        members: [...prev.members, newEmail]
      }));
      setNewEmail('');
    }
  };

  const handleRoleChange = (email: string, role: string) => {
    setProjectData(prev => ({
      ...prev,
      roles: { ...prev.roles, [email]: role }
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(projectData);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return projectData.name.trim() !== '';
      case 2:
        return projectData.members.length > 0;
      case 3:
        return Object.keys(projectData.roles).length === projectData.members.length + 1; // +1 for self
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum <= step 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum < step ? <CheckCircle className="h-4 w-4" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    stepNum < step ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 1 && 'Project Details'}
              {step === 2 && 'Invite Team Members'}
              {step === 3 && 'Assign Roles'}
            </h2>
            <p className="text-gray-600 mt-1">
              {step === 1 && 'Tell us about your project'}
              {step === 2 && 'Add your teammates to collaborate'}
              {step === 3 && 'Define everyone\'s expertise'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={projectData.name}
                  onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your project name"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={projectData.description}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Describe what your project aims to achieve..."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Enter teammate's email"
                  />
                </div>
                <button
                  onClick={handleAddMember}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </button>
              </div>

              {projectData.members.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Team Members ({projectData.members.length})</h4>
                  <div className="space-y-2">
                    {projectData.members.map((email, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-3" />
                          <span className="text-sm text-gray-900">{email}</span>
                        </div>
                        <span className="text-xs text-gray-500 bg-warning-100 text-warning-800 px-2 py-1 rounded">
                          Pending
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Assign roles to team members</h4>
                
                {/* Self role */}
                <div className="mb-4 p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-medium">You</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">Your role</span>
                    </div>
                    <select
                      value={projectData.roles['self'] || ''}
                      onChange={(e) => handleRoleChange('self', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select role</option>
                      {ROLES.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Team members roles */}
                <div className="space-y-3">
                  {projectData.members.map((email, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-3" />
                        <span className="text-sm text-gray-900">{email}</span>
                      </div>
                      <select
                        value={projectData.roles[email] || ''}
                        onChange={(e) => handleRoleChange(email, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Select role</option>
                        {ROLES.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {step === 3 ? 'Complete Setup' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}