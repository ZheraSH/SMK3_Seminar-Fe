import React from 'react';
import { MoreVertical, PencilLine, Trash2, Plus } from 'lucide-react';
import { getBgColorBySubject } from '../../../../../Core/utils/SubjectHelper';

const ScheduleTable = ({  isLoading,  activeDay,  schedules,  toggleDropdown,  openDropdownId,  dropdownRef,  onEdit,  onDelete,  onAdd,
}) => {
    return (
        <div className="rounded-2xl shadow-lg">
            <div className="rounded-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                    <thead className="bg-[#3B82F6] text-white">
                        <tr className="text-xs">
                            <th className="px-4 py-3">No</th>
                            <th className="px-4 py-3">Penempatan</th>
                            <th className="px-4 py-3">Waktu</th>
                            <th className="px-4 py-3 min-w-[140px]">Mata pelajaran</th>
                            <th className="px-4 py-3">Guru</th>
                            <th className="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 text-center">

                        {!isLoading && schedules.length > 0 ? (
                            schedules.map((item, index) => (
                                <tr key={item.id || item.lesson_hour_id} className={`${index % 2 === 1 ? 'bg-[#EFF6FF]' : 'bg-white'}`}>
                                    <td className="px-4 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-[14px] text-gray-700">{item.lesson_hour?.name || '—'}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-[14px] font-medium">{item.lesson_hour?.time || '—'}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-[14px] text-gray-700 font-sm">
                                        {item.subject ? (
                                            <span className={`inline-block px-3 py-1 rounded-full text-white text-[12px] font-medium w-[142px] shadow-sm ${getBgColorBySubject(item.subject.name)}`}>
                                                {item.subject.name}
                                            </span>
                                        ) : <span className="text-gray-500">—</span>}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.teacher?.name || '—'}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-center relative">
                                        {item.id ? (
                                            <>
                                                <button onClick={() => toggleDropdown(item.id)} className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                                {openDropdownId === item.id && (
                                                    <div ref={dropdownRef} className="absolute top-0 right-0 transform -translate-x-1/2 w-40 bg-white border border-gray-200 rounded-md shadow-xl z-20">
                                                        <button onClick={() => onEdit(item)} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                            <PencilLine className="w-4 h-4 mr-3 text-[#FACC15]" /> Edit
                                                        </button>
                                                        <button onClick={() => onDelete(item)} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                            <Trash2 className="w-4 h-4 mr-3 text-[#FF5E53]" /> Hapus
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        ) : <span className="text-gray-400">—</span>}
                                    </td>
                                </tr>
                            ))
                        ) : !isLoading && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                    Tidak ada jadwal pelajaran untuk hari {activeDay} ini.
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan={6} className="text-center py-2">
                                <button onClick={onAdd} className="inline-flex items-center space-x-2 bg-[#22C55E] text-white py-2 px-4 rounded-lg font-medium text-[14px] transition duration-200 shadow-sm">
                                    <Plus size={16} /> <span>Tambah Jam Mata Pelajaran</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduleTable;