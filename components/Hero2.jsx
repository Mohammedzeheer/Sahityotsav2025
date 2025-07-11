import React, { useState, useEffect } from 'react';
import { ChevronRight, Calendar, Users, Award, BookOpen, Sparkles } from 'lucide-react';

const SahityotsavHero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const rotatingTexts = [
    "Where Words Come Alive",
    "Celebrating Literary Excellence",
    "Unite Through Literature",
    "Stories That Inspire"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Books Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute opacity-10 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <BookOpen size={24 + Math.random() * 20} className="text-white" />
          </div>
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Logo/Brand */}
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-6 shadow-2xl">
              <BookOpen size={32} className="text-white" />
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Sahityotsav
            </h1>
          </div>

          {/* Rotating Tagline */}
          <div className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-200 transition-all duration-500">
                {rotatingTexts[currentText]}
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className={`mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join us for an extraordinary celebration of literature, poetry, and storytelling. 
              Experience the magic of words through competitions, workshops, and performances 
              that bring together writers, readers, and literary enthusiasts.
            </p>
          </div>

          {/* Stats */}
          <div className={`mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-gray-400 text-sm sm:text-base">Participants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">25+</div>
                <div className="text-gray-400 text-sm sm:text-base">Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-pink-400 mb-2">3</div>
                <div className="text-gray-400 text-sm sm:text-base">Days</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`mb-12 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                <span className="flex items-center">
                  Register Now
                  <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>
              
              <button className="group inline-flex items-center justify-center px-8 py-4 border-2 border-purple-400 rounded-full text-purple-400 font-semibold text-lg hover:bg-purple-400 hover:text-white transform hover:scale-105 transition-all duration-300">
                <Calendar size={20} className="mr-2" />
                View Schedule
              </button>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className={`transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Award size={24} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Competitions</h3>
                <p className="text-gray-400 text-sm">Poetry, storytelling, and creative writing contests with exciting prizes</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Users size={24} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Workshops</h3>
                <p className="text-gray-400 text-sm">Learn from renowned authors and enhance your literary skills</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles size={24} className="text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Performances</h3>
                <p className="text-gray-400 text-sm">Live poetry readings, storytelling sessions, and literary performances</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SahityotsavHero;