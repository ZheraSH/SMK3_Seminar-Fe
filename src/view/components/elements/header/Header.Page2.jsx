import { Calendar1, UserRoundCheck, UsersRound } from "lucide-react";

const HeaderPage2 = (props) => {
    const { h1, p } = props;
  
    return (
      <div className="relative w-full h-[156px] mt-6 bg-[url('/images/background/bg04.png')] bg-right bg-cover bg-no-repeat rounded-[15px] mb-10 shadow-md">
        <div className="absolute inset-0 flex flex-col mt-2 rounded-[6px]">
          <div className="ml-6">
            <h1 className="text-white text-[30px] font-semibold drop-shadow-lg">
              {h1}
            </h1>
            <p className="text-white text-[14px] font-light drop-shadow-md">
              {p}
            </p>
            <div className="flex mt-10 gap-2 text-[14px] text-white">
                
                <UserRoundCheck className="w-[20px] h-[20px] "/>
                <p>Valen Ibrahim </p>

                <UsersRound className="w-[20px] h-[20px] ml-3"/>
                <p>34</p>

                <Calendar1 className="w-[20px] h-[20px] ml-3"/>
                <p>2025/2026</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeaderPage2;
  