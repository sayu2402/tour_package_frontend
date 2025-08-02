import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewTourPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/packages/');
      setPackages(res.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/packages/${id}/`);
      fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Tour Packages</h2>
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Source</th>
            <th className="py-2 px-4 border">Destination</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map(pkg => (
            <tr key={pkg.id} className="text-center border-b">
              <td className="py-2 px-4 border">{pkg.title}</td>
              <td className="py-2 px-4 border">{pkg.source_city}</td>
              <td className="py-2 px-4 border">{pkg.destination_city}</td>
              <td className="py-2 px-4 border">
                <Link to={`/admin/edit-tour-package/${pkg.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">Edit</Link>
                <button onClick={() => handleDelete(pkg.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTourPackages;
