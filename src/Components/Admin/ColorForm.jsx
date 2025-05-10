import React, { useState, useEffect } from "react";
import { createColor, updateColor } from "./../../api/api";

const ColorForm = ({ selected, onSave, showCreateForm = false, handleshowcreateForm }) => {
  const [form, setForm] = useState({
    name: "",
    isactive: true,
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
      isactive: true,
    });
    handleshowcreateForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected) {
      await updateColor(selected._id, form);
    } else {
      await createColor(form);
    }

    onSave();
    setForm({
      name: "",
      isactive: true,
    });
    handleshowcreateForm(false);
  };

  return (
    <>
      {showCreateForm && (
        <div className="color-form-header color-grid place-items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selected ? "Edit Color" : "Add New Color"}
            </h2>

            <div className="color-grid color-grid-cols-1 color-gap-4">
              <div className="color-grid color-grid-cols-2 items-center">
                <label className="font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  className="color-input border border-gray-300 rounded-md p-2 w-full"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="color-grid color-grid-cols-2 items-center">
                <label className="font-medium" htmlFor="isactive">
                  Active
                </label>
                <input
                  className="color-checkbox w-5 h-5"
                  type="checkbox"
                  name="isactive"
                  checked={form.isactive}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="color-flex color-justify-center color-gap-4 color-mt-6">
              <button
                type="submit"
                className="collection-button"
                onClick={(e) => handleSubmit(e)}
              >
                {selected ? "Update" : "Create"} Color
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

export default ColorForm;