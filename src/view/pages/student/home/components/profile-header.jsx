import ProfileIMG from "../../../../../Core/hooks/profile/Profil";

export default function ProfileHeader ({user}) {
    return (
        <div className=" w-full text-[#374151] h-[70px] md:h-[100px] rounded-lg flex items-center gap-4 md:gap-5 px-4">
            <h1 className="font-semibold text-xl text-gray-700">
                Selamat Datang, {user?.name || "Siswa"}
            </h1>  
        </div>
    );
}
