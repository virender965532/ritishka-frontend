import React, { useState, useEffect } from "react";
import { createTag, updateTag } from "./../../api/api";
import { toast } from "react-hot-toast";

const TagForm = ({ selected, onSave, showCreateForm = false, handleshowcreateForm }) => {
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
        await updateTag(selected._id, form);
        message = `Category updated successfully!`;
      } else {
        await createTag(form);
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
        <div className="tag-form-header tag-grid tag-place-items-center tag-min-h-screen tag-bg-gray-100">
          <div className="tag-bg-white tag-p-8 tag-rounded-lg tag-shadow-md tag-w-full tag-max-w-lg">
            <h2 className="tag-text-2xl tag-font-bold tag-mb-6 tag-text-center">
              {selected ? "Edit Tag" : "Add New Tag"}
            </h2>

            <div className="tag-grid tag-grid-cols-1 tag-gap-4">
              <div className="tag-grid tag-grid-cols-2 tag-items-center">
                <label className="tag-font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  className="tag-input tag-border tag-border-gray-300 tag-rounded-md tag-p-2 tag-w-full"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>

              <div className="tag-grid tag-grid-cols-2 tag-items-center">
                <label className="tag-font-medium" htmlFor="isactive">
                  Active
                </label>
                <input
                  className="tag-checkbox tag-w-5 tag-h-5"
                  type="checkbox"
                  name="isactive"
                  checked={form.isactive}
                  onChange={handleChange}
                />
              </div>

              <div className="tag-grid tag-grid-cols-2 tag-items-center">
                <label className="tag-font-medium" htmlFor="showonhomepage">
                  Show on Homepage
                </label>
                <input
                  className="tag-checkbox tag-w-5 tag-h-5"
                  type="checkbox"
                  name="showonhomepage"
                  checked={form?.showonhomepage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="tag-flex tag-justify-center tag-gap-4 tag-mt-6">
              <button
                type="submit"
                className="tag-button tag-bg-blue-500 tag-text-white tag-px-4 tag-py-2 tag-rounded-md hover:tag-bg-blue-600"
                onClick={(e) => handleSubmit(e)}
              >
                {selected ? "Update" : "Create"} Tag
              </button>
              <button
                type="button"
                className="tag-button tag-bg-red-500 tag-text-white tag-px-4 tag-py-2 tag-rounded-md hover:tag-bg-gray-600"
                onClick={() => handleCancel()}
              >
                Cancel
              </button>
              <button
                type="button"
                className="tag-button tag-bg-grey-500 tag-text-white tag-px-4 tag-py-2 tag-rounded-md hover:tag-bg-red-600"
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

export default TagForm;