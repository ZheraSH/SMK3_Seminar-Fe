import React from 'react';
import { ChevronDown, ClipboardList,Calendar, TrendingUp, Folder,AlertTriangle, Activity,ChevronRight} from 'lucide-react'; 
import Header from "../../../components/elements/header/Header.Page";
const PIE_CHART_DATA = [
    { label: 'Hadir', value: 80.53, color: '#10B981', textColor: '#10b981' }, 
    { label: 'Izin', value: 4.82, color: '#3b82f6', textColor: '#3b82f6' },  // Nilai 4.82%
    { label: 'Sakit', value: 11.14, color: '#FACC15', textColor: '#f59e0b' }, // Nilai 11.14%
    { label: 'Alpha', value: 3.51, color: '#FF5E53', textColor: '#ef4444' }  // Nilai sisa (total = 100)
];

const StatsCard = () => {
    return (
        <>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-[250px] h-[125px] flex flex-col justify-between font-[Poppins]">
            <div className="flex items-start justify-between">
               <div className='flex flex-col mx-auto text-center flex justify-center items-center text-[#10B981]'>
                    <TrendingUp className='mb-1'/>
                    <span>Rata - rata Kehadiran</span>
                    <span className='text-[22px] font-semibold mt-1'>90%</span> {/* STATIS */}
               </div>
            </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-[250px] h-[125px] flex flex-col justify-between">
            <div className="flex items-start justify-between">
               <div className='flex flex-col mx-auto text-center flex justify-center items-center text-[#FACC15]'>
                    <ClipboardList className='mb-1'/>
                    <span>Total Izin</span>
                    <span className='text-[22px] font-semibold mt-1'>308</span> {/* STATIS */}
               </div>
            </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-[250px] h-[125px] flex flex-col justify-between">
            <div className="flex items-start justify-between">
               <div className='flex flex-col mx-auto text-center flex justify-center items-center text-[#3B82F6]'>
                    <Activity className='mb-1'/>
                    <span>Total Sakit</span>
                    <span className='text-[22px] font-semibold mt-1'>308</span> {/* STATIS */}
               </div>
            </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-[250px] h-[125px] flex flex-col justify-between">
            <div className="flex items-start justify-between">
               <div className='flex flex-col mx-auto text-center flex justify-center items-center text-[#FF5E53]'>
                    <AlertTriangle className='mb-1'/>
                    <span>Total Alpha</span>
                    <span className='text-[22px] font-semibold mt-1'>308</span> {/* STATIS */}
               </div>
            </div>
        </div>
        </>
    );
};

const getCurvePath = (points, svgHeight, padding, isArea = false) => {
    if (points.length < 2) return '';

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

const LineChartPlaceholder = () => {
    const dataPoints = [
        { month: 'Jan', value: 95 }, { month: 'Feb', value: 80 }, { month: 'Mar', value: 78 },
        { month: 'Apr', value: 40 }, { month: 'Mei', value: 82 }, { month: 'Jun', value: 68 },
        { month: 'Jul', value: 80 }, { month: 'Aug', value: 95 }, { month: 'Sep', value: 12 },
        { month: 'Okt', value: 85 }, { month: 'Nov', value: 27 }, { month: 'Des', value: 23 }
    ];

    const svgWidth = 620;
    const svgHeight = 250;
    const padding = 40;
    const yAxisLabels = [0, 20, 40, 60, 80, 100];
    
    const xStep = (svgWidth - padding * 2) / (dataPoints.length - 1);
    const yMax = 100;
    
    const points = dataPoints.map((point, index) => ({
        x: padding + index * xStep,
        y: svgHeight - padding - (point.value / yMax) * (svgHeight - padding * 2),
        value: point.value
    }));

    const pathData = getCurvePath(points, svgHeight, padding, false);
    const areaPath = getCurvePath(points, svgHeight, padding, true);

    return (
        <div className="w-full bg-white p-2 rounded-lg shadow-sm border border-gray-100 h-[337px] w-[620px]">
            <h3 className="text-gray-800 text-lg font-semibold ml-2 mb-3">Tren Kehadiran Bulanan</h3>
            <div className="-top-8 relative">
                <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-72 ml-2">
                    {dataPoints.map((_, index) => {
                        const x = padding + index * xStep;
                        if (index === dataPoints.length - 1) return null;
                        return (
                            <line 
                                key={`v-${index}`} x1={x} y1={padding} x2={x} y2={svgHeight - padding} 
                                stroke="#eff6ff" strokeWidth="1"
                            />
                        );
                    })}
                    
                    {yAxisLabels.map(value => {
                        const y = svgHeight - padding - (value / 100) * (svgHeight - padding * 2);
                        return (
                            <React.Fragment key={`h-${value}`}>
                                <line x1={padding} y1={y} x2={svgWidth - padding} y2={y} stroke="#e5e7eb" strokeWidth="1"/>
                                <text x={padding - 15} y={y + 4} textAnchor="end" fontSize="14" fill="#4b5563" fontWeight="500">
                                    {value}
                                </text>
                            </React.Fragment>
                        );
                    })}
                    
                    <defs>
                        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/> 
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/> 
                        </linearGradient>
                    </defs>
                    
                    <path d={areaPath} fill="url(#areaGradient)"/>
                    <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="2.5"/>
                    
                    {points.map((point, index) => (
                        <React.Fragment key={index}>
                            <circle cx={point.x} cy={point.y} r="5" fill="white" stroke="#dbeafe" strokeWidth="1.5"/>
                            <circle cx={point.x} cy={point.y} r="3" fill="#3b82f6"/>
                        </React.Fragment>
                    ))}
                    
                    {dataPoints.map((point, index) => {
                        const x = padding + index * xStep;
                        return (
                            <text key={point.month} x={x} y={svgHeight - 15} textAnchor="middle" fontSize="14" fill="#4b5563" fontWeight="500">
                                {point.month}
                            </text>
                        );
                    })}
                </svg>
                
                <div className=" flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-gray-600 font-medium">Kehadiran (%)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getCoordinatesForSegment = (center, radius, angle) => {
    const radian = (angle * Math.PI) / 180;
    return {
        x: center.x + radius * Math.cos(radian),
        y: center.y + radius * Math.sin(radian),
    };
};

const LeaderLine = ({ midAngle, color, radius, center }) => {
    const labelRadius = radius * 1.05; 
    const labelTextDistance = radius * 1.35; 
    
    const start = getCoordinatesForSegment(center, labelRadius, midAngle);
    const end = getCoordinatesForSegment(center, labelTextDistance, midAngle);
    
    const isRight = midAngle > 270 || midAngle < 90;
    const horizontalEnd = isRight ? end.x + 30 : end.x - 30; 
    
    return (
        <path
            d={`M ${start.x} ${start.y} L ${end.x} ${end.y} L ${horizontalEnd} ${end.y}`}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeOpacity="0.7"
        />
    );
};

const describeArc = (x, y, radius, innerRadius, startAngle, endAngle) => {
    if (endAngle - startAngle <= 0) return '';
    
    const angleDiff = endAngle - startAngle;

    const startOuter = getCoordinatesForSegment({x, y}, radius, endAngle);
    const endOuter = getCoordinatesForSegment({x, y}, radius, startAngle);

    const startInner = getCoordinatesForSegment({x, y}, innerRadius, endAngle);
    const endInner = getCoordinatesForSegment({x, y}, innerRadius, startAngle);

    const largeArcFlag = angleDiff <= 180 ? 0 : 1;
    
    const d = [
        `M ${startInner.x} ${startInner.y}`,
        `L ${startOuter.x} ${startOuter.y}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endOuter.x} ${endOuter.y}`,
        `L ${endInner.x} ${endInner.y}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${startInner.x} ${startInner.y}`,
        'Z'
    ].join(' ');

    return d;
}


const PieChartPlaceholder = () => {
    const data = PIE_CHART_DATA;
    const GAP_DEGREES = 2.0; 
    const INNER_RADIUS_RATIO = 0.5; 
    
    let cumulativeAngle = 0;
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    const hadirData = data.find(item => item.label === 'Hadir');

    const segments = data.map(item => {
        const angle = (item.value / totalValue) * 360;

        const originalEndAngle = cumulativeAngle + angle;

        const drawStartAngle = cumulativeAngle + GAP_DEGREES / 2;
        const drawEndAngle = originalEndAngle - GAP_DEGREES / 2;
        
        const midAngle = cumulativeAngle + angle / 2;
        
        cumulativeAngle = originalEndAngle;
        
        return {
            ...item,
            percentage: (item.value / totalValue) * 100,
            drawStartAngle,
            drawEndAngle,
            midAngle,
        };
    });

    const SVG_VIEWBOX_SIZE = 380; 
    const CenterX = SVG_VIEWBOX_SIZE / 2;
    const CenterY = SVG_VIEWBOX_SIZE / 2;
    const OuterRadius = 100; 
    const InnerRadius = OuterRadius * INNER_RADIUS_RATIO;


    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-[347px] width-[496px] flex flex-col">
            <h3 className="text-gray-800 text-lg font-semibold mb-4">Proporsi Kehadiran Global</h3>
            
            <div className="flex-1 flex items-center justify-center relative h-full">
                <svg width="100%" height="100%" viewBox={`0 0 ${SVG_VIEWBOX_SIZE} ${SVG_VIEWBOX_SIZE}`} className="max-w-[280px] md:max-w-md mr-8">
                    {segments.map((segment, index) => (
                        <path
                            key={index}
                            d={describeArc(CenterX, CenterY, OuterRadius, InnerRadius, segment.drawStartAngle - 90, segment.drawEndAngle - 90)}
                            fill={segment.color}
                            className="transition-transform duration-300 hover:scale-[1.02] active:scale-105"
                        />
                    ))}

                    {segments.map((segment, index) => {
                        const midAngle = segment.midAngle - 90;
                        const isRight = midAngle > 270 || midAngle < 90;
                        const labelTextDistance = OuterRadius * 1.35; 
                        const end = getCoordinatesForSegment({ x: CenterX, y: CenterY }, labelTextDistance, midAngle);
                        const horizontalEnd = isRight ? end.x + 30 : end.x - 30;
                        const textAnchor = isRight ? 'start' : 'end';

                        return (
                            <React.Fragment key={segment.label}>
                                <LeaderLine midAngle={midAngle} color={segment.textColor} radius={OuterRadius} center={{ x: CenterX, y: CenterY }} />
                                <text x={horizontalEnd + (isRight ? 4 : -4)} y={end.y - 5} textAnchor={textAnchor} fontSize="12" fill={segment.textColor} fontWeight="bold">
                                    {segment.label}
                                </text>
                                <text x={horizontalEnd + (isRight ? 4 : -4)} y={end.y + 12} textAnchor={textAnchor} fontSize="12" fill={segment.textColor} fontWeight="semibold">
                                    {`${segment.percentage.toFixed(2)}%`}
                                </text>
                            </React.Fragment>
                        );
                    })}
                    <text x={CenterX} y={CenterY + 10} textAnchor="middle" fontSize="24" fill={hadirData.textColor} fontWeight="bold">{`${hadirData.value.toFixed(2)}%`}</text>
                </svg>
                
                <div className="absolute right-0 top-32 transform -translate-y-1/2 space-y-2 hidden md:block">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                            <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-gray-600 font-medium">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

function MainStatistikGlobal () {
    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <Header h1={"Statistik Absensi Global"} p={"Analisis tingkat kehadiran siswa di seluruh sekolah berdasarkan periode dan kategori."}/>
            <div className="flex flex-wrap gap-3 justify-between items-center mb-6 bg-white px-6 h-[70px] rounded-xl shadow-md border border-gray-100">
                <div className='flex items-center'>
                    <h2 className="text-lg font-semibold text-gray-800 mr-4">Filter Data</h2>
                </div>
                <div className='flex flex-wrap gap-3'>
                    {['Periode', 'Kelas', 'Jurusan'].map((label) => (
                    <button key={label} className="flex items-center border border-gray-400 rounded-lg px-4 py-2 text-sm">
                        {label} <ChevronRight className="w-4 h-4 ml-2 text-gray-500" />
                    </button>
                    ))}
                    <button className="flex items-center border border-gray-400 rounded-lg px-4 py-2 text-sm">
                      <Calendar className="w-4 h-4 mr-2" /> 5 Sep, 2025 <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
            <h2 className="text-[24px] font-bold text-gray-800 mb-6">Ringkasan Statistik Bulan Ini</h2>
           
                <div className="grid grid-cols-4 gap-2  mb-8 ">
                    <StatsCard />
                </div>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 max-w-7xl mx-auto">
                {/* diagram naik turun */}
                <div className="lg:col-span-4 min-h-[450px]">
                    <LineChartPlaceholder />
                </div>
                {/* diagram lingkaran menggunakan data yang disesuaikan */}
                <div className="lg:col-span-3 min-h-[450px]">
                    <PieChartPlaceholder />
                </div>
            </div>
        </div>
    );
};

export default MainStatistikGlobal;