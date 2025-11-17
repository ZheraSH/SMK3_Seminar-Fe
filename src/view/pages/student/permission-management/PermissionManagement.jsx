import React, { useState } from "react";
import { PermissionBanner } from "./components/PermissionBanner";
import { PermissionHeader } from "./components/PermissionHeader";
import { PermissionCardsSection } from "./components/PermissionCardsSection";
import { PermissionTableSection } from "./components/PermissionTableSection";
import { PermissionFormModal } from "./components/PermissionFormModal";
import { PermissionDetailModal } from "./components/PermissionDetailModal";


const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [formData, setFormData] = useState({
    type: "Sakit",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const cardsPerView = 3;

  const handleAddPermission = (e) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate || !formData.reason.trim()) {
      alert("Semua field harus diisi!");
      return;
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };

    const newPermission = {
      id: Date.now(),
      name:
        formData.type === "Sakit"
          ? "Izin Sakit"
          : formData.type === "Keluarga"
          ? "Keperuluan Keluarga"
          : "Bepergian",
      type: formData.type,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
      status: "Di Proses",
      studentName: "Valen Abdul Ibrahim",
      class: "XII PPLG 3",
      verifier: "Dedy Irwandi",
      date: formatDate(new Date().toISOString()),
      reason: formData.reason || "Tidak ada keterangan",
    };

    let updatedPermissions = [newPermission, ...permissions];
    if (updatedPermissions.length > cardsPerView) {
      updatedPermissions = updatedPermissions.slice(0, cardsPerView);
    }
    setPermissions(updatedPermissions);

    setFormData({ type: "Sakit", startDate: "", endDate: "", reason: "" });
    setShowForm(false);
  };

  const handleViewDetail = (permission) => {
    setSelectedPermission(permission);
    setShowDetail(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <PermissionBanner />

        <PermissionHeader onAddClick={() => setShowForm(true)} />

        <PermissionCardsSection
          permissions={permissions}
          onViewDetail={handleViewDetail}
        />

        <PermissionTableSection
          permissions={permissions}
          onViewDetail={handleViewDetail}
        />
      </div>

      <PermissionFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        formData={formData}
        onFormChange={setFormData}
        onSubmit={handleAddPermission}
      />

      <PermissionDetailModal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        permission={selectedPermission}
      />
    </div>
  );
};

export default PermissionManagement;
