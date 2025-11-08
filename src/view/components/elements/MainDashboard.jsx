import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function MainDashboard() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div className="hidden sm:block flex-1 bg-gray-50 pt-5 pb-2 px-4 sm:px-6">
        <div className="flex items-center gap-3 px-5 sm:w-auto justify-between sm:justify-end">
          <div className="text-left sm:text-right">
            <h1 className="font-semibold text-gray-800 text-sm sm:text-base">
              {user.name || "Pengguna"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              {user.email || "email@domain.com"}
            </p>
          </div>
          <img
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
            src="images/team/valen.jpg"
            alt="User"
          />
        </div>
      </div>
  );
}
