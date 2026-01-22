import { useState, useEffect } from "react"
import { TriangleAlert } from "lucide-react"
import { getBgColorStatus } from "../../../../Core/utils/SubjectHelper"
import { useDashboardData } from "../../../../Core/hooks/bk-hooks/dashboard/dashboard"
import { useNavigate } from "react-router-dom";


export default function BodyDashboard() {
  const [user, setUser] = useState({ name: "", email: "" })

  useEffect(() => {
    const storedUser = localStorage.getItem("userData")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  return (
    <div className="p-4 min-h-screen mb-20 lg:mb-10 bg-gray-50">
      <h1 className="font-semibold text-xl md:text-2xl mb-6 text-gray-700">Selamat datang, {user.name}</h1>
      <Main />
    </div>
  )
}

export const Main = () => {
  const { data, attendance, isLoading, attendancePending } = useDashboardData();
  const navigate = useNavigate();

  const statCardsData = [
    {
      label: "Total Siswa Hadir",
      count: attendance?.hadir || 0,
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      iconColor: "text-green-500",
      bgIcon: "bg-green-100",
      colorBar: "bg-green-500",
    },
    {
      label: "Total Siswa Telat",
      count: attendance?.telat || 0,
      iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      iconColor: "text-yellow-500",
      bgIcon: "bg-yellow-100",
      colorBar: "bg-yellow-500",
    },
    {
      label: "Total Siswa Izin",
      count: attendance?.izin || 0,
      iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      iconColor: "text-blue-500",
      bgIcon: "bg-blue-100",
      colorBar: "bg-blue-500",
    },
    {
      label: "Total Siswa Alpha",
      count: attendance?.alpha || 0,
      iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
      iconColor: "text-red-500",
      bgIcon: "bg-red-100",
      colorBar: "bg-red-500",
    },
  ];

  const alphaStudents = Array.isArray(data) ? data : [];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCardsData.map((card, index) => (
          <div key={index} className="flex rounded-xl p-3 bg-white shadow-sm border border-gray-100">
            <div className={`w-1 h-full mr-2 rounded-full ${card.colorBar}`} />
            <div className="flex gap-3 items-center justify-between w-full">
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-semibold text-black">
                  {card.count}
                </span>
                <p className="text-xs lg:text-sm font-medium text-gray-500 whitespace-nowrap">{card.label}</p>
              </div>
              <div className={`p-3 ${card.bgIcon} rounded-lg`}>
                <svg
                  className={`w-6 h-6 ${card.iconColor}`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d={card.iconPath}></path>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 mb-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Daftar Siswa Dengan Alpha Terbanyak</h2>
        
        <div className="mb-4 flex gap-2 bg-[#FEE2E2] p-2 text-[14px] border border-[#EF4444] rounded-lg px-4 ">
            <TriangleAlert color="#EF4444" className="shrink-0"/>
            <p className="mt-0.5"><span className="font-semibold">Catatan:</span> Siswa dengan nilai alpha 10+ memerlukan tindakan. Segera lakukan koordinasi dengan wali kelas dan orang tua.</p>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-[14px] font-medium rounded-tl-lg">No</th>
                <th scope="col" className="px-10 py-3 text-left text-[14px] font-medium">Nama</th>
                <th scope="col" className="px-10 py-3 text-center text-[14px] font-medium">Kelas</th>
                <th scope="col" className="px-10 py-3 text-center text-[14px] font-medium">Status</th>
                <th scope="col" className="px-10 py-3 text-center text-[14px] font-medium rounded-tr-lg">Total</th>
                {/* <th scope="col" className="px-6 py-3 text-center text-[14px] font-medium rounded-tr-lg">Aksi</th> */}
              </tr>
            </thead>
            <tbody className="bg-white ">
              {alphaStudents.map((siswa, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors border border-[#CBD5E1]">
                  <td className="px-6 py-3 whitespace-nowrap text-sm ">{index + 1}.</td>
                  <td className="px-10 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{siswa.name}</td>
                  <td className="px-10 py-3 whitespace-nowrap text-center">
                    <span className="inline-flex items-center justify-center w-20 text-white px-2 py-1 text-[12px] font-medium bg-[#00C4E6] rounded-2xl">
                      {siswa.classroom}
                    </span>
                  </td>

                  <td className="px-10 py-3 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center justify-center text-white px-4  rounded-2xl py-1 text-[12px] font-medium ${getBgColorStatus (siswa.status)} `}> {siswa.status} </span>
                  </td>
                  <td className="px-10 py-3 whitespace-nowrap text-sm font-semibold text-[#EF4444] text-center">
                    {siswa.total_alpha}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-center ">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium transition shadow-sm">
                      Lihat &rarr;
                    </button>
                  </td> */}
                </tr>
              ))}
              {alphaStudents.length === 0 && !isLoading && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">Data tidak ditemukan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Daftar Menunggu Approval Izin</h2>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-[14px] font-medium  rounded-tl-lg">No</th>
                <th scope="col" className="px-6 py-3 text-left text-[14px] font-medium ">Nama</th>
                <th scope="col" className="px-6 py-3 text-left text-[14px] font-medium ">Kelas</th>
                <th scope="col" className="px-6 py-3 text-left text-[14px] font-medium ">Tipe</th>
                <th scope="col" className="px-6 py-3 text-left text-[14px] font-medium ">Keterangan</th>
                <th scope="col" className="px-6 py-3 text-center text-[14px] font-medium  rounded-tr-lg">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 border border-[#CBD5E1]">
              {attendancePending.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">{index + 1}.</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.student?.name || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="inline-block bg-[#00C4E6] text-white px-3 py-1.5 mt-2 rounded-full text-[12px] font-medium shadow-sm max-w-full truncate">{item.classroom?.name}</span>
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`inline-flex items-center justify-center text-white px-4  rounded-2xl py-1 text-[12px] font-medium ${getBgColorStatus (item.type?.label)} `}>
                       {item.type?.label}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm  max-w-xs truncate">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button 
                    onClick={() => navigate("/dashboard/verifikasi-izin")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-xs font-medium transition shadow-sm">
                      Lihat Izin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}