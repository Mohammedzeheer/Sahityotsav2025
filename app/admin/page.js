'use client';
import { 
  Users, 
  FolderOpen, 
  BarChart3, 
  Package, 
  Settings, 
  FileText,
  TrendingUp,
  Shield,
  Calendar,
  Camera,
  CalendarDays,
  UserCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const dashboardCards = [
    {
      id: 1,
      title: 'Category Management',
      description: 'Manage product categories and classifications',
      icon: FolderOpen,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      route: '/admin/category',
      count: '12 Categories'
    },
    {
      id: 2,
      title: 'Team Management',
      description: 'Manage teams and team members',
      icon: Users,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      route: '/admin/team',
      count: '8 Teams'
    },
    {
      id: 3,
      title: 'Photos Management',
      description: 'Upload, organize and manage photo galleries',
      icon: Camera,
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      route: '/admin/gallery',
      count: '324 Photos'
    },
    {
      id: 4,
      title: 'Events Management',
      description: 'Create, schedule and manage events',
      icon: CalendarDays,
      color: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-600',
      route: '/admin/events',
      count: '15 Events'
    },
    {
      id: 5,
      title: 'CMs Management',
      description: 'Manage Chief Ministers and official profiles',
      icon: UserCheck,
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-600',
      route: '/admin/cms',
      count: '28 CMs'
    },
    {
      id: 6,
      title: 'Results & Analytics',
      description: 'View performance metrics and results',
      icon: BarChart3,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      route: '/admin/result',
      count: '234 Records'
    },
    {
      id: 7,
      title: 'Items Management',
      description: 'Manage inventory and product items',
      icon: Package,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      route: '/admin/items',
      count: '156 Items'
    },
    {
      id: 8,
      title: 'Reports',
      description: 'Generate and view detailed reports',
      icon: FileText,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      route: '/admin/reports',
      count: '45 Reports'
    },
    {
      id: 9,
      title: 'System Settings',
      description: 'Configure system preferences and settings',
      icon: Settings,
      color: 'bg-gray-500',
      hoverColor: 'hover:bg-gray-600',
      route: '/admin/settings',
      count: 'All Settings'
    }
  ];

  const handleCardClick = (route) => {
    try {
      router.push(route);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to window.location if router fails
      window.location.href = route;
    }
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'addCategory':
        router.push('/admin/category');
        break;
      case 'createTeam':
        router.push('/admin/team');
        break;
      case 'uploadPhoto':
        router.push('/admin/gallery');
        break;
      case 'createEvent':
        router.push('/admin/events');
        break;
      case 'addCM':
        router.push('/admin/cms');
        break;
      case 'addItem':
        router.push('/admin/items');
        break;
      case 'generateReport':
        router.push('/admin/reports');
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your application from this central control panel</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <TrendingUp className="text-blue-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <Shield className="text-green-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Photos</p>
                <p className="text-2xl font-bold text-gray-900">324</p>
              </div>
              <Camera className="text-pink-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-900">7</p>
              </div>
              <Calendar className="text-purple-500" size={32} />
            </div>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.route)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${card.color} text-white`}>
                      <IconComponent size={24} />
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{card.count}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <button 
                      className={`px-4 py-2 ${card.color} ${card.hoverColor} text-white rounded-md text-sm font-medium transition-colors duration-200`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(card.route);
                      }}
                    >
                      Manage
                    </button>
                    <div className="flex items-center text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => handleQuickAction('addCategory')}
              className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <FolderOpen className="text-blue-500 mb-2" size={20} />
              <span className="text-sm font-medium text-gray-900">Add Category</span>
            </button>
            <button 
              onClick={() => handleQuickAction('createTeam')}
              className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <Users className="text-green-500 mb-2" size={20} />
              <span className="text-sm font-medium text-gray-900">Create Team</span>
            </button>
            <button 
              onClick={() => handleQuickAction('uploadPhoto')}
              className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <Camera className="text-pink-500 mb-2" size={20} />
              <span className="text-sm font-medium text-gray-900">Upload Photo</span>
            </button>
            <button 
              onClick={() => handleQuickAction('createEvent')}
              className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <CalendarDays className="text-indigo-500 mb-2" size={20} />
              <span className="text-sm font-medium text-gray-900">Create Event</span>
            </button>
            <button 
              onClick={() => handleQuickAction('addCM')}
              className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <UserCheck className="text-amber-500 mb-2" size={20} />
              <span className="text-sm font-medium text-gray-900">Add CM</span>
            </button>
            <button 
              onClick={() => handleQuickAction('addItem')}
              className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <Package className="text-orange-500 mb-2" size={20} />
              <span className="text-sm font-medium text-gray-900">Add Item</span>
            </button>
            <button 
              onClick={() => handleQuickAction('generateReport')}
              className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <FileText className="text-red-500 mb-2" size={20} />
              <span className="text-sm font-medium text-gray-900">Generate Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;


// 'use client';
// import { 
//   Users, 
//   FolderOpen, 
//   BarChart3, 
//   Package, 
//   Settings, 
//   FileText,
//   TrendingUp,
//   Shield,
//   Calendar
// } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// const Page = () => {
//   const router = useRouter();

//   const dashboardCards = [
//     {
//       id: 1,
//       title: 'Category Management',
//       description: 'Manage product categories and classifications',
//       icon: FolderOpen,
//       color: 'bg-blue-500',
//       hoverColor: 'hover:bg-blue-600',
//       route: '/admin/category',
//       count: '12 Categories'
//     },
//     {
//       id: 2,
//       title: 'Team Management',
//       description: 'Manage teams and team members',
//       icon: Users,
//       color: 'bg-green-500',
//       hoverColor: 'hover:bg-green-600',
//       route: '/admin/team',
//       count: '8 Teams'
//     },
//     {
//       id: 3,
//       title: 'Results & Analytics',
//       description: 'View performance metrics and results',
//       icon: BarChart3,
//       color: 'bg-purple-500',
//       hoverColor: 'hover:bg-purple-600',
//       route: '/admin/result',
//       count: '234 Records'
//     },
//     {
//       id: 4,
//       title: 'Items Management',
//       description: 'Manage inventory and product items',
//       icon: Package,
//       color: 'bg-orange-500',
//       hoverColor: 'hover:bg-orange-600',
//       route: '/admin/items',
//       count: '156 Items'
//     },
//     {
//       id: 5,
//       title: 'Reports',
//       description: 'Generate and view detailed reports',
//       icon: FileText,
//       color: 'bg-red-500',
//       hoverColor: 'hover:bg-red-600',
//       route: '/admin/reports',
//       count: '45 Reports'
//     },
//     {
//       id: 6,
//       title: 'System Settings',
//       description: 'Configure system preferences and settings',
//       icon: Settings,
//       color: 'bg-gray-500',
//       hoverColor: 'hover:bg-gray-600',
//       route: '/admin/settings',
//       count: 'All Settings'
//     }
//   ];

//   const handleCardClick = (route) => {
//     try {
//       router.push(route);
//     } catch (error) {
//       console.error('Navigation error:', error);
//       // Fallback to window.location if router fails
//       window.location.href = route;
//     }
//   };

//   const handleQuickAction = (action) => {
//     switch(action) {
//       case 'addCategory':
//         router.push('/admin/category');
//         break;
//       case 'createTeam':
//         router.push('/admin/team');
//         break;
//       case 'addItem':
//         router.push('/admin/items');
//         break;
//       case 'generateReport':
//         router.push('/admin/reports');
//         break;
//       default:
//         console.log(`Action: ${action}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
//           <p className="text-gray-600">Manage your application from this central control panel</p>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Users</p>
//                 <p className="text-2xl font-bold text-gray-900">1,234</p>
//               </div>
//               <TrendingUp className="text-blue-500" size={32} />
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Active Sessions</p>
//                 <p className="text-2xl font-bold text-gray-900">89</p>
//               </div>
//               <Shield className="text-green-500" size={32} />
//             </div>
//           </div>
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">This Month</p>
//                 <p className="text-2xl font-bold text-gray-900">2,456</p>
//               </div>
//               <Calendar className="text-purple-500" size={32} />
//             </div>
//           </div>
//         </div>

//         {/* Management Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {dashboardCards.map((card) => {
//             const IconComponent = card.icon;
//             return (
//               <div
//                 key={card.id}
//                 onClick={() => handleCardClick(card.route)}
//                 className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300"
//               >
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className={`p-3 rounded-lg ${card.color} text-white`}>
//                       <IconComponent size={24} />
//                     </div>
//                     <span className="text-sm text-gray-500 font-medium">{card.count}</span>
//                   </div>
                  
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
//                   <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  
//                   <div className="flex items-center justify-between">
//                     <button 
//                       className={`px-4 py-2 ${card.color} ${card.hoverColor} text-white rounded-md text-sm font-medium transition-colors duration-200`}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleCardClick(card.route);
//                       }}
//                     >
//                       Manage
//                     </button>
//                     <div className="flex items-center text-gray-400">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Quick Actions */}
//         <div className="mt-8 bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <button 
//               onClick={() => handleQuickAction('addCategory')}
//               className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
//             >
//               <FolderOpen className="text-blue-500 mb-2" size={20} />
//               <span className="text-sm font-medium text-gray-900">Add Category</span>
//             </button>
//             <button 
//               onClick={() => handleQuickAction('createTeam')}
//               className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
//             >
//               <Users className="text-green-500 mb-2" size={20} />
//               <span className="text-sm font-medium text-gray-900">Create Team</span>
//             </button>
//             <button 
//               onClick={() => handleQuickAction('addItem')}
//               className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
//             >
//               <Package className="text-orange-500 mb-2" size={20} />
//               <span className="text-sm font-medium text-gray-900">Add Item</span>
//             </button>
//             <button 
//               onClick={() => handleQuickAction('generateReport')}
//               className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
//             >
//               <FileText className="text-red-500 mb-2" size={20} />
//               <span className="text-sm font-medium text-gray-900">Generate Report</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
