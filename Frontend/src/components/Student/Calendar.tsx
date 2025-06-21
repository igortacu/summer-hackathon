import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, Clock } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');

  // Mock events data with tasks and deadlines
  const events = [
    {
      id: 1,
      title: 'Database Schema Design',
      start: new Date(2024, 11, 15, 9, 0),
      end: new Date(2024, 11, 15, 17, 0),
      resource: {
        type: 'task',
        assignee: 'Backend Developer',
        priority: 'high',
        status: 'overdue'
      }
    },
    {
      id: 2,
      title: 'Create Wireframes',
      start: new Date(2024, 11, 18, 10, 0),
      end: new Date(2024, 11, 18, 16, 0),
      resource: {
        type: 'task',
        assignee: 'UI/UX Designer',
        priority: 'medium',
        status: 'in-progress'
      }
    },
    {
      id: 3,
      title: 'Team Standup',
      start: new Date(2024, 11, 16, 9, 0),
      end: new Date(2024, 11, 16, 9, 30),
      resource: {
        type: 'meeting',
        assignee: 'All Team',
        priority: 'medium',
        status: 'scheduled'
      }
    },
    {
      id: 4,
      title: 'Code Review Session',
      start: new Date(2024, 11, 19, 14, 0),
      end: new Date(2024, 11, 19, 16, 0),
      resource: {
        type: 'review',
        assignee: 'Frontend Developer',
        priority: 'high',
        status: 'scheduled'
      }
    },
    {
      id: 5,
      title: 'User Authentication Implementation',
      start: new Date(2024, 11, 20, 9, 0),
      end: new Date(2024, 11, 22, 17, 0),
      resource: {
        type: 'task',
        assignee: 'You',
        priority: 'high',
        status: 'todo'
      }
    },
    {
      id: 6,
      title: 'Project Presentation',
      start: new Date(2024, 11, 25, 10, 0),
      end: new Date(2024, 11, 25, 12, 0),
      resource: {
        type: 'milestone',
        assignee: 'All Team',
        priority: 'high',
        status: 'scheduled'
      }
    }
  ];

  const eventStyleGetter = (event: any) => {
    let backgroundColor = '#3b82f6';
    
    switch (event.resource.status) {
      case 'overdue':
        backgroundColor = '#ef4444';
        break;
      case 'in-progress':
        backgroundColor = '#f59e0b';
        break;
      case 'completed':
        backgroundColor = '#22c55e';
        break;
      case 'scheduled':
        backgroundColor = '#8b5cf6';
        break;
      default:
        backgroundColor = '#6b7280';
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
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600 mt-1">View tasks, deadlines, and team activities</p>
      </div>

      {/* Legend */}
      <div className="mb-6 bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Overdue</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Meetings</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">To Do</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6" style={{ height: '700px' }}>
        <BigCalendar
          localizer={localizer}
          events={events}
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

      {/* Upcoming Tasks */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming This Week</h3>
        <div className="space-y-3">
          {events
            .filter(event => {
              const eventDate = new Date(event.start);
              const now = new Date();
              const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
              return eventDate >= now && eventDate <= weekFromNow;
            })
            .map(event => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    event.resource.status === 'overdue' ? 'bg-red-500' :
                    event.resource.status === 'in-progress' ? 'bg-yellow-500' :
                    event.resource.status === 'completed' ? 'bg-green-500' :
                    event.resource.status === 'scheduled' ? 'bg-purple-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-3 w-3 mr-1" />
                      <span className="mr-3">{event.resource.assignee}</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{moment(event.start).format('MMM DD, HH:mm')}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  event.resource.priority === 'high' ? 'bg-red-100 text-red-800' :
                  event.resource.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {event.resource.priority}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}