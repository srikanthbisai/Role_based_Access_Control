import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 shadow-xl flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <div className="bg-white/20 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-wider text-white">Access Control Manager</h1>
      </div>
      
      {/* Navigation*/}
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex space-x-4 text-lg">
          <a href="/permissions" className="hover:text-indigo-200 transition-colors duration-300 ease-in-out">
            Permissions
          </a>
          <a href="/users" className="hover:text-indigo-200 transition-colors duration-300 ease-in-out">
            Users
          </a>
          <a href="/roles" className="hover:text-indigo-200 transition-colors duration-300 ease-in-out">
            Roles
          </a>
        </nav>
        
        {/* User Profile Action Button */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
