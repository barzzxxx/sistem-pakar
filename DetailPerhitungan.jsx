import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDetailPerhitungan } from '../utils/certaintyFactor';
import { jurusans } from '../data/jurusans';

const DetailPerhitungan = ({ konsultasiData }) => {
  const { jurusanId } = useParams();
  const navigate = useNavigate();

  if (!konsultasiData || !konsultasiData.jawaban) {
    return (
      <div className="page">
        <div className="container">
          <div className="alert alert-warning">
            Tidak ada data konsultasi. Silakan mulai konsultasi terlebih dahulu.
            <Link to="/konsultasi" style={{ display: 'block', marginTop: '15px' }}>
              Mulai Konsultasi →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const jurusan = jurusans.find(j => j.id === parseInt(jurusanId));
  const hasilJurusan = konsultasiData.hasil?.find(h => h.jurusan.id === parseInt(jurusanId));
  const detailCF = getDetailPerhitungan(parseInt(jurusanId), konsultasiData.jawaban);

  if (!jurusan) {
    return <div className="page"><div className="container">Jurusan tidak ditemukan</div></div>;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="content-box">
          <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
            ← Kembali
          </button>

          <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '2.5rem' }}>{jurusan.icon}</span>
            Detail Perhitungan CF: {jurusan.nama}
          </h1>

          {hasilJurusan && (
            <div style={{ background: jurusan.color + '20', padding: '20px', borderRadius: '12px', marginTop: '20px', borderLeft: `5px solid ${jurusan.color}` }}>
              <h3 style={{ color: jurusan.color }}>Hasil Akhir</h3>
              <p><strong>CF Hasil:</strong> {hasilJurusan.cfHasil.toFixed(4)}</p>
              <p><strong>Persentase:</strong> {hasilJurusan.persentase}%</p>
              <p><strong>Ranking:</strong> #{hasilJurusan.ranking}</p>
            </div>
          )}

          <div className="content-section" style={{ marginTop: '30px' }}>
            <h2>📝 Detail Kriteria yang Cocok</h2>
            
            {detailCF.length === 0 ? (
              <div className="alert alert-warning">
                Tidak ada kriteria yang cocok dengan jurusan ini berdasarkan jawaban Anda.
              </div>
            ) : (
              <div style={{ marginTop: '20px' }}>
                {detailCF.map((item, index) => (
                  <div key={index} style={{ background: '#f8f9fc', padding: '20px', borderRadius: '12px', marginBottom: '15px' }}>
                    <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>
                      {item.kriteria.kode}: {item.kriteria.nama}
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                      <div>
                        <strong>CF Pakar:</strong> {item.cfPakar.toFixed(2)}
                      </div>
                      <div>
                        <strong>CF User:</strong> {item.cfUser.toFixed(2)} ({(item.cfUser * 100).toFixed(0)}%)
                      </div>
                      <div>
                        <strong>CF[H,E]:</strong> <span style={{ color: jurusan.color, fontWeight: 'bold' }}>{item.cfHE.toFixed(4)}</span>
                      </div>
                    </div>
                    <div className="formula-box" style={{ marginTop: '15px' }}>
                      <code>CF[H,E] = {item.cfPakar.toFixed(2)} × {item.cfUser.toFixed(2)} = {item.cfHE.toFixed(4)}</code>
                    </div>
                  </div>
                ))}

                <div className="content-section" style={{ marginTop: '30px' }}>
                  <h3>🔢 Kombinasi CF</h3>
                  <div className="formula-box">
                    <p><strong>Formula:</strong></p>
                    <code>CF_combine = CF_old + CF_new × (1 - CF_old)</code>
                    <p style={{ marginTop: '15px' }}>
                      <strong>Nilai CF Individual:</strong>
                    </p>
                    {detailCF.map((item, index) => (
                      <div key={index}>
                        CF{index + 1} = {item.cfHE.toFixed(4)}
                      </div>
                    ))}
                    {hasilJurusan && (
                      <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '2px solid #e0e0e0' }}>
                        <strong>CF Final = {hasilJurusan.cfHasil.toFixed(4)}</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPerhitungan;
