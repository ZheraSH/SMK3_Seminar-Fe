import React, { useState, useRef } from 'react';
import { Search, Calendar, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import {NEWS_DATA} from "@data/leanding-page";
import { useEffect } from "react";



const CATEGORIES = ["Semua", ...Object.keys(NEWS_DATA)];

const DoubleScrollNews = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState(""); 
  const rightColumnRef = useRef(null);
  const sectionRefs = useRef({});

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "Semua") {
      rightColumnRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetSection = sectionRefs.current[category];
    if (targetSection && rightColumnRef.current) {
      const containerTop = rightColumnRef.current.offsetTop;
      const sectionTop = targetSection.offsetTop;
      rightColumnRef.current.scrollTo({
        top: sectionTop - containerTop - 10, 
        behavior: 'smooth'
      });
    }
  };

  const hasResults = Object.values(NEWS_DATA).some(items => 
    items.some(news => news.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

   useEffect(() => {
          AOS.init({
              duration: 800, 
              once: true,    
              easing: 'ease-out-cubic',
              offset: 120,
          });
      }, []);

  return (
    <div className="bg-white min-h-screen">
        <div className="relative bg-[url('/images/landing-page/about/about.png')] bg-cover bg-center h-[585px] w-full flex items-center justify-center overflow-hidden">
            <div className="relative z-10 text-center">
                <h2 className="text-6xl md:text-7xl font-bold text-white tracking-tight">Berita</h2>
            </div>
        </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:h-[calc(148vh-100px)]">
          <div data-aos="fade-up" className="lg:w-[100%] lg:overflow-y-auto no-scrollbar lg:pr-6">
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#25397d] inline-block border-b-4 border-blue-500 pb-1">
                Berita Teratas
              </h2>
            </div>
            <div className="bg-gray-300 rounded-[12px] h-[425px] w-full aspect-[16/10] mb-6 shadow-sm">
                <img  src="/images/landing-page/galery/tahapan/peluncuran.png"  alt="Seminar Pendidikan" className="w-full h-full rounded-[12px] object-cover"/>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="bg-[#3B82F6] text-white text-[10px] px-4 py-1.5 rounded-full font-bold uppercase">
                Informasi
              </span>
              <span className="text-gray-400 text-[11px] font-medium tracking-tight">30  2026</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-[#1e293b] mb-6 leading-tight">
              Seminar Terbaru: Tranformasi digital dalam dunia pendidikan
            </h1>

            <div className="text-gray-500 text-[14px] leading-relaxed text-justify space-y-4 pr-2">
              <p>
                Di era transformasi digital yang terus berkembang, pengelolaan kehadiran siswa secara
                manual dinilai kurang efektif dan rentan terhadap kesalahan data. Merespons tantangan tersebut, 
                kami menghadirkan sistem absensi berbasis kartu RFID (Radio Frequency Identification) sebagai 
                bagian dari program Teaching Factory (TEFA) sekolah. Sistem ini dirancang untuk mencatat kehadiran 
                siswa secara otomatis, akurat, dan real-time hanya dengan menempelkan kartu pada perangkat pembaca.
              </p>
              <p>
                Sistem absensi RFID ini tidak hanya mempercepat proses pencatatan kehadiran, tetapi juga meminimalisir 
                potensi kecurangan dan kehilangan data yang sering terjadi pada metode konvensional. Setiap kartu RFID 
                terhubung langsung ke identitas siswa dalam database, sehingga rekap kehadiran dapat diakses kapan saja 
                oleh guru maupun pihak administrasi sekolah secara transparan dan efisien. Sebagai produk nyata dari program
                TEFA, sistem ini merupakan bukti bahwa siswa SMK mampu merancang dan mengimplementasikan solusi teknologi yang
                berdampak langsung bagi lingkungan sekolah. Ke depannya, sistem absensi RFID ini diharapkan dapat terus dikembangkan 
                dan menjadi standar pengelolaan kehadiran yang modern, andal, serta siap digunakan di berbagai institusi pendidikan.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex flex-col gap-8 h-full">
            <div data-aos="fade-up" className="bg-white border border-gray-100 rounded-[12px] p-6 md:p-8 shadow-lg inset-shadow-sm w-full">
              <div className="relative mb-8">
                <input  
                  type="text"  
                  placeholder="Cari berita..."  
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-100 bg-gray-50 rounded-full py-4 px-6 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
                  <div className="h-4 w-[1px] bg-gray-200"></div>
                  <Search className="text-gray-400" size={18} />
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#1e293b] mb-6 inline-block border-b-2 border-blue-500 pb-1">
                Kategori Berita
              </h3>
              <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0">
                {CATEGORIES.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => handleCategoryClick(cat)}
                    className={`whitespace-nowrap text-left cursor-pointer text-sm font-semibold transition-all px-4 py-2 lg:px-2 lg:py-1 rounded-lg lg:rounded-none
                      ${activeCategory === cat 
                        ? 'text-[#3B82F6] bg-blue-50 lg:bg-transparent lg:translate-x-1' 
                        : 'text-gray-500 hover:text-[#3B82F6] hover:bg-gray-50 lg:hover:bg-transparent'}
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div data-aos="fade-up" ref={rightColumnRef} className="lg:overflow-y-auto no-scrollbar flex-1 w-full">
              <h3 className="text-xl font-bold text-[#1e293b] mb-6">Berita Lainnya</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6 px-2">
                
                {hasResults ? (
                  Object.entries(NEWS_DATA).map(([category, items]) => {
                    const filteredItems = items.filter((news) => 
                      news.title.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    return (
                      <React.Fragment key={category}>
                        {filteredItems.map((news) => (
                          <div 
                            key={news.id} 
                            ref={el => sectionRefs.current[category] = el}
                            className={`bg-white border border-gray-50 p-4 rounded-[12px] cursor-pointer shadow-sm flex gap-4 hover:shadow-md transition-all group
                              ${activeCategory !== "Semua" && activeCategory !== category ? 'hidden' : 'flex'}
                            `}
                          >
                            <div 
                                className="w-20 h-20 bg-cover bg-center rounded-xl shrink-0 group-hover:scale-105 transition-transform"
                                style={{ backgroundImage: `url(${news.img})` }}
                            ></div>
                            <div className="flex flex-col justify-center overflow-hidden">
                              <h4 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {news.title}
                              </h4>
                              <span className="text-[10px] text-gray-400 mt-1 font-medium">{news.date}</span>
                              <div className="mt-2">
                                <span className="bg-[#3B82F6]  text-white text-[9px] px-2 py-0.5 rounded-full font-bold ">
                                  {category}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 font-medium">Berita tidak ditemukan.</p>
                  </div>
                )}
                
              </div>
              <div className="hidden lg:block h-20"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default DoubleScrollNews;
