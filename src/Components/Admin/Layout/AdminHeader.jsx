import React, { useEffect } from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { MENU } from './../../../Constants/Constants';

const AdminHeader = () => {
  const location = useLocation();
  const [SelectedMenu, setSelectedMenu] = React.useState(null);
  const [pageTitle, setPageTitle] = React.useState('');
  const [breadcrumb, setBreadcrumb] = React.useState('');
  
  useEffect(() => {
    MENU.forEach(item => {
      if(item?.children){
        if(item?.children?.some(child => child.path === location?.pathname)) {
          setSelectedMenu(item?.children.find(child => child.path === location?.pathname));
        }
      } else {
        if(item?.path === location?.pathname) {
          setSelectedMenu(item);
        }
      }
      
    });
  }, [location?.pathname]);

  useEffect(() => {
    if (SelectedMenu) {
      setPageTitle(SelectedMenu?.title || '');
      setBreadcrumb(SelectedMenu?.breadcrumb || '');
    }
  }, [SelectedMenu]);

  return (
    <header className="admin-header">
      <div className="breadcrumb">
        <h2>{pageTitle}</h2>
        <p>{breadcrumb === 'home' ? 'Home' : (<> <Link to={`/admin/dashboard`}>{`Home`}</Link> / {breadcrumb}</>)}</p>
      </div>
      <div className="header-center">
        <input className="search-input" placeholder="Search..." />
      </div>
    </header>
  );
};

export default AdminHeader;