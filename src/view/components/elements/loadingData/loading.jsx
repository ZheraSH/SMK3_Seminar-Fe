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

// tombol day 
    const Day = ({count}) => (
        <div className="flex flex-wrap gap-1 bg-white animate-pulse shadow-md p-2 rounded-lg">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <Skeleton className="h-10 w-21 rounded-xl" />
                </div>
            ))}
        </div>
    )
// // tombol day2 
    const Day2 = ({count}) => (
    <div className=" flex flex-col md:flex-row justify-between gap-1 bg-white animate-pulse shadow-md p-2 py-2 rounded-lg">
        <Skeleton  className=" h-8 w-70 bg-gray-50 rounded-md"/>
        <div className="flex flex-wrap gap-1">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <Skeleton className="mt-2 h-7 md:h-10 w-15 md:w-21 rounded-xl" />
                </div>
            ))}
        </div>
    </div>
    )

// tombol tambah + serch
    const Create = () => (
        <div className=" mb-6 flex justify-between animate-pulse gap-2">
            <Skeleton className="h-15 w-full bg-gray-50 rounded-lg"/>
            
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4 ">
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
        <div className="flex flex-col lg:flex-row gap-6 w-full mt-5 ">
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
                            <Skeleton className="h-4 w-1/3 rounded" />
                            <Skeleton className="h-4 w-25 rounded ml-auto" />
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
                            <Skeleton className="h-6 w-24 rounded-md ml-auto" /> {/* Badge Status */}
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

const KotakKecil = () => (
    <div>
        <Skeleton className=" bg-gray-50 animate-pulse h-12 w-80 my-5 rounded-md" />
    </div>
)

const Warning = () => (
    <div className="animate-pulse space-y-6 bg-gray-100 p-5 rounded-lg">
        <Skeleton className="h-6 w-32 rounded-md" />
        <div className="space-y-3">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-11/12 rounded" />
            <Skeleton className="h-4 w-10/12 rounded" />
        </div>
    </div>
)


const ProfilePageSkeleton = () => (
  <div className="relative justify-center mx-5 pb-5 animate-pulse">
    <Skeleton className="w-full h-[140px] rounded-3xl mt-4" />

    <div className="-mt-9 relative z-10 px-0 ">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-md">
        
        <div className="px-4 md:px-7 pt-12 pb-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            
            <div className="flex gap-6">
              <div className="-mt-24 relative z-20">
                <div className="bg-white rounded-full ml-2 p-1">
                  <Skeleton className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] rounded-full" />
                </div>
              </div>

              <div className="mb-2 -mt-5 space-y-3">
                <Skeleton className="h-8 w-30 md:w-64 rounded-lg" />
                <Skeleton className="h-5 w-20 rounded-lg" />
              </div>
            </div>

            <div className="-mt-5 flex gap-2">
              <Skeleton className="h-10 w-24 md:w-32 rounded-md" />
              <Skeleton className="h-10 w-24 md:w-32 rounded-md" />
            </div>
          </div>

          <div className="mt-5">
            <Skeleton className="h-8 w-48 mb-8 rounded-lg" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 px-5">
              <div className="space-y-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-6 w-25  rounded" />
                    <Skeleton className="h-6 flex-1 rounded" />
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-6 w-24  rounded" />
                    <Skeleton className="h-6 flex-1 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center md:justify-end px-10 mb-6">
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);


// Classrooms List Skeleton di Dashboard Teacher
const ClassroomsSkeleton = ({ count = 4 }) => (
  <div className="mb-8 mt-2">
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className="bg-white rounded-2xl p-3 drop-shadow-lg border border-gray-200 w-full h-[117px] animate-pulse"
        >
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="w-10 h-10 rounded-[10px] bg-blue-100" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/2 rounded bg-blue-50" />
            </div>
          </div>

          <hr className="border-gray-100" />
          <div className="flex justify-between mt-3">
            <Skeleton className="h-3 w-24 rounded" /> {/* Jumlah Siswa */}
            <Skeleton className="h-3 w-16 rounded" /> {/* Nama Kelas */}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StatGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 rounded" /> {/* Label */}
            <Skeleton className="h-8 w-20 rounded-lg" /> {/* Angka Besar */}
          </div>
          <Skeleton className="h-10 w-10 rounded-xl bg-gray-100" /> {/* Icon Box */}
        </div>
        <div className="space-y-2 mt-6">
          <Skeleton className="h-3 w-16 rounded" /> {/* Teks "Bulan ini" */}
          <Skeleton className="h-2 w-full rounded-full bg-gray-100" /> {/* Progress Bar */}
        </div>
      </div>
    ))}
  </div>
);



const ChartsGlobalSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <Skeleton className="h-6 w-48 mb-6 rounded" />
      <div className="relative h-64 flex items-end gap-2 px-2">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <Skeleton className={`w-full bg-gray-100 rounded-t-sm ${i === 0 ? 'h-full' : 'h-4'}`} />
            <Skeleton className="h-3 w-8 rounded" />
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
      <Skeleton className="h-6 w-48 mb-10 self-start rounded" />
      <div className="relative w-48 h-48 rounded-full border-[16px] border-gray-100 flex items-center justify-center">
         <Skeleton className="h-8 w-16 rounded" />
      </div>
      <div className="mt-8 w-full space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
            <Skeleton className="h-4 w-12 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);


