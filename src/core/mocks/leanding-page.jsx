import { ArrowRight,
    ClipboardCheck, 
    LayoutDashboard, 
    Settings,
    Users, 
    Home, 
    ClipboardList, 
    Zap, 
    ChevronRight, 
    ShieldCheck, 
    CalendarDays, 
    Database, 
    Plus, 
    Minus,
    IdCardLanyard, 
    BookOpenCheck,
    FileChartColumn, 
} from "lucide-react";


export const stats = [
    { label: "Pengguna Aktif", value: 1200, suffix: "+", icon: <Users size={24} />, bgColor: "bg-blue-50", iconColor: "text-blue-500" },
    { label: "Kelas Terpantau", value: 36, suffix: "", icon: <Home size={24} />, bgColor: "bg-yellow-50", iconColor: "text-yellow-500" },
    { label: "Data Absensi Tercatat", value: 120000, suffix: "+", icon: <ClipboardList size={24} />, bgColor: "bg-purple-50", iconColor: "text-purple-500" },
    { label: "Sinkronisasi Data", value: 100, suffix: "% Realtime", icon: <Zap size={24} />, bgColor: "bg-emerald-50", iconColor: "text-emerald-500" },
];

export const teamData = [
    {
        id: 1,
        name: "Hilman Nidal Hamzi",
        role: "Project Manager",
        image: "/images/team/hilman3.jpg",
        social: { whatsapp: "https://wa.me/6282143506574", github: "https://github.com/kaz-hero123 ", instagram: "https://www.instagram.com/hilman_nidal/ " }
    },
    {
        id: 2,
        name: "Angga Rahmadani",
        role: "UI/UX Designer",
        image: "/images/team/angga2.jpg", 
        social: { whatsapp: "https://wa.me/6287872784941", github: "https://github.com/NekoDayouu ", instagram: "https://www.instagram.com/ghaaa_0" }
    },
    {
        id: 3,
        name: "Nur Lovvita Dwi Ayuni",
        role: "UI/UX Designer",
        image: "/images/team/vita2.jpg",
        social: { whatsapp: "https://wa.me/6281915023390", github: "https://github.com/lovvitaa", instagram: "https://www.instagram.com/nurlvdnii_?igsh=MWVzZDM1ZXlvdXoydA==&utm_source=ig_contact_invite" }
    },
    {
        id: 4,
        name: "Jaka Kusuma Admaja",
        role: "UI/UX Designer",
        image: "/images/team/jaka2.jpg",
        social: { whatsapp: "https://wa.me/6281352535558", github: "#", instagram: "https://www.instagram.com/uma_aa25?igsh=MXE3cmxzYnd3cWpvZA==" }
    },
    {
        id: 5,
        name: "Ega Cairigio Meifirdo",
        role: "Backend Engineer",
        image: "/images/team/ega2.jpg",
        social: { whatsapp: "https://wa.me/6281234295529", github: "https://github.com/ZheraSH", instagram: "https://www.instagram.com/zhera_shi/" }
    },
    {
        id: 6,
        name: "Moh Ghiyats Romzi R.",
        role: "Backend Engineer",
        image: "/images/team/giat2.jpg",
        social: { whatsapp: "https://wa.me/6282227632533", github: "https://github.com/wijayawijaya01010-eng", instagram: "https://www.instagram.com/giatromzi?igsh=MTBjMWlsZXNqZWtieQ==" }
    },
    {
        id: 7,
        name: "Ilhami Nando N. S.",
        role: "Frontend Engineer",
        image: "/images/team/nando2.jpg",
        social: { whatsapp: "https://wa.me/6285142514522", github: "https://github.com/Nandonayaka", instagram: "https://www.instagram.com/nandonayaka_?igsh=MWI1MDJ5emFqZDg1Zg==" }
    },
    {
        id: 8,
        name: "Dwi Rahmawati",
        role: "Frontend Engineer",
        image: "/images/team/dwi2.jpg",
        social: { whatsapp: "https://wa.me/6282331015939", github: "https://github.com/Dwi-cwelijen", instagram: "https://www.instagram.com/martabak_pedass?igsh=amIzbDY3cjZoMHkz" }
    },
    {
        id: 9,
        name: "Nur Syaiful Islami",
        role: "Frontend Engineer",
        image: "/images/team/saiful2.jpg",
        social: { whatsapp: "https://wa.me/6287811162998", github: "https://github.com/syaiful-fe", instagram: "https://www.instagram.com/rifnxn_?igsh=dXcyeHM3b2trbWd6" }
    },
    {
        id: 10,
        name: "Fairuz Azadi Afza",
        role: "Frontend Engineer",
        image: "/images/team/fairuz2.jpg",
        social: { whatsapp: "https://wa.me/6287701804529", github: "https://github.com/Rimexerr", instagram: "https://www.instagram.com/rimexer_uhuyy?igsh=cXA0amcxeWQ0NXIx" }
    },
    {
        id: 11,
        name: "Valen Abdillah R.",
        role: "Quality Assurance",
        image: "/images/team/valen2.jpg",
        social: { whatsapp: "https://wa.me/6285150679165", github: "#", instagram: "https://www.instagram.com/veevvip?igsh=MXZoN2M4ODBiYmZ6ZA==" }
    },

];

export const faqs = [
    { q: "Apa itu SEMINAR dan siapa yang bisa menggunakannya?", a: "SEMINAR adalah sistem manajemen sekolah yang mempermudah pencatatan absensi, pengajuan izin, monitoring kehadiran, serta pengelolaan jadwal belajar. Platform ini dapat digunakan oleh siswa, guru pengajar, wali kelas, guru BK, operator, dan pihak sekolah lainnya sesuai hak akses masing-masing." },
    { q: "Bagaimana cara login sebagai siswa/guru/wali kelas?", a: "Pengguna dapat login menggunakan akun yang telah diberikan oleh operator sekolah melalui halaman login dengan memasukkan NISN/NIP dan password yang terdaftar." },
    { q: "Apakah data absensi diperbarui secara real-time?", a: "Ya, setiap transaksi absensi (baik melalui RFID maupun manual oleh guru) akan langsung tercatat di sistem saat itu juga dan dapat dipantau oleh admin serta orang tua." },
    { q: "Bagaimana cara mengajukan izin melalui sistem?", a: "Siswa dapat masuk ke dashboard mereka, pilih menu Layanan Izin, dan mengisi formulir digital dengan melampirkan alasan atau bukti surat yang diperlukan." },
    { q: "Bagaimana cara melihat statistik kehadiran kelas saya?", a: "Guru dan wali kelas dapat mengakses menu Rekap Absensi untuk melihat grafik dan statistik kehadiran siswa secara harian, mingguan, maupun bulanan." },
    { q: "Apakah SEMINAR bisa diakses melalui HP?", a: "Tentu, SEMINAR didesain secara responsif sehingga dapat diakses dengan nyaman melalui browser di smartphone, tablet, maupun komputer." },
    { q: "Siapa yang harus dihubungi jika ada masalah login?", a: "Jika mengalami kendala teknis atau lupa password, silakan hubungi tim IT/Operator di ruang tata usaha sekolah." },
];


//about page


 export const program = [
    "Menyelaraskan kompetensi siswa dengan standar industri.",
    "Memberikan pengalaman kerja nyata melalui proyek dan layanan berbasis kebutuhan pasar.",
    "Menjadi ruang kolaborasi antara siswa, guru, industri, dan pengguna layanan.",
    "Menghasilkan produk layanan yang bernilai jual dan bermanfaat bagi masyarakat.",
];

export const fitur = [
    { title: "Absensi Real-Time", description: "Pemantauan kehadiran otomatis berbasis RFID", icon: <IdCardLanyard /> },
    { title: "Rekap Nilai Siswa", description: "Semua nilai ujian, tugas, rapor tersusun rapi", icon: <BookOpenCheck /> },
    { title: "Monitoring Perilaku", description: "Catatan kedisiplinan, pelanggaran, dan reward.", icon: <ShieldCheck /> },
    { title: "Jadwal Pelajaran Dinamis", description: "Jadwal update otomatis setiap semester.", icon: <CalendarDays /> },
    { title: "Data Siswa Terpusat", description: "Profil siswa lengkap, aman, dan selalu sinkron.", icon: <Database /> },
    { title: "Laporan Sekolah", description: "Laporan kinerja kelas, guru, dan siswa dalam satu klik.", icon: <FileChartColumn /> },
];

