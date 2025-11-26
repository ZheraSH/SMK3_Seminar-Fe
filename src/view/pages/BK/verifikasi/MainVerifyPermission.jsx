import { Search,ChevronLeft, ChevronRight } from 'lucide-react';
import { getVerifyPermissionBk } from '../../../../Core/api/role-bk/verify-permission/VerifyPermission';
import Table from './components/Table';
import HeaderAndControls from './components/Head';
import { Pagination } from './components/Pagination';


export default function VerifyPermission() {
  const handleAction = (type, student) => {
    console.log(`Aksi ${type} untuk siswa ${student.name} (No. ${student.no})`);
  };

  const handleClassSelect = (className) => {
    console.log("Kelas dipilih:", className);
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <HeaderAndControls handleClassSelect={handleClassSelect} />
        <Table getVerifyPermissionBk={getVerifyPermissionBk} />
        <Pagination />
      </div>
    </div>
  );
}
