import { FaUserCheck, FaBookOpen, FaChartBar, FaExclamationTriangle, FaComments, FaUserFriends } from "react-icons/fa";
import { HashLink } from "react-router-hash-link"; 
import Aos from "aos"; // Tambahkan jika Aos digunakan di sini
import { useEffect } from "react"; // Tambahkan jika Aos digunakan di sini

const SectionTentangKami = () => {
     
     useEffect(() => {
         Aos.init({});
     }, []);

    return (
        <>
            <div className="bg-white text-gray-800">
                {/* Section Tentang Kami */}
                <section className="max-w-7xl mx-auto px-6 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    {/* Left Content */}
                    <div>
                        {/* ... Konten header dan paragraf tetap sama ... */}
                        <h2 data-aos="fade-up" data-aos-duration="3000" className="text-blue-600 font-semibold text-[28px] inline-block relative">
                            Tentang Kami
                            <span className="block w-50 h-1 mt-2 bg-gradient-to-r from-[#0084FF] to-[#FFDF0C] rounded"></span>
                            <span className="block w-50 border-b-2 border-dashed border-gray-300 mt-1"></span>
                        </h2>

                        <p data-aos="fade-up" data-aos-duration="3000" className="mt-6 text-gray-600 leading-relaxed max-w-2xl">
                            TEFA SMK Negeri 3 Pamekasan merupakan model pembelajaran berbasis
                            produksi dan jasa yang menekankan pada aspek kewirausahaan. Dengan
                            adanya TEFA, siswa dapat langsung mempraktikkan keterampilan sesuai
                            kompetensi keahliannya, serta menghasilkan produk dan jasa yang
                            memiliki nilai jual.
                        </p>

                        {/* ✅ PERUBAHAN DI SINI: Mengubah 'to' ke halaman lain, lalu ke ID */}
                        <HashLink smooth to="/tentangkami"> 
                            <button
                                data-aos="fade-up"
                                data-aos-duration="3000"
                                className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                            >
                                Pelajari Lebih Lanjut →
                            </button>
                        </HashLink>
                    </div>

                    {/* Right Image */}
                    <div data-aos="fade-up" data-aos-duration="3000" className="flex justify-center lg:justify-end">
                        <img
                            src="/images/people/02.png"
                            alt="Student"
                            className="w-80 lg:w-[400px] object-contain"
                        />
                    </div>
                </section>
            </div>

            <div data-aos="fade-up" data-aos-duration="2000">
              <h2 className="text-2xl text-center font-bold text-blue-800 ">Berita & Update</h2>
              {/* Garis Gradasi */}
              <center><span className="block w-50 h-1 mt-2 bg-gradient-to-r from-[#0084FF] to-[#FFDF0C] rounded"></span></center>
              {/* Garis Putus-Putus */}
              <center><span className="block w-50 border-b-2 border-dashed border-gray-300 mt-1 mb-4"></span></center>
              <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                Ikuti perkembangan terbaru kegiatan TEFA SMK Negeri 3 Pamekasan.
              </p>
           </div>

                        
        </>
    );
};

export default SectionTentangKami;