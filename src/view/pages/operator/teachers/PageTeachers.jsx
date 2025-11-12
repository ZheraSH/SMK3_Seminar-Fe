"use client";

import { Plus } from "lucide-react";
import TeacherFilter from "./components/lama/TeacherFilter";
import TeachersTable from "./components/lama/TeacherTable";
import TeacherCreateForm from "./components/lama/TeacherCreateForm";
import TeacherEditForm from "./components/lama/TeacherEditForm";
import TeacherDetail from "./components/lama/TeacherDetail";

import { useTeacher } from "../../../../Core/hooks/employee/useTeacher";
import { useTeacherFilter } from "../../../../Core/hooks/employee/useTeacherFilter";
import { useTeacherForm } from "../../../../Core/hooks/employee/useTeacherForm";

export default function TeachersMain() {
  // 🔹 Hook utama
  const {
    data,
    religions,
    roles,
    loading,
    selectedTeacher,
    setSelectedTeacher,
    openMenuId,
    setOpenMenuId,
    showCreateModal,
    setShowCreateModal,
    showEditModal,
    setShowEditModal,
    showDetailModal,
    setShowDetailModal,
    editingTeacherIdRef,
    refreshData,
  } = useTeacher();

  // 🔹 Hook Filter
  const {
    query,
    setQuery,
    category,
    setCategory,
    page,
    setPage,
    openCategory,
    setOpenCategory,
    openSubMenu,
    setOpenSubMenu,
    pageData,
    totalPages,
    goPage,
  } = useTeacherFilter(data);

  // 🔹 Hook Form
  const {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    handleUpdateSubmit,
    handleDelete,
    handleEditClick,
    resetForm,
  } = useTeacherForm(refreshData, editingTeacherIdRef);

  // ---------------------
  // 🔹 ACTION HANDLERS
  // ---------------------

  // ✏️ Edit Guru
  const onEditClick = (id) => {
    const teacherToEdit = data.find((t) => t.id === id);
    if (!teacherToEdit) return;
    handleEditClick(teacherToEdit);
    setOpenMenuId(null);
    setShowEditModal(true);
  };

  // 👁️ Detail Guru
  const onShowDetail = (id) => {
    const teacher = data.find((t) => t.id === id);
    if (teacher) {
      setSelectedTeacher(teacher);
      setOpenMenuId(null);
      setShowDetailModal(true);
    }
  };

  // ☰ Toggle menu
  const onToggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // ➕ Tambah Guru
  const onCreateSubmit = async () => {
    const success = await handleSubmit();
    if (success) {
      setShowCreateModal(false);
      resetForm();
      setPage(1);
    }
  };

  // 🔄 Update Guru
  const onUpdateSubmit = async () => {
    const success = await handleUpdateSubmit();
    if (success) {
      setShowEditModal(false);
      resetForm();
    }
  };

  // 🗑️ Hapus Guru
  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus guru ini?");
    if (!confirmDelete) return;
    await handleDelete(id);
    setPage(1);
  };

  // ---------------------
  // 🔹 UI Render
  // ---------------------
  return (
    <>
      <div className="relative min-h-screen my-10 bg-gray-50 px-6">
        {(showCreateModal || showEditModal || showDetailModal) && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
        )}

        <div className="max-w-7xl mx-auto relative">
          {/* Header + Filter */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <TeacherFilter
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
              openCategory={openCategory}
              setOpenCategory={setOpenCategory}
              openSubMenu={openSubMenu}
              setOpenSubMenu={setOpenSubMenu}
              setPage={setPage}
            />

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-[#3B82F6] text-white px-5 py-2.5 rounded-xl shadow-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Tambah Guru</span>
            </button>
          </div>

          {/* Tabel Guru */}
          {loading ? (
            <div className="text-center py-8 text-gray-600">Memuat data...</div>
          ) : (
            <>
              <TeachersTable
                pageData={pageData}
                openMenuId={openMenuId}
                handleToggleMenu={onToggleMenu}
                handleEditClick={onEditClick}
                handleDelete={onDelete}
                handleShowDetail={onShowDetail} // ini lama
                handleViewDetail={(teacher) => {
                  setSelectedTeacher(teacher);
                  setShowDetailModal(true);
                }} // 🔹 tambahkan ini
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => goPage(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => goPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal Tambah Guru */}
      <TeacherCreateForm
        showModal={showCreateModal}
        handleCloseModal={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={onCreateSubmit}
        roles={roles}
        religions={religions}
      />

      {/* Modal Edit Guru */}
      <TeacherEditForm
        showModal={showEditModal}
        handleCloseModal={() => {
          setShowEditModal(false);
          resetForm();
        }}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={onUpdateSubmit}
        religions={religions}
        roles={roles}
      />

      {/* Modal Detail Guru */}
      <TeacherDetail
        showModal={showDetailModal}
        handleCloseModal={() => setShowDetailModal(false)}
        teacher={selectedTeacher}
      />
    </>
  );
}
