import { Search } from "lucide-react";

export function SearchFilterStudent({ searchTerm, onSearchChange }) {
  return (
    <div className="flex items-center w-full max-w-full sm:max-w-[300px] md:max-w-[320px] border rounded-full px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition gap-2 border-[#CBD5E1]">
      <Search size={20} className="text-gray-600 flex-shrink-0" />
      <input
        type="text"
        placeholder="Cari nama / NIS / Kelas..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full outline-none text-sm bg-transparent placeholder:text-gray-600"
      />
    </div>
  );
}
