import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">✅ Thank you for your enquiry!</h2>
      <p className="text-lg text-gray-700 mb-8">We’ve received your request and will get back to you shortly.</p>

      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default ThankYou;
