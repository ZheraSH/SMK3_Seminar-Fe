import { CircleCheckBig,FileMinus,Clock,CircleX } from "lucide-react";


export const scheduleData = [
    // Senin
    { day: "Senin", jam: "07.00 - 08.30", penetapan: "Jam ke 1-2", mata_pelajaran: "Bahasa Indonesia", guru: "Bu Sundari" },
    { day: "Senin", jam: "08.30 - 09.15", penetapan: "Jam ke 3", mata_pelajaran: "Matematika", guru: "Bu Nining" },
    { day: "Senin", jam: "09.15 - 10.00", penetapan: "Istirahat Pertama", mata_pelajaran: "-", guru: "-" },
    { day: "Senin", jam: "10.00 - 11.30", penetapan: "Jam ke 4-5", mata_pelajaran: "PJOK", guru: "Pak Atik" },
    { day: "Senin", jam: "11.30 - 13.45", penetapan: "Jam ke 6-7", mata_pelajaran: "Produktif", guru: "Bu Nanik" },
    { day: "Senin", jam: "12.15 - 13.00", penetapan: "Istirahat Kedua", mata_pelajaran: "-", guru: "-" },
    { day: "Senin", jam: "13.45 - 15.15", penetapan: "Jam ke 7-8", mata_pelajaran: "Produktif", guru: "Dedy Irwandi" },
    { day: "Senin", jam: "15.15 - 16.00", penetapan: "Jam ke 8", mata_pelajaran: "Bahasa Arab", guru: "Ustazah Dwi" },

     // Selasa
    { day: "Selasa", jam: "07.00 - 08.30", penetapan: "Jam ke-1-2", mata_pelajaran: "Bahasa Inggris", guru: "Bu Lilis" },
    { day: "Selasa", jam: "08.30 - 10.00", penetapan: "Jam ke-3-4", mata_pelajaran: "IPA", guru: "Bu Ratna" },
    { day: "Selasa", jam: "12.15 - 13.00", penetapan: "Istirahat Kedua", mata_pelajaran: "-", guru: "-" },
    { day: "Selasa", jam: "10.15 - 11.45", penetapan: "Jam ke-5-6", mata_pelajaran: "IPS", guru: "Pak Rudi" },

    // Rabu
    { day: "Rabu", jam: "07.00 - 08.30", penetapan: "Jam ke-1-2", mata_pelajaran: "Matematika", guru: "Pak Budi" },
    { day: "Rabu", jam: "08.30 - 10.00", penetapan: "Jam ke-3-4", mata_pelajaran: "Bahasa Indonesia", guru: "Bu Sri" },
    { day: "Rabu", jam: "10.15 - 11.45", penetapan: "Jam ke-5-6", mata_pelajaran: "Seni Budaya", guru: "Bu Tika" },

    // Kamis
    { day: "Kamis",  jam: "07.00 - 08.30", penetapan: "Jam ke-1-2", mata_pelajaran: "Agama", guru: "Pak Hadi" },
    { day: "Kamis",  jam: "08.30 - 10.00", penetapan: "Jam ke-3-4", mata_pelajaran: "PPKn", guru: "Bu Wulan" },
    { day: "Kamis",  jam: "10.15 - 11.45", penetapan: "Jam ke-5-6", mata_pelajaran: "Prakarya", guru: "Bu Nani" },

    // Jumat
    { day: "Jumat",  jam: "07.00 - 08.00", penetapan: "Jam ke-1", mata_pelajaran: "Bahasa Inggris", guru: "Bu Lilis" },
    { day: "Jumat",  jam: "08.00 - 09.00", penetapan: "Jam ke-2", mata_pelajaran: "Matematika", guru: "Pak Budi" },
    { day: "Jumat",  jam: "09.15 - 10.15", penetapan: "Jam ke-3", mata_pelajaran: "Penjas", guru: "Pak Andi" },
  ];


    export const students = [
      { id: 1, name: "Valen Abdul Ibrahim", img: "/images/team/valen.jpg" },
      { id: 2, name: "Ega Cannn", img: "/images/team/ega3.jpg" },
      { id: 3, name: "Fairouz huy", img: "/images/team/fairouz.png" },
      { id: 4, name: "Giat", img: "/images/team/giat.png" },
      { id: 5, name: "Valen Abdul Ibrahim", img: "/images/team/valen.jpg" },
      { id: 6, name: "Ega Cannn", img: "/images/team/ega3.jpg" },
      { id: 7, name: "Fairouz huy", img: "/images/team/fairouz.png" },
      { id: 8, name: "Giat", img: "/images/team/giat.png" },
      { id: 9, name: "Valen Abdul Ibrahim", img: "/images/team/valen.jpg" },
      { id: 10, name: "Ega Cannn", img: "/images/team/ega3.jpg" },
      { id: 11, name: "Fairouz huy", img: "/images/team/fairouz.png" },
      { id: 12, name: "Giat", img: "/images/team/giat.png" },
      { id: 13, name: "Valen Abdul Ibrahim", img: "/images/team/valen.jpg" },
      { id: 14, name: "Ega Cannn", img: "/images/team/ega3.jpg" },
      { id: 15, name: "Fairouz huy", img: "/images/team/fairouz.png" },
      { id: 16, name: "Giat", img: "/images/team/giat.png" },
    ];



  export const days = [
  { label: "Senin", value: "monday" },
  { label: "Selasa", value: "tuesday" },
  { label: "Rabu", value: "wednesday" },
  { label: "Kamis", value: "thursday" },
  { label: "Jumat", value: "friday" },
];




  export const studentData = [
    {
      nama: "Valen Irwandy Mustabir",
      nisn: "006736837827",
      status: "Hadir",
      color: "bg-green-100 text-green-600",
    },
    {
      nama: "Valen Irwandy Mustabir",
      nisn: "006736837827",
      status: "Sakit",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      nama: "Valen Irwandy Mustabir",
      nisn: "006736837827",
      status: "Hadir",
      color: "bg-green-100 text-green-600",
    },
    {
      nama: "Valen Irwandy Mustabir",
      nisn: "006736837827",
      status: "Izin",
      color: "bg-blue-100 text-blue-600",
    },
    {
      nama: "Valen Irwandy Mustabir",
      nisn: "006736837827",
      status: "Alpha",
      color: "bg-red-100 text-red-600",
    },
    {
      nama: "Valen Irwandy Mustabir",
      nisn: "006736837827",
      status: "Hadir",
      color: "bg-green-100 text-green-600",
    },
    {
      nama: "Valen Irwandy Mustabir",
      nisn: "006736837827",
      status: "Hadir",
      color: "bg-green-100 text-green-600",
    },
  ];

  export const presence = [
      {
          label :"Total Kehadiran",
          icon :<CircleCheckBig  className="  h-[23.33px]  w-[23.33px]" />,
          total : 18,
          style : "bg-[#10B981]/20",
          styleIcon : "bg-[#10B981] "
      },
      {
          label:"Izin/Sakit",
          icon : <FileMinus  className="   h-[23.33px]  w-[23.33px]"/>,
          total : 18,
          style : "bg-[#FACC15]/20",
          styleIcon : "bg-[#FACC15] "
      },
      {
          label : "Terlambat",
          icon : <Clock  className="  h-[23.33px]  w-[23.33px]"/>,
          total : 18,
          style: "bg-[#8B5CF6]/20",
          styleIcon : "bg-[#8B5CF6] "
          
      },
      {
          label : "Alpha",
          icon : <CircleX className="  h-[23.33px]  w-[23.33px]" />,
          total: 18,
          style : "bg-[#FF5E53]/20",
          styleIcon : "bg-[#FF5E53]"
      },
  
  ]
  
  
