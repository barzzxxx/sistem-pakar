import React from 'react';
import { jurusans } from '../data/jurusans';

const DaftarJurusan = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="content-box">
          <h1>📚 Daftar Jurusan</h1>
          <p style={{ marginBottom: '30px', color: '#666' }}>
            Berikut adalah 8 jurusan yang tersedia dalam sistem rekomendasi kami
          </p>

          {jurusans.map((jurusan) => (
            <div key={jurusan.id} className="result-item" style={{ marginBottom: '30px', padding: '25px', background: '#f8f9fc', borderRadius: '12px', borderLeft: `5px solid ${jurusan.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <span style={{ fontSize: '3rem' }}>{jurusan.icon}</span>
                <h2 style={{ color: jurusan.color, margin: 0 }}>{jurusan.nama}</h2>
              </div>
              
              <p style={{ marginBottom: '15px' }}>{jurusan.deskripsi}</p>
              
              <div>
                <strong style={{ color: '#2c3e50' }}>💼 Prospek Karir:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                  {jurusan.prospekKarir.map((karir, index) => (
                    <span 
                      key={index}
                      style={{
                        background: jurusan.color + '20',
                        color: jurusan.color,
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '0.9rem'
                      }}
                    >
                      {karir}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DaftarJurusan;
