import React, { useState } from 'react';
import AuthForm from './components/Auth/AuthForm';
import RoleSelection from './components/Auth/RoleSelection';
import ProjectSetup from './components/Student/ProjectSetup';
import ProblemDefinition from './components/Student/ProblemDefinition';
import Dashboard from './components/Student/Dashboard';
import MyProjects from './components/Student/MyProjects';
import MyTasks from './components/Student/MyTasks';
import Statistics from './components/Student/Statistics';
import Calendar from './components/Student/Calendar';
import MentorDashboard from './components/Mentor/MentorDashboard';
import MyGroups from './components/Mentor/MyGroups';
import CodeReview from './components/Mentor/CodeReview';
import Analytics from './components/Mentor/Analytics';
import MentorCalendar from './components/Mentor/MentorCalendar';
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
     setUser((prev: User | null) =>
      prev ? { ...prev, role } : null
    );
    
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
    // <-- and here, too
    setProjectData((prev: any) => ({ ...prev, ...data }));
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
              <>
                {activeTab === 'dashboard' && <Dashboard projectData={projectData} />}
                {activeTab === 'projects' && <MyProjects projectData={projectData} />}
                {activeTab === 'tasks' && <MyTasks />}
                {activeTab === 'stats' && <Statistics />}
                {activeTab === 'calendar' && <Calendar />}
              </>
            ) : (
              <>
                {activeTab === 'dashboard' && <MentorDashboard />}
                {activeTab === 'groups' && <MyGroups />}
                {activeTab === 'review' && <CodeReview />}
                {activeTab === 'analytics' && <Analytics />}
                {activeTab === 'calendar' && <MentorCalendar />}
              </>
            )}
          </main>
        </div>
      </div>
    );
  }

  return null;
}

export default App;