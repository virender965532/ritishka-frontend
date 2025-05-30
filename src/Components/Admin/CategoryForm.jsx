import React, { useState, useEffect } from "react";
import { createCategory, updateCategory } from "./../../api/api";
import { toast } from "react-hot-toast";

const CategoryForm = ({ selected, onSave, showCreateForm = false, handleshowcreateForm }) => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    image: null,
    isactive: true,
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : files ? files[0] : value });
  };

  const handleCancel = () => {
    setForm({
      name: "",
      title: "",
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

    try {
      var message = "";
      if (selected) {
        await updateCategory(selected._id, formData);
        message = `Category updated successfully!`;
      } else {
        await createCategory(formData);
        message = `Category created successfully!`;
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
          "An error occurred while saving the Category.",
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
      description: "",
      image: null,
      isactive: true,
    });
    handleshowcreateForm(false);
  };

  return (
    <>
      {showCreateForm && (
        <div className="category-form-header category-grid place-items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selected ? "Edit Category" : "Add New Category"}
            </h2>

            <div className="category-grid category-grid-cols-1 category-gap-4">
              <div className="category-grid category-grid-cols-2 category-items-center">
                <label className="category-label" htmlFor="name">
                  Name
                </label>
                <input
                  className="category-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="category-grid category-grid-cols-2 category-items-center">
                <label className="category-label" htmlFor="title">
                  Title
                </label>
                <input
                  className="category-input"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                />
              </div>

              <div className="category-grid category-grid-cols-2 category-items-center">
                <label className="category-label" htmlFor="image">
                  Image
                </label>
                <input
                  className="category-input"
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
              </div>

              <div className="category-grid category-grid-cols-2 category-items-center">
                <label className="category-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="category-textarea"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                ></textarea>
              </div>

              <div className="category-grid category-grid-cols-2 category-items-center">
                <label className="category-label" htmlFor="isactive">
                  Active
                </label>
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
              <button
                type="submit"
                className="category-button"
                onClick={(e) => handleSubmit(e)}
              >
                {selected ? "Update" : "Create"} Category
              </button>
              <button
                type="button"
                className="category-button category-bg-red-500"
                onClick={() => handleCancel()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="category-button category-bg-grey-500"
                onClick={() =>
                  setForm({
                    name: "",
                    title: "",
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

export default CategoryForm;