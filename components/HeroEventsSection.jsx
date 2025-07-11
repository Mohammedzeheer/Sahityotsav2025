import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, Users, AlertCircle, ChevronLeft, ChevronRight, Filter, Search, ArrowRight } from 'lucide-react';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const apiUrl = `/api/events`;
      const params = {
        page: 1,
        limit: 5,
        isActive: true
      };     
      
      const response = await axios.get(apiUrl, { params });
      const data = response.data;
      
      // Debug information
      setDebugInfo({
        totalEvents: data.events?.length || 0,
        apiUrl: `${apiUrl}?${new URLSearchParams(params).toString()}`,
        responseData: data,
        timestamp: new Date().toISOString(),
        status: response.status
      });
      
      setEvents(data.events || []);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch events';
      setError(errorMessage);
      console.error('Error fetching events:', err);
      
      // Set debug info for error case
      setDebugInfo({
        error: errorMessage,
        apiUrl: `/api/events`,
        timestamp: new Date().toISOString(),
        status: err.response?.status || 'Network Error',
        errorDetails: err.response?.data || err.message
      });
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Get days until event
  const getDaysUntil = (eventDate, eventTime) => {
    const now = new Date();
    const eventDateTime = new Date(`${eventDate}T${eventTime}`);
    const diffTime = eventDateTime - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Check if event is happening today
  const isToday = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    return today.toDateString() === event.toDateString();
  };

  // Check if event is happening this week
  const isThisWeek = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return event >= today && event <= weekFromNow;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleViewAll = () => {
    window.location.href = '/events';
  };

  const ShimmerCard = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0 w-80 animate-pulse">
        <div className="relative">
          <div className="w-full h-80 bg-gray-200"></div>
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="bg-gray-200 rounded-full w-12 h-6"></div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-200 h-6 rounded mb-2"></div>
          <div className="bg-gray-200 h-4 rounded mb-4 w-3/4"></div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 w-4 h-4 rounded"></div>
              <div className="bg-gray-200 h-4 rounded w-20"></div>
              <div className="bg-gray-200 w-4 h-4 rounded"></div>
              <div className="bg-gray-200 h-4 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EventCard = ({ event }) => {
    const daysUntil = getDaysUntil(event.eventDate, event.eventTime);
    const isEventToday = isToday(event.eventDate);
    const isEventThisWeek = isThisWeek(event.eventDate);

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0 w-80">
        <div className="relative">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {/* <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Active
            </span> */}
            {isEventToday && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                Today
              </span>
            )}
            {isEventThisWeek && !isEventToday && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                This Week
              </span>
            )}
          </div>
          {daysUntil > 0 && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {event.title}
          </h3>
          
          {/* {event.description && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {event.description}
            </p>
          )} */}
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={16} />
              <span className="text-sm">{formatDate(event.eventDate)}</span>   
              <span>  </span>
               <Clock size={16} /> 
              <span className="text-sm">{formatTime(event.eventTime)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Events</h1>
            {/* <p className="text-gray-600">Discover upcoming events happening now</p> */}
          </div>
          <button
            onClick={handleViewAll}
            className="inline-flex items-center px-2 md:px-4 py-2 bg-purple-600 text-white text-xs md:text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            View All Events
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>

        {/* Loading Shimmer */}
        {loading && (
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4">
              {[...Array(5)].map((_, index) => (
                <ShimmerCard key={index} />
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-500" size={20} />
              <span className="text-red-700 font-medium">Error loading events</span>
            </div>
            <p className="text-red-600 mt-1">{error}</p>
            <button
              onClick={fetchEvents}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Events Single Row */}
        {!loading && !error && (
          <>
            {events.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Calendar size={48} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No active events found</h3>
                  <p>Check back later for new events</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="flex gap-6 pb-4">
                  {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventsPage;