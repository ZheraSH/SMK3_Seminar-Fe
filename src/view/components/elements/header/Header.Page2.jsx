import { Calendar1, UserRoundCheck, UsersRound } from "lucide-react";

const HeaderPage2 = (props) => {
  const { h1, p, user, count_student, schoolyears } = props;

  return (
    <div className="relative w-full h-[156px] mt-6 bg-[url('/images/background/bg04.png')] bg-right bg-cover bg-no-repeat rounded-[15px] mb-10 shadow-md">
      
      {/* CONTENT ATAS */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <h1 className="text-white text-[20px] font-semibold drop-shadow-lg">
          {h1}
        </h1>
        <p className="text-white text-[12px] font-light drop-shadow-md">
          {p}
        </p>
      </div>

      <div className="absolute bottom-4 left-6 flex gap-2 text-[14px] text-white">
        <UserRoundCheck className="w-[20px] h-[20px]" />
        <span>{user}</span>

        <UsersRound className="w-[20px] h-[20px] ml-3" />
        <span>{count_student}</span>

        <Calendar1 className="w-[20px] h-[20px] ml-3" />
        <span>{schoolyears}</span>
      </div>
    </div>
  );
};

export default HeaderPage2;
