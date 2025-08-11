import React, { useState, useEffect, useRef } from "react";
import { fetchSubcategories, deleteSubcategory, fetchCategories } from "./../../api/api";
import SubcategoryForm from "./SubcategoryForm";
import { useSelector } from 'react-redux';
import { getImageUrl } from '../../utils/imageUtils';

function stripHtml(html) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html || "";
  return tmp.textContent || tmp.innerText || "";
}

const SubcategoryList = ({ containerRef }) => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, subcat: null });
  const user = useSelector(state => state.userData?.user);

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res?.data?.categories || []));
  }, []);

  const loadData = () => {
    fetchSubcategories({ page, limit, search })
      .then(res => {
        setSubcategories(res.data.subcategories || []); // support both array and paginated
        setTotalPages(res.data.pages || 1);
        setTotal(res.data.total || (res.data.subcategories ? res.data.subcategories.length : (res.data.length || 0)));
      });
  };

  useEffect(() => {
    loadData();
  }, [page, search]);

  const handleshowcreateForm = (show) => {
    if (show) {
      setShowCreateForm(true);
    } else {
      setShowCreateForm(false);
      setSelected(null);
    }
  };

  const handleDelete = async (subcat) => {
    setConfirmDelete({ show: true, subcat });
  };

  const confirmDeleteSubcategory = async () => {
    await deleteSubcategory(confirmDelete.subcat._id);
    setConfirmDelete({ show: false, subcat: null });
    loadData();
  };

  return (
    <>
      <div className="subcategory-section" ref={containerRef}>
        <div className="subcategory-section-header">
          <div className="subcategory-section-title">Subcategories</div>
          <div className="subcategory-section-description">Manage your subcategories here.</div>
        </div>
        <div className="subcategory-section-actions">
          <input
            className="subcategory-search-input"
            type="text"
            placeholder="Search by subcategory or category name..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ marginRight: '10px' }}
          />
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Subcategory</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Subcategory Form</button>}
        </div>
      </div>
      <SubcategoryForm
        selected={selected}
        onSave={loadData}
        showCreateForm={showCreateForm}
        handleshowcreateForm={handleshowcreateForm}
        user={user}
      />
      <table className="subcategory-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Category</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Updated By</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th className='subcategory-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((subcat) => (
            <tr key={subcat._id}>
              <td>
                {subcat?.image && (
                  <img
                    src={getImageUrl(subcat?.image)}
                    alt={subcat?.name}
                    className="subcategory-image"
                    style={{ width: '80px', height: '80px', borderRadius: '10px' }}
                  />
                )}
              </td>
              <td>{categories.find((cat) => String(cat._id) === String(subcat?.category_id))?.name || "N/A"}</td>
              <td>{subcat?.name || "N/A"}</td>
              <td>{subcat?.slug || "N/A"}</td>
              <td>{subcat?.title || "N/A"}</td>
              <td title={stripHtml(subcat?.description || "")}>
                {stripHtml(subcat?.description || "").length > 50
                  ? `${stripHtml(subcat?.description).substring(0, 50)}...`
                  : stripHtml(subcat?.description || "") || "N/A"}
              </td>
              <td>
                <div className='subcategory-status-indicator'>
                  <span className={`subcategory-active-status ${subcat?.isactive ? 'subcategory-bg-green-500' : 'subcategory-bg-red-500'}`}>
                    {subcat?.isactive ? 'Active' : 'Disable'}
                  </span>
                </div>
              </td>
              <td>{subcat?.createdBy || "N/A"}</td>
              <td>{subcat?.updatedBy || "N/A"}</td>
              <td>
                {subcat?.createdAt && subcat?.createdBy
                  ? new Date(subcat.createdAt).toLocaleString()
                  : "N/A"}
              </td>
              <td>
                {subcat?.updatedAt && subcat.updatedBy
                  ? new Date(subcat.updatedAt).toLocaleString()
                  : "N/A"}
              </td>
              <td className="subcategory-action-buttons">
                <div className='subcategory-action-buttons-container'>
                  <button onClick={() => {
                    setSelected(subcat);
                    setShowCreateForm(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if (containerRef?.current) {
                      containerRef.current.scrollTop = 0;
                    }
                  }}>Edit</button>
                  <button onClick={() => handleDelete(subcat)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="subcategory-pagination-controls" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          className="subcategory-pagination-button"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="subcategory-pagination-info">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              className='subcategory-pagination-button'
              key={i + 1}
              style={{
                margin: '0 2px',
                padding: '4px 8px',
                background: page === i + 1 ? '#a67c52' : '#f0f0f0',
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
          className="subcategory-pagination-button"
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      {/* Delete Confirmation Popup */}
      {confirmDelete.show && (
        <div className="subcategory-popup-overlay">
          <div className="subcategory-popup-content">
            <p className="subcategory-popup-message">Are you sure you want to delete this subcategory?</p>
            <button className='subcategory-popup-button subcategory-popup-button-confirm' onClick={confirmDeleteSubcategory}>Yes, Delete</button>
            <button className='subcategory-popup-button subcategory-popup-button-cancel' onClick={() => setConfirmDelete({ show: false, subcat: null })}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubcategoryList;