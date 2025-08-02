import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTourPackage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    source_country: '',
    source_city: '',
    destination_country: '',
    destination_city: '',
    description: '',
    terms_and_conditions: '',
    photos: []
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/countries/').then(res => setCountries(res.data));
    axios.get('http://localhost:8000/api/cities/').then(res => setCities(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, photos: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const packageData = new FormData();
    for (let key in formData) {
      if (key === 'photos') {
        for (let i = 0; i < formData.photos.length; i++) {
          packageData.append('photos', formData.photos[i]);
        }
      } else {
        packageData.append(key, formData[key]);
      }
    }

    try {
      await axios.post('http://localhost:8000/api/packages/create/', packageData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/admin/view-packages');
    } catch (err) {
      console.error('Error creating tour package:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Tour Package</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="input" />
        <select name="source_country" value={formData.source_country} onChange={handleChange} required className="input">
          <option value="">Select Source Country</option>
          {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select name="source_city" value={formData.source_city} onChange={handleChange} required className="input">
          <option value="">Select Source City</option>
          {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select name="destination_country" value={formData.destination_country} onChange={handleChange} required className="input">
          <option value="">Select Destination Country</option>
          {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select name="destination_city" value={formData.destination_city} onChange={handleChange} required className="input">
          <option value="">Select Destination City</option>
          {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="input"></textarea>
        <textarea name="terms_and_conditions" value={formData.terms_and_conditions} onChange={handleChange} placeholder="Terms & Conditions" required className="input"></textarea>
        <input type="file" name="photos" onChange={handleFileChange} multiple className="input" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create</button>
      </form>
    </div>
  );
};

export default CreateTourPackage;
