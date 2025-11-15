import { useState } from "react";

export function useRfidManagement() {
  const [rfids, setRfids] = useState([
    {
      id: 1,
      nama: "Valen Adul Mustaqim",
      idKartu: "190309df",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Budiono Muslimah Sanss",
      idKartu: "190309df",
      status: "Nonaktif",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newData, setNewData] = useState({
    nama: "",
    idKartu: "",
    status: "Aktif",
  });
  const [openMenu, setOpenMenu] = useState(null);

  const handleAdd = () => {
    if (!newData.nama || !newData.idKartu) {
      return alert("Lengkapi semua data!");
    }
    const newItem = {
      id: rfids.length + 1,
      ...newData,
    };
    setRfids([...rfids, newItem]);
    setShowAdd(false);
    setNewData({ nama: "", idKartu: "", status: "Aktif" });
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      setRfids(rfids.filter((item) => item.id !== id));
      setOpenMenu(null);
    }
  };

  const handleEdit = () => {
    if (!selected) return;
    setRfids(
      rfids.map((item) => (item.id === selected.id ? { ...selected } : item))
    );
    setShowEdit(false);
  };

  const filtered = rfids.filter((d) =>
    d.nama.toLowerCase().includes(search.toLowerCase())
  );

  return {
    rfids,
    setRfids,
    search,
    setSearch,
    showAdd,
    setShowAdd,
    showEdit,
    setShowEdit,
    selected,
    setSelected,
    newData,
    setNewData,
    openMenu,
    setOpenMenu,
    filtered,
    handleAdd,
    handleDelete,
    handleEdit,
  };
}