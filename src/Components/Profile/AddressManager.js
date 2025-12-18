import React, { useState } from 'react';
import {
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  markPrimaryAddress
} from '../../api/api'
import { FaTimes } from "react-icons/fa";



// --- AddressManager Component ---
const initialAddress = {
  flat: '',
  locality: '',
  area: '',
  landmark: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
};

const AddressManager = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialAddress);
  const [formErrors, setFormErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Fetch addresses on mount
  React.useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchAddresses();
      setAddresses(res.data || []);
    } catch (err) {
      setError('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (address = null) => {
    setEditId(address?._id || null);
    setForm(address ? {
      flat: address.flat,
      locality: address.locality,
      area: address.area || '',
      landmark: address.landmark || '',
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
    } : initialAddress);
    setFormErrors({});
    setSuccess('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm(initialAddress);
    setFormErrors({});
    setSuccess('');
  };

  const validateAddress = () => {
    const errs = {};
    if (!form.flat.trim()) errs.flat = 'Flat/House is required';
    if (!form.locality.trim()) errs.locality = 'Locality is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state.trim()) errs.state = 'State is required';
    if (!form.country.trim()) errs.country = 'Country is required';
    if (!form.pincode.trim()) errs.pincode = 'Pincode is required';
    else if (!/^\d{4,10}$/.test(form.pincode)) errs.pincode = 'Enter valid pincode';
    return errs;
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSuccess('');
    const errs = validateAddress();
    if (Object.keys(errs).length) {
      setFormErrors(errs);
      return;
    }
    setFormLoading(true);
    try {
      if (editId) {
        await updateAddress(editId, form);
        setSuccess('Address updated successfully!');
      } else {
        await createAddress(form);
        setSuccess('Address added successfully!');
      }
      closeModal();
      loadAddresses();
    } catch (err) {
      setFormErrors({ api: err?.response?.data?.message || 'Failed to save address' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      await deleteAddress(id);
      loadAddresses();
    } catch {
      alert('Failed to delete address');
    }
  };

  const handleMarkPrimary = async (id) => {
    try {
      await markPrimaryAddress(id);
      loadAddresses();
    } catch {
      alert('Failed to mark as primary');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Your Addresses</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => openModal()}
        >
          Add Address
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : addresses.length === 0 ? (
        <div className="text-gray-500">No addresses found.</div>
      ) : (
        <div className="space-y-4">
          {addresses.map(addr => (
            <div key={addr._id} className={`border rounded p-4 flex flex-col md:flex-row md:items-center justify-between ${addr.isPrimary ? 'border-blue-600' : 'border-gray-300'}`}>
              <div>
                <div className="font-semibold">{addr.flat}, {addr.locality}{addr.area && `, ${addr.area}`}{addr.landmark && `, ${addr.landmark}`}</div>
                <div>{addr.city}, {addr.state}, {addr.country} - {addr.pincode}</div>
                {addr.isPrimary && <span className="text-xs text-blue-600 font-bold">Primary</span>}
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                {!addr.isPrimary && (
                  <button className="text-blue-600 underline" onClick={() => handleMarkPrimary(addr._id)}>Mark Primary</button>
                )}
                <button className="text-green-600 underline" onClick={() => openModal(addr)}>Edit</button>
                <button className="text-red-600 underline" onClick={() => handleDelete(addr._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add/Edit Address */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-4xl relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
                <FaTimes size={20} />
            </button>
            <h4 className="text-lg font-semibold mb-4">{editId ? 'Edit Address' : 'Add New Address'}</h4>
            <form onSubmit={handleFormSubmit} className="w-full flex flex-wrap gap-4">
              <div className='w-[48%]'>
                <label className="w-[150px] block text-sm font-medium mb-1">Flat/House</label>
                <input type="text" name="flat" value={form.flat} onChange={handleFormChange} className={`w-full border rounded px-3 py-2 focus:outline-none ${formErrors.flat ? 'border-red-500' : 'border-gray-300'}`}/>
                {formErrors.flat && <p className="text-red-500 text-xs mt-1">{formErrors.flat}</p>}
              </div>
              <div className='w-[48%]'>
                <label className="w-[150px] block text-sm font-medium mb-1">Locality</label>
                <input type="text" name="locality" value={form.locality} onChange={handleFormChange} className={`w-full border rounded px-3 py-2 focus:outline-none ${formErrors.locality ? 'border-red-500' : 'border-gray-300'}`}/>
                {formErrors.locality && <p className="text-red-500 text-xs mt-1">{formErrors.locality}</p>}
              </div>
              <div className='w-[48%]'>
                <label className="w-[150px] block text-sm font-medium mb-1">Area <span className="text-gray-400">(optional)</span></label>
                <input type="text" name="area" value={form.area} onChange={handleFormChange} className="w-full border rounded px-3 py-2 focus:outline-none border-gray-300"/>
              </div>
              <div className='w-[48%]'>
                <label className="w-[150px] block text-sm font-medium mb-1">Landmark <span className="text-gray-400">(optional)</span></label>
                <input type="text" name="landmark" value={form.landmark} onChange={handleFormChange} className="w-full border rounded px-3 py-2 focus:outline-none border-gray-300"/>
              </div>
              <div className='w-[48%]'>
                <label className="w-[150px] block text-sm font-medium mb-1">City</label>
                <input type="text" name="city" value={form.city} onChange={handleFormChange} className={`w-full border rounded px-3 py-2 focus:outline-none ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`}/>
                {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
              </div>
              <div className='w-[48%]'>
                <label className="w-[150px] block text-sm font-medium mb-1">State</label>
                <input type="text" name="state" value={form.state} onChange={handleFormChange} className={`w-full border rounded px-3 py-2 focus:outline-none ${formErrors.state ? 'border-red-500' : 'border-gray-300'}`}/>
                {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
              </div>
              <div className='w-[48%]'>
                <label className="w-[150px] block text-sm font-medium mb-1">Country</label>
                <input type="text" name="country" value={form.country} onChange={handleFormChange} className={`w-full border rounded px-3 py-2 focus:outline-none ${formErrors.country ? 'border-red-500' : 'border-gray-300'}`}/>
                {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
              </div>
              <div className='w-[48%]'>
                <label className="w-[150px] block text-sm font-medium mb-1">Pincode</label>
                <input type="text" name="pincode" value={form.pincode} onChange={handleFormChange} maxLength={10} className={`w-full border rounded px-3 py-2 focus:outline-none ${formErrors.pincode ? 'border-red-500' : 'border-gray-300'}`}/>
                {formErrors.pincode && <p className="text-red-500 text-xs mt-1">{formErrors.pincode}</p>}
              </div>
              {formErrors.api && <div className="text-red-600 text-sm">{formErrors.api}</div>}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition" disabled={formLoading}>
                {formLoading ? (editId ? 'Updating...' : 'Adding...') : (editId ? 'Update Address' : 'Add Address')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressManager;