import React, { useState, useCallback } from 'react';
import { getVerifyPermissionbk, getPermissionDetailbk, approvePermissionbk, rejectPermissionbk } from '../../../../core/api/role-bk/verify-permission/verify-permission';
import { useVerifyPermissionData } from '../../../../core/hooks/bk/use-verify-permission';

import DetailIzinModal from "./components/modal-detail";
import Table from './components/table';
import HeaderAndControls from './components/head';
import LoadingData from '@elements/loading-data/loading';
import ConfirmationModal from './components/confirm-modal';

export default function VerifyPermission() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPermission, setSelectedPermission] = useState(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmType, setConfirmType] = useState('approve');

    const {
        permissions, loading, error, currentPage, lastPage, totalItems,
        perPage, handlePageChange, refetchData, searchQuery,
        handleSearchChange, selectedClassId, handleClassSelect, options, selectedType,
        handleTypeSelect, selectedStatus, handleStatusSelect,
    } = useVerifyPermissionData(getVerifyPermissionbk);

    const handleAction = useCallback(async (type, permission) => {
        if (type === 'view') {
            setIsModalOpen(true);
            setSelectedPermission(permission);
            setIsLoadingDetail(true);
            try {
                const detail = await getPermissionDetailbk(permission.id);
                setSelectedPermission(detail);
            } catch (err) {
                console.error("Gagal mengambil detail:", err);
                setIsModalOpen(false);
            } finally {
                setIsLoadingDetail(false);
            }
        } else {
            setConfirmType(type);
            setSelectedPermission(permission);
            setIsModalOpen(false);
            setIsConfirmOpen(true);
        }
    }, []);

    const handleFinalAction = async () => {
        if (!selectedPermission) return;

        try {
            if (confirmType === 'approve') {
                await approvePermissionbk(selectedPermission.id);
            } else {
                await rejectPermissionbk(selectedPermission.id);
            }

            setIsConfirmOpen(false);
            setSelectedPermission(null);
            refetchData?.();
        } catch (err) {
            console.error("Gagal memproses verifikasi:", err);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPermission(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 lg:mb-4 md:mb-4 mb-24">
            <div className="max-w-7xl mx-auto">
                <HeaderAndControls
                    classOptions={options.classes}
                    loading={loading}
                    selectedClassId={selectedClassId}
                    handleClassSelect={handleClassSelect}
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    selectedType={selectedType}
                    onTypeSelect={handleTypeSelect}
                    selectedStatus={selectedStatus}
                    onStatusSelect={handleStatusSelect}
                />

                {loading ? (
                    <LoadingData loading={loading} type='tableSchedule' count={10} />
                ) : permissions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 mt-4 animate-in fade-in duration-700">
                        <img src="/images/null/nullimage.png" alt="Data Kosong" className="w-48 h-auto md:w-[400px] md:h-[285px] mb-6" />
                        <p className="text-gray-500 text-center text-sm md:text-md">
                            Sepertinya belum ada data yang masuk untuk kriteria ini.
                        </p>
                    </div>
                ) : (
                    <Table
                        data={permissions}
                        loading={loading}
                        error={error}
                        currentPage={currentPage}
                        lastPage={lastPage}
                        totalItems={totalItems}
                        perPage={perPage}
                        onPageChange={handlePageChange}
                        onAction={handleAction}
                    />
                )}
            </div>

            {isModalOpen && selectedPermission && (
                <DetailIzinModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    loading={isLoadingDetail}
                    permissionData={selectedPermission}
                    onConfirmAction={handleAction}
                />
            )}

            <ConfirmationModal
                isOpen={isConfirmOpen}
                type={confirmType}
                studentName={selectedPermission?.student?.name}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleFinalAction}
            />
        </div>
    );
}

