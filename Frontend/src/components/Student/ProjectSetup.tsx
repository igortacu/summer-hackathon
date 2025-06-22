import React, { useState, useEffect } from 'react';
import { Plus, ArrowRight, CheckCircle } from 'lucide-react';

interface ProjectSetupProps {
  onComplete: (data: {
    academicGroup: string;
    pblGroupNumber: string;
    projectName: string;
    description: string;
    members: string[];
    roles: string[]; // This will now contain the unique roles assigned to members
    memberAssignments: { memberEmail: string; role: string; }[]; // New: Explicit member-role assignments
  }) => void;
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
    roles: [] as string[], // This will store unique project roles derived from memberAssignments
    memberAssignments: [] as { memberEmail: string; role: string; }[], // Stores direct member-role pairings
  });
  const [newEmail, setNewEmail] = useState('');

  // Effect to initialize memberAssignments when moving to step 3 and members are ready
  useEffect(() => {
    if (step === 3 && projectData.members.length === 4 && projectData.memberAssignments.length === 0) {
      setProjectData(prev => ({
        ...prev,
        // Initialize an assignment object for each member
        memberAssignments: prev.members.map(email => ({ memberEmail: email, role: '' })),
      }));
    }
  }, [step, projectData.members, projectData.memberAssignments.length]);

  const handleAddMember = () => {
    // Check for valid email format (simple check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      newEmail.trim() &&
      emailRegex.test(newEmail.trim()) && // Validate email format
      !projectData.members.includes(newEmail.trim()) &&
      projectData.members.length < 4
    ) {
      setProjectData(prev => ({
        ...prev,
        members: [...prev.members, newEmail.trim()],
      }));
      setNewEmail('');
    } else if (projectData.members.includes(newEmail.trim())) {
      console.log("Member already added or invalid email.");
      // In a real app, you might show a user-friendly message
    } else if (!emailRegex.test(newEmail.trim())) {
      console.log("Invalid email format.");
    } else if (projectData.members.length >= 4) {
      console.log("Maximum 4 members allowed.");
    }
  };

  // This function is no longer needed in the new Step 3 logic
  // const addRole = () => { /* ... */ };

  const handleMemberRoleChange = (memberEmail: string, newRole: string) => {
    setProjectData(prev => ({
      ...prev,
      memberAssignments: prev.memberAssignments.map(assignment =>
        assignment.memberEmail === memberEmail ? { ...assignment, role: newRole } : assignment
      ),
    }));
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
        // All 4 members must have a role assigned
        return (
          projectData.memberAssignments.length === 4 &&
          projectData.memberAssignments.every(assignment => assignment.role.trim() !== '')
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Before completing, derive the 'roles' array from the unique assigned member roles
      const finalRoles = Array.from(new Set(projectData.memberAssignments.map(a => a.role).filter(Boolean)));

      onComplete({
        ...projectData,
        roles: finalRoles, // Pass the derived unique roles
      });
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
              {step === 3 && 'Assign Roles to Teammates'} {/* Updated title */}
            </h2>
            <p className="text-gray-600 mt-1">
              {step === 1 && 'Fill in your academic info and project name'}
              {step === 2 && 'Invite exactly 4 teammates to collaborate'}
              {step === 3 && 'Assign specific roles to each of your 4 teammates'} {/* Updated description */}
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
                  Invited ({projectData.members.length} / 4) {/* Updated count display */}
                </h4>
                <div className="space-y-2">
                  {projectData.members.map((email, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                      <span>{email}</span>
                      {idx === 0 && <span className="text-xs text-gray-500 ml-2">(You)</span>} {/* Indicate the first member as "You" */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Assign Roles to Members */}
          {step === 3 && (
            <div className="space-y-6">
              <p className="text-gray-700 mb-4">Assign a primary role to each of your team members:</p>
              
              {projectData.memberAssignments.map((assignment, idx) => (
                <div key={assignment.memberEmail} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 bg-gray-50 rounded-lg">
                  <label htmlFor={`role-${idx}`} className="text-sm font-medium text-gray-800 w-full sm:w-1/3">
                    {/* Display member's email, indicating "You" for the first member */}
                    <span className="font-semibold">{assignment.memberEmail}</span>
                    {idx === 0 && <span className="text-xs text-gray-500 ml-1">(You)</span>}
                  </label>
                  <select
                    id={`role-${idx}`}
                    value={assignment.role}
                    onChange={e => handleMemberRoleChange(assignment.memberEmail, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 w-full sm:w-2/3"
                    required
                  >
                    <option value="">Select a role</option>
                    {ROLES.map(roleOption => (
                      <option
                        key={roleOption}
                        value={roleOption}
                        // Disable already assigned roles (unless it's the current assignment)
                        disabled={
                          projectData.memberAssignments.some(
                            (a) => a.role === roleOption && a.memberEmail !== assignment.memberEmail
                          )
                        }
                      >
                        {roleOption}
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
