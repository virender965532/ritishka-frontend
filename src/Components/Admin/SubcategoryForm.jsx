import React, { useState, useEffect } from 'react';
import { createSubcategory, updateSubcategory, fetchCategories } from './../../api/api';

const SubcategoryForm = ({ selected, onSave }) => {
  const [form, setForm] = useState({ name: '', title: '', description: '', image: '', isactive: true, category_id: '' });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data));
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    selected ? await updateSubcategory(selected._id, form) : await createSubcategory(form);
    onSave();
    setForm({ name: '', title: '', description: '', image: '', isactive: true, category_id: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="category_id" value={form.category_id} onChange={handleChange} required>
        <option value="">Select Category</option>
        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
      </select>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <label><input type="checkbox" name="isactive" checked={form.isactive} onChange={handleChange} /> Active</label>
      <button type="submit">{selected ? 'Update' : 'Create'} Subcategory</button>
    </form>
  );
};

export default SubcategoryForm;