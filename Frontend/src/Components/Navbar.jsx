import React from 'react'
import AmkorLogo from '../Images/amkorlogo.png'

function Navbar() {
    return (
        <div className='h-[6vh]  mb-[8vh] w-full flex items-center justify-between px-10 border-b border-gray-300'>
            <img src={AmkorLogo} alt="Logo" className='h-[4vh] object-contain' />
        </div>
    )
    }

export default Navbar