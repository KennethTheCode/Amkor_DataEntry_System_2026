import React from 'react'
import {useNavigate} from 'react-router-dom'
import AmkorLogo from '../Images/amkorlogo.png'


function Login() {
  const navigate = useNavigate()

  return (
    <div className='bg-white h-[65vh] w-[50vh] rounded-lg p-5 pt-8 flex flex-col items-center justify-center gap-5 shadow-xl'>
        <div className='h-auto flex flex-col items-center justify-center text-center gap-4'>
            <img src={AmkorLogo} alt="Logo" className='h-[9vh] object-contain' />
            <div> 
                <h1 className='font-bold text-sky-900 text-[30px]'>Welcome back!</h1>
                <h1 className='font-bold text-[14px]'>Please Log in to your account.</h1>
            </div>
        </div>
        <form className='flex flex-col'>
            <p className='font-bold text-[14px] mb-2'>Username:</p>
            <input className='mb-5 bg-gray-100 border-b border-gray-500 w-[35vh] p-3 px-2 placeholder:text-gray-500 text-[13px]'
            placeholder='Enter Username...'
            type='name'></input>

            <p className='font-bold text-[14px] mb-2'>Password:</p>
            <input className='mb-5 bg-gray-100 border-b border-gray-500 w-[35vh] p-3 px-2 placeholder:text-gray-500 text-[13px]'
            placeholder='Enter Password...'
            type='password'></input>

            <button className='bg-blue-950 h-[4vh] hover:bg-blue-900 duration-300 transition-colors'>
                <p className='text-white font-bold ' onClick={() => navigate('/dashboard')}> Login</p>
            </button>
        </form>
        <div className='flex w-[77%]'>
            <p className='text-sky-500 underline text-[12px] hover:text-sky-700 duration-300 transition-colors'>Having trouble Signing up?</p>
        </div>
    </div>
  )
}

export default Login