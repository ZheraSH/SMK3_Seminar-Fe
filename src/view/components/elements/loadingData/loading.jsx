import React from "react";

const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse ${className}`}
      {...props}
    />
  );
};


// Desain A: List Sederhana (Seperti kode awal kamu)
const ListSkeleton = ({ count }) => (
  <div className="space-y-4">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4 rounded" /> {/* Title */}
          <Skeleton className="h-3 w-1/2 rounded" /> {/* Subtitle */}
        </div>
      </div>
    ))}
  </div>
);


//card di mapel
    const CardMapelSkeleton = ({ count }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(count)].map((_, i) => (
            <div key={i} className="bg-white p-3.5 rounded-xl shadow-sm border border-gray-100 space-y-3">
                <div className="flex justify-between items-start">
                <Skeleton className="h-10 w-12 rounded-lg" /> 
                <Skeleton className="h-5 w-6 rounded" /> 
                </div>
                <Skeleton className="h-8 w-full rounded-lg mt-4" />
            </div>
            ))}
        </div>
    );

// kotak 
    const Kotak = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4 mt-8 ">
            <div className="bg-gray-100 p-4 border-b border-gray-100 flex space-x-4 animate-pulse">
            <Skeleton className="h-50 w-full rounded" />
            
            </div>
            
        </div>
    );
const KotakRfid = () => (
    <div className="w-full mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col gap-10">
            <div className="animate-pulse space-y-6 bg-gray-100 p-5 rounded-lg">
                <Skeleton className="h-6 w-32 rounded-md" />
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-11/12 rounded" />
                    <Skeleton className="h-4 w-10/12 rounded" />
                </div>
            </div>
            <div className="flex flex-wrap gap-3">
                {[...Array(7)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <Skeleton className="h-10 w-24 rounded-xl" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const KotakRfid2 = () => (
    <div className="w-full mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col gap-10">
            <div className="animate-pulse space-y-6 bg-gray-100 p-5 rounded-lg">
                <Skeleton className="h-10 w-50 rounded-md" />
                <div className="space-y-3 flex gap-5 justify-between">
                    <Skeleton className="h-30 w-110 rounded-lg" />
                    <Skeleton className="h-30 w-110 rounded-lg" />
                </div>
                <div className=" flex justify-between">
                    <Skeleton className=" h-10 w-35 rounded-full bg-gray-300"/>
                    <Skeleton className="h-13 w-60 rounded-lg bg-gray-300"/>
                </div>
            </div>
        </div>
    </div>
);

// tombol tambah + serch
    const Create = () => (
        <div className=" mb-6 flex justify-between animate-pulse gap-2">
            <Skeleton className="h-10 w-full bg-gray-50 rounded-lg"/>
            
        </div>
    );

// header 
    const HeaderSkeleton = () => (
        <div className="mb-6 w-full">
            <div className="w-full h-[130px] bg-gray-100 animate-pulse rounded-[16px] flex justify-between">
            <div className="lg:pt-4 md:pt-4 pt-6 pl-6 space-y-3">
                <Skeleton className="h-7 w-48 bg-gray-300 rounded-md"/>
                <Skeleton className="h-4 w-64 bg-gray-300 rounded-md"/>
            </div>
            <div className="lg:mt-2 md:mt-2 mt-2 mr-4 hidden md:flex">
                <Skeleton className="lg:w-[227px] lg:h-[110px] md:w-[200px] md:h-[100px] bg-gray-300 rounded-xl"/>
            </div>
            </div>
        </div>
    );


//attendance chart skeleton 
    const AttendanceChartSkeleton = ({ count }) => (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
            {[...Array(count)].map((_, i) => (
            <div key={i} className="flex bg-white shadow-md rounded-xl p-4 animate-pulse">
                <Skeleton className={`w-1 h-14 mr-4 rounded-full bg-gray-300 animate-pulse`} />
                <div className="flex flex-1 items-center justify-between">
                    <div>
                        <Skeleton className="text-2xl font-semibold bg-gray-300 animate-pulse"/>
                        <Skeleton className="text-sm font-semibold bg-gray-400 text-[#000000] animate-pulse"/>
                    </div>
                        <Skeleton className=" w-25 h-3 bg-gray-300 animate-pulse"/>
                        <Skeleton className=" w-10 h-10 bg-gray-300 rounded-lg animate-pulse"/>
                </div>
            </div>
            ))}
        </div>
    );

// 2 card 2:2
    const CradDoubleSkeleton = ({ count = 5 }) => (
        <div className="flex flex-col lg:flex-row gap-6 w-full mt-5 px-4">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full overflow-hidden">
                <div className="p-5 border-b border-gray-50">
                    <Skeleton className="h-7 w-48 rounded-md mb-2" /> 
                </div>
                <div className="p-0">
                    <div className="bg-gray-100 mx-2 p-3 flex gap-4">
                        <Skeleton className="h-4 w-8 bg-gray-300" />
                        <Skeleton className="h-4 w-1/3 bg-gray-300" />
                        <Skeleton className="h-4 w-1/4 bg-gray-300" />
                        <Skeleton className="h-4 w-1/4 bg-gray-300 ml-auto" />
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[...Array(count)].map((_, i) => (
                            <div key={i} className="p-4 flex items-center gap-4">
                            <Skeleton className="h-4 w-6 rounded" />
                            <Skeleton className="h-6 w-24 rounded-full" /> {/* Badge Mapel */}
                            <Skeleton className="h-4 w-1/4 rounded" />
                            <Skeleton className="h-4 w-20 rounded ml-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full overflow-hidden">
                <div className="p-5 border-b border-gray-50">
                    <Skeleton className="h-7 w-48 rounded-md mb-2" /> {/* Judul: Riwayat Izin */}
                </div>
                <div className="p-0">
                    <div className="bg-gray-100 mx-2 p-3 flex gap-4">
                        <Skeleton className="h-4 w-8 bg-gray-300" />
                        <Skeleton className="h-4 w-1/4 bg-gray-300" />
                        <Skeleton className="h-4 w-1/3 bg-gray-300" />
                        <Skeleton className="h-4 w-1/4 bg-gray-300 ml-auto" />
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="p-4 flex items-center gap-4">
                            <Skeleton className="h-4 w-6 rounded" />
                            <Skeleton className="h-4 w-24 rounded" />
                            <Skeleton className="h-4 w-1/3 rounded" />
                            <Skeleton className="h-7 w-20 rounded-full ml-auto" /> {/* Badge Status */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
// 2 card 1:1
    const CradDouble1 = () => (
        <div className="flex animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 w-full h-48">
                <div className="bg-white w-50% gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] animate-pulse rounded-2xl p-4 border-2 border-gray-300 ">
                    <Skeleton className=" h-7  w-35 bg-white"/>
                    <div className=" flex mt-2 items-center gap-4">
                        <Skeleton className=" h-30 w-30 bg-gray-100 rounded-full"/>
                        <div className=" flex-col gap-3">
                            <Skeleton className=" w-50 h-5 bg-gray-50 mb-2 "/>
                            <Skeleton className="w-60 h-5 bg-gray-50"/>
                        </div>
                    </div>
                </div>

                <div className="bg-white w-50% gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] animate-pulse rounded-2xl p-4 border-2 border-gray-300 ">
                    <div className=" flex mt-2 items-center gap-4">
                        <div className=" flex-col gap-3">
                            <Skeleton className=" w-50 h-5 bg-gray-50 mb-2 "/>
                            <Skeleton className="w-60 h-5 bg-gray-50"/>
                        </div>
                        <Skeleton className=" h-30 w-30 bg-gray-100 "/>
                    </div>
                </div>
            </div>

        </div>
    );
// card student
    const CardStudentSkeleton = ({ count }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  mt-10">
            {[...Array(count)].map((_, i) => (
            <div key={i} className="bg-white flex flex-col justify-center items-center gap-3 h-40 shadow-md rounded-2xl p-4 border-2 border-gray-300 animate-pulse">
                <Skeleton className=" h-20 w-20 rounded-full "/> 
                <Skeleton className=" h-5 w-3/4 mt-4 "/>
            </div>
            ))}
        </div>
    );


// card major 
    const CardMajor= ({ count }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  mt-10">
            {[...Array(count)].map((_, i) => (
            <div key={i} className="bg-white flex flex-col justify-center items-center gap-3 h-50 shadow-md rounded-2xl p-4  animate-pulse">
                <Skeleton className=" h-20 w-20 rounded-md "/> 
                <Skeleton className=" h-10 w-70 mt-4 rounded-lg "/>
            </div>
            ))}
        </div>
    );

// card kelas 
    const CardClass = ({count}) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  mt-10">
            {[...Array(count)].map((_, i) => (
            <div key={i} className="bg-white flex flex-col items-center justify-center gap-3 h-40 shadow-md rounded-2xl p-4  animate-pulse">
                <Skeleton className=" h-40 w-full mx-2 rounded-md "/> 
                <Skeleton className=" h-18 w-full rounded-md"/>
            </div>
            ))}
        </div>
    )

// tombol tambah + serch + back + sync
    const Create2 = () => (
        <div className=" mb-0 md:mb-6 flex justify-between animate-pulse">
            <Skeleton className="h-25 md:h-10 w-full bg-gray-100 rounded-md md:rounded-full"/>
            
        </div>
    );


// table siswa / karyawan
    const TableSkeleton = ({ count }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-blue-50 p-4 border-b border-gray-100 flex space-x-4">
        <Skeleton className="h-6 w-8 rounded" />
        <Skeleton className="h-6 w-1/4 rounded" />
        <Skeleton className="h-6 w-1/4 rounded" />
        <Skeleton className="h-6 w-1/4 rounded" />
        </div>
        <div className="p-4 space-y-4">
        {[...Array(count)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 h-10 ">
            <Skeleton className="h-8 w-5 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" /> {/* Avatar/No */}
            <Skeleton className="h-4 w-1/3 rounded" />
            <Skeleton className="h-4 w-1/3 rounded" />
            <Skeleton className="h-4 w-1/6 rounded ml-auto" /> {/* Action Button */}
            </div>
        ))}
        </div>
    </div>
    );



// tabel schedule
const TableChedule =({count}) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-200 p-4 flex justify-between items-center">
        <Skeleton className="h-5 w-8 bg-gray-100 rounded" />
        <Skeleton className="h-5 w-1/4 bg-gray-100 rounded" />
        <Skeleton className="h-5 w-1/4 bg-gray-100 rounded" />
        <Skeleton className="h-5 w-1/4 bg-gray-100 rounded" />
        <Skeleton className="h-5 w-12 bg-gray-100 rounded" />
      </div>
      
      <div className="divide-y divide-gray-100">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="p-4 flex justify-between items-center">
            <Skeleton className="h-5 w-full rounded" />
          </div>
        ))}
      </div>
    </div>

);

// Skeleton Dashboard Operator
const DashboardChartsSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[14px] animate-pulse mt-5">
    <div className="space-y-[14px]">
      <div className="grid grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center border border-gray-100">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-8 w-24 rounded" />
            </div>
            <Skeleton className="w-14 h-14 rounded-xl bg-blue-50" />
          </div>
        ))}
      </div>

      
      <div className="bg-white rounded-xl shadow-sm p-6 h-[300px]">
        <Skeleton className="h-6 w-48 mb-4 rounded" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded" />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <Skeleton className="h-6 w-64 mb-2 rounded" />
        <Skeleton className="h-4 w-32 mb-6 rounded" />
        <Skeleton className="h-[260px] w-full rounded-lg bg-gray-50" />
      </div>
    </div>

    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <Skeleton className="h-6 w-40 mb-8 rounded" />
        <div className="flex justify-center mb-8">
           <div className="w-40 h-40 rounded-full border-[12px] border-gray-100 flex items-center justify-center" />
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-8 rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-3 flex gap-4 border border-gray-200">
            <Skeleton className="w-1 h-14 rounded-full bg-gray-300" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-7 w-12 rounded" />
              <Skeleton className="h-4 w-28 rounded" />
            </div>
            <Skeleton className="w-12 h-12 rounded-lg bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  </div>
);




export default function LoadingData({ loading, type = "list", count = 3 }) {
  if (!loading) return null;

  const renderContent = () => {
    switch (type) {
        case "cardMapel":
            return <CardMapelSkeleton count={count} />;
        case "kotak" : 
            return <Kotak />
        case "attendanceChart" :
            return <AttendanceChartSkeleton count={count} />;
        case "2card" :
            return <CradDoubleSkeleton count={count}/>;
        case "cardStudent" :
            return <CardStudentSkeleton count={count} />;
        case "2cardMini" :
            return <CradDouble1 />;
        case "header1" :
            return <HeaderSkeleton />;
        case "create":
            return <Create />;
        case"create2":
            return <Create2 />
        case"kotakRfid":
            return <KotakRfid count={count}/>
        case "kotakRfid2" : 
            return <KotakRfid2/>
        case "cardmajor":
            return <CardMajor count={count} />
        case "cardclass":
            return <CardClass count={count} />
        case "tableSiswaKaryawan":
            return <TableSkeleton count={count} />
        case "tableSchedule" :
            return <TableChedule count={count} />
       case "dashboardCharts":
            return <DashboardChartsSkeleton />;
        case "list":
        default:
            return <ListSkeleton count={count} />;
    }
  };

  return (
    <div className="w-full animate-fade-in">
      {renderContent()}
    </div>
  );
}