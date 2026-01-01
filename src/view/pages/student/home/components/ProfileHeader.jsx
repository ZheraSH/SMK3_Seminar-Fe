import ProfileIMG from "../../../../../Core/hooks/profile/Profil";

export default function ProfileHeader ({user, header}) {
    return (
        <div className="bg-[#3B82F6] mb-4 w-full text-white h-[70px] md:h-[100px] rounded-lg flex items-center gap-4 md:gap-5 px-4">
            <ProfileIMG />
            <div className="flex flex-col">
                <h1 className="text-[15px] md:text-[20px] font-semibold">
                    Halo, {user?.name|| "Pengguna"}
                </h1>
                <p className="text-[10px] md:text-[14px] font-medium">
                    {header?.classroom}
                </p>
            </div>
        </div>
    );
}
