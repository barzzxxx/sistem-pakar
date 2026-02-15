import React from 'react';

const Tentang = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="content-box">
          <h1>📖 Tentang Sistem Pakar</h1>
          
          <section className="content-section">
            <h2>Apa itu Sistem Pakar?</h2>
            <p>
              Sistem Pakar adalah program komputer yang dirancang untuk meniru kemampuan seorang pakar
              dalam bidang tertentu. Sistem ini menggunakan pengetahuan dan metode inferensi untuk 
              memecahkan masalah yang biasanya memerlukan keahlian manusia.
            </p>
          </section>

          <section className="content-section">
            <h2>Metode Certainty Factor (CF)</h2>
            <p>
              Sistem ini menggunakan metode <strong>Certainty Factor (CF)</strong> untuk menghitung
              tingkat kepastian rekomendasi jurusan. CF adalah metode yang digunakan untuk mengukur
              kepercayaan terhadap suatu fakta atau aturan.
            </p>
            
            <div className="formula-box">
              <h3>Formula CF:</h3>
              <p><code>CF[H,E] = CF_pakar × CF_user</code></p>
              <p><code>CF_combine = CF_old + CF_new × (1 - CF_old)</code></p>
            </div>

            <p>
              Nilai CF berkisar antara 0 hingga 1, dimana:
            </p>
            <ul>
              <li><strong>0.8 - 1.0:</strong> Sangat Cocok</li>
              <li><strong>0.6 - 0.79:</strong> Cocok</li>
              <li><strong>0.4 - 0.59:</strong> Cukup Cocok</li>
              <li><strong>0 - 0.39:</strong> Kurang Cocok</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Cara Kerja Sistem</h2>
            <ol>
              <li>User mengisi data diri</li>
              <li>User menjawab 20 pertanyaan (kuesioner)</li>
              <li>Untuk setiap jawaban "Ya", user menentukan tingkat keyakinan (20% - 100%)</li>
              <li>Sistem menghitung CF untuk setiap jurusan berdasarkan jawaban</li>
              <li>Sistem menampilkan 3 jurusan dengan CF tertinggi</li>
            </ol>
          </section>

          <section className="content-section">
            <h2>Data yang Digunakan</h2>
            <ul>
              <li><strong>20 Kriteria</strong> meliputi minat, bakat, nilai akademik, dan kepribadian</li>
              <li><strong>8 Jurusan</strong> yang populer dan banyak diminati</li>
              <li><strong>40+ Rules</strong> yang menghubungkan kriteria dengan jurusan</li>
            </ul>
          </section>

          <section className="content-section">
            <h2>Teknologi</h2>
            <ul>
              <li><strong>Framework:</strong> React.js</li>
              <li><strong>Metode:</strong> Certainty Factor (CF)</li>
              <li><strong>Data:</strong> Hardcoded (no database)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Tentang;
