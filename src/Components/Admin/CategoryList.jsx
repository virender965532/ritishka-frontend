import React, { useState, useEffect } from 'react';
import { fetchCategories, deleteCategory } from './../../api/api';
import CategoryForm from './CategoryForm';

const CategoryList = () => {
const [categories, setCategories] = useState([]);
const [selected, setSelected] = useState(null);
const [showCreateForm, setShowCreateForm] = useState(false);

const loadData = () => fetchCategories().then(res => setCategories(res.data));

useEffect(() => { loadData(); }, []);
const handleshowcreateForm = (showCreateForm) => {
  if(showCreateForm){
    setShowCreateForm(true);
  } else {
    setShowCreateForm(false);
    setSelected(null);
  }
}
const handleDelete = async (cat) => {
    await deleteCategory(cat._id)
    fetchCategories().then(res => setCategories(res.data))
}
return (
<>
  <div className='section'>
    <div className='section-header'>
      <div className='section-title'>Categories</div>
      <div className='section-description'>Manage your categories here.</div>
    </div>
    <div className='section-actions'>
      {!showCreateForm && <button onClick={()=> setShowCreateForm(true)}>Add New Category</button>}
      {showCreateForm && <button onClick={()=> setShowCreateForm(false)}>Hide Category Form</button>}
    </div>
  </div>
  <CategoryForm selected={selected} onSave={loadData} showCreateForm={showCreateForm} handleshowcreateForm={handleshowcreateForm}/>
        <table className="category-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
            <tr key={cat?._id}>
              <td>{cat?.name}</td>
              <td>{cat?.title}</td>
              <td>
                <span className={`active-status ${cat?.isactive ? 'bg-green-500' : 'bg-red-500'}`}>
                  {cat?.isactive ? 'Active' : 'Disable'}
                </span>
              </td>
              <td className='action-buttons'>
                <button onClick={() => {
                  setSelected(cat);
                  setShowCreateForm(true);
                }}>Edit</button>
                <button onClick={() => {
                  handleDelete(cat);
                }}>Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
</>
);
};

export default CategoryList;