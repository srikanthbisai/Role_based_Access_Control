import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';


const Sidebar = lazy(()=> import('./components/Sidebar'));
const Spinner = lazy(()=> import("./utils/Spinner"))
const Header = lazy(() => import('./components/Header'));
const User = lazy(() => import('./components/User'));
const Permissions = lazy(() => import('./components/Permissions'));
const Roles = lazy(()=> import("./components/Roles")) 

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
        <div className="flex-1 w-full lg:ml-64">
          {/* Mobile Header with Sidebar Toggle */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-blue-600 text-white">
            <button
              className="p-2 focus:outline-none"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? '✖' : '☰'}
            </button>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>

          <Suspense fallback={<div className="flex justify-center items-center h-screen"><Spinner/></div>}>
            <Header />
          </Suspense>

          <div className="p-4 sm:p-6">
            <Suspense fallback={<div className="flex justify-center items-center h-screen"><Spinner/></div>}>
              <Routes>
                <Route path="/users" element={<User />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/permissions" element={<Permissions />} />
                <Route path="/" element={<User />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
