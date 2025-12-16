import React from 'react';

export const DetailModal = ({ isDetailOpen, selectedTeacher, setIsDetailOpen }) => {
  if (!isDetailOpen || !selectedTeacher) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[700px] px-10 py-8 relative">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Detail Guru
          </h2>
        </div>

        <div className="flex justify-center mb-6">
          {selectedTeacher.image ? (
            <img
              src={selectedTeacher.image || "/placeholder.svg"}
              alt="Foto guru"
              className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-sm mb-5"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 text-gray-700 text-[15px] gap-y-2 mb-4">
          <div className="space-y-7">
            <p>
              <span className="font-medium">Nama :</span>{" "}
              {selectedTeacher.name || "-"}
            </p>
            <p>
              <span className="font-medium">NIK :</span>{" "}
              {selectedTeacher.NIK || "-"}
            </p>
            <p>
              <span className="font-medium">Agama :</span>{" "}
              {selectedTeacher.religion || "-"}
            </p>
            <p>
              <span className="font-medium">Tanggal Lahir :</span>{" "}
              {selectedTeacher.birth_date || "-"}
            </p>
            <p>
              <span className="font-medium">No Telepon :</span>{" "}
              {selectedTeacher.phone_number || "-"}
            </p>
          </div>

          <div className="space-y-7">
            <p>
              <span className="font-medium">NIP :</span>{" "}
              {selectedTeacher.NIP || "-"}
            </p>
            <p>
              <span className="font-medium">Jenis Kelamin :</span>{" "}
              {selectedTeacher.gender_label || "-"}
                
            </p>
            <p>
              <span className="font-medium">Tempat Lahir :</span>{" "}
              {selectedTeacher.birth_place || "-"}
            </p>
            <p>
              <span className="font-medium">Role :</span>{" "}
              {Array.isArray(selectedTeacher.roles)
                ? selectedTeacher.roles
                    .map((r) => r.label || r.value || r.name || r)
                    .join(", ")
                : "-"}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 text-gray-700 text-[15px]">
          <p>
            <span className="font-medium">Alamat :</span>{" "}
            {selectedTeacher.address || "-"}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsDetailOpen(false)}
            className="px-6 py-2 bg-[#3B82F6] text-white rounded-[15px] hover:bg-blue-700 transition-all shadow-md"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
