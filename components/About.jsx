import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-4 md:py-8">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src="/assets/lansclandingcr.png"
            alt="Sahityotsav 2025 - SSF Manjeshwaram Division Event Banner"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* About Content Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
             Sahityotsav
            </h1>
            <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-lg">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
                Incepted 31 years ago in 1993, Sahityotsav has its commencement from the grassroot level - that is a family Sahityotsav. Crossing the levels of units, sectors, divisions, districts and 26 states in the country, it finds its actualization in the national level each year.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
                As a prime aim, Sahityotsav is focusing on the embellishment of the creativity of thousands and more students across the country, and now it became one of the towering figures in the realm of cultural festivals of India.
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                Sahityotsav has its assets of thousands of young vibrant studentdom who have came forward to meet the need of the time in its various aspects. They are ready to question all the anti social hullabaloos using their talents like writing, drawing, criticizing... etc.
              </p>
            </div>
          </div>

          {/* Additional Statistics or Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">31</div>
              <div className="text-gray-600 font-medium">Years of Excellence</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">26</div>
              <div className="text-gray-600 font-medium">States Covered</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Students Participating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;