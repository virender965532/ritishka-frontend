import React, { useState, useMemo, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MENU } from './../../../Constants/Constants';
import { logout } from '../../../redux/actions/loginActions'; // Adjust path as needed
import './Layout.css';

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState(null);
  const rawUserDetail = useSelector((state) => state?.userData?.user);
  const userDetail = useMemo(() => rawUserDetail || {}, [rawUserDetail]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExpand = (idx) => {
    setExpanded(expanded === idx ? null : idx);
  };
  useEffect(() => {
    setIsLoggedIn(!!userDetail?._id);
  }, [userDetail]);

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <aside className="admin-sidebar">
        <div className="sidebar-user">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${
              userDetail?.profilePicture || "/images/user/user.png"
            }`}
            alt="User"
          />
          <div>
            <p className="user-name">{userDetail?.name || "Guest"}</p>
            <p className="user-email">{userDetail?.email || ""}</p>
          </div>
        </div>
        <nav>
          {MENU.map((item, index) =>
            item.children ? (
              <div key={index} className="sidebar-group">
                <div
                  className={`group-title-wrapper ${
                    expanded === index ? "expanded" : ""
                  }`}
                  onClick={() => handleExpand(index)}
                >
                  <span className="arrow">
                    {expanded === index ? "▼" : "▶"}
                  </span>
                  <p className="group-title">{item.title}</p>
                </div>
                <div
                  className={`sidebar-children ${
                    expanded === index ? "show" : ""
                  }`}
                >
                  {item.children.map((child, idx) => (
                    <NavLink
                      to={child.path}
                      className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                      }
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
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
                key={index}
                onClick={() => setExpanded(null)}
              >
                {item.title}
              </NavLink>
            )
          )}
        </nav>
        <div className="sidebar-auth">
          {isLoggedIn ? (
            <div className="sidebar-user-info">
              <button
                className="sidebar-logout-btn"
                title="Logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="sidebar-login-btn" title="Login">
              Login
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;