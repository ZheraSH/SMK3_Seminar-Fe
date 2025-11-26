
export const PermissionBanner = () => {
    return (
      <div className="relative w-full h-[166px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px]">
        <div className="absolute inset-0 items-center justify-center rounded-[6px]">
          <div className="ml-5 mt-2">
            <h1 className="text-white text-[30px] font-semibold">
              Izin & Riwayat Izin
            </h1>
            <p className="text-white text-[14px] font-light">
              Ajukan izin kehadiran dan pantau status persetujuannya secara langsung.
            </p>
          </div>
        </div>
      </div>
    );
  };
  