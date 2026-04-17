import React, { useState,useEffect,useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const GalleryPage = () => {

    const [scrollProgress, setScrollProgress] = useState(0);
    const timelineRef = useRef(null);

    useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalHeight = rect.height;
      const progress = Math.max(0, Math.min(100, ((windowHeight / 2 - rect.top) / totalHeight) * 100));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const journeySteps = [
    { id: 1, tahap: "Tahap 1", title: "Ide dan Konsep Awal", desc: "ide pengembangan TEFA “Seminar” bermula dari kebutuhan sekolah yang mampu menyatukan berbagai data dalam satu platform yang rapi dan mudah dipantau. Sehingga membangun sebuah sistem informasi sekolah yang modern, terintegrasi, dan real time.", image: "/images/landing-page/galery/tahapan/ide.jpeg" },
    { id: 2, tahap: "Tahap 2", title: "Perancangan dan Pembentukan", desc: "Proses desain UI/UX TEFA “Seminar” dimulai dengan memahami kebutuhan pengguna seperti guru, siswa, dan admin. Kemudian menjadi konsep tampilan yang sederhana, efisien, dan mudah dipahami.", image: "/images/landing-page/galery/tahapan/desain.png" },
    { id: 3, tahap: "Tahap 3", title: "Pengembangan Sistem", desc: "Pengembangan sistem TEFA “Seminar” dimulai dengan merancang dan mampu menangani kebutuhan integrasi data sekolah. Struktur sistem dirancang agar seluruh informasi nilai, absensi, dan kegiatan siswa dapat diolah secara terpusat dan real-time.", image: "/images/landing-page/galery/tahapan/pengembangan.jpeg" },
    { id: 4, tahap: "Tahap 4", title: "Pelaksanaan Uji Coba Awal", desc: "Tahap uji coba dimulai dengan mengimplementasikan sistem TEFA “Seminar”. Tujuannya adalah memastikan semua fungsi berjalan sesuai kebutuhan sebelum di luncurkan.", image: "/images/landing-page/galery/tahapan/uji1.jpeg" },
    { id: 5, tahap: "Tahap 5", title: "Perbaikan Serta Penyempurnaan Fitur", desc: "Proses perbaikan dimulai setelah seluruh hasil uji coba dari guru, siswa, serta admin dianalisis secara menyeluruh. Setiap kendala mulai dari tampilan, alur penggunaan, hingga performa sistem di identifikasi untuk menjadi dasar penyempurnaan fitur.", image: "/images/landing-page/galery/tahapan/perbaikan.png" },
    { id: 6, tahap: "Tahap 6", title: "Peluncuran Versi Pertama", desc: "Setelah melalui rangkaian perencanaan, desain, uji coba, dan penyempurnaan fitur, TEFA “Seminar” akhirnya memasuki fase peluncuran versi pertama. Sistem telah dipastikan stabil, aman, dan siap digunakan oleh seluruh pengguna di lingkungan sekolah.", image: "/images/landing-page/galery/tahapan/peluncuran.png" }
  ];

  const docImages = [
    { id: 1, url: "/images/landing-page/galery/perjalanan/img1.png" },
    { id: 2, url: "/images/landing-page/galery/perjalanan/img2.png" },
    { id: 3, url: "/images/landing-page/galery/perjalanan/img3.png" },
    { id: 4, url: "/images/landing-page/galery/perjalanan/img4.png" },
    { id: 5, url: "/images/landing-page/galery/perjalanan/img11.png" },
    { id: 6, url: "/images/landing-page/galery/tahapan/desain.png" },
    { id: 7, url: "/images/landing-page/galery/perjalanan/img8.png" },
    { id: 8, url: "/images/landing-page/galery/tahapan/ide.jpeg" },
    { id: 9, url: "/images/landing-page/galery/tahapan/desain.png" },
    { id: 10, url: "/images/landing-page/galery/perjalanan/img10.png" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const totalPages = Math.ceil(docImages.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = docImages.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white min-h-screen text-gray-800 overflow-x-hidden">
      <div className="relative h-[400px] md:h-[500px] lg:h-[585px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-center transition-transform " style={{ backgroundImage: `url('/images/landing-page/about/about.png')` }}></div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">Gallery</h2>
        </div>
      </div>

      <div  className="max-w-7xl mx-auto px-6 py-16">
        <div data-aos="fade-up" className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-semibold mb-4">Perjalanan Kami</h2>
          <p className="text-gray-500 max-w-[800px] mx-auto leading-relaxed text-base md:text-lg">
            Perjalanan kami merupakan dokumentasi dari proses pembelajaran, pengembangan kompetensi, hingga terbentuknya produk TEFA yang siap digunakan.
          </p>
        </div>

        <div data-aos="fade-up">
            <h2 className="text-3xl mb-14 font-semibold mb-3 text-center lg:text-left">Tahapan Pengembangan Sistem TEFA</h2>
        </div>

        <div ref={timelineRef} className="relative space-y-12 lg:space-y-24 mb-32">
          
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-[3px] bg-blue-200 h-full" style={{ height: `${scrollProgress}%` }}></div>

          {journeySteps.map((step, index) => {
            const isEven = index % 2 !== 0;
            const isStepActive = scrollProgress > (index / (journeySteps.length - 1)) * 100 - 5;

            return (
              <div key={step.id} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                
                <div className="flex-1 w-full" data-aos={isEven ? "fade-left" : "fade-right"}>
                  <div className={`p-6 bg-white h-auto lg:h-[225px] border rounded-3xl transition-all duration-500 ${isStepActive ? 'border-blue-200 shadow-xl' : 'border-gray-100 shadow-sm opacity-50'}`}>
                    <span className={`inline-block px-4 py-1 rounded-full mb-4 text-xs font-semibold ${isStepActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {step.tahap}
                    </span>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                <div className="relative hidden lg:flex w-24 xl:w-40 justify-center items-center">
                  <div className={`z-20 rounded-full w-14 h-14 flex items-center justify-center border-4 transition-all duration-500 scale-100 ${
                    isStepActive 
                    ? 'bg-blue-500 border-white text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110' 
                    : 'bg-white border-gray-200 text-gray-300'
                  }`}>
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                </div>

              <div className="flex-1 w-full" data-aos={isEven ? "fade-right" : "fade-left"}>
                <div className={`aspect-video h-[225px] w-full rounded-3xl overflow-hidden border transition-all duration-500 bg-gray-100 flex items-center justify-center ${
                  isStepActive ? 'border-blue-100 grayscale-0' : 'border-transparent grayscale opacity-30'
                }`}>
                  {step.image ? (
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = 'https://placehold.co/600x400?text=Gambar+Tidak+Ada'; 
                      }}
                    />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center">
                      <span className="text-sm italic">Dokumentasi Belum Tersedia</span>
                    </div>
                  )}
                </div>
              </div>

              </div>
            );
          })}
        </div>

        <div className=" mt-5 lg:mt-32">
          <div className="mb-12" data-aos="fade-right">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center lg:text-left">Tampilkan semua dokumentasi</h2>
            <p className="text-gray-500 text-center lg:text-left text-sm md:text-base">Lihat seluruh dokumentasi perjalanan TEFA dari awal hingga siap di gunakan.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[500px] lg:h-[600px]">
             <div className="w-full md:w-1/4 h-[300px] md:h-full" data-aos="fade-up" data-aos-delay="100">
              {currentImages[0] && (
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-100 group shadow-sm border border-gray-100">
                  <img src={currentImages[0].url} alt="doc" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
            </div>

            <div className="w-full md:w-2/4 flex flex-col gap-4 h-auto md:h-full">
              <div className="h-[250px] md:h-3/5" data-aos="fade-up" data-aos-delay="200">
                {currentImages[1] && (
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-100 group shadow-sm border border-gray-100">
                    <img src={currentImages[1].url} alt="doc" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
              </div>
              <div className="flex gap-4 h-[180px] md:h-2/5">
                <div className="w-1/2 h-full" data-aos="fade-up" data-aos-delay="300">
                  {currentImages[2] && (
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-100 group shadow-sm border border-gray-100">
                      <img src={currentImages[2].url} alt="doc" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                </div>
                <div className="w-1/2 h-full" data-aos="fade-up" data-aos-delay="400">
                  {currentImages[3] && (
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-100 group shadow-sm border border-gray-100">
                      <img src={currentImages[3].url} alt="doc" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/4 h-[300px] md:h-full" data-aos="fade-up" data-aos-delay="500">
              {currentImages[4] && (
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-100 group shadow-sm border border-gray-100">
                  <img src={currentImages[4].url} alt="doc" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-12" data-aos="fade-in">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 disabled:opacity-30" disabled={currentPage === 1}>
              <ChevronLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 disabled:opacity-30" disabled={currentPage === totalPages}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
