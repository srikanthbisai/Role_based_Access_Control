import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserSecret } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const Items = [
    { path: '/users', label: 'User Management', icon: FaUsers },
    { path: '/roles', label: 'Role Management', icon: FaUserSecret },
    { path: '/permissions', label: 'Permission Management', icon: FaKey },
  ];

  return (
    <>
      {/* Mobile Screens */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      <div
        className={`
          fixed top-0 left-0 w-64 bg-gradient-to-b from-blue-900 to-blue-600 
          text-white min-h-screen shadow-lg z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex justify-between items-center mb-6 pt-6 px-4">
          <h1 className="text-2xl font-bold hidden lg:block">Admin Panel</h1>
          <button
            className="lg:hidden text-white text-5xl"
            onClick={toggleSidebar}
          >
            &times; 
          </button>
        </div>
        
        <nav className="px-4 space-y-4">
          {Items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                block py-3 px-4 rounded-lg transition duration-200 
                ${isActive 
                  ? 'bg-blue-700 text-white' 
                  : 'hover:bg-blue-800 text-gray-300'
                }
                flex items-center justify-center lg:justify-start space-x-3 text-lg font-medium
              `}
            >
              <item.icon className="text-2xl" />
              <span className="hidden lg:inline">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;