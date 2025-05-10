import React, { useState, useEffect } from "react";
import { fetchCollections, deleteCollection } from "./../../api/api";
import CollectionForm from "./CollectionForm";

const CollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadData = () => fetchCollections().then((res) => setCollections(res.data));

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

  const handleDelete = async (collection) => {
    await deleteCollection(collection?._id);
    loadData();
  };

  return (
    <>
      <div className="collection-section">
        <div className="collection-section-header">
          <div className="collection-section-title">Collections</div>
          <div className="collection-section-description">Manage your collections here.</div>
        </div>
        <div className="collection-section-actions">
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Collection</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Collection Form</button>}
        </div>
      </div>
      <CollectionForm
        selected={selected}
        onSave={loadData}
        showCreateForm={showCreateForm}
        handleshowcreateForm={handleshowcreateForm}
      />
      <table className="collection-collection-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Show on Homepage</th>
            <th className='collection-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <tr key={collection?._id}>
              <td>{collection?.name}</td>
              <td>
                <span className={`collection-active-status ${collection?.isactive ? "collection-bg-green-500" : "collection-bg-red-500"}`}>
                  {collection?.isactive ? "Active" : "Disable"}
                </span>
              </td>
              <td>
                <span className={`collection-showonhomepage ${collection?.showonhomepage ? "collection-bg-green-500" : "collection-bg-red-500"}`}>
                  {collection?.showonhomepage ? "Show" : "Hidden"}
                </span>
              </td>
              <td className="collection-action-buttons">
                <div className='collection-action-buttons-container'>
                  <button
                    onClick={() => {
                      setSelected(collection);
                      setShowCreateForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(collection)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CollectionList;