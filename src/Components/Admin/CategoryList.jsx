import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'; // Add this import
import { fetchCategories, deleteCategory } from './../../api/api';
import CategoryForm from './CategoryForm';
import { useSelector } from 'react-redux';

const CategoryList = ({ containerRef }) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, cat: null });
  const user = useSelector(state => state.userData?.user);
  const categorySectionRef = useRef(null);

  const loadData = () => {
    fetchCategories({ page, limit, search })
      .then(res => {
        setCategories(res.data.categories);
        setTotalPages(res.data.pages);
        setTotal(res.data.total);
      });
  };

  useEffect(() => {
    loadData();
  }, [page, search]);

  const handleshowcreateForm = (showCreateForm) => {
    if (showCreateForm) {
      setShowCreateForm(true);
    } else {
      setShowCreateForm(false);
      setSelected(null);
    }
  };

  const handleDelete = async (cat) => {
    setConfirmDelete({ show: true, cat });
  };

  const confirmDeleteCategory = async () => {
    await deleteCategory(confirmDelete.cat._id);
    setConfirmDelete({ show: false, cat: null });
    loadData();
  };

  return (
    <>
      <div className='category-section' ref={categorySectionRef}>
        <div className='category-section-header'>
          <div className='category-section-title'>Categories</div>
          <div className='category-section-description'>Manage your categories here.</div>
        </div>
        <div className='category-section-actions'>
          <input
            className='category-search-input'
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ marginRight: '10px' }}
          />
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Category</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Category Form</button>}
        </div>
      </div>
      <CategoryForm
        selected={selected}
        onSave={loadData}
        showCreateForm={showCreateForm}
        handleshowcreateForm={handleshowcreateForm}
        user={user}
      />
      <table className="category-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Updated By</th>
            <th>Created At</th>
            <th>Updated At</th>
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
              <td>{cat?.slug || "N/A"}</td>
              <td>{cat?.title || "N/A"}</td>
              <td title={cat?.description || ""}>{cat?.description?.length > 50 ? `${cat?.description.substring(0, 50)}...` : cat?.description || "N/A"}</td>
              <td>
                <div className='category-status-indicator'>
                  <span className={`category-active-status ${cat?.isactive ? 'category-bg-green-500' : 'category-bg-red-500'}`}>
                    {cat?.isactive ? 'Active' : 'Disable'}
                  </span>
                </div>
              </td>
              <td>{cat?.createdBy || "N/A"}</td>
              <td>{cat?.updatedBy || "N/A"}</td>
              <td>
                {cat?.createdAt && cat?.createdBy
                  ? moment(cat.createdAt).format('YYYY-MM-DD HH:mm:ss')
                  : "N/A"}
              </td>
              <td>
                {cat?.updatedAt && cat.updatedBy
                  ? moment(cat.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                  : "N/A"}
              </td>
              <td className='category-action-buttons'>
                <div className='category-action-buttons-container'>
                  <button
                    onClick={() => {
                      setSelected(cat);
                      setShowCreateForm(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      if (containerRef?.current) {
                        containerRef.current.scrollTop = 0;
                      }
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="category-pagination-controls" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          className="category-pagination-button"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="category-pagination-info">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
            className='category-pagination-button'
              key={i + 1}
              style={{
                margin: '0 2px',
                padding: '4px 8px',
                background: page === i + 1 ? '#007bff' : '#f0f0f0',
                color: page === i + 1 ? '#fff' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: page === i + 1 ? 'bold' : 'normal'
              }}
              onClick={() => setPage(i + 1)}
              disabled={page === i + 1}
            >
              {i + 1}
            </button>
          ))}
          &nbsp;({total} results)
        </span>
        <button
          className="category-pagination-button"
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      {/* Delete Confirmation Popup */}
      {confirmDelete.show && (
        <div className="category-popup-overlay">
          <div className="category-popup-content">
            <p className="category-popup-message">Are you sure you want to delete this category?</p>
            <button className='category-popup-button category-popup-button-confirm' onClick={confirmDeleteCategory}>Yes, Delete</button>
            <button className='category-popup-button category-popup-button-cancel' onClick={() => setConfirmDelete({ show: false, cat: null })}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryList;