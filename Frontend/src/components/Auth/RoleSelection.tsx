import React from 'react';
import { GraduationCap, Users, ArrowRight } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'student' | 'mentor') => void;
}

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            Choose Your Role
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select whether you're joining as a student to work on projects or as a mentor to guide learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Student Role */}
          <div 
            onClick={() => onRoleSelect('student')}
            className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-6 group-hover:from-primary-600 group-hover:to-primary-700 transition-all">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Student</h3>
              <p className="text-gray-600 mb-6">
                Join projects, collaborate with teammates, and learn through problem-based learning with AI guidance
              </p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  Create and manage projects
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  Collaborate with team members
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  Get AI-powered task recommendations
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  Track progress and earn points
                </li>
              </ul>
              <div className="flex items-center justify-center text-primary-600 font-medium group-hover:text-primary-700">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Mentor Role */}
          <div 
            onClick={() => onRoleSelect('mentor')}
            className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full mb-6 group-hover:from-secondary-600 group-hover:to-secondary-700 transition-all">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mentor</h3>
              <p className="text-gray-600 mb-6">
                Guide student teams, review their work, provide feedback, and help them succeed in their learning journey
              </p>
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                  Oversee multiple student groups
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                  Review code and documents
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                  Provide feedback and grades
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                  Monitor progress and analytics
                </li>
              </ul>
              <div className="flex items-center justify-center text-secondary-600 font-medium group-hover:text-secondary-700">
                Start Mentoring
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}