import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link"; 

const MainNavbar = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setIsScrolled(window.scrollY > 0);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Kami", path: "/Tentangkami" },
    { name: "Berita", path: "/berita" },
  ];

  return (
    <nav
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1000"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-gradient-to-b from-[#003566] to-[#001D3D] shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 ">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              className="w-[37px] h-[40px]"
              src="images/SMKNLOGO1.png"
              alt="Logo"
            />
            <h1 className="text-[16px] font-semibold text-white text-left max-w-[200px]">
              SMK Negeri 3 Pamekasan
            </h1>
          </div>

          <ul className="hidden md:flex items-center space-x-10 text-white text-[16px] ml-50">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 underline transition-all duration-500"
                      : "hover:text-yellow-300 hover:underline transition-all duration-500"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <HashLink
                smooth
                to="/#contact"
                className="hover:text-yellow-300 hover:underline transition-all duration-500"
              >
                Hubungi
              </HashLink>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <button className="transition-all duration-500 hover:bg-yellow-400 hover:text-black hidden md:inline-block bg-[#FFD60A] text-[#003566] px-[24px] py-[5px] rounded-[5px]">
              Daftar
            </button>
          </div>

          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#001D3D]/95 backdrop-blur-sm border-t border-white/10">
          <div className="px-6 py-4 space-y-4 text-white">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 underline block"
                    : "block hover:text-yellow-300"
                }
              >
                {item.name}
              </NavLink>
            ))}

            <HashLink
              smooth
              to="/#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:text-yellow-300"
            >
              Hubungi
            </HashLink>

            <button
              className="w-full bg-[#FFD60A] text-[#003566] font-semibold px-[24px] py-[10px] rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Daftar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavbar;
