import React, { useState, useEffect } from "react";
import { createDynamicCard, updateDynamicCard } from "../../api/api";
import { toast } from "react-hot-toast";

const defaultForm = {
  link: "",
  img: "",
  alt: "",
  type: "main",
  isactive: true
};

const DynamicCardForm = ({ selected, onSave, showCreateForm = false, handleShowCreateForm }) => {
  const [form, setForm] = useState(defaultForm);
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    if (selected) setForm(selected);
    else setForm(defaultForm);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("link", form.link);
    data.append("alt", form.alt);
    data.append("type", form.type);
    data.append("isactive", form.isactive);
    if (imgFile) data.append("img", imgFile);
    try {
      let message = "";
      if (selected && selected._id) {
        await updateDynamicCard(selected._id, data);
        message = `Dynamic Card updated successfully!`;
      } else {
        await createDynamicCard(data);
        message = `Dynamic Card created successfully!`;
      }
      toast.success(`${message}`, {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "An error occurred while saving the Dynamic Card.",
        {
          duration: 2000,
          style: {
            backgroundColor: "#ff4b4b",
            color: "white",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ff4b4b",
          },
        }
      );
      return;
    }
    onSave();
    setForm(defaultForm);
    setImgFile(null);
    handleShowCreateForm(false);
  };

  const handleCancel = () => {
    setForm(defaultForm);
    setImgFile(null);
    handleShowCreateForm(false);
  };

  return (
    <>
      {showCreateForm && (
        <div className="category-form-header category-grid place-items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selected ? "Edit Dynamic Card" : "Add New Dynamic Card"}
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="category-grid category-grid-cols-1 category-gap-4">
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label" htmlFor="link">Link</label>
                  <input className="category-input" name="link" value={form.link} onChange={handleChange} placeholder="/shop" required />
                </div>
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label" htmlFor="img">Image</label>
                  <input className="category-input" type="file" name="img" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label" htmlFor="alt">Alt Text</label>
                  <input className="category-input" name="alt" value={form.alt} onChange={handleChange} placeholder="Alt text" required />
                </div>
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label" htmlFor="type">Type</label>
                  <select className="category-input" name="type" value={form.type} onChange={handleChange} required>
                    <option value="main">Main</option>
                    <option value="side">Side</option>
                  </select>
                </div>
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label" htmlFor="isactive">Active</label>
                  <input
                    className="category-checkbox"
                    type="checkbox"
                    name="isactive"
                    checked={form.isactive}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="category-flex category-justify-center category-gap-4 category-mt-6">
                <button type="submit" className="category-button">
                  {selected ? "Update" : "Create"} Dynamic Card
                </button>
                <button type="button" className="category-button category-bg-red-500" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="button" className="category-button category-bg-grey-500" onClick={() => setForm(defaultForm)}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicCardForm;
