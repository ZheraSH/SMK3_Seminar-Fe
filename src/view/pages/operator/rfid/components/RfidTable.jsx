"use client"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { MoreVertical } from "lucide-react"
import { RfidActionMenu } from "./RfidActionMenu"

export function RfidTable({
  filtered,
  openMenu,
  onMenuClick,
  onEditClick,
  onDeleteClick,
}) {
  const isEmpty = filtered.length === 0
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-[800px] w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-[#3B82F6] text-white">
            <th className="px-4 py-3 text-center font-semibold border-b border-blue-600 rounded-tl-lg">
              No
            </th>
            <th className="px-4 py-3 text-center font-semibold border-b border-blue-600">
              Nama Pengguna
            </th>
            <th className="px-4 py-3 text-center font-semibold border-b border-blue-600">
              Id Kartu
            </th>
            <th className="px-4 py-3 text-center font-semibold border-b border-blue-600">
              Status
            </th>
            <th className="px-4 py-3 text-center font-semibold border-b border-blue-600 rounded-tr-lg">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {isEmpty ? (
            <tr>
              <td
                colSpan={5}
                className="py-6 text-center text-gray-500 text-[15px]"
              >
                Tidak ada data RFID.
              </td>
            </tr>
          ) : (
            filtered.map((item, index) => (
              <TableRow
                key={item.id}
                item={item}
                index={index}
                openMenu={openMenu}
                onMenuClick={onMenuClick}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
                menuPos={menuPos}          
                setMenuPos={setMenuPos}    
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}



function TableRow({
  item,
  index,
  openMenu,
  onMenuClick,
  onEditClick,
  onDeleteClick,
  menuPos,
  setMenuPos,
}) {
  const btnRef = useRef(null)

  const handleMenuClick = () => {
    if (!btnRef.current) return

    const rect = btnRef.current.getBoundingClientRect()

    setMenuPos({
      top: rect.top + window.scrollY,
      left: rect.right + window.scrollX - 140,
    })

    onMenuClick(openMenu === item.id ? -1 : item.id)
  }

  return (
    <tr className="border-t text-center border-gray-200 hover:bg-gray-50 transition text-[14px]">
      <td className="p-2">{index + 1}</td>
      <td className="p-2">{item.student?.name || "-"}</td>
      <td className="p-2">{item.rfid}</td>
      <td className="p-2">
        <span
          className={`px-2 py-1 text-sm rounded-[5px] ${
            item.status === "active"
              ? "bg-green-100 text-green-600"
              : item.status === "inactive"
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.status}
        </span>
      </td>

      <td className="p-3">
        <button
          ref={btnRef}
          onClick={handleMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <MoreVertical size={18} />
        </button>

        {openMenu === item.id &&
          createPortal(
            <div
              onMouseLeave={() => onMenuClick(-1)}
              className="absolute bg-white rounded-lg shadow-md w-32 z-[9999]"
              style={{
                top: menuPos.top,
                left: menuPos.left,
              }}
            >
              <RfidActionMenu
                onEdit={() => {
                  onEditClick(item)
                  onMenuClick(-1)
                }}
                onDelete={() => onDeleteClick(item.id)}
              />
            </div>,
            document.body
          )}
      </td>
    </tr>
  )
}
