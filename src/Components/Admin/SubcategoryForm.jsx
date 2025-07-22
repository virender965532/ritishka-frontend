import React, { useState, useEffect } from "react";
import { createSubcategory, updateSubcategory, fetchCategories } from "./../../api/api";
import { toast } from "react-hot-toast";

const SubcategoryForm = ({ selected, onSave, showCreateForm = false, handleshowcreateForm, user }) => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    category: "",
    description: "",
    image: null,
    isactive: true,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (selected) setForm({ ...selected, category: selected.category_id });
    fetchCategories().then((res) => setCategories(res?.data?.categories || []));
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : files ? files[0] : value });
  };

  const handleCancel = () => {
    setForm({
      name: "",
      title: "",
      category: "",
      description: "",
      image: null,
      isactive: true,
    });
    handleshowcreateForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("isactive", form.isactive);
    if (form.image) formData.append("image", form.image);
    if (form.category) formData.append("category_id", form.category);
    if (user?._id) formData.append("userId", user._id);

    try {
      var message = "";
      if (selected) {
        await updateSubcategory(selected._id, formData);
        message = `Subcategory updated successfully!`;
      } else {
        await createSubcategory(formData);
        message = `Subcategory created successfully!`;
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
          "An error occurred while saving the Subcategory.",
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
    setForm({
      name: "",
      title: "",
      category: "",
      description: "",
      image: null,
      isactive: true,
    });
    handleshowcreateForm(false);
  };

  return (
    <>
      {showCreateForm && (
        <div className="subcategory-form-header">
          <div>
            <h2>
              {selected ? "Edit Subcategory" : "Add New Subcategory"}
            </h2>

            <div className="subcategory-grid subcategory-grid-cols-1 subcategory-gap-4">
              <div className="subcategory-grid subcategory-grid-cols-2 subcategory-items-center subcategory-select-category-container">
                <label className="subcategory-select-category-label" htmlFor="category">
                  Select Category
                </label>
                <select
                  className="subcategory-select-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="subcategory-grid subcategory-grid-cols-2 subcategory-items-center">
                <label className="subcategory-label" htmlFor="name">
                  Subcategory Name
                </label>
                <input
                  className="subcategory-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Subcategory Name"
                  required
                />
              </div>

              <div className="subcategory-grid subcategory-grid-cols-2 subcategory-items-center">
                <label className="subcategory-label" htmlFor="title">
                  Title
                </label>
                <input
                  className="subcategory-input"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                />
              </div>    

              <div className="subcategory-grid subcategory-grid-cols-2 subcategory-items-center">
                <label className="subcategory-label" htmlFor="image">
                  Image
                </label>
                <input
                  className="subcategory-input"
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
              </div>

              <div className="subcategory-grid subcategory-grid-cols-2 subcategory-items-center">
                <label className="subcategory-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="subcategory-textarea"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                ></textarea>
              </div>

              <div className="subcategory-grid subcategory-grid-cols-2 subcategory-items-center">
                <label className="subcategory-label" htmlFor="isactive">
                  Active
                </label>
                <input
                  className="subcategory-checkbox"
                  type="checkbox"
                  name="isactive"
                  checked={form.isactive}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="subcategory-flex subcategory-justify-center subcategory-gap-4 subcategory-mt-6">
              <button
                type="submit"
                className="subcategory-button"
                onClick={(e) => handleSubmit(e)}
              >
                {selected ? "Update" : "Create"} Subcategory
              </button>
              <button
                type="button"
                className="subcategory-button bg-red-500"
                onClick={() => handleCancel()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="subcategory-button bg-grey-500"
                onClick={() =>
                  setForm({
                    name: "",
                    title: "",
                    category: "",
                    description: "",
                    image: null,
                    isactive: true,
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

export default SubcategoryForm;