import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function MainDashboard() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">

        <div className="relative">

          
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <h1 className="font-semibold text-gray-800">{user.name || "Pengguna"}</h1>
            <p className="text-sm text-gray-500">{user.email || "email@domain.com"}</p>
          </div>
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="Images/Team/valen.jpg"
            alt="User"
          />
        </div>
      </div>
    </div>
  );
}
