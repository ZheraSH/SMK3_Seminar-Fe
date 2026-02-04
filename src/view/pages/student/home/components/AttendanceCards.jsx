import { CircleCheckBig,FileMinus,Clock,CircleX } from "lucide-react";


export default function Card ({attendance}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 mx-1 w-full items-center bg-white gap-2 md:gap-[18px] h-auto md:h-[133.33px] mb-5">
                <div  
                    className={`bg-[#10B981]/20 w-full h-[100px] md:h-[133.33px] rounded-xl flex flex-col justify-between items-center py-3`}
                >
                    <p className="text-[10px] md:text-[14px] font-semibold">Total Kehadiran</p>
                    <span className={`bg-[#10B981] text-white p-1 h-[29px] w-[29px] md:h-[39.33px] md:w-[39.33px] inline-flex justify-center items-center rounded-md`}>
                       <CircleCheckBig  className="  h-[23.33px]  w-[23.33px]" /> 
                    </span>
                    <p className="text-[12px] md:text-[16px] font-semibold">{attendance.present} Kali</p>
                </div>
                <div 
                    className={`bg-[#FACC15]/20 w-full h-[100px] md:h-[133.33px] rounded-xl flex flex-col justify-between items-center py-3`}
                >
                    <p className="text-[10px] md:text-[14px] font-semibold">Izin/Sakit</p>
                    <span className={`bg-[#FACC15] text-white p-1 h-[29px] w-[29px] md:h-[39.33px] md:w-[39.33px] inline-flex justify-center items-center rounded-md`}>
                        <FileMinus  className="   h-[23.33px]  w-[23.33px]"/>
                    </span>
                    <p className="text-[12px] md:text-[16px] font-semibold">{attendance.sick} Kali</p>
                </div>
                <div 
                    className={`bg-[#8B5CF6]/20 w-full h-[100px] md:h-[133.33px] rounded-xl flex flex-col justify-between items-center py-3`}
                >
                    <p className="text-[10px] md:text-[14px] font-semibold">Terlambat</p>
                    <span className={`bg-[#8B5CF6]  text-white p-1 h-[29px] w-[29px] md:h-[39.33px] md:w-[39.33px] inline-flex justify-center items-center rounded-md`}>
                        <Clock  className="  h-[23.33px]  w-[23.33px]"/>
                    </span>
                    <p className="text-[12px] md:text-[16px] font-semibold">{attendance.late} Kali</p>
                </div>
                <div 
                    className={`bg-[#FF5E53]/20 w-full h-[100px] md:h-[133.33px] rounded-xl flex flex-col justify-between items-center py-3`}
                >
                    <p className="text-[10px] md:text-[14px] font-semibold">Alpha</p>
                    <span className={`bg-[#FF5E53] text-white p-1 h-[29px] w-[29px] md:h-[39.33px] md:w-[39.33px] inline-flex justify-center items-center rounded-md`}>
                        <CircleX className="  h-[23.33px]  w-[23.33px]" />
                    </span>
                    <p className="text-[12px] md:text-[16px] font-semibold">{attendance.alpha} Kali</p>
                </div>
               
        </div>
    );
}
