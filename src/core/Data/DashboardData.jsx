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
export const teacherDummy = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  name: "Yaya Irawan Fujay",
  nip: "009776717627",
  mapel: "Bhs. Indonesia - Matematika",
  role: "Pengajar - BK",
  gender: i % 2 === 0 ? "Laki - laki" : "Perempuan",
}));
