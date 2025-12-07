
import React, { useState } from 'react';
import ManageProfileForm from '../Components/Profile/ManageProfileForm';
import AddressManager from '../Components/Profile/AddressManager';

const tabClass = (active) =>
  `px-6 py-3 cursor-pointer font-semibold border-b-2 transition-colors duration-200 ${active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'}`;

const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-8">
      <div className="w-full max-w-5xl">
        <div className="flex border-b mb-8">
          <div
            className={tabClass(activeTab === 'profile')}
            onClick={() => setActiveTab('profile')}
          >
            Manage Profile
          </div>
          <div
            className={tabClass(activeTab === 'address')}
            onClick={() => setActiveTab('address')}
          >
            Address
          </div>
        </div>
        <div>
          {activeTab === 'profile' && <ManageProfileForm />}
          {activeTab === 'address' && <AddressManager />}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;