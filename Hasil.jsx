import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { generateRekomendasi, getMedalEmoji } from '../utils/certaintyFactor';

const Hasil = ({ konsultasiData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!konsultasiData || !konsultasiData.hasil) {
      navigate('/konsultasi');
    }
  }, [konsultasiData, navigate]);

  if (!konsultasiData || !konsultasiData.hasil) {
    return null;
  }

  const { nama, asalSekolah, hasil } = konsultasiData;
  const topHasil = hasil.slice(0, 3);
  const pemenang = hasil[0];
  const rekomendasi = generateRekomendasi(pemenang.persentase);

  const handleCetakPDF = () => {
    window.print();
  };

  const handleUlangKonsultasi = () => {
    if (window.confirm('Yakin ingin memulai konsultasi baru? Data sebelumnya akan hilang.')) {
      navigate('/konsultasi');
    }
  };

  return (
    <div className="page hasil-page">
      <div className="container">
        {/* Header Info */}
        <div className="hasil-header no-print">
          <h1>🎊 Hasil Konsultasi</h1>
          <div className="user-info">
            <p><strong>Nama:</strong> {nama}</p>
            {asalSekolah && <p><strong>Asal Sekolah:</strong> {asalSekolah}</p>}
            <p><strong>Tanggal:</strong> {new Date(konsultasiData.tanggalSelesai).toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Winner Card */}
        <div className="winner-card" style={{ borderColor: rekomendasi.color }}>
          <div className="winner-badge" style={{ background: rekomendasi.color }}>
            {getMedalEmoji(1)}
          </div>
          <h2>🏆 Jurusan Terbaik Untukmu</h2>
          <div className="winner-jurusan">
            <span className="jurusan-icon" style={{ fontSize: '4rem' }}>
              {pemenang.jurusan.icon}
            </span>
            <h3>{pemenang.jurusan.nama}</h3>
          </div>
          <div className="winner-score">
            <div className="score-circle" style={{ borderColor: rekomendasi.color }}>
              <span className="score-value">{pemenang.persentase}%</span>
              <span className="score-label">Kecocokan</span>
            </div>
          </div>
          <div className="rekomendasi-box" style={{ background: rekomendasi.color + '20', borderColor: rekomendasi.color }}>
            <h4>{rekomendasi.emoji} {rekomendasi.level}</h4>
            <p>{rekomendasi.advice}</p>
          </div>
          <div className="winner-detail">
            <p><strong>Deskripsi:</strong> {pemenang.jurusan.deskripsi}</p>
            <div className="prospek-karir">
              <strong>💼 Prospek Karir:</strong>
              <div className="karir-list">
                {pemenang.jurusan.prospekKarir.map((karir, index) => (
                  <span key={index} className="karir-badge">{karir}</span>
                ))}
              </div>
            </div>
          </div>
          <Link 
            to={`/detail-perhitungan/${pemenang.jurusan.id}`}
            className="btn-detail"
          >
            📊 Lihat Detail Perhitungan CF
          </Link>
        </div>

        {/* Top 3 Ranking */}
        <div className="ranking-section">
          <h2>📊 Top 3 Jurusan Rekomendasi</h2>
          <div className="ranking-grid">
            {topHasil.map((item) => {
              const rek = generateRekomendasi(item.persentase);
              return (
                <div 
                  key={item.jurusan.id} 
                  className="ranking-card"
                  style={{ borderTopColor: rek.color }}
                >
                  <div className="ranking-header">
                    <span className="ranking-medal">{getMedalEmoji(item.ranking)}</span>
                    <span className="ranking-icon">{item.jurusan.icon}</span>
                  </div>
                  <h3>{item.jurusan.nama}</h3>
                  <div className="ranking-score" style={{ color: rek.color }}>
                    <span className="score-big">{item.persentase}%</span>
                    <span className="score-label">{rek.level}</span>
                  </div>
                  <div className="progress-bar-horizontal">
                    <div 
                      className="progress-fill-horizontal" 
                      style={{ width: `${item.persentase}%`, background: rek.color }}
                    ></div>
                  </div>
                  <p className="ranking-desc">{item.jurusan.deskripsi}</p>
                  <div className="ranking-stats">
                    <span>✅ {item.jumlahKriteria} Kriteria Cocok</span>
                  </div>
                  <Link 
                    to={`/detail-perhitungan/${item.jurusan.id}`}
                    className="btn-link"
                  >
                    Detail Perhitungan →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Results Table */}
        <div className="all-results no-print">
          <h2>📋 Ranking Lengkap Semua Jurusan</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Jurusan</th>
                  <th>Kecocokan</th>
                  <th>Kriteria</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {hasil.map((item) => {
                  const rek = generateRekomendasi(item.persentase);
                  return (
                    <tr key={item.jurusan.id}>
                      <td>{getMedalEmoji(item.ranking)}</td>
                      <td>
                        <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>
                          {item.jurusan.icon}
                        </span>
                        {item.jurusan.nama}
                      </td>
                      <td>
                        <strong style={{ color: rek.color }}>
                          {item.persentase}%
                        </strong>
                      </td>
                      <td>{item.jumlahKriteria} kriteria</td>
                      <td>
                        <span 
                          className="status-badge" 
                          style={{ background: rek.color + '20', color: rek.color }}
                        >
                          {rek.emoji} {rek.level}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="hasil-actions no-print">
          <button onClick={handleCetakPDF} className="btn-secondary">
            🖨️ Cetak Hasil (PDF)
          </button>
          <button onClick={handleUlangKonsultasi} className="btn-primary">
            🔄 Konsultasi Ulang
          </button>
          <Link to="/" className="btn-outline">
            🏠 Kembali ke Beranda
          </Link>
        </div>

        {/* Info Box */}
        <div className="info-box-footer no-print">
          <h4>💡 Catatan Penting:</h4>
          <ul>
            <li>Hasil ini adalah rekomendasi berdasarkan jawaban yang kamu berikan</li>
            <li>Pertimbangkan juga faktor lain seperti passion, kondisi ekonomi, dan peluang kerja</li>
            <li>Konsultasikan dengan orangtua, guru, dan konselor sekolah</li>
            <li>Pelajari lebih dalam tentang jurusan yang direkomendasikan</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hasil;
