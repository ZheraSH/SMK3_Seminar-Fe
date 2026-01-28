"use client";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { updateRfidStatus } from "../../../../../Core/api/role-operator/rfid/RfidApi";
import { notify } from "../../../../../Core/hooks/notification/notify";

export function RfidTable({
  filtered = [],
  openMenu,
  onMenuClick,
  onDeleteClick,
  onStatusUpdate,
}) {
  const [updatingId, setUpdatingId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      await updateRfidStatus(id, newStatus);
      notify("Data Berhasil Diperbarui");
      onStatusUpdate();
    } catch (err) {
      console.error(err);
      notify("Gagal memperbarui status", "error");
    } finally {
      setUpdatingId(null);
      onMenuClick(-1);
    }
  };

  /* =========================
     EMPTY STATE — NO TABLE
     ========================= */
  if (!filtered.length) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <img
          src="../../../../images/null/nullimage.png"
          alt="Data siswa kosong"
          className="w-100 mb-4"
        />
        <p className="text-sm font-medium text-center">
          Maaf yaaa.. datanya gaada, silahkan klik “Tambah RFID” <br /> buat
          tambah data RFID!
        </p>
      </div>
    );
  }

  /* =========================
     NORMAL TABLE
     ========================= */
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-[800px] w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
            <th className="px-6 py-4 text-left text-white">No</th>
            <th className="px-6 py-4 text-left text-white">Nama Pengguna</th>
            <th className="px-6 py-4 text-left text-white">ID Kartu</th>
            <th className="px-6 py-4 text-left text-white">Status</th>
            <th className="px-6 py-4 text-left text-white">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item, index) => (
            <TableRow
              key={item.id}
              item={item}
              index={index}
              openMenu={openMenu}
              onMenuClick={onMenuClick}
              onDeleteClick={onDeleteClick}
              onStatusChange={handleStatusChange}
              menuPos={menuPos}
              setMenuPos={setMenuPos}
              updatingId={updatingId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({
  item,
  index,
  openMenu,
  onMenuClick,
  onDeleteClick,
  onStatusChange,
  menuPos,
  setMenuPos,
  updatingId,
}) {
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const statusValue = item.status?.value;
  const statusLabel = item.status?.label;

  const calculateMenuPos = () => {
    if (!btnRef.current) return { top: 0, left: 0 };

    const rect = btnRef.current.getBoundingClientRect();
    const menuHeight = 120;

    let top = rect.bottom + window.scrollY;
    if (rect.bottom + menuHeight > window.innerHeight) {
      top = rect.top + window.scrollY - menuHeight;
    }

    return {
      top,
      left: rect.left + window.scrollX - 120,
    };
  };

  const handleMenuClick = () => {
    setMenuPos(calculateMenuPos());
    onMenuClick(openMenu === item.id ? -1 : item.id);
  };

  /* CLOSE WHEN CLICK OUTSIDE */
  useEffect(() => {
    if (openMenu !== item.id) return;

    const handleOutsideClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        onMenuClick(-1);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openMenu, item.id]);

  useEffect(() => {
    const recalc = () => {
      if (openMenu === item.id) {
        setMenuPos(calculateMenuPos());
      }
    };

    window.addEventListener("scroll", recalc, true);
    window.addEventListener("resize", recalc);
    return () => {
      window.removeEventListener("scroll", recalc, true);
      window.removeEventListener("resize", recalc);
    };
  }, [openMenu, item.id]);

  return (
    <tr className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
      <td className="px-6 py-2">{index + 1}</td>
      <td className="px-6 py-2">{item.student?.name || "-"}</td>
      <td className="px-6 py-2">{item.rfid}</td>

      <td className="px-6 py-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusValue === "active"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {statusLabel}
        </span>
      </td>

      <td className="px-6 py-2 relative">
        <button
          ref={btnRef}
          onClick={handleMenuClick}
          disabled={updatingId === item.id}
          className="p-2 rounded hover:bg-blue-100"
        >
          <MoreVertical size={18} />
        </button>

        {openMenu === item.id &&
          createPortal(
            <div
              ref={menuRef}
              className="fixed bg-white border border-gray-300 rounded-lg shadow-lg w-44 z-[9999]"
              style={{ top: menuPos.top, left: menuPos.left }}
            >
              {statusValue === "active" && (
                <button
                  onClick={() => onStatusChange(item.id, "inactive")}
                  className="w-full px-4 py-3 flex gap-2 text-red-600 hover:bg-red-50"
                >
                  <XCircle size={18} /> Nonaktifkan
                </button>
              )}

              {statusValue === "inactive" && (
                <button
                  onClick={() => onStatusChange(item.id, "active")}
                  className="w-full px-4 py-3 flex gap-2 text-green-600 hover:bg-green-50"
                >
                  <CheckCircle size={18} /> Aktifkan
                </button>
              )}

              <div className="border-t border-gray-300" />

              <button
                onClick={() => {
                  onDeleteClick(item.id);
                  onMenuClick(-1);
                }}
                className="w-full px-4 py-3 flex gap-2 text-red-600 hover:bg-red-50"
              >
                <Trash2 size={18} /> Hapus
              </button>
            </div>,
            document.body
          )}
      </td>
    </tr>
  );
}
