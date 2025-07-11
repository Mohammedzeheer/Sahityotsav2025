"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Camera, BookOpen, Star, Users,} from 'lucide-react';
import HeroEventsSection from './HeroEventsSection';

const Home = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    {
      title: "SAHITYOTSAV 2025",
      subtitle: "Where Literature Comes Alive",
      description: "Join us for the grandest celebration of literature, poetry, and creative expression",
      bg: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    },
    {
      title: "Celebrating Literary Excellence",
      subtitle: "Stories That Inspire Generations",
      description: "Experience the magic of words through competitions, workshops, and cultural programs",
      bg: "bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900"
    },
    {
      title: "Unite Through Literature",
      subtitle: "Express • Compete • Celebrate",
      description: "Showcase your literary talents and connect with fellow writers and literature enthusiasts",
      bg: "bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900"
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Literary Competitions",
      description: "Poetry, essay writing, storytelling, and debate competitions for all age groups"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Cultural Programs",
      description: "Experience rich cultural performances, book readings, and author interactions"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Recognition & Awards",
      description: "Outstanding participants receive recognition and prizes for their literary contributions"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Workshops",
      description: "Learn from renowned authors and poets through interactive workshops and sessions"
    }
  ];

  const stats = [
    { number: "600+", label: "Participants" },
    { number: "150+", label: "Events" },
    { number: "200+", label: "Prizes" },
    { number: "3+", label: "Days" }
  ];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };



  return (
    <div className="min-h-screen">
      <section className="">
        
        {/* <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        <div className="relative overflow-hidden  shadow-2xl">
          <img
            src="/assets/lansclandingcr.png"
            // src="/assets/landscape.gif"
            alt="Sahityotsav 2025 - SSF Manjeshwaram Division Event Banner"
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-8 left-4 right-4 md:bottom-16 md:left-8 md:right-8">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
              <button
                onClick={() => handleNavigation('/results')}
                className="hidden md:block bg-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-purple-700 transition-all transform hover:scale-105 shadow-lg border-2 border-purple-600 hover:border-purple-700"
              >
                View Results
              </button>
              <button
                onClick={() => handleNavigation('/photos')}
                className="hidden md:block bg-transparent border-2 border-purple-600 text-purple-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 shadow-lg"
              >
                Browse Photos
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>

      {/* Hero Banner */}
      {/* <section className="relative h-96 md:h-screen overflow-hidden">
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } ${slide.bg}`}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center text-white max-w-4xl mx-auto px-4">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 animate-pulse">
                  Sahityotsav 2025
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 font-light">
                  Where Literature Comes Alive
                </p>
                <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
                  Join us for the grandest celebration of literature, poetry, and creative expression
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleNavigation('/results')}
                    className="bg-white text-purple-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                  >
                    View Results
                  </button>
                  <button
                    onClick={() => handleNavigation('/photos')}
                    className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-white hover:text-purple-900 transition-all transform hover:scale-105"
                  >
                    Browse Photos
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}      

        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section> */}

       {/* Quick Actions */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 md:p-8 rounded-2xl text-white">
              <Trophy className="w-10 h-10 md:w-12 md:h-12 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Check Results</h3>
              <p className="text-purple-100 mb-4 md:mb-6 text-sm md:text-base">
                View the latest competition results and winner announcements
              </p>
              <button
                onClick={() => handleNavigation('/results')}
                className="bg-white text-purple-600 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-sm md:text-base hover:bg-gray-100 transition-colors"
              >
                View Results
              </button>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 md:p-8 rounded-2xl text-white">
              <Camera className="w-10 h-10 md:w-12 md:h-12 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Photo Gallery</h3>
              <p className="text-emerald-100 mb-4 md:mb-6 text-sm md:text-base">
                Explore memorable moments captured during the festival
              </p>
              <button
                onClick={() => handleNavigation('/photos')}
                className="bg-white text-emerald-600 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-sm md:text-base hover:bg-gray-100 transition-colors"
              >
                Browse Photos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-purple-600 mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HeroEventsSection />

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Why Join Sahityotsav?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the magic of literature through our comprehensive festival experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
              >
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;



// "use client";
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Trophy, Camera, BookOpen, Star, Users } from 'lucide-react';

// const Home = () => {
//   const router = useRouter();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const bannerSlides = [
//     {
//       title: "SAHITYOTSAV 2025",
//       subtitle: "Where Literature Comes Alive",
//       description: "Join us for the grandest celebration of literature, poetry, and creative expression",
//       bg: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
//     },
//     {
//       title: "Celebrating Literary Excellence",
//       subtitle: "Stories That Inspire Generations",
//       description: "Experience the magic of words through competitions, workshops, and cultural programs",
//       bg: "bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900"
//     },
//     {
//       title: "Unite Through Literature",
//       subtitle: "Express • Compete • Celebrate",
//       description: "Showcase your literary talents and connect with fellow writers and literature enthusiasts",
//       bg: "bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900"
//     }
//   ];

//   const features = [
//     {
//       icon: <BookOpen className="w-8 h-8" />,
//       title: "Literary Competitions",
//       description: "Poetry, essay writing, storytelling, and debate competitions for all age groups"
//     },
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "Cultural Programs",
//       description: "Experience rich cultural performances, book readings, and author interactions"
//     },
//     {
//       icon: <Trophy className="w-8 h-8" />,
//       title: "Recognition & Awards",
//       description: "Outstanding participants receive recognition and prizes for their literary contributions"
//     },
//     {
//       icon: <Star className="w-8 h-8" />,
//       title: "Workshops",
//       description: "Learn from renowned authors and poets through interactive workshops and sessions"
//     }
//   ];

//   const stats = [
//     { number: "500+", label: "Participants" },
//     { number: "150+", label: "Events" },
//     { number: "200+", label: "Prizes" },
//     { number: "3+", label: "Days" }
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleNavigation = (path) => {
//     router.push(path);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* Hero Banner */}
//       <section className="relative h-screen overflow-hidden">
//         {bannerSlides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               index === currentSlide ? 'opacity-100' : 'opacity-0'
//             } ${slide.bg}`}
//           >
//             <div className="absolute inset-0 bg-black/20"></div>
//             <div className="relative h-full flex items-center justify-center">
//               <div className="text-center text-white max-w-4xl mx-auto px-4">
//                 <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
//                   Sahityotsav 2025
//                 </h1>
//                 <p className="text-xl md:text-2xl mb-4 font-light">
//                   Where Literature Comes Alive
//                 </p>
//                 <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
//                   Join us for the grandest celebration of literature, poetry, and creative expression
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <button
//                     onClick={() => handleNavigation('/results')}
//                     className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
//                   >
//                     View Results
//                   </button>
//                   <button
//                     onClick={() => handleNavigation('/photos')}
//                     className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-900 transition-all transform hover:scale-105"
//                   >
//                     Browse Photos
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}      

//         {/* Slide indicators */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {bannerSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all ${
//                 index === currentSlide ? 'bg-white' : 'bg-white/50'
//               }`}
//             />
//           ))}
//         </div>
//       </section>

//        {/* Quick Actions */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-2xl text-white">
//               <Trophy className="w-12 h-12 mb-4" />
//               <h3 className="text-2xl font-bold mb-4">Check Results</h3>
//               <p className="text-purple-100 mb-6">
//                 View the latest competition results and winner announcements
//               </p>
//               <button
//                 onClick={() => handleNavigation('/results')}
//                 className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
//               >
//                 View Results
//               </button>
//             </div>

//             <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 rounded-2xl text-white">
//               <Camera className="w-12 h-12 mb-4" />
//               <h3 className="text-2xl font-bold mb-4">Photo Gallery</h3>
//               <p className="text-emerald-100 mb-6">
//                 Explore memorable moments captured during the festival
//               </p>
//               <button
//                 onClick={() => handleNavigation('/photos')}
//                 className="bg-white text-emerald-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
//               >
//                 Browse Photos
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-gray-600 font-medium">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Why Join Sahityotsav?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Discover the magic of literature through our comprehensive festival experience
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
//               >
//                 <div className="text-purple-600 mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

     
//     </div>
//   );
// };

// export default Home;