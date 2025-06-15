import React, { useState, useEffect } from 'react';
import { fetchCategories, deleteCategory } from './../../api/api';
import CategoryForm from './CategoryForm';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadData = () => fetchCategories().then(res => setCategories(res.data));

  useEffect(() => {
    loadData();
  }, []);

  const handleshowcreateForm = (showCreateForm) => {
    if (showCreateForm) {
      setShowCreateForm(true);
    } else {
      setShowCreateForm(false);
      setSelected(null);
    }
  };

  const handleDelete = async (cat) => {
    await deleteCategory(cat._id);
    fetchCategories().then(res => setCategories(res.data));
  };

  return (
    <>
      <div className='category-section'>
        <div className='category-section-header'>
          <div className='category-section-title'>Categories</div>
          <div className='category-section-description'>Manage your categories here.</div>
        </div>
        <div className='category-section-actions'>
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Category</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Category Form</button>}
        </div>
      </div>
      <CategoryForm
        selected={selected}
        onSave={loadData}
        showCreateForm={showCreateForm}
        handleshowcreateForm={handleshowcreateForm}
      />
      <table className="category-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th className='category-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat?._id}>
              <td>
                {cat?.image && (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}${cat?.image}`}
                    alt={cat?.name}
                    className="category-image"
                    style={{ width: '80px', height: '80px', borderRadius: '10px' }}
                  />
                )}
              </td>
              <td>{cat?.name || "N/A"}</td>
              <td>{cat?.title || "N/A"}</td>
              <td>{cat?.description?.length > 200 ? `${cat?.description.substring(0, 200)}...` : cat?.description || "N/A"}</td>
              <td>
                <div className='category-status-indicator'>
                  <span className={`category-active-status ${cat?.isactive ? 'category-bg-green-500' : 'category-bg-red-500'}`}>
                    {cat?.isactive ? 'Active' : 'Disable'}
                  </span>
                </div>
              </td>
              <td className='category-action-buttons'>
                <div className='category-action-buttons-container'>
                  <button
                    onClick={() => {
                      setSelected(cat);
                      setShowCreateForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(cat);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CategoryList;