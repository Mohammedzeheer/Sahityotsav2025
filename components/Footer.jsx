import { MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-1">
              <img
                src="/assets/fontssf.png"
                alt="SSF Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-contain filter brightness-0 invert"
              />
              <div>
                <span className="text-lg md:text-xl font-bold">Manjeshwar</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm md:text-base px-4 md:px-0">
              Celebrating the beauty of literature and nurturing creative expression.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/results" className="hover:text-white transition-colors">Results</a></li>
              <li><a href="/photos" className="hover:text-white transition-colors">Photos</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-3 md:mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center justify-center md:justify-start space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Festival Venue</span>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-3 md:mb-4">Follow Us</h4>
            <div className="flex space-x-4 justify-center md:justify-start">

              <a
                href="https://www.instagram.com/ssf_mjrdvsn?igsh=MWdqbGNrejFkdHU2dA=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/ssfmjsdvsn/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
              >
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400">
          <div className="flex flex-col space-y-2 md:flex-row md:justify-center md:items-center md:gap-4 md:space-y-0">
            <p className="text-sm md:text-base">&copy; 2025 Sahityotsav. All rights reserved.</p>
            <div className="text-xs md:text-sm">
              <div className='flex flex-wrap gap-1 text-blue-400 font-medium justify-center items-center'>
                <span className='text-gray-400'>Design and Developed by</span>
                <a href={'https://mohammedzaheer.netlify.app/'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors underline">Zaheer</a>
                <span>,</span>
                <a href={'https://www.trizo.in/'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors underline">Thasneem</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


// import { MapPin } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <div className="flex items-center space-x-3 mb-2">
//               <img
//                 src="/assets/fontssf.png"
//                 alt="SSF Logo"
//                 className="w-12 h-12 object-contain filter brightness-0 invert"
//               />
//               <div>
//                 <span className="text-xl font-bold">Manjeshwar</span>
//               </div>
//             </div>
//             <p className="text-gray-400">
//               Celebrating the beauty of literature and nurturing creative expression.
//             </p>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4 mt-2">Quick Links</h4>
//             <ul className="space-y-2 text-gray-400">

//               <li><a href="/results" className="hover:text-white transition-colors">Results</a></li>
//               <li><a href="/photos" className="hover:text-white transition-colors">Photos</a></li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4 mt-2">Contact</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li className="flex items-center space-x-2">
//                 <MapPin className="w-4 h-4" />
//                 <span>Festival Venue</span>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-lg font-semibold mb-4 mt-2">Follow Us</h4>
//             <div className="flex space-x-4">
//               <a
//                 href="https://www.instagram.com/ssf_mjrdvsn?igsh=MWdqbGNrejFkdHU2dA=="
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
//               >
//                 <span className="sr-only">Instagram</span>
//                 <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//                 </svg>
//               </a>
//               <a
//                 href="https://www.facebook.com/ssfmjsdvsn/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
//               >
//                 <span className="sr-only">Facebook</span>
//                 <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//           <div className="flex flex-col md:flex-row md:justify-center md:items-center md:gap-4">
//             <p>&copy; 2025 Sahityotsav. All rights reserved.</p>
//             <div className="mt-2 md:mt-0">
//               <div className='flex gap-1 text-blue-400  font-medium justify-center items-center'>
//                 <span className='text-gray-400'>Design and Developed by</span>
//                 <a href={'https://mohammedzaheer.netlify.app/'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors underline">Zaheer</a>
//                 <span>,</span>
//                 <a href={'https://www.trizo.in/'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors underline">Thasneem</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;