import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditSchedule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    package: '',
    title: '',
    from_date: '',
    to_date: '',
    amount: '',
    description: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/packages/')
      .then(res => setPackages(res.data));

    axios.get(`/api/admin/schedules/${id}/`)
      .then(res => setFormData(res.data))
      .catch(err => console.error('Error loading schedule:', err));
  }, [id]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/admin/schedules/${id}/`, formData)
      .then(() => navigate('/admin/schedules'))
      .catch(err => console.error('Error updating schedule:', err));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Schedule</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <select name="package" value={formData.package} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Select Package</option>
          {packages.map(pkg => (
            <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
          ))}
        </select>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" />
        <input type="date" name="from_date" value={formData.from_date} onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="to_date" value={formData.to_date} onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="border p-2 rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded"></textarea>
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default EditSchedule;
