import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div
      className="
        flex items-center 
        w-full          
        max-w-full         
        sm:w-[260px]
        md:w-[300px]
        lg:w-[320px]
        border rounded-full 
        px-3 py-1.5 bg-white shadow-sm 
        focus-within:ring-2 focus-within:ring-blue-400 
        transition gap-2
      "
    >
      <Search size={18} className="text-black flex-shrink-0" />

      <input
        type="text"
        placeholder="Cari nama / NIP..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full outline-none text-sm bg-transparent placeholder:text-black"
      />
    </div>
  );
};
