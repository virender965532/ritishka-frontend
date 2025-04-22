import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from './../../api/api';

const CategoryForm = ({ selected, onSave }) => {
  const [form, setForm] = useState({ name: '', title: '', description: '', image: '', isactive: true });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    selected ? await updateCategory(selected._id, form) : await createCategory(form);
    onSave();
    setForm({ name: '', title: '', description: '', image: '', isactive: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <label><input type="checkbox" name="isactive" checked={form.isactive} onChange={handleChange} /> Active</label>
      <button type="submit">{selected ? 'Update' : 'Create'} Category</button>
    </form>
  );
};

export default CategoryForm;