import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PackageList from './pages/PackageList';
import PackageDetail from './pages/PackageDetail';
import ThankYou from './pages/ThankYou';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<PackageList />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
