import React, { useState } from 'react';
import { Bot, Lightbulb, ArrowRight, RefreshCw } from 'lucide-react';

interface ProblemDefinitionProps {
  onComplete: (data: any) => void;
}

export default function ProblemDefinition({ onComplete }: ProblemDefinitionProps) {
  const [problem, setProblem] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customizeMode, setCustomizeMode] = useState(false);

  const handleAnalyzeProblem = async () => {
    if (!problem.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockSuggestions = {
        analysis: "Based on your problem description, I've identified key areas that need attention and created a structured task breakdown.",
        tasks: [
          {
            title: "Research & Analysis",
            description: "Conduct market research and analyze existing solutions",
            assignedRole: "Research Analyst",
            priority: "high",
            estimatedDays: 3,
            tags: ["research", "analysis"]
          },
          {
            title: "System Architecture Design",
            description: "Design the overall system architecture and technology stack",
            assignedRole: "Backend Developer",
            priority: "high",
            estimatedDays: 2,
            tags: ["architecture", "backend"]
          },
          {
            title: "UI/UX Design",
            description: "Create wireframes and user interface designs",
            assignedRole: "UI/UX Designer",
            priority: "medium",
            estimatedDays: 4,
            tags: ["design", "frontend"]
          },
          {
            title: "Frontend Development",
            description: "Implement the user interface and user experience",
            assignedRole: "Frontend Developer",
            priority: "medium",
            estimatedDays: 5,
            tags: ["frontend", "development"]
          },
          {
            title: "Backend API Development",
            description: "Build the backend APIs and database integration",
            assignedRole: "Backend Developer",
            priority: "high",
            estimatedDays: 6,
            tags: ["backend", "api"]
          },
          {
            title: "Testing & Quality Assurance",
            description: "Comprehensive testing of all system components",
            assignedRole: "Quality Assurance",
            priority: "medium",
            estimatedDays: 3,
            tags: ["testing", "qa"]
          }
        ]
      };
      
      setAiSuggestions(mockSuggestions);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleAcceptDistribution = () => {
    onComplete({
      problem,
      tasks: aiSuggestions.tasks,
      acceptedAiDistribution: true
    });
  };

  const handleCustomDistribution = () => {
    setCustomizeMode(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full mb-4">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's Define Your Challenge</h1>
          <p className="text-gray-600">
            Tell Bublik AI about your PBL problem, and I'll help create a structured approach
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {!aiSuggestions ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="problem" className="block text-lg font-medium text-gray-900 mb-3">
                  What problem are you solving in this PBL project?
                </label>
                <textarea
                  id="problem"
                  rows={6}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-base"
                  placeholder="Describe your problem in detail. For example: 'We need to develop a mobile app that helps students find study groups on campus. Students currently struggle to connect with peers in their courses, leading to isolation and poor academic performance. Our solution should match students based on their courses, study preferences, and availability...'"
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleAnalyzeProblem}
                  disabled={!problem.trim() || isAnalyzing}
                  className="px-8 py-4 bg-gradient-to-r from-accent-600 to-accent-700 text-white rounded-lg hover:from-accent-700 hover:to-accent-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-lg font-medium"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="animate-spin h-5 w-5 mr-3" />
                      Bublik is analyzing...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-5 w-5 mr-3" />
                      Analyze Problem with AI
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* AI Analysis */}
              <div className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent-900 mb-2">Bublik's Analysis</h3>
                    <p className="text-accent-800">{aiSuggestions.analysis}</p>
                  </div>
                </div>
              </div>

              {/* Suggested Tasks */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Suggested Task Distribution</h3>
                <div className="grid gap-4">
                  {aiSuggestions.tasks.map((task: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-gray-900">{task.title}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              task.priority === 'high' 
                                ? 'bg-error-100 text-error-800' 
                                : task.priority === 'medium'
                                ? 'bg-warning-100 text-warning-800'
                                : 'bg-success-100 text-success-800'
                            }`}>
                              {task.priority} priority
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>👤 {task.assignedRole}</span>
                            <span>⏱️ {task.estimatedDays} days</span>
                            <div className="flex space-x-1">
                              {task.tags.map((tag: string, tagIndex: number) => (
                                <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleCustomDistribution}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  I want a different split
                </button>
                <button
                  onClick={handleAcceptDistribution}
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center font-medium"
                >
                  Accept & Start Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}