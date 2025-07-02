import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar}>
        ☰
      </div>

      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2 className="sidebar-title">JobBoard</h2>
        <nav>
          <NavLink to="/" className="nav-link" end>
            All Jobs
          </NavLink>
          <NavLink to="/favorites" className="nav-link">
            Favorite Jobs
          </NavLink>
        </nav>
      </div>
    </>
  );
}
