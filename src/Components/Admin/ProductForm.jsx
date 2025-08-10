import React, { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct,
  fetchCategories,
  fetchSubcategories,
  fetchTags,
  fetchCollections,
  fetchOccasions,
} from "./../../api/api";
import { getImageUrl } from "../../utils/imageUtils";
import toast from "react-hot-toast";

const ProductForm = ({
  selected,
  onSave,
  showCreateForm = false,
  handleshowcreateForm,
  categories = [],
  subcategories = [],
  tags = [],
  collections = [],
  occasions = [],
  user
}) => {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    price: "",
    discount: "",
    colors: [],
    shortDescription: "",
    description: "",
    quantity: "",
    category: "",
    subcategory: "",
    tags: [],
    images: [],
    video: null,
    youtubeLink: "",
    facebookLink: "",
    instagramLink: "",
    blogLink: "",
    collection: [],
    occasion: [],
    showOnHomepage: false,
    isLatest: false,
    hotSeller: false,
    isTrending: false,
    showInGallery: false,
    isactive: true,
    isfeatured: false,
    soldOut: false,
  });
  const [colorInput, setColorInput] = useState("");
  const [categoriesState, setCategoriesState] = useState([]);
  const [subcategoriesState, setSubcategoriesState] = useState([]);
  const [tagsState, setTagsState] = useState([]);
  const [collectionsState, setCollectionsState] = useState([]);
  const [occasionsState, setOccasionsState] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      const [catRes, subcatRes, tagRes, collectionRes, occasionRes] = await Promise.all([
        fetchCategories({ page: 1, limit: 100 }),
        fetchSubcategories({ page: 1, limit: 100 }),
        fetchTags(),
        fetchCollections(),
        fetchOccasions(),
      ]);
      setCategoriesState(catRes?.data?.categories || []);
      setSubcategoriesState(subcatRes?.data?.subcategories || []);
      setTagsState(tagRes.data || []);
      setCollectionsState(collectionRes.data || []);
      setOccasionsState(occasionRes.data || []);
    };

    loadData();
    if (selected) {
      setForm({
        ...selected,
        category: selected.category?._id || "",
        subcategory: selected.subcategory?._id || "",
        colors: selected.colors || [],
        collection: selected.collection || [],
        occasion: selected.occasion || [],
        tags: selected.tags?.map(tag => tag._id) || [],
        images: selected.images || [],
      });
    }
  }, [selected]);

  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "images") {
      const uploadedImages = Array.from(files);
      if (uploadedImages.length + form.images.length > 6) {
        alert("You can upload a maximum of 6 images.");
        return;
      }
      setForm({ ...form, images: [...form.images, ...uploadedImages] });
    } else if (name === "video") {
      setForm({ ...form, video: files[0] });
    } else if (name === "category") {
      await fetchSubcategories({ id: value }).then((res) => {
        setSubcategoriesState(res.data?.subcategories || []);
      });
      setForm({ ...form, category: value });
    } else if (name === "tags") {
      const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
      setForm({ ...form, tags: selectedTags });
    } else if (name === "collection" || name === "occasion") {
      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
      setForm({ ...form, [name]: selectedValues });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleAddColor = () => {
    if (colorInput && !form.colors.includes(colorInput)) {
      setForm({ ...form, colors: [...form.colors, colorInput] });
      setColorInput("");
    }
  };

  const handleRemoveColor = (color) => {
    setForm({ ...form, colors: form.colors.filter((c) => c !== color) });
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
        form.images.forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      } else if (key === "video") {
        if (form.video instanceof File) {
          formData.append("video", form.video);
        } else {
          formData.append("video", null);
        }
      } else if (Array.isArray(form[key])) {
        form[key].forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, form[key]);
      }
    });
    if (user?._id) formData.append("userId", user._id);

    try {
      var message = '';
      if (selected) {
        await updateProduct(selected._id, formData);
        message = `Product updated successfully!`;
      } else {
        await createProduct(formData);
        message = `Product created successfully!`;
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
      toast.error(error.response?.data?.error || error.response?.data?.message || "An error occurred while saving the product.", {
        duration: 2000,
        style: {
          backgroundColor: "#ff4b4b",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff4b4b",
        },
      });
      return;
    }

    onSave();
    setForm({
      title: "",
      brand: "",
      price: "",
      discount: "",
      colors: [],
      shortDescription: "",
      description: "",
      quantity: "",
      category: "",
      subcategory: "",
      tags: [],
      images: [],
      video: null,
      youtubeLink: "",
      facebookLink: "",
      instagramLink: "",
      blogLink: "",
      collection: [],
      occasion: [],
      showOnHomepage: false,
      isLatest: false,
      hotSeller: false,
      isTrending: false,
      showInGallery: false,
      isactive: true,
      isfeatured: false,
      soldOut: false,
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
                  <label className="product-label" htmlFor="brand">Brand</label>
                  <input className="product-input" name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="category">Category</label>
                  <select className="product-input" name="category" value={form.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {categoriesState.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="subcategory">Subcategory</label>
                  <select className="product-input" name="subcategory" value={form.subcategory} onChange={handleChange}>
                    <option value="">Select Subcategory</option>
                    {subcategoriesState.map((subcat) => (
                      <option key={subcat._id} value={subcat._id}>{subcat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="price">Price (in Rs)</label>
                  <input className="product-input" type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="discount">Discount (%)</label>
                  <input className="product-input" type="number" name="discount" value={form.discount} onChange={handleChange} placeholder="Discount" />
                </div>
                {/* Color Input and List */}
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="color">Color Name</label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input
                      className="product-input"
                      name="color"
                      value={colorInput}
                      onChange={e => setColorInput(e.target.value)}
                      placeholder="Add color name"
                    />
                    <button type="button" className="add-product-color-button" onClick={handleAddColor}>Add</button>
                  </div>
                </div>
                <div className="product-grid product-grid-cols-1 product-items-center">
                  <label className="product-label">Colors Added</label>
                  <div className="product-colors-list">
                    {form.colors.map((color, idx) => (
                      <span key={idx} className="product-color-item">
                        <span key={idx} style={{background: color, color: '#fff', padding: '8px 8px', borderRadius: 8, marginRight: 4, display: 'flex', alignItems: 'center'}}></span>
                        {color}
                        <button type="button" className="add-product-color-button" style={{ minWidth: "fit-content", marginLeft: "8px", padding: "2px 8px" }} onClick={() => handleRemoveColor(color)}>Delete</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="shortDescription">Short Description</label>
                  <textarea className="product-textarea" name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Short Description" />
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
                  <label className="product-label" htmlFor="tags">Tags</label>
                  <select className="product-input" name="tags" value={form.tags} onChange={handleChange} multiple>
                    {tagsState.map((tag) => (
                      <option key={tag._id} value={tag._id}>{tag.name}</option>
                    ))}
                  </select>
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="images">Images</label>
                  <input className="product-input" type="file" name="images" multiple onChange={handleChange} accept="image/*" />
                </div>
                <div className="product-grid product-grid-cols-1" style={{ display: "flex", flexWrap: "wrap", gap: "75px" }}>
                  {form.images.map((image, index) => (
                    <div key={index} className="image-preview" style={{ display: "inline-grid" }}>
                      <img
                        src={getImageUrl(image)}
                        alt={`Preview ${index}`}
                        style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }}
                      />
                      <button type="button" className="product-button product-bg-red-500" onClick={() => handleRemoveImage(index)} style={{ width: "100px", marginTop: "10px" }}>Remove</button>
                    </div>
                  ))}
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="video">Video</label>
                  <input className="product-input" type="file" name="video" onChange={handleChange} accept="video/*" />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="youtubeLink">YouTube Link</label>
                  <input className="product-input" name="youtubeLink" value={form.youtubeLink} onChange={handleChange} placeholder="YouTube Link" />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="facebookLink">Facebook Link</label>
                  <input className="product-input" name="facebookLink" value={form.facebookLink} onChange={handleChange} placeholder="Facebook Link" />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="instagramLink">Instagram Link</label>
                  <input className="product-input" name="instagramLink" value={form.instagramLink} onChange={handleChange} placeholder="Instagram Link" />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="blogLink">Blog Link</label>
                  <input className="product-input" name="blogLink" value={form.blogLink} onChange={handleChange} placeholder="Blog Link" />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="collection">Collection</label>
                  <select className="product-input" name="collection" value={form.collection} onChange={handleChange}>
                    {collectionsState.map((collection) => (
                      <option key={collection._id} value={collection._id}>{collection.name}</option>
                    ))}
                  </select>
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="occasion">Occasion</label>
                  <select className="product-input" name="occasion" value={form.occasion} onChange={handleChange}>
                    {occasionsState.map((occasion) => (
                      <option key={occasion._id} value={occasion._id}>{occasion.name}</option>
                    ))}
                  </select>
                </div>
                {/* Toggle Buttons */}
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="showOnHomepage">Show on Homepage</label>
                  <input className="product-toggle" type="checkbox" name="showOnHomepage" checked={form.showOnHomepage} onChange={handleChange} />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="isLatest">Is Latest</label>
                  <input className="product-toggle" type="checkbox" name="isLatest" checked={form.isLatest} onChange={handleChange} />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="hotSeller">Hot Seller</label>
                  <input className="product-toggle" type="checkbox" name="hotSeller" checked={form.hotSeller} onChange={handleChange} />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="isTrending">Is Trending</label>
                  <input className="product-toggle" type="checkbox" name="isTrending" checked={form.isTrending} onChange={handleChange} />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="showInGallery">Show in Gallery</label>
                  <input className="product-toggle" type="checkbox" name="showInGallery" checked={form.showInGallery} onChange={handleChange} />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="isfeatured">Featured</label>
                  <input className="product-toggle" type="checkbox" name="isfeatured" checked={form.isfeatured} onChange={handleChange} />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="isactive">Active</label>
                  <input className="product-toggle" type="checkbox" name="isactive" checked={form.isactive} onChange={handleChange} />
                </div>
                <div className="product-grid product-grid-cols-2 product-items-center">
                  <label className="product-label" htmlFor="soldOut">Sold Out</label>
                  <input className="product-toggle" type="checkbox" name="soldOut" checked={form.soldOut} onChange={handleChange} />
                </div>
              </div>
              <div className="product-flex product-justify-center product-gap-4 product-mt-6">
                <button type="submit" className="product-button">{selected ? "Update" : "Create"} Product</button>
                <button type="button" className="product-button product-bg-red-500" onClick={() => handleshowcreateForm(false)}>Cancel</button>
                <button
                  type="button"
                  className="product-button product-bg-grey-500"
                  onClick={() =>
                    setForm({
                      title: "",
                      brand: "",
                      price: "",
                      discount: "",
                      colors: [],
                      shortDescription: "",
                      description: "",
                      quantity: "",
                      category: "",
                      subcategory: "",
                      tags: [],
                      images: [],
                      video: null,
                      youtubeLink: "",
                      facebookLink: "",
                      instagramLink: "",
                      blogLink: "",
                      collection: [],
                      occasion: [],
                      showOnHomepage: false,
                      isLatest: false,
                      hotSeller: false,
                      isTrending: false,
                      showInGallery: false,
                      isactive: true,
                      isfeatured: false,
                      soldOut: false,
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