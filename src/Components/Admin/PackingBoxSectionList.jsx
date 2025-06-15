import React, { useState, useEffect } from 'react';
import PackingBoxSectionForm from './PackingBoxSectionForm';
import { fetchPackingBoxSections, deletePackingBoxSection } from '../../api/api';

const PackingBoxSectionList = () => {
  const [sections, setSections] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadData = () => fetchPackingBoxSections().then(res => setSections(res.data));

  useEffect(() => {
    loadData();
  }, []);

  const handleShowCreateForm = (show) => {
    if (show) {
      setShowCreateForm(true);
    } else {
      setShowCreateForm(false);
      setSelected(null);
    }
  };

  const handleSave = () => {
    loadData();
    setShowCreateForm(false);
    setSelected(null);
  };

  const handleDelete = async (section) => {
    await deletePackingBoxSection(section._id);
    loadData();
  };

  // Helper to truncate long text
  const truncate = (text, max = 60) =>
    text && text.length > max ? text.substring(0, max) + '...' : text;

  return (
    <>
      <div className='category-section'>
        <div className='category-section-header'>
          <div className='category-section-title'>Packing Box Sections</div>
          <div className='category-section-description'>Manage your packing box sections here.</div>
        </div>
        <div className='category-section-actions'>
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Packing Box Section</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Packing Box Section Form</button>}
        </div>
      </div>
      <PackingBoxSectionForm
        selected={selected}
        onSave={handleSave}
        showCreateForm={showCreateForm}
        handleShowCreateForm={handleShowCreateForm}
      />
      <table className="category-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Alt</th>
            <th>Link</th>
            <th>Status</th>
            <th className='category-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section, idx) => (
            <tr key={section._id || idx}>
              <td>
                {section.img && (
                  <img src={`${process.env.REACT_APP_BACKEND_URL}${section.img}`} alt={section.alt} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                )}
              </td>
              <td>{truncate(section.title)}</td>
              <td>{truncate(section.desc)}</td>
              <td>{truncate(section.alt)}</td>
              <td>{truncate(section.link, 30)}</td>
              <td>
                <div className='category-status-indicator'>
                  <span className={`category-active-status ${section.isactive ? 'category-bg-green-500' : 'category-bg-red-500'}`}>
                    {section.isactive ? 'Active' : 'Disable'}
                  </span>
                </div>
              </td>
              <td className='category-action-buttons'>
                <div className='category-action-buttons-container'>
                  <button onClick={() => { setSelected(section); setShowCreateForm(true); }}>Edit</button>
                  <button onClick={() => handleDelete(section)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PackingBoxSectionList;
