"use client";

import { useState, useEffect } from "react";
import { addSubject, updateSubject, deleteSubject } from "../../../../Core/api/role-operator/subjects/Subjects";
import { SubjectModal } from "./components/SubjectModal";
import { SearchBar } from "./components/SearchBar";
import { Pagination } from "./components/Pagination";
import { SubjectCard } from "./components/SubjectCard";
import useSubjects from "../../../../Core/hooks/operator-hooks/subjects/useSubjects";
import Header from "../../../components/elements/header/Header-new";
import LoadingData from "../../../components/elements/loadingData/loading";


export default function MainMaple() {
  const {
    subjects,
    currentPage,
    totalPages,
    totalItems,
    fetchSubjects,
    loading,
  } = useSubjects();

  const [search, setSearch] = useState("");
  const [globalTotal, setGlobalTotal] = useState(0); 
  
  const [newSubject, setNewSubject] = useState({ name: "" });
  const [editSubject, setEditSubject] = useState({ id: null, name: "" });
  const [openMenu, setOpenMenu] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    
    if (search === "") {
      setGlobalTotal(totalItems);
    }
  }, [totalItems, search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSubjects(1, search);
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await addSubject(newSubject);
      setOpenModal(null);
      setNewSubject({ name: "" });
     
      fetchSubjects(1, ""); 
    } catch (err) {
      const message = err.response?.data?.errors?.name?.[0];
      if (message) setErrors({ name: message });
    }
  };

  const handleUpdateSubject = async (e) => {
    e.preventDefault();
    try {
      if (editSubject.id) {
        await updateSubject(editSubject.id, editSubject.name);
        setOpenModal(null);
        setEditSubject({ id: null, name: "" });
        fetchSubjects(currentPage, search); 
      }
    } catch (err) {
      const message = err.response?.data?.errors?.name?.[0];
      if (message) setErrors({ name: message });
    }
  };

  const handleDeleteSubject = async (id) => {
    if (!confirm("Yakin ingin menghapus mapel ini?")) return;
    try {
      await deleteSubject(id);
      fetchSubjects(currentPage, search);
      setGlobalTotal(prev => prev > 0 ? prev - 1 : 0);
      
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const handlePageChange = (newPage) => {
    fetchSubjects(newPage, search); 
  };

  

  return (
    <div className="justify-center">
      <div className=" hidden md:block">
        {loading? 
          ( <LoadingData loading={loading} type="header1" />) 
          : (
              <Header 
              src="/images/new/imageMapel.png" 
              span="Daftar Mata Pelajaran" 
              p={"Total Mata Pelajaran : " + globalTotal} 
            />
          )

          }
      </div>
      
      <div>
        <SearchBar
          search={search}
          loading={loading}
          onSearchChange={setSearch} 
          onAddClick={() => {
            setErrors({});
            setNewSubject({ name: "" });
            setOpenModal("add");
          }}
        />

        <SubjectModal
          isOpen={openModal === "add"}
          mode="add"
          subject={newSubject}
          errors={errors}
          setErrors={setErrors}
          onClose={() => setOpenModal(null)}
          onChange={(field, value) => setNewSubject({ ...newSubject, [field]: value })}
          onSubmit={handleAddSubject}
        />

        <SubjectModal
          isOpen={openModal === "edit"}
          mode="edit"
          subject={editSubject}
          errors={errors}
          setErrors={setErrors}
          onClose={() => setOpenModal(null)}
          onChange={(field, value) => setEditSubject({ ...editSubject, [field]: value })}
          onSubmit={handleUpdateSubject}
        />

        {loading ? (
          <LoadingData loading={loading} type="cardMapel" count={8} />
        ) : subjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <img src="/images/null/nullimage.png" alt="Data Kosong" className="w-130 h-auto mb-4" />
                <h1 className="text-[#4B5563]">Maaf yaaa.. datanya gaada, silahkan klik “Tambah Mapel” </h1>
                <h1 className="text-[#4B5563]">buat nambah data Mapel baru!</h1>
              </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <SubjectCard
                key={subject.id || index}
                subject={subject}
                index={index}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                onEdit={(s) => {
                  setErrors({});
                  setEditSubject({ id: s.id, name: s.name });
                  setOpenModal("edit");
                }}
                onDelete={handleDeleteSubject}
              />
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => handlePageChange(currentPage - 1)}
            onNext={() => handlePageChange(currentPage + 1)}
            onPageClick={(p) => handlePageChange(p)}
          />
        )}
      </div>
    </div>
  );
}