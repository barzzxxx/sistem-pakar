import { rules } from '../data/rules';
import { kriterias } from '../data/kriterias';
import { jurusans } from '../data/jurusans';

/**
 * Hitung CF untuk satu kriteria
 * Formula: CF[H,E] = CF_pakar × CF_user
 */
export const hitungCFKriteria = (cfPakar, cfUser) => {
  return cfPakar * cfUser;
};

/**
 * Kombinasi CF untuk multiple kriteria
 * Formula: CF_combine = CF_old + CF_new × (1 - CF_old)
 */
export const kombinasiCF = (cfValues) => {
  if (cfValues.length === 0) return 0;
  if (cfValues.length === 1) return cfValues[0];

  let cfCombine = cfValues[0];

  for (let i = 1; i < cfValues.length; i++) {
    cfCombine = cfCombine + (cfValues[i] * (1 - cfCombine));
  }

  return cfCombine;
};

/**
 * Proses konsultasi dan hitung CF untuk semua jurusan
 * @param {Object} jawaban - Object dengan key: kriteriaId, value: { jawab: boolean, cfUser: number }
 * @returns {Array} Hasil perhitungan dengan ranking
 */
export const prosesKonsultasi = (jawaban) => {
  const hasil = [];

  // Loop setiap jurusan
  jurusans.forEach(jurusan => {
    const cfValues = [];

    // Ambil rules untuk jurusan ini
    const jurusanRules = rules.filter(rule => rule.jurusanId === jurusan.id);

    // Hitung CF untuk setiap rule yang dijawab YA
    jurusanRules.forEach(rule => {
      const jawabanKriteria = jawaban[rule.kriteriaId];

      if (jawabanKriteria && jawabanKriteria.jawab) {
        // CF[H,E] = CF_pakar × CF_user
        const cfHE = rule.cfRule * jawabanKriteria.cfUser;
        cfValues.push(cfHE);
      }
    });

    // Kombinasikan semua CF
    const cfHasil = kombinasiCF(cfValues);
    const persentase = (cfHasil * 100).toFixed(2);

    hasil.push({
      jurusan: jurusan,
      cfHasil: cfHasil,
      persentase: parseFloat(persentase),
      cfValues: cfValues, // Untuk detail perhitungan
      jumlahKriteria: cfValues.length
    });
  });

  // Sort berdasarkan CF tertinggi
  hasil.sort((a, b) => b.cfHasil - a.cfHasil);

  // Tambahkan ranking
  hasil.forEach((item, index) => {
    item.ranking = index + 1;
  });

  return hasil;
};

/**
 * Get detail perhitungan CF untuk satu jurusan
 */
export const getDetailPerhitungan = (jurusanId, jawaban) => {
  const jurusanRules = rules.filter(rule => rule.jurusanId === jurusanId);
  const detail = [];

  jurusanRules.forEach(rule => {
    const jawabanKriteria = jawaban[rule.kriteriaId];
    const kriteria = kriterias.find(k => k.id === rule.kriteriaId);

    if (jawabanKriteria && jawabanKriteria.jawab) {
      const cfHE = rule.cfRule * jawabanKriteria.cfUser;

      detail.push({
        kriteria: kriteria,
        cfPakar: rule.cfRule,
        cfUser: jawabanKriteria.cfUser,
        cfHE: cfHE
      });
    }
  });

  return detail;
};

/**
 * Generate rekomendasi berdasarkan persentase
 */
export const generateRekomendasi = (persentase) => {
  if (persentase >= 80) {
    return {
      level: 'Sangat Cocok',
      emoji: '🎯',
      color: '#1cc88a',
      advice: 'Jurusan ini sangat sesuai dengan minat dan bakatmu! Tingkatkan persiapan untuk masuk jurusan ini.'
    };
  } else if (persentase >= 60) {
    return {
      level: 'Cocok',
      emoji: '✅',
      color: '#36b9cc',
      advice: 'Jurusan ini cukup sesuai denganmu. Pertimbangkan untuk mendalami lebih lanjut tentang jurusan ini.'
    };
  } else if (persentase >= 40) {
    return {
      level: 'Cukup Cocok',
      emoji: '⚠️',
      color: '#f6c23e',
      advice: 'Jurusan ini bisa menjadi pilihan alternatif. Pelajari lebih dalam sebelum memutuskan.'
    };
  } else {
    return {
      level: 'Kurang Cocok',
      emoji: '❌',
      color: '#e74a3b',
      advice: 'Jurusan ini kurang sesuai dengan profil dan minatmu saat ini.'
    };
  }
};

/**
 * Validasi jawaban kuesioner
 */
export const validasiJawaban = (jawaban) => {
  const errors = [];
  let jumlahYa = 0;

  // Cek apakah semua kriteria sudah dijawab
  kriterias.forEach(kriteria => {
    if (!jawaban[kriteria.id]) {
      errors.push(`Kriteria "${kriteria.nama}" belum dijawab`);
    } else if (jawaban[kriteria.id].jawab) {
      jumlahYa++;
      
      // Jika jawab YA, CF user harus diisi
      if (!jawaban[kriteria.id].cfUser || jawaban[kriteria.id].cfUser < 0.2 || jawaban[kriteria.id].cfUser > 1) {
        errors.push(`Tingkat keyakinan untuk "${kriteria.nama}" tidak valid`);
      }
    }
  });

  // Minimal 3 kriteria harus dijawab YA
  if (jumlahYa < 3) {
    errors.push('Minimal 3 kriteria harus dijawab YA untuk mendapatkan rekomendasi yang akurat');
  }

  return {
    valid: errors.length === 0,
    errors: errors,
    jumlahYa: jumlahYa
  };
};

/**
 * Format CF untuk display
 */
export const formatCF = (cf) => {
  return (cf * 100).toFixed(2) + '%';
};

/**
 * Get emoji medal berdasarkan ranking
 */
export const getMedalEmoji = (ranking) => {
  switch (ranking) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return `#${ranking}`;
  }
};
