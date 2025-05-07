import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';

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
          <Link className="login-btn">Login</Link>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;