import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Category APIs
export const fetchCategories = (params = {}) =>
  api.get('/categories', { params });
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Subcategory APIs
export const fetchSubcategories = (params = {}) => api.get('/subcategories', { params });
export const createSubcategory = (data) => api.post('/subcategories', data);
export const updateSubcategory = (id, data) => api.put(`/subcategories/${id}`, data);
export const deleteSubcategory = (id) => api.delete(`/subcategories/${id}`);

// Tag APIs
export const fetchTags = () => api.get('/tags');
export const createTag = (data) => api.post('/tags', data);
export const updateTag = (id, data) => api.put(`/tags/${id}`, data);
export const deleteTag = (id) => api.delete(`/tags/${id}`);

// Collection APIs
export const fetchCollections = () => api.get('/collections');
export const createCollection = (data) => api.post('/collections', data);
export const updateCollection = (id, data) => api.put(`/collections/${id}`, data);
export const deleteCollection = (id) => api.delete(`/collections/${id}`);

// Occasion APIs
export const fetchOccasions = () => api.get('/occasions');
export const createOccasion = (data) => api.post('/occasions', data);
export const updateOccasion = (id, data) => api.put(`/occasions/${id}`, data);
export const deleteOccasion = (id) => api.delete(`/occasions/${id}`);

// Color APIs
export const fetchColors = () => api.get('/colors');
export const createColor = (data) => api.post('/colors', data);
export const updateColor = (id, data) => api.put(`/colors/${id}`, data);
export const deleteColor = (id) => api.delete(`/colors/${id}`);

// Product APIs
export const fetchProducts = (params = {}) => api.get('/products', { params });
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const filterProducts = (data) => api.post('/products/filter', data);

export const ProductTag = (data) => api.post('/products/by-tags', data);
export const ProductTypes = (data) => api.post('/products/by-types', data);
export const ProductFilter = (data) => api.post('/products/by-filter', data);
export const ProductBySlug = (slug) => api.get(`/products/${slug}`);

// Hero Section APIs
export const fetchHeroSections = () => api.get('/pages/hero');
export const createHeroSection = (data) => api.post('/pages/hero', data);
export const updateHeroSection = (id, data) => api.put(`/pages/hero/${id}`, data);
export const deleteHeroSection = (id) => api.delete(`/pages/hero/${id}`);

// Packing Box Section APIs
export const fetchPackingBoxSections = () => api.get('/pages/packing-box');
export const createPackingBoxSection = (data) => api.post('/pages/packing-box', data);
export const updatePackingBoxSection = (id, data) => api.put(`/pages/packing-box/${id}`, data);
export const deletePackingBoxSection = (id) => api.delete(`/pages/packing-box/${id}`);

// Three Dynamic Card APIs
export const fetchThreeDynamicCards = () => api.get('/pages/three-dynamic');
export const createThreeDynamicCard = (data) => api.post('/pages/three-dynamic', data);
export const updateThreeDynamicCard = (id, data) => api.put(`/pages/three-dynamic/${id}`, data);
export const deleteThreeDynamicCard = (id) => api.delete(`/pages/three-dynamic/${id}`);

// Dynamic Card APIs
export const fetchDynamicCards = () => api.get('/pages/dynamic-card');
export const createDynamicCard = (data) => api.post('/pages/dynamic-card', data);
export const updateDynamicCard = (id, data) => api.put(`/pages/dynamic-card/${id}`, data);
export const deleteDynamicCard = (id) => api.delete(`/pages/dynamic-card/${id}`);

// Auth APIs
export const loginUser = (data) => api.post('/auth/login', data);
export const signupUser = (data) => api.post('/auth/signup', data);

// User Profile APIs
export const updateUserProfile = (data) => api.put('/user/profile', data);

// Address APIs
export const fetchAddresses = () => api.get('/user/addresses');
export const createAddress = (data) => api.post('/user/addresses', data);
export const updateAddress = (id, data) => api.put(`/user/addresses/${id}`, data);
export const deleteAddress = (id) => api.delete(`/user/addresses/${id}`);
export const markPrimaryAddress = (id) => api.patch(`/user/addresses/${id}/primary`);

//Authentication APIs
export const getProfile = () => api.get('/auth/me');

//wishlist APIs
export const addToWishlist = (data) => api.post('/wishlist', data);
export const getWishlist = () => api.get('/wishlist');
export const deleteFromWishlist = (itemId) => api.delete(`/wishlist/${itemId}`);

//cart APIs
export const addToCart = (data) => api.post('/cart', data);
export const getCart = () => api.get('/cart');
export const updateCartItem = (itemId, data) => api.put(`/cart/${itemId}`, data);
export const deleteFromCart = (itemId) => api.delete(`/cart/${itemId}`);