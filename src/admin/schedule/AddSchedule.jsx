import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSchedule = () => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    package: '',
    title: '',
    from_date: '',
    to_date: '',
    amount: '',
    description: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/tour-packages/')
      .then(res => setPackages(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/admin/schedules/', formData)
      .then(() => navigate('/admin/schedules'))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Schedule</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="package"
          value={formData.package}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Package</option>
          {packages.map(pkg => (
            <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
          ))}
        </select>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="from_date" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="to_date" onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default AddSchedule;