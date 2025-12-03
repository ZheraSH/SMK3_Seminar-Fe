export default function Card ({presence}) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 mx-1 w-full items-center bg-white gap-2 md:gap-[18px] h-auto md:h-[133.33px] mb-5">
            {presence.map((p,index) => (
                <div 
                    key={index} 
                    className={`${p.style} w-full h-[100px] md:h-[133.33px] rounded-xl flex flex-col justify-between items-center py-3`}
                >
                    <p className="text-[10px] md:text-[14px] font-semibold">{p.label}</p>
                    <span className={`${p.styleIcon} text-white p-1 h-[29px] w-[29px] md:h-[39.33px] md:w-[39.33px] inline-flex justify-center items-center rounded-md`}>
                        {p.icon}
                    </span>
                    <p className="text-[12px] md:text-[16px] font-semibold">{p.total} Kali</p>
                </div>
            ))}
        </div>
    );
}