export const mentor = [
    { img: "/images/landing-page/about/pak-fery3.jpeg", name: "Jauhar Shafari, S.Kom", role: "Pembimbing TEFA" },
    { img: "/images/landing-page/about/kak-farah2.jpeg", name: "Farah Amalia.", role: "Mentor Hummatech" }
];



export const NEWS_DATA = {
  "Pengumuman": [
    {   id: 1, 
        title: "Pendaftaran SMKN 3 Pamekasan telah di buka!", 
        date: "12 Februari 2026", 
        img: "/images/landing-page/berita/pendaftaran.png",
        deskripsi: "Pendaftaran untuk tahun ajaran 2026/2027 di SMKN 3 Pamekasan resmi dibuka! Segera daftarkan diri Anda untuk bergabung dengan lingkungan belajar yang inspiratif dan inovatif. Kunjungi website resmi kami untuk informasi lebih lanjut tentang jurusan, persyaratan, dan proses pendaftaran. Jangan lewatkan kesempatan emas ini untuk menjadi bagian dari komunitas pendidikan yang unggul!"
     },
  ],
  "Kegiatan": [
    {   id: 2, 
        title: "Wadah Bakat & Prestasi", 
        date: "10 Januari 2026", 
        img: "/images/landing-page/berita/ekskul.png",
        deskripsi: "SMKN 3 Pamekasan dengan bangga mempersembahkan 'Wadah Bakat & Prestasi', sebuah acara tahunan yang dirancang untuk menampilkan bakat luar biasa dan prestasi gemilang siswa kami. Acara ini akan menjadi panggung bagi para siswa untuk menunjukkan keahlian mereka dalam berbagai bidang, mulai dari seni, olahraga, hingga akademik. Bergabunglah dengan kami untuk merayakan kreativitas dan dedikasi siswa kami dalam menciptakan prestasi yang membanggakan!",
    },
  ],
  "Informasi": [
    { id: 3, title: "Sekolah Lagi, Berprestasi Lagi", date: "12 Oktober 2026", img: "/images/landing-page/berita/informasi.png", deskripsi: "Informasi terkini tentang kegiatan dan program di SMKN 3 Pamekasan." },
    { id: 4, title: "Vokasi Unggul, Skanetri Bersinar", date: "12 Oktober 2026", img: "/images/landing-page/berita/infotmasi2.png", deskripsi: "Penjelasan tentang program vokasi yang ditawarkan di sekolah." },
  ],
  "Prestasi": [
    { 
        id: 5, 
        title: "Prestasi SNBP 2026", 
        date: "31 Maret 2026", 
        img: "/images/landing-page/berita/snbp.png",
        deskripsi: "SMKN 3 Pamekasan dengan bangga mempersembahkan 'Wadah Bakat & Prestasi', sebuah acara tahunan yang dirancang untuk menampilkan bakat luar biasa dan prestasi gemilang siswa kami. Acara ini akan menjadi panggung bagi para siswa untuk menunjukkan keahlian mereka dalam berbagai bidang, mulai dari seni, olahraga, hingga akademik. Bergabunglah dengan kami untuk merayakan kreativitas dan dedikasi siswa kami dalam menciptakan prestasi yang membanggakan!",
    },
    { 
        id: 6, 
        title: "Sukses SPAN-PTKIN 2026", 
        date: "07 April 2026", 
        img: "/images/landing-page/berita/prestasi.png",
        deskripsi: "SMKN 3 Pamekasan dengan bangga mempersembahkan 'Wadah Bakat & Prestasi', sebuah acara tahunan yang dirancang untuk menampilkan bakat luar biasa dan prestasi gemilang siswa kami. Acara ini akan menjadi panggung bagi para siswa untuk menunjukkan keahlian mereka dalam berbagai bidang, mulai dari seni, olahraga, hingga akademik. Bergabunglah dengan kami untuk merayakan kreativitas dan dedikasi siswa kami dalam menciptakan prestasi yang membanggakan!",
    },
  ]
};