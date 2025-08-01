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
    <div style={{ padding: '20px' }}>
      <h1>Available Tour Packages</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {packages.map(pkg => (
          <div key={pkg.id} style={{ border: '1px solid #ccc', padding: '10px', width: '300px' }}>
            <img
              src={pkg.photos[0] ? pkg.photos[0].image : ''}
              alt={pkg.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h3>{pkg.title}</h3>
            <p>{pkg.description.substring(0, 100)}...</p>
            <p><strong>Starting from ₹{pkg.schedules[0]?.amount || 'N/A'}</strong></p>
            <Link to={`/packages/${pkg.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
