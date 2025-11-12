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
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className=" max-w-[1440px] shadow-lg rounded-[12px] border border-gray-200 p-6 mb-10 bg-white relative">
        {/* Popup login sukses */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center w-[400px] relative animate-popUp border border-gray-100">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                onClick={() => setShowPopup(false)}
              >
                <X size={22} />
              </button>
              <CheckCircle2
                size={75}
                className="text-green-500 mx-auto mb-4 animate-bounceOnce"
              />
              <h2 className="text-3xl font-bold text-gray-800 mb-1">
                Login Berhasil!
              </h2>
              <p className="text-gray-600 text-sm">
                Selamat datang di SEMINAR Dashboard
              </p>
            </div>
          </div>
        )}

        {/* ====== STATISTIK ====== */}
        <div className="flex flex-wrap justify-between gap-6 mt-1 pb-6">
          {[
            {
              color: "#0475B0",
              bg: "bg-[#3B82F6]/20",
              icon: <UsersRound size={50} className="text-[#0475B0]" />,
              title: "Total Siswa",
              value: "1.000",
            },
            {
              color: "#10B981",
              bg: "bg-[#10B981]/20",
              icon: <ContactRound size={50} className="text-[#10B981]" />,
              title: "Total Guru",
              value: "300",
            },
            {
              color: "#FF5E53",
              bg: "bg-[#FF5E53]/20",
              icon: <UserRoundCog size={50} className="text-[#FF5E53]" />,
              title: "Total Kelas",
              value: "50",
            },
            {
              color: "#8B5CF6",
              bg: "bg-[#8B5CF6]/20",
              icon: <DoorClosed size={50} className="text-[#8B5CF6]" />,
              title: "Kelas Aktif",
              value: "50%",
            },
            {
              color: "#FACC15",
              bg: "bg-[#FACC15]/20",
              icon: <CircleCheckBig size={50} className="text-[#FACC15]" />,
              title: "Kelas Selesai",
              value: "50%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center ${item.bg} rounded-2xl min-w-[180px] flex-1 h-[157px]`}
            >
              {item.icon}
              <h1 className="text-[15px]" style={{ color: item.color }}>
                {item.title}
              </h1>
              <h1
                className="font-bold text-[32px]"
                style={{ color: item.color }}
              >
                {item.value}
              </h1>
            </div>
          ))}
        </div>

        {/* ====== GRAFIK & TABEL ====== */}
        <div className="mt-10 flex flex-col lg:flex-row gap-6">
          {/* GRAFIK */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow p-5 flex-1">
            <h2 className="font-semibold mb-4">
              Grafik Kehadiran Siswa (7 Hari Terakhir)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hari" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="hadir"
                  fill="#3B82F6"
                  name="Siswa Masuk"
                  barSize={25}
                />
                <Bar
                  dataKey="izin"
                  fill="#FF5E53"
                  name="Siswa Telat"
                  barSize={25}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* TABEL */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow p-5 flex-1 overflow-x-auto">
            <div className="rounded-t-[7px] border border-gray-200 overflow-hidden ">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#3B82F6] text-white">
                    <th className="py-3 px-6 text-sm font-medium">Nama</th>
                    <th className="py-3 px-6 text-sm font-medium">Kelas</th>
                    <th className="py-3 px-6 text-sm font-medium">Jam</th>
                    <th className="py-3 px-6 text-sm font-medium text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {aktivitas.map((a, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-6 text-gray-800 text-[13px]">{a.nama}</td>
                      <td className="py-3 px-6 text-gray-700 text-[13px]">{a.kelas}</td>
                      <td className="py-3 px-6 text-gray-700 text-[13px]">{a.jam}</td>
                      <td className="py-3 px-6 text-center"> 
                        {a.status === "Masuk" ? (
                          <span className="bg-blue-100 text-blue-700 px-3 py-0.5 rounded text-sm font-medium]">
                            Masuk
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-600 px-4 py-0.5 rounded text-sm font-medium]">
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
