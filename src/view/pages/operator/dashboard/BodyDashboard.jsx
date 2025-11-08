import { useEffect, useState } from "react";
import { data, aktivitas } from "../../../../Core/data/dashboardData";
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
    <div className="shadow-lg mx-4 sm:mx-8 rounded-[12px] border border-gray-200 p-4 sm:p-6 mb-10 bg-white min-h-screen relative">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center w-[90%] sm:w-[400px] relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              onClick={() => setShowPopup(false)}
            >
              <X size={22} />
            </button>
            <CheckCircle2
              size={70}
              className="text-green-500 mx-auto mb-4"
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

      {/* Statistik Atas */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-[34px] mt-1 pb-4">
        {[
          { icon: <UsersRound size={45} className="text-[#0475B0]" />, title: "Total Siswa", value: "1.000", color: "#3B82F6" },
          { icon: <ContactRound size={45} className="text-[#10B981]" />, title: "Total Guru", value: "300", color: "#10B981" },
          { icon: <UserRoundCog size={45} className="text-[#FF5E53]" />, title: "Total Kelas", value: "50", color: "#FF5E53" },
          { icon: <DoorClosed size={45} className="text-[#8B5CF6]" />, title: "Kelas Aktif", value: "50%", color: "#8B5CF6" },
          { icon: <CircleCheckBig size={45} className="text-[#FACC15]" />, title: "Kelas Selesai", value: "50%", color: "#FACC15" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center bg-opacity-20 rounded-2xl min-w-[150px] sm:min-w-[200px] w-[45%] sm:w-[200px] h-[130px] sm:h-[157px]"
            style={{ backgroundColor: `${item.color}33` }}
          >
            {item.icon}
            <h1 className="text-sm sm:text-base" style={{ color: item.color }}>
              {item.title}
            </h1>
            <h1 className="font-bold text-xl sm:text-[32px]" style={{ color: item.color }}>
              {item.value}
            </h1>
          </div>
        ))}
      </div>

      {/* Chart dan Tabel */}
      <div className="mt-10 flex flex-col lg:flex-row gap-6">
        {/* Chart */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-5 flex-1 min-w-[280px]">
          <h2 className="font-semibold mb-4 text-sm sm:text-base">
            Grafik Kehadiran Siswa (7 Hari Terakhir)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hari" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hadir" fill="#3B82F6" name="Siswa Masuk" barSize={25} />
              <Bar dataKey="izin" fill="#FF5E53" name="Siswa Telat" barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabel Aktivitas */}
        <div className="rounded-2xl bg-white border border-gray-200 shadow-lg p-5 flex-1 overflow-x-auto">
          <div className="overflow-hidden rounded-t-[6px] border border-gray-200">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-[#0475B0] text-white">
                  <th className="py-3 px-4 sm:px-6 rounded-tl-[6px]">Nama</th>
                  <th className="py-3 px-4 sm:px-6">Kelas</th>
                  <th className="py-3 px-4 sm:px-6">Jam</th>
                  <th className="py-3 px-4 sm:px-6 text-center rounded-tr-[6px]">Status</th>
                </tr>
              </thead>
              <tbody>
                {aktivitas.map((a, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 sm:px-6">{a.nama}</td>
                    <td className="py-3 px-4 sm:px-6">{a.kelas}</td>
                    <td className="py-3 px-4 sm:px-6">{a.jam}</td>
                    <td className="py-3 px-4 sm:px-6 text-center">
                      {a.status === "Masuk" ? (
                        <span className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-1 rounded text-xs sm:text-sm font-medium">
                          Masuk
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-600 px-3 sm:px-5 py-1 rounded text-xs sm:text-sm font-medium">
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
  );
};

export default BodyDashboard;
