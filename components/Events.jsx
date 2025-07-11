// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, MapPin, Users, Loader2, AlertCircle, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';

// const EventsPage = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 6,
//     total: 0,
//     pages: 0
//   });
//   const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'active'
//   const [searchTerm, setSearchTerm] = useState('');

//   // Fetch events from backend
//   const fetchEvents = async (page = 1, limit = 6) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       let apiUrl = `/api/events?page=${page}&limit=${limit}`;
      
//       // Add filter parameters
//       if (filter === 'active') {
//         apiUrl += '&isActive=true';
//       }
      
//       const response = await fetch(apiUrl);
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to fetch events');
//       }
      
//       let filteredEvents = data.events || [];
      
//       // Filter upcoming events on client side
//       if (filter === 'upcoming') {
//         const now = new Date();
//         filteredEvents = filteredEvents.filter(event => {
//           const eventDateTime = new Date(`${event.eventDate}T${event.eventTime}`);
//           return eventDateTime >= now && event.isActive;
//         });
//       }
      
//       // Apply search filter
//       if (searchTerm) {
//         filteredEvents = filteredEvents.filter(event =>
//           event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
//         );
//       }
      
//       setEvents(filteredEvents);
//       setPagination(data.pagination || {});
      
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching events:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       weekday: 'short',
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Format time for display
//   const formatTime = (timeString) => {
//     const [hours, minutes] = timeString.split(':');
//     const hour = parseInt(hours);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const displayHour = hour % 12 || 12;
//     return `${displayHour}:${minutes} ${ampm}`;
//   };

//   // Get days until event
//   const getDaysUntil = (eventDate, eventTime) => {
//     const now = new Date();
//     const eventDateTime = new Date(`${eventDate}T${eventTime}`);
//     const diffTime = eventDateTime - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   // Check if event is happening today
//   const isToday = (eventDate) => {
//     const today = new Date();
//     const event = new Date(eventDate);
//     return today.toDateString() === event.toDateString();
//   };

//   // Check if event is happening this week
//   const isThisWeek = (eventDate) => {
//     const today = new Date();
//     const event = new Date(eventDate);
//     const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
//     return event >= today && event <= weekFromNow;
//   };

//   useEffect(() => {
//     fetchEvents(currentPage);
//   }, [currentPage, filter, searchTerm]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const EventCard = ({ event }) => {
//     const daysUntil = getDaysUntil(event.eventDate, event.eventTime);
//     const isEventToday = isToday(event.eventDate);
//     const isEventThisWeek = isThisWeek(event.eventDate);

//     return (
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//         <div className="relative">
//           <img 
//             src={event.imageUrl} 
//             alt={event.title}
//             className="w-full h-96 object-cover" 
//           />
//           <div className="absolute top-4 right-4 flex gap-2">
//             {isEventToday && (
//               <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
//                 Today
//               </span>
//             )}
//             {isEventThisWeek && !isEventToday && (
//               <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
//                 This Week
//               </span>
//             )}
//           </div>
//           {daysUntil > 0 && (
//             <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
//               {daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
//             </div>
//           )}
//         </div>
        
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
//             {event.title}
//           </h3>
          
//           {event.description && (
//             <p className="text-gray-600 mb-4 line-clamp-3">
//               {event.description}
//             </p>
//           )}
          
