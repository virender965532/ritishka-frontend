import React, { useState, useEffect } from "react";
import { fetchSubcategories, deleteSubcategory, fetchCategories } from "./../../api/api";
import SubcategoryForm from "./SubcategoryForm";

const SubcategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data));
  }, []);

  const loadData = () => fetchSubcategories().then((res) => setSubcategories(res.data));

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

  const handleDelete = async (subcat) => {
    await deleteSubcategory(subcat._id);
    loadData();
  };

  return (
    <>
      <div className="subcategory-section">
        <div className="subcategory-section-header">
          <div className="subcategory-section-title">Subcategories</div>
          <div className="subcategory-section-description">Manage your subcategories here.</div>
        </div>
        <div className="subcategory-section-actions">
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Subcategory</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Subcategory Form</button>}
        </div>
      </div>
      <SubcategoryForm
        selected={selected}
        onSave={loadData}
        showCreateForm={showCreateForm}
        handleshowcreateForm={handleshowcreateForm}
      />
      <table className="subcategory-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Category</th>
            <th>Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th className='subcategory-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((subcat) => (
            <tr key={subcat._id}>
              <td>{subcat?.image && (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}${subcat?.image}`} // Use the image path from the backend
                    alt={subcat?.name}
                    className="subcategory-image"    
                    style={{ width: '50px', height: '50px', borderRadius: '10px' }}
                  />
                )}
              </td>
              <td>{categories.find((cat) => String(cat._id) === String(subcat?.category_id))?.name || "N/A"}</td>
              <td>{subcat?.name || "N/A"}</td>
              <td>{subcat?.title || "N/A"}</td>
              <td>{subcat?.description || "N/A"}</td>
              <td>
                <div className='subcategory-status-indicator'>
                  <span className={`subcategory-active-status ${subcat?.isactive ? 'subcategory-bg-green-500' : 'subcategory-bg-red-500'}`}>
                  {subcat?.isactive ? 'Active' : 'Disable'}
                  </span>
                </div>
              </td>
              <td className="subcategory-action-buttons">
                <div className='subcategory-action-buttons-container'>
                  <button onClick={() => {
                        setSelected(subcat);
                        setShowCreateForm(true);
                      }}>Edit</button>
                  <button onClick={() => handleDelete(subcat)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SubcategoryList;