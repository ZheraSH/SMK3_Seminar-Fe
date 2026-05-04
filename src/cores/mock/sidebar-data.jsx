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
  ClipboardClock,
} from "lucide-react";
import { FaPhone } from "react-icons/fa";




export const ROLE_MENUS = {
  school_operator: [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/home" },
    { name: "Guru", icon: <UserRoundPen size={20} />, path: "/home/employees" },
    { name: "Siswa", icon: <UsersRound size={20} />, path: "/home/students" },
    { name: "Tahun Ajaran", icon: <Calendar1 size={20} />, path: "/home/school-years" },
    { name: "Jurusan", icon: <Puzzle size={20} />, path: "/home/majors" },
    { name: "Kelas", icon: <DoorOpen size={20} />, path: "/home/class-students" },
    { name: "Mata Pelajaran", icon: <BookMarked size={20} />, path: "/home/subjects" },
    { name: "Jadwal Pelajaran", icon: <CalendarSearch size={20} />, path: "/home/lesson-schedules" },
    { name: "Pengaturan Jam Absen", icon: <CalendarClock size={20} />, path: "/home/attendance-rules" },
    { name: "Monitoring Kehadiran", icon: <ClipboardClock size={20} />, path: "/home/monitoring-students" },
    { name: "Management RFID", icon: <IdCard size={20} />, path: "/home/rfids" },
    { name: "Master Card", icon: <KeyRound size={20} />, path: "/home/mastercards" },
  ],
  student: [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/student-home" },
    { name: "Kelas Saya", icon: <UserRound size={20} />, path: "/student-home/student-classroom" },
    { name: "Absensi", icon: <CircleCheckBig size={20} />, path: "/student-home/absence-student" },
    { name: "Jadwal Pelajaran", icon: <CalendarSearch size={20} />, path: "/student-home/student-schedule" },
    { name: "Izin", icon: <FileText size={20} />, path: "/student-home/student-license" },
  ],
  teacher: [
    { name: "Home", icon: <Home size={20} />, path: "/teacher-home" },
    { name: "Absensi Kelas ", icon: <CircleCheckBig size={20} />, path: "/teacher-home/attendance-teacher" },
    { name: "Jadwal Mengajar", icon: <CalendarDays size={20} />, path: "/teacher-home/teacher-schedule" },
  ],
  homeroom_teacher: [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/homeroom-home" },
    { name: "Rekap Absensi", icon: <FileText size={20} />, path: "/homeroom-home/classroom-recap" },
  ],
  counselor: [
    { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/counselor-home" },
    { name: "Monitoring ", icon: <TrendingUp size={20} />, path: "/counselor-home/monitoring-absence" },
    { name: "Statistik Global", icon: <ChartNoAxesCombined size={20} />, path: "/counselor-home/global-statistics" },
    { name: " Izin", icon: <FileText size={20} />, path: "/counselor-home/permission-verification" },
  ],
  landing_page: [
    { name: "Beranda", icon: <Home size={20} />, path: "/" },
    { name: "Tentang", icon: <Info size={20} />, path: "/about" },
    { name: "Berita", icon: <Newspaper size={20} />, path: "/news" },
    { name: "Galery", icon: <Newspaper size={20} />, path: "/galery" },
    { name: "Masuk", icon: <LogIn size={20} />, path: "/login" },
  ]
};




export const multiRoleCommon = [
  { name: "Dashboard", icon: <LayoutGrid size={20} />, path: "/dashboard" },
];
