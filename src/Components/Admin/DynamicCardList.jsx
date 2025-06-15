import React, { useState, useEffect } from 'react';
import DynamicCardForm from './DynamicCardForm';
import { fetchDynamicCards, deleteDynamicCard } from '../../api/api';

const DynamicCardList = () => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadData = () => fetchDynamicCards().then(res => setCards(res.data));

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

  const handleDelete = async (card) => {
    await deleteDynamicCard(card._id);
    loadData();
  };

  // Helper to truncate long text
  const truncate = (text, max = 60) =>
    text && text.length > max ? text.substring(0, max) + '...' : text;

  return (
    <>
      <div className='category-section'>
        <div className='category-section-header'>
          <div className='category-section-title'>Dynamic Cards</div>
          <div className='category-section-description'>Manage your dynamic cards here.</div>
        </div>
        <div className='category-section-actions'>
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Dynamic Card</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Dynamic Card Form</button>}
        </div>
      </div>
      <DynamicCardForm
        selected={selected}
        onSave={handleSave}
        showCreateForm={showCreateForm}
        handleShowCreateForm={handleShowCreateForm}
      />
      <table className="category-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Alt</th>
            <th>Type</th>
            <th>Link</th>
            <th>Status</th>
            <th className='category-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, idx) => (
            <tr key={card._id || idx}>
              <td>
                {card.img && (
                  <img src={`${process.env.REACT_APP_BACKEND_URL}${card.img}`} alt={card.alt} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                )}
              </td>
              <td>{truncate(card.alt)}</td>
              <td>{card.type}</td>
              <td>{truncate(card.link, 30)}</td>
              <td>
                <div className='category-status-indicator'>
                  <span className={`category-active-status ${card.isactive ? 'category-bg-green-500' : 'category-bg-red-500'}`}>
                    {card.isactive ? 'Active' : 'Disable'}
                  </span>
                </div>
              </td>
              <td className='category-action-buttons'>
                <div className='category-action-buttons-container'>
                  <button onClick={() => { setSelected(card); setShowCreateForm(true); }}>Edit</button>
                  <button onClick={() => handleDelete(card)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DynamicCardList;
