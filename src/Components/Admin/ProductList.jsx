import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct, fetchCategories, fetchSubcategories, fetchTags, fetchCollections, fetchOccasions } from './../../api/api';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [collections, setCollections] = useState([]);
  const [occasions, setOccasions] = useState([]);

  const loadData = async () => {
    const productResponse = await fetchProducts();
    setProducts(productResponse?.data?.products);
    const categoryResponse = await fetchCategories();
    setCategories(categoryResponse.data);
    const subcategoryResponse = await fetchSubcategories();
    setSubcategories(subcategoryResponse.data);
    const tagResponse = await fetchTags();
    setTags(tagResponse.data);
    const collectionResponse = await fetchCollections();
    setCollections(collectionResponse.data);
    const occasionResponse = await fetchOccasions();
    setOccasions(occasionResponse.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleshowcreateForm = (showCreateForm) => {
    if (showCreateForm) {
      setShowCreateForm(true);
    } else {
      setShowCreateForm(false);
      setSelected(null);
    }
  };

  const handleDelete = async (product) => {
    await deleteProduct(product._id);
    loadData();
  };
  return (
    <>
      <div className='product-section'>
        <div className='product-section-header'>
          <div className='product-section-title'>Products</div>
          <div className='product-section-description'>Manage your products here.</div>
        </div>
        <div className='product-section-actions'>
          {!showCreateForm && <button onClick={() => setShowCreateForm(true)}>Add New Product</button>}
          {showCreateForm && <button onClick={() => setShowCreateForm(false)}>Hide Product Form</button>}
        </div>
      </div>
      <ProductForm
        selected={selected}
        onSave={loadData}
        showCreateForm={showCreateForm}
        handleshowcreateForm={handleshowcreateForm}
        categories={categories}
        subcategories={subcategories}
        tags={tags}
        collections={collections}
        occasions={occasions}
      />
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Quantity</th>
            <th>Status</th>
            <th className='product-table-header-actions'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 && products.map((product) => (
            <tr key={product?._id}>
              <td>
                {product?.images && product.images.length > 0 && (
                  <div className='product-image-container' style={{ display: 'flex', alignItems: 'center', width: '375px' }}>
                    {product?.images?.map((image, index) => {
                      return (
                      <img key={index}
                        src={`${process.env.REACT_APP_BACKEND_URL}${image}`}
                        alt={product?.title}
                        className="product-image"
                        style={{ width: '50px', height: '50px', borderRadius: '10px', marginRight: '5px' }}
                      />
                    )
                    })}
                  </div>
                )}
              </td>
              <td>{product?.title || "N/A"}</td>
              <td>{product?.price || "N/A"}</td>
              <td>{product?.discount || "N/A"}</td>
              <td>{product?.quantity || "N/A"}</td>
              <td>
                <div className='product-status-indicator'>
                  <span className={`product-active-status ${product?.isactive ? 'product-bg-green-500' : 'product-bg-red-500'}`}>
                    {product?.isactive ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </td>
              <td className='product-action-buttons'>
                <div className='product-action-buttons-container'>
                  <button
                    onClick={() => {
                      setSelected(product);
                      setShowCreateForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(product);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;