import {  Search, Users, UserCheck2, Calendar, GraduationCap, RefreshCw, Plus, ArrowLeft, X  } from 'lucide-react'; 
function Header2 ({title = "" , teacher = "" , studentCont= "", academicYear = "" , src= ""}) {
  return(
    <div className='container mx-auto'>
      <div className='w-full h-[130px] bg-[#BFDBFE] rounded-[16px] flex justify-between'>
        <div className=' pt-4 pl-6'>
          <span className='lg:text-[24px] md:text-[23px] text-[16px]  font-semibold'>Kelas - {title}</span>
          <div className=" flex flex-col items-start space-y-1 mt-1 md:flex-row md:items-center md:space-y-0 md:space-x-4 md:mt-8 lg:space-x-8">
              <div className="flex items-center space-x-2">
                  <UserCheck2 size={20}/>
                  <span className='lg:text-[14px] md:text-[13px] text-[12px] text-center'>{teacher}</span>
              </div>
              <div className="flex items-center space-x-2">
                  <Users size={20}/>
                  <span className='lg:text-[14px] md:text-[13px] text-[12px] text-center'>{studentCont}</span>
              </div>
              <div className="flex items-center space-x-2">
                  <Calendar size={20}/>
                  <span className='lg:text-[14px] md:text-[13px] text-[12px] text-center'>{academicYear}</span>
              </div>
          </div>
        </div>
        <div className='lg:mt-2 md:mt-2 mt-4'>
          <img src={src} alt="" className='lg:w-[227px] lg:h-[130px] md:w-[227px] md:h-[130px] w-[160px] h-[110px]'/>
        </div>
      </div>
    </div>
  )
}

export default Header2;