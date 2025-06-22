// src/components/Student/ProblemDefinition.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Bot, Lightbulb, ArrowRight, RefreshCw, CheckCircle, Brain } from 'lucide-react';
import { AiTask } from './types';    // instead of redeclaring
export interface AiTask {
  title: string;
  description: string;
  assignedRole: string;
  priority: 'low' | 'medium' | 'high';
  estimatedDays: number;
  tags: string[];
}

export interface AiSuggestions {
  analysis: string;
  tasks: AiTask[];
}

interface ProblemDefinitionProps {
  onComplete: (data: {
    problem: string;
    selectedIdea: string;
    tasks: AiTask[];
    acceptedAiDistribution: boolean;
  }) => void;
}

export interface AiSuggestions { analysis: string; tasks: AiTask[] }

export default function ProblemDefinition({ onComplete }: ProblemDefinitionProps) {
  const [problem, setProblem] = useState('');
  const [ideas, setIdeas] = useState<string[] | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<AiSuggestions | null>(null);
  const [currentTasks, setCurrentTasks] = useState<AiTask[]>([]); // <-- New state
  const [isAnalyzingIdeas, setIsAnalyzingIdeas] = useState(false);
  const [isGeneratingTasks, setIsGeneratingTasks] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIdeas = async () => {
    if (!problem.trim()) {
      setError('Please describe your problem before analyzing.');
      return;
    }
    setError(null);
    setIsAnalyzingIdeas(true);
    setIdeas(null);
    setSelectedIdea(null);
    setAiSuggestions(null);

    try {
      const response = await fetch('http://localhost:5500/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data.ideas)) {
        setIdeas(data.ideas);
      } else {
        setError('AI could not generate ideas. Please rephrase your problem.');
        setIdeas([]);
      }
    } catch (err: any) {
      console.error('Error fetching ideas:', err);
      setError(`Failed to fetch ideas: ${err.message}. Make sure your backend is running.`);
    } finally {
      setIsAnalyzingIdeas(false);
    }
  };

  const handleGenerateTasks = useCallback(async () => {
    if (!selectedIdea) return;

    setError(null);
    setIsGeneratingTasks(true);
    setAiSuggestions(null);

    try {
      const response = await fetch('http://localhost:5500/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem, idea: selectedIdea }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.analysis && Array.isArray(data.tasks)) {
        setAiSuggestions(data as AiSuggestions);
      } else {
        setError("AI could not generate structured tasks for this idea. Please ensure backend returns 'analysis' and 'tasks'.");
        setAiSuggestions({ analysis: '', tasks: [] });
      }
    } catch (err: any) {
      console.error('Error fetching tasks:', err);
      setError(`Failed to fetch tasks: ${err.message}. Make sure your backend is running and returning valid JSON.`);
      setAiSuggestions({ analysis: '', tasks: [] });
    } finally {
      setIsGeneratingTasks(false);
    }
  }, [selectedIdea, problem]);

  // Auto-generate tasks when an idea is selected
  useEffect(() => {
    if (selectedIdea && problem) {
      handleGenerateTasks();
    }
  }, [selectedIdea, problem, handleGenerateTasks]);

  // Populate and console.log the full task objects whenever AI suggestions update
  useEffect(() => {
    if (aiSuggestions?.tasks) {
      setCurrentTasks(aiSuggestions.tasks);
      console.log('Current Tasks:', aiSuggestions.tasks);
    }
  }, [aiSuggestions]);

  const handleAcceptDistribution = () => {
    if (problem && selectedIdea && aiSuggestions?.tasks.length) {
      onComplete({
        problem,
        selectedIdea,
        tasks: aiSuggestions.tasks,
        acceptedAiDistribution: true,
      });
    } else {
      setError('Please ensure a problem is described, an idea is selected, and tasks are generated before proceeding.');
    }
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Problem Description and Idea Generation Input */}
          {!ideas && !isAnalyzingIdeas && (
            <div className="space-y-6">
              <div>
                <label htmlFor="problem" className="block text-lg font-medium text-gray-900 mb-3">
                  What problem are you solving in this PBL project?
                </label>
                <textarea
                  id="problem"
                  rows={6}
                  value={problem}
                  onChange={(e) => {
                    setProblem(e.target.value);
                    setIdeas(null);
                    setSelectedIdea(null);
                    setAiSuggestions(null);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-base"
                  placeholder="Describe your problem in detail..."
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleGenerateIdeas}
                  disabled={!problem.trim() || isAnalyzingIdeas}
                  className="px-8 py-4 bg-gradient-to-r from-accent-600 to-accent-700 text-white rounded-lg hover:from-accent-700 hover:to-accent-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-lg font-medium"
                >
                  {isAnalyzingIdeas ? (
                    <>
                      <RefreshCw className="animate-spin h-5 w-5 mr-3" />
                      Bublik is analyzing...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-5 w-5 mr-3" />
                      Generate Ideas with AI
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Two-Column Layout for ideas & tasks */}
          {(isAnalyzingIdeas || ideas || aiSuggestions || isGeneratingTasks) && (
            <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
              {/* Left: Ideas */}
              <div className="flex-1 lg:w-1/2">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Suggested Project Ideas:</h3>
                {isAnalyzingIdeas && <p className="text-center text-gray-600">Generating ideas...</p>}
                {ideas && ideas.length > 0 && (
                  <div className="space-y-4">
                    {ideas.map((idea, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedIdea === idea
                            ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                        }`}
                        onClick={() => setSelectedIdea(idea)}
                      >
                        <h4 className="font-medium text-gray-900 flex items-center">
                          {selectedIdea === idea && <CheckCircle className="h-5 w-5 text-primary-600 mr-2" />}
                          {idea}
                        </h4>
                      </div>
                    ))}
                  </div>
                )}
                {ideas && ideas.length === 0 && !isAnalyzingIdeas && (
                  <p className="text-center text-gray-600 mt-4">No ideas generated. Please try again.</p>
                )}
              </div>

              {/* Right: Tasks */}
              <div className="flex-1 lg:w-1/2 space-y-8">
                {isGeneratingTasks ? (
                  <div className="p-6 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 border border-dashed border-gray-300 min-h-[200px]">
                    <div className="text-center">
                      <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-3 text-primary-500" />
                      <p className="text-lg">Bublik is brainstorming tasks...</p>
                    </div>
                  </div>
                ) : aiSuggestions ? (
                  <>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Suggested Task Distribution</h3>
                      <div className="grid gap-4">
                        {aiSuggestions.tasks.length === 0 && (
                          <p className="text-center text-gray-600">No tasks generated for this idea.</p>
                        )}
                        {aiSuggestions.tasks.map((task, idx) => (
                          <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                                  <span
                                    className={`px-2 py-1 text-xs rounded-full ${
                                      task.priority === 'high'
                                        ? 'bg-error-100 text-error-800'
                                        : task.priority === 'medium'
                                        ? 'bg-warning-100 text-warning-800'
                                        : 'bg-success-100 text-success-800'
                                    }`}
                                  >
                                    {task.priority} priority
                                  </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>👤 {task.assignedRole}</span>
                                  <span>⏱️ {task.estimatedDays} days</span>
                                  <div className="flex space-x-1">
                                    {task.tags.map((tag, i) => (
                                      <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
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

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => {
                          setAiSuggestions(null);
                          setSelectedIdea(null);
                        }}
                        className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Change Idea / Regenerate Tasks
                      </button>
                      <button
                        onClick={handleAcceptDistribution}
                        disabled={!aiSuggestions.tasks.length}
                        className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center font-medium disabled:opacity-50"
                      >
                        Accept & Start Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-6 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 border border-dashed border-gray-300 min-h-[200px]">
                    <div className="text-center">
                      <Lightbulb className="h-10 w-10 mx-auto mb-3" />
                      <p className="text-lg">Select an idea on the left to generate tasks.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
