// src/App.tsx
import React, { useState, useEffect } from 'react';
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
import LandingPage from './components/Layout/LandingPage';

// Re-declare the same Task interface MyTasks expects
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
  const [problemData, setProblemData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  // ——— Responsive drawer state ———
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  // Lock body scroll when the drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : 'auto';
  }, [sidebarOpen]);

  // Helper to compute due-date color
  function getStatusColor(dueDate?: Date): 'green'|'yellow'|'red' {
    if (!dueDate) return 'green';
    const diffDays = (dueDate.getTime() - Date.now()) / (1000 * 3600 * 24);
    if (diffDays < 0) return 'red';
    if (diffDays < 1) return 'yellow';
    return 'green';
  }

  // 1. Landing → Auth
  if (appState === 'landing') {
    return (
      <LandingPage
        onLogin={() => { setAuthMode('login'); setAppState('auth'); }}
        onSignup={() => { setAuthMode('signup'); setAppState('auth'); }}
      />
    );
  }

  // 2. Login / Signup
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

  // 3. Role choice
 if (appState === 'role-selection') {
  return (
    <RoleSelection
      onRoleSelect={r => {
        setUser(u => u && { ...u, role: r });
        // send students to setup, mentors directly to dashboard
        setAppState(r === 'student' ? 'project-setup' : 'dashboard');
      }}
    />
  );
}

  // 4. Student setup flow
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
  if (user?.role === 'student' && appState === 'problem-definition') {
    return (
      <ProblemDefinition
        onComplete={data => {
          setProblemData(data);
          setAppState('dashboard');
        }}
      />
    );
  }

  // 5. Main dashboard
  if (appState === 'dashboard' && user) {
    const mentorChats = [
      {
        id: '1',
        name: 'Alpha Team',
        participants: ['A', 'B', 'C'],
        lastMessage: 'Done',
        lastMessageTime: new Date(),
        unreadCount: 1
      },
      /* … */
    ];

    const studentGroup = {
      id: 'team',
      name: 'Team Chat',
      participants: projectData?.members || [],
      lastMessage: 'Let’s start',
      lastMessageTime: new Date(),
      unreadCount: 0
    };

    // Convert AI analysis → full Task[] for MyTasks
    const tasksForMyTasks: Task[] = (problemData?.tasks || []).map(
      (t: any, i: number) => {
        const due = new Date(Date.now() + t.estimatedDays * 24 * 3600 * 1000);
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
      }
    );

    const handleLogout = () => {
      setUser(null);
      setProjectData(null);
      setProblemData(null);
      setAppState('auth');
      setActiveTab('dashboard');
    };
    const openChat = (grp: any) => {
      setSelectedChat(grp);
      setIsChatOpen(true);
    };
    const changeTab = (tab: string) => {
      setActiveTab(tab);
      closeSidebar(); // close drawer on mobile
      if (tab === 'chat' && user.role === 'student') {
        openChat(studentGroup);
      }
    };

    return (
      <div className="flex h-screen bg-gray-50">
        {/* Mobile drawer */}
        <aside
          className={`
            fixed top-16 inset-y-0 left-0 z-40 w-64 bg-white shadow-lg
            transform transition-transform duration-200 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:hidden overflow-y-auto
          `}
        >
          <Sidebar activeTab={activeTab} onTabChange={changeTab} userRole={user.role} />
        </aside>

        {/* Drawer backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-25 z-30"
            onClick={closeSidebar}
          />
        )}

        {/* Static sidebar on md+ */}
        <aside className="hidden md:flex md:flex-shrink-0">
          <Sidebar activeTab={activeTab} onTabChange={changeTab} userRole={user.role} />
        </aside>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header
            user={user}
            notifications={3}
            onLogout={handleLogout}
            onMenuClick={openSidebar}
          />

          <main className="flex-1 overflow-y-auto">
            {user.role === 'student' ? (
              <>
                {activeTab === 'dashboard' && (
                  <Dashboard
                    projectData={projectData}
                    problemData={problemData}
                    userRole={projectData.roles[0]}
                  />
                )}
                {activeTab === 'projects' && (
                  <MyProjects
                    projectData={{
                      projectName: projectData.projectName,
                      description: projectData.description,
                      members: projectData.members
                    }}
                  />
                )}
                {activeTab === 'tasks' && (
                  <MyTasks
                    tasks={tasksForMyTasks}
                    userRole={projectData.roles[0]}
                  />
                )}
                {activeTab === 'stats' && <Statistics />}
                {activeTab === 'calendar' && <Calendar />}
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
                  <ChatList
                    groups={mentorChats}
                    onSelectGroup={openChat}
                    userRole="mentor"
                  />
                )}
              </>
            )}
          </main>
        </div>

        {/* Chat modal */}
        <Chat
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          chatTitle={selectedChat?.name}
          participants={selectedChat?.participants || []}
          userRole={user.role}
        />
      </div>
    );
  }

  return null;
}
