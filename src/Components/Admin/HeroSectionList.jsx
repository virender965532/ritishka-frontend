import React, { useState, useEffect } from 'react';
import HeroSectionForm from './HeroSectionForm';
import { fetchHeroSections, deleteHeroSection } from '../../api/api';

const HeroSectionList = () => {
  const [heroSections, setHeroSections] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadData = () => fetchHeroSections().then(res => setHeroSections(res.data));

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
    await deleteHeroSection(section._id);
    loadData();
  };

  // Helper to truncate long text
  const truncate = (text, max = 60) =>
    text && text.length > max ? text.substring(0, max) + '...' : text;

  return (
    <>
      <div className='category-section'>
        <div className='category-section-header'>
          <div className='category-section-title'>Hero Sections</div>
          <div className='category-section-description'>Manage your hero sections here.</div>
        </div>
        <div className='category-section-actions'>
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Hero Section</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Hero Section Form</button>}
        </div>
      </div>
      <HeroSectionForm
        selected={selected}
        onSave={handleSave}
        showCreateForm={showCreateForm}
        handleShowCreateForm={handleShowCreateForm}
      />
      <table className="category-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Link</th>
            <th>Status</th>
            <th className='category-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {heroSections.map((section, idx) => (
            <tr key={section._id || idx}>
              <td>
                {section.image && (
                  <img src={`${process.env.REACT_APP_BACKEND_URL}${section.image}`} alt={section.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                )}
              </td>
              <td>{truncate(section.name)}</td>
              <td>{truncate(section.title)}</td>
              <td>{truncate(section.subtitle)}</td>
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

export default HeroSectionList;
