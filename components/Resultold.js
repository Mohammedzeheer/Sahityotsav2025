'use client'
import React, { useRef, useEffect, useState } from 'react'
import Image from "next/image";
import temp from "../public/assets/temp2.jpg";
import axios from "axios";

function Result() {
  const [dbResults, setDbResults] = useState([]);
  const [displayedResult, setDisplayedResult] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [notUploaded, setNotUploaded] = useState(false);
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);

  const fetchCategoriesAndItems = async () => {
    try {
      const res = await axios.get('/api/categories-items');
      setCategories(res.data.categories);
      setItems(res.data.items);
    } catch (error) {
      console.error('Failed to fetch categories and items:', error);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await axios.get('/api/result/');
      setDbResults(res.data.results);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    }
  };

  useEffect(() => {
    fetchCategoriesAndItems();
    fetchResults();
  }, []);

  useEffect(() => {
    if (canvasRef.current && imageRef.current) {
      setCanvas(canvasRef.current);
      setImage(imageRef.current);
    }
  }, [imageLoaded, displayedResult]);

  useEffect(() => {
    if (imageLoaded && canvas && image && displayedResult.length > 0) {
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const drawText = (text, x, y, maxWidth, lineHeight) => {
          const words = text.split(' ');
          let line = '';
          let lineCount = 0;
          for (let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let metrics = context.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
              context.fillText(line, x, y);
              line = words[n] + ' ';
              y += lineHeight;
              lineCount++;
            } else {
              line = testLine;
            }
          }
          context.fillText(line, x, y);
          lineCount++;
          return lineCount;
        };

        context.font = "600 60px Poppins, sans-serif";
        context.fillStyle = "#111254";
        const lines = drawText(displayedResult[0].item, 130, 170, 500, 70);

        context.font = "400 40px Poppins, sans-serif";
        context.fillStyle = "black";
        drawText(displayedResult[0].category, 130, 150 + lines * 70, 500, 45);

        context.font = "400 45px Poppins, sans-serif";
        context.fillStyle = "black";
        context.fillText("1", 350, 360);

        context.font = "600 40px Poppins, sans-serif";
        context.fillStyle = "#220a82";
        const text = displayedResult[0].firstName.toUpperCase();
        context.fillText(text, 400, 350);

        context.font = "400 25px Poppins, sans-serif";
        context.fillStyle = "#154c79";
        context.fillText(displayedResult[0].firstUnit, 400, 380);

        context.font = "400 45px Poppins, sans-serif";
        context.fillStyle = "black";
        context.fillText("2", 350, 460);

        context.font = "600 40px Poppins, sans-serif";
        context.fillStyle = "#220a82";
        const text2 = displayedResult[0].secondName.toUpperCase();
        context.fillText(text2, 400, 450);

        context.font = "400 25px Poppins, sans-serif";
        context.fillStyle = "#154c79";
        context.fillText(displayedResult[0].secondUnit, 400, 480);

        context.font = "400 45px Poppins, sans-serif";
        context.fillStyle = "black";
        context.fillText("3", 350, 560);

        context.font = "600 40px Poppins, sans-serif ";
        context.fillStyle = "#220a82";
        const text3 = displayedResult[0].thirdName.toUpperCase();
        context.fillText(text3, 400, 550);

        context.font = "400 25px Poppins, sans-serif";
        context.fillStyle = "#154c79";
        context.fillText(displayedResult[0].thirdUnit, 400, 580);
      }
    }
  }, [displayedResult, canvas, image, imageLoaded]);

  useEffect(() => {
    if (dbResults.length > 0) {
      setNotUploaded(false);
      const filteredResults = dbResults.filter(result => result.category === category && result.item === item);
      console.log(filteredResults,'filteredResults0------------------')
      setDisplayedResult(filteredResults);
      if (filteredResults.length === 0) {
        setNotUploaded(true);
      }
    }
  }, [item, category, dbResults]);

  useEffect(() => {
    if (category && items[category]) {
      setItem('');
    }
  }, [category, items]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      let dwtext = `${displayedResult[0].category} ${displayedResult[0].item}`;
      link.download = `${dwtext}.jpg`;
      link.click();
    }
  };

  return (
    <div className="w-full">
      <h1 className="font-bold text-4xl px-10 md:p-0 md:px-56">Results</h1>
      <div className="flex md:flex-row flex-col md:justify-between space-y-1.5 md:space-y-0 pt-1 p-10 md:px-56">
        <div className="flex flex-col items-start">
          <label htmlFor="category" className="text-lg">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-black text-white md:text-lg p-2 md:p-3 font-medium md:px-8 rounded">
            <option value="">Select Category</option>
            {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="item" className="text-lg">Item</label>
          <select
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="bg-black text-white md:text-lg p-2 md:p-3 font-medium md:px-8 rounded">
            <option value="">Select Item</option>
            {(items[category] || []).map((itm, i) => <option key={i} value={itm}>{itm}</option>)}
          </select>
        </div>
      </div>

      {item && (
        <div className="mt-0 md:mt-8 bg-yellow-50 p-10 md:px-56">
          {displayedResult.length === 1 && (
            <div className="flex flex-col w-full pt-4">
              <div className="flex flex-col md:flex-row p-8 gap-4">
                <div className="flex items-center gap-5">
                  <h1 className="text-xl font-semibold">1</h1>
                  <div className="-space-y-2">
                    <h1 className="text-2xl font-bold">{displayedResult[0].firstName}</h1>
                    <h1>{displayedResult[0].firstUnit}</h1>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <h1 className="text-xl font-semibold">2</h1>
                  <div className="-space-y-2">
                    <h1 className="text-2xl font-bold">{displayedResult[0].secondName}</h1>
                    <h1>{displayedResult[0].secondUnit}</h1>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <h1 className="text-xl font-semibold">3</h1>
                  <div className="-space-y-2">
                    <h1 className="text-2xl font-bold">{displayedResult[0].thirdName}</h1>
                    <h1>{displayedResult[0].thirdUnit}</h1>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hidden image for canvas drawing */}
          <Image
            objectFit='contain'
            priority
            fill
            quality={100}
            sizes="100vw"
            src={temp.src}
            alt="temp"
            className='w-full hidden'
            onLoad={() => setImageLoaded(true)}
            ref={imageRef}
          />

          {/* Canvas for rendering and downloading */}
          <canvas ref={canvasRef} className="shadow-lg w-full"></canvas>

          {/* Download button */}
          <button
            className="bg-black text-white w-full p-3 text-xl font-semibold"
            onClick={handleDownload}
          >
            Download
          </button>

          {notUploaded && <h1>Sorry.. This result isn&apos;t uploaded yet.</h1>}
        </div>
      )}

      {!item && <h1 className="mt-4 text-center">Please Select Your Item</h1>}
    </div>
  );
}

export default Result;






 //commented 7/7/2025
// 'use client'  
// import React, { useRef, useEffect, useState } from 'react'
// import Image from "next/image";
// import temp from "../public/assets/temp2.jpg";
// import axios from "axios";
// import { Trophy, Download, Search, Award, Medal, Crown, Star, Users, Calendar, Filter, Sparkles, ChevronDown, Eye } from 'lucide-react';

// function Result() {
//   const [dbResults, setDbResults] = useState([]);
//   const [displayedResult, setDisplayedResult] = useState([]);
//   const [allResults, setAllResults] = useState([]);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [notUploaded, setNotUploaded] = useState(false);
//   const [category, setCategory] = useState('');
//   const [item, setItem] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [viewMode, setViewMode] = useState('filtered'); // 'filtered' or 'all'
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const canvasRef = useRef(null);
//   const [canvas, setCanvas] = useState(null);
//   const [image, setImage] = useState(null);
//   const imageRef = useRef(null);

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get('/api/category');
//       console.log(res.data.categories)
//       setCategories(res.data.categories || []);
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     }
//   };

