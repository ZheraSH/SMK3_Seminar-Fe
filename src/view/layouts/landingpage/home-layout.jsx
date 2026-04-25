import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import LoadingScreen from "@elements/loading-landing-pages/loading-screen";
import useLoading from "@core/utils/loading-landing-pages";
import { ROLE_MENUS } from "@core/mock/sidebar-data";
import { FaInstagram, FaGlobe, FaEnvelope, FaPhone, FaHome, FaInfoCircle, FaNewspaper, FaImages, FaSignInAlt } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import Aos from "aos";
import "aos/dist/aos.css";

const HomeLayout = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const { isLoading, connectionSpeed, stopLoading } = useLoading(true);

    useEffect(() => {
        const handlePageChange = () => {
            if (window.performance.navigation.type === 1) {
                window.location.reload();
            }
        };

        window.addEventListener("beforeunload", handlePageChange);
        return () => window.removeEventListener("beforeunload", handlePageChange);
    }, []);

    const handleLoadingComplete = () => {
        stopLoading();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        Aos.init({});
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menus = ROLE_MENUS.landing_page || [];
    const transparentPaths = ["/", "/tentang", "/berita", "/galery"];
    const navScrolled = isScrolled || !transparentPaths.includes(location.pathname);

    const getIcon = (name) => {
        const iconName = name.toLowerCase();
        if (iconName.includes('beranda') || iconName.includes('home')) return <FaHome className="text-xl" />;
        if (iconName.includes('tentang')) return <FaInfoCircle className="text-xl" />;
        if (iconName.includes('berita')) return <FaNewspaper className="text-xl" />;
        if (iconName.includes('galery') || iconName.includes('galeri')) return <FaImages className="text-xl" />;
        return <FaHome className="text-xl" />;
    };

    return (
        <>
            <LoadingScreen
                isLoading={isLoading}
                onLoadingComplete={handleLoadingComplete}
                connectionSpeed={connectionSpeed}
            />

            {!isLoading && (
                <div className="relative min-h-screen flex flex-col font-sans bg-gray-50">

                    <nav
                        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navScrolled ? "bg-white py-4 shadow-md" : "bg-transparent py-6"
                            }`}
                    >
                        <div className="container mx-auto px-6 lg:px-16 flex justify-between items-center">
                            <NavLink to="/" className="flex items-center gap-3">
                                <img src="/images/SMKNLOGO1.png" alt="Logo" className="w-[26px] h-[29px] object-contain" />
                                <div className="flex flex-col uppercase">
                                    <span className={`font-bold text-[12px] leading-tight transition-colors ${navScrolled ? "text-[#1E3A8A]" : "text-white"}`}>
                                        SMK Negeri 3
                                    </span>
                                    <span className={`font-bold text-[12px] leading-tight transition-colors ${navScrolled ? "text-[#1E3A8A]" : "text-white"}`}>
                                        Pamekasan
                                    </span>
                                </div>
                            </NavLink>

                            <div className="hidden md:flex items-center gap-8">
                                <ul className="flex items-center space-x-8">
                                    {menus.filter(m => m.name !== "Masuk").map((menu, index) => (
                                        <li key={index}>
                                            <NavLink
                                                to={menu.path}
                                                className={({ isActive }) => {
                                                    const base = "text-[14px] font-medium transition-all relative py-1 ";
                                                    const active = isActive
                                                        ? (navScrolled ? "text-blue-600 border-b-2 border-blue-600" : "text-white border-b-2 border-white")
                                                        : (navScrolled ? "text-gray-600 hover:text-blue-600" : "text-white/80 hover:text-white");
                                                    return base + active;
                                                }}
                                            >
                                                {menu.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                                <NavLink to="/login" className="bg-[#4285f4] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-md">
                                    Masuk
                                </NavLink>
                            </div>
                        </div>
                    </nav>

                    <main className="flex-grow ">
                        <Outlet />
                    </main>

                    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 z-[100] px-2 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] rounded-t-2xl">
                        <div className="flex justify-around items-center">
                            {menus.filter(m => m.name !== "Masuk").map((menu, index) => (
                                <NavLink
                                    key={index}
                                    to={menu.path}
                                    className={({ isActive }) =>
                                        `flex flex-col items-center justify-center gap-1 transition-all ${isActive ? "text-blue-600 scale-105" : "text-gray-400"
                                        }`
                                    }
                                >
                                    {getIcon(menu.name)}
                                    <span className="text-[10px] font-semibold">{menu.name}</span>
                                </NavLink>
                            ))}

                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `flex flex-col items-center justify-center gap-1 ${isActive ? "text-blue-600" : "text-gray-400"}`
                                }
                            >
                                <FaSignInAlt className="text-xl" />
                                <span className="text-[10px] font-semibold">Masuk</span>
                            </NavLink>
                        </div>
                    </div>

                    <footer className=" bg-[#0B1120] text-gray-400 py-12 px-6 border-t border-gray-800 font-sans">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <img src="/images/SMKNLOGO1.png" alt="Logo" className="w-12 h-14 object-contain" />
                                    <div>
                                        <h2 className="text-white text-[20px] font-semibold uppercase">SEMINAR</h2>
                                        <p className="text-white font-medium text-[12px]">Sistem Management Izin & Absensi</p>
                                    </div>
                                </div>
                                <p className="text-[14px] leading-relaxed">
                                    Platform manajemen sekolah untuk absensi real-time, nilai, jadwal, dan data siswa terpusat.
                                </p>
                                <div className="flex gap-4 mt-6 text-blue-500">
                                    <a href="https://www.instagram.com/smknegeri3pamekasan?igsh=MThmYzFoN29kODEyZA=="
                                        className="hover:text-blue-400 transition text-lg" target="_blank" rel="noopener noreferrer">
                                        <FaInstagram />
                                    </a>
                                    <a href="https://smkn3pamekasan.sch.id/" className="hover:text-blue-400 transition text-lg" target="_blank" rel="noopener noreferrer">
                                        <FaGlobe />
                                    </a>
                                    <a href="mailto:smkn3pmk@yahoo.com" className="hover:text-blue-400 transition text-lg" target="_blank" rel="noopener noreferrer">
                                        <FaEnvelope />
                                    </a>
                                    <a href="tel:+62324322576" className="hover:text-blue-400 transition text-lg" target="_blank" rel="noopener noreferrer">
                                        <FaPhone />
                                    </a>
                                </div>
                            </div>

                            <div className=" hidden md:block">
                                <h3 className="text-white font-bold text-[15px] mb-4 border-l-4 border-blue-600 pl-3">Visi</h3>
                                <p className="text-[13px] leading-relaxed text-justify text-gray-300">
                                    Menjadikan SMK Negeri 3 Pamekasan sebagai basis pengembangan keterampilan dan wirausaha berwawasan lingkungan yang dilandasi IMTAK dan IPTEK untuk mengisi kebutuhan pembangunan di era global.
                                </p>
                            </div>

                            <div className="hidden md:block lg:col-span-2">
                                <h3 className="text-white font-bold text-[15px] mb-4 border-l-4 border-blue-600 pl-3">Misi</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[12px] leading-snug text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500">•</span>
                                        Melayani dan memfasilitasi masyarakat/siswa untuk mengembangkan keterampilan dalam memenuhi kebutuhan pembangunan.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500">•</span>
                                        Meningkatkan kualitas sumber daya manusia.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500">•</span>
                                        Melaksanakan layanan prima dalam pengelolaan sekolah melalui sistem manajemen mutu ISO 9001-2008.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500">•</span>
                                        Meningkatkan mutu sekolah melalui pengembangan sekolah berstandar internasional.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500">•</span>
                                        Menciptakan sekolah berwawasan lingkungan, bersih, dan hijau berseri.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="max-w-7xl mx-auto border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
                            <p>© 2026 SMKN 3 Pamekasan. All Rights Reserved.</p>
                            <p>Developed by <span className="text-blue-600 font-medium">TEFA PPLG SMKN 3 Pamekasan</span></p>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};

export default HomeLayout;
