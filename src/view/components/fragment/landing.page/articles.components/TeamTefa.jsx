import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const teamMembers = [
  { name: "Hilman Nidal Hamzi", role: "Project Manager", img: "/images/team1.jpg" },
  { name: "Ilhaminando Nayaka S.", role: "Frontend Developer", img: "/images/team2.jpg" },
  { name: "Fairouz Azadi A.", role: "Frontend Developer", img: "/images/team/fairouz.png" },
  { name: "Angga Rahmadani", role: "UI/UX Designer", img: "/images/team3.jpg" },
  { name: "Jaka Kusuma A.", role: "UI/UX Designer", img: "/images/team3.jpg" },
  { name: "Ega Cairigio Meifirdo", role: "Backend Developer", img: "/images/team/ega3.jpg" },
  { name: "M. Ghiyats Romzi R.", role: "Backend Developer", img: "/images/team/giat.png" },
  { name: "Valen Abdilah R", role: "QA Tester", img: "/images/team/valen.jpg" },
];

const TeamSlider = () => {
  return (
    <section className="bg-[#123B5C] py-16 flex items-center relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-100 bg-gradient-to-r from-[#123B5C] via-[#123B5C]/20 to-transparent z-20"></div>
      <div className="absolute right-0 top-0 h-full w-100 bg-gradient-to-l from-[#123B5C] via-[#123B5C]/20 to-transparent z-20"></div>

      <div className="w-full mx-auto relative z-10">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={4000}
          loop={true}
          slidesPerView={5}
          spaceBetween={40}
          onSwiper={(swiper) => {
            swiper.el.addEventListener("mouseenter", () => swiper.autoplay.stop());
            swiper.el.addEventListener("mouseleave", () => swiper.autoplay.start());
          }}
          className="h-full px-8"
        >
          {teamMembers.map((person, i) => (
            <SwiperSlide key={i} className="h-full">
              <div
                className="relative group bg-white rounded-2xl p-6 flex flex-col 
                           items-center justify-center text-center h-80
                           shadow-md hover:shadow-xl transition-all duration-500 
                           hover:scale-105"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-24 h-24 rounded-full object-cover mb-4
                             group-hover:scale-110 transition-transform duration-500"
                />

                <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                <p className="text-sm text-gray-500">{person.role}</p>

                <div className="flex gap-4 mt-4 text-lg">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-black transform hover:scale-125 transition duration-300"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-[#0A66C2] transform hover:scale-125 transition duration-300"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSlider;
