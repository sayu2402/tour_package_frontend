// src/admin/cities/EditCity.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCity = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/admin/cities/${id}/`).then(res => {
      setName(res.data.name);
      setCountry(res.data.country);
    });

    axios.get('http://localhost:8000/api/admin/countries/').then(res => {
      setCountries(res.data);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/admin/cities/${id}/`, { name, country });
    navigate('/admin/cities');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">✏️ Edit City</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="City Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        >
          <option value="">Select Country</option>
          {countries.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update City</button>
      </form>
    </div>
  );
};

export default EditCity;
