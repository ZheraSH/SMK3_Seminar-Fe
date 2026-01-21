export function CardRecap ({data})  {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {data.map((item, index) => (
            <div key={index} className="bg-white flex flex-row p-4 h-[100px] rounded-xl shadow-sm border border-gray-100 items-center justify-between">
              <div className="flex items-center gap-4">
                <div style={{ backgroundColor: item.color }} className="h-[52px] w-[4px] rounded-full"></div>
                <div className="flex flex-col">
                  <p className="text-[22px] md:text-[24px] font-bold leading-tight">{item.value}</p>
                  <h2 className="text-[12px] text-gray-400 font-medium">{item.title}</h2>
                </div>
              </div>
              <div className="h-[48px] w-[48px] rounded-xl flex justify-center items-center" style={{ backgroundColor: item.color2 }}>
                <item.IconComponent color={item.color} size={22} strokeWidth={2.5} />
              </div>
            </div>
          ))}
        </div>
    )
}

export default CardRecap