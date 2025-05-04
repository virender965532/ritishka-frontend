import axios from 'axios';

// const API_BASE = 'http://localhost:5000/api';
const API_BASE = 'http://localhost:5000/api';

export const fetchCategories = () => axios.get(`${API_BASE}/categories`);
export const createCategory = (data) => axios.post(`${API_BASE}/categories`, data);
export const updateCategory = (id, data) => axios.put(`${API_BASE}/categories/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${API_BASE}/categories/${id}`);

export const fetchSubcategories = () => axios.get(`${API_BASE}/subcategories`);
export const createSubcategory = (data) => axios.post(`${API_BASE}/subcategories`, data);
export const updateSubcategory = (id, data) => axios.put(`${API_BASE}/subcategories/${id}`, data);
export const deleteSubcategoryy = (id) => axios.delete(`${API_BASE}/subcategories/${id}`);