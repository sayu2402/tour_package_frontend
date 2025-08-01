import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/packages/')
      .then(res => setPackages(res.data))
      .catch(err => console.error('Error fetching packages:', err));
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Available Tour Packages</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4"
          >
            <img
              src={pkg.photos[0] ? pkg.photos[0].image : ''}
              alt={pkg.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            <h3 className="text-xl font-semibold text-gray-800">{pkg.title}</h3>
            <p className="text-gray-600 mt-1 mb-2">
              {pkg.description.length > 100 ? pkg.description.substring(0, 100) + '...' : pkg.description}
            </p>

            <p className="text-blue-600 font-bold mb-3">
              Starting from ₹{pkg.schedules[0]?.amount || 'N/A'}
            </p>

            <Link
              to={`/packages/${pkg.id}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
