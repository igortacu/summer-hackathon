import React, { useState } from 'react';
import AuthForm from './components/Auth/AuthForm';
import RoleSelection from './components/Auth/RoleSelection';
import ProjectSetup from './components/Student/ProjectSetup';
import ProblemDefinition from './components/Student/ProblemDefinition';
import Dashboard from './components/Student/Dashboard';
import MentorDashboard from './components/Mentor/MentorDashboard';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';

type AppState = 
  | 'auth' 
  | 'role-selection' 
  | 'project-setup' 
  | 'problem-definition' 
  | 'dashboard';

interface User {
  name: string;
  email: string;
  role: 'student' | 'mentor';
}

function App() {
  const [appState, setAppState] = useState<AppState>('auth');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [projectData, setProjectData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleAuth = (formData: any) => {
    // Simulate authentication
    setUser({
      name: formData.name || 'John Doe',
      email: formData.email,
      role: 'student' // Will be set in role selection
    });
    setAppState('role-selection');
  };

  const handleRoleSelection = (role: 'student' | 'mentor') => {
    setUser(prev => prev ? { ...prev, role } : null);
    
    if (role === 'student') {
      setAppState('project-setup');
    } else {
      setAppState('dashboard');
    }
  };

  const handleProjectSetup = (data: any) => {
    setProjectData(data);
    setAppState('problem-definition');
  };

  const handleProblemDefinition = (data: any) => {
    setProjectData(prev => ({ ...prev, ...data }));
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setProjectData(null);
    setAppState('auth');
    setActiveTab('dashboard');
  };

  // Auth screens
  if (appState === 'auth') {
    return (
      <AuthForm
        mode={authMode}
        onSubmit={handleAuth}
        onModeChange={setAuthMode}
      />
    );
  }

  if (appState === 'role-selection') {
    return <RoleSelection onRoleSelect={handleRoleSelection} />;
  }

  // Student onboarding
  if (appState === 'project-setup' && user?.role === 'student') {
    return <ProjectSetup onComplete={handleProjectSetup} />;
  }

  if (appState === 'problem-definition' && user?.role === 'student') {
    return <ProblemDefinition onComplete={handleProblemDefinition} />;
  }

  // Main application
  if (appState === 'dashboard' && user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          user={user} 
          notifications={3} 
          onLogout={handleLogout} 
        />
        
        <div className="flex">
          <Sidebar 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            userRole={user.role}
          />
          
          <main className="flex-1 overflow-hidden">
            {user.role === 'student' ? (
              activeTab === 'dashboard' ? (
                <Dashboard projectData={projectData} />
              ) : (
                <div className="p-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h2>
                    <p className="text-gray-600">This section is coming soon!</p>
                  </div>
                </div>
              )
            ) : (
              <MentorDashboard />
            )}
          </main>
        </div>
      </div>
    );
  }

  return null;
}

export default App;