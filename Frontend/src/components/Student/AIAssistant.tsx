import React, { useState } from 'react';
import { Bot, Send, X, Lightbulb, CheckSquare, TrendingUp } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
}

export default function AIAssistant({ onClose }: AIAssistantProps) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: "Hello! I'm Bublik, your AI learning assistant. I'm here to help you with your PBL project. How can I assist you today?",
      timestamp: new Date()
    }
  ]);

  const suggestions = [
    {
      title: "Review Progress",
      description: "Get insights on your current progress and what to focus on next",
      icon: TrendingUp,
      action: "analyze progress"
    },
    {
      title: "Suggest Next Task",
      description: "Get AI-powered recommendations for your next priority task",
      icon: CheckSquare,
      action: "suggest next task"
    },
    {
      title: "Problem Solving",
      description: "I'm stuck on something, can you help me troubleshoot?",
      icon: Lightbulb,
      action: "help troubleshoot"
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatHistory(prev => [
      ...prev,
      {
        type: 'user',
        message,
        timestamp: new Date()
      }
    ]);
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        {
          type: 'ai',
          message: generateAIResponse(message),
          timestamp: new Date()
        }
      ]);
    }, 1000);
    
    setMessage('');
  };

  const generateAIResponse = (userMessage: string) => {
    // Simple response generation based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('progress')) {
      return "Based on your current progress, you're doing well! You've completed 4 out of 12 tasks. I notice you have 1 overdue task - the database schema design. I recommend prioritizing this task as it's blocking other backend work.";
    }
    
    if (lowerMessage.includes('next') || lowerMessage.includes('task')) {
      return "Your next priority should be completing the overdue database schema design. This task is critical because other team members are waiting for it. After that, I'd suggest focusing on the wireframes that are due in 12 hours.";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
      return "I'm here to help! What specifically are you stuck on? Whether it's technical challenges, project planning, or time management, I can provide guidance and resources.";
    }
    
    return "I understand your concern. Let me help you break this down into manageable steps. Can you tell me more about what you're working on?";
  };

  const handleSuggestionClick = (action: string) => {
    setMessage(action);
    handleSendMessage();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg h-full max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mr-3">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Bublik AI</h3>
            <p className="text-xs text-gray-500">Your learning assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                chat.type === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {chat.message}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {chatHistory.length === 1 && (
        <div className="p-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Quick suggestions:</p>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.action)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-start">
                    <Icon className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{suggestion.title}</p>
                      <p className="text-xs text-gray-600">{suggestion.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Message input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask Bublik anything..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}