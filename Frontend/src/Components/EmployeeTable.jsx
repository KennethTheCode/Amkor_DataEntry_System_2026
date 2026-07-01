import React, { useEffect, useState } from 'react'
import AmkorLogo from '../Images/amkorlogo.png'

function EmployeeTable({ employees = null }) {
    const [data, setData] = useState(Array.isArray(employees) ? employees : []);

    const sampleData = [
        {
            id: 'c23-0154-209',
            firstName: 'Paule Kenneth',
            middleName: 'Dominguez',
            lastName: 'Dela Rosa',
        },
    ];

    // Configure backend URL — adjust if your Apache serves the project under a different path
    const BACKEND_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_URL) || 'http://localhost/Amkor_DataEntry_System_2026/Backend/getEmployees.php';

    useEffect(() => {
        if (Array.isArray(employees) && employees.length) {
            setData(employees);
            return;
        }

        fetch(BACKEND_URL)
            .then((res) => res.json())
            .then((json) => {
                if (Array.isArray(json)) setData(json);
            })
            .catch((err) => console.error('Failed to fetch employees', err));
    }, [employees]);

    const list = data.length ? data : sampleData;

    return (
        <div className='p-3 bg-white shadow-xl border border-gray-200 h-[85vh] w-[90%] rounded-r rounded-xl overflow-y-auto flex flex-col gap-3'>
            {list.map((emp) => (
                <div key={emp.id} className='bg-gray-100 rounded-t rounded-lg w-full p-2 px-3 flex justify-between hover:bg-gray-200 cursor-pointer duration-300 transition-colors'>
                    <div className='flex gap-3'>
                        <div className=''>
                            <p className='font-bold text-[15px]'>{`${emp.firstName} ${emp.middleName} ${emp.lastName}`}</p>
                            <div className='pl-0'>
                                <p className='text-[13px] text-gray-500 font-bold'>First name: {emp.firstName}</p>
                                <p className='text-[13px] text-gray-500 font-bold'>Middle Name: {emp.middleName}</p>
                                <p className='text-[13px] text-gray-500 font-bold'>Last name: {emp.lastName}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-[12px] font-bold text-gray-500'>ID: {emp.id}</p>
                        <div>
                            <button className='bg-orange-500 w-[10vh] h-[3vh] hover:bg-orange-700 text-white font-bold rounded'>
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EmployeeTable