//   // Fetch items
//   const fetchItems = async () => {
//     try {
//       const res = await axios.get('/api/items');
//       console.log(res.data.items)// Separate endpoint for items
//       setItems(res.data.items || []);
//     } catch (error) {
//       console.error('Failed to fetch items:', error);
//     }
//   };

//   // Fetch results
//   const fetchResults = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get('/api/result/');
//       console.log(res.data.results)
//       setDbResults(res.data.results || []);
//       setAllResults(res.data.results || []);
//     } catch (error) {
//       console.error('Failed to fetch results:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchItems();
//     fetchResults();
//   }, []);

//   useEffect(() => {
//     if (canvasRef.current && imageRef.current) {
//       setCanvas(canvasRef.current);
//       setImage(imageRef.current);
//     }
//   }, [imageLoaded, displayedResult]);

//   useEffect(() => {
//     if (category && items.length > 0) {
//       // Find the selected category object
//       const selectedCategoryObj = categories.find(cat =>
//         cat._id === category || cat.categoryName === category
//       );

//       if (selectedCategoryObj) {
//         // Filter items that belong to this category
//         // Since categoryId is populated as an object, we need to check categoryId._id
//         const categoryItems = items.filter(item =>
//           item.categoryId._id === selectedCategoryObj._id
//         );
//         setFilteredItems(categoryItems);
//       } else {
//         setFilteredItems([]);
//       }
//       setItem(''); // Reset item selection when category changes
//     } else {
//       setFilteredItems([]);
//     }
//   }, [category, categories, items]);

