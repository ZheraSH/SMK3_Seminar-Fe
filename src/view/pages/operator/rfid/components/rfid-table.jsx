"use client";
import { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { RfidActionMenu } from "./rfid-action-menu";
import axios from "axios";

export function RfidTable({
  filtered,
  openMenu,
  onMenuClick,
  onEditClick,
  onDeleteClick,
}) {
  // efek ini cuma jalan SEKALI
  const [rfids, setRfids] = useState([]);

  useEffect(() => {
    const fetchRfid = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/rfids");
        console.log(res.data);
        setRfids(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRfid();
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full text-left text-[14px] border-collapse">
        <thead>
          <tr className="bg-[#3B82F6] text-white">
            <th className="px-4 py-3 text-center font-medium border-b border-blue-600 rounded-tl-lg">
              No
            </th>
            <th className="px-4 py-3 text-left font-medium border-b border-blue-600">
              Nama Pengguna
            </th>
            <th className="px-4 py-3 text-left font-medium border-b border-blue-600">
              Id Kartu
            </th>
            <th className="px-4 py-3 text-left font-medium border-b border-blue-600">
              Status
            </th>
            <th className="px-4 py-3 text-left font-medium border-b border-blue-600 rounded-tr-lg">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {rfids
            // hilangkan inactive
            .map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 text-[14px] hover:bg-gray-50 relative"
              >
                <td className="p-3 text-center border-r border-gray-200">
                  {index + 1}
                </td>
                <td className="p-3 border-r border-gray-200">
                  {item.student?.name || "-"}
                </td>
                <td className="p-3 border-r border-gray-200">{item.rfid}</td>
                <td className="p-3 border-r border-gray-200">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      item.status === "Aktif"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3 text-center relative">
                  <button
                    onClick={() =>
                      onMenuClick(openMenu === item.id ? -1 : item.id)
                    }
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenu === item.id && (
                    <div
                      onMouseLeave={() => onMenuClick(-1)}
                      className="absolute right-8 top-2 bg-white rounded-lg shadow-md border border-gray-200 w-32 z-10"
                    >
                      <RfidActionMenu
                        onEdit={() => {
                          onEditClick(item);
                          onMenuClick(-1);
                        }}
                        onDelete={() => onDeleteClick(item.id)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
