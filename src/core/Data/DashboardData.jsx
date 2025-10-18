import {
    Contact,
    Home,
    UserRound,
    DoorOpen,
    IdCardLanyard,
    Calendar1,
    ChartColumnBig,
  } from "lucide-react";
  
export const data = [
    { hari: "Senin", hadir: 100, izin: 10 },
    { hari: "Selasa", hadir: 80, izin: 70 },
    { hari: "Rabu", hadir: 100, izin: 60 },
    { hari: "Kamis", hadir: 30, izin: 35 },
    { hari: "Jum'at", hadir: 40, izin: 45 },
  ];
  
export const aktivitas = [
    { nama: "Valen Abdul", kelas: "XII PPLG 3", jam: "07.30", status: "Terlambat" },
    { nama: "Budi Santoso", kelas: "XII PPLG 2", jam: "07.00", status: "Masuk" },
    { nama: "Rina Kartika", kelas: "XII PPLG 1", jam: "07.05", status: "Masuk" },
    { nama: "Dewi Lestari", kelas: "XII PPLG 4", jam: "07.15", status: "Masuk" },
    { nama: "Eka Saputra", kelas: "XII PPLG 3", jam: "07.00", status: "Masuk" },
    { nama: "Tono Hadi", kelas: "XII PPLG 1", jam: "07.10", status: "Masuk" },
  ];

  //data sidebar
export const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/home" },
    { name: "Guru", icon: <Contact size={20} />, path: "/home/guru" },
    { name: "Siswa", icon: <UserRound size={20} />, path: "/home/siswa" },
    { name: "Kelas & Jurusan", icon: <DoorOpen size={20} />, path: "/home/kelas" },
    { name: "RFID", icon: <IdCardLanyard size={20} />, path: "/home/rfid" },
    { name: "Tahun Ajaran", icon: <Calendar1 size={20} />, path: "/home/tahun-ajaran" },
    { name: "Rekap Absensi", icon: <ChartColumnBig size={20} />, path: "/home/rekap" },
    { name: "Jadwal Pelajaran", icon: <ChartColumnBig size={20} />, path: "/home/jadwal" },
  ];

  //data guru

