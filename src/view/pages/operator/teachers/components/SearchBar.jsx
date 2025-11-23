import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center w-[320px] border rounded-full px-3 py-1.5 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition gap-1">
      <Search size={20} className="text-gray-500" />
      <input
        type="text"
        placeholder="Cari nama / NIP..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full outline-none text-sm bg-transparent placeholder:text-gray-500"
      />
    </div>
  );
};
