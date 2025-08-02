import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCountry = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Country name cannot be empty.");
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/admin/countries/', { name });
      navigate('/admin/countries');
    } catch (err) {
      console.error('Error adding country:', err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">➕ Add New Country</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Country Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/countries')}
            className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCountry;
