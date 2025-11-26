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
    Activity,
    ClipboardCheck,
    
  } from "lucide-react";



//data sidebar  admin
export const menuItemsOperator = [
    { name: "Home", icon: <Home size={20} />, path: "/home" },
    { name: "Guru", icon: <Contact size={20} />, path: "/home/guru" },
    { name: "Siswa", icon: <UsersRound size={20} />, path: "/home/siswa" },
    { name: "Kelas & Jurusan", icon: <DoorOpen size={20} />, path: "/home/major" },
    { name: "Mata Pelajaran", icon: <ChartColumnBig size={20} />, path: "/home/maple" },
    { name: "Jadwal Pelajaran", icon: <CalendarDays size={20} />, path: "/home/Shedule" },
    { name: "Tahun Ajaran", icon: <Calendar1 size={20} />, path: "/home/tahun-ajaran" },
    { name: "Pengaturan Jam", icon: <Clock size={20} />, path: "/home/absen-rfid" },
    { name: "RFID", icon: <IdCardLanyard size={20} />, path: "/home/rfid" },
    
  ];



//data sidebar student

export const menuItemSiswa = [
    {name: "Home", icon: <Home size={20} />, path: "/student-home" },
    {name: "Kelas Saya", icon : <UserRound size={20}/>, path: "/student-home/student-class"},
    {name: "Absensi", icon: <CircleCheckBig size={20} />, path: "/student-home/student-attendance"},
    {name: "Jadwal Pelajaran", icon: <CalendarDays size={20} />, path: "/student-home/student-schedule" },
    {name: "Izin", icon: <FileText size={20}/>, path:"/student-home/student-license" },
];


//data sidebar teacher

export const menuItemTeacher = [
    {name: "Home", icon:<Home size={20} />, path: "/teacher-home"},
    {name: "Absensi Kelas " , icon: <CircleCheckBig size={20} />, path: "/teacher-home/attendance-teacher"},
    {name: "Jadwal Mengajar",icon: <CalendarDays size={20} />, path: "/teacher-home/teacher-schedule" },
];

export const menuItemHomeRoom = [
    {name: "Home", icon:<Home size={20} />, path: "/homeroom-home"},
    {name: "Absensi Kelas " , icon: <CircleCheckBig size={20} />, path: "/homeroom-home/attendance-teacher"},
    {name: "Jadwal Mengajar",icon: <CalendarDays size={20} />, path: "/homeroom-home/teacher-schedule" },
    {name: "Rekap Kelas",icon: <CalendarDays size={20} />, path: "/homeroom-home/class-recap" },
];


//data sidebar bk 
export const menuItemBk = [
  {name: "Home", icon:<Home size={20}/>, path: "/bk-home"},
  {name: "Monitoring Absen", icon:  <Activity size={20} />, path: "/bk-home/monitoring-absen"},
  {name: "Statistik Global", icon: <ChartColumnBig size={20} />, path: "/bk-home/statistik-global"},
  {name: "Verifikasi Izin", icon: <ClipboardCheck  size={20} />, path: "/bk-home/verifikasi-izin"},
]