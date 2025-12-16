import { Link, useLocation } from "react-router-dom";
function Header() {
    const location = useLocation();

    const currentPath = location.pathname;

    let headerTitle = "Daftar Jurusan";
    if (currentPath.includes('/class')) {
        headerTitle = "Daftar Kelas";
    }

    const getButtonClass = (pathSegment) => {
        if (currentPath.includes(pathSegment)) {
            return "bg-[#3B82F6]";
        }
        return "bg-[#F2F6FF] text-[#1E3A8A]";
    };

    return (
        <div className="mb-6">
           <div className=" bg-white rounded-lg px-4 py-2 drop-shadow-lg flex flex-row ">
                <span className="md:text-xl text-md font-weight text-gray-800 w-full mt-2">{headerTitle}</span>
               <div className="space-x-4 flex justify-end items-center w-full text-white ">
                     <Link to="/home/major">
                        <button className={`${getButtonClass('major')} px-3 py-2 cursor-pointer rounded-lg transition duration-150`}>
                            Jurusan
                        </button>
                    </Link>
                     <Link to="/home/class">
                        <button className={`${getButtonClass('class')} px-3 py-2 cursor-pointer rounded-lg transition duration-150`}>
                            Kelas
                        </button>
                    </Link>
               </div>
           </div>       
        </div>
    )
}

export default Header;