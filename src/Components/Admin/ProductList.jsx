import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import {
  fetchProducts,
  deleteProduct,
  fetchCategories,
  fetchSubcategories,
  fetchTags,
  fetchCollections,
  fetchOccasions
} from './../../api/api';
import ProductForm from './ProductForm';
import { useSelector } from 'react-redux';
import { getImageUrl } from '../../utils/imageUtils';

const ProductList = ({ containerRef }) => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [collections, setCollections] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, product: null });
  const user = useSelector(state => state.userData?.user);
  const productSectionRef = useRef(null);

  const loadData = async () => {
    const productResponse = await fetchProducts({ page, limit, search });
    setProducts(productResponse?.data?.products);
    setTotalPages(productResponse?.data?.pages);
    setTotal(productResponse?.data?.total);
    const categoryResponse = await fetchCategories();
    setCategories(categoryResponse.data?.categories || []);
    const subcategoryResponse = await fetchSubcategories();
    setSubcategories(subcategoryResponse.data?.subcategories || []);
    const tagResponse = await fetchTags();
    setTags(tagResponse.data || []);
    const collectionResponse = await fetchCollections();
    setCollections(collectionResponse.data || []);
    const occasionResponse = await fetchOccasions();
    setOccasions(occasionResponse.data || []);
  };

  useEffect(() => {
    loadData();
  }, [page, search]);

  const handleshowcreateForm = (showCreateForm) => {
    if (showCreateForm) {
      setShowCreateForm(true);
    } else {
      setShowCreateForm(false);
      setSelected(null);
    }
  };

  const handleDelete = async (product) => {
    setConfirmDelete({ show: true, product });
  };

  const confirmDeleteProduct = async () => {
    await deleteProduct(confirmDelete.product._id);
    setConfirmDelete({ show: false, product: null });
    loadData();
  };

  return (
    <>
      <div className='product-section' ref={productSectionRef}>
        <div className='product-section-header'>
          <div className='product-section-title'>Products</div>
          <div className='product-section-description'>Manage your products here.</div>
        </div>
        <div className='product-section-actions'>
          <input
            className='product-search-input'
            type="text"
            placeholder="Search by category name..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ marginRight: '10px' }}
          />
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
        user={user}
      />
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table className="product-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '10px' }}>Image</th>
              <th>SKU</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Price</th>
              <th>Discount (%)</th>
              <th>Discounted Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Updated By</th>
              <th>Updated At</th>
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
                            src={`${getImageUrl(image)}`}
                            alt={product?.title}
                            className="product-image"
                            style={{ width: '50px', height: '50px', borderRadius: '10px', marginRight: '5px' }}
                          />
                        )
                      })}
                    </div>
                  )}
                </td>
                <td>{product?.sku || "N/A"}</td>
                <td>{product?.title || "N/A"}</td>
                <td>{product?.slug || "N/A"}</td>
                <td>{product?.category?.name || "N/A"}</td>
                <td>{product?.subcategory?.name || "N/A"}</td>
                <td>{product?.price || "N/A"}</td>
                <td>{product?.discount + "%" || "N/A"}</td>
                <td>{product?.discountedPrice || (product?.price && product?.discount ? (product.price - (product.price * product.discount / 100)).toFixed(2) : "N/A")}</td>
                <td>{product?.quantity || "N/A"}</td>
                <td>
                  <div className='product-status-indicator'>
                    <span className={`product-active-status ${product?.isactive ? 'product-bg-green-500' : 'product-bg-red-500'}`}>
                      {product?.isactive ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                </td>
                <td>{product?.createdBy?.name || "N/A"}</td>
                <td>
                  {product?.createdAt && product?.createdBy
                    ? moment(product.createdAt).format('YYYY-MM-DD HH:mm:ss')
                    : "N/A"}
                </td>
                <td>{product?.updatedBy?.name || "N/A"}</td>
                <td>
                  {product?.updatedAt && product?.updatedBy
                    ? moment(product.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                    : "N/A"}
                </td>
                <td className='product-action-buttons'>
                  <div className='product-action-buttons-container'>
                    <button
                      onClick={() => {
                        setSelected(product);
                        setShowCreateForm(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        if (containerRef?.current) {
                          containerRef.current.scrollTop = 0;
                        }
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
      </div>
      {/* Pagination Controls */}
      <div className="product-pagination-controls" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          className="product-pagination-button"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="product-pagination-info">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              className='product-pagination-button'
              key={i + 1}
              style={{
                margin: '0 2px',
                padding: '4px 8px',
                background: page === i + 1 ? '#007bff' : '#f0f0f0',
                color: page === i + 1 ? '#fff' : '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: page === i + 1 ? 'bold' : 'normal'
              }}
              onClick={() => setPage(i + 1)}
              disabled={page === i + 1}
            >
              {i + 1}
            </button>
          ))}
          &nbsp;({total} results)
        </span>
        <button
          className="product-pagination-button"
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      {/* Delete Confirmation Popup */}
      {confirmDelete.show && (
        <div className="product-popup-overlay">
          <div className="product-popup-content">
            <p className="product-popup-message">Are you sure you want to delete this product?</p>
            <button className='product-popup-button product-popup-button-confirm' onClick={confirmDeleteProduct}>Yes, Delete</button>
            <button className='product-popup-button product-popup-button-cancel' onClick={() => setConfirmDelete({ show: false, product: null })}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;