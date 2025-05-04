import React, { useState, useEffect } from "react";
import { createCategory, updateCategory } from "./../../api/api";

const CategoryForm = ({ selected, onSave, showCreateForm = false, handleshowcreateForm }) => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    image: null, // Change to handle file input
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

    if (selected) {
      await updateCategory(selected._id, formData);
    } else {
      await createCategory(formData);
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
        <div className="form-header grid place-items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selected ? "Edit Category" : "Add New Category"}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 items-center">
                <label className="font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 items-center">
                <label className="font-medium" htmlFor="title">
                  Title
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 items-center">
                <label className="font-medium" htmlFor="image">
                  Image
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 w-full"
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 items-center">
                <label className="font-medium" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="border border-gray-300 rounded-md p-2 w-full"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 items-center">
                <label className="font-medium" htmlFor="isactive">
                  Active
                </label>
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  name="isactive"
                  checked={form.isactive}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={(e) => handleSubmit(e)}
              >
                {selected ? "Update" : "Create"} Category
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => handleCancel()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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