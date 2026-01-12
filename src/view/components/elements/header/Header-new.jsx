function Header ({span = "isi ini brooo 🤷‍♂️🤦‍♂️🐱🐒" , p = "ini juga di isiii jangan lupa" , src="", className=""}) {
  return(
    <div className=' mb-6 w-full'>
      <div className='w-full h-[130px] bg-[#BFDBFE] rounded-[16px] flex justify-between'>
        <div className=' lg:pt-4 md:pt-4 pt-6 pl-6'>
          <span className='lg:text-[24px] md:text-[23px] text-[16px] mt-321 font-semibold'>{span}</span>
          <p className='text-[14px] mt-3'>{p}</p>
        </div>
        <div className='lg:mt-2 md:mt-2 mt-2'>
          <img src={src} alt="" className={`lg:w-[227px] lg:h-[130px] hidden md:flex md:w-[227px] md:h-[130px] w-[160px] h-[120px] ${className}`}/>
        </div>
      </div>
    </div>
  )
}
export default Header;