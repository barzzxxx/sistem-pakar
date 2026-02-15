import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Tentang from './pages/Tentang';
import DaftarJurusan from './pages/DaftarJurusan';
import DataDiri from './pages/DataDiri';
import Kuesioner from './pages/Kuesioner';
import Hasil from './pages/Hasil';
import DetailPerhitungan from './pages/DetailPerhitungan';

function App() {
  const [konsultasiData, setKonsultasiData] = useState(null);

  return (
    <Router>
      <div className="app">
        {/* Navbar */}
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <i className="icon">🎓</i>
              <span>Sistem Pakar Jurusan</span>
            </Link>
            <div className="navbar-menu">
              <Link to="/" className="nav-link">Beranda</Link>
              <Link to="/tentang" className="nav-link">Tentang</Link>
              <Link to="/jurusan" className="nav-link">Jurusan</Link>
              <Link to="/konsultasi" className="nav-link btn-primary">Mulai Konsultasi</Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/jurusan" element={<DaftarJurusan />} />
          <Route 
            path="/konsultasi" 
            element={<DataDiri setKonsultasiData={setKonsultasiData} />} 
          />
          <Route 
            path="/kuesioner" 
            element={<Kuesioner konsultasiData={konsultasiData} setKonsultasiData={setKonsultasiData} />} 
          />
          <Route 
            path="/hasil" 
            element={<Hasil konsultasiData={konsultasiData} />} 
          />
          <Route 
            path="/detail-perhitungan/:jurusanId" 
            element={<DetailPerhitungan konsultasiData={konsultasiData} />} 
          />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 Sistem Pakar Penentuan Jurusan Kuliah</p>
            <p>Metode: Certainty Factor (CF) | Framework: React.js</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
