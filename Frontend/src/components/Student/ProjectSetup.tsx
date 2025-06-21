import React, { useState } from 'react';
import { Plus, ArrowRight, CheckCircle } from 'lucide-react';

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
    academicGroup: '',
    pblGroupNumber: '',
    projectName: '',
    description: '',
    members: [] as string[],
    roles: [] as string[],
  });
  const [newEmail, setNewEmail] = useState('');

  const handleAddMember = () => {
    if (
      newEmail &&
      !projectData.members.includes(newEmail) &&
      projectData.members.length < 4
    ) {
      setProjectData(prev => ({
        ...prev,
        members: [...prev.members, newEmail],
      }));
      setNewEmail('');
    }
  };

  const addRole = () => {
    if (projectData.roles.length < 5) {
      setProjectData(prev => ({
        ...prev,
        roles: [...prev.roles, ''],
      }));
    }
  };

  const handleRoleChange = (index: number, value: string) => {
    setProjectData(prev => {
      const newRoles = [...prev.roles];
      newRoles[index] = value;
      return { ...prev, roles: newRoles };
    });
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return (
          projectData.academicGroup.trim() !== '' &&
          projectData.pblGroupNumber.trim() !== '' &&
          projectData.projectName.trim() !== ''
        );
      case 2:
        return projectData.members.length === 4;
      case 3:
        return (
          projectData.roles.length > 0 &&
          projectData.roles.every(r => r.trim() !== '')
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(projectData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map(stepNum => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNum <= step
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNum < step ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    stepNum
                  )}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      stepNum < step ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 1 && 'Project & Academic Details'}
              {step === 2 && 'Invite Teammates (4 required)'}
              {step === 3 && 'Add Roles'}
            </h2>
            <p className="text-gray-600 mt-1">
              {step === 1 && 'Fill in your academic info and project name'}
              {step === 2 && 'Invite exactly 4 teammates to collaborate'}
              {step === 3 && 'Choose up to 5 roles for this project'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="academicGroup"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Academic Group *
                </label>
                <input
                  type="text"
                  id="academicGroup"
                  value={projectData.academicGroup}
                  onChange={e =>
                    setProjectData(prev => ({
                      ...prev,
                      academicGroup: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g. FAF-242"
                />
              </div>

              <div>
                <label
                  htmlFor="pblGroupNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  PBL Group Number *
                </label>
                <input
                  type="text"
                  id="pblGroupNumber"
                  value={projectData.pblGroupNumber}
                  onChange={e =>
                    setProjectData(prev => ({
                      ...prev,
                      pblGroupNumber: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Your group #"
                />
              </div>

              <div>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Project Name *
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={projectData.projectName}
                  onChange={e =>
                    setProjectData(prev => ({
                      ...prev,
                      projectName: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your project name"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Project Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={projectData.description}
                  onChange={e =>
                    setProjectData(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="What will your project achieve?"
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Plus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleAddMember()}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Invite teammate by email"
                  />
                </div>
                <button
                  onClick={handleAddMember}
                  disabled={projectData.members.length >= 4}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center disabled:opacity-50"
                >
                  Invite
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">
                  Invited ({projectData.members.length})
                </h4>
                <div className="space-y-2">
                  {projectData.members.map((email, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      {email}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <button
                onClick={addRole}
                disabled={projectData.roles.length >= 5}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                Add Roles
              </button>

              {projectData.roles.map((role, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <select
                    value={role}
                    onChange={e => handleRoleChange(idx, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select role</option>
                    {ROLES.filter(r =>
                      r === role || !projectData.roles.includes(r)
                    ).map(r => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 flex items-center disabled:opacity-50"
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
