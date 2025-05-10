import React, { useState, useEffect } from "react";
import { fetchColors, deleteColor } from "./../../api/api";
import ColorForm from "./ColorForm";

const ColorList = () => {
  const [colors, setColors] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadData = () => fetchColors().then((res) => setColors(res.data));

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

  const handleDelete = async (color) => {
    await deleteColor(color._id);
    loadData();
  };

  return (
    <>
      <div className="color-section">
        <div className="color-section-header">
          <div className="color-section-title">Colors</div>
          <div className="color-section-description">Manage your colors here.</div>
        </div>
        <div className="color-section-actions">
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Color</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Color Form</button>}
        </div>
      </div>
      <ColorForm
        selected={selected}
        onSave={loadData}
        showCreateForm={showCreateForm}
        handleshowcreateForm={handleshowcreateForm}
      />
      <table className="color-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th className='color-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color) => (
            <tr key={color._id}>
              <td>{color.name}</td>
              <td>
                <span className={`color-active-status ${color.isactive ? "color-bg-green-500" : "color-bg-red-500"}`}>
                  {color.isactive ? "Active" : "Disable"}
                </span>
              </td>
              <td className="color-action-buttons">
                <div className='color-action-buttons-container'>
                  <button
                    onClick={() => {
                      setSelected(color);
                      setShowCreateForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(color)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ColorList;