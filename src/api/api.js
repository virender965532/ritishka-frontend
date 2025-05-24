import axios from 'axios';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Category APIs
export const fetchCategories = () => axios.get(`${API_BASE}/categories`);
export const createCategory = (data) => axios.post(`${API_BASE}/categories`, data);
export const updateCategory = (id, data) => axios.put(`${API_BASE}/categories/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${API_BASE}/categories/${id}`);

// Subcategory APIs
export const fetchSubcategories = (data) => axios.get(`${API_BASE}/subcategories`, { params: data });
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

export const ProductTag = (data) => axios.post(`${API_BASE}/products/by-tags`, data);
export const ProductTypes = (data) => axios.post(`${API_BASE}/products/by-types`, data);