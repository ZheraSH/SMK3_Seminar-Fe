import { useState } from "react";
import { Search } from "lucide-react";


export default function MainDashboard() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari sesuatu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-[807px] rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>


        <div className="flex items-center gap-3">
            <div className="text-right">
                <h1 className="font-semibold text-gray-800">Valen Abdul Ibrahim</h1>
                <p className="text-sm text-gray-500">valenibrahim@gmail.com</p>
           </div>
            <img
                className="w-10 h-10 rounded-full object-cover"
                src="images/team/valen.jpg"
                alt="Valen"
            />
        
        </div>
      </div>
    </div>
  );
}
