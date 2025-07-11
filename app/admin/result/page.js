'use client'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Page() {
  const [result, setResult] = useState({
    category: '',
    item: '',
    firstName: '',
    firstUnit: '',
    secondName: '',
    secondUnit: '',
    thirdName: '',
    thirdUnit: '',
  });

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [teams, setTeams] = useState([]);
  const [existingResults, setExistingResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Function to capitalize first letter of each word
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Function to handle name input changes with auto-capitalization
  const handleNameChange = (field, value) => {
    const capitalizedValue = capitalizeWords(value);
    setResult({ ...result, [field]: capitalizedValue });
  };

  // Fetch categories from database
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/category');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  // Fetch items from database
  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data.items || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to fetch items');
    }
  };

  // Fetch teams from database
  const fetchTeams = async () => {
    try {
      const response = await axios.get('/api/team');
      setTeams(response.data.teams || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast.error('Failed to fetch teams');
    }
  };

  // Fetch existing results to check for duplicates
  const fetchExistingResults = async () => {
    try {
      const response = await axios.get('/api/result');
      setExistingResults(response.data.results || []);
    } catch (error) {
      console.error('Error fetching existing results:', error);
      toast.error('Failed to fetch existing results');
    }
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchCategories(), 
        fetchItems(), 
        fetchTeams(),
        fetchExistingResults()
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Get items for selected category
  const getItemsForCategory = (categoryId) => {
    return items.filter(item => {
      const itemCategoryId = typeof item.categoryId === 'object' 
        ? item.categoryId._id || item.categoryId.id 
        : item.categoryId;
      return itemCategoryId === categoryId && item.isActive;
    });
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.categoryName : '';
  };

  // Get active teams
  const getActiveTeams = () => {
    return teams.filter(team => team.isActive);
  };

  // Check if category/item combination already exists
  const isDuplicateResult = (categoryName, itemName) => {
    return existingResults.some(result => 
      result.category === categoryName && result.item === itemName
    );
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const selectedCategory = categories.find(cat => cat._id === result.category);
      const selectedItem = items.find(item => item._id === result.item);

      // Check for duplicate before submission
      if (isDuplicateResult(selectedCategory?.categoryName, selectedItem?.itemName)) {
        toast.error('Results for this category and item already exist!');
        setSubmitLoading(false);
        return;
      }

      const res = await axios.post('/api/result/', {
        category: selectedCategory?.categoryName || '',
        item: selectedItem?.itemName || '',
        firstName: result.firstName,
        firstUnit: result.firstUnit,
        secondName: result.secondName,
        secondUnit: result.secondUnit,
        thirdName: result.thirdName,
        thirdUnit: result.thirdUnit,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success('Results uploaded successfully!');
        setResult({
          category: '',
          item: '',
          firstName: '',
          firstUnit: '',
          secondName: '',
          secondUnit: '',
          thirdName: '',
          thirdUnit: '',
        });
        // Refresh existing results
        await fetchExistingResults();
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error('Results for this category and item already exist!');
      } else {
        toast.error('Failed to upload results');
      }
      console.error("Failed to upload results", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setResult({ 
      ...result, 
      category: categoryId,
      item: '' // Reset item when category changes
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  const selectedCategory = categories.find(cat => cat._id === result.category);
  const selectedItem = items.find(item => item._id === result.item);
  const isDuplicate = selectedCategory && selectedItem && 
    isDuplicateResult(selectedCategory.categoryName, selectedItem.itemName);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className='text-4xl md:text-5xl font-bold text-gray-800 mb-4'>
            🏆 Upload Results
          </h1>
          <p className="text-gray-600 text-lg">
            Enter the competition results for the top three positions
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-6xl mx-auto">
          <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            
            {/* Category and Item Selection */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                Competition Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Selection */}
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={result.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
                    name="category"
                    id="category"
                  >
                    <option value="">Choose a category</option>
                    {categories
                      .filter(category => category.isActive)
                      .map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Item Selection */}
                <div className="space-y-2">
                  <label htmlFor="item" className="block text-sm font-medium text-gray-700">
                    Item <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={result.item}
                    onChange={(e) => setResult({ ...result, item: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 disabled:bg-gray-100"
                    name="item"
                    id="item"
                    disabled={!result.category}
                  >
                    <option value="">Choose an item</option>
                    {getItemsForCategory(result.category).map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.itemName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Duplicate Warning */}
              {isDuplicate && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Duplicate Entry Warning
                      </h3>
                      <p className="text-sm text-red-700 mt-1">
                        Results for this category and item already exist. Please choose a different combination.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Winners Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                Winners Information
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* First Place */}
                <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-400 text-yellow-800 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-3">
                      🥇
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">First Place</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        Winner Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        value={result.firstName}
                        onChange={(e) => handleNameChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        type="text"
                        id="firstName"
                        placeholder="Enter winner's name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="firstUnit" className="block text-sm font-medium text-gray-700 mb-2">
                        Team <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={result.firstUnit}
                        onChange={(e) => setResult({ ...result, firstUnit: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                        name="firstUnit"
                        id="firstUnit"
                      >
                        <option value="">Select Team</option>
                        {getActiveTeams().map((team) => (
                          <option key={team._id} value={team.teamName}>
                            {team.teamName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Second Place */}
                <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-400 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-3">
                      🥈
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Second Place</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="secondName" className="block text-sm font-medium text-gray-700 mb-2">
                        Winner Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        value={result.secondName}
                        onChange={(e) => handleNameChange('secondName', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                        type="text"
                        id="secondName"
                        placeholder="Enter winner's name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="secondUnit" className="block text-sm font-medium text-gray-700 mb-2">
                        Team <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={result.secondUnit}
                        onChange={(e) => setResult({ ...result, secondUnit: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                        name="secondUnit"
                        id="secondUnit"
                      >
                        <option value="">Select Team</option>
                        {getActiveTeams().map((team) => (
                          <option key={team._id} value={team.teamName}>
                            {team.teamName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Third Place */}
                <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-400 text-orange-800 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mr-3">
                      🥉
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Third Place</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="thirdName" className="block text-sm font-medium text-gray-700 mb-2">
                        Winner Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        value={result.thirdName}
                        onChange={(e) => handleNameChange('thirdName', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        type="text"
                        id="thirdName"
                        placeholder="Enter winner's name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="thirdUnit" className="block text-sm font-medium text-gray-700 mb-2">
                        Team <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={result.thirdUnit}
                        onChange={(e) => setResult({ ...result, thirdUnit: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        name="thirdUnit"
                        id="thirdUnit"
                      >
                        <option value="">Select Team</option>
                        {getActiveTeams().map((team) => (
                          <option key={team._id} value={team.teamName}>
                            {team.teamName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={submitLoading || isDuplicate}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                  submitLoading || isDuplicate
                    ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {submitLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Uploading Results...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">🚀</span>
                    Submit Results
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;


// 'use client'; 
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// function Page() {
//   const [result, setResult] = useState({
//     category: '',
//     item: '',
//     firstName: '',
//     firstUnit: '',
//     secondName: '',
//     secondUnit: '',
//     thirdName: '',
//     thirdUnit: '',
//   });

//   const [categories, setCategories] = useState([]);
//   const [items, setItems] = useState([]);
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   // Function to capitalize first letter of each word
//   const capitalizeWords = (str) => {
//     return str.replace(/\b\w/g, (char) => char.toUpperCase());
//   };

//   // Function to handle name input changes with auto-capitalization
//   const handleNameChange = (field, value) => {
//     const capitalizedValue = capitalizeWords(value);
//     setResult({ ...result, [field]: capitalizedValue });
//   };

//   // Fetch categories from database
//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get('/api/category');
//       setCategories(response.data.categories || []);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       toast.error('Failed to fetch categories');
//     }
//   };

//   // Fetch items from database
//   const fetchItems = async () => {
//     try {
//       const response = await axios.get('/api/items');
//       setItems(response.data.items || []);
//     } catch (error) {
//       console.error('Error fetching items:', error);
//       toast.error('Failed to fetch items');
//     }
//   };

//   // Fetch teams from database
//   const fetchTeams = async () => {
//     try {
//       const response = await axios.get('/api/team');
//       setTeams(response.data.teams || []);
//     } catch (error) {
//       console.error('Error fetching teams:', error);
//       toast.error('Failed to fetch teams');
//     }
//   };

//   // Load data on component mount
//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       await Promise.all([fetchCategories(), fetchItems(), fetchTeams()]);
//       setLoading(false);
//     };
//     loadData();
//   }, []);

//   // Get items for selected category
//   const getItemsForCategory = (categoryId) => {
//     return items.filter(item => {
//       const itemCategoryId = typeof item.categoryId === 'object' 
//         ? item.categoryId._id || item.categoryId.id 
//         : item.categoryId;
//       return itemCategoryId === categoryId && item.isActive;
//     });
//   };

//   // Get category name by ID
//   const getCategoryName = (categoryId) => {
//     const category = categories.find(cat => cat._id === categoryId);
//     return category ? category.categoryName : '';
//   };

//   // Get active teams
//   const getActiveTeams = () => {
//     return teams.filter(team => team.isActive);
//   };

//   // Handle form submission
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitLoading(true);

//     try {
//       const selectedCategory = categories.find(cat => cat._id === result.category);
//       const selectedItem = items.find(item => item._id === result.item);

//       const res = await axios.post('/api/result/', {
//         category: selectedCategory?.categoryName || '',
//         item: selectedItem?.itemName || '',
//         firstName: result.firstName,
//         firstUnit: result.firstUnit,
//         secondName: result.secondName,
//         secondUnit: result.secondUnit,
//         thirdName: result.thirdName,
//         thirdUnit: result.thirdUnit,
//       });

//       if (res.status === 200 || res.status === 201) {
//         toast.success('Results uploaded successfully!');
//         setResult({
//           category: '',
//           item: '',
//           firstName: '',
//           firstUnit: '',
//           secondName: '',
//           secondUnit: '',
//           thirdName: '',
//           thirdUnit: '',
//         });
//       }
//     } catch (error) {
//       toast.error('Failed to upload results');
//       console.error("Failed to upload results", error);
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   // Handle category change
//   const handleCategoryChange = (categoryId) => {
//     setResult({ 
//       ...result, 
//       category: categoryId,
//       item: '' // Reset item when category changes
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className='p-6'>
//       {/* Results Upload Form */}
//       <form className='flex flex-col min-h-screen space-y-12 p-14 pt-24 md:p-28' onSubmit={onSubmit}>
//         <h1 className='font-bold text-3xl'>Upload Results Here</h1>
        
//         <div className='flex flex-col space-y-3'>
//           {/* Category and Item Selection */}
//           <div className='flex gap-3 md:gap-24 w-full'>
//             <div className='flex flex-col gap-2'>
//               <label htmlFor="category" className='text-lg'>Category</label>
//               <select
//                 required
//                 value={result.category}
//                 onChange={(e) => handleCategoryChange(e.target.value)}
//                 className='bg-slate-50 h-full hover:bg-slate-100 p-2 rounded border-2 min-w-48'
//                 name="category"
//                 id="category"
//               >
//                 <option value="">Select Category</option>
//                 {categories
//                   .filter(category => category.isActive)
//                   .map((category) => (
//                     <option key={category._id} value={category._id}>
//                       {category.categoryName}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           <div>
//             <div className='flex flex-col gap-2'>
//               <label htmlFor="item" className='text-lg'>Item</label>
//               <select
//                 required
//                 value={result.item}
//                 onChange={(e) => setResult({ ...result, item: e.target.value })}
//                 className='bg-slate-50 h-full hover:bg-slate-100 p-2 rounded border-2 min-w-48'
//                 name="item"
//                 id="item"
//                 disabled={!result.category}
//               >
//                 <option value="">Select Item</option>
//                 {getItemsForCategory(result.category).map((item) => (
//                   <option key={item._id} value={item._id}>
//                     {item.itemName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Winners Information */}
//           <div className='flex flex-col md:flex-grow gap-4 pt-5 md:flex-row'>
//             {/* First Place */}
//             <div className='flex flex-col'>
//               <h1 className='font-semibold text-lg'>First Place</h1>
//               <div className='flex flex-col gap-1 md:flex-row'>
//                 <div className='flex flex-col gap-2'>
//                   <label htmlFor="firstName" className='text-lg'>Name</label>
//                   <input
//                     required
//                     value={result.firstName}
//                     onChange={(e) => handleNameChange('firstName', e.target.value)}
//                     className='bg-slate-50 hover:bg-slate-100 p-2 rounded border-2'
//                     type="text"
//                     id="firstName"
//                     placeholder="Enter winner's name"
//                   />
//                 </div>
//                 <div className='flex flex-col gap-2'>
//                   <label htmlFor="firstUnit" className='text-lg'>Team</label>
//                   <select
//                     required
//                     value={result.firstUnit}
//                     onChange={(e) => setResult({ ...result, firstUnit: e.target.value })}
//                     className='bg-slate-50 h-full hover:bg-slate-100 p-2 rounded border-2'
//                     name="firstUnit"
//                     id="firstUnit"
//                   >
//                     <option value="">Select Team</option>
//                     {getActiveTeams().map((team) => (
//                       <option key={team._id} value={team.teamName}>
//                         {team.teamName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Second Place */}
//             <div className='flex flex-col'>
//               <h1 className='font-semibold text-lg'>Second Place</h1>
//               <div className='flex flex-col gap-1 md:flex-row'>
//                 <div className='flex flex-col gap-2'>
//                   <label htmlFor="secondName" className='text-lg'>Name</label>
//                   <input
//                     required
//                     value={result.secondName}
//                     onChange={(e) => handleNameChange('secondName', e.target.value)}
//                     className='bg-slate-50 hover:bg-slate-100 p-2 rounded border-2'
//                     type="text"
//                     id="secondName"
//                     placeholder="Enter winner's name"
//                   />
//                 </div>
//                 <div className='flex flex-col gap-2'>
//                   <label htmlFor="secondUnit" className='text-lg'>Team</label>
//                   <select
//                     required
//                     value={result.secondUnit}
//                     onChange={(e) => setResult({ ...result, secondUnit: e.target.value })}
//                     className='bg-slate-50 h-full hover:bg-slate-100 p-2 rounded border-2'
//                     name="secondUnit"
//                     id="secondUnit"
//                   >
//                     <option value="">Select Team</option>
//                     {getActiveTeams().map((team) => (
//                       <option key={team._id} value={team.teamName}>
//                         {team.teamName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Third Place */}
//             <div className='flex flex-col'>
//               <h1 className='font-semibold text-lg'>Third Place</h1>
//               <div className='flex flex-col gap-1 md:flex-row'>
//                 <div className='flex flex-col gap-2'>
//                   <label htmlFor="thirdName" className='text-lg'>Name</label>
//                   <input
//                     required
//                     value={result.thirdName}
//                     onChange={(e) => handleNameChange('thirdName', e.target.value)}
//                     className='bg-slate-50 hover:bg-slate-100 p-2 rounded border-2'
//                     type="text"
//                     id="thirdName"
//                     placeholder="Enter winner's name"
//                   />
//                 </div>
//                 <div className='flex flex-col gap-2'>
//                   <label htmlFor="thirdUnit" className='text-lg'>Team</label>
//                   <select
//                     required
//                     value={result.thirdUnit}
//                     onChange={(e) => setResult({ ...result, thirdUnit: e.target.value })}
//                     className='bg-slate-50 h-full hover:bg-slate-100 p-2 rounded border-2'
//                     name="thirdUnit"
//                     id="thirdUnit"
//                   >
//                     <option value="">Select Team</option>
//                     {getActiveTeams().map((team) => (
//                       <option key={team._id} value={team.teamName}>
//                         {team.teamName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={submitLoading}
//             className='bg-blue-500 text-white p-3 rounded hover:bg-blue-600 mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
//           >
//             {submitLoading ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 Uploading...
//               </>
//             ) : (
//               'Submit Results'
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Page;