// profile Operator
const ProfilePageOperator = () => (
  <div className="p-0 md:p-3 min-h-screen font-sans animate-pulse">
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-8 max-w-6xl mx-auto">
      
      <div className="flex flex-row justify-between items-center mb-6 gap-2">
        <Skeleton className="h-7 w-40 md:w-64 rounded-lg" />
        <Skeleton className="h-8 md:h-10 w-28 md:w-32 rounded-lg" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Skeleton className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-2xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 md:h-7 w-48 md:w-80 rounded-lg" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>

        <div className="w-full md:w-auto px-4 py-2 bg-gray-50 md:bg-transparent rounded-lg border-l-4 border-gray-200 md:border-l-0">
          <Skeleton className="h-3 w-20 mb-1 rounded" />
          <Skeleton className="h-5 w-24 rounded-md" />
        </div>
      </div>

      <hr className="border-gray-100 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
        
        <div className="space-y-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
              <Skeleton className="h-5 w-full sm:w-40 md:w-48 rounded" />
              <div className="hidden sm:block mr-3 w-1 h-5 bg-transparent" /> {/* Spacer pengganti titik dua */}
              <Skeleton className="h-5 flex-1 rounded" />
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
            <Skeleton className="h-5 w-full sm:w-40 md:w-48 rounded" />
            <div className="hidden sm:block mr-3 w-1 h-5 bg-transparent" />
            <Skeleton className="h-5 flex-1 rounded" />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0">
            <Skeleton className="h-5 w-full sm:w-40 md:w-48 rounded" />
            <div className="hidden sm:block mr-3 w-1 h-5 bg-transparent" />
            <Skeleton className="h-5 flex-1 rounded" />
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-0">
            <Skeleton className="h-5 w-full sm:w-40 md:w-48 rounded" />
            <div className="hidden sm:block mr-3 w-1 h-5 bg-transparent" />
            <Skeleton className="h-16 flex-1 rounded" />
          </div>
        </div>

      </div>

      <div className="mt-12 pt-6 border-t border-gray-100 flex justify-end items-center gap-6">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-5 w-20 rounded" />
      </div>

    </div>
  </div>
);




// Dashboard Wali kelas
const DashboardHomeroom = () => (
    <div className="bg-white p-6 h-120 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between items-center">
      <Skeleton className="h-6 w-48 self-start mb-6 rounded" />
      <div className="relative w-48 h-48 rounded-full border-[20px] border-gray-100 flex items-center justify-center">
        <Skeleton className="h-10 w-16 rounded" />
      </div>
      <div className="flex gap-3 mt-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-8 rounded" />
          </div>
        ))}
      </div>
    </div>
);

const Dashboard1 = () =>(
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <Skeleton className="h-6 w-56 mb-6 rounded" />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 rounded-xl border border-gray-50 bg-gray-50/50 space-y-3">
            <div className="flex justify-between items-center">
               <Skeleton className="h-8 w-10 rounded" />
               <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
);

//tombolcrosscheck
const HeaderDaftarSiswaSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 animate-pulse">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 rounded-lg" /> {/* Judul: Daftar Nama Siswa */}
        <Skeleton className="h-4 w-64 rounded-md" /> {/* Subtitle: Ringkasan kehadiran */}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Skeleton className="h-[42px] w-full md:w-32 rounded-xl" />
        <Skeleton className="h-[42px] w-full md:w-28 rounded-xl" />
      </div>
    </div>
  </div>
);

//attendance card
const StatusGridFiveSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
    {[...Array(5)].map((_, i) => (
      <div 
        key={i} 
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-3 flex-1">
            <Skeleton className="h-3 w-20 rounded" /> 
            <Skeleton className="h-8 w-12 rounded-lg" /> 
          </div>
          <Skeleton className="h-10 w-10 rounded-xl bg-gray-100" />
        </div>
        <div className="mt-4">
          <Skeleton className="h-1.5 w-full rounded-full bg-gray-50" />
        </div>
      </div>
    ))}
  </div>
);



export default function LoadingData({ loading, type = "list", count = 3 }) {
  if (!loading) return null;

  const renderContent = () => {
    switch (type) {
        case "statusCardsFive":
          return <StatusGridFiveSkeleton />;
        case "headerDaftarSiswa":
          return <HeaderDaftarSiswaSkeleton />;   
        case "DashboardWaliKelas2" :
          return <Dashboard1 />
        case "DashboardWaliKelas" :
          return <DashboardHomeroom />
        case "profileOperator" :
          return <ProfilePageOperator />
        case "cardStatistikBk" :
            return <StatGridSkeleton />
        case "statistikBk":
            return <ChartsGlobalSkeleton />
        case "warning" :
            return <Warning />
        case "cardClassroom":
            return <ClassroomsSkeleton count={count} />
        case " profilePage":
            return <ProfilePageSkeleton />
        case"kotakKecil":
            return <KotakKecil />
        case "cardMapel":
            return <CardMapelSkeleton count={count} />;
        case "tombolday" :
            return <Day count={count}/>
        case "tombolDay2":
            return<Day2 count={count}/>
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