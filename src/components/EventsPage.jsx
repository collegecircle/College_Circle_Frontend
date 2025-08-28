
import React from 'react';
import EventCard from './EventCard';

const EventsPage = () => {
  const events = [
    { title: 'Registration Open for Fall Semester', date: '2024-08-15', urgent: true, category: 'Academic' },
    { title: 'Career Fair - September 20th', date: '2024-08-10', urgent: false, category: 'Career' },
    { title: 'Tech Conference 2024', date: '2024-08-25', urgent: false, category: 'Technology' },
    { title: 'Alumni Meetup', date: '2024-09-01', urgent: false, category: 'Networking' },
    { title: 'Hackathon Weekend', date: '2024-09-15', urgent: false, category: 'Competition' },
    { title: 'Scholarship Deadline Reminder', date: '2024-08-30', urgent: true, category: 'Financial' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Events</h1>
        <div className="text-sm text-gray-600">{events.length} upcoming events</div>
      </div>
      <div className="space-y-4">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
