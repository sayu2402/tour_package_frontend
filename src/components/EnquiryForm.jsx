import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EnquiryForm = ({ scheduleId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!scheduleId) {
      toast.error("Please select a schedule before submitting.");
      return;
    }

    try {
      const payload = {
        ...formData,
        related_schedule: scheduleId,
      };

      console.log("Submitting payload:", payload);

      await axios.post('http://localhost:8000/api/enquiry/', payload);

      toast.success("Enquiry submitted successfully!");
      setTimeout(() => navigate('/thank-you'), 2000); // Wait 2 seconds

    } catch (err) {
      console.error('Submission failed:', err.response?.data || err);
      setError('Something went wrong. Please try again.');
      toast.error("Failed to submit enquiry.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl bg-white shadow-md rounded-lg p-6 border">
      <h3 className="text-xl font-bold text-blue-800 mb-2">Send an Enquiry</h3>
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter phone number"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          name="message"
          id="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your message..."
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
      >
        Submit Enquiry
      </button>
    </form>
  );
};

export default EnquiryForm;
