import React from 'react';
import { useState } from 'react';

function LoadFamily({ employeeId, onAdded }) {
    return (
        <div className='flex flex-col gap-3'>
            <div className='w-full h-[11vh] bg-white rounded-lg shadow-lg flex justify-between px-5 py-2 items-center'>
                <div>
                    <p className='text-gray-500 text-[13px]'>Relationship: Father</p>
                    <p className='text-gray-500 text-[13px]'>Contact No.: 123-456-7890</p>
                    <p className='text-gray-500 text-[13px]'>Address: San Pedro</p>
                </div>
                <div>
                    <p className='text-gray-500 text-[13px]'>First Name: Paule</p>
                    <p className='text-gray-500 text-[13px]'>Middle Name: Dominguez</p>
                    <p className='text-gray-500 text-[13px]'>Last Name: Dela Rosa</p>
                    <p className='text-gray-500 text-[13px]'>Suffix: Jr.</p>
                </div>
                <button className='bg-blue-950 text-white rounded px-8 py-2 hover:bg-blue-900 transition-colors duration-300'>
                    Edit
                </button>
            </div>  
        </div>       
        
    )
}

export default LoadFamily;