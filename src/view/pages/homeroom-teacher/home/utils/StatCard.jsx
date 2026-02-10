export default function StatCard({ title, subtitle, value, color, icon, progress = 0 }) {
    const colorMap = {
      green: {
        text: "text-green-500",
        bgLight: "bg-green-100",
        bgSolid: "bg-green-500",
        icon: "text-green-600",
      },
      yellow: {
        text: "text-yellow-500",
        bgLight: "bg-yellow-100",
        bgSolid: "bg-yellow-500",
        icon: "text-yellow-600",
      },
      blue: {
        text: "text-blue-500",
        bgLight: "bg-blue-100",
        bgSolid: "bg-blue-500",
        icon: "text-blue-600",
      },
      red: {
        text: "text-red-500",
        bgLight: "bg-red-100",
        bgSolid: "bg-red-500",
        icon: "text-red-600",
      },
    }
  
    const currentColor = colorMap[color] || colorMap.blue
  
    return (
      <div className="bg-white rounded-[14px] shadow p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">{subtitle}</p>
            <span className={`text-3xl font-semibold ${currentColor.text}`}>
              {value}
            </span>
          </div>
  
          <div className={`p-2 rounded-lg ${currentColor.bgLight} ${currentColor.icon}`}>
            {icon}
          </div>
        </div>
  
        <div className="flex items-center justify-between">
          <div className="flex-1 h-2 bg-gray-200 rounded">
            <div
              className={`h-full rounded ${currentColor.bgSolid}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    )
  }
  