import { FaSchool, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";


const AboutSection = () => {
      useEffect(()=>{
        Aos.init({})
      },[])
  return (
    <>
    <div className="relative py-16 overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[url('images/particle01.png')] bg-no-repeat bg-right bg-contain opacity-20 pointer-events-none"></div>
     
      <section className="relative max-w-7xl mx-auto px-6 lg:px-16 text-center mb-20">
        <div data-aos="fade-up" data-aos-duration="2000">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Pengguna TEFA</h2>
        <center><span className="block w-50 h-1 mt-2 bg-gradient-to-r from-[#0084FF] to-[#FFDF0C] rounded"></span></center>
        <center><span className="block w-50 border-b-2 border-dashed border-gray-300 mt-1"></span></center>
        
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Sistem Manajemen Siswa TEFA digunakan oleh berbagai pihak di SMK Negeri 3 Pamekasan, 
          sehingga proses akademik lebih terintegrasi dan transparan.
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Sekolah",
              desc: "Pengguna sekolah memiliki peran penting dalam mengatur siswa, guru, data, serta aktivitas akademik, dan dapat menyesuaikan berbagai kebutuhan berdasarkan kondisi sekolah.",
              icon: <FaSchool className="text-blue-700 w-8 h-8" />,
            },
            {
              title: "Guru",
              desc: "Guru dapat dengan mudah mengelola absensi, nilai, serta jurnal mengajar. Sistem ini membantu guru dalam mencatat serta melaporkan aktivitas pembelajaran dengan baik.",
              icon: <FaChalkboardTeacher className="text-blue-700 w-8 h-8" />,
            },
            {
              title: "Siswa",
              desc: "Siswa dapat memberikan tanggapan, melihat informasi nilai, serta mengikuti kegiatan yang sudah dijadwalkan oleh admin sekolah.",
              icon: <FaUserGraduate className="text-blue-700 w-8 h-8" />,
            },
          ].map((item, idx) => (
            <div
              data-aos="fade-up" data-aos-duration="2000"
              key={idx}
              className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center hover:shadow-2xl transition duration-500"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-6 lg:px-16 text-center">
        <div data-aos="fade-up" data-aos-duration="2000">
        <h2 className="text-2xl font-bold text-blue-800 ">Berita & Update</h2>
        <center><span className="block w-50 h-1 mt-2 bg-gradient-to-r from-[#0084FF] to-[#FFDF0C] rounded"></span></center>
        <center><span className="block w-50 border-b-2 border-dashed border-gray-300 mt-1 mb-4"></span></center>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Ikuti perkembangan terbaru kegiatan TEFA SMK Negeri 3 Pamekasan.
        </p>
        </div>

        <div  className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {[1, 2, 3].map((idx) => (
            <div
              data-aos="fade-up" data-aos-duration="3000"
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition duration-500"
            >
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Thumbnail {idx}</span>
              </div>
              <div className="p-6 text-left flex flex-col flex-grow ">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-500">
                  Judul Berita
                </h3> 
                <p className="text-sm text-gray-600 flex-grow">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                </p>
                
                <button  className="mt-4 px-4 py-2 w-[70%] bg-yellow-400 text-gray-800 font-medium rounded-md hover:bg-yellow-500 transition">
                  Baca Selengkapnya →
                </button>
              
              </div>
            </div>
          ))}
        </div>

        <a href="/berita">
        <button data-aos="fade-up" data-aos-duration="3000" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition">
          Lihat Semua Berita →
        </button>
        </a>
      </section>
    </div>



    </>

  );
};

export default AboutSection;