import React, { useState } from 'react';
import { updateUserProfile } from '../../api/api';


const ManageProfileForm = () => {
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    dob: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.mobile.trim()) errs.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(form.mobile)) errs.mobile = 'Enter valid 10-digit mobile number';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!validateEmail(form.email)) errs.email = 'Enter valid email';
    if (!form.dob) errs.dob = 'Date of birth is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await updateUserProfile(form);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setApiError(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

    // --- ManageProfileForm Component ---
    function validateEmail(email) {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Mobile Number</label>
        <input
          type="text"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          maxLength={10}
          className={`w-full border rounded px-3 py-2 focus:outline-none ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className={`w-full border rounded px-3 py-2 focus:outline-none ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
      </div>
      {apiError && <div className="text-red-600 text-sm">{apiError}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default ManageProfileForm;