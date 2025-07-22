import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Category APIs
export const fetchCategories = (params = {}) =>
  axios.get(`${API_BASE}/categories`, { params });
export const createCategory = (data) => axios.post(`${API_BASE}/categories`, data);
export const updateCategory = (id, data) => axios.put(`${API_BASE}/categories/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${API_BASE}/categories/${id}`);

// Subcategory APIs
export const fetchSubcategories = (params = {}) => axios.get(`${API_BASE}/subcategories`, { params });
export const createSubcategory = (data) => axios.post(`${API_BASE}/subcategories`, data);
export const updateSubcategory = (id, data) => axios.put(`${API_BASE}/subcategories/${id}`, data);
export const deleteSubcategory = (id) => axios.delete(`${API_BASE}/subcategories/${id}`);

// Tag APIs
export const fetchTags = () => axios.get(`${API_BASE}/tags`);
export const createTag = (data) => axios.post(`${API_BASE}/tags`, data);
export const updateTag = (id, data) => axios.put(`${API_BASE}/tags/${id}`, data);
export const deleteTag = (id) => axios.delete(`${API_BASE}/tags/${id}`);

// Collection APIs
export const fetchCollections = () => axios.get(`${API_BASE}/collections`);
export const createCollection = (data) => axios.post(`${API_BASE}/collections`, data);
export const updateCollection = (id, data) => axios.put(`${API_BASE}/collections/${id}`, data);
export const deleteCollection = (id) => axios.delete(`${API_BASE}/collections/${id}`);

// Occasion APIs
export const fetchOccasions = () => axios.get(`${API_BASE}/occasions`);
export const createOccasion = (data) => axios.post(`${API_BASE}/occasions`, data);
export const updateOccasion = (id, data) => axios.put(`${API_BASE}/occasions/${id}`, data);
export const deleteOccasion = (id) => axios.delete(`${API_BASE}/occasions/${id}`);

// Color APIs
export const fetchColors = () => axios.get(`${API_BASE}/colors`);
export const createColor = (data) => axios.post(`${API_BASE}/colors`, data);
export const updateColor = (id, data) => axios.put(`${API_BASE}/colors/${id}`, data);
export const deleteColor = (id) => axios.delete(`${API_BASE}/colors/${id}`);

// Product APIs
export const fetchProducts = () => axios.get(`${API_BASE}/products`);
export const createProduct = (data) => axios.post(`${API_BASE}/products`, data);
export const updateProduct = (id, data) => axios.put(`${API_BASE}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/products/${id}`);
export const filterProducts = (data) => axios.post(`${API_BASE}/products/filter`, data);

export const ProductTag = (data) => axios.post(`${API_BASE}/products/by-tags`, data);
export const ProductTypes = (data) => axios.post(`${API_BASE}/products/by-types`, data);
export const ProductFilter = (data) => axios.post(`${API_BASE}/products/by-filter`, data);
export const ProductBySlug = (slug) => axios.get(`${API_BASE}/products/${slug}`);

// Hero Section APIs
export const fetchHeroSections = () => axios.get(`${API_BASE}/pages/hero`);
export const createHeroSection = (data) => axios.post(`${API_BASE}/pages/hero`, data);
export const updateHeroSection = (id, data) => axios.put(`${API_BASE}/pages/hero/${id}`, data);
export const deleteHeroSection = (id) => axios.delete(`${API_BASE}/pages/hero/${id}`);

// Packing Box Section APIs
export const fetchPackingBoxSections = () => axios.get(`${API_BASE}/pages/packing-box`);
export const createPackingBoxSection = (data) => axios.post(`${API_BASE}/pages/packing-box`, data);
export const updatePackingBoxSection = (id, data) => axios.put(`${API_BASE}/pages/packing-box/${id}`, data);
export const deletePackingBoxSection = (id) => axios.delete(`${API_BASE}/pages/packing-box/${id}`);

// Three Dynamic Card APIs
export const fetchThreeDynamicCards = () => axios.get(`${API_BASE}/pages/three-dynamic`);
export const createThreeDynamicCard = (data) => axios.post(`${API_BASE}/pages/three-dynamic`, data);
export const updateThreeDynamicCard = (id, data) => axios.put(`${API_BASE}/pages/three-dynamic/${id}`, data);
export const deleteThreeDynamicCard = (id) => axios.delete(`${API_BASE}/pages/three-dynamic/${id}`);

// Dynamic Card APIs
export const fetchDynamicCards = () => axios.get(`${API_BASE}/pages/dynamic-card`);
export const createDynamicCard = (data) => axios.post(`${API_BASE}/pages/dynamic-card`, data);
export const updateDynamicCard = (id, data) => axios.put(`${API_BASE}/pages/dynamic-card/${id}`, data);
export const deleteDynamicCard = (id) => axios.delete(`${API_BASE}/pages/dynamic-card/${id}`);

// Auth APIs
export const loginUser = (data) => axios.post(`${API_BASE}/auth/login`, data);
export const signupUser = (data) => axios.post(`${API_BASE}/auth/signup`, data);