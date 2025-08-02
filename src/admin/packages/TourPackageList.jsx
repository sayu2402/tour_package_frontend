import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TourPackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/packages/');
      setPackages(res.data);
    } catch (err) {
      console.error('Error fetching tour packages:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/packages/${id}/`);
      fetchPackages(); // Refresh list
    } catch (err) {
      console.error('Error deleting package:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tour Packages</h1>
        <Link
          to="/admin/packages/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Package
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">From</th>
              <th className="px-4 py-2">To</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-t">
                <td className="px-4 py-2">{pkg.title}</td>
                <td className="px-4 py-2">{pkg.source_city} ({pkg.source_country})</td>
                <td className="px-4 py-2">{pkg.destination_city} ({pkg.destination_country})</td>
                <td className="px-4 py-2 space-x-3">
                  <Link
                    to={`/admin/packages/edit/${pkg.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  No packages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TourPackageList;
