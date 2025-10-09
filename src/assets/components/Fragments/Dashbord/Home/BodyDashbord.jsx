import { UsersRound, GraduationCap, School, CircleCheckBig } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { hari: "Senin", hadir: 40, izin: 60 },
  { hari: "Selasa", hadir: 55, izin: 50 },
  { hari: "Rabu", hadir: 90, izin: 40 },
  { hari: "Kamis", hadir: 75, izin: 20 },
  { hari: "Jum'at", hadir: 65, izin: 60 },
];

const aktivitas = [
  { nama: "Valen Abdul Rohman", kelas: "XII PPLG 3", jam: "07.30", status: "Terlambat" },
  { nama: "Valen Abdul Rohman", kelas: "XII PPLG 3", jam: "07.00", status: "Masuk" },
  { nama: "Valen Abdul Rohman", kelas: "XII PPLG 3", jam: "07.00", status: "Masuk" },
  { nama: "Valen Abdul Rohman", kelas: "XII PPLG 3", jam: "07.00", status: "Masuk" },
  { nama: "Valen Abdul Rohman", kelas: "XII PPLG 3", jam: "07.00", status: "Masuk" },
  { nama: "Valen Abdul Rohman", kelas: "XII PPLG 3", jam: "07.00", status: "Masuk" },
];

const BodyDashboard = () => {
  return (
    <div className="shadow-lg mx-10 rounded border border-gray-200 p-6 mb-10 bg-white h-screen">
      <div className="flex justify-start items-center gap-[34px] mt-1 pb-4">
        <div className="flex flex-col justify-center items-center w-[262px] h-[157px] bg-[#3B82F6]/20 rounded-2xl min-w-[262px]">
            <UsersRound size={50} className="text-[#0475B0]" />
            <h1 className="text-[#0475B0]">Total Siswa</h1>
            <h1 className="text-[#0475B0] font-bold text-[32px]">1.000</h1>
        </div>

        <div className="flex flex-col justify-center items-center w-[262px] h-[157px] bg-[#10B981]/20 rounded-2xl min-w-[262px]">
            <GraduationCap size={50} className="text-[#10B981]" />
            <h1 className="text-[#10B981]">Total Guru</h1>
            <h1 className="text-[#10B981] font-bold text-[32px]">300</h1>
        </div>

        <div className="flex flex-col justify-center items-center w-[262px] h-[157px] bg-[#8B5CF6]/20 rounded-2xl min-w-[262px]">
            <School size={50} className="text-[#8B5CF6]" />
            <h1 className="text-[#8B5CF6]">Total Kelas</h1>
            <h1 className="text-[#8B5CF6] font-bold text-[32px]">50</h1>
        </div>

        <div className="flex flex-col justify-center items-center w-[262px] h-[157px] bg-[#FACC15]/20 rounded-2xl min-w-[262px]">
            <CircleCheckBig size={50} className="text-[#FACC15]" />
            <h1 className="text-[#FACC15]">Kelas Aktif</h1>
            <h1 className="text-[#FACC15] font-bold text-[32px]">50%</h1>
        </div>
        </div>

        <div className="flex items-center text-gray-700 w-full">
    

        <div className="flex items-center text-gray-700 w-full">
            <h1 className="font-bold text-[20px] my-4 whitespace-nowrap">
                Grafik Kehadiran Siswa (7 Hari Terakhir)
            </h1>            
            <div className="mx-4 h-px bg-gray-300 w-40"></div>
            <h1 className="font-bold text-[20px] my-4 whitespace-nowrap">
                Aktivitas Tap Terbaru
            </h1>
            <div className="flex-1 h-px bg-gray-300 ml-4"></div>           
        </div>
    
</div>
      <div className="mt-10 flex flex-col lg:flex-row gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-5 flex-1">


          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hari" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="hadir"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Hadir"
              />
              <Line
                type="monotone"
                dataKey="izin"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Izin/Sakit/Alpha"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white border border-gray-200 shadow p-5 flex-1">
          <div className="rounded-t-2xl border border-gray-200 overflow-y-auto max-h-[340px]">
            <table className=" w-full text-left border">
              <thead className="sticky top-0 bg-[#0475B0]">
                <tr className="text-white border">
                  <th className="pl-7 py-2">Nama</th>
                  <th className="pl-2 py-2">Kelas</th>
                  <th className="pl-2 py-2">Jam</th>
                  <th className="pl-2 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {aktivitas.map((a, i) => (
                  <tr key={i} className="text-center border border-gray-200 hover:bg-gray-50 text-gray-700">
                    <td className="py-2">{a.nama}</td>
                    <td className="py-2">{a.kelas}</td>
                    <td className="py-2">{a.jam}</td>
                    <td className="py-2">
                      {a.status === "Masuk" ? (
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                          Masuk
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
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
