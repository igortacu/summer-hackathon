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
import ChatList from './components/Student/ChatList';
import Chat from './components/Student/Chat';

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
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  // Mock data for mentor chats
  const mockChatGroups = [
    { id: '1', name: 'Project Alpha Team', participants: ['John Doe','Jane Smith','Mike Johnson','Dr. Wilson'], lastMessage: 'Great work!', lastMessageTime: new Date(Date.now() - 1800000), unreadCount: 2 },
    { id: '2', name: 'Project Beta Team',  participants: ['Alice Brown','Bob Davis','Carol White','Dr. Wilson'], lastMessage: 'API ready',   lastMessageTime: new Date(Date.now() - 3600000), unreadCount: 0 },
    { id: '3', name: 'Project Gamma Team', participants: ['David Lee','Emma Wilson','Frank Miller','Dr. Wilson'], lastMessage: 'Meet tomorrow', lastMessageTime: new Date(Date.now() - 7200000), unreadCount: 1 },
  ];

  // Single student team chat
  const studentTeam = {
    id: 'student-team',
    name: 'My Team Chat',
    participants: ['John Doe','Jane Smith','Mike Johnson','Dr. Wilson'],
    lastMessage: 'Great work!',
    lastMessageTime: new Date(Date.now() - 1800000),
    unreadCount: 2,
  };

  const handleAuth = (formData: any) => {
    setUser({ name: formData.name || 'John Doe', email: formData.email, role: 'student' });
    setAppState('role-selection');
  };

  const handleRoleSelection = (role: 'student' | 'mentor') => {
    setUser((prev: User | null) => prev ? { ...prev, role } : null);
    setAppState(role === 'student' ? 'project-setup' : 'dashboard');
  };

  const handleProjectSetup = (data: any) => {
    setProjectData(data);
    setAppState('problem-definition');
  };

  const handleProblemDefinition = (data: any) => {
    setProjectData((prev: any) => ({ ...prev, ...data }));
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setProjectData(null);
    setAppState('auth');
    setActiveTab('dashboard');
  };

  const handleChatSelect = (group: any) => {
    setSelectedChat(group);
    setIsChatOpen(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Student: open team chat directly
    if (tab === 'chat' && user?.role === 'student') {
      handleChatSelect(studentTeam);
    }
  };

  // Auth flows
  if (appState === 'auth') {
    return <AuthForm mode={authMode} onSubmit={handleAuth} onModeChange={setAuthMode} />;
  }
  if (appState === 'role-selection') {
    return <RoleSelection onRoleSelect={handleRoleSelection} />;
  }
  if (appState === 'project-setup' && user?.role === 'student') {
    return <ProjectSetup onComplete={handleProjectSetup} />;
  }
  if (appState === 'problem-definition' && user?.role === 'student') {
    return <ProblemDefinition onComplete={handleProblemDefinition} />;
  }

  // Main app
  if (appState === 'dashboard' && user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} notifications={3} onLogout={handleLogout} />
        <div className="flex">
          <Sidebar activeTab={activeTab} onTabChange={handleTabChange} userRole={user.role} />
          <main className="flex-1 overflow-hidden">
            {user.role === 'student' ? (
              <>
                {activeTab === 'dashboard' && <Dashboard projectData={projectData} />}
                {activeTab === 'projects'  && <MyProjects projectData={projectData} />}
                {activeTab === 'tasks'     && <MyTasks />}
                {activeTab === 'stats'     && <Statistics />}
                {activeTab === 'calendar'  && <Calendar />}
                {activeTab === 'chat'      && (
                  <ChatList
                    groups={[studentTeam]}
                    onSelectGroup={handleChatSelect}
                    userRole="student"
                  />
                )}
              </>
            ) : (
              <>
                {activeTab === 'dashboard' && <MentorDashboard />}
                {activeTab === 'groups'    && <MyGroups />}
                {activeTab === 'review'    && <CodeReview />}
                {activeTab === 'analytics' && <Analytics />}
                {activeTab === 'calendar'  && <MentorCalendar />}
                {activeTab === 'chats'     && (
                  <ChatList
                    groups={mockChatGroups}
                    onSelectGroup={handleChatSelect}
                    userRole="mentor"
                  />
                )}
              </>
            )}
          </main>
        </div>

        {/* Global Chat modal */}
        <Chat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          chatTitle={selectedChat?.name || ''}
          participants={selectedChat?.participants || []}
          userRole={user.role}
        />
      </div>
    );
  }

  return null;
}

export default App;
