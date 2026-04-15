import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { ROLE_MENUS } from "../../../Core/data/sidebar-data";
import { FaInstagram, FaFacebook, FaTwitter, FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import Aos from "aos";
import "aos/dist/aos.css";

const HomeLayout = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        Aos.init({});
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const menus = ROLE_MENUS.landing_page || [];

    const navScrolled = isScrolled || location.pathname !== "/";

    return (
        <div className="relative min-h-screen flex flex-col font-sans ">

            {/*Jangan di hapus ANJAY simpen bentar*/}
            {/*bg-gradient-to-r from-[#3B82F6] to-[#1E3A8A] fixed top-0 left-0 w-full z-50 */}

            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    navScrolled ? "bg-white py-4 shadow-md" : "bg-transparent py-6"
                }`}
            >
                <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center relative">
                    <NavLink to="/" className="flex items-center gap-3 relative z-10">
                        <img
                            src="/images/SMKNLOGO1.png"
                            alt="SMK Negeri 3 Pamekasan"
                            className="w-[26px] h-[29px] object-contain"
                        />
                        <div className="flex flex-col">
                            <span className={`font-semibold text-[12px] leading-tight transition-colors duration-300 ${navScrolled ? "text-[#1E3A8A]" : "text-white"}`}>
                                SMK NEGERI 3
                            </span>
                            <span className={`font-semibold text-[12px] leading-tight transition-colors duration-300 ${navScrolled ? "text-[#1E3A8A]" : "text-white"}`}>
                                PAMEKASAN
                            </span>
                        </div>
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-10">
                        <ul className="flex items-center space-x-8">
                            {menus.filter(m => m.name !== "Masuk").map((menu, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={menu.path}
                                        className={({ isActive }) => {
                                            const activeClass = navScrolled
                                                ? "text-blue-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600"
                                                : "text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white";
                                            const inactiveClass = navScrolled
                                                ? "text-gray-600 hover:text-blue-600"
                                                : "text-white/80 hover:text-white";
                                            
                                            return `text-[14px] font-medium transition-all duration-300 relative py-1 ${isActive ? activeClass : inactiveClass}`;
                                        }}
                                    >
                                        {menu.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        {menus.find(m => m.name === "Masuk") && (
                            <NavLink
                                to={menus.find(m => m.name === "Masuk").path}
                                className={({ isActive }) =>
                                    `ml-6 lg:ml-10 px-[20px] py-[8px] rounded-xl font-medium text-[14px] transition-all duration-300 shadow-lg ${isActive
                                        ? "bg-blue-700 text-white"
                                        : "bg-[#4285f4] text-white hover:bg-blue-600 hover:scale-105"
                                    }`
                                }
                            >
                                Masuk
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden relative z-10">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`focus:outline-none transition-colors duration-300 ${navScrolled || isMobileMenuOpen ? "text-gray-800" : "text-white"}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                                
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="absolute top-full left-0 w-full bg-white shadow-xl flex flex-col md:hidden py-4 border-t border-gray-100 z-50">
                            <ul className="flex flex-col space-y-4 px-6 mb-4">
                                {menus.filter(m => m.name !== "Masuk").map((menu, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={menu.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={({ isActive }) =>
                                                `block text-[15px] font-medium transition-all ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`
                                            }
                                        >
                                            {menu.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                            
                            {menus.find(m => m.name === "Masuk") && (
                                <div className="px-6 border-t border-gray-100 pt-4">
                                    <NavLink
                                        to={menus.find(m => m.name === "Masuk").path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-center w-full bg-[#4285f4] text-white py-3 rounded-xl font-medium text-[15px] hover:bg-blue-600 transition-all shadow-md"
                                    >
                                        Masuk
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-[#0B1120] text-gray-400 py-12 px-6 border-t border-gray-800 font-sans">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-15">
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <img
                                src="/images/SMKNLOGO1.png"
                                alt="SMK Negeri 3 Pamekasan"
                                className="w-12 h-14 object-contain"
                            />
                            <div>
                                <h2 className="text-white text-[20px] font-semibold">SEMINAR</h2>
                                <p className="text-white font-medium text-[14px] mt-1">
                                    Sistem Management Izin & Absensi Real Time
                                </p>
                            </div>
                        </div>
                        <p className="text-[14px] leading-relaxed text-gray-400 mt-4">
                            Platform manajemen sekolah untuk absensi real-time, nilai, jadwal, dan data siswa terpusat.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-blue-500 hover:text-blue-400 transition text-lg"><FaInstagram /></a>
                            <a href="#" className="text-blue-500 hover:text-blue-400 transition text-lg"><FaGlobe /></a>
                            <a href="#" className="text-blue-500 hover:text-blue-400 transition text-lg"><FaEnvelope /></a>
                            <a href="#" className="text-blue-500 hover:text-blue-400 transition text-lg"><FaPhone /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-[16px] mb-6">Navigation</h3>
                        <ul className="space-y-3 text-sm">
                            <li><NavLink to="/" className="hover:text-white transition">Beranda</NavLink></li>
                            <li><NavLink to="/tentangkami" className="hover:text-white transition">Tentang Kami</NavLink></li>
                            <li><HashLink smooth to="/#FAQ" className="hover:text-white transition">FAQ</HashLink></li>
                            <li><HashLink smooth to="/#contact" className="hover:text-white transition">Kontak</HashLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-[16px] mb-6">Support</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition">Pusat Bantuan</a></li>
                            <li><a href="#" className="hover:text-white transition">Panduan Pengguna</a></li>
                            <li><a href="#" className="hover:text-white transition">Cara Mengajukan Izin</a></li>
                            <li><a href="#" className="hover:text-white transition">Troubleshooting Login</a></li>
                            <li><a href="#" className="hover:text-white transition">Hubungi Admin</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-[16px] mb-6">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-white transition">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="hover:text-white transition">Kebijakan Penggunaan Data</a></li>
                            <li><a href="#" className="hover:text-white transition">Lisensi & Hak Cipta</a></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs text-gray-500">
                    <p>© 2025 SMKN 3 Pamekasan. All Rights Reserved.</p>
                    <p>Developed by TEFA SMKN 3 Pamekasan</p>
                </div>
            </footer>
        </div>
    );
};

export default HomeLayout;

