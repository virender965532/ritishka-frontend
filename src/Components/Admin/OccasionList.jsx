import React, { useState, useEffect } from "react";
import { fetchOccasions, deleteOccasion } from "./../../api/api";
import OccasionForm from "./OccasionForm";

const OccasionList = () => {
  const [occasions, setOccasions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadData = () => fetchOccasions().then((res) => setOccasions(res.data));

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

  const handleDelete = async (occasion) => {
    await deleteOccasion(occasion._id);
    loadData();
  };

  return (
    <>
      <div className="occasion-section">
        <div className="occasion-section-header">
          <div className="occasion-section-title">Occasions</div>
          <div className="occasion-section-description">Manage your occasions here.</div>
        </div>
        <div className="occasion-section-actions">
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Occasion</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Occasion Form</button>}
        </div>
      </div>
      <OccasionForm
        selected={selected}
        onSave={loadData}
        showCreateForm={showCreateForm}
        handleshowcreateForm={handleshowcreateForm}
      />
      <table className="occasion-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Show on Homepage</th>
            <th className='occasion-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {occasions.map((occasion) => (
            <tr key={occasion._id}>
              <td>{occasion.name}</td>
              <td>
                <span className={`occasion-active-status ${occasion.isactive ? "occasion-bg-green-500" : "occasion-bg-red-500"}`}>
                  {occasion.isactive ? "Active" : "Disable"}
                </span>
              </td>
              <td>
                <span className={`tag-homepage-status ${occasion?.showonhomepage ? "tag-bg-green-500" : "tag-bg-red-500"}`}>
                  {occasion?.showonhomepage ? "Show" : "Hidden"}
                </span>
              </td>
              <td className="occasion-action-buttons">
                <div className='color-action-buttons-container'>
                  <button
                    onClick={() => {
                      setSelected(occasion);
                      setShowCreateForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(occasion)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OccasionList;