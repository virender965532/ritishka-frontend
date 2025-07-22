import React, { useEffect, useState, useMemo } from 'react';
import { fetchCategories } from '../../api/api';
import "./../../Css/admindashboard.css";

function Dashboard() {
  const [activeCategoryCount, setActiveCategoryCount] = useState(0);

  // useMemo to memoize the fetch function
  const fetchActiveCategories = useMemo(() => {
    return async () => {
      try {
        // Assuming active categories have a property like isActive: true
        const res = await fetchCategories({ page: 1, limit: 100, search: '', isActive: true });
        if(res.data?.categories) {
          // Count active categories
          setActiveCategoryCount(res.data.categories.filter(cat => cat.isactive).length);
        } else {
          setActiveCategoryCount(0);
        } 
      } catch (err) {
        setActiveCategoryCount(0);
      }
    };
  }, []);

  useEffect(() => {
    fetchActiveCategories();
  }, [fetchActiveCategories]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        Admin Dashboard
      </div>
      <div className="dashboard-section">
        <div className="dashboard-section-actions">
          <div className="dashboard-section-cards">
            <div className="dashboard-section-card">
              <h3>Total Users</h3>
              <p>1000</p>
            </div>
            <div className="dashboard-section-card">
              <h3>Active Users</h3>
              <p>50</p>
            </div>
            <div className="dashboard-section-card">
              <h3>Total Orders</h3>
              <p>500</p>
            </div>
            <div className="dashboard-section-card">
              <h3>Total Revenue</h3>
              <p>$10,000</p>
            </div>
            <div className="dashboard-section-card">
              <h3>Active Products</h3>
              <p>200</p>
            </div>
            <div className="dashboard-section-card">
              <a href="/admin/categories" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                <h3>Active Categories</h3>
                <p>{activeCategoryCount}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;