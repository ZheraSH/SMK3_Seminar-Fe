import { ClipboardCheck,ClockAlert } from "lucide-react";
export default function BodyDashboard({ summary}) {
  

  const statCards = [
    {
      label: "Total Kehadiran",
      count: summary?.hadir ?? null,
      icon: (
        <div className="p-3 bg-green-100 rounded-lg">
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      ),
      colorBar: "bg-green-500",
    },
    
    {
      label: "Terlambat",
      count: summary?.telat ?? null,
      icon: (
        <div className="p-3 bg-yellow-100 rounded-lg">
          <ClockAlert className="w-6 h-6 text-yellow-500" />
        </div>
      ),
      colorBar: "bg-yellow-500",
    },
    {
      label: "Izin",
      count: summary?.izin ?? null,
      icon: (
        <div className="p-3 bg-[#DBEAFE] rounded-lg">
          <ClipboardCheck className="w-6 h-6 text-[#0EA5E9]" />
        </div>
      ),
      
      colorBar: "bg-[#0EA5E9]",
    },
    {
      label: "Alpha",
      count: summary?.alpha ?? null,
      icon: (
        <div className="p-3 bg-red-100 rounded-lg">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      ),
      colorBar: "bg-red-500",
    },
  ];


 
  return (
    <div className="px-4 bg-gray-50">
      <h1 className="font-semibold text-xl mb-4 text-gray-700">
        Selamat Datang,
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
        {statCards.map((card, index) => (
          <div key={index} className="flex bg-white shadow-md rounded-xl p-4">
            <div className={`w-1 h-14 mr-4 rounded-full ${card.colorBar}`} />
            <div className="flex flex-1 items-center justify-between">
              <div>
                <p className="text-2xl font-semibold">{card.count} kali</p>
                <p className="text-sm font-semibold text-[#000000]">{card.label}</p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
