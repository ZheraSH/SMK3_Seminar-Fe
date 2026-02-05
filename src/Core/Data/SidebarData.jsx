import {
  Home,
  UsersRound,
  DoorOpen,
  Calendar1,
  CalendarDays,
  UserRound,
  CircleCheckBig,
  FileText,
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
  Info,
  Newspaper,
  LogIn,
} from "lucide-react";
import { FaPhone } from "react-icons/fa";




export const ROLE_MENUS = {
  school_operator: [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/home" },
    { name: "Guru", icon: <UserRoundPen size={20} />, path: "/home/guru" },
    { name: "Siswa", icon: <UsersRound size={20} />, path: "/home/siswa" },
    { name: "Tahun Ajaran", icon: <Calendar1 size={20} />, path: "/home/tahun-ajaran" },
    { name: "Jurusan", icon: <Puzzle size={20} />, path: "/home/major" },
    { name: "Kelas", icon: <DoorOpen size={20} />, path: "/home/class" },
    { name: "Mata Pelajaran", icon: <BookMarked size={20} />, path: "/home/maple" },
    { name: "Jadwal Pelajaran", icon: <CalendarSearch size={20} />, path: "/home/Shedule" },
    { name: "Pengaturan Jam Absen", icon: <CalendarClock size={20} />, path: "/home/absen-rfid" },
    { name: "Management RFID", icon: <IdCard size={20} />, path: "/home/rfid" },
    { name: "Master Card", icon: <KeyRound size={20} />, path: "/home/mastercard" },
  ],
  student: [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/student-home" },
    { name: "Kelas Saya", icon: <UserRound size={20} />, path: "/student-home/student-class" },
    { name: "Absensi", icon: <CircleCheckBig size={20} />, path: "/student-home/absen-student" },
    { name: "Jadwal Pelajaran", icon: <CalendarSearch size={20} />, path: "/student-home/student-schedule" },
    { name: "Izin", icon: <FileText size={20} />, path: "/student-home/student-license" },
  ],
  teacher: [
    { name: "Home", icon: <Home size={20} />, path: "/teacher-home" },
    { name: "Absensi Kelas ", icon: <CircleCheckBig size={20} />, path: "/teacher-home/attendance-teacher" },
    { name: "Jadwal Mengajar", icon: <CalendarDays size={20} />, path: "/teacher-home/teacher-schedule" },
  ],
  homeroom_teacher: [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/homeroom-home/home" },
    { name: "Rekap Absensi", icon: <FileText size={20} />, path: "/homeroom-home/class-recap" },
  ],
  counselor: [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/bk-home" },
    { name: "Monitoring ", icon: <TrendingUp size={20} />, path: "/bk-home/monitoring-absen" },
    { name: "Statistik Global", icon: <ChartNoAxesCombined size={20} />, path: "/bk-home/statistik-global" },
    { name: " Izin", icon: <FileText size={20} />, path: "/bk-home/verifikasi-izin" },
  ],
  landing_page: [
    { name: "Beranda", icon: <Home size={20} />, path: "/" },
    { name: "Tentang", icon: <Info size={20} />, path: "/tentang" },
    { name: "Berita", icon: <Newspaper size={20} />, path: "/berita" },
    { name: "Kontak", icon: <FaPhone size={20} />, path: "/#contact" },
    { name: "Masuk", icon: <LogIn size={20} />, path: "/login" },
  ]
};




export const multiRoleCommon = [
  { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/dashboard" },
];
