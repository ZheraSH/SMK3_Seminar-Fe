import { useEffect, useState } from "react";
import { data, aktivitas } from "../../../../Core/Data/DashboardData";
import {
  UsersRound,
  ContactRound,
  UserRoundCog,
  DoorClosed,
  CircleCheckBig,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BodyDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const success = localStorage.getItem("loginSuccess");
    if (success) {
      setShowPopup(true);
      localStorage.removeItem("loginSuccess");
      setTimeout(() => setShowPopup(false), 2500);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 sm:px-6">
      <div className="w-full max-w-7xl shadow-lg rounded-[12px] border border-gray-200 p-4 sm:p-6 mb-10 bg-white relative">

        {/* POPUP */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center w-[90%] sm:w-[400px] relative animate-popUp border border-gray-100">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                onClick={() => setShowPopup(false)}
              >
                <X size={22} />
              </button>

              <CheckCircle2
                size={65}
                className="text-green-500 mx-auto mb-4 animate-bounceOnce"
              />

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                Login Berhasil!
              </h2>
              <p className="text-gray-600 text-sm">
                Selamat datang di SEMINAR Dashboard
              </p>
            </div>
          </div>
        )}

        {/* STATISTIK */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-4 pb-6">
          {[
            {
              color: "#0475B0",
              bg: "bg-[#3B82F6]/20",
              icon: <UsersRound size={40} className="text-[#0475B0]" />,
              title: "Total Siswa",
              value: "1.000",
            },
            {
              color: "#10B981",
              bg: "bg-[#10B981]/20",
              icon: <ContactRound size={40} className="text-[#10B981]" />,
              title: "Total Guru",
              value: "300",
            },
            {
              color: "#FF5E53",
              bg: "bg-[#FF5E53]/20",
              icon: <UserRoundCog size={40} className="text-[#FF5E53]" />,
              title: "Total Kelas",
              value: "50",
            },
            {
              color: "#8B5CF6",
              bg: "bg-[#8B5CF6]/20",
              icon: <DoorClosed size={40} className="text-[#8B5CF6]" />,
              title: "Kelas Aktif",
              value: "50%",
            },
            {
              color: "#FACC15",
              bg: "bg-[#FACC15]/20",
              icon: <CircleCheckBig size={40} className="text-[#FACC15]" />,
              title: "Kelas Selesai",
              value: "50%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center ${item.bg} 
                rounded-2xl p-4 h-[130px]`}
            >
              {item.icon}
              <h1 className="text-[14px] mt-1" style={{ color: item.color }}>
                {item.title}
              </h1>
              <h1
                className="font-bold text-[26px]"
                style={{ color: item.color }}
              >
                {item.value}
              </h1>
            </div>
          ))}
        </div>

        {/* GRAFIK & TABEL */}
        <div className="mt-6 flex flex-col lg:flex-row gap-6">

          {/* GRAFIK */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow p-5 flex-1">
            <h2 className="font-semibold mb-4 text-sm sm:text-base">
              Grafik Kehadiran Siswa (7 Hari Terakhir)
            </h2>

            <div className="w-full h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hari" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hadir" fill="#3B82F6" barSize={22} />
                  <Bar dataKey="izin" fill="#FF5E53" barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* TABEL */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow p-4 flex-1 overflow-x-auto">
            <div className="rounded-t-[7px] border border-gray-200 overflow-hidden min-w-[500px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#3B82F6] text-white text-sm">
                    <th className="py-3 px-4">Nama</th>
                    <th className="py-3 px-4">Kelas</th>
                    <th className="py-3 px-4">Jam</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {aktivitas.map((a, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 text-[13px]">{a.nama}</td>
                      <td className="py-3 px-4 text-[13px]">{a.kelas}</td>
                      <td className="py-3 px-4 text-[13px]">{a.jam}</td>
                      <td className="py-3 px-4 text-center">
                        {a.status === "Masuk" ? (
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium">
                            Masuk
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-medium">
                            Telat
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BodyDashboard;
