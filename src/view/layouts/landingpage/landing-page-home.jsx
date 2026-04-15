import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ClipboardCheck, LayoutDashboard, Settings, Users, Home, ClipboardList, Zap, ChevronRight, ShieldCheck, CalendarDays, Database, Plus, Minus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPageHome = () => {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);
    const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true });

    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: true,
            easing: "ease-in-out"
        });
    }, []);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const stats = [
        { label: "Pengguna Aktif", value: 1200, suffix: "+", icon: <Users size={24} />, bgColor: "bg-blue-50", iconColor: "text-blue-500" },
        { label: "Kelas Terpantau", value: 36, suffix: "", icon: <Home size={24} />, bgColor: "bg-yellow-50", iconColor: "text-yellow-500" },
        { label: "Data Absensi Tercatat", value: 120000, suffix: "+", icon: <ClipboardList size={24} />, bgColor: "bg-purple-50", iconColor: "text-purple-500" },
        { label: "Sinkronisasi Data", value: 100, suffix: "% Realtime", icon: <Zap size={24} />, bgColor: "bg-emerald-50", iconColor: "text-emerald-500" },
    ];

    const faqs = [
        { q: "Apa itu SEMINAR dan siapa yang bisa menggunakannya?", a: "SEMINAR adalah sistem manajemen sekolah yang mempermudah pencatatan absensi, pengajuan izin, monitoring kehadiran, serta pengelolaan jadwal belajar. Platform ini dapat digunakan oleh siswa, guru pengajar, wali kelas, guru BK, operator, dan pihak sekolah lainnya sesuai hak akses masing-masing." },
        { q: "Bagaimana cara login sebagai siswa/guru/wali kelas?", a: "Pengguna dapat login menggunakan akun yang telah diberikan oleh operator sekolah melalui halaman login dengan memasukkan NISN/NIP dan password yang terdaftar." },
        { q: "Apakah data absensi diperbarui secara real-time?", a: "Ya, setiap transaksi absensi (baik melalui RFID maupun manual oleh guru) akan langsung tercatat di sistem saat itu juga dan dapat dipantau oleh admin serta orang tua." },
        { q: "Bagaimana cara mengajukan izin melalui sistem?", a: "Siswa dapat masuk ke dashboard mereka, pilih menu Layanan Izin, dan mengisi formulir digital dengan melampirkan alasan atau bukti surat yang diperlukan." },
        { q: "Bagaimana cara melihat statistik kehadiran kelas saya?", a: "Guru dan wali kelas dapat mengakses menu Rekap Absensi untuk melihat grafik dan statistik kehadiran siswa secara harian, mingguan, maupun bulanan." },
        { q: "Apakah SEMINAR bisa diakses melalui HP?", a: "Tentu, SEMINAR didesain secara responsif sehingga dapat diakses dengan nyaman melalui browser di smartphone, tablet, maupun komputer." },
        { q: "Siapa yang harus dihubungi jika ada masalah login?", a: "Jika mengalami kendala teknis atau lupa password, silakan hubungi tim IT/Operator di ruang tata usaha sekolah masing-masing." },
    ];

    return (
        <div className="font-sans overflow-hidden">
            <section className="relative bg-gradient-to-br from-[#3B82F6] to-[#1E3A8A] pt-28 pb-16 md:pt-40 md:pb-24 lg:pb-32 overflow-hidden">
                {/* Decorative background lines for Hero */}
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        {[...Array(15)].map((_, i) => (
                            <path 
                                key={i}
                                d={`M-200 ${100 + i * 35}C200 ${50 + i * 35} 400 ${450 + i * 35} 720 ${200 + i * 35}S1240 ${50 + i * 35} 1640 ${200 + i * 35}`} 
                                stroke="white" 
                                strokeWidth="0.5" 
                                opacity={0.2 + (i * 0.03)}
                            />
                        ))}
                    </svg>
                </div>
                <div className="container mx-auto px-6 lg:px-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="w-full lg:w-3/5 text-white" data-aos="fade-right">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-6"
                        >
                            Digitalisasi Manajemen Sekolah dalam Satu Sistem <br />
                            <span className="text-[#FFD700]">Real-Time</span>
                        </motion.h1>
                        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-medium">
                            SEMINAR membantu sekolah memantau absensi, nilai, dan data siswa secara cepat, aman, dan efisien.
                        </p>
                        <button 
                            onClick={() => navigate('/tentang')}
                            className="flex items-center gap-2 border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white hover:text-[#1E40AF] transition-all duration-300 group shadow-lg"
                        >
                            Pelajari Lebih Lanjut <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Hero Image / Blob */}
                    <div className="w-full lg:w-2/5 relative flex justify-center lg:justify-end" data-aos="fade-left">
                        <div className="relative z-10">
                            {/* Blue Blob Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-400/20 rounded-full blur-[100px]" />
                            
                            {/* Shape Decor */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
                            
                            {/* Main Image Container */}
                            <div className="relative rounded-[50px] overflow-hidden transform lg:rotate-3 hover:rotate-0 transition-all duration-700">
                                <img 
                                    src="/images/particle/landing-page-2.png" 
                                    alt="Student Representation"
                                    className="w-full max-w-[450px] object-cover"
                                />
                                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Wave SVG */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-white">
                        <path d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,240C1120,245,1280,203,1360,181.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* "Apa itu SEMINAR?" Section */}
            <section className="bg-white py-20 lg:py-32">
                <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-20 items-center">
                    
                    {/* Graphics Column */}
                    <div className="relative" data-aos="zoom-in">
                        <div className="relative flex justify-center items-center">
                            {/* Circle Background */}
                            <div className="absolute w-[80%] h-[80%] bg-blue-500 rounded-full opacity-10 blur-3xl" />
                            <div className="absolute w-[60%] h-[120%] bg-blue-400/20 rounded-full blur-2xl rotate-45" />

                            {/* Phones Mockup */}
                            <div className="relative z-10 flex gap-3 sm:gap-6">
                                <div className="w-32 h-60 sm:w-44 sm:h-80 md:w-56 md:h-[450px] bg-[#111827] border-[4px] sm:border-[6px] border-[#374151] rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(30,64,175,0.3)] relative overflow-hidden transform -rotate-6">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-[#374151] rounded-b-lg sm:rounded-b-xl" />
                                </div>
                                <div className="w-32 h-60 sm:w-44 sm:h-80 md:w-56 md:h-[450px] bg-[#111827] border-[4px] sm:border-[6px] border-[#374151] rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(30,64,175,0.3)] relative overflow-hidden mt-8 sm:mt-12 transform rotate-6">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-[#374151] rounded-b-lg sm:rounded-b-xl" />
                                </div>
                                
                                {/* Floating Card Detail */}
                                <motion.div 
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute right-0 bottom-1/4 translate-x-1/4 w-32 sm:w-40 h-20 sm:h-24 bg-white border border-gray-100 rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col justify-center gap-2 z-20"
                                >
                                    <div className="h-2 w-full bg-blue-100 rounded" />
                                    <div className="h-2 w-3/4 bg-blue-100 rounded" />
                                    <div className="h-5 sm:h-6 w-10 sm:w-12 bg-blue-500 rounded-lg mt-1" />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div data-aos="fade-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A8A] mb-4">
                            Apa itu <span className="text-[#3B82F6]">SEMINAR?</span>
                        </h2>
                        <div className="h-1.5 w-24 bg-blue-500 rounded-full mb-8" />
                        
                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12">
                            SEMINAR adalah sistem manajemen informasi sekolah yang mengintegrasikan data nilai, absensi, dan kegiatan siswa secara real-time dan terpusat, memudahkan guru, siswa, serta admin dalam memantau aktivitas akademik.
                        </p>

                        <div className="space-y-8 mb-12">
                            <div className="flex items-start gap-5">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm">
                                    <ClipboardCheck size={26} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">Absensi Real-Time</h3>
                                    <p className="text-gray-500 text-sm md:text-base">Mencatat kehadiran siswa dengan sistem terintegrasi RFID & dashboard otomatis.</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-5">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm">
                                    <LayoutDashboard size={26} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">Monitoring Nilai</h3>
                                    <p className="text-gray-500 text-sm md:text-base">Guru dapat menginput dan menganalisis nilai siswa dengan grafik yang informatif.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm">
                                    <Settings size={26} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">Manajemen Terpadu</h3>
                                    <p className="text-gray-500 text-sm md:text-base">Semua data akademik dan non-akademik terhubung dalam satu platform.</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => navigate('/tentang')}
                            className="flex items-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 group"
                        >
                            Pelajari Lebih Lanjut <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section ref={statsRef} className="bg-white pb-32">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ scale: 1.03, translateY: -8 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] flex items-center gap-6"
                                data-aos="fade-up"
                                data-aos-delay={idx * 150}
                            >
                                <div className={`${stat.bgColor} ${stat.iconColor} p-5 rounded-3xl`}>
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-800 mb-0.5">
                                        {statsInView ? <CountUp end={stat.value} duration={2} suffix={stat.suffix} /> : 0}
                                    </p>
                                    <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Fitur Utama Section */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A8A]">
                            Fitur <span className="text-[#3B82F6] relative">Utama<div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 rounded-full" /></span> SEMINAR
                        </h2>
                        <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                            Semua kebutuhan pengelolaan sekolah tersedia dalam satu sistem yang mudah digunakan dan siap mendukung kinerja guru serta siswa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {[
                            { title: "Absensi Real-Time", desc: "pemantauan kehadiran otomatis berbasis RFID", icon: <ClipboardCheck /> },
                            { title: "Rekap Nilai Siswa", desc: "semua nilai ujian, tugas, rapor tersusun rapi", icon: <ClipboardList /> },
                            { title: "Monitoring Perilaku", desc: "catatan kedisplinan, pelanggaran, dan reward.", icon: <ShieldCheck /> },
                            { title: "Jadwal Pelajaran Dinamis", desc: "jadwal update otomatis setiap semester.", icon: <CalendarDays /> },
                            { title: "Data Siswa Terpusat", desc: "profil siswa lengkap, aman, dan selalu sinkron.", icon: <Database /> },
                            { title: "Laporan Sekolah", desc: "laporan kinerja kelas, guru, dan siswa dalam satu klik.", icon: <Zap /> },
                        ].map((fitur, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white p-8 rounded-3xl border border-gray-100 drop-shadow-xl flex flex-col items-center text-center gap-4 group"
                                data-aos="fade-up"
                                data-aos-delay={idx * 100}
                            >
                                <div className="p-4 bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                                    {React.cloneElement(fitur.icon, { size: 28 })}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mt-2">{fitur.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{fitur.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center" data-aos="fade-up">
                        <button 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Simplified for placeholder
                            className="bg-[#3B82F6] hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 group"
                        >
                            Pelajari Semua Fitur <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Berita Terbaru Section */}
            <section className="bg-[#EFF6FF] py-24 relative overflow-hidden">
                {/* Brighter wavy lines flowing from bottom up */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute bottom-0 left-0">
                        {/* Radiant waves from bottom left and right */}
                        {[...Array(40)].map((_, i) => (
                            <path 
                                key={i}
                                d={`M${-200 + i * 40} 800C${200 + i * 40} 700 ${600 + i * 20} 500 1440 ${300 + i * 15}`} 
                                stroke="#3B82F6" 
                                strokeWidth="0.8" 
                                opacity={0.15 + (i * 0.01)}
                            />
                        ))}
                        {[...Array(20)].map((_, i) => (
                            <path 
                                key={`v-${i}`}
                                d={`M0 ${800 - i * 30}C400 ${800 - i * 30} 1000 ${600 - i * 50} 1440 ${700 - i * 20}`} 
                                stroke="#3B82F6" 
                                strokeWidth="1" 
                                opacity={0.1}
                            />
                        ))}
                    </svg>
                </div>

                <div className="container mx-auto px-6 lg:px-20 relative z-10">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A8A]">
                            Berita <span className="text-[#3B82F6] relative">Terbaru<div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 rounded-full" /></span>
                        </h2>
                        <p className="mt-4 text-gray-500 text-sm md:text-base">Temukan berita terkini seputar Seminar</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {[1, 2, 3].map((item) => (
                            <div 
                                key={item} 
                                className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_15px_45px_-15px_rgba(0,0,0,0.06)] group hover:shadow-2xl transition-all duration-500"
                                data-aos="fade-up"
                                data-aos-delay={item * 150}
                            >
                                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-8">
                                    <p className="text-gray-400 text-xs font-semibold mb-3 tracking-wider uppercase">09 November 2025</p>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">Lorem Ipsum doremi</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center" data-aos="fade-up">
                        <button 
                            onClick={() => navigate('/berita')}
                            className="bg-[#3B82F6] hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 group"
                        >
                            Lihat Berita selengkapnya <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>
            {/* Tim Pengembang Section */}
            <section className="bg-gradient-to-b from-[#1E3A8A] to-[#080F24] py-24 relative overflow-hidden">
                {/* Particle-like background blobs */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 opacity-20 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-500 opacity-10 rounded-full blur-2xl animate-pulse" />
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white opacity-40 rounded-full" />
                <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-white opacity-20 rounded-full" />

                <div className="container mx-auto px-6 lg:px-20 relative z-10">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Tim Pengembang</h2>
                        <p className="text-blue-100 text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-80">
                            Berbagai fitur dalam SEMINAR dikembangkan oleh tim yang berdedikasi untuk memberikan pengalaman terbaik bagi seluruh pengguna.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto" data-aos="fade-up">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={{
                                prevEl: '.swiper-button-prev-custom',
                                nextEl: '.swiper-button-next-custom',
                            }}
                            pagination={{ 
                                clickable: true,
                                dynamicBullets: true
                            }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="team-swiper pb-16"
                        >
                            {[1, 2, 3, 4, 5].map((item) => (
                                <SwiperSlide key={item}>
                                    <div className="bg-[#172554]/50 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center text-center group hover:bg-[#1E3A8A] transition-all duration-500 hover:scale-[1.02] shadow-2xl">
                                        <div className="relative mb-6">
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500/50 group-hover:border-white transition-colors duration-300">
                                                <img 
                                                    src="/images/people/03.png" 
                                                    alt="Developer" 
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">Valen Ibrahim Manaf</h3>
                                        <p className="text-blue-200 text-sm mb-8 opacity-80">Quality Assurance</p>
                                        
                                        <div className="flex gap-4">
                                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-blue-600 transition-all"><FaLinkedin size={18} /></a>
                                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gray-800 transition-all"><FaGithub size={18} /></a>
                                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-blue-400 transition-all"><FaTwitter size={18} /></a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom Navigation */}
                        <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 hidden md:block">
                            <button className="swiper-button-prev-custom text-white opacity-50 hover:opacity-100 transition-opacity">
                                <ChevronRight className="rotate-180" size={48} />
                            </button>
                        </div>
                        <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 hidden md:block">
                            <button className="swiper-button-next-custom text-white opacity-50 hover:opacity-100 transition-opacity">
                                <ChevronRight size={48} />
                            </button>
                        </div>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    .team-swiper .swiper-pagination-bullet {
                        background: #60A5FA !important;
                        opacity: 0.5;
                        width: 10px;
                        height: 10px;
                    }
                    .team-swiper .swiper-pagination-bullet-active {
                        background: #FFFFFF !important;
                        opacity: 1;
                        width: 24px;
                        border-radius: 5px;
                    }
                `}} />
            </section>
            {/* FAQ Section */}
            <section id="FAQ" className="bg-white py-24">
                <div className="container mx-auto px-6 lg:px-32">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <div className="flex justify-center mb-4">
                            <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">
                                <Zap size={24} fill="currentColor" />
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1E3A8A] mb-6">
                            <span className="relative">Frequently Asked<div className="absolute -bottom-1 left-0 w-full h-1.5 bg-blue-500 rounded-full" /></span> Questions
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                            Jawaban Terperinci agar Kamu Lebih Mudah Memahami Fitur dan Cara Kerja SEMINAR.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-4" data-aos="fade-up">
                        {faqs.map((faq, idx) => (
                            <div 
                                key={idx}
                                className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                                    openFaq === idx ? "border-blue-500 shadow-lg shadow-blue-500/10" : "border-blue-200 border-dashed hover:border-blue-400"
                                }`}
                            >
                                <button 
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                                >
                                    <span className={`text-lg font-bold transition-colors ${openFaq === idx ? "text-blue-600" : "text-gray-800"}`}>
                                        {idx + 1}. {faq.q}
                                    </span>
                                    <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === idx ? "rotate-0" : "rotate-0"}`}>
                                        {openFaq === idx ? <Minus className="text-blue-500" /> : <Plus className="text-blue-400" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-8 pb-6 text-gray-600 leading-relaxed border-t border-blue-50">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 lg:px-20">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-900 rounded-[3rem] p-10 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
                        {/* Decorative background circle */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                        
                        <div className="w-full lg:w-1/2 relative" data-aos="fade-right">
                            <div className="relative">
                                {/* SVG/Icon group placeholder matching the mockup */}
                                <div className="flex gap-4 items-center justify-center lg:justify-start">
                                    <div className="w-40 h-56 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 relative flex items-center justify-center">
                                       <Users className="text-white/40" size={64} />
                                    </div>
                                    <div className="w-40 h-56 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 relative -mt-12 flex items-center justify-center">
                                       <Home className="text-white/40" size={64} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 text-white text-center lg:text-left" data-aos="fade-left">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                                Siap Beralih ke Sistem Absensi yang Lebih Cerdas?
                            </h2>
                            <p className="text-blue-100 text-lg mb-10 opacity-80 leading-relaxed">
                                Kelola kehadiran sekolah secara real-time dengan platform SEMINAR yang cepat, aman, dan mudah digunakan.
                            </p>
                            <div className="flex flex-col gap-4 items-center lg:items-start">
                                <button 
                                    onClick={() => navigate('/login')}
                                    className="bg-white text-blue-800 px-10 py-5 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-1 active:scale-95 flex items-center gap-2 group"
                                >
                                    Masuk Sekarang
                                </button>
                                <p className="text-xs text-blue-200">Belum punya akun? Hubungi operator sekolah.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPageHome;


