import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { ChevronLeft, ChevronRight, Users, Clock, AlertTriangle } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function MentorCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [selectedGroup, setSelectedGroup] = useState('all');

  // Mock events data with tasks from all groups
  const events = [
    // StudyBuddy Team
    {
      id: 1,
      title: 'Database Schema Design',
      start: new Date(2024, 11, 15, 9, 0),
      end: new Date(2024, 11, 15, 17, 0),
      resource: {
        type: 'task',
        group: 'StudyBuddy Team',
        assignee: 'Jane Smith',
        priority: 'high',
        status: 'overdue'
      }
    },
    {
      id: 2,
      title: 'User Authentication Implementation',
      start: new Date(2024, 11, 18, 10, 0),
      end: new Date(2024, 11, 20, 16, 0),
      resource: {
        type: 'task',
        group: 'StudyBuddy Team',
        assignee: 'John Doe',
        priority: 'high',
        status: 'in-progress'
      }
    },
    {
      id: 3,
      title: 'StudyBuddy Team Review',
      start: new Date(2024, 11, 16, 14, 0),
      end: new Date(2024, 11, 16, 15, 0),
      resource: {
        type: 'meeting',
        group: 'StudyBuddy Team',
        assignee: 'All Team',
        priority: 'medium',
        status: 'scheduled'
      }
    },
    // EcoTracker Team
    {
      id: 4,
      title: 'Carbon Calculator Development',
      start: new Date(2024, 11, 17, 9, 0),
      end: new Date(2024, 11, 19, 17, 0),
      resource: {
        type: 'task',
        group: 'EcoTracker Team',
        assignee: 'Alex Brown',
        priority: 'medium',
        status: 'in-progress'
      }
    },
    {
      id: 5,
      title: 'Data Visualization Dashboard',
      start: new Date(2024, 11, 14, 9, 0),
      end: new Date(2024, 11, 16, 17, 0),
      resource: {
        type: 'task',
        group: 'EcoTracker Team',
        assignee: 'Emma Davis',
        priority: 'high',
        status: 'overdue'
      }
    },
    {
      id: 6,
      title: 'EcoTracker Sprint Planning',
      start: new Date(2024, 11, 21, 10, 0),
      end: new Date(2024, 11, 21, 11, 30),
      resource: {
        type: 'meeting',
        group: 'EcoTracker Team',
        assignee: 'All Team',
        priority: 'medium',
        status: 'scheduled'
      }
    },
    // Campus Navigator Team
    {
      id: 7,
      title: 'AR Navigation Testing',
      start: new Date(2024, 11, 22, 9, 0),
      end: new Date(2024, 11, 24, 17, 0),
      resource: {
        type: 'task',
        group: 'Campus Navigator Team',
        assignee: 'David Kim',
        priority: 'high',
        status: 'todo'
      }
    },
    {
      id: 8,
      title: 'Final Presentation Prep',
      start: new Date(2024, 11, 25, 13, 0),
      end: new Date(2024, 11, 25, 15, 0),
      resource: {
        type: 'milestone',
        group: 'Campus Navigator Team',
        assignee: 'All Team',
        priority: 'high',
        status: 'scheduled'
      }
    }
  ];

  const groups = [
    { id: 'all', name: 'All Groups' },
    { id: 'studybuddy', name: 'StudyBuddy Team' },
    { id: 'ecotracker', name: 'EcoTracker Team' },
    { id: 'navigator', name: 'Campus Navigator Team' }
  ];

  const filteredEvents = selectedGroup === 'all' 
    ? events 
    : events.filter(event => 
        event.resource.group.toLowerCase().includes(selectedGroup.toLowerCase())
      );

  const eventStyleGetter = (event: any) => {
    let backgroundColor = '#3b82f6';
    
    // Color by group
    if (event.resource.group.includes('StudyBuddy')) {
      backgroundColor = '#3b82f6'; // Blue
    } else if (event.resource.group.includes('EcoTracker')) {
      backgroundColor = '#10b981'; // Green
    } else if (event.resource.group.includes('Navigator')) {
      backgroundColor = '#f59e0b'; // Orange
    }

    // Override with status colors for urgent items
    if (event.resource.status === 'overdue') {
      backgroundColor = '#ef4444'; // Red
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const CustomEvent = ({ event }: any) => (
    <div className="p-1">
      <div className="font-medium text-xs">{event.title}</div>
      <div className="text-xs opacity-75 flex items-center">
        <Users className="h-3 w-3 mr-1" />
        {event.resource.assignee}
      </div>
      <div className="text-xs opacity-75">{event.resource.group}</div>
    </div>
  );

  const CustomToolbar = ({ label, onNavigate, onView }: any) => (
    <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onNavigate('PREV')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">{label}</h2>
        <button
          onClick={() => onNavigate('NEXT')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {groups.map(group => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
        <div className="flex items-center space-x-2">
          {['month', 'week', 'day'].map((viewName) => (
            <button
              key={viewName}
              onClick={() => onView(viewName)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === viewName
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {viewName.charAt(0).toUpperCase() + viewName.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600 mt-1">View all group tasks, deadlines, and meetings</p>
      </div>

      {/* Legend */}
      <div className="mb-6 bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">StudyBuddy Team</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">EcoTracker Team</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Campus Navigator Team</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Overdue Tasks</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6" style={{ height: '700px' }}>
        <BigCalendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={setView}
          date={currentDate}
          onNavigate={setCurrentDate}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CustomEvent,
            toolbar: CustomToolbar
          }}
          popup
          popupOffset={30}
        />
      </div>

      {/* Upcoming Deadlines */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines This Week</h3>
        <div className="space-y-3">
          {filteredEvents
            .filter(event => {
              const eventDate = new Date(event.start);
              const now = new Date();
              const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
              return eventDate >= now && eventDate <= weekFromNow;
            })
            .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
            .map(event => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  {getStatusIcon(event.resource.status)}
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-4">{event.resource.group}</span>
                      <Users className="h-3 w-3 mr-1" />
                      <span className="mr-4">{event.resource.assignee}</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{moment(event.start).format('MMM DD, HH:mm')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    event.resource.priority === 'high' ? 'bg-red-100 text-red-800' :
                    event.resource.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {event.resource.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    event.resource.status === 'overdue' ? 'bg-red-100 text-red-800' :
                    event.resource.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.resource.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}