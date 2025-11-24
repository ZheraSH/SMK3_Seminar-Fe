import { useState, useRef } from 'react';

export const useTeacherForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState("");
  const [category, setCategory] = useState("Pilih Kategori");
  const [errors, setErrors] = useState({});
  const categoryRef = useRef(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [post, setPost] = useState({
    name: "",
    email: "",
    image: null,
    NIK: "",
    birth_place: "",
    birth_date: "",
    NIP: "",
    phone_number: "",
    address: "",
    gender: "",
    religion_id: 1,
    roles: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentFilter, setCurrentFilter] = useState({
    type: null,
    value: null,
  });

  return {
    isOpen,
    setIsOpen,
    openItemId,
    setOpenItemId,
    searchTerm,
    setSearchTerm,
    openCategory,
    setOpenCategory,
    openSubMenu,
    setOpenSubMenu,
    category,
    setCategory,
    errors,
    setErrors,
    categoryRef,
    selectedTeacher,
    setSelectedTeacher,
    isDetailOpen,
    setIsDetailOpen,
    post,
    setPost,
    editingId,
    setEditingId,
    rowsPerPage,
    setRowsPerPage,
    currentFilter,
    setCurrentFilter,
  };
};