export const schedule = [
      {
          mapel: "Bhs. Indonesia",
          teacher : " Bu Rani",
          time: 1,
          class: "XII PPLG 3"
      },
      {
          mapel: "IPA",
          teacher : " Bu Vita",
          time: 2,
          class: "XII PPLG 3"
      },
      {
          mapel: "Bhs. Arab",
          teacher : " Ustadzah Dwi",
          time: 3,
          class: "XII PPLG 3"
      },
      {
          mapel: "Matematika",
          teacher : " Bu Diah",
          time: 4,
          class: "XII PPLG 3"
      },
      {
          mapel: "Fiqih",
          teacher : "Ustad Bastian",
          time: 5,
          class: "XII  PPLG 3"
      },
  
  ]
  
 export const status = [
      {
          id : "Approve",
          style: " bg-[#10B981]/20 text-[#10B981]"
      },
      {
          id:"Decline",
          style: "bg-[#FF5E53]/20 text-[#FF5E53]"
      },
      {
          id:"Waiting",
          style: " bg-[#FACC15]/20 text-[#FACC15]"
      },
  ]
  
  
 export const history = [
      {
          date: "19/09/2024",
          reason : "Izin Sakit",
          status : "Approve",
      },
      {
          date: "19/09/2024",
          reason : "Izin Keluarga",
          status : "Decline",
      },
      {
          date: "19/09/2024",
          reason : "Izin Perjalanan",
          status : "Waiting",
      },
      {
          date: "19/09/2024",
          reason : "Izin Perjalanan",
          status : "Waiting",
      },
  ]
  