export default function StatisticsCrad ({attendanceStats}) {
    return (
        <div className="w-[1097px] h-[125px] flex gap-10 mt-6 ml-3">
            {attendanceStats.map((item) => (
                <div className={` w-[250px] h-[125px] flex flex-col justify-center items-center gap-2 shadow-md rounded-2xl  ${item.color}`} >
                    {item.icon}
                    <p className="text-[14px] font-normal">{item.label}</p>
                    <h2 className="text-[22px] font-semibold">{item.total}</h2>
                </div>
            ))}
        </div>
    );
}