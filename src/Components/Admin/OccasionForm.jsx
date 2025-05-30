import React, { useState, useEffect } from "react";
import { createOccasion, updateOccasion } from "./../../api/api";
import { toast } from "react-hot-toast";

const OccasionForm = ({ selected, onSave, showCreateForm = false, handleshowcreateForm }) => {
  const [form, setForm] = useState({
    name: "",
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
      isactive: true,
      showonhomepage: false,
    });
    handleshowcreateForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var message = "";
      if (selected) {
        await updateOccasion(selected._id, form);
        message = `Category updated successfully!`;
      } else {
        await createOccasion(form);
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
      isactive: true,
      showonhomepage: false,
    });
    handleshowcreateForm(false);
  };

  return (
    <>
      {showCreateForm && (
        <div className="occasion-form-header occasion-grid place-items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selected ? "Edit Occasion" : "Add New Occasion"}
            </h2>

            <div className="occasion-grid occasion-grid-cols-1 occasion-gap-4">
              <div className="occasion-grid occasion-grid-cols-2 items-center">
                <label className="font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  className="occasion-input border border-gray-300 rounded-md p-2 w-full"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="occasion-grid occasion-grid-cols-2 items-center">
                <label className="font-medium" htmlFor="isactive">
                  Active
                </label>
                <input
                  className="occasion-checkbox w-5 h-5"
                  type="checkbox"
                  name="isactive"
                  checked={form.isactive}
                  onChange={handleChange}
                />
              </div>

              <div className="occasion-grid occasion-grid-cols-2 items-center">
                <label className="font-medium" htmlFor="showonhomepage">
                  Show on Homepage
                </label>
                <input
                  className="occasion-checkbox w-5 h-5"
                  type="checkbox"
                  name="showonhomepage"
                  checked={form.showonhomepage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="occasion-flex occasion-justify-center occasion-gap-4 occasion-mt-6">
              <button
                type="submit"
                className="collection-button"
                onClick={(e) => handleSubmit(e)}
              >
                {selected ? "Update" : "Create"} Occasion
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

export default OccasionForm;