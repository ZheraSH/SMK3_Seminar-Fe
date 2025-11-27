import { Users,UserCheck,ClipboardList,Activity,UserX,AlertTriangle} from 'lucide-react';
import { useState , useEffect} from 'react';
export default function BodyDashboard () {
     const [user, setUser] = useState({ name: "", email: "" });
    
        useEffect(() => {
            const storedUser = localStorage.getItem("userData");
            if (storedUser) setUser(JSON.parse(storedUser));
          }, []);

    //data dummiyy ya ini 
    const kehadiran = [
        { status: "Hadir", count: 285, percentage: "97%", color: "bg-[#10B98133]", barColor: "bg-[#10B981]", textColor: "text-[#10B981]", icon: 'person', hoverColor: 'hover:bg-[#E0F7EF]' },
        { status: "Izin", count: 12, percentage: "5%", color: "bg-[#3B82F633]", barColor: "bg-[#3B82F6]", textColor: "text-[#3B82F6]", icon: 'clipboard', hoverColor: 'hover:bg-[#E9F4FF]' },
        { status: "Sakit", count: 8, percentage: "3%", color: "bg-[#FACC1533]", barColor: "bg-[#FACC15]", textColor: "text-[#F59E0B]", icon: 'lightning', hoverColor: 'hover:bg-[#FFFBD6]' },
        { status: "Alpha", count: 5, percentage: "1%", color: "bg-[#FF000033]", barColor: "bg-[#FF0000]", textColor: "text-[#EF4444]", icon: 'close', hoverColor: 'hover:bg-[#FFEDED]' },
    ];

    //ini juga
    const siswaAlpha = [
        { no: 1, nama: "Valen Irwandy Mustabir", kelas: "XII PPLG 3", status: "Alpha", total: 20, isCritical: true },
        { no: 1, nama: "Valen Irwandy Mustabir", kelas: "XII PPLG 3", status: "Alpha", total: 18, isCritical: true },
        { no: 1, nama: "Valen Irwandy Mustabir", kelas: "XII PPLG 3", status: "Alpha", total: 15, isCritical: true },
        { no: 1, nama: "Valen Irwandy Mustabir", kelas: "XII PPLG 3", status: "Alpha", total: 13, isCritical: true },
        { no: 1, nama: "Valen Irwandy Mustabir", kelas: "XII PPLG 3", status: "Alpha", total: 12, isCritical: true },
    ];


    const AttendanceCard = ({ status, count, percentage, color, barColor, textColor, icon }) => {
        const IconComponent = () => {
            switch (icon) {
                case 'person': return <UserCheck className={`${textColor} w-6 h-6`}/>;
                case 'clipboard': return <ClipboardList className={`${textColor} w-6 h-6`}/> ;
                case 'lightning': return <Activity className={`${textColor} w-6 h-6`} />;
                case 'close': return <UserX className={`${textColor} w-6 h-6`} />;
                default: return null;
            }
        };

        const widthStyle = { width: percentage };
        
        return (
            <div className={`flex flex-col p-4 h-[125px] w-[250px] rounded-lg shadow-sm ${color}`}>
                <div className="flex items-center justify-between gap-2">
                    <IconComponent className="w-[30px] h-[30px]" />
                    <span className="text-[24px] font-semibold">{count}</span>
                </div>
                <p className="text-sm text-gray-700">{status}</p>
                <div className="mt-2 text-xs text-gray-600">
                    <span className="text-gray-700">Persentase</span>
                    <span className="float-right font-medium">{percentage}</span>
                </div>
                <div className="h-1 mt-1 rounded-full bg-gray-300">
                    <div className={`h-full h-[8px] rounded-full ${barColor}`} style={widthStyle}></div>
                </div>
            </div>
        );
    };


    return (
        <>
            <div className="p-2 min-h-screen ">
                <div className="bg-[#3B82F6] mb-4 w-[1129px] text-white h-[100px] rounded-lg flex items-center gap-5 pl-4">
                    <img src=" images/team/valen.jpg" alt="profil" className="rounded-full w-[68px] h-[68px]" />
                    <div className="flex flex-col mt-0">
                        <h1 className=" text-[20px] font-semibold"> Halo, {user.name}</h1>
                        <p className="text-[14px] font-medium">Guru Bk</p>
                    </div>
                </div>

                 <div className=" bg-white mb-4 w-[1129px]  h-[242px] rounded-lg">
                    <div className='flex justify-between'>
                        <div className="flex flex-col">
                        <h2 className="text-[24px] font-semibold ml-[17px] mt-[17px]">Kehadiran hari ini</h2>
                        <span className=" text-[14px] ml-[17px]">Senin, 10 November 2025</span>
                    </div>
                    <div className="mr-6 mt-[20px]">
                        <button className="bg-[#3B82F6] rounded-lg w-[155px] text-white h-[31px] flex flex-row text-[13px] gap-2 flex justify-center items-center ">
                            <Users/> Total : 310 Siswa
                        </button>
                    </div>
                    
                    </div>
                    <div className="flex gap-6 justify-center mt-6 items-center">
                            {kehadiran.map((item, index) => (
                                <AttendanceCard key={index} {...item} />
                            ))}
                        </div>
                 </div>
                 <div className="bg-white rounded-lg shadow-md p-4  w-[1129px] text-white h-[464px]">
                        <h2 className="text-[24px] font-semibold text-gray-800 mb-4">Siswa Dengan Alpha Terbanyak</h2>

                        <div className="bg-[#3B82F633] h-[49px] border border-[#93C5FD] text-[#3B82F6] p-3 rounded-lg flex items-start gap-2 mb-4">
                           < AlertTriangle/>
                            <span className="text-sm mt-[2px]">
                                <strong className='text-black'>Catatan: </strong> Siswa dengan alpha **10+** memerlukan tindakan. Segera lakukan koordinasi dengan wali kelas dan orang tua.
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-[#3B82F6] text-white">
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tl-lg">No</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Nama</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Kelas</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tr-lg">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {siswaAlpha.map((siswa, index) => (
                                        <tr key={index} className={ index % 2 === 0 ? 'bg-white h-[49px]' : 'bg-gray-50 h-[49px]'}>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{index + 1}.</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{siswa.nama}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{siswa.kelas}</td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#FEE2E2] text-[#EF4444]">
                                                    {siswa.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap text-sm text-[#EF4444] font-semibold">{siswa.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </>
    );
}