import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin/countries/');
      setCountries(res.data);
    } catch (err) {
      console.error('Error fetching countries:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this country?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/countries/${id}/`);
      fetchCountries();
    } catch (err) {
      console.error('Error deleting country:', err);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🌍 Countries</h1>
        <Link
          to="/admin/countries/add"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Add Country
        </Link>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id}>
              <td className="p-2 border">{country.id}</td>
              <td className="p-2 border">{country.name}</td>
              <td className="p-2 border space-x-2">
                <Link
                  to={`/admin/countries/edit/${country.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(country.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {countries.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No countries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CountryList;
