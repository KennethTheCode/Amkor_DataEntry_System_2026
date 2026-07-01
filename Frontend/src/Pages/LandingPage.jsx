import React from 'react'
import Login from '../Components/Login'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import AmkorPoster from '../Images/AmkorPoster.png'


function LandingPage() {
  return (
    <div className='bg-gray-100 flex flex-col items-center  h-screen gap-5'>
        <Navbar/>
        <div className='flex '>
                <div className='h-[65vh] w-[75vh] flex items-center justify-center '>
                <img src={AmkorPoster} alt="Logo" className='h-auto object-contain' />
            </div>
            <Login/>
        </div>
        <Footer/>
    </div>
  )
}

export default LandingPage