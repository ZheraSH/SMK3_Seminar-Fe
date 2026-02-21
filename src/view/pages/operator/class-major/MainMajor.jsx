import Header from "./Header";
import { useNavigate } from "react-router-dom";
import useMajors from "../../../../Core/hooks/operator-hooks/class-major/useMajor";
import Headernew from "../../../components/elements/header/Header-new";
import LoadingData from "../../../components/elements/loadingData/loading";

const majorMappings = [
  {
    apiName: "Desain Komunikasi Visual",
    fullName: "dkv",
    logo: "/images/major/Dkvbaru.png",
  },
  {
    apiName: "Kecantikan & Spa",
    fullName: "KCS",
    logo: "/images/major/KcsBaru.png",
  },
  {
    apiName: "Desain & Produksi Busana",
    fullName: "DPB",
    logo: "/images/major/BusanaBaru.png",
  },
  {
    apiName: "Perhotelan",
    fullName: "PH",
    logo: "/images/major/PhBaru.png",
  },
  {
    apiName: "Kuliner",
    fullName: "Kuliner",
    logo: "/images/major/KulinerBaru.png",
  },
  {
    apiName: "Pengembangan Perangkat Lunak & Game",
    fullName: "PPLG",
    logo: "/images/major/PPLGBaru.png",
  },
];

const MajorCardGrid = () => {
  const { majors, loading } = useMajors();
  const navigate = useNavigate();

  const handleViewDetail = (majorCode) => {
    const encodedName = encodeURIComponent(majorCode);
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
      <div className=" bg-gray-50 mb-20 lg:mb-10 md:mb-32">
        <div className=" hidden md:block">
          {loading ? (<LoadingData loading={loading} type="header1" />)
            : (
              <Headernew span="Daftar Jurusan" p="Total Jurusan = 6" src="/images/particle/particle3.png" />
            )}
        </div>
        {loading ? (
          <LoadingData type="cardmajor" loading={loading} count={9} />
        ) : renderedMajors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in duration-500">
            <img src="/images/null/nullimage.png" alt="Data Kosong" className="w-48 h-auto md:w-[400px] md:h-[285px] mb-6" />
            <p className="text-gray-500 text-center text-sm md:text-md"> Maaf yaaa.. datanya gaada, silahkan hubungi Admin <br /> untuk menambah data Jurusan!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {renderedMajors.map((major,index) => (
              <div key={major.id} delay={index * 0.1}  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center border border-gray-100 ">
                <div className="w-[66px] h-[66px] mb-4 flex items-center justify-center rounded-[12px] mt-[20px] bg-gray-200"> <img src={major.logo} alt={major.fullName} className="w-[56px] h-[56px]"/></div>
                  <h3 className="text-[12px] font-semibold text-gray-800 mb-6 flex items-center justify-center w-[270px]"> {major.fullName} </h3>
                  <button  onClick={() => handleViewDetail(major.apiName)} className={`w-[270px] h-[36px]   text-[14px] font-medium text-white rounded-lg  bg-[#3B82F6] hover:bg-[#2563EB]`}>Lihat Kelas</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default MajorCardGrid;
