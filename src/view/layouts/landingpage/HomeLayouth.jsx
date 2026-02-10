import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { ROLE_MENUS } from "../../../Core/Data/SidebarData";
import { FaInstagram, FaFacebook, FaTwitter, FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import Aos from "aos";
import "aos/dist/aos.css";

const HomeLayouth = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        Aos.init({});
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menus = ROLE_MENUS.landing_page || [];

    return (
        <div className="relative min-h-screen flex flex-col font-sans ">

            {/*Jangan di hapus ANJAY simpen bentar*/}
            {/*bg-gradient-to-r from-[#3B82F6] to-[#1E3A8A] fixed top-0 left-0 w-full z-50 */}
            
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent py-6 ${isScrolled || location.pathname !== "/"
                    }`}
            >
                <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">
                    <NavLink to="/" className="flex items-center gap-3">
                        <img
                            src="/images/SMKNLOGO1.png"
                            alt="SMK Negeri 3 Pamekasan"
                            className="w-[26px] h-[29px] object-contain"
                        />
                        <div className="flex flex-col">
                            <span className="text-white font-semibold text-[12px] leading-tight">
                                SMK NEGERI 3
                            </span>
                            <span className="text-white font-semibold text-[12px] leading-tight">
                                PAMEKASAN
                            </span>
                        </div>
                    </NavLink>

                    <div className="hidden md:flex items-center gap-10">
                        <ul className="flex items-center space-x-8">
                            {menus.filter(m => m.name !== "Masuk").map((menu, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={menu.path}
                                        className={({ isActive }) =>
                                            `text-[14px] font-medium transition-all duration-300 relative py-1 ${isActive
                                                ? "text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white"
                                                : "text-white/80 hover:text-white"
                                            }`
                                        }
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
                                    `ml-[188px] px-[20px] py-[8px] rounded-xl font-medium text-[14px] transition-all duration-300 shadow-lg ${isActive
                                        ? "bg-blue-700 text-white"
                                        : "bg-[#4285f4] text-white hover:bg-blue-600 hover:scale-105"
                                    }`
                                }
                            >
                                Masuk
                            </NavLink>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button className="text-white focus:outline-none">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-[#0B1120] text-gray-400 py-12 px-6 border-t border-gray-800 font-sans">
                <div className="max-w-7xl mx-[80px] grid grid-cols-1 md:grid-cols-4 gap-15">
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

                <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© 2025 SMKN 3 Pamekasan. All Rights Reserved.</p>
                    <p>Developed by TEFA SMKN 3 Pamekasan</p>
                </div>
            </footer>
        </div>
    );
};

export default HomeLayouth;
