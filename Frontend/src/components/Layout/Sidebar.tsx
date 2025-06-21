import React from 'react';
import { 
  Home, 
  FolderOpen, 
  CheckSquare, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Calendar,
  Bot 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: 'student' | 'mentor';
}

export default function Sidebar({ activeTab, onTabChange, userRole }: SidebarProps) {
  const studentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'My Projects', icon: FolderOpen },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'ai-assistant', label: 'Bublik AI', icon: Bot },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  const mentorTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'groups', label: 'My Groups', icon: Users },
    { id: 'review', label: 'Code Review', icon: CheckSquare },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'stats', label: 'Analytics', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  const tabs = userRole === 'student' ? studentTabs : mentorTabs;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-16">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <li key={tab.id}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}