import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataDiri = ({ setKonsultasiData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    asalSekolah: '',
    jenisKelamin: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error saat user mulai mengetik
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama harus diisi';
    }
    
    if (!formData.jenisKelamin) {
      newErrors.jenisKelamin = 'Jenis kelamin harus dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Simpan data konsultasi
      setKonsultasiData({
        ...formData,
        tanggal: new Date().toISOString(),
        jawaban: {},
        hasil: null
      });
      
      // Navigate ke kuesioner
      navigate('/kuesioner');
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <h1>📋 Data Diri</h1>
            <p>Isi data dirimu terlebih dahulu sebelum memulai konsultasi</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="nama">
                Nama Lengkap <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan nama lengkapmu"
                className={errors.nama ? 'error' : ''}
              />
              {errors.nama && <span className="error-message">{errors.nama}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="asalSekolah">
                Asal Sekolah
              </label>
              <input
                type="text"
                id="asalSekolah"
                name="asalSekolah"
                value={formData.asalSekolah}
                onChange={handleChange}
                placeholder="Contoh: SMA Negeri 1 Jakarta"
              />
            </div>

            <div className="form-group">
              <label htmlFor="jenisKelamin">
                Jenis Kelamin <span className="required">*</span>
              </label>
              <select
                id="jenisKelamin"
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleChange}
                className={errors.jenisKelamin ? 'error' : ''}
              >
                <option value="">-- Pilih Jenis Kelamin --</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              {errors.jenisKelamin && <span className="error-message">{errors.jenisKelamin}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email (Opsional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
              <small className="form-hint">Untuk menerima hasil konsultasi via email</small>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary btn-large">
                Lanjut ke Kuesioner →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataDiri;
