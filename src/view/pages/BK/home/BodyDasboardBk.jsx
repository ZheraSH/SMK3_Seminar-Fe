import { Users,UserCheck,ClipboardList,Activity,UserX,AlertTriangle} from 'lucide-react';
import { useState , useEffect} from 'react';
import { useDashboardData } from '../../../../Core/hooks/bk-hooks/dashboard/dashboard';
import ProfileIMG from '../../../../Core/hooks/profile/Profil';
import LoadingData from '../../../components/Loading/Data';

const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    try {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    } catch (e) {
        return dateString;
    }
};

const AttendanceCard = ({ status, count, percentage, color, barColor, textColor, icon }) => {
    const IconComponent = () => {
        switch (icon) {
            case 'person': return <UserCheck className={`${textColor} w-6 h-6`} />;
            case 'clipboard': return <ClipboardList className={`${textColor} w-6 h-6`} />;
            case 'lightning': return <Activity className={`${textColor} w-6 h-6`} />;
            case 'close': return <UserX className={`${textColor} w-6 h-6`} />;
            default: return null;
        }
    };

    const widthValue = `${percentage}%`;
    const widthStyle = { width: widthValue };

    return (
        <div className={`flex flex-col p-4 h-[125px] w-full rounded-lg shadow-sm ${color}`}>
            <div className="flex items-center justify-between gap-2">
                <IconComponent className="w-[30px] h-[30px]" />
                <span className="text-[24px] font-semibold">{count}</span>
            </div>
            <p className="text-sm text-gray-700">{status}</p>
            <div className="mt-2 text-xs text-gray-600">
                <span className="text-gray-700">Persentase</span>
                <span className="float-right font-medium">{widthValue}</span> 
            </div>
            <div className="h-1 mt-1 rounded-full bg-gray-300">
                <div className={`h-full h-[8px] w-full rounded-full ${barColor}`} style={widthStyle}></div>
            </div>
        </div>
    );
};


export default function BodyDashboard() {
    const { data, loading, error} = useDashboardData();
    const [user, setUser] = useState({ name: "", email: ""});

    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    if (loading) {
        return <LoadingData loading={loading} />;
    }

    if (error) {
        return (
            <div className="p-10 min-h-screen text-center bg-red-100 border border-red-400 text-red-700 rounded-lg m-4">
                <h3 className="font-bold text-xl mb-4">⚠️ Gagal Memuat Data Dashboard</h3>
                <p className="mb-4">{error}</p>
            </div>
        );
    }

    const recap = data?.recap_today || {};
    const topStudents = data?.top_alpha_students || [];
    const totalSiswa = recap.total_students || 0;
    const tanggalKehadiran = formatDate(recap.date);

    const kehadiranData = [
        { status: "Hadir", count: recap.present?.count || 0, percentage: recap.present?.percentage || 0, color: "bg-[#10B98133]", barColor: "bg-[#10B981]", textColor: "text-[#10B981]", icon: 'person' },
        { status: "Izin", count: recap.izin?.count || 0, percentage: recap.izin?.percentage || 0, color: "bg-[#3B82F633]", barColor: "bg-[#3B82F6]", textColor: "text-[#3B82F6]", icon: 'clipboard' },
        { status: "Sakit", count: recap.sakit?.count || 0, percentage: recap.sakit?.percentage || 0, color: "bg-[#FACC1533]", barColor: "bg-[#FACC15]", textColor: "text-[#F59E0B]", icon: 'lightning' },
        { status: "Alpha", count: recap.alpha?.count || 0, percentage: recap.alpha?.percentage || 0, color: "bg-[#FF000033]", barColor: "bg-[#FF0000]", textColor: "text-[#EF4444]", icon: 'close' },
    ];


    return (
        <>
            <div className="p-4 min-h-screen mb-20 lg:mb-10">
                <div className="bg-[#3B82F6] mb-4 text-white h-[100px] rounded-lg flex items-center gap-5 pl-4">
                    <ProfileIMG />
                    <div className="flex flex-col mt-0">
                        <h1 className=" text-[20px] font-semibold"> Halo, {user.name || 'Guru BK'}</h1>
                        <p className="text-[14px] font-medium">Guru Bk</p>
                    </div>
                </div>

                <div className=" bg-white drop-shadow-sm mb-4 px-4 h-auto pb-4 rounded-lg">
                    <div className='flex justify-between'>
                        <div className="flex flex-col">
                            <h2 className="lg:text-[24px] md:text-[20px] text-[16px] font-semibold ml-[17px] mt-[17px]">Kehadiran hari ini</h2>
                            <span className=" text-[14px] ml-[17px]">{tanggalKehadiran}</span>
                        </div>
                        <div className="lg:mr-6 mt-[20px] mr-0">
                            <button className="bg-[#3B82F6] rounded-lg lg:w-[155px] w-[140px] text-white h-[31px] flex flex-row lg:text-[13px] text-[10px] gap-2 justify-center items-center">
                                <Users /> Total : {totalSiswa} Siswa
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {kehadiranData.map((item, index) => (
                            <AttendanceCard key={index} {...item} />
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 text-white h-auto">
                    <h2 className="lg:text-[24px] md:text-[18px] sm:text-[16px] font-semibold text-gray-800 mb-4">Siswa Dengan Alpha Terbanyak</h2>
                    <div className="bg-[#3B82F633] lg:h-12 md:h-auto sm:h-auto border border-[#93C5FD] text-[#3B82F6] p-3 rounded-lg flex items-start gap-2 mb-4">
                        <AlertTriangle />
                        <span className="lg:text-sm md:text-[14px] mt-[2px] text-wrap">
                            <strong className='text-black'>Catatan:</strong> Siswa dengan alpha 10+ memerlukan tindakan. Segera lakukan koordinasi dengan wali kelas dan orang tua.
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200  text-center">
                            <thead>
                                <tr className="bg-[#3B82F6] text-white">
                                    <th className="px-4 py-3  text-xs font-medium uppercase tracking-wider rounded-tl-lg">No</th>
                                    <th className="px-4 py-3  text-xs font-medium uppercase tracking-wider">Nama</th>
                                    <th className="px-4 py-3  text-xs font-medium uppercase tracking-wider">Kelas</th>
                                    <th className="px-4 py-3  text-xs font-medium uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3  text-xs font-medium uppercase tracking-wider rounded-tr-lg">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 ">
                                {topStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                                            Tidak ada data siswa Alpha yang ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    topStudents.map((siswa, index) => (
                                        <tr key={siswa.name + index} className={index % 2 === 0 ? 'bg-white h-[49px]' : 'bg-gray-50 h-[49px]'}>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{siswa.rank || index + 1}.</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{siswa.name}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{siswa.classroom}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#FEE2E2] text-[#EF4444]">
                                                    {siswa.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-[#EF4444] font-semibold">{siswa.total}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}