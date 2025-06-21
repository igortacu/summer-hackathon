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
import LandingPage from './components/Layout/LandingPage';
import AIAssistant from './components/Student/AIAssistant';
type AppState =
    | 'auth'
    | 'landing'
    | 'role-selection'
    | 'project-setup'
    | 'problem-definition'
    | 'dashboard';

interface User {
    name: string;
    email: string;
    role: 'student' | 'mentor';
}

interface ProjectData {
    [key: string]: any;
}

function App() {
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [user, setUser] = useState<User | null>(null);
    const [appState, setAppState] = useState<AppState>('landing');
    const [projectData, setProjectData] = useState<ProjectData | null>(null);
    const [activeTab, setActiveTab] = useState<string>('dashboard');
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [selectedChat, setSelectedChat] = useState<any>(null);

    const mockChatGroups = [
        { id: '1', name: 'Project Alpha Team', participants: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Dr. Wilson'], lastMessage: 'Great work!', lastMessageTime: new Date(Date.now() - 1800000), unreadCount: 2 },
        { id: '2', name: 'Project Beta Team', participants: ['Alice Brown', 'Bob Davis', 'Carol White', 'Dr. Wilson'], lastMessage: 'API ready', lastMessageTime: new Date(Date.now() - 3600000), unreadCount: 0 },
    ];

    const studentTeam = {
        id: 'student-team',
        name: 'My Team Chat',
        participants: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Dr. Wilson'],
        lastMessage: 'Great work!',
        lastMessageTime: new Date(Date.now() - 1800000),
        unreadCount: 2,
    };

    const handleAuth = (formData: any) => {
        setUser({ name: formData.name || 'John Doe', email: formData.email, role: 'student' });
        setAppState('role-selection');
    };

    const handleLogout = () => {
        setUser(null);
        setProjectData(null);
        setAppState('landing');
    };

    const handleRoleSelection = (role: 'student' | 'mentor') => {
        setUser((prev) => (prev ? { ...prev, role } : null));
        setAppState(role === 'student' ? 'project-setup' : 'dashboard');
    };

    const handleProjectSetup = (data: ProjectData) => {
        setProjectData(data);
        setAppState('problem-definition');
    };

    const handleProblemDefinition = (data: ProjectData) => {
        setProjectData((prev) => ({ ...(prev || {}), ...(data || {}) }));
        setAppState('dashboard');
    };

    const handleChatSelect = (group: any) => {
        setSelectedChat(group);
        setIsChatOpen(true);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    if (!user) {
        if (appState === 'landing') {
            return (
                <LandingPage
                    onLogin={() => { setAuthMode('login'); setAppState('auth'); }}
                    onSignup={() => { setAuthMode('signup'); setAppState('auth'); }}
                />
            );
        }
        return <AuthForm mode={authMode} onSubmit={handleAuth} onModeChange={setAuthMode} />;
    }

    let content;
    switch (appState) {
        case 'role-selection':
            content = <RoleSelection onRoleSelect={handleRoleSelection} />;
            break;
        case 'project-setup':
            content = <ProjectSetup onComplete={handleProjectSetup} />;
            break;
        case 'problem-definition':
            content = <ProblemDefinition onComplete={handleProblemDefinition} />;
            break;
        case 'dashboard':
        default:
            content = (
                <div className="min-h-screen bg-gray-50">
                    <Header user={user} notifications={3} onLogout={handleLogout} />
                    <div className="flex">
                        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} userRole={user.role} />
                        <main className="flex-1 overflow-hidden">
                            {user.role === 'student' ? (
                                <>
                                    {activeTab === 'dashboard' && <Dashboard projectData={projectData} />}
                                    {activeTab === 'projects' && <MyProjects projectData={projectData} />}
                                    {activeTab === 'tasks' && <MyTasks />}
                                    {activeTab === 'stats' && <Statistics />}
                                    {activeTab === 'calendar' && <Calendar />}
                                    {activeTab === 'chat' && (
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
                                    {activeTab === 'groups' && <MyGroups />}
                                    {activeTab === 'review' && <CodeReview />}
                                    {activeTab === 'analytics' && <Analytics />}
                                    {activeTab === 'calendar' && <MentorCalendar />}
                                    {activeTab === 'chats' && (
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
                    <Chat
                        isOpen={isChatOpen}
                        onClose={() => setIsChatOpen(false)}
                        chatTitle={selectedChat?.name || ''}
                        participants={selectedChat?.participants || []}
                        userRole={user.role}
                    />
                </div>
            );
            break;
    }

    return (
        <>
            {content}

            {/* MODIFICATION: The AI Assistant will now ONLY appear when you are on the main dashboard view. */}
            {appState === 'dashboard' && activeTab === 'dashboard' && (
                <AIAssistant />
            )}
        </>
    );
}

export default App;