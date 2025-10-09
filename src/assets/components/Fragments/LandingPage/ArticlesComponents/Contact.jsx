import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const ContactSection = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <section  id="contact"  className="relative py-16">
      <div
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration="1000"
        className="max-w-7xl mx-auto px-6 lg:px-16"
      >
        {/* Heading */}
        <h2 className=" text-2xl md:text-3xl font-bold text-white mb-4">
          Hubungi Kami
        </h2>
        {/* Garis Gradasi */}
        <span className="block w-55 h-1 mt-2 bg-gradient-to-r from-[#0084FF] to-[#FFDF0C] rounded"></span>
        {/* Garis Putus-Putus */}
        <span className="block w-55 border-b-2 border-dashed border-gray-300 mt-1 mb-5"></span>
        <p className="text-gray-300 mb-10 max-w-2xl">
          Kami siap bekerja sama dan menjawab pertanyaan Anda terkait Teaching
          Factory SMK Negeri 3 Pamekasan.
        </p>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-[#003566] to-[#012A4A] text-white rounded-l-xl shadow-lg p-8 flex flex-col justify-between relative z-0">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <ul className="space-y-5 text-gray-200">
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="text-yellow-400 mt-1" />
                <span>(0324) 3xxxxx</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-yellow-400 mt-1" />
                <span>
                  Jl. Kabupaten No.103, RW. 01, Bugih, Kec. Pamekasan, Kabupaten
                  Pamekasan, Jawa Timur 69317
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-yellow-400 mt-1" />
                <span>tefa@smkn3pamekasan.sch.id</span>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="text-yellow-400 mt-1" />
                <span>
                  Senin – Jumat : 08.00 – 16.00 WIB <br />
                  Sabtu : 08.00 – 12.00 WIB
                </span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 relative z-10 -ml-6 lg:-ml-12">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Depan */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Nama Depan
                </label>
                <input
                  type="text"
                  placeholder="Nama Depan"
                  className="mt-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                />
              </div>

              {/* Nama Belakang */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Nama Belakang
                </label>
                <input
                  type="text"
                  placeholder="Nama Belakang"
                  className="mt-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="mt-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                />
              </div>

              {/* No Telepon */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  No Telepon
                </label>
                <input
                  type="text"
                  placeholder="No Telepon"
                  className="mt-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2"
                />
              </div>

              {/* Pesan */}
              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Pesan
                </label>
                <textarea
                  rows="4"
                  placeholder="Ketik Pesan Anda Disini..."
                  className="mt-2 border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Button */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
