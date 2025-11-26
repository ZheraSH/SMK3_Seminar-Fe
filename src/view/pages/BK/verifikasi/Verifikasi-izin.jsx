import React, { useState } from 'react';
import { Search, ChevronDown, Check, X, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const initialStudents = [
  { no: 1, name: 'Dedy Irwandi', class: 'XII pplg 3', date: '01 / 11 / 2025', status: 'Izin' },
  { no: 2, name: 'Dedy Irwandi', class: 'XII pplg 3', date: '01 / 11 / 2025', status: 'Sakit' },
  { no: 3, name: 'Dedy Irwandi', class: 'XII pplg 3', date: '01 / 11 / 2025', status: 'Izin' },
  { no: 4, name: 'Dedy Irwandi', class: 'XII pplg 3', date: '01 / 11 / 2025', status: 'Sakit' },
  { no: 5, name: 'Dedy Irwandi', class: 'XII pplg 3', date: '01 / 11 / 2025', status: 'Izin' },
  { no: 6, name: 'Dedy Irwandi', class: 'XII pplg 3', date: '01 / 11 / 2025', status: 'Sakit' },
  { no: 7, name: 'Dedy Irwandi', class: 'XII pplg 3', date: '01 / 11 / 2025', status: 'Izin' },
  { no: 8, name: 'Dedy Irwandi', class: 'XII pplg 3', date: '01 / 11 / 2025', status: 'Sakit' },
];

const StatusBadge = ({ status }) => {
  let colorClasses = '';
  if (status === 'Izin') {
    colorClasses = 'bg-blue-100 text-blue-700';
  } else if (status === 'Sakit') {
    colorClasses = 'bg-yellow-100 text-yellow-700';
  } else {
    colorClasses = 'bg-gray-100 text-gray-700';
  }

  return (
    <span className={`px-[32px] py-1 text-sm font-medium rounded-md ${colorClasses}`}>
      {status}
    </span>
  );
};

const ActionButton = ({ icon: Icon, color, onClick }) => {
  const isEyeIcon = Icon === Eye;
  const iconBackgroundClass = isEyeIcon ? '' : 'bg-white rounded-full';
  let iconColorClass;
  if (isEyeIcon) {
    iconColorClass = 'text-white';
  } else if (Icon === Check) {
    iconColorClass = 'text-green-600';
  } else if (Icon === X) {
    iconColorClass = 'text-red-500'; 
  } else {
    iconColorClass = 'text-blue-600';
  }


  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 p-2 rounded-lg text-white shadow-md transition-all duration-200 flex items-center justify-center ${color} hover:shadow-lg hover:brightness-105`}
      aria-label="Aksi"
    >
      <div className={`flex items-center justify-center p-[1px] ${iconBackgroundClass}`}>
        <Icon size={isEyeIcon ? 20 : 16} strokeWidth={isEyeIcon ? 2.5 : 4} className={iconColorClass} />
      </div>
    </button>
  );
}
const CustomDropdown = ({ placeholder, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  const currentLabel = selected || placeholder;

  return (
    <div className="relative z-20 w-[207px]">
            <button
                type="button"
                className="w-full h-10 px-4 border border-gray-300 rounded-lg bg-white text-left shadow-sm flex items-center justify-between transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className={`text-sm ${selected ? 'text-gray-900' : 'text-gray-500'}`}>
                    {currentLabel}
                </span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transform transition-transform ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-full rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-150"
                                role="menuitem"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
  );
};


export default function verifikasiIzin() {
  const [students, setStudents] = useState(initialStudents);

  const handleAction = (type, student) => {
    console.log(`Aksi ${type} untuk siswa ${student.name} (No. ${student.no})`);
  };

  const handleClassSelect = (className) => {
    console.log("Kelas dipilih:", className);
  }
  
  const HeaderAndControls = () => (
    <>
      <div className='w-full h-[81px] bg-white rounded-xl shadow-lg p-5 mb-6'>
            <div className="flex flex-row justify-between items-center">
                <div className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Daftar nama siswa</div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari Kelas/Nama..."
                            className="w-full sm:w-[244px] h-10 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm text-sm"
                        />
                    </div>
                    <CustomDropdown
                        placeholder="Kelas"
                        options={['XII pplg 1', 'XII pplg 2', 'XII pplg 3']}
                        onSelect={handleClassSelect}
                    />
                </div>
            </div>
        </div>
    </>
  );

  const StudentsTable = () => (
    <div className="overflow-x-auto rounded-lg drop-shadow-md border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200 text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            {['No', 'Nama', 'Kelas', 'Tanggal', 'Keterangan', 'Aksi'].map((header) => (
              <th
                key={header}
                scope="col"
                className={`px-4 py-3 text-sm font-medium uppercase tracking-wider ${header === 'Aksi' ? 'w-[150px] sm:w-auto' : ''}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.no} className="hover:bg-gray-50 transition duration-100">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 w-12">{student.no}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.name}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.class}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.date}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <StatusBadge status={student.status} />
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium w-[150px] sm:w-auto text-center">
                <div className="flex items-center justify-center flex space-x-2 text-center">
                  <ActionButton
                    icon={Check}
                    
                    color="bg-[#30D158E5] font-bold"
                    onClick={() => handleAction('Setuju', student)}
                  />
                  <ActionButton
                    icon={X}
                    color="bg-[#FF5E53]"
                    onClick={() => handleAction('Tolak', student)}
                  />
                  <ActionButton
                    icon={Eye}
                    color="bg-blue-500 hover:bg-blue-600"
                    onClick={() => handleAction('Lihat Detail', student)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const Pagination = () => (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-50" disabled>
        <ChevronLeft size={20} />
      </button>

      {[1, 2, 3].map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            page === 1
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      <span className="px-2 py-2 text-gray-500">...</span>

      <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
        15
      </button>

      <button className="p-2 text-gray-500 hover:text-blue-600">
        <ChevronRight size={20} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <HeaderAndControls />
        <StudentsTable />
        <Pagination />
      </div>
    </div>
  );
}