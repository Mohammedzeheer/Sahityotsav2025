import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, Eye, X, AlertCircle } from 'lucide-react';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    pages: 0
  });

  // Shimmer Card Component
  const ShimmerCard = () => {
    return (
      <div className="relative group">
        <div className="relative overflow-hidden rounded-lg shadow-md bg-white animate-pulse">
          <div className="aspect-w-4 aspect-h-3 w-full h-64">
            <div className="w-full h-full bg-gray-200"></div>
          </div>
          <div className="absolute top-2 right-2 bg-gray-200 rounded-full w-16 h-6"></div>
        </div>
      </div>
    );
  };

  // Fetch galleries from backend using axios
  const fetchGalleries = async (page = 1, limit = 8) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/gallery', {
        params: { page, limit }
      });
      
      const data = response.data;
      
      setGalleries(data.galleries || []);
      setPagination(data.pagination || {});
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch galleries';
      setError(errorMessage);
      console.error('Error fetching galleries:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load galleries on component mount and page change
  useEffect(() => {
    fetchGalleries(currentPage, 8);
  }, [currentPage]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && selectedImage) {
        closePreview();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedImage]);

  const handleDownload = async (image) => {
    try {
      const response = await axios.get(image.imageUrl, { responseType: 'blob' });
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.title.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image');
    }
  };

  const handlePreview = (image) => {
    setSelectedImage(image);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => fetchGalleries(currentPage, 8)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && galleries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Eye className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600">No images found in gallery</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
          <p className="text-gray-600 mt-2">
            Showing {galleries.length} of {pagination.total} images
          </p>
        </div>
      </div> */}

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Show shimmer cards while loading
            Array.from({ length: 8 }).map((_, index) => (
              <ShimmerCard key={index} />
            ))
          ) : (
            // Show actual gallery images
            galleries.map((image) => (
              <div key={image._id} className="relative group">
                <div className="relative overflow-hidden rounded-lg shadow-md bg-white">
                  <div className="aspect-w-4 aspect-h-3 w-full h-64">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                      }}
                    />
                  </div>
                  
                  {/* Active status indicator */}
                  {!image.isActive && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      Inactive
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handlePreview(image)}
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        title="Preview"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleDownload(image)}
                        className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-200"
                        title="Download"
                      >
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* <div className="mt-2 text-center">
                  <h3 className="text-sm font-medium text-gray-900">{image.title}</h3>
                  {image.description && (
                    <p className="text-xs text-gray-500 mt-1 truncate">{image.description}</p>
                  )}
                  {image.tags && image.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2 justify-center">
                      {image.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {image.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{image.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div> */}
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === page
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              {currentPage < pagination.pages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Next Page
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closePreview}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* Close button - More prominent */}
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white hover:bg-opacity-70 z-10 p-2 rounded-full transition-all duration-200"
              title="Close (Press Esc or click outside)"
            >
              <X size={24} />
            </button>
            
            {/* Close instructions */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10">
              Press Esc or click outside to close
            </div>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              {/* <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              {selectedImage.description && (
                <p className="text-sm text-gray-200 mt-1">{selectedImage.description}</p>
              )}
              {selectedImage.tags && selectedImage.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedImage.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )} */}
              <button
                onClick={() => handleDownload(selectedImage)}
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;


// import React, { useState, useEffect } from 'react';
// import { Download, Eye, X, Loader2, AlertCircle } from 'lucide-react';

// const GalleryPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [galleries, setGalleries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 8,
//     total: 0,
//     pages: 0
//   });

//   // Fetch galleries from backend
//   const fetchGalleries = async (page = 1, limit = 8) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch(`/api/gallery?page=${page}&limit=${limit}`);
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to fetch galleries');
//       }
      
//       setGalleries(data.galleries || []);
//       setPagination(data.pagination || {});
      
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching galleries:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load galleries on component mount and page change
//   useEffect(() => {
//     fetchGalleries(currentPage, 8);
//   }, [currentPage]);

//   // Handle ESC key to close modal
//   useEffect(() => {
//     const handleEscKey = (event) => {
//       if (event.key === 'Escape' && selectedImage) {
//         closePreview();
//       }
//     };

//     document.addEventListener('keydown', handleEscKey);
//     return () => {
//       document.removeEventListener('keydown', handleEscKey);
//     };
//   }, [selectedImage]);

//   const handleDownload = async (image) => {
//     try {
//       const response = await fetch(image.imageUrl);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
      
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `${image.title.replace(/\s+/g, '_')}.jpg`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Error downloading image:', error);
//       alert('Failed to download image');
//     }
//   };

//   const handlePreview = (image) => {
//     setSelectedImage(image);
//   };

//   const closePreview = () => {
//     setSelectedImage(null);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="animate-spin mx-auto mb-4" size={48} />
//           <p className="text-gray-600">Loading gallery...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
//           <p className="text-red-600 mb-4">Error: {error}</p>
//           <button
//             onClick={() => fetchGalleries(currentPage, 8)}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (galleries.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <Eye className="mx-auto mb-4 text-gray-400" size={48} />
//           <p className="text-gray-600">No images found in gallery</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       {/* <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
//           <p className="text-gray-600 mt-2">
//             Showing {galleries.length} of {pagination.total} images
//           </p>
//         </div>
//       </div> */}

//       {/* Gallery Grid */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {galleries.map((image) => (
//             <div key={image._id} className="relative group">
//               <div className="relative overflow-hidden rounded-lg shadow-md bg-white">
//                 <div className="aspect-w-4 aspect-h-3 w-full h-64">
//                   <img
//                     src={image.imageUrl}
//                     alt={image.title}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
//                     }}
//                   />
//                 </div>
                
//                 {/* Active status indicator */}
//                 {!image.isActive && (
//                   <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
//                     Inactive
//                   </div>
//                 )}
                
//                 {/* Hover overlay */}
//                 <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                   <div className="flex space-x-3">
//                     <button
//                       onClick={() => handlePreview(image)}
//                       className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
//                       title="Preview"
//                     >
//                       <Eye size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleDownload(image)}
//                       className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-200"
//                       title="Download"
//                     >
//                       <Download size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               {/* <div className="mt-2 text-center">
//                 <h3 className="text-sm font-medium text-gray-900">{image.title}</h3>
//                 {image.description && (
//                   <p className="text-xs text-gray-500 mt-1 truncate">{image.description}</p>
//                 )}
//                 {image.tags && image.tags.length > 0 && (
//                   <div className="flex flex-wrap gap-1 mt-2 justify-center">
//                     {image.tags.slice(0, 3).map((tag, index) => (
//                       <span
//                         key={index}
//                         className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                     {image.tags.length > 3 && (
//                       <span className="text-xs text-gray-500">
//                         +{image.tags.length - 3} more
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </div> */}
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {pagination.pages > 1 && (
//           <div className="flex justify-center mt-8">
//             <div className="flex space-x-2">
//               {currentPage > 1 && (
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Previous
//                 </button>
//               )}
              
//               {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   className={`px-4 py-2 border rounded-md ${
//                     currentPage === page
//                       ? 'bg-blue-500 text-white border-blue-500'
//                       : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
              
//               {currentPage < pagination.pages && (
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Next Page
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Image Preview Modal */}
//       {selectedImage && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
//           onClick={closePreview}
//         >
//           <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
//             {/* Close button - More prominent */}
//             <button
//               onClick={closePreview}
//               className="absolute top-4 right-4 bg-black bg-opacity-50 text-white hover:bg-opacity-70 z-10 p-2 rounded-full transition-all duration-200"
//               title="Close (Press Esc or click outside)"
//             >
//               <X size={24} />
//             </button>
            
//             {/* Close instructions */}
//             <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10">
//               Press Esc or click outside to close
//             </div>
//             <img
//               src={selectedImage.imageUrl}
//               alt={selectedImage.title}
//               className="max-w-full max-h-full object-contain"
//             />
//             <div className="absolute bottom-4 left-4 right-4 text-white">
//               {/* <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
//               {selectedImage.description && (
//                 <p className="text-sm text-gray-200 mt-1">{selectedImage.description}</p>
//               )}
//               {selectedImage.tags && selectedImage.tags.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {selectedImage.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               )} */}
//               <button
//                 onClick={() => handleDownload(selectedImage)}
//                 className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
//               >
//                 <Download size={16} />
//                 <span>Download</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GalleryPage;


// import React, { useState } from 'react';
// import { Download, Eye, X } from 'lucide-react';

// const GalleryPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const images = [
//     {
//       id: 1,
//       src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
//       alt: 'Conference Event 1',
//       title: 'Annual Conference 2024'
//     },
//     {
//       id: 2,
//       src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
//       alt: 'Conference Event 2',
//       title: 'Leadership Summit'
//     },
//     {
//       id: 3,
//       src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
//       alt: 'Conference Event 3',
//       title: 'Awards Ceremony'
//     },
//     {
//       id: 4,
//       src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
//       alt: 'Conference Event 4',
//       title: 'Panel Discussion'
//     },
//     {
//       id: 5,
//       src: 'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=600&fit=crop',
//       alt: 'Conference Event 5',
//       title: 'Networking Session'
//     },
//     {
//       id: 6,
//       src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop',
//       alt: 'Conference Event 6',
//       title: 'Keynote Speaker'
//     },
//     {
//       id: 7,
//       src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
//       alt: 'Conference Event 7',
//       title: 'Workshop Session'
//     },
//     {
//       id: 8,
//       src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop',
//       alt: 'Conference Event 8',
//       title: 'Closing Ceremony'
//     }
//   ];

//   const imagesPerPage = 8;
//   const totalPages = Math.ceil(images.length / imagesPerPage);
//   const startIndex = (currentPage - 1) * imagesPerPage;
//   const currentImages = images.slice(startIndex, startIndex + imagesPerPage);

//   const handleDownload = (image) => {
//     const link = document.createElement('a');
//     link.href = image.src;
//     link.download = `${image.title.replace(/\s+/g, '_')}.jpg`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handlePreview = (image) => {
//     setSelectedImage(image);
//   };

//   const closePreview = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Gallery Grid */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {currentImages.map((image) => (
//             <div key={image.id} className="relative group">
//               <div className="relative overflow-hidden rounded-lg shadow-md bg-white">
//                 <div className="aspect-w-4 aspect-h-3 w-full h-64">
//                   <img
//                     src={image.src}
//                     alt={image.alt}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                 </div>
                
//                 {/* Hover overlay */}
//                 <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                   <div className="flex space-x-3">
//                     <button
//                       onClick={() => handlePreview(image)}
//                       className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
//                       title="Preview"
//                     >
//                       <Eye size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleDownload(image)}
//                       className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-200"
//                       title="Download"
//                     >
//                       <Download size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-2 text-center">
//                 <h3 className="text-sm font-medium text-gray-900">{image.title}</h3>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-8">
//             <div className="flex space-x-2">
//               {currentPage > 1 && (
//                 <button
//                   onClick={() => setCurrentPage(currentPage - 1)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Previous
//                 </button>
//               )}
              
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => setCurrentPage(page)}
//                   className={`px-4 py-2 border rounded-md ${
//                     currentPage === page
//                       ? 'bg-blue-500 text-white border-blue-500'
//                       : 'border-gray-300 text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
              
//               {currentPage < totalPages && (
//                 <button
//                   onClick={() => setCurrentPage(currentPage + 1)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Next Page
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Image Preview Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="relative max-w-4xl max-h-full">
//             <button
//               onClick={closePreview}
//               className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
//             >
//               <X size={24} />
//             </button>
//             <img
//               src={selectedImage.src}
//               alt={selectedImage.alt}
//               className="max-w-full max-h-full object-contain"
//             />
//             <div className="absolute bottom-4 left-4 right-4 text-white">
//               <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
//               <button
//                 onClick={() => handleDownload(selectedImage)}
//                 className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
//               >
//                 <Download size={16} />
//                 <span>Download</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GalleryPage;