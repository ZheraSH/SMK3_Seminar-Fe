"use client";

export function RfidHeader() {
  return (
    <div className="relative w-full h-[166px] mt-6 bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] shadow-md">
      <div className="absolute inset-0 flex flex-col mt-2 rounded-[6px]">
        <div className="ml-6">
          <h1 className="text-white text-[30px] font-semibold drop-shadow-lg">
            Management RFID
          </h1>
          <p className="text-white text-[14px] font-light drop-shadow-md">
            Kelola daftar tahun ajaran yang tersedia.
          </p>
        </div>
      </div>
    </div>
  );
}