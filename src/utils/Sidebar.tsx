import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserSecret } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {          //sidebar contents
  const Items = [
    { path: '/users', label: 'User Management', icon: FaUsers },
    { path: '/roles', label: 'Role Management', icon: FaUserSecret },
    { path: '/permissions', label: 'Permission Management', icon: FaKey },
  ];

  return (
    <>
      {/* Mobile' screen hidden sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      <div
        className={`
          fixed top-0 left-0 w-64 bg-gradient-to-br from-blue-900 to-blue-700 
          text-white min-h-screen shadow-2xl z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex justify-between items-center p-6 border-b border-blue-800">
          <h1 className="text-2xl font-bold tracking-tight hidden lg:block">
            Admin Panel
          </h1>
          <button
            className="lg:hidden text-white text-4xl hover:text-blue-200 transition"
            onClick={toggleSidebar}
          >
            &times; 
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {Items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={toggleSidebar} 
              className={({ isActive }) => `
                block py-3 px-4 rounded-xl transition duration-300 group
                ${isActive 
                  ? 'bg-blue-700 text-white shadow-md' 
                  : 'hover:bg-blue-800/60 text-gray-200 hover:text-white'
                }
                flex items-center justify-center lg:justify-start space-x-3 
                text-base font-medium relative overflow-hidden
              `}
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
              
              <item.icon className="text-xl flex-shrink-0" />
              <span className="hidden lg:inline truncate max-w-[200px]">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
