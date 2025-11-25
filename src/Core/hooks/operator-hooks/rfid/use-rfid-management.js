import { useState } from "react";

export function useRfidManagement() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newData, setNewData] = useState({
    nama: "",
    idKartu: "",
    status: "Aktif",
  });
  const [openMenu, setOpenMenu] = useState(null);

  return {
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
  };
}
