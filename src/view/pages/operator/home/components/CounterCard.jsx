import { useCountUp } from "../../../../../Core/hooks/operator-hooks/dashboard/useCountUp"

export default function CounterCard({ item, value }) {
  const animatedNumber = useCountUp(Number(value ?? 0))

  return (
    <div className={`flex flex-col justify-center items-center ${item.bg} rounded-2xl p-4 h-[130px]`}>
      {item.icon}
      <h1 className="text-[14px] mt-1" style={{ color: item.color }}>
        {item.title}
      </h1>
      <h1 className="font-bold text-[26px]" style={{ color: item.color }}>
        {isNaN(animatedNumber) ? "…" : animatedNumber}
      </h1>
    </div>
  )
}
