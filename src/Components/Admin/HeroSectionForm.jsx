import React, { useState, useEffect } from "react";
import { createHeroSection, updateHeroSection } from "../../api/api";
import { toast } from "react-hot-toast";

const defaultForm = {
  name: "",
  title: "",
  subtitle: "",
  modelPath: "",
  defaultColor: "",
  colors: [],
  link: "",
  isactive: true
};

const HeroSectionForm = ({ selected, onSave, showCreateForm = false, handleShowCreateForm }) => {
  const [form, setForm] = useState(defaultForm);
  const [colorInput, setColorInput] = useState("");

  useEffect(() => {
    if (selected) setForm(selected);
    else setForm(defaultForm);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleColorAdd = () => {
    if (colorInput && !form.colors.includes(colorInput)) {
      setForm({ ...form, colors: [...form.colors, colorInput] });
      setColorInput("");
    }
  };

  const handleColorRemove = (color) => {
    setForm({ ...form, colors: form.colors.filter((c) => c !== color) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      title: form.title,
      subtitle: form.subtitle,
      modelPath: form.modelPath,
      defaultColor: form.defaultColor,
      colors: form.colors,
      link: form.link,
      isactive: form.isactive
    };
    try {
      let message = "";
      if (selected && selected._id) {
        await updateHeroSection(selected._id, data);
        message = `Hero Section updated successfully!`;
      } else {
        await createHeroSection(data);
        message = `Hero Section created successfully!`;
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
          "An error occurred while saving the Hero Section.",
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
    handleShowCreateForm(false);
  };

  const handleCancel = () => {
    setForm(defaultForm);
    handleShowCreateForm(false);
  };

  return (
    <>
      {showCreateForm && (
        <div className="category-form-header category-grid place-items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selected ? "Edit Hero Section" : "Add New Hero Section"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="category-grid category-grid-cols-1 category-gap-4">
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label" htmlFor="name">Name</label>
                  <input className="category-input" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
                </div>
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label" htmlFor="title">Title</label>
                  <input className="category-input" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
                </div>
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label" htmlFor="subtitle">Subtitle</label>
                  <input className="category-input" name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Subtitle" required />
                </div>
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label" htmlFor="modelPath">Model Path</label>
                  <input className="category-input" name="modelPath" value={form.modelPath} onChange={handleChange} placeholder="/shirt_baked_2.glb" required />
                </div>
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label" htmlFor="defaultColor">Default Color</label>
                  <input className="category-input" name="defaultColor" value={form.defaultColor} onChange={handleChange} placeholder="#353933" required />
                </div>
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label">Colors</label>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                    <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                      {form.colors.map((color, idx) => (
                        <span key={idx} style={{background: color, color: '#fff', padding: '4px 10px', borderRadius: 6, marginRight: 4, display: 'flex', alignItems: 'center'}}>
                          {color}
                          <button type="button" style={{marginLeft: 6, background: 'none', border: 'none', color: '#c82333', cursor: 'pointer'}} onClick={() => handleColorRemove(color)}>x</button>
                        </span>
                      ))}
                    </div>
                    <div style={{display: 'flex', gap: 8}}>
                      <input className="category-input" value={colorInput} onChange={e => setColorInput(e.target.value)} placeholder="#color or color name" />
                      <button type="button" className="category-button" onClick={handleColorAdd}>Add</button>
                    </div>
                  </div>
                </div>
                <div className="category-grid category-grid-cols-2 category-items-center">
                  <label className="category-label" htmlFor="link">Link</label>
                  <input className="category-input" name="link" value={form.link} onChange={handleChange} placeholder="/shop" required />
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
                  {selected ? "Update" : "Create"} Hero Section
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

export default HeroSectionForm;
