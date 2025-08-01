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
    <div style={{ padding: '20px' }}>
      <h1>🏝️ Welcome to Tour Packages</h1>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        style={{ marginBottom: '30px' }}
      >
        {banners.map((banner) => {
        //   console.log('Banner image:', banner.image);
          return (
            <SwiperSlide key={banner.id}>
              <img
                src={banner.image}
                alt={banner.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              />
              <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{banner.title}</h3>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <p style={{ marginTop: '30px' }}>
        Browse our amazing tour packages and plan your next adventure.
      </p>
      <PackageList />
    </div>
  );
};


export default HomePage;
