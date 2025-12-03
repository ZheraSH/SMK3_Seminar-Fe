export default function ProfileHeader ({user}) {
    return (
        <div className="bg-[#3B82F6] mb-4 w-full text-white h-[70px] md:h-[100px] rounded-lg flex items-center gap-4 md:gap-5 px-4">
            <img 
                src="images/team/valen.jpg" 
                alt="profil" 
                className="rounded-full w-[40px] h-[40px] md:w-[68px] md:h-[68px]" 
            />
            <div className="flex flex-col">
                <h1 className="text-[15px] md:text-[20px] font-semibold">
                    Halo, {user.name || "Pengguna"}
                </h1>
                <p className="text-[10px] md:text-[14px] font-medium">
                    XII PPLG 3
                </p>
            </div>
        </div>
    );
}
