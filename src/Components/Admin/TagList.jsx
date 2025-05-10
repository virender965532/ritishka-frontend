import React, { useState, useEffect } from "react";
import { fetchTags, deleteTag } from "./../../api/api";
import TagForm from "./TagForm";

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadData = () => fetchTags().then((res) => setTags(res.data));

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

  const handleDelete = async (tag) => {
    await deleteTag(tag?._id);
    loadData();
  };

  return (
    <>
      <div className="tag-section">
        <div className="tag-section-header">
          <div className="tag-section-title">Tags</div>
          <div className="tag-section-description">Manage your tags here.</div>
        </div>
        <div className="tag-section-actions">
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Tag</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Tag Form</button>}
        </div>
      </div>
      <TagForm
        selected={selected}
        onSave={loadData}
        showCreateForm={showCreateForm}
        handleshowcreateForm={handleshowcreateForm}
      />
      <table className="tag-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Show on Homepage</th>
            <th className='tag-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag?._id}>
              <td>{tag?.name}</td>
              <td>
                <span className={`tag-active-status ${tag?.isactive ? "tag-bg-green-500" : "tag-bg-red-500"}`}>
                  {tag?.isactive ? "Active" : "Disable"}
                </span>
              </td>
              <td>
                <span className={`tag-homepage-status ${tag?.showonhomepage ? "tag-bg-green-500" : "tag-bg-red-500"}`}>
                  {tag?.showonhomepage ? "Show" : "Hidden"}
                </span>
              </td>
              <td className="tag-action-buttons">
                <div className='collection-action-buttons-container'>
                  <button
                    onClick={() => {
                      setSelected(tag);
                      setShowCreateForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(tag)}>Delete</button>
                  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TagList;