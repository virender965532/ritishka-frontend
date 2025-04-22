import React, { useState, useEffect } from 'react';
import { fetchSubcategories } from './../../api/api';
import SubcategoryForm from './SubcategoryForm';

const SubcategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadData = () => fetchSubcategories().then(res => setSubcategories(res.data));

  useEffect(() => { loadData(); }, []);

  return (
    <div>
      <h2>Subcategories</h2>
      <button onClick={() => setSelected(null)}>Add New Subcategory</button>
      <SubcategoryForm selected={selected} onSave={loadData} />
      <ul>
        {subcategories.map(sub => (
          <li key={sub._id}>
            {sub.name} - {sub.title}
            <button onClick={() => setSelected(sub)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategoryList;