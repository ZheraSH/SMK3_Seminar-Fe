import React from "react";
import { useMemo, useState, useRef, useEffect } from "react";

const PIE_CHART_DATA = [
  { label: "Hadir", value: 80, color: "#3b82f6", textColor: "#1d4ed8" },
  { label: "Izin", value: 20, color: "#10b981", textColor: "#047857" },
  { label: "Alpa", value: 10, color: "#ef4444", textColor: "#b91c1c" },
];

const TooltipBubble = ({ x, y, value }) => {
  return (
    <foreignObject x={x - 40} y={y - 50} width="80" height="40">
      <div style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)", borderRadius: "8px", padding: "4px 8px", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", border: "1px solid rgba(200,200,200,0.6)", fontSize: "12px", textAlign: "center", color: "#1d4ed8", fontWeight: "bold", }}>
        {value}%
      </div>
    </foreignObject>
  );
};

const getCurvePath = (points, svgHeight, padding, isArea = false) => {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;
  const tension = 0.2;

  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const prev = points[i > 1 ? i - 2 : i - 1];
    const next = points[i < points.length - 1 ? i + 1 : i];

    const c1x = p0.x + (p1.x - prev.x) * tension;
    const c1y = p0.y + (p1.y - prev.y) * tension;

    const c2x = p1.x - (next.x - p0.x) * tension;
    const c2y = p1.y - (next.y - p0.y) * tension;

    path += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p1.x} ${p1.y}`;
  }

  if (isArea) {
    const baselineY = svgHeight - padding;
    path += ` L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`;
  }

  return path;
};

const getCoordinatesForSegment = (center, radius, angle) => {
  const rad = (angle * Math.PI) / 180;
  return { x: center.x + radius * Math.cos(rad), y: center.y + radius * Math.sin(rad) };
};

const LeaderLine = ({ midAngle, color, radius, center }) => {
  const start = getCoordinatesForSegment(center, radius * 1.05, midAngle);
  const end = getCoordinatesForSegment(center, radius * 1.35, midAngle);

  const isRight = midAngle > 270 || midAngle < 90;
  const horizontal = isRight ? end.x + 30 : end.x - 30;

  return (
    <path
      d={`M ${start.x} ${start.y} L ${end.x} ${end.y} L ${horizontal} ${end.y}`}
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
  );
};

const describeArc = (x, y, radius, inner, startAngle, endAngle) => {
  const angle = endAngle - startAngle;
  if (angle <= 0) return "";

  const largeArc = angle <= 180 ? 0 : 1;

  const startOuter = getCoordinatesForSegment({ x, y }, radius, endAngle);
  const endOuter = getCoordinatesForSegment({ x, y }, radius, startAngle);

  const startInner = getCoordinatesForSegment({ x, y }, inner, endAngle);
  const endInner = getCoordinatesForSegment({ x, y }, inner, startAngle);

  return `
        M ${startInner.x} ${startInner.y}
        L ${startOuter.x} ${startOuter.y}
        A ${radius} ${radius} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}
        L ${endInner.x} ${endInner.y}
        A ${inner} ${inner} 0 ${largeArc} 1 ${startInner.x} ${startInner.y}
        Z
    `;
};

export const LineChartPlaceholder = ({ monthlyTrendData }) => {
  const [activeData, setActiveData] = useState(null);
  const [hoveredData, setHoveredData] = useState(null);
  const chartRef = useRef(null);

  const dataPoints = useMemo(() => {
    if (!monthlyTrendData || Object.keys(monthlyTrendData).length === 0) {
      return [];
    }

    return Object.entries(monthlyTrendData).map(([month, value]) => ({
      month: month,
      value: value ?? 0,
    }));
  }, [monthlyTrendData]);

  if (dataPoints.length === 0) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-[337px] flex items-center justify-center">
        <p className="text-gray-500">Data tren bulanan tidak tersedia.</p>
      </div>
    );
  }

  const svgWidth = 620;
  const svgHeight = 300;
  const padding = 40;
  const yAxisLabels = [0, 20, 40, 60, 80, 100];

  const xStep = (svgWidth - padding * 2) / (dataPoints.length - 1);
  const yMax = 100;

  const points = dataPoints.map((point, index) => ({
    x: padding + index * xStep,
    y: svgHeight - padding - (point.value / yMax) * (svgHeight - padding * 2),
    value: point.value,
  }));

  const pathData = getCurvePath(points, svgHeight, padding, false);
  const areaPath = getCurvePath(points, svgHeight, padding, true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chartRef.current && !chartRef.current.contains(event.target)) {
        setActiveData(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={chartRef} className="w-full bg-white p-2 rounded-lg shadow-sm border border-gray-100 h-[337px]">
      <h3 className="text-gray-800 text-lg font-semibold ml-2 mb-3">Tren Kehadiran Bulanan</h3>
      <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-72 ml-2 -mt-10">
        {dataPoints.map((pt, i) => {
          const x = padding + i * xStep;
          return (
            <text key={pt.month} x={x} y={svgHeight - 15} textAnchor="middle" fontSize="14" fill="#4b5563">
              {pt.month}
            </text>
          );
        })}

        {yAxisLabels.map((value) => {
          const y = svgHeight - padding - (value / 100) * (svgHeight - padding * 2);
          return (
            <React.Fragment key={value}>
              <line x1={padding} y1={y} x2={svgWidth - padding} y2={y} stroke="#e5e7eb" />
              <text x={padding - 15} y={y + 4} textAnchor="end" fontSize="14" fill="#4b5563">
                {value}
              </text>
            </React.Fragment>
          );
        })}

        <defs>
          <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#areaGradient)" />
        <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="2.5" />

        {points.map((pt, i) => (
          <React.Fragment key={i}>
            <circle cx={pt.x} cy={pt.y} r="10" fill="transparent" style={{ cursor: "pointer" }}
              onMouseEnter={() =>
                setHoveredData({ month: dataPoints[i].month, value: pt.value })
              }
              onMouseLeave={() => setHoveredData(null)}
              onClick={() =>
                setActiveData({ month: dataPoints[i].month, value: pt.value })
              }
            />

            <circle cx={pt.x} cy={pt.y} r="7" fill="white" stroke="#dbeafe" strokeWidth="1.5" />
            <circle cx={pt.x} cy={pt.y} r="4" fill="#3b82f6" />

            {hoveredData && hoveredData.month === dataPoints[i].month && (
              <TooltipBubble x={pt.x} y={pt.y} value={pt.value.toFixed(1)} />
            )}

            {activeData && activeData.month === dataPoints[i].month && (
              <TooltipBubble x={pt.x} y={pt.y} value={pt.value.toFixed(1)} />
            )}
          </React.Fragment>
        ))}
      </svg>

      <div className="flex justify-center items-center text-sm mt-2">
        <span> Kehadiran{" "}
          {activeData ? (
            <span className="ml-1">({activeData.value.toFixed(1)}%)</span>
          ) : (
            " (%)"
          )}{" "}
          {activeData && (
            <span className="ml-1 text-gray-500">{activeData.month}</span>
          )}
        </span>
      </div>
    </div>
  );
};


export const PieChartPlaceholder = ({ proportionData, totalStudents }) => {
  const rawData = useMemo(() => {
    const totalPresent = proportionData.hadir ?? 0;
    const totalLeave = proportionData.izin ?? 0;
    const totalAlpha = proportionData.alpha ?? 0;
    // const totalSick = proportionData.sakit ?? 0; // Not available in API currently

    const finalTotal = totalPresent + totalLeave + totalAlpha;

    const formattedData = [
      { label: "Hadir", value: totalPresent, color: " #22C55E", textColor: " #047857" },
      { label: "Izin", value: totalLeave, color: "#0EA5E9", textColor: "#1d4ed8" },
      // { label: "Sakit", value: totalSick, color: "#F59E0B", textColor: "#b45309" },
      { label: "Alpha", value: totalAlpha, color: "#EF4444", textColor: "#b91c1c" },
    ];

    return formattedData.map((d) => ({
      ...d,
      percentage: finalTotal > 0 ? (d.value / finalTotal) * 100 : 0,
    }));
  }, [proportionData, totalStudents]);

  const data = rawData;
  const hadirData = data.find((d) => d.label === "Hadir");
  const totalLog = data.reduce((sum, item) => sum + item.value, 0);

  if (totalLog === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-[347px] w-full flex items-center justify-center">
        <p className="text-gray-500">Tidak ada data absensi untuk periode ini.</p>
      </div>
    );
  }

  const GAP_DEGREES = 3;
  const INNER_RATIO = 0.5;

  let cumulative = 0;

  const segments = data
    .map((item) => {
      const angle = (item.percentage / 100) * 360;
      const start = cumulative + (angle > 0 ? GAP_DEGREES / 2 : 0);
      const end = cumulative + angle - (angle > 0 ? GAP_DEGREES / 2 : 0);
      const mid = cumulative + angle / 2;
      cumulative += angle;
      return { ...item, start, end, mid };
    })
    .filter((seg) => seg.percentage > 0);

  const SIZE = 400;
  const CENTER = SIZE / 2;
  const RADIUS = 100;
  const INNER = RADIUS * INNER_RATIO;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm lg:h-[347px] md:h-[400px] w-full">
      <h3 className="text-gray-800 text-lg font-semibold">Proporsi Kehadiran Global</h3>
      <div className="relative flex items-center justify-center">
        <svg width="100%" height="100%" viewBox={`0 0 ${SIZE} ${SIZE}`} className="max-w-[280px] md:max-w-md mr-10 lg:-mt-7 md:-mt-12">
          {segments.map((seg, i) => (
            <path key={i} d={describeArc(CENTER, CENTER, RADIUS, INNER, seg.start - 90, seg.end - 90)} fill={seg.color} className="transition-transform duration-300 hover:scale-[1.02]" />
          ))}

          {segments.map((seg) => {
            const mid = seg.mid - 90;
            const isRight = mid > 270 || mid < 90;

            const start = getCoordinatesForSegment(
              { x: CENTER, y: CENTER },
              RADIUS * 1.35,
              mid
            );
            const horizontal = isRight ? start.x + 0 : start.x - 8;

            return (
              <React.Fragment key={seg.label}>
                <LeaderLine midAngle={mid} color={seg.textColor} radius={RADIUS} center={{ x: CENTER, y: CENTER }} />
                <text x={horizontal} y={start.y - 5} textAnchor={isRight ? "start" : "end"} fill={seg.textColor} fontWeight="bold" fontSize="12">
                  {seg.label}
                </text>
                <text x={horizontal} y={start.y + 12} textAnchor={isRight ? "start" : "end"} fill={seg.textColor} fontSize="12">
                  {seg.percentage.toFixed(2)}%
                </text>
              </React.Fragment>
            );
          })}

          <text x={CENTER} y={CENTER + 10} textAnchor="middle" fontSize="18" fill={hadirData?.textColor || "#4b5563"} fontWeight="bold">
            {hadirData ? `${hadirData.percentage.toFixed(2)}%` : "0%"}
          </text>
        </svg>

        <div className="absolute lg:-right-2 md:right-4 right-0 lg:mt-0 md:mt-0 mt-36 lg:space-y-2 md:space-y-2">
          {rawData.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-gray-600 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
