import React from 'react';
import { MessageCircle, Users, Clock } from 'lucide-react';

interface ChatGroup {
  id: string;
  name: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

interface ChatListProps {
  groups: ChatGroup[];
  onSelectGroup: (group: ChatGroup) => void;
  userRole: 'student' | 'mentor';
}

export default function ChatList({ groups, onSelectGroup, userRole }: ChatListProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {userRole === 'mentor' ? 'Group Chats' : 'Team Chat'}
        </h1>
        <p className="text-gray-600 mt-1">
          {userRole === 'mentor' 
            ? 'Communicate with your student groups' 
            : 'Stay connected with your team and mentor'
          }
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {groups.length === 0 ? (
          <div className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No chats available</h3>
            <p className="text-gray-600">
              {userRole === 'mentor' 
                ? 'You haven\'t been assigned to any groups yet.' 
                : 'Your team chat will appear here once it\'s set up.'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {groups.map((group) => (
              <div
                key={group.id}
                onClick={() => onSelectGroup(group)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="bg-primary-100 p-2 rounded-lg">
                      <Users className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {group.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Users className="h-3 w-3 mr-1" />
                        {group.participants.length} members
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {group.lastMessage}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(group.lastMessageTime)}
                    </div>
                    {group.unreadCount > 0 && (
                      <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {group.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}