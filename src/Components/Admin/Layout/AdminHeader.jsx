import React from 'react';
import './Layout.css';

const AdminHeader = ({ pageTitle, breadcrumb, isLoggedIn, user }) => {
  return (
    <header className="admin-header">
      <div className="breadcrumb">
        <h2>{pageTitle}</h2>
        <p>{breadcrumb}</p>
      </div>
      <div className="header-center">
        <input className="search-input" placeholder="Search..." />
      </div>
      <div className="header-right">
        {isLoggedIn ? (
          <div className="user-info">
            <span>{user.name}</span>
            <button className="logout-btn">Logout</button>
          </div>
        ) : (
          <button className="login-btn">Login</button>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;