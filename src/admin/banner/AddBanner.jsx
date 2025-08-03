import React, { useState } from 'react';
import axios from 'axios';

const AddBanner = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      setErrorMessage('Both title and image are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/api/admin/banners/', formData);
      setSuccessMessage('Banner uploaded successfully!');
      setTitle('');
      setImage(null);
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage('Failed to upload banner. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add New Banner</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Enter banner title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Banner
        </button>
      </form>

      {successMessage && (
        <p className="text-green-600 mt-2">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default AddBanner;