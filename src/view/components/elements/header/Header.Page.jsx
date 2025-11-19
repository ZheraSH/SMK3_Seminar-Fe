const HeaderPage = (props) => {
    const { h1, p } = props;
  
    return (
      <div className="relative w-full h-[166px] mt-6 bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] mb-10 shadow-md">
        <div className="absolute inset-0 flex flex-col mt-2 rounded-[6px]">
          <div className="ml-6">
            <h1 className="text-white text-[30px] font-semibold drop-shadow-lg">
              {h1}
            </h1>
            <p className="text-white text-[14px] font-light drop-shadow-md">
              {p}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeaderPage;
  