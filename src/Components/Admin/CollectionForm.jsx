import React, { useState, useEffect } from "react";
import { createCollection, updateCollection } from "./../../api/api";

const CollectionForm = ({ selected, onSave, showCreateForm = false, handleshowcreateForm }) => {
  const [form, setForm] = useState({
    name: "",
    subtitle: "",
    description: "",
    link: "",
    isactive: true,
    showonhomepage: false,
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleCancel = () => {
    setForm({
      name: "",
      subtitle: "",
      description: "",
      link: "",
      isactive: true,
      showonhomepage: false,
    });
    handleshowcreateForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected) {
      await updateCollection(selected._id, form);
    } else {
      await createCollection(form);
    }

    onSave();
    setForm({
      name: "",
      subtitle: "",
      description: "",
      link: "",
      isactive: true,
      showonhomepage: false,
    });
    handleshowcreateForm(false);
  };

  return (
    <>
      {showCreateForm && (
        <div className="collection-form-header collection-grid place-items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selected ? "Edit Collection" : "Add New Collection"}
            </h2>

            <div className="collection-grid collection-grid-cols-1 collection-gap-4">
              <div className="collection-grid collection-grid-cols-2 items-center">
                <label className="font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  className="collection-input border border-gray-300 rounded-md p-2 w-full"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="collection-grid collection-grid-cols-2 items-center">
                <label className="font-medium" htmlFor="subtitle">
                  Subtitle
                </label>
                <input
                  className="collection-input border border-gray-300 rounded-md p-2 w-full"
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleChange}
                  placeholder="Subtitle"
                />
              </div>

              <div className="collection-grid collection-grid-cols-2 items-center">
                <label className="font-medium" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="collection-input border border-gray-300 rounded-md p-2 w-full"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </div>

              <div className="collection-grid collection-grid-cols-2 items-center">
                <label className="font-medium" htmlFor="link">
                  Link
                </label>
                <input
                  className="collection-input border border-gray-300 rounded-md p-2 w-full"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  placeholder="Link"
                />
              </div>

              <div className="collection-grid collection-grid-cols-2 collection-items-center">
                <label className="font-medium" htmlFor="isactive">
                  Active
                </label>
                <input
                  className="w-5 h-5 collection-checkbox"
                  type="checkbox"
                  name="isactive"
                  checked={form.isactive}
                  onChange={handleChange}
                />
              </div>

              <div className="collection-grid collection-grid-cols-2 collection-items-center">
                <label className="font-medium" htmlFor="showonhomepage">
                  Show on Homepage
                </label>
                <input
                  className="w-5 h-5 collection-checkbox"
                  type="checkbox"
                  name="showonhomepage"
                  checked={form.showonhomepage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="collection-flex collection-justify-center collection-gap-4 collection-mt-6">
              <button
                type="submit"
                className="collection-button"
                onClick={(e) => handleSubmit(e)}
              >
                {selected ? "Update" : "Create"} Collection
              </button>
              <button
                type="button"
                className="collection-button collection-bg-red-500"
                onClick={() => handleCancel()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="collection-button collection-bg-grey-500"
                onClick={() =>
                  setForm({
                    name: "",
                    subtitle: "",
                    description: "",
                    link: "",
                    isactive: true,
                    showonhomepage: false,
                  })
                }
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionForm;