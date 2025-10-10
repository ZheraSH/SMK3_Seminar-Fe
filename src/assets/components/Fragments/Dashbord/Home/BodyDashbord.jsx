import { useEffect, useState } from "react";
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

const data = [
  { hari: "Senin", hadir: 100, izin: 10 },
  { hari: "Selasa", hadir: 80, izin: 70 },
  { hari: "Rabu", hadir: 100, izin: 60 },
  { hari: "Kamis", hadir: 30, izin: 35 },
  { hari: "Jum'at", hadir: 40, izin: 45 },
];

const aktivitas = [
  { nama: "Valen Abdul", kelas: "XII PPLG 3", jam: "07.30", status: "Terlambat" },
  { nama: "Budi Santoso", kelas: "XII PPLG 2", jam: "07.00", status: "Masuk" },
  { nama: "Rina Kartika", kelas: "XII PPLG 1", jam: "07.05", status: "Masuk" },
  { nama: "Dewi Lestari", kelas: "XII PPLG 4", jam: "07.15", status: "Masuk" },
  { nama: "Eka Saputra", kelas: "XII PPLG 3", jam: "07.00", status: "Masuk" },
  { nama: "Tono Hadi", kelas: "XII PPLG 1", jam: "07.10", status: "Masuk" },
];

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
    <div className="shadow-lg mx-10 rounded border border-gray-200 p-6 mb-10 bg-white h-screen relative">
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
              Login Berhasil 🎉
            </h2>
            <p className="text-gray-600 text-sm">
              Selamat datang di SEMINAR Dashboard
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-start items-center gap-[34px] mt-1 pb-4">
        <div className="flex flex-col justify-center items-center h-[157px] bg-[#3B82F6]/20 rounded-2xl min-w-[203px]">
          <UsersRound size={50} className="text-[#0475B0]" />
          <h1 className="text-[#0475B0]">Total Siswa</h1>
          <h1 className="text-[#0475B0] font-bold text-[32px]">1.000</h1>
        </div>

        <div className="flex flex-col justify-center items-center w-[262px] h-[157px] bg-[#10B981]/20 rounded-2xl min-w-[203px]">
          <ContactRound size={50} className="text-[#10B981]" />
          <h1 className="text-[#10B981]">Total Guru</h1>
          <h1 className="text-[#10B981] font-bold text-[32px]">300</h1>
        </div>

        <div className="flex flex-col justify-center items-center w-[262px] h-[157px] bg-[#FF5E53]/20 rounded-2xl min-w-[203px]">
          <UserRoundCog size={50} className="text-[#FF5E53]" />
          <h1 className="text-[#FF5E53]">Total Kelas</h1>
          <h1 className="text-[#FF5E53] font-bold text-[32px]">50</h1>
        </div>

        <div className="flex flex-col justify-center items-center w-[262px] h-[157px] bg-[#8B5CF6]/20 rounded-2xl min-w-[203px]">
          <DoorClosed size={50} className="text-[#8B5CF6]" />
          <h1 className="text-[#8B5CF6]">Kelas Aktif</h1>
          <h1 className="text-[#8B5CF6] font-bold text-[32px]">50%</h1>
        </div>

        <div className="flex flex-col justify-center items-center w-[262px] h-[157px] bg-[#FACC15]/20 rounded-2xl min-w-[203px]">
          <CircleCheckBig size={50} className="text-[#FACC15]" />
          <h1 className="text-[#FACC15]">Kelas Selesai</h1>
          <h1 className="text-[#FACC15] font-bold text-[32px]">50%</h1>
        </div>
      </div>

      <div className="mt-10 flex flex-col lg:flex-row gap-6">
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
            <Bar dataKey="hadir" fill="#3B82F6" name="Siswa Masuk" barSize={25} radius={[0, 0, 0, 0]} />
            <Bar dataKey="izin" fill="#FF5E53" name="Siswa Telat" barSize={25} radius={[0, 0, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        </div>

        <div className="rounded-2xl bg-white border border-gray-200 shadow p-5 flex-1">
        <div className="rounded-t-2xl border border-gray-200 overflow-hidden">
  <table className="w-full text-left border-collapse rounded-2xl overflow-hidden shadow-sm">
    <thead>
      <tr className="bg-[#0475B0] text-white">
        <th className="py-3 px-6 text-sm font-semibold">Nama</th>
        <th className="py-3 px-6 text-sm font-semibold">Kelas</th>
        <th className="py-3 px-6 text-sm font-semibold">Jam</th>
        <th className="py-3 px-6 text-sm font-semibold text-center">Status</th>
      </tr>
    </thead>

    <tbody>
      {aktivitas.map((a, i) => (
        <tr
          key={i}
          className="border-b border-gray-200 hover:bg-gray-50 transition"
        >
          <td className="py-3 px-6 text-gray-800">{a.nama}</td>
          <td className="py-3 px-6 text-gray-700">{a.kelas}</td>
          <td className="py-3 px-6 text-gray-700">{a.jam}</td>
          <td className="py-3 px-6 text-center">
            {a.status === "Masuk" ? (
              <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                Masuk
              </span>
            ) : (
              <span className="bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium">
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
