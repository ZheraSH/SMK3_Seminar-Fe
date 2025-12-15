import { Link, useLocation } from "react-router-dom";
import {ImmediateReveal,CharReveal,SubtleShadowButton} from "../../../components/animate/animate";
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
           <ImmediateReveal className=" bg-white rounded-lg px-4 py-2 drop-shadow-lg flex flex-row ">
                <CharReveal text={headerTitle} className="md:text-xl text-md font-weight text-gray-800 w-full mt-2" delay={0.1} />
               <div className="space-x-4 flex justify-end items-center w-full text-white ">
                     <Link to="/home/major">
                        <SubtleShadowButton className={`${getButtonClass('major')} px-3 py-2 cursor-pointer rounded-lg transition duration-150`}>
                            Jurusan
                        </SubtleShadowButton>
                    </Link>
                     <Link to="/home/class">
                        <SubtleShadowButton className={`${getButtonClass('class')} px-3 py-2 cursor-pointer rounded-lg transition duration-150`}>
                            Kelas
                        </SubtleShadowButton>
                    </Link>
               </div>
           </ImmediateReveal>       
        </div>
    )
}

export default Header;