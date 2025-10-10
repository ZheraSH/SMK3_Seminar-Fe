import { FaIndustry, FaHandshake, FaCube, FaBriefcase } from "react-icons/fa";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";
import React from "react";

const SecondAbout = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-blue-50 to-white">
      <div id="tentangkami" className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Atas: Image + Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div
            data-aos="fade-right"
            data-aos-duration="2000"
            className="flex justify-center"
          >
            <img
              src="/images/people/02.png"
              alt="Tentang TEFA"
              className="max-w-sm lg:max-w-md"
            />
          </div>

          {/* Right: Text */}
          <div data-aos="fade-left" data-aos-duration="2500">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
              Tentang TEFA
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              TEFA (Teaching Factory) di SMK Negeri 3 Pamekasan merupakan model
              pembelajaran yang mengintegrasikan teori dengan praktik nyata.
              Melalui TEFA, siswa tidak hanya belajar di kelas, tetapi juga
              terlibat langsung dalam proses produksi dan pengembangan produk
              sesuai standar industri.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Dengan pendekatan ini, TEFA menjadi wadah kolaborasi antara guru,
              siswa, dan mitra industri untuk menghadirkan solusi nyata yang
              bermanfaat bagi masyarakat.
            </p>
          </div>
        </div>

        {/* Features (Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            {
              icon: (
                <FaIndustry className="text-4xl text-blue-600 mx-auto mb-4" />
              ),
              title: "Berbasis Industri",
              desc: "Pembelajaran yang sesuai standar dunia kerja.",
            },
            {
              icon: (
                <FaHandshake className="text-4xl text-blue-600 mx-auto mb-4" />
              ),
              title: "Kolaborasi Nyata",
              desc: "Menghubungkan siswa, guru, dan mitra industri.",
            },
            {
              icon: <FaCube className="text-4xl text-blue-600 mx-auto mb-4" />,
              title: "Inovasi Produk",
              desc: "Menghasilkan karya nyata yang bermanfaat.",
            },
            {
              icon: (
                <FaBriefcase className="text-4xl text-blue-600 mx-auto mb-4" />
              ),
              title: "Siap Kerja",
              desc: "Membekali siswa dengan kompetensi yang relevan.",
            },
          ].map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-duration={i % 2 === 0 ? "2000" : "2500"}
              className="bg-white rounded-xl shadow-md p-6 text-center transition transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl flex flex-col items-center h-full"
            >
              {item.icon}
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm flex-grow">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondAbout;
