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
            <th>Name</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Model Path</th>
            <th>Default Color</th>
            <th>Colors</th>
            <th>Link</th>
            <th>Status</th>
            <th className='category-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {heroSections.map((section, idx) => (
            <tr key={section._id || idx}>
              <td>{truncate(section.name)}</td>
              <td>{truncate(section.title)}</td>
              <td>{truncate(section.subtitle)}</td>
              <td>{truncate(section.modelPath, 30)}</td>
              <td>
                <span style={{background: section.defaultColor, padding: '4px 12px', borderRadius: '6px', color: '#fff'}}>{truncate(section.defaultColor, 12)}</span>
              </td>
              <td>
                {Array.isArray(section.colors) && section.colors.map((color, i) => (
                  <span key={i} style={{background: color, display: 'inline-block', width: 18, height: 18, borderRadius: '50%', marginRight: 4, border: '1px solid #ccc'}}></span>
                ))}
              </td>
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
