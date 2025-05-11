import React, { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct,
  // fetchCategories,
  fetchSubcategories,
  fetchTags,
  fetchCollections,
  fetchOccasions,
  fetchColors,
} from "./../../api/api";

const ProductForm = ({ selected, onSave, showCreateForm = false, handleshowcreateForm }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    discount: "",
    color: "",
    description: "",
    quantity: "",
    subcategory: "",
    tags: [],
    images: [],
    collection: "",
    occasion: "",
    showOnHomepage: false,
    isLatest: false,
    hotSeller: false,
    isTrending: false,
    showInGallery: false,
    isactive: true,
    isfeatured: false,
  });

  // const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [collections, setCollections] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [subcatRes, tagRes, collectionRes, occasionRes, colorRes] = await Promise.all([
        // fetchCategories(),
        fetchSubcategories(),
        fetchTags(),
        fetchCollections(),
        fetchOccasions(),
        fetchColors(),
      ]);
      // setCategories(catRes.data);
      setSubcategories(subcatRes.data);
      setTags(tagRes.data);
      setCollections(collectionRes.data);
      setOccasions(occasionRes.data);
      setColors(colorRes.data);
    };

    loadData();
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "images") {
      const uploadedImages = Array.from(files);
      if (uploadedImages.length + form.images.length > 6) {
        alert("You can upload a maximum of 6 images.");
        return;
      }
      setForm({ ...form, images: [...form.images, ...uploadedImages] });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "images") {
        form.images.forEach((image) => formData.append("images", image));
      } else {
        formData.append(key, form[key]);
      }
    });

    if (selected) {
      await updateProduct(selected._id, formData);
    } else {
      await createProduct(formData);
    }

    onSave();
    setForm({
      title: "",
      price: "",
      discount: "",
      color: "",
      description: "",
      quantity: "",
      subcategory: "",
      tags: [],
      images: [],
      collection: "",
      occasion: "",
      showOnHomepage: false,
      isLatest: false,
      hotSeller: false,
      isTrending: false,
      showInGallery: false,
      isActive: true,
      isfeatured: false,
    });
    handleshowcreateForm(false);
  };

  return (
    <>
      {showCreateForm && (
        <div className="product-form-header product-grid place-items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {selected ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="product-grid product-grid-cols-1 product-gap-4">
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="title">Title</label>
                  <input className="product-input" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="price">Price(in Rs)</label>
                  <input className="product-input" type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="discount">Discount(in %)</label>
                  <input className="product-input" type="number" name="discount" value={form.discount} onChange={handleChange} placeholder="Discount" />
                </div>

                {/* <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="color">Color</label>
                  <select className="product-input" name="color" value={form.color} onChange={handleChange}>
                    <option value="">Select Color</option>
                    {colors.map((color) => (
                      <option key={color._id} value={color.name}>{color.name}</option>
                    ))}
                  </select>
                </div> */}

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="color">Color</label>
                  <div className="product-radio-group">
                    {colors.map((color) => (
                      <div key={color._id} className="product-radio-item">
                        <input
                          type="radio"
                          id={`color-${color._id}`}
                          name="color"
                          value={color.name}
                          checked={form.color === color.name}
                          onChange={handleChange}
                        />
                        <label htmlFor={`color-${color._id}`} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          {color.name}
                          <span
                            style={{
                              display: "inline-flex",
                              width: "16px",
                              height: "16px",
                              backgroundColor: color.name.toLowerCase(),
                              border: "1px solid #ccc",
                              borderRadius: "2px",
                            }}
                          ></span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="description">Description</label>
                  <textarea className="product-textarea" name="description" value={form.description} onChange={handleChange} placeholder="Description"></textarea>
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="quantity">Quantity</label>
                  <input className="product-input" type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" required />
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="subcategory">Subcategory</label>
                  <select className="product-input" name="subcategory" value={form.subcategory} onChange={handleChange}>
                    <option value="">Select Subcategory</option>
                    {subcategories.map((subcat) => (
                      <option key={subcat._id} value={subcat.name}>{subcat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="tags">Tags</label>
                  <select className="product-input" name="tags" multiple value={form.tags} onChange={handleChange}>
                    {tags.map((tag) => (
                      <option key={tag._id} value={tag.name}>{tag.name}</option>
                    ))}
                  </select>
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="images">Images</label>
                  <input
                    className="product-input"
                    type="file"
                    name="images"
                    multiple
                    onChange={handleChange}
                    accept="image/*"
                  />
                  <div className="product-grid product-grid-cols-1 product-gap-2">
                  {form.images.map((image, index) => (
                    <div key={index} className="image-preview">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }}
                      />
                      <button
                        type="button"
                        className="product-button product-bg-red-500"
                        onClick={() => handleRemoveImage(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="collection">Collection</label>
                  <select className="product-input" name="collection" value={form.collection} onChange={handleChange}>
                    <option value="">Select Collection</option>
                    {collections.map((collection) => (
                      <option key={collection._id} value={collection.name}>{collection.name}</option>
                    ))}
                  </select>
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="occasion">Occasion</label>
                  <select className="product-input" name="occasion" value={form.occasion} onChange={handleChange}>
                    <option value="">Select Occasion</option>
                    {occasions.map((occasion) => (
                      <option key={occasion._id} value={occasion.name}>{occasion.name}</option>
                    ))}
                  </select>
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="showOnHomepage">Show on Homepage</label>
                  <input className="product-checkbox" type="checkbox" name="showOnHomepage" checked={form.showOnHomepage} onChange={handleChange} />
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="isLatest">Is Latest</label>
                  <input className="product-checkbox" type="checkbox" name="isLatest" checked={form.isLatest} onChange={handleChange} />
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="hotSeller">Hot Seller</label>
                  <input className="product-checkbox" type="checkbox" name="hotSeller" checked={form.hotSeller} onChange={handleChange} />
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="isTrending">Is Trending</label>
                  <input className="product-checkbox" type="checkbox" name="isTrending" checked={form.isTrending} onChange={handleChange} />
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="showInGallery">Show in Gallery</label>
                  <input className="product-checkbox" type="checkbox" name="showInGallery" checked={form.showInGallery} onChange={handleChange} />
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="isfeatured">Featured</label>
                  <input className="product-checkbox" type="checkbox" name="isfeatured" checked={form.isfeatured} onChange={handleChange} />
                </div>

                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="isactive">Active</label>
                  <input className="product-checkbox" type="checkbox" name="isactive" checked={form.isactive} onChange={handleChange} />
                </div>
              </div>

              <div className="product-flex product-justify-center product-gap-4 product-mt-6">
                <button type="submit" className="product-button">
                  {selected ? "Update" : "Create"} Product
                </button>
                <button type="button" className="product-button product-bg-red-500" onClick={() => handleshowcreateForm(false)}>
                  Cancel
                </button>
                <button
                type="button"
                className="product-button product-bg-grey-500"
                onClick={() =>
                  setForm({
                    title: "",
                    price: "",
                    discount: "",
                    color: "",
                    description: "",
                    quantity: "",
                    subcategory: "",
                    tags: [],
                    images: [],
                    collection: "",
                    occasion: "",
                    showOnHomepage: false,
                    isLatest: false,
                    hotSeller: false,
                    isTrending: false,
                    showInGallery: false,
                    isActive: true,
                    isfeatured: false,
                  })
                }
              >
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

export default ProductForm;