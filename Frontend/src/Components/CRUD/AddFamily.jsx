import React from 'react';
import { useState } from 'react';
import LoadFamily from './LoadFamily';

function AddFamily({ employeeId, onAdded }) {
    const [showModal, setShowModal] = useState(false);
            
    return (
        <div>

            <button onClick={() => setShowModal(true)}
            className='bg-red-900 text-white rounded w-[10vh] hover:bg-red-950 transition-colors duration-300' >
                +
            </button>
            {showModal && (
                <div className='fixed inset-0 bg-black/20 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded shadow-lg w-[130vh] h-[80vh]'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-lg font-bold'>Add Immediate Family Member</h2>
                            <button onClick={() => setShowModal(false)} className='text-gray-500 hover:text-gray-700 border border-gray-300 rounded-full px-2'>
                                Close
                            </button>
                        </div>
                        <div className='w-full h-[45vh] flex flex-col gap-1'>
                            <div className='border border-gray-300 rounded  w-full flex justify-between px-5 py-1 items-center'>
                                <p className='text-[13px] text-gray-400 font-bold'>Employee ID:12345</p>
                                <p className='text-[13px] text-gray-400 font-bold'>First name: Paule Kenneth</p>                                                                
                                <p className='text-[13px] text-gray-400 font-bold'>Middle Name: Dominguez</p>
                                <p className='text-[13px] text-gray-400 font-bold'>Last Name: Dela Rosa</p>
                            </div>

                            {/* Family Member Data */}
                            <div className='bg-gray-100 w-full h-full p-2 '>
                                <div className='w-full h-[40vh] overflow-y-auto'>
                                    <LoadFamily employeeId={employeeId} onAdded={onAdded} />
                                </div>
                            </div>
                        </div>

                        {/* Family Member Form */}
                        <div className='w-full h-40 flex  items-center gap-3 '>
                            <form className='grid grid-cols-4 gap-5'>
                                <div className='flex flex-col text-gray-500'>
                                    <p>Relationship</p>
                                    <select
                                        name="relationship"
                                        className="bg-gray-100 border-b border-gray-500 w-[30vh] p-1">
                                        <option className='text-gray-100' value="">Select Relationship</option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Brother">Brother</option>
                                        <option value="Sister">Sister</option>
                                        <option value="Spouse">Spouse</option>
                                        <option value="Child">Child</option>
                                    </select>
                                </div>
                                <div className='flex flex-col'>
                                    <p>First Name</p>
                                    <input
                                        className='mb-1 bg-gray-100 border-b border-gray-500 w-[30vh] p-1'
                                        placeholder='Enter first name...'/>    
                                </div>
                                <div className='flex flex-col'>
                                    <p>Middle Name</p>
                                    <input
                                        className='mb-1 bg-gray-100 border-b border-gray-500 w-[30vh] p-1'
                                        placeholder='Enter middle name...'/>    
                                </div>
                                <div className='flex flex-col'>
                                    <p>Last Name</p>
                                    <input
                                        className='mb-1 bg-gray-100 border-b border-gray-500 w-[30vh] p-1'
                                        placeholder='Enter last name...'/>    
                                </div>
                                <div className="flex flex-col text-gray-500">
                                <p className="text-black">Suffix</p>

                                <select
                                    name="suffix"
                                    className="bg-gray-100 border-b border-gray-500 w-[30vh] p-1">
                                    <option className='text-gray-100' value="">Select Suffix</option>
                                    <option value="Jr.">Jr.</option>
                                    <option value="Sr.">Sr.</option>
                                    <option value="II">II</option>
                                    <option value="III">III</option>
                                    <option value="IV">IV</option>
                                    <option value="V">V</option>
                                </select>
                                </div>
                                <div className='flex flex-col'>
                                    <p>Contact No.</p>
                                    <input
                                        maxLength={11}
                                        minLength={11}
                                        className='mb-1 bg-gray-100 border-b border-gray-500 w-[30vh] p-1'
                                        placeholder='Enter contact number...'/>   
                                </div>
                                <div className='flex w-[62vh] items-center  justify-center rounded gap-4'>
                                    <div className='flex flex-col'>
                                    <p>Address</p>
                                    <input
                                            className='mb-1 bg-gray-100 border-b border-gray-500 w-[30vh] p-1'
                                            placeholder='Enter address...'/>    
                                    </div>
                                    <button className='bg-blue-950 w-full h-full hover:bg-blue-900 text-white font-bold rounded'>
                                        Save
                                    </button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddFamily;