import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import ContactSection from "./Contact";
import Footer from "./MainFooter";
import Aos from "aos";
import "aos/dist/aos.css";

const FAQ = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu TEFA SMK Negeri 3 Pamekasan?",
      answer:
        "TEFA (Teaching Factory) adalah model pembelajaran berbasis produksi/jasa di SMK Negeri 3 Pamekasan yang menyatukan proses belajar dengan dunia industri.",
    },
    {
      question: "Bidang apa saja yang ada di TEFA SMK Negeri 3 Pamekasan?",
      answer:
        "Bidang yang ada mencakup berbagai kompetensi keahlian sesuai jurusan, seperti teknologi, bisnis, desain, dan lainnya.",
    },
    {
      question: "Apa manfaat TEFA bagi siswa?",
      answer:
        "Siswa memperoleh pengalaman kerja nyata, meningkatkan keterampilan, dan menumbuhkan jiwa wirausaha.",
    },
    {
      question: "Apakah TEFA terbuka untuk masyarakat umum?",
      answer:
        "Ya, produk dan jasa dari TEFA dapat diakses masyarakat umum sesuai bidang yang tersedia.",
    },
    {
      question: "Bagaimana cara berkolaborasi dengan TEFA SMK Negeri 3 Pamekasan?",
      answer:
        "Masyarakat atau dunia industri dapat menjalin kerja sama melalui pihak sekolah untuk kegiatan produksi maupun jasa.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section id="FAQ" className="relative py-16 bg-[#001D3D]">
        {/* Background + Overlay */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('/images/bg/VectorHD.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-[#001D3D]/85"></div>
        </div>

        {/* Konten */}
        <div
          data-aos="fade-down"
          data-aos-duration="3000"
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white">
            Frequently-Asked-Questions
            {/* Garis Gradasi */}
            <div className="flex justify-center">
              <span className="block w-72 h-1 mt-2 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 rounded"></span>
            </div>
            {/* Garis Putus-Putus */}
            <div className="flex justify-center">
              <span className="block w-72 h-1 mb-6 border-b-2 border-dashed border-gray-300 mt-1"></span>
            </div>
          </h2>

          <p className="text-center text-gray-300 mt-2 mb-10">
            Temukan jawaban seputar TEFA SMK Negeri 3 Pamekasan.
          </p>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#012A4A] rounded-lg shadow-md overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-white font-medium hover:bg-[#013A63] transition"
                >
                  {faq.question}
                  <FaChevronDown
                    className={`transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180 text-yellow-400" : ""
                    }`}
                  />
                </button>

                {/* Answer with slide animation */}
                <div
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index ? "max-h-40 py-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-300 text-left transition-all duration-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Garis Pembatas Section */}
        <div className="relative z-10 w-full h-1 mt-30 bg-gradient-to-r from-[#FFD60A] via-[#62B028] to-[#068599]"></div>

        {/* Contact Section */}
        <div className="relative z-10 mt-16">
          <ContactSection />
        </div>
      </section>
    </>
  );
};

export default FAQ;
