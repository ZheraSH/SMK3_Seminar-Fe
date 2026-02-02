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
    LayoutGrid,
    UserRoundPen,
    Puzzle,
    BookMarked,
    CalendarSearch,
    CalendarClock,
    IdCard,
    TrendingUp,
    ChartNoAxesCombined,
    KeyRound,
    
  } from "lucide-react";



//data sidebar  admin
export const menuItemsOperator = [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/home" },
    { name: "Guru", icon: <UserRoundPen size={20} />, path: "/home/guru" },
    { name: "Siswa", icon: <UsersRound size={20} />, path: "/home/siswa" },
    { name: "Tahun Ajaran", icon: <Calendar1 size={20} />, path: "/home/tahun-ajaran" },
    { name: "Jurusan", icon: <Puzzle size={20} />, path: "/home/major" },
    { name: "Kelas", icon: <DoorOpen size={20} />, path: "/home/class" },
    { name: "Mata Pelajaran", icon: <BookMarked size={20} />, path: "/home/maple" },
    { name: "Jadwal Pelajaran", icon: <CalendarSearch size={20} />, path: "/home/Shedule" },
    { name: "Settings Jam Absen", icon: <CalendarClock size={20} />, path: "/home/absen-rfid" },
    { name: "Management RFID", icon: <IdCard size={20} />, path: "/home/rfid" },
    { name: "Master Card", icon: <KeyRound size={20} />, path: "/home/mastercard" },
    
  ];



//data sidebar student

export const menuItemSiswa = [
    {name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/student-home" },
    {name: "Kelas Saya", icon : <UserRound size={20}/>, path: "/student-home/student-class"},
    {name: "Absensi", icon: <CircleCheckBig size={20} />, path: "/student-home/absen-student"},
    {name: "Jadwal Pelajaran", icon: <CalendarSearch size={20} />, path: "/student-home/student-schedule" },
    {name: "Izin", icon: <FileText size={20}/>, path:"/student-home/student-license" },
];


//data sidebar teacher

export const menuItemTeacher = [
    {name: "Home", icon:<Home size={20} />, path: "/teacher-home"},
    {name: "Absensi Kelas " , icon: <CircleCheckBig size={20} />, path: "/teacher-home/attendance-teacher"},
    {name: "Jadwal Mengajar",icon: <CalendarDays size={20} />, path: "/teacher-home/teacher-schedule" },
];

export const menuItemHomeRoom = [
    {name: "Dashboard", icon:<LayoutGrid size={20} />, path: "/homeroom-home/home"},
    // {name: "Monitoring Kelas", icon:<TrendingUp size={20} />, path: "/homeroom-home/home"},
    // {name: "Absensi Kelas " , icon: <CircleCheckBig size={20} />, path: "/teacher-home/attendance-teacher"},
    // {name: "Jadwal Mengajar",icon: <CalendarDays size={20} />, path: "/teacher-home/teacher-schedule" },
    {name: "Rekap Absensi",icon: <FileText size={20} />, path: "/homeroom-home/class-recap" },
];


//data sidebar bk 
export const menuItemBk = [
  {name: "Dashboard", icon:<LayoutGrid size={20}/>, path: "/bk-home"},
  {name: "Monitoring ", icon:  <TrendingUp size={20} />, path: "/bk-home/monitoring-absen"},
  {name: "Statistik Global", icon: <ChartNoAxesCombined size={20} />, path: "/bk-home/statistik-global"},
  {name: " Izin", icon: <FileText  size={20} />, path: "/bk-home/verifikasi-izin"},
]



export const multiRoleCommon = [
  { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/dashboard" },
];

export const multiRoleTeacher = [
  { name: "Absensi Kelas", icon: <CircleCheckBig size={20} />, path: "/dashboard/attendance-teacher" },
  { name: "Jadwal Mengajar", icon: <CalendarDays size={20} />, path: "/dashboard/teacher-schedule" },
];

export const multiRoleHomeroom = [
  { name: "Rekap Absensi", icon: <FileText size={20} />, path: "/dashboard/class-recap" },
];

export const multiRoleCounselor = [
  { name: "Monitoring Absen", icon: <TrendingUp size={20} />, path: "/dashboard/monitoring-absen" },
  { name: "Verifikasi Izin", icon: <FileText size={20} />, path: "/dashboard/verifikasi-izin" },
  { name: "Statistik Global", icon: <ChartNoAxesCombined size={20} />, path: "/dashboard/statistik-global" },
];