import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState(null);

  const menu = [
    { title: 'Dashboard', path: '/admin/dashboard' },
    {
      title: 'Manage Products',
      children: [{ title: 'Manage Products', path: '/admin/manage-products' }]
    },
    {
      title: 'Manage Categories',
      children: [
        { title: 'Categories', path: '/admin/categories' },
        { title: 'Subcategories', path: '/admin/subcategories' }
      ]
    },
    {
      title: 'Management Metadata',
      children: [
        { title: 'Manage Collections', path: '/admin/manage-collections' },
        { title: 'Manage Occasions', path: '/admin/manage-occasions' },
        { title: 'Manage Tags', path: '/admin/manage-tags' },
        { title: 'Manage Colours', path: '/admin/manage-colours' },
      ]
    },
    {
      title: 'Manage Pages',
      children: [
        { title: 'Hero Page Section', path: '/admin/pages/hero' },
        { title: 'Packing Box Section', path: '/admin/pages/packing-box' },
        { title: 'Fresh Section', path: '/admin/pages/fresh' },
        { title: '3 Box Section', path: '/admin/pages/3-box' }
      ]
    }
  ];

  const handleExpand = (idx) => {
    setExpanded(expanded === idx ? null : idx);
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-user">
        <img src={'/user.png'} alt="User" />
        <div>
          <p className="user-name">{"virender kumar"}</p>
          <p className="user-email">{"virender@gmail.com"}</p>
        </div>
      </div>
      <nav>
        {menu.map((item, index) =>
          item.children ? (
            <div key={index} className="sidebar-group">
              <div
                className={`group-title-wrapper ${expanded === index ? 'expanded' : ''}`}
                onClick={() => handleExpand(index)}
              >
                <span className="arrow">{expanded === index ? '▼' : '▶'}</span>
                <p className="group-title">{item.title}</p>
              </div>
              <div className={`sidebar-children ${expanded === index ? 'show' : ''}`}>
                {item.children.map((child, idx) => (
                  <NavLink
                    to={child.path}
                    className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
                    key={idx}
                  >
                    {child.title}
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            <NavLink
              to={item.path}
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
              key={index}
              onClick={() => setExpanded(null)}
            >
              {item.title}
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
};

export default AdminSidebar;