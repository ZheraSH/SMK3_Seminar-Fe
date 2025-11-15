import {
    Contact,
    Home,
    UsersRound,
    DoorOpen,
    IdCardLanyard,
    Calendar1,
    ChartColumnBig,
    CalendarDays,
    Clock,
    UserRound,
    CircleCheckBig ,
    FileText,
  } from "lucide-react";



//data sidebar  admin
export const menuItemsOperator = [
    { name: "Home", icon: <Home size={20} />, path: "/home" },
    { name: "Guru", icon: <Contact size={20} />, path: "/home/guru" },
    { name: "Siswa", icon: <UsersRound size={20} />, path: "/home/siswa" },
    { name: "Kelas & Jurusan", icon: <DoorOpen size={20} />, path: "/home/major" },
    { name: "Mata Pelajaran", icon: <ChartColumnBig size={20} />, path: "/home/maple" },
    { name: "Jadwal Pelajaran", icon: <CalendarDays size={20} />, path: "/home/jadwalpelajaran" },
    { name: "Tahun Ajaran", icon: <Calendar1 size={20} />, path: "/home/tahun-ajaran" },
    { name: "Pengaturan Jam", icon: <Clock size={20} />, path: "/home/pengaturan-jam" },
    { name: "RFID", icon: <IdCardLanyard size={20} />, path: "/home/rfid" },
    
  ];



//data sidebar user

export const menuItemSiswa = [
    {name: "Home", icon: <Home size={20} />, path: "/home-siswa" },
    {name: "Kelas Saya", icon : <UserRound size={20}/>, path: "/home-siswa/kelas-student"},
    {name: "Absensi", icon: <CircleCheckBig size={20} />, path: "home-siswa/absen"},
    {name: "Jadwal Pelajaran", icon: <CalendarDays size={20} />, path: "/home-siswa/jadwal-student" },
    {name: "Izin", icon: <FileText size={20}/>, path:"/home-siswa/izin" },
];

