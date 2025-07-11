'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, CheckCircle, AlertCircle, XCircle, Package, Search, Filter } from 'lucide-react';
import axios from 'axios';

const ItemsManagement = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [bulkItems, setBulkItems] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [formData, setFormData] = useState({
    itemName: '',
    categoryId: '',
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/category');
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      showToast('Failed to fetch categories', 'error');
    }
  };

  // Fetch items
  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data.items || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      showToast('Failed to fetch items', 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  // Add single item
  const handleAdd = async () => {
    if (!formData.itemName.trim() || !formData.categoryId) {
      showToast('Please enter item name and select category', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/items', formData);
      
      if (response.status === 202) {
        await fetchItems();
        setFormData({ itemName: '', categoryId: '', isActive: true });
        setShowAddForm(false);
        showToast('Item added successfully', 'success');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      showToast('Failed to add item', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Add multiple items in bulk
  const handleBulkAdd = async () => {
    if (!selectedCategory || !bulkItems.trim()) {
      showToast('Please select category and enter items', 'error');
      return;
    }

    const itemsList = bulkItems
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (itemsList.length === 0) {
      showToast('Please enter at least one item', 'error');
      return;
    }

    setLoading(true);
    try {
      const itemsData = itemsList.map(itemName => ({
        itemName,
        categoryId: selectedCategory,
        isActive: true
      }));

      const response = await axios.post('/api/items/bulk', { items: itemsData });
      
      if (response.status === 202) {
        await fetchItems();
        setBulkItems('');
        setSelectedCategory('');
        showToast(`${itemsList.length} items added successfully`, 'success');
      }
    } catch (error) {
      console.error('Error adding bulk items:', error);
      showToast('Failed to add bulk items', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Edit item
  const handleEdit = async (id) => {
    if (!formData.itemName.trim() || !formData.categoryId) {
      showToast('Please enter item name and select category', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put('/api/items', {
        id,
        ...formData,
      });

      if (response.status === 200) {
        await fetchItems();
        setEditingId(null);
        setFormData({ itemName: '', categoryId: '', isActive: true });
        showToast('Item updated successfully', 'success');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      showToast('Failed to update item', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    setLoading(true);
    try {
      const response = await axios.delete('/api/items', {
        data: { id }
      });

      if (response.status === 200) {
        await fetchItems();
        showToast('Item deleted successfully', 'success');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      showToast('Failed to delete item', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const startEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      itemName: item.itemName,
      categoryId: item.categoryId,
      isActive: item.isActive
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ itemName: '', categoryId: '', isActive: true });
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.categoryName : 'Unknown';
  };

  // Filter items based on search and category filter
  const filteredItems = items.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getCategoryName(item.categoryId).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.categoryId === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get items count by category
  const getItemsCountByCategory = (categoryId) => {
    return items.filter(item => item.categoryId === categoryId).length;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 
          toast.type === 'error' ? 'bg-red-600 text-white' : 
          'bg-blue-600 text-white'
        }`}>
          {toast.type === 'success' && <CheckCircle size={20} />}
          {toast.type === 'error' && <XCircle size={20} />}
          {toast.type === 'info' && <AlertCircle size={20} />}
          <span>{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="ml-2 hover:opacity-70"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg mb-6">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="text-blue-600" />
                Items Management
              </h1>
              <p className="text-gray-600 mt-1">
                Total Items: {items.length} | Active Categories: {categories.filter(cat => cat.isActive).length}
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Item
            </button>
          </div>
        </div>

        {/* Add Forms */}
        {showAddForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Single Item Form */}
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-800 mb-3">Add Single Item</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={formData.itemName}
                      onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter item name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.filter(cat => cat.isActive).map(category => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAdd}
                      disabled={loading}
                      className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Adding...' : 'Add Item'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bulk Items Form */}
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold text-gray-800 mb-3">Add Multiple Items</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.filter(cat => cat.isActive).map(category => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Items (one per line)
                    </label>
                    <textarea
                      value={bulkItems}
                      onChange={(e) => setBulkItems(e.target.value)}
                      placeholder="Enter items (one per line)&#10;Example:&#10;Item 1&#10;Item 2&#10;Item 3"
                      rows="6"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleBulkAdd}
                      disabled={loading || !selectedCategory || !bulkItems.trim()}
                      className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Adding...' : `Add ${bulkItems.split('\n').filter(item => item.trim()).length} Items`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-64">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search items..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName} ({getItemsCountByCategory(category._id)})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {categories.filter(cat => cat.isActive).map(category => (
          <div key={category._id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-800 mb-2">{category.categoryName}</h3>
            <p className="text-2xl font-bold text-blue-600">{getItemsCountByCategory(category._id)}</p>
            <p className="text-sm text-gray-600">items</p>
          </div>
        ))}
      </div>

      {/* Items List */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Items List</h2>
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items found. Add your first item!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Item Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Created At</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {editingId === item._id ? (
                          <input
                            type="text"
                            value={formData.itemName}
                            onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-gray-900">{item.itemName}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {editingId === item._id ? (
                          <select
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {categories.filter(cat => cat.isActive).map(category => (
                              <option key={category._id} value={category._id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-600">{getCategoryName(item.categoryId)}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {editingId === item._id ? (
                          <select
                            value={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                          </select>
                        ) : (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.isActive ? 'Active' : 'Inactive'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {editingId === item._id ? (
                            <>
                              <button
                                onClick={() => handleEdit(item._id)}
                                disabled={loading}
                                className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                              >
                                <Save size={16} />
                                Save
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="flex items-center gap-1 bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 transition-colors"
                              >
                                <X size={16} />
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(item)}
                                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                              >
                                <Edit size={16} />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                disabled={loading}
                                className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsManagement;