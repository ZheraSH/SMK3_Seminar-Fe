import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
import React from "react";


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
      </div>
    );
  };
  
  export default MainHomeLayouth;
  