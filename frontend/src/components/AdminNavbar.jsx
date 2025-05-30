import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Space Admin</span>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <div className="ml-3 relative">
              <Link
                to="/admin/login"
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  localStorage.removeItem('adminEmail');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
