import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCountry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    // Fetch country by ID
    axios.get(`http://localhost:8000/api/admin/countries/${id}/`)
      .then(res => setCountryName(res.data.name))
      .catch(err => console.error('Error fetching country:', err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/admin/countries/${id}/`, { name: countryName })
      .then(() => {
        alert('Country updated successfully!');
        navigate('/admin/countries');
      })
      .catch(err => {
        console.error('Error updating country:', err);
        alert('Update failed.');
      });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Country</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          placeholder="Country name"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Update Country
        </button>
      </form>
    </div>
  );
};

export default EditCountry;
