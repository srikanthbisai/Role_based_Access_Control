import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import RoleManagement from './components/RoleManagement';

// Lazy load the components
const Header = lazy(() => import('./components/Header'));
const UserManagement = lazy(() => import('./components/UserManagement'));
const PermissionManagement = lazy(() => import('./components/PermissionManagement'));



const Sidebar = () => {
  const navItems = [
    { path: '/users', label: 'User Management', icon: '👥' },
    { path: '/roles', label: 'Role Management', icon: '🔑' },
    { path: '/permissions', label: 'Permission Management', icon: '🛡️' }
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-600 text-white h-screen fixed left-0 top-0 pt-20 shadow-lg">
      <div className="flex justify-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>
      <nav className="px-4 space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              block py-3 px-4 rounded-lg transition duration-200 
              ${isActive 
                ? 'bg-blue-700 text-white' 
                : 'hover:bg-blue-800 text-gray-300'
              }
              flex items-center space-x-3 text-lg font-medium
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



const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-300">
        <Sidebar />
        
        <div className="ml-64 flex-1">
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
          </Suspense>
          
          <div className="p-6">
            <Suspense fallback={<div>Loading content...</div>}>
              <Routes>
                <Route path="/users" element={<UserManagement />} />
                <Route path="/roles" element={<RoleManagement />} />
                <Route path="/permissions" element={<PermissionManagement />} />
                <Route path="/" element={<UserManagement />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
