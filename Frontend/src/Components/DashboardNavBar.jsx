import React from 'react'
import AmkorLogo from '../Images/amkorlogo.png'

function DashboardNavBar() {
    return (
        <div>
            <div className='bg-gray-100 h-[6vh] w-full flex items-center justify-between px-10 border-b border-gray-300'>
                <div className='flex items-center gap-3'>
                    <img src={AmkorLogo} alt="Logo" className='h-[4vh] object-contain' />
                    <p className='font-bold text-[15px]'>P3 Member Dependants</p>
                </div>
                <input 
                className='bg-gray-100 border-b border-gray-500 w-[35vh] p-1 font-bold placeholder:text-gray-500 text-[13px]' 
                placeholder='Search...' 
                />

                {/* Use Map Later on for profile pic and name */}
                <div className='gap-3 w-[20vh] h-[5vh] flex items-ceter justify-center'>
                    <div className='w-[15vh] h-full flex items-center justify-center'>
                        <p className='text-black font-bold text-[13px]'>Welcome Back, c23-0154-209</p>
                    </div>
                    <div className='bg-green-300 w-[6vh] h-full rounded-full'></div>
                </div>

                {/*  */}
            </div>
            <div className='w-full h-[3vh] flex items-center justify-center gap-3'>
                <div className='flex items-center gap-2'>
                    <p className='text-gray-500 text-[13px] font-bold underline'>Profile</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='text-gray-500 text-[13px] font-bold underline'>About</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardNavBar