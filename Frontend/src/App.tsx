// src/App.tsx
import React, { useState, useEffect } from 'react';
import AuthForm from './components/Auth/AuthForm';
import RoleSelection from './components/Auth/RoleSelection';
import ProjectSetup from './components/Student/ProjectSetup';
import ProblemDefinition, { AiTask } from './components/Student/ProblemDefinition';
import Dashboard from './components/Student/Dashboard';
import MyProjects from './components/Student/MyProjects';
import MyTasks from './components/Student/MyTasks';
import Statistics from './components/Student/Statistics';
import Resources from './components/Student/Resources';
import MentorDashboard from './components/Mentor/MentorDashboard';
import MyGroups from './components/Mentor/MyGroups';
import CodeReview from './components/Mentor/CodeReview';
import Analytics from './components/Mentor/Analytics';
import MentorCalendar from './components/Mentor/MentorCalendar';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import ChatList, { ChatGroup } from './components/Student/ChatList';
import Chat from './components/Student/Chat';
import LandingPage from './components/Layout/LandingPage';
import AIAssistant from './components/Student/AIAssistant';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  statusColor: 'green' | 'yellow' | 'red';
  points: number;
  tags: string[];
}

type AppState =
  | 'landing'
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

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [authMode, setAuthMode] = useState<'login'|'signup'>('login');
  const [user, setUser] = useState<User|null>(null);
  const [projectData, setProjectData] = useState<any>(null);

  // store the accepted role and tasks from ProblemDefinition
  const [currentAssignedRole, setCurrentAssignedRole] = useState<string>('');
  const [currentTasks, setCurrentTasks] = useState<AiTask[]>([]);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatGroup|null>(null);

  // Drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : 'auto';
  }, [sidebarOpen]);

  function getStatusColor(dueDate?: Date): 'green'|'yellow'|'red' {
    if (!dueDate) return 'green';
    const diffDays = (dueDate.getTime() - Date.now()) / (1000*3600*24);
    if (diffDays < 0) return 'red';
    if (diffDays < 1) return 'yellow';
    return 'green';
  }

  // 1. Landing
  if (appState === 'landing') {
    return (
      <LandingPage
        onLogin={() => { setAuthMode('login'); setAppState('auth'); }}
        onSignup={() => { setAuthMode('signup'); setAppState('auth'); }}
      />
    );
  }

  // 2. Auth
  if (appState === 'auth') {
    return (
      <AuthForm
        mode={authMode}
        onSubmit={data => {
          setUser({ name: data.name || 'User', email: data.email, role: 'student' });
          setAppState('role-selection');
        }}
        onModeChange={setAuthMode}
      />
    );
  }

  // 3. Role selection
  if (appState === 'role-selection') {
    return (
      <RoleSelection
        onRoleSelect={r => {
          setUser(u => u && { ...u, role: r });
          setAppState(r === 'student' ? 'project-setup' : 'dashboard');
        }}
      />
    );
  }

  // 4a. Project setup (student)
  if (user?.role === 'student' && appState === 'project-setup') {
    return (
      <ProjectSetup
        onComplete={data => {
          setProjectData(data);
          setAppState('problem-definition');
        }}
      />
    );
  }

  // 4b. Problem definition (student)
  if (user?.role === 'student' && appState === 'problem-definition') {
    return (
      <ProblemDefinition
        onComplete={({ tasks }) => {
          const role = tasks.length > 0 ? tasks[0].assignedRole : '';
          setCurrentAssignedRole(role);
          setCurrentTasks(tasks);
          setAppState('dashboard');
        }}
      />
    );
  }

  // 5. Dashboard & other tabs
  if (appState === 'dashboard' && user) {
    // properly type your chat groups
    const mentorChats: ChatGroup[] = [
      {
        id: '1',
        name: 'Alpha Team',
        participants: ['A', 'B', 'C'],
        lastMessage: 'Done',
        lastMessageTime: new Date(),
        unreadCount: 1
      },
      // …other ChatGroup items
    ];

    const studentGroup: ChatGroup = {
      id: 'team',
      name: 'Team Chat',
      participants: projectData?.members || [],
      lastMessage: 'Let’s start',
      lastMessageTime: new Date(),
      unreadCount: 0
    };

    // build Task[] for MyTasks if needed
    const tasksForMyTasks: Task[] = currentTasks.map((t, i) => {
      const due = new Date(Date.now() + t.estimatedDays * 24*3600*1000);
      return {
        id: String(i),
        title: t.title,
        description: t.description,
        assignedTo: t.assignedRole,
        status: 'todo',
        priority: t.priority,
        dueDate: due,
        statusColor: getStatusColor(due),
        points: t.estimatedDays,
        tags: t.tags
      };
    });

    const handleLogout = () => {
      setUser(null);
      setProjectData(null);
      setCurrentTasks([]);
      setCurrentAssignedRole('');
      setAppState('auth');
      setActiveTab('dashboard');
    };

    const openChat = (grp: ChatGroup) => {
      setSelectedChat(grp);
      setIsChatOpen(true);
    };

    const changeTab = (tab: string) => {
      setActiveTab(tab);
      closeSidebar();
      if (tab === 'chat' && user.role === 'student') {
        openChat(studentGroup);
      }
    };

    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <aside
          className={`fixed top-16 inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden`}
        >
          <Sidebar activeTab={activeTab} onTabChange={changeTab} userRole={user.role} />
        </aside>
        {sidebarOpen && <div className="fixed inset-0 bg-black opacity-25 z-30" onClick={closeSidebar}/>}

        <aside className="hidden md:flex md:flex-shrink-0">
          <Sidebar activeTab={activeTab} onTabChange={changeTab} userRole={user.role} />
        </aside>

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header user={user} notifications={3} onLogout={handleLogout} onMenuClick={openSidebar} />

          <main className="flex-1 overflow-y-auto">
            {user.role === 'student' ? (
              <>
                {activeTab === 'dashboard' && (
                  <Dashboard
                    projectData={projectData}
                    problemData={{ tasks: currentTasks }}
                    userEmail={user.email}
                    userRole={currentAssignedRole}
                  />
                )}
                {activeTab === 'projects' && <MyProjects projectData={projectData} />}
                {activeTab === 'tasks' && (
                  <MyTasks tasks={tasksForMyTasks} userRole={currentAssignedRole} />
                )}
                {activeTab === 'stats' && <Statistics />}
                {activeTab === 'resources' && <Resources />}
                {activeTab === 'chat' && (
                  <ChatList
                    groups={[studentGroup]}
                    onSelectGroup={openChat}
                    userRole="student"
                  />
                )}
              </>
            ) : (
              <>
                {activeTab === 'dashboard' && <MentorDashboard />}
                {activeTab === 'groups' && <MyGroups />}
                {activeTab === 'review' && <CodeReview />}
                {activeTab === 'analytics' && <Analytics />}
                {activeTab === 'calendar' && <MentorCalendar />}
                {activeTab === 'chats' && (
                  <ChatList groups={mentorChats} onSelectGroup={openChat} userRole="mentor" />
                )}
              </>
            )}
          </main>
        </div>

        <Chat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          chatTitle={selectedChat?.name || ''}
          participants={selectedChat?.participants || []}
          userRole={user.role}
        />

        {user.role === 'student' && activeTab === 'dashboard' && <AIAssistant />}
      </div>
    );
  }

  return null;
}
