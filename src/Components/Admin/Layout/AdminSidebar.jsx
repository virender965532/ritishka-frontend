import React from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

const AdminSidebar = () => {
  const menu = [
    {
      title: 'Dashboard',
      path: '/dashboard'
    },
    {
      title: 'Manage Categories',
      children: [
        { title: 'Categories', path: '/admin/categories' },
        { title: 'Subcategories', path: '/admin/subcategories' }
      ]
    },
    {
      title: 'Manage Products',
      children: [
        { title: 'Manage Collections', path: '/admin/manage-collections' },
        { title: 'Manage Occasions', path: '/admin/manage-occasions' },
        { title: 'Manage Tags', path: '/admin/manage-tags' },
        { title: 'Manage Colours', path: '/admin/manage-colours' },
        // { title: 'Manage Products', path: '/admin/manage-products' }
      ]
    }
  ];

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
        {menu.map((item, index) => (
          item.children ? (
            <div key={index} className="sidebar-group">
              <p className="group-title">{item.title}</p>
              {item.children.map((child, idx) => (
                <NavLink to={child.path} className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} key={idx}>
                  {child.title}
                </NavLink>
              ))}
            </div>
          ) : (
            <NavLink to={item.path} className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} key={index}>
              {item.title}
            </NavLink>
          )
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;