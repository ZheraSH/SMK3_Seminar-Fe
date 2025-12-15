import Header from "./Header";
import { useNavigate } from "react-router-dom";
import useMajors from "../../../../Core/hooks/operator-hooks/class-major/useMajor";
import {UniversalReveal,ProfessionalHeaderReveal,CharReveal} from "../../../components/animate/animate";
const majorMappings = [
  {
    apiName: "Desain Komunikasi Visual",
    fullName: "dkv",
    logo: "/images/major/dkv.png",
  },
  {
    apiName: "Kecantikan & Spa",
    fullName: "Kecantikan & Spa",
    logo: "/images/major/kcs.png",
  },
  {
    apiName: "Desain & Produksi Busana",
    fullName: "DPB",
    logo: "/images/major/busana.png",
  },
  {
    apiName: "Perhotelan",
    fullName: "Perhotelan",
    logo: "/images/major/ph.png",
  },
  {
    apiName: "Kuliner",
    fullName: "Kuliner",
    logo: "/images/major/kuliner.png",
  },
  {
    apiName: "Pengembangan Perangkat Lunak & Game",
    fullName: "Pengembangan Perangkat Lunak & Game",
    logo: "/images/major/pplg02.png",
  },
];

const MajorCardGrid = () => {
  const { majors, loading } = useMajors();
  const navigate = useNavigate();

  const handleViewDetail = (majorFullName) => {
    const encodedName = encodeURIComponent(majorFullName);
    navigate(`/home/class?major=${encodedName}`);
  };

  const renderedMajors = majors.map((major) => {
    const mapping = majorMappings.find((m) => m.apiName === major.name);
    return {
      id: major.id,
      apiName: major.code,
      fullName: major.name,
      logo: mapping ? mapping.logo : "/images/major/default.png",
    };
  });

  return (
    <>
      <div className="p-3 md:p-3 bg-gray-50 mb-20 md:mb-32">
        <ProfessionalHeaderReveal className="relative w-full h-[166px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] mb-4">
          <div className="absolute inset-0 items-center justify-center rounded-[6px]">
            <div className="ml-5 mt-2">
              <CharReveal text="Kelas & Jurusan" className="text-white text-[30px] font-semibold" delay={0.6}/>
              <CharReveal text="Kelola data kelas dan jurusan di sekolah Anda"className="text-white text-[14px] font-light"delay={0.8}/>
            </div>
          </div>
        </ProfessionalHeaderReveal>
        <Header />
        {loading ? (
          <div className="p-4 md:p-8 text-center text-blue-600">
            Memuat data jurusan...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {renderedMajors.map((major,index) => (
              <UniversalReveal key={major.id} delay={index * 0.1}  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center border border-gray-100 ">
                <div className="w-18 h-18 mb-4 border-2 border-gray-300 rounded-full">
                  <img src={major.logo} alt={major.fullName} className="w-full h-full object-contain rounded-full"/>
                </div>
                <p className="text-base md:text-md font-semibold text-gray-800 h-10 flex flex-col justify-center items-center mb-4">
                  {major.fullName}
                  {major.apiName && (
                    <span className="text-sm font-normal text-gray-600">
                      ({major.apiName})
                    </span>
                  )}
                </p>
                <button
                  onClick={() => handleViewDetail(major.fullName)}
                  className="w-full py-2 bg-[#3B82F6] text-white font-medium rounded-lg transition-colors duration-300 shadow-md shadow-blue-300/50"
                >
                  Lihat Detail
                </button>
              </UniversalReveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MajorCardGrid;
