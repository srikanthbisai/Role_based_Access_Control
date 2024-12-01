import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Import your existing components
import Header from './components/Header';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import PermissionManagement from './components/PermissionManagement';

// Sidebar component
const Sidebar = () => {
  const navItems = [
    { path: '/users', label: 'User Management', icon: '👥' },
    { path: '/roles', label: 'Role Management', icon: '🔑' },
    { path: '/permissions', label: 'Permission Management', icon: '🛡️' }
  ];

  return (
    <div className="w-64 bg-blue-900 text-white h-screen fixed left-0 top-0 pt-20 shadow-lg">
      <nav className="px-4">
        {navItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              block py-3 px-4 rounded transition duration-200 
              ${isActive 
                ? 'bg-blue-700 text-white' 
                : 'hover:bg-blue-800 text-gray-300'
              }
              flex items-center space-x-3
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-300">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="ml-64 flex-1">
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <div className="p-6">
            <Routes>
              <Route path="/users" element={<UserManagement />} />
              <Route path="/roles" element={<RoleManagement />} />
              <Route path="/permissions" element={<PermissionManagement />} />
              <Route path="/" element={<UserManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;