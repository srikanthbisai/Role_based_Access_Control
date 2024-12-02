import React from 'react';
import { NavLink } from 'react-router-dom';

// Define prop types
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { path: '/users', label: 'User Management', icon: '👥' },
    { path: '/roles', label: 'Role Management', icon: '🔑' },
    { path: '/permissions', label: 'Permission Management', icon: '🛡️' },
  ];

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } lg:block fixed left-0 top-0 w-64 bg-gradient-to-b from-blue-900 to-blue-600 text-white h-screen shadow-lg z-50`}
    >
      <div className="flex justify-center mb-6 pt-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>
      <nav className="px-4 space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
              block py-3 px-4 rounded-lg transition duration-200 
              ${isActive 
                ? 'bg-blue-700 text-white' 
                : 'hover:bg-blue-800 text-gray-300'
              }
              flex items-center space-x-3 text-lg font-medium
            `
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
