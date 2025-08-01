import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PackageList from './PackageList';

const HomePage = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/banners/')
      .then(res => setBanners(res.data))
      .catch(err => console.error('Error fetching banners:', err));
  }, []);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        🏝️ Welcome to Tour Packages
      </h1>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        className="mb-10"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-[400px] object-cover"
              />
              <h3 className="text-center mt-2 text-xl font-semibold text-gray-800">
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="text-lg text-center text-gray-600 mb-6">
        Browse our amazing tour packages and plan your next adventure.
      </p>
      <PackageList />
    </div>
  );
};

export default HomePage;
