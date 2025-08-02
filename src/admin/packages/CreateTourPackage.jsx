import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTourPackage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    terms_and_conditions: '',
    source_country: '',
    source_city: '',
    destination_country: '',
    destination_city: '',
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchCountriesAndCities();
  }, []);

  const fetchCountriesAndCities = async () => {
    try {
      const countryRes = await axios.get('http://localhost:8000/api/countries/');
      const cityRes = await axios.get('http://localhost:8000/api/cities/');
      setCountries(countryRes.data);
      setCities(cityRes.data);
    } catch (err) {
      console.error('Error fetching country/city:', err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhotoChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Create tour package
      const res = await axios.post('http://localhost:8000/api/packages/', formData);
      const packageId = res.data.id;

      // 2. Upload multiple photos
      const photoForm = new FormData();
      for (let i = 0; i < photos.length; i++) {
        photoForm.append('image', photos[i]);
        photoForm.append('package', packageId);
        await axios.post('http://localhost:8000/api/package-photos/', photoForm);
        photoForm.delete('image');
        photoForm.delete('package');
      }

      alert('Package created successfully!');
      navigate('/admin/packages');
    } catch (err) {
      console.error('Error creating package:', err.response?.data || err);
      alert('Something went wrong. Please check the form.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Tour Package</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange}
          placeholder="Package Title" required className="w-full border p-2 rounded" />

        <textarea name="description" value={formData.description} onChange={handleChange}
          placeholder="Description" required className="w-full border p-2 rounded h-24" />

        <textarea name="terms_and_conditions" value={formData.terms_and_conditions} onChange={handleChange}
          placeholder="Terms and Conditions" required className="w-full border p-2 rounded h-24" />

        <div className="grid grid-cols-2 gap-4">
          <select name="source_country" value={formData.source_country} onChange={handleChange}
            required className="border p-2 rounded">
            <option value="">Select Source Country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select name="source_city" value={formData.source_city} onChange={handleChange}
            required className="border p-2 rounded">
            <option value="">Select Source City</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select name="destination_country" value={formData.destination_country} onChange={handleChange}
            required className="border p-2 rounded">
            <option value="">Select Destination Country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select name="destination_city" value={formData.destination_city} onChange={handleChange}
            required className="border p-2 rounded">
            <option value="">Select Destination City</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <input type="file" multiple accept="image/*" onChange={handlePhotoChange}
          className="border p-2 rounded w-full" />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
          Create Package
        </button>
      </form>
    </div>
  );
};

export default CreateTourPackage;
