import { useState ,useCallback } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { getVerifyPermissionBk,getPermissionDetailBk,approvePermissionBk,rejectPermissionBk } from '../../../../Core/api/role-bk/verify-permission/VerifyPermission';
import { useVerifyPermissionData } from '../../../../Core/hooks/bk-hooks/useVeryPermission'; // Import Custom Hook Anda
import DetailIzinModal from "./components/ModalDetail";
import Table from './components/Table';
import HeaderAndControls from './components/Head';
import LoadingData from '../../../components/elements/loadingData/loading';

export default function VerifyPermission() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPermission, setSelectedPermission] = useState(null);
    const [isLoadingDetail , setIsLoadingDetail] = useState(false);
    const { permissions, loading, error, classes, currentPage, lastPage, totalItems, perPage, handlePageChange,refetchData ,searchQuery,handleSearchChange,selectedClassId,handleClassSelect,options} = useVerifyPermissionData(getVerifyPermissionBk);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPermission(null); 
    };

   const showDetailModal = useCallback(async (permission) => {
        setIsModalOpen(true);
        setSelectedPermission(permission); 
        setIsLoadingDetail(true);

        try {
            const detail = await getPermissionDetailBk(permission.id);
            setSelectedPermission(detail);
            console.log('berhasil ambil data detail ');
            
        } catch (error) {
            console.error("Error fetching detail:", error);
            setIsModalOpen(false);
        } finally {
            setIsLoadingDetail(false);
        }
    }, []);

    const handleAction = async (type, permission) => {
        const permissionId = permission.id; 
        if (permission.status?.value !== 'pending' && (type === 'approve' || type === 'reject')) {
            alert(`Izin ini sudah ${permission.status?.label?.toLowerCase()}. Tidak dapat diubah lagi.`);
            return; 
        }
    
        if (type === 'approve') { 
            try {
                await approvePermissionBk(permissionId);
                refetchData?.(); 
                console.log('Berhasil menyetujui data');
            } catch (error) {
                console.error('Gagal menyetujui data', error);
            }
        } else if (type === 'reject') { 
            try {
                await rejectPermissionBk(permissionId);
                refetchData?.();
                console.log('Berhasil menolak data');
            } catch (error) {
                console.error("Gagal menolak data", error);
            }
        } else if (type === 'view') { 
            showDetailModal(permission);
        }
    };

    const handleApprove = (permission) => handleAction('approve', permission);
    const handleReject = (permission) => handleAction('reject', permission);

    return (
        <div className="min-h-screen bg-gray-50  lg:mb-4 md:mb-4 mb-24">
            <div className="max-w-7xl mx-auto">
                <HeaderAndControls  classOptions={options.classes} loading={loading} selectedClassId={selectedClassId} handleClassSelect={handleClassSelect}searchQuery={searchQuery} onSearchChange={handleSearchChange}/>
                {loading?(<LoadingData loading={loading} type='tableSchedule' count={10} />)
                :(
                    <Table  data={permissions} loading={loading} error={error} currentPage={currentPage} lastPage={lastPage} totalItems={totalItems} perPage={perPage} onPageChange={handlePageChange} onAction={handleAction} />
                )}
            </div>
            {isModalOpen && selectedPermission && (
                <DetailIzinModal  isOpen={isModalOpen} onClose={closeModal} loading={isLoadingDetail} permissionData={selectedPermission} onApprove={handleApprove}  onReject={handleReject}/>
            )}
        </div>
    );
}