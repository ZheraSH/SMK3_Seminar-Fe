export default function ProfileHeader ({user}) {
    return (
        <div className=" bg-[#3B82F6] mb-4 w-[1129px] text-white h-[100px] rounded-lg flex items-center gap-5 pl-4">
            <img src=" images/team/valen.jpg" alt="profil" className="rounded-full w-[68px] h-[68px]" />
            <div className="flex flex-col mt-0">
                <h1 className=" text-[20px] font-semibold"> Halo, {user.name || "Pengguna"}</h1>
                <p className="text-[14px] font-medium"> XII PPLG 3   </p>
            </div>
        </div>
    );
}