//   useEffect(() => {
//     if (imageLoaded && canvas && image && displayedResult.length > 0) {
//       const context = canvas.getContext("2d");

//       if (context) {
//         canvas.width = image.width;
//         canvas.height = image.height;
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         const drawText = (text, x, y, maxWidth, lineHeight) => {
//           const words = text.split(' ');
//           let line = '';
//           let lineCount = 0;
//           for (let n = 0; n < words.length; n++) {
//             let testLine = line + words[n] + ' ';
//             let metrics = context.measureText(testLine);
//             let testWidth = metrics.width;
//             if (testWidth > maxWidth && n > 0) {
//               context.fillText(line, x, y);
//               line = words[n] + ' ';
//               y += lineHeight;
//               lineCount++;
//             } else {
//               line = testLine;
//             }
//           }
//           context.fillText(line, x, y);
//           lineCount++;
//           return lineCount;
//         };

//         context.font = "600 60px Poppins, sans-serif";
//         context.fillStyle = "#111254";
//         const lines = drawText(displayedResult[0].item, 130, 170, 500, 70);

//         context.font = "400 40px Poppins, sans-serif";
//         context.fillStyle = "black";
//         drawText(displayedResult[0].category, 130, 150 + lines * 70, 500, 45);

//         context.font = "400 45px Poppins, sans-serif";
//         context.fillStyle = "black";
//         context.fillText("1", 350, 360);

//         context.font = "600 40px Poppins, sans-serif";
//         context.fillStyle = "#220a82";
//         const text = displayedResult[0].firstName.toUpperCase();
//         context.fillText(text, 400, 350);

//         context.font = "400 25px Poppins, sans-serif";
//         context.fillStyle = "#154c79";
//         context.fillText(displayedResult[0].firstUnit, 400, 380);

//         context.font = "400 45px Poppins, sans-serif";
//         context.fillStyle = "black";
//         context.fillText("2", 350, 460);

//         context.font = "600 40px Poppins, sans-serif";
//         context.fillStyle = "#220a82";
//         const text2 = displayedResult[0].secondName.toUpperCase();
//         context.fillText(text2, 400, 450);

//         context.font = "400 25px Poppins, sans-serif";
//         context.fillStyle = "#154c79";
//         context.fillText(displayedResult[0].secondUnit, 400, 480);

//         context.font = "400 45px Poppins, sans-serif";
//         context.fillStyle = "black";
//         context.fillText("3", 350, 560);

//         context.font = "600 40px Poppins, sans-serif ";
//         context.fillStyle = "#220a82";
//         const text3 = displayedResult[0].thirdName.toUpperCase();
//         context.fillText(text3, 400, 550);

//         context.font = "400 25px Poppins, sans-serif";
//         context.fillStyle = "#154c79";
//         context.fillText(displayedResult[0].thirdUnit, 400, 580);
//       }
//     }
//   }, [displayedResult, canvas, image, imageLoaded]);

//   useEffect(() => {
//     if (dbResults.length > 0 && category && item) {
//       setIsLoading(true);
//       setNotUploaded(false);

//       // Find the category name for matching
//       const selectedCategoryObj = categories.find(cat => cat._id === category);
//       const categoryName = selectedCategoryObj ? selectedCategoryObj.categoryName : category;

//       // Find the item name for matching
//       const selectedItemObj = items.find(itm => itm._id === item);
//       const itemName = selectedItemObj ? selectedItemObj.itemName : item;

//       console.log('Filtering with:', { categoryName, itemName });

//       const filteredResults = dbResults.filter(result => {
//         const categoryMatch = result.category.toLowerCase().trim() === categoryName.toLowerCase().trim();
//         const itemMatch = result.item.toLowerCase().trim() === itemName.toLowerCase().trim();
//         return categoryMatch && itemMatch;
//       });

//       console.log('Filtered results count:', filteredResults.length);

//       setDisplayedResult(filteredResults);
//       if (filteredResults.length === 0) {
//         setNotUploaded(true);
//       }
//       setIsLoading(false);
//     }
//   }, [item, category, dbResults, categories, items]);

//   const handleDownload = () => {
//     if (canvasRef.current) {
//       const canvas = canvasRef.current;
//       const link = document.createElement("a");
//       link.href = canvas.toDataURL("image/jpeg");
//       let dwtext = `${displayedResult[0].category} ${displayedResult[0].item}`;
//       link.download = `${dwtext}.jpg`;
//       link.click();
//     }
//   };

//   const getPositionIcon = (position) => {
//     switch (position) {
//       case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
//       case 2: return <Medal className="w-6 h-6 text-gray-400" />;
//       case 3: return <Award className="w-6 h-6 text-amber-600" />;
//       default: return <Star className="w-6 h-6 text-blue-500" />;
//     }
//   };

//   const getPositionBg = (position) => {
//     switch (position) {
//       case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600";
//       case 2: return "bg-gradient-to-r from-gray-300 to-gray-500";
//       case 3: return "bg-gradient-to-r from-amber-400 to-amber-600";
//       default: return "bg-gradient-to-r from-blue-400 to-blue-600";
//     }
//   };

//   const getFilteredAllResults = () => {
//     let filtered = allResults;

//     if (selectedCategory !== 'all') {
//       const selectedCategoryObj = categories.find(cat => cat._id === selectedCategory);
//       const categoryName = selectedCategoryObj ? selectedCategoryObj.name : selectedCategory;
//       filtered = filtered.filter(result => result.category === categoryName);
//     }

//     if (searchTerm) {
//       filtered = filtered.filter(result =>
//         result.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         result.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         result.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         result.secondName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         result.thirdName.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     return filtered;
//   };

//   const ResultCard = ({ result, index }) => (
//     <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
//       <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
//               <Trophy className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold text-white">{result.category}</h3>
//               <p className="text-blue-100">{result.item}</p>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
//               <span className="text-white font-semibold text-sm">#{index + 1}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="space-y-4">
//           {/* First Place */}
//           <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border-l-4 border-yellow-400">
//             <div className="flex-shrink-0">
//               <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
//                 <Crown className="w-6 h-6 text-yellow-800" />
//               </div>
//             </div>
//             <div className="flex-1">
//               <h4 className="font-bold text-gray-900 text-lg">{result.firstName}</h4>
//               <p className="text-gray-600">{result.firstUnit}</p>
//             </div>
//             <div className="text-2xl font-bold text-yellow-600">1st</div>
//           </div>

//           {/* Second Place */}
//           <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-l-4 border-gray-400">
//             <div className="flex-shrink-0">
//               <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
//                 <Medal className="w-6 h-6 text-gray-800" />
//               </div>
//             </div>
//             <div className="flex-1">
//               <h4 className="font-bold text-gray-900 text-lg">{result.secondName}</h4>
//               <p className="text-gray-600">{result.secondUnit}</p>
//             </div>
//             <div className="text-2xl font-bold text-gray-500">2nd</div>
//           </div>

//           {/* Third Place */}
//           <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border-l-4 border-amber-400">
//             <div className="flex-shrink-0">
//               <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center">
//                 <Award className="w-6 h-6 text-amber-800" />
//               </div>
//             </div>
//             <div className="flex-1">
//               <h4 className="font-bold text-gray-900 text-lg">{result.thirdName}</h4>
//               <p className="text-gray-600">{result.thirdUnit}</p>
//             </div>
//             <div className="text-2xl font-bold text-amber-600">3rd</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
//       </div>

//       {/* Header */}
//       <div className="relative bg-white/80 backdrop-blur-sm shadow-xl border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-4">
//                 <Trophy className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                   Results
//                 </h1>
//                 {/* <p className="text-gray-600 mt-2 text-lg">Discover the winners and celebrate excellence</p> */}
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-6 py-3">
//                 <Users className="w-5 h-5 text-purple-600" />
//                 <span className="font-semibold text-purple-700">{allResults.length} Results</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* View Mode Toggle */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {viewMode === 'filtered' ? (
//           <>
//             {/* Filter Section */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-8 border border-gray-100">
//               <div className="flex items-center space-x-3 mb-8">
//                 <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-3">
//                   <Search className="w-6 h-6 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-900">Find Specific Results</h2>
//                 <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-3">
//                   <label htmlFor="category" className="text-xl font-bold text-gray-700 flex items-center space-x-2">
//                     <Trophy className="w-5 h-5 text-purple-600" />
//                     <span>Category</span>
//                   </label>

//                   <div className="relative">
//                     <select
//                       id="category"
//                       value={category}
//                       onChange={(e) => setCategory(e.target.value)}
//                       className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg p-5 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 appearance-none"
//                     >
//                       <option value="" className="bg-gray-800 text-white">
//                         🎯 Select Category
//                       </option>
//                       {categories.map((cat) => (
//                         <option
//                           key={cat._id}
//                           value={cat._id}
//                           className="bg-gray-800 text-white hover:bg-gray-700"
//                         >
//                           {cat.categoryName}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white pointer-events-none" />
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <label htmlFor="item" className="text-xl font-bold text-gray-700 flex items-center space-x-2">
//                     <Award className="w-5 h-5 text-emerald-600" />
//                     <span>Competition Item</span>
//                   </label>
//                   <div className="relative">
//                     <select
//                       id="item"
//                       value={item}
//                       onChange={(e) => setItem(e.target.value)}
//                       className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg p-5 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 appearance-none"
//                       disabled={!category}
//                     >
//                       <option value="" className="bg-gray-800 text-white">
//                         🏆 Select Item
//                       </option>
//                       {filteredItems.map((itm) => (
//                         <option
//                           key={itm._id}
//                           value={itm._id}
//                           className="bg-gray-800 text-white hover:bg-gray-700"
//                         >
//                           {itm.itemName}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white pointer-events-none" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Filtered Results Section */}
//             {item && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
//                 {displayedResult.length === 1 && (
//                   <div className="p-10">
//                     <div className="text-center mb-12">
//                       <div className="flex items-center justify-center space-x-4 mb-6">
//                         <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-4">
//                           <Trophy className="w-10 h-10 text-white" />
//                         </div>
//                         <h3 className="text-4xl font-bold text-gray-900">
//                           {displayedResult[0].category} - {displayedResult[0].item}
//                         </h3>
//                         <Sparkles className="w-10 h-10 text-yellow-500 animate-pulse" />
//                       </div>
//                       <p className="text-gray-600 text-lg">🎉 Congratulations to our amazing winners! 🎉</p>
//                     </div>

//                     {/* Winners Display */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//                       {/* First Place */}
//                       <div className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 rounded-3xl p-8 border-4 border-yellow-300 relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
//                         <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
//                           <Crown className="w-10 h-10 text-white" />
//                         </div>
//                         <div className="text-center pt-4">
//                           <div className="text-8xl font-bold text-yellow-600 mb-4">1st</div>
//                           <h4 className="text-2xl font-bold text-gray-900 mb-3">
//                             {displayedResult[0].firstName}
//                           </h4>
//                           <p className="text-gray-700 font-medium text-lg">{displayedResult[0].firstUnit}</p>
//                           <div className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full">
//                             <span className="text-white font-bold">🏆 Champion</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Second Place */}
//                       <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-3xl p-8 border-4 border-gray-300 relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
//                         <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
//                           <Medal className="w-10 h-10 text-white" />
//                         </div>
//                         <div className="text-center pt-4">
//                           <div className="text-8xl font-bold text-gray-500 mb-4">2nd</div>
//                           <h4 className="text-2xl font-bold text-gray-900 mb-3">
//                             {displayedResult[0].secondName}
//                           </h4>
//                           <p className="text-gray-700 font-medium text-lg">{displayedResult[0].secondUnit}</p>
//                           <div className="mt-6 px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full">
//                             <span className="text-white font-bold">🥈 Runner-up</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Third Place */}
//                       <div className="bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 rounded-3xl p-8 border-4 border-amber-300 relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
//                         <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
//                           <Award className="w-10 h-10 text-white" />
//                         </div>
//                         <div className="text-center pt-4">
//                           <div className="text-8xl font-bold text-amber-600 mb-4">3rd</div>
//                           <h4 className="text-2xl font-bold text-gray-900 mb-3">
//                             {displayedResult[0].thirdName}
//                           </h4>
//                           <p className="text-gray-700 font-medium text-lg">{displayedResult[0].thirdUnit}</p>
//                           <div className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full">
//                             <span className="text-white font-bold">🥉 Third Place</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Certificate Preview */}
//                     <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-3xl p-10 border-2 border-purple-200">
//                       <div className="text-center mb-8">
//                         <div className="flex items-center justify-center space-x-3 mb-4">
//                           <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-3">
//                             <Download className="w-8 h-8 text-white" />
//                           </div>
//                           <h4 className="text-3xl font-bold text-gray-900">Certificate Preview</h4>
//                         </div>
//                         <p className="text-gray-600 text-lg">Preview and download the official results certificate</p>
//                       </div>

//                       {/* Hidden image for canvas drawing */}
//                       <Image
//                         objectFit='contain'
//                         priority
//                         fill
//                         quality={100}
//                         sizes="100vw"
//                         src={temp.src}
//                         alt="Certificate template"
//                         className='w-full hidden'
//                         onLoad={() => setImageLoaded(true)}
//                         ref={imageRef}
//                       />

//                       {/* Canvas for rendering */}
//                       <div className="flex justify-center mb-8">
//                         <canvas
//                           ref={canvasRef}
//                           className="shadow-2xl rounded-2xl max-w-full h-auto border-8 border-white"
//                         />
//                       </div>

//                       {/* Download button */}
//                       <div className="text-center">
//                         <button
//                           onClick={handleDownload}
//                           className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center space-x-4 mx-auto"
//                         >
//                           <Download className="w-8 h-8" />
//                           <span>Download Certificate</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Not Found Message */}
//                 {notUploaded && (
//                   <div className="p-10 text-center">
//                     <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-12 border-4 border-yellow-200">
//                       <div className="text-yellow-600 mb-6">
//                         <Search className="w-20 h-20 mx-auto" />
//                       </div>
//                       <h3 className="text-3xl font-bold text-gray-900 mb-4">Results Not Available</h3>
//                       <p className="text-gray-600 text-lg">
//                         Sorry, the results for this competition haven't been uploaded yet.
//                         Please check back later or contact the organizers.
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Empty State */}
//             {!item && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
//                 <div className="text-gray-400 mb-8">
//                   <Trophy className="w-24 h-24 mx-auto" />
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-900 mb-4">Select Competition Details</h3>
//                 <p className="text-gray-600 text-lg">
//                   Please select both category and item to view the competition results
//                 </p>
//               </div>
//             )}
//           </>
//         ) : (
//           <>
//             {/* All Results View */}
//             <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-8 border border-gray-100">
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center space-x-3">
//                   <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-3">
//                     <Users className="w-6 h-6 text-white" />
//                   </div>
//                   <h2 className="text-3xl font-bold text-gray-900">All Competition Results</h2>
//                   <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
//                 </div>
//                 <div className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-6 py-3">
//                   <span className="font-bold text-green-700">{getFilteredAllResults().length} Results Found</span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Search Bar */}
//                 <div className="space-y-3">
//                   <label className="text-xl font-bold text-gray-700 flex items-center space-x-2">
//                     <Search className="w-5 h-5 text-purple-600" />
//                     <span>Search Results</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search by category, item, or winner name..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white placeholder-purple-200 text-lg p-5 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300"
//                     />
//                     <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white pointer-events-none" />
//                   </div>
//                 </div>

