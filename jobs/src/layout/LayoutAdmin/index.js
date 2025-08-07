import React, { useState } from 'react';
import "./LayoutAdmin.css";
import { Link, NavLink, Outlet } from 'react-router-dom';

function LayoutAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="logo">
          Admin Panel
        </div>
        <ul className="menu">
          <li><Link to={`/admin`} >Tổng quan</Link></li>
          <li><Link to={`/info-company`} >Thông tin công ty</Link></li>
          <li><Link to={`/job-manage`} >Quản lí việc làm</Link></li>
          <li><Link to={`/cv-manage`} >Quản lí CV</Link></li>       
           </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <button onClick={toggleSidebar} className="toggle-btn">
            {isSidebarOpen ? 'Close' : 'Open'} Menu
          </button>
          <div className="header-right">
            <Link to={`/`} className="user-name" >Trang chủ</Link>
            <NavLink to="/logout" className="logout-btn">Đăng xuất</NavLink>

          </div>
        </header>

        {/* Content */}
        <div className="content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default LayoutAdmin;
