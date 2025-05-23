import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import StatsCard from '../components/StatsCard';
import OrderHistoryTable from '../components/OrderHistoryTable';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Statistiques */}
            <StatsCard
              title="Total Users"
              value="456"
              icon={
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              path="/admin/users"
            />
            
            <StatsCard
              title="Total Orders"
              value="789"
              icon={
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 11-1.732 2.899L15 21.732A3 3 0 0113.268 24H3a3 3 0 110-6zm12-8h-1m4 0h1m-7-4h12a3 3 0 11-1.732-2.899L15 4.268A3 3 0 0113.268 3H3a3 3 0 110 6z" />
                </svg>
              }
              path="/admin/orders"
            />
            
            <StatsCard
              title="Total Products"
              value="123"
              icon={
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              path="/admin/products"
            />
          </div>

          <div className="mt-8">
            <OrderHistoryTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
