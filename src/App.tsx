import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Sidebar from './components/Sidebar';
import RoleManagement from './components/RoleManagement';

// Lazy load the components
const Header = lazy(() => import('./components/Header'));
const UserManagement = lazy(() => import('./components/UserManagement'));
const PermissionManagement = lazy(() => import('./components/PermissionManagement'));

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Header with a toggle button for small screens */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-blue-600 text-white">
            <button
              className="p-2 focus:outline-none"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? '✖' : '☰'}
            </button>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>

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