export const teacherDummy = [
  { id: 1, name: "Budi Santoso", gender: "Laki - laki", nip: "197001012000011001", mapel: "Matematika", role: "Pengajar", nik: "3512345678901234", tanggalLahir: "1970-01-01", tempatLahir: "Surabaya", noTelepon: "081234567001", agama: "Islam", alamat: "Jl. Mawar No. 1, Surabaya, Jawa Timur" },
  { id: 2, name: "Ani Suryani", gender: "Perempuan", nip: "198505202008012005", mapel: "Bahasa Indonesia", role: "Wali Kelas", nik: "3512345678901235", tanggalLahir: "1985-05-20", tempatLahir: "Bandung", noTelepon: "081234567002", agama: "Islam", alamat: "Jl. Melati No. 5, Bandung, Jawa Barat" },
  { id: 3, name: "Cahyo Utomo", gender: "Laki - laki", nip: "199211152015031010", mapel: "IPS", role: "BK", nik: "3512345678901236", tanggalLahir: "1992-11-15", tempatLahir: "Malang", noTelepon: "081234567003", agama: "Katolik", alamat: "Jl. Anggrek No. 10, Malang, Jawa Timur" },
  { id: 4, name: "Dewi Fatimah", gender: "Perempuan", nip: "197808222005022003", mapel: "IPA", role: "Waka Kurikulum", nik: "3512345678901237", tanggalLahir: "1978-08-22", tempatLahir: "Yogyakarta", noTelepon: "081234567004", agama: "Kristen", alamat: "Jl. Dahlia No. 15, Yogyakarta, DIY" },
  { id: 5, name: "Eko Prasetyo", gender: "Laki - laki", nip: "198003102007011002", mapel: "Matematika", role: "Pengajar", nik: "3512345678901238", tanggalLahir: "1980-03-10", tempatLahir: "Jakarta", noTelepon: "081234567005", agama: "Islam", alamat: "Jl. Kenanga No. 20, Jakarta, DKI Jakarta" },
  { id: 6, name: "Fifi Afifah", gender: "Perempuan", nip: "199506252020072007", mapel: "Bahasa Indonesia", role: "Pengajar", nik: "3512345678901239", tanggalLahir: "1995-06-25", tempatLahir: "Semarang", noTelepon: "081234567006", agama: "Islam", alamat: "Jl. Lily No. 25, Semarang, Jawa Tengah" },
  { id: 7, name: "Gatot Subroto", gender: "Laki - laki", nip: "197509012002011004", mapel: "IPA", role: "Pengajar", nik: "3512345678901240", tanggalLahir: "1975-09-01", tempatLahir: "Denpasar", noTelepon: "081234567007", agama: "Hindu", alamat: "Jl. Teratai No. 30, Denpasar, Bali" },
  { id: 8, name: "Hana Lestari", gender: "Perempuan", nip: "198812032012042006", mapel: "IPS", role: "Wali Kelas", nik: "3512345678901241", tanggalLahir: "1988-12-03", tempatLahir: "Medan", noTelepon: "081234567008", agama: "Islam", alamat: "Jl. Tulip No. 35, Medan, Sumatera Utara" },
  { id: 9, name: "Joko Susilo", gender: "Laki - laki", nip: "197204182001011003", mapel: "Matematika", role: "BK", nik: "3512345678901242", tanggalLahir: "1972-04-18", tempatLahir: "Palembang", noTelepon: "081234567009", agama: "Buddha", alamat: "Jl. Sakura No. 40, Palembang, Sumatera Selatan" },
  { id: 10, name: "Kiki Amelia", gender: "Perempuan", nip: "199010102014022001", mapel: "Matematika", role: "Pengajar", nik: "3512345678901243", tanggalLahir: "1990-10-10", tempatLahir: "Makassar", noTelepon: "081234567010", agama: "Konghucu", alamat: "Jl. Alamanda No. 45, Makassar, Sulawesi Selatan" },
  { id: 11, name: "Luthfi Nugroho", gender: "Laki - laki", nip: "199102142016051001", mapel: "Fisika", role: "Pengajar", nik: "3512345678901244", tanggalLahir: "1991-02-14", tempatLahir: "Bandung", noTelepon: "081234567011", agama: "Islam", alamat: "Jl. Angsa No. 1, Bandung, Jawa Barat" },
  { id: 12, name: "Mila Kartika", gender: "Perempuan", nip: "198307072006032002", mapel: "Kimia", role: "Wali Kelas", nik: "3512345678901245", tanggalLahir: "1983-07-07", tempatLahir: "Surabaya", noTelepon: "081234567012", agama: "Katolik", alamat: "Jl. Merpati No. 2, Surabaya, Jawa Timur" },
  { id: 13, name: "Nanda Pratama", gender: "Laki - laki", nip: "197410282003011005", mapel: "Biologi", role: "BK", nik: "3512345678901246", tanggalLahir: "1974-10-28", tempatLahir: "Yogyakarta", noTelepon: "081234567013", agama: "Kristen", alamat: "Jl. Elang No. 3, Yogyakarta, DIY" },
  { id: 14, name: "Putri Amanda", gender: "Perempuan", nip: "199301052018082004", mapel: "Sejarah", role: "Pengajar", nik: "3512345678901247", tanggalLahir: "1993-01-05", tempatLahir: "Jakarta", noTelepon: "081234567014", agama: "Islam", alamat: "Jl. Rajawali No. 4, Jakarta, DKI Jakarta" },
  { id: 15, name: "Rizky Firmansyah", gender: "Laki - laki", nip: "198704202010041006", mapel: "Geografi", role: "Waka Kurikulum", nik: "3512345678901248", tanggalLahir: "1987-04-20", tempatLahir: "Medan", noTelepon: "081234567015", agama: "Islam", alamat: "Jl. Kakaktua No. 5, Medan, Sumatera Utara" },
];