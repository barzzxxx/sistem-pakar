// Rules: Mapping Kriteria ke Jurusan dengan CF
export const rules = [
  // Teknik Informatika (jurusanId: 1)
  { jurusanId: 1, kriteriaId: 1, cfRule: 0.80 },  // G01 - Matematika
  { jurusanId: 1, kriteriaId: 2, cfRule: 0.90 },  // G02 - Analisis
  { jurusanId: 1, kriteriaId: 5, cfRule: 0.80 },  // G05 - Teliti
  { jurusanId: 1, kriteriaId: 6, cfRule: 0.90 },  // G06 - Nilai matematika
  { jurusanId: 1, kriteriaId: 13, cfRule: 0.90 }, // G13 - Teknologi

  // Manajemen (jurusanId: 2)
  { jurusanId: 2, kriteriaId: 2, cfRule: 0.85 },  // G02 - Analisis
  { jurusanId: 2, kriteriaId: 4, cfRule: 0.70 },  // G04 - Berbicara
  { jurusanId: 2, kriteriaId: 15, cfRule: 0.85 }, // G15 - Memimpin
  { jurusanId: 2, kriteriaId: 19, cfRule: 0.85 }, // G19 - Bisnis

  // Akuntansi (jurusanId: 3)
  { jurusanId: 3, kriteriaId: 5, cfRule: 0.80 },  // G05 - Teliti
  { jurusanId: 3, kriteriaId: 6, cfRule: 0.85 },  // G06 - Nilai matematika
  { jurusanId: 3, kriteriaId: 9, cfRule: 0.85 },  // G09 - Angka
  { jurusanId: 3, kriteriaId: 20, cfRule: 0.90 }, // G20 - Analisis data

  // Pendidikan (jurusanId: 4)
  { jurusanId: 4, kriteriaId: 4, cfRule: 0.75 },  // G04 - Berbicara
  { jurusanId: 4, kriteriaId: 7, cfRule: 0.75 },  // G07 - Bahasa Indonesia
  { jurusanId: 4, kriteriaId: 11, cfRule: 0.80 }, // G11 - Membantu
  { jurusanId: 4, kriteriaId: 17, cfRule: 0.75 }, // G17 - Sabar

  // DKV (jurusanId: 5)
  { jurusanId: 5, kriteriaId: 3, cfRule: 0.90 },  // G03 - Kreatif
  { jurusanId: 5, kriteriaId: 10, cfRule: 0.90 }, // G10 - Desain
  { jurusanId: 5, kriteriaId: 13, cfRule: 0.80 }, // G13 - Teknologi

  // Teknik Sipil (jurusanId: 6)
  { jurusanId: 6, kriteriaId: 1, cfRule: 0.85 },  // G01 - Matematika
  { jurusanId: 6, kriteriaId: 6, cfRule: 0.90 },  // G06 - Nilai matematika
  { jurusanId: 6, kriteriaId: 16, cfRule: 0.80 }, // G16 - Eksperimen

  // Psikologi (jurusanId: 7)
  { jurusanId: 7, kriteriaId: 2, cfRule: 0.85 },  // G02 - Analisis
  { jurusanId: 7, kriteriaId: 11, cfRule: 0.85 }, // G11 - Membantu
  { jurusanId: 7, kriteriaId: 17, cfRule: 0.80 }, // G17 - Sabar
  { jurusanId: 7, kriteriaId: 18, cfRule: 0.85 }, // G18 - Masalah sosial

  // Hukum (jurusanId: 8)
  { jurusanId: 8, kriteriaId: 7, cfRule: 0.75 },  // G07 - Bahasa Indonesia
  { jurusanId: 8, kriteriaId: 12, cfRule: 0.80 }, // G12 - Membaca
  { jurusanId: 8, kriteriaId: 14, cfRule: 0.85 }  // G14 - Berdebat
];

// Helper function untuk get rules by jurusan
export const getRulesByJurusan = (jurusanId) => {
  return rules.filter(rule => rule.jurusanId === jurusanId);
};

// Helper function untuk get jurusans by kriteria
export const getJurusansByKriteria = (kriteriaId) => {
  return rules.filter(rule => rule.kriteriaId === kriteriaId);
};
