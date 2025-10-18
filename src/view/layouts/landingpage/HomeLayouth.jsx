import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { HashLink } from "react-router-hash-link"; 


const MainHomeLayouth = (props) => {

  useEffect(()=>{
    Aos.init({})
  },[])

    const {Text,uppercase,yellowtext,deskripsi,ButtonA,ButtonB,img,imgVariant,variantA,variantB } = props
    return (
      <div className=" w-full relative">

        

        <div className="absolute inset-0 bg-[url('/images/background/bgnew.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#003566]/82 to-[#001D3D]/98"></div>
  
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white mx-16">
          <section className="relative min-h-screen flex items-center text-white">
            <div className="container mx-auto px-6 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div 
                  data-aos="fade-right"
                  data-aos-duration="3000">
                <h1 className="text-[48px] md:text-4xl font-bold leading-snug">
                  <span  className="text-yellow-400 text-[40px] font-bold">{yellowtext}</span> {Text} <br />
                  <span className="uppercase text-[40px]">{uppercase}</span>
                </h1>
  
                <p className="mt-6 text-gray-300 max-w-lg">
                    {deskripsi}
                </p>
  
                <div 

                data-aos="fade-right"
                data-aos-duration="2000"
                               
                className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/berita"
                    className={variantB}
                  >
                    {ButtonB}
                  </a>
                  <a
                    href="/tentangkami"
                    className={variantA}
                  >
                    {ButtonA}
                  </a>
                </div>
              </div>
  
              <div 
              data-aos="fade-up"
              data-aos-duration="3000"
              >
              <div            
              className="flex justify-center lg:justify-end">
                <img
                  src={img}
                  alt=""
                  className={imgVariant}
                />
              </div>
              </div>
            </div>
          </section>
        </div>
        <footer  className="bg-[#001D3D] text-gray-300 py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
            <div className="flex">
          <img
            src="/images/SMKNLOGO1.png"
            alt="SMK Negeri 3 Pamekasan"
            className="w-10 mb-4 mr-5"
          />
          <h2 className="text-lg font-semibold w-30 ">SMK Negeri 3 Pamekasan</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed">
            Teaching Factory SMK Negeri 3 Pamekasan menghadirkan pembelajaran
            berbasis industri untuk mencetak generasi siap kerja.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-white font-semibold mb-4">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-yellow-400 transition">
                Beranda
              </a>
            </li>
            <li>
              <a href="/tentangkami" className="hover:text-yellow-400 transition">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="/berita" className="hover:text-yellow-400 transition">
                Berita
              </a>
            </li>
            <li>
            <HashLink
                smooth
                to="/#FAQ"
                className="hover:text-yellow-300 hover:underline transition-all duration-500"
              >              
                FAQ
            </HashLink>
            </li>
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
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="block">
                Alamat: Jl. Raya Larangan Tokol, Pamekasan
              </span>
            </li>
            <li>
              <span className="block">Telepon: (0324) 32xxxx</span>
            </li>
            <li>
              <span className="block">Email: tefa@smkn3pamekasan.sch.id</span>
            </li>
          </ul>
        </div>

        {/* Media Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Media Social</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaInstagram className="text-yellow-400" />
              <a href="#" className="hover:text-yellow-400 transition">
                @tefa.smkn3pamekasan
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaFacebook className="text-yellow-400" />
              <a href="#" className="hover:text-yellow-400 transition">
                @TEFASMKN3Pamekasan
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaTwitter className="text-yellow-400" />
              <a href="#" className="hover:text-yellow-400 transition">
                tefa.smkn3pamekasan
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-xs text-gray-400">
        © 2025 TEFA SMK Negeri 3 Pamekasan. Semua Hak Dilindungi.
      </div>
    </footer>
      </div>
    );
  };
  
  export default MainHomeLayouth;
  