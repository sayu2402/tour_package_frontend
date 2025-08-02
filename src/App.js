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
import AllSchedules from './admin/schedule/AllSchedules';


function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<PackageList />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin/*" element={<AdminLayout><div>Welcome Admin!</div></AdminLayout>} />
        <Route path="/admin/countries" element={<CountryList />} />
        <Route path="/admin/countries/add" element={<AddCountry />} />
        <Route path="/admin/countries/edit/:id" element={<EditCountry />} />
        <Route path="/admin/cities" element={<CityList />} />
        <Route path="/admin/cities/add" element={<AddCity />} />
        <Route path="/admin/cities/edit/:id" element={<EditCity />} />
        <Route path="/admin/schedules" element={<AllSchedules />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
