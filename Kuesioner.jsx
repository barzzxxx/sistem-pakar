import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kriterias } from '../data/kriterias';
import { prosesKonsultasi, validasiJawaban } from '../utils/certaintyFactor';

const Kuesioner = ({ konsultasiData, setKonsultasiData }) => {
  const navigate = useNavigate();
  const [jawaban, setJawaban] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showCFModal, setShowCFModal] = useState(false);
  const [selectedKriteria, setSelectedKriteria] = useState(null);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(kriterias.length / itemsPerPage);

  useEffect(() => {
    // Redirect jika belum isi data diri
    if (!konsultasiData || !konsultasiData.nama) {
      navigate('/konsultasi');
    }

    // Initialize jawaban
    const initJawaban = {};
    kriterias.forEach(k => {
      initJawaban[k.id] = {
        jawab: false,
        cfUser: 0.8 // Default CF user
      };
    });
    setJawaban(initJawaban);
  }, [konsultasiData, navigate]);

  const handleJawabChange = (kriteriaId, jawab) => {
    setJawaban({
      ...jawaban,
      [kriteriaId]: {
        ...jawaban[kriteriaId],
        jawab: jawab
      }
    });
  };

  const handleCFChange = (kriteriaId, cfValue) => {
    setJawaban({
      ...jawaban,
      [kriteriaId]: {
        ...jawaban[kriteriaId],
        cfUser: parseFloat(cfValue)
      }
    });
  };

  const openCFModal = (kriteria) => {
    setSelectedKriteria(kriteria);
    setShowCFModal(true);
  };

  const closeCFModal = () => {
    setShowCFModal(false);
    setSelectedKriteria(null);
  };

  const handleSubmit = () => {
    // Validasi
    const validation = validasiJawaban(jawaban);
    
    if (!validation.valid) {
      alert('Error:\n' + validation.errors.join('\n'));
      return;
    }

    // Proses perhitungan CF
    const hasil = prosesKonsultasi(jawaban);

    // Simpan hasil
    setKonsultasiData({
      ...konsultasiData,
      jawaban: jawaban,
      hasil: hasil,
      tanggalSelesai: new Date().toISOString()
    });

    // Navigate ke hasil
    navigate('/hasil');
  };

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentKriterias = kriterias.slice(startIndex, endIndex);

  // Progress
  const jumlahDijawab = Object.values(jawaban).filter(j => j.jawab === true || j.jawab === false).length;
  const progress = (jumlahDijawab / kriterias.length) * 100;

  return (
    <div className="page">
      <div className="container">
        <div className="kuesioner-container">
          <div className="kuesioner-header">
            <h1>📝 Kuesioner</h1>
            <p>Jawab 20 pertanyaan berikut sesuai dengan minat dan bakatmu</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}>
                {progress.toFixed(0)}%
              </div>
            </div>
            <p className="progress-text">
              {jumlahDijawab} dari {kriterias.length} pertanyaan
            </p>
          </div>

          <div className="kuesioner-body">
            <div className="info-box">
              <strong>ℹ️ Cara Mengisi:</strong>
              <ul>
                <li>Pilih <strong>Ya</strong> jika pernyataan sesuai denganmu</li>
                <li>Pilih <strong>Tidak</strong> jika pernyataan tidak sesuai</li>
                <li>Jika memilih <strong>Ya</strong>, tentukan tingkat keyakinanmu (20% - 100%)</li>
              </ul>
            </div>

            {currentKriterias.map((kriteria, index) => {
              const nomorUrut = startIndex + index + 1;
              const jawabanKriteria = jawaban[kriteria.id] || { jawab: null, cfUser: 0.8 };

              return (
                <div key={kriteria.id} className="question-card">
                  <div className="question-header">
                    <span className="question-number">{nomorUrut}</span>
                    <span className="question-text">{kriteria.nama}</span>
                  </div>

                  <div className="question-actions">
                    <div className="radio-group">
                      <label className={`radio-label ${jawabanKriteria.jawab === true ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name={`kriteria-${kriteria.id}`}
                          checked={jawabanKriteria.jawab === true}
                          onChange={() => handleJawabChange(kriteria.id, true)}
                        />
                        <span>✅ Ya</span>
                      </label>
                      <label className={`radio-label ${jawabanKriteria.jawab === false ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name={`kriteria-${kriteria.id}`}
                          checked={jawabanKriteria.jawab === false}
                          onChange={() => handleJawabChange(kriteria.id, false)}
                        />
                        <span>❌ Tidak</span>
                      </label>
                    </div>

                    {jawabanKriteria.jawab === true && (
                      <div className="cf-slider">
                        <label>
                          Tingkat Keyakinan: <strong>{(jawabanKriteria.cfUser * 100).toFixed(0)}%</strong>
                        </label>
                        <input
                          type="range"
                          min="0.2"
                          max="1"
                          step="0.1"
                          value={jawabanKriteria.cfUser}
                          onChange={(e) => handleCFChange(kriteria.id, e.target.value)}
                          className="slider"
                        />
                        <div className="slider-labels">
                          <span>Ragu (20%)</span>
                          <span>Yakin (100%)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="kuesioner-footer">
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-secondary"
              >
                ← Sebelumnya
              </button>
              <span className="page-info">
                Halaman {currentPage} dari {totalPages}
              </span>
              {currentPage < totalPages ? (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="btn-primary"
                >
                  Selanjutnya →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn-success"
                >
                  🎯 Lihat Hasil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kuesioner;