//                 {/* Category Filter */}
//                 <div className="space-y-3">
//                   <label className="text-xl font-bold text-gray-700 flex items-center space-x-2">
//                     <Filter className="w-5 h-5 text-emerald-600" />
//                     <span>Filter by Category</span>
//                   </label>
//                   <div className="relative">
//                     <select
//                       value={selectedCategory}
//                       onChange={(e) => setSelectedCategory(e.target.value)}
//                       className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg p-5 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 appearance-none"
//                     >
//                       <option value="all">🌟 All Categories</option>
//                       {categories.map((cat, i) => (
//                         <option key={i} value={cat} className="bg-emerald-600">{cat}</option>
//                       ))}
//                     </select>
//                     <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white pointer-events-none" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* All Results Grid */}
//             {isLoading ? (
//               <div className="flex items-center justify-center py-20">
//                 <div className="flex items-center space-x-4">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//                   <span className="text-xl font-semibold text-gray-700">Loading results...</span>
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {getFilteredAllResults().map((result, index) => (
//                   <ResultCard key={index} result={result} index={index} />
//                 ))}
//               </div>
//             )}

//             {/* No Results Found */}
//             {!isLoading && getFilteredAllResults().length === 0 && (
//               <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
//                 <div className="text-gray-400 mb-8">
//                   <Search className="w-24 h-24 mx-auto" />
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-900 mb-4">No Results Found</h3>
//                 <p className="text-gray-600 text-lg">
//                   Try adjusting your search terms or category filter to find more results.
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Result;
