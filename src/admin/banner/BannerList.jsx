import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BannerList = () => {
  const [banners, setBanners] = useState([]);

  const fetchBanners = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/banners/');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;

    try {
      await axios.delete(`/api/admin/banners/${id}/`);
      setBanners((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Banners</h1>
        <Link to="/admin/banner/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Banner
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="border rounded p-2 shadow">
            <img src={banner.image} alt="banner" className="w-full h-40 object-cover rounded" />
            <button
              onClick={() => handleDelete(banner.id)}
              className="mt-2 w-full bg-red-500 text-white py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerList;
