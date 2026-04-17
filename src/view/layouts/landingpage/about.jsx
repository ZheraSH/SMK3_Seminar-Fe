import { IdCardLanyard, BookOpenCheck, ShieldCheck, Database, FileChartColumn, CalendarDays } from "lucide-react";
import 'aos/dist/aos.css';
import { program,fitur,mentor  } from "@data/leanding-page";
import AOS from 'aos';
import { useEffect } from "react";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function AboutLp() {

    useEffect(() => {
        AOS.init({
            duration: 800, 
            once: true,    
            easing: 'ease-out-cubic',
            offset: 120,
        });
    }, []);

    const info = [
        { title: "Siswa", jumlah: "1200" },
        { title: "Jurusan Aktif", jumlah: "6" },
        { title: "mitra Industri", jumlah: "10" },
    ];

    const { ref, inView } = useInView({
        triggerOnce: true, 
        threshold: 0.5,    
    });
    
   

    return (
        <div className=" font-sans overflow-hidden">
            <div className="bg-[url('/images/landing-page/about/about.png')] bg-cover bg-center h-[300px] md:h-[585px] flex items-center justify-center text-white ">
                <h1 
                className="font-bold text-6xl md:text-7xl text-center">Tentang Kami</h1>
            </div>

            <div  className="container mx-auto px-6 py-10 md:py-20 flex flex-col lg:flex-row gap-10 justify-center items-center bg-white">
                <img data-aos="fade-right" src="/images/landing-page/about/model-about.png" alt="model About" className="w-full max-w-[450px] object-contain" />
                <div className="lg:ml-8 w-full">
                    <h1 className="text-[28px] md:text-[36px] font-semibold mb-4 text-[#1E3A8A] flex flex-col items-start gap-1">
                        <span>Tentang Kami</span>
                        <span className="h-[5px] w-[59px] bg-[#3B82F6] rounded-full"></span>
                    </h1>
                    
                    <p className="text-black text-[16px] md:text-[18px] leading-relaxed">
                        SMK Negeri 3 Pamekasan merupakan lembaga pendidikan vokasi yang berorientasi 
                        pada pembentukan kompetensi nyata di dunia kerja. Melalui program Teaching Factory 
                        (TEFA), kami mengintegrasikan kegiatan belajar dengan proses produksi dan layanan profesional.
                    </p>
                    <p className="text-black text-[16px] md:text-[18px] leading-relaxed mt-5">
                         Sekolah kami berkomitmen menciptakan lulusan yang kompeten, disiplin, dan siap bersaing melalui
                         pembelajaran berbasis proyek dan budaya kerja modern.
                    </p>
                    
                    <div  data-aos="fade-left" ref={ref} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {info.map((item, index) => (
                            <div 
                                key={index} 
                                className="bg-white border-2 border-[#DBEAFE] rounded-2xl py-4 px-4 shadow-lg text-center"
                            >
                                <h2 className="text-[28px] md:text-[36px] font-semibold text-[#3B82F6]">
                                    {inView ? (
                                        <>
                                            {item.suffix}
                                            <CountUp end={item.jumlah} duration={2.5} prefix="+" />
                                        </>
                                    ) : (
                                        "+0"
                                    )}
                                </h2>
                                <p className="text-[16px] md:text-[20px] text-[#3B82F6]">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#DBEAFE]">
                <div className="bg-[url('/images/landingPage/about/bg-about3.png')] bg-cover bg-center min-h-screen md:min-h-0 flex flex-col lg:flex-row items-center justify-center p-10 md:p-15 gap-10 md:gap-10">
                    <h1 className="text-[#1F2937] text-[24px] md:text-[38px] font-bold leading-tight text-center lg:text-left lg:w-[500px]">
                        Program Teaching Factory (TEFA) di SMK Negeri 3 Pamekasan dirancang untuk:
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 items-stretch">
                        {program.map((item, index) => (
                            <div 
                                key={index}
                                className="relative bg-[#3B82F6] px-2 md:w-[340px] py-8 rounded-tr-[50px] md:rounded-tr-[70px] shadow-lg flex items-center justify-center h-full"
                            >
                                <img 
                                    className="absolute top-[-15px] left-3 w-8 md:w-10 opacity-90" 
                                    src="/images/landing-page/about/petik.png" 
                                    alt="quote" 
                                />
                                
                                <p className="text-[14px] md:text-[16px] text-white leading-relaxed text-center font-medium">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-15 flex flex-col gap-10 justify-center items-center bg-white">
                <div className="text-center">
                    <h1 className="text-[28px] md:text-[36px] font-semibold text-[#1E3A8A] flex flex-col items-center gap-1">
                        Fitur Utama SEMINAR
                        <span className="h-[5px] w-[150px] md:w-[200px] bg-[#3B82F6] rounded-full"></span>
                    </h1>
                    <p className="mt-6 text-[16px] md:text-[18px] text-black leading-relaxed max-w-3xl mx-auto">
                        Semua kebutuhan pengelolaan sekolah tersedia dalam satu sistem yang mudah
                        digunakan dan siap mendukung kinerja guru serta siswa.
                    </p>
                </div>

                <div data-aos="zoom-in" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full max-w-6xl">
                    {fitur.map((item, index) => (
                        <div 
                        key={index} 
                        className="bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-4 shadow-xl border border-gray-100 inset-shadow-sm transition-all duration-500 ease-in-out 
                   hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-2">
                            <div  data-aos="zoom-in-up" className="text-white text-[28px] p-3 rounded-full bg-[#3B82F6]">
                                {item.icon}
                            </div>
                            <h2  className="text-[18px] md:text-[20px] font-semibold text-[#1F2937]">
                                {item.title}
                            </h2>
                            <p  className="text-[14px] md:text-[16px] font-normal text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div data-aos="fade-up" className="container mx-auto px-6 py-10 flex flex-col items-center justify-center bg-white">
                <h1  className="text-[28px] md:text-[30px] font-bold text-[#1E3A8A] flex flex-col items-center gap-1 text-center">
                    Tim di Balik SEMINAR
                    <span className="h-[5px] w-[120px] md:w-[160px] bg-[#3B82F6] rounded-full"></span>
                </h1>
                <p data-aos="fade-up" data-aos-delay="200" className="mt-6 text-center text-[16px] md:text-[18px] text-black leading-relaxed max-w-4xl">
                    Dikembangkan oleh siswa dan pembimbing SMK Negeri 3 Pamekasan melalui Teaching 
                    Factory berbasis kebutuhan nyata sekolah.
                </p>

                <div data-aos="fade-up" data-aos-delay="400" className="mt-12 w-full text-center">
                    <span className="inline-block bg-[#3B82F6] py-2 px-8 text-white text-[18px] md:text-[20px] font-semibold rounded-full shadow-md">
                        Pembimbing & Mentor
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-20 mt-12 justify-center max-w-4xl mx-auto">
                        {mentor.map((item, index) => (
                            <div 
                            key={index} 
                            className="flex flex-col items-center gap-4 group">
                                <div className="overflow-hidden rounded-2xl shadow-lg">
                                    <img src={item.img} alt={item.name} className="w-[280px] h-[360px] md:w-[325px] md:h-[420px] object-cover transition-transform duration-300 group-hover:scale-105" />
                                </div>
                                <div>
                                    <h2 className="text-[18px] md:text-[20px] font-bold text-[#1F2937]">{item.name}</h2>
                                    <p className="text-[16px] text-gray-500 font-medium">{item.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

