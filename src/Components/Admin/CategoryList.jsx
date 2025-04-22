import React, { useState, useEffect } from 'react';
import { fetchCategories } from './../../api/api';
import CategoryForm from './CategoryForm';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadData = () => fetchCategories().then(res => setCategories(res.data));

  useEffect(() => { loadData(); }, []);

  return (
    <div>
      <h2>Categories</h2>
      <button onClick={() => setSelected(null)}>Add New Category</button>
      <CategoryForm selected={selected} onSave={loadData} />
      <ul>
        {categories.map(cat => (
          <li key={cat._id}>
            {cat.name} - {cat.title}
            <button onClick={() => setSelected(cat)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;