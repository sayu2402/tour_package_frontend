import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CityList = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/cities/')
      .then(res => setCities(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this city?")) return;

    await axios.delete(`http://localhost:8000/api/admin/cities/${id}/`);
    setCities(prev => prev.filter(city => city.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🏙️ Cities</h1>
      <Link to="/admin/cities/add" className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block">➕ Add City</Link>
      <table className="w-full table-auto border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Country</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map(city => (
            <tr key={city.id}>
              <td className="border px-4 py-2">{city.id}</td>
              <td className="border px-4 py-2">{city.name}</td>
              <td className="border px-4 py-2">{city.country}</td>
              <td className="border px-4 py-2 space-x-2">
                <Link to={`/admin/cities/edit/${city.id}`} className="bg-blue-600 text-white px-3 py-1 rounded">✏️ Edit</Link>
                <button onClick={() => handleDelete(city.id)} className="bg-red-600 text-white px-3 py-1 rounded">🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CityList;
