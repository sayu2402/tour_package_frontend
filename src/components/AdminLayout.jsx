// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">🛠️ Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin/countries" className="block hover:bg-blue-700 p-2 rounded">🌍 Countries</Link>
          <Link to="/admin/cities" className="block hover:bg-blue-700 p-2 rounded">🏙️ Cities</Link>
          <Link to="/admin/packages" className="block hover:bg-blue-700 p-2 rounded">🧳 Tour Packages</Link>
          <Link to="/admin/schedules" className="block hover:bg-blue-700 p-2 rounded">📆 Schedules</Link>
          <Link to="/admin/banners" className="block hover:bg-blue-700 p-2 rounded">🖼️ Banners</Link>
          <Link to="/admin/enquiries" className="block hover:bg-blue-700 p-2 rounded">📨 Enquiries</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
