export default function Card ({presence}) {
    return (
        <div className=" flex mx-2 w-[1112px] bg-white gap-[24px] h-[133.33px] mb-5 ">
            {presence.map((p,index) => (
                <div key={index} className={`${p.style} w-[260px] h-[133.33px] rounded-xl flex flex-col justify-between items-center py-3 `}>
                    <p className=" text-[14px] font-semibold">{p.label}</p>
                    <span className={` ${p.styleIcon} text-white p-1 h-[39.33px] w-[39.33px] inline-flex justify-center items-center rounded-md`}>
                        {p.icon}
                    </span>
                    <p className="text-[16px] font-semibold"> {p.total} Kali</p>

                </div>
            ))}

        </div>
    );
}