//           <div className="space-y-2 mb-4">
//             <div className="flex items-center gap-2 text-gray-500">
//               <Calendar size={16} />
//               <span className="text-sm">{formatDate(event.eventDate)}</span>   
//               <span>  </span>
//                <Clock size={16} /> 
//               <span className="text-sm">{formatTime(event.eventTime)}</span>
//             </div>
//           </div>
          
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Filters and Search */}
//         <div className="flex flex-col md:flex-row gap-4 mb-8">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <input
//                 type="text"
//                 placeholder="Search events..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div> 

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center py-12">
//             <Loader2 className="animate-spin text-blue-600" size={40} />
//             <span className="ml-2 text-gray-600">Loading events...</span>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center gap-2">
//               <AlertCircle className="text-red-500" size={20} />
//               <span className="text-red-700 font-medium">Error loading events</span>
//             </div>
//             <p className="text-red-600 mt-1">{error}</p>
//             <button
//               onClick={() => fetchEvents(currentPage)}
//               className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Events Grid */}
//         {!loading && !error && (
//           <>
//             {events.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-gray-500 mb-4">
//                   <Calendar size={48} className="mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold mb-2">No events found</h3>
//                   <p>Try adjusting your search or filter criteria</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                 {events.map((event) => (
//                   <EventCard key={event._id} event={event} />
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             {pagination.pages > 1 && (
//               <div className="flex justify-center">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                     disabled={currentPage === 1}
//                     className={`p-2 rounded-lg ${
//                       currentPage === 1
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                   </button>
                  
//                   {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
//                     <button
//                       key={page}
//                       onClick={() => handlePageChange(page)}
//                       className={`px-4 py-2 rounded-lg font-medium ${
//                         currentPage === page
//                           ? 'bg-blue-600 text-white'
//                           : 'text-gray-700 hover:bg-gray-100'
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
                  
//                   <button
//                     onClick={() => handlePageChange(Math.min(pagination.pages, currentPage + 1))}
//                     disabled={currentPage === pagination.pages}
//                     className={`p-2 rounded-lg ${
//                       currentPage === pagination.pages
//                         ? 'text-gray-400 cursor-not-allowed'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventsPage;


import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, AlertCircle, ChevronLeft, ChevronRight, Filter, Search, X, CheckCircle, XCircle, Info } from 'lucide-react';
import axios from 'axios';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    pages: 0
  });
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'active'
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbars, setSnackbars] = useState([]);

  // Snackbar/Toast notification system
  const showSnackbar = (message, type = 'info', duration = 4000) => {
    const id = Date.now();
    const newSnackbar = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration
    };
    
    setSnackbars(prev => [...prev, newSnackbar]);
    
    setTimeout(() => {
      setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
    }, duration);
  };

  const removeSnackbar = (id) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
  };

  // Snackbar component
  const Snackbar = ({ snackbar }) => {
    const getIcon = () => {
      switch (snackbar.type) {
        case 'success':
          return <CheckCircle className="text-green-500" size={20} />;
        case 'error':
          return <XCircle className="text-red-500" size={20} />;
        case 'warning':
          return <AlertCircle className="text-yellow-500" size={20} />;
        default:
          return <Info className="text-blue-500" size={20} />;
      }
    };

    const getStyles = () => {
      switch (snackbar.type) {
        case 'success':
          return 'bg-green-50 border-green-200 text-green-800';
        case 'error':
          return 'bg-red-50 border-red-200 text-red-800';
        case 'warning':
          return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        default:
          return 'bg-blue-50 border-blue-200 text-blue-800';
      }
    };

    return (
      <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${getStyles()} animate-slide-in`}>
        {getIcon()}
        <span className="flex-1 font-medium">{snackbar.message}</span>
        <button
          onClick={() => removeSnackbar(snackbar.id)}
          className="text-current hover:opacity-70 transition-opacity"
        >
          <X size={18} />
        </button>
      </div>
    );
  };

  // Shimmer component
  const Shimmer = ({ className = "" }) => (
    <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer ${className}`}></div>
  );

  // Shimmer card component
  const ShimmerCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <Shimmer className="w-full h-96" />
      <div className="p-6">
        <Shimmer className="h-6 w-3/4 mb-2 rounded" />
        <Shimmer className="h-4 w-full mb-2 rounded" />
        <Shimmer className="h-4 w-2/3 mb-4 rounded" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shimmer className="h-4 w-4 rounded" />
            <Shimmer className="h-4 w-24 rounded" />
            <Shimmer className="h-4 w-4 rounded" />
            <Shimmer className="h-4 w-16 rounded" />
          </div>
        </div>
      </div>
    </div>
  );

  // Fetch events using axios
  const fetchEvents = async (page = 1, limit = 6) => {
    try {
      setLoading(true);
      setError(null);
      
      let apiUrl = `/api/events`;
      const params = {
        page,
        limit
      };
      
      // Add filter parameters
      if (filter === 'active') {
        params.isActive = true;
      }
      
      const response = await axios.get(apiUrl, { params });
      const data = response.data;
      
      let filteredEvents = data.events || [];
      
      // Filter upcoming events on client side
      if (filter === 'upcoming') {
        const now = new Date();
        filteredEvents = filteredEvents.filter(event => {
          const eventDateTime = new Date(`${event.eventDate}T${event.eventTime}`);
          return eventDateTime >= now && event.isActive;
        });
      }
      
      // Apply search filter
      if (searchTerm) {
        filteredEvents = filteredEvents.filter(event =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      setEvents(filteredEvents);
      setPagination(data.pagination || {});
      
      // Show success message
      if (filteredEvents.length > 0) {
        showSnackbar(`Loaded ${filteredEvents.length} events successfully`, 'success');
      } else {
        showSnackbar('No events found matching your criteria', 'info');
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch events';
      setError(errorMessage);
      showSnackbar(errorMessage, 'error');
      console.error('Error fetching events:', err);
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
    fetchEvents(currentPage);
  }, [currentPage, filter, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    showSnackbar(`Loading page ${page}...`, 'info', 2000);
  };

  const handleRetry = () => {
    showSnackbar('Retrying to load events...', 'info', 2000);
    fetchEvents(currentPage);
  };

  const EventCard = ({ event }) => {
    const daysUntil = getDaysUntil(event.eventDate, event.eventTime);
    const isEventToday = isToday(event.eventDate);
    const isEventThisWeek = isThisWeek(event.eventDate);

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-96 object-cover" 
          />
          <div className="absolute top-4 right-4 flex gap-2">
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
          
          {event.description && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {event.description}
            </p>
          )}
          
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
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>

      {/* Snackbar Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
        {snackbars.map(snackbar => (
          <Snackbar key={snackbar.id} snackbar={snackbar} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div> 

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-500" size={20} />
              <span className="text-red-700 font-medium">Error loading events</span>
            </div>
            <p className="text-red-600 mt-1">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Events Grid */}
        {loading ? (
          // Shimmer Loading State
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 6 }, (_, i) => (
              <ShimmerCard key={i} />
            ))}
          </div>
        ) : (
          <>
            {events.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Calendar size={48} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(pagination.pages, currentPage + 1))}
                    disabled={currentPage === pagination.pages}
                    className={`p-2 rounded-lg ${
                      currentPage === pagination.pages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
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