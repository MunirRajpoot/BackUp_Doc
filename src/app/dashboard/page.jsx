'use client';

import PatientSidebar from "@/component/PatientSidebar/PatientSidebar";


const Page = () => {
  
  return (
    <div className="flex text-white flex-col md:flex-row h-screen bg-[#0f172a]">
      <PatientSidebar/>
      <div className='h-screen w-full bg-[#0f172a] flex flex-col items-center justify-center'>
        {/* <img src="/Images/doctor.png" alt="Doctor" className='w-[300px] h-[300px]' /> */}
        <h1 className='text-2xl font-bold'>Welcome to the Dashboard</h1>
        <p className='text-sm text-gray-400'>Select a patient to get started</p>
      </div>
    </div>
  )
}

export default Page
