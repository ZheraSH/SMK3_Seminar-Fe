function Header ({span = "isi ini brooo 🤷‍♂️🤦‍♂️🐱🐒" , p = "ini juga di isiii jangan lupa" , src=""}) {
  return(
    <div className='container mx-auto mb-8'>
      <div className='w-full h-[130px] bg-[#BFDBFE] rounded-[16px] flex justify-between'>
        <div className=' lg:pt-4 md:pt-4 pt-6 pl-6'>
          <span className='lg:text-[24px] md:text-[23px] text-[16px] mt-321 font-semibold'>{span}</span>
          <p className='text-[14px] mt-5'>{p}</p>
        </div>
        <div className='lg:mt-2 md:mt-2 mt-3'>
          <img src={src} alt="" className='lg:w-[227px] lg:h-[130px] md:w-[227px] md:h-[130px] w-[160px] h-[120px]'/>
        </div>
      </div>
    </div>
  )
}
export default Header;