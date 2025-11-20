"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RfidHeader } from "./components/rfid-header";
import { RfidSearchBar } from "./components/rfid-search-bar";
import { RfidTable } from "./components/rfid-table";
import { RfidAddModal } from "./components/rfid-add-modal";
import { RfidEditModal } from "./components/rfid-edit-modal";

export function RfidManagement() {
  const [rfids, setRfids] = useState([]);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(-1);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  // Fetch data
  const fetchRfid = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/rfids");
    setRfids(res.data.data);
  };

  useEffect(() => {
    fetchRfid();
  }, []);

  // Search filter (inti fitur search)
  const filtered = rfids.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.student?.name.toLowerCase().includes(q) ||
      item.rfid.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <RfidHeader />

      <RfidSearchBar
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => setShowAdd(true)}
      />

      <RfidTable
        filtered={filtered}
        openMenu={openMenu}
        onMenuClick={setOpenMenu}
        onEditClick={(item) => {
          setSelected(item);
          setShowEdit(true);
        }}
        onDeleteClick={(id) => console.log("delete", id)}
      />

      <RfidAddModal
        show={showAdd}
        onClose={() => setShowAdd(false)}
      />

      <RfidEditModal
        show={showEdit}
        selected={selected}
        onClose={() => setShowEdit(false)}
      />
    </div>
  );
}
