import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>🎓 Bingung Pilih Jurusan Kuliah?</h1>
          <p className="hero-subtitle">
            Temukan jurusan yang paling sesuai dengan minat, bakat, dan kepribadianmu!
          </p>
          <Link to="/konsultasi" className="btn-hero">
            <i>▶️</i> Mulai Konsultasi Sekarang
          </Link>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Siswa Terbantu</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">Jurusan Tersedia</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Tingkat Akurasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Mengapa Memilih Sistem Kami?</h2>
          <p className="section-subtitle">
            Sistem pakar berbasis Certainty Factor untuk rekomendasi akurat
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Cepat & Mudah</h3>
              <p>Hanya butuh 5-10 menit untuk mendapatkan rekomendasi jurusan yang sesuai</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Akurat & Terpercaya</h3>
              <p>Menggunakan metode Certainty Factor yang telah teruji secara ilmiah</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Prospek Karir</h3>
              <p>Lengkap dengan informasi prospek karir untuk setiap jurusan</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💯</div>
              <h3>Gratis 100%</h3>
              <p>Tidak ada biaya apapun, sistem dapat digunakan kapan saja</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">Cara Kerja Sistem</h2>
          <p className="section-subtitle">3 langkah mudah untuk menemukan jurusan idealmu</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Isi Data Diri</h3>
              <p>Masukkan nama, asal sekolah, dan informasi dasar</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Jawab Kuesioner</h3>
              <p>Jawab 20 pertanyaan tentang minat, bakat, dan kepribadianmu</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Dapatkan Rekomendasi</h3>
              <p>Sistem akan memberikan top 3 jurusan terbaik dengan persentase kecocokan</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Siap Menemukan Jurusan Impianmu?</h2>
          <p>Jangan biarkan kebingungan menghalangi masa depanmu!</p>
          <Link to="/konsultasi" className="btn-cta">
            🚀 Mulai Konsultasi Gratis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
