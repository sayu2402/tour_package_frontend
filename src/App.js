import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PackageList from './pages/PackageList';
import PackageDetail from './pages/PackageDetail';
import ThankYou from './pages/ThankYou';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import CountryList from './admin/countries/CountryList';
import AddCountry from './admin/countries/AddCountry';
import EditCountry from './admin/countries/EditCountry';
import CityList from './admin/cities/CityList';
import AddCity from './admin/cities/AddCity';
import EditCity from './admin/cities/EditCity';
import ScheduleList from './admin/schedule/ScheduleList';
import CreateTourPackage from './admin/packages/CreateTourPackage';
import EditTourPackage from './admin/packages/EditTourPackage';
import TourPackageList from './admin/packages/TourPackageList';
import AddSchedule from './admin/schedule/AddSchedule';
import EditSchedule from './admin/schedule/EditSchedule';
import BannerList from './admin/banner/BannerList';
import AddBanner from './admin/banner/AddBanner';
import EnquiryList from './admin/enquiries/EnquiryList';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<PackageList />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<div>Welcome Admin!</div>} />
          <Route path="countries" element={<CountryList />} />
          <Route path="countries/add" element={<AddCountry />} />
          <Route path="countries/edit/:id" element={<EditCountry />} />
          <Route path="cities" element={<CityList />} />
          <Route path="cities/add" element={<AddCity />} />
          <Route path="cities/edit/:id" element={<EditCity />} />
          <Route path="schedules" element={<ScheduleList />} />
          <Route path="packages/create" element={<CreateTourPackage />} />
          <Route path="packages/edit/:id" element={<EditTourPackage />} />
          <Route path="packages/" element={<TourPackageList />} />
          <Route path="/admin/schedule/add" element={<AddSchedule />} />
          <Route path="/admin/schedule/edit/:id" element={<EditSchedule />} />
          <Route path="/admin/banners" element={<BannerList />} />
          <Route path="/admin/banner/add" element={<AddBanner />} />
          <Route path="/admin/enquiries" element={<EnquiryList />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
