import React, { useEffect, useState } from 'react';

function UpdateEmployee({ employee, onUpdated }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        employeeid: '',
        firstname: '',
        middlename: '',
        lastname: '',
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                employeeid: employee.id || '',
                firstname: employee.firstName || '',
                middlename: employee.middleName || '',
                lastname: employee.lastName || '',
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost/Amkor_DataEntry_System_2026/Backend/updateEmployee.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    oldEmployeeId: employee?.id || '',
                }),
                cache: 'no-store',
            });

            
            const data = await response.json();
            alert(data.message);

            if (data.success) {
                setShowModal(false);
                onUpdated?.();
                window.location.reload();
            }
        } catch (error) {
            console.error('Update failed:', error);
            alert('Update failed. Please check the backend and try again.');
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className='bg-orange-500 w-[10vh] h-[3vh] hover:bg-orange-700 text-white font-bold rounded'
            >
                Edit
            </button>

            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    className='fixed inset-0 flex items-center justify-center z-50 bg-black/20 bg-opacity-50'
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className='bg-white p-6 rounded shadow-lg w-[50vh] h-[60vh]'
                    >
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-lg font-bold'>Update Employee</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className='text-gray-500 hover:text-gray-700 border border-gray-300 rounded-full px-2'
                            >
                                Close
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <p>Employee ID</p>
                            <input
                                className='mb-5 bg-gray-100 border-b border-gray-500 w-full p-3'
                                placeholder='Enter Employee ID...'
                                name='employeeid'
                                value={formData.employeeid}
                                minLength={5}
                                maxLength={5}
                                onChange={handleChange}
                            />

                            <p>First Name</p>
                            <input
                                className='mb-5 bg-gray-100 border-b border-gray-500 w-full p-3'
                                placeholder='Enter First Name...'
                                name='firstname'
                                value={formData.firstname}
                                onChange={handleChange}
                            />

                            <p>Middle Name</p>
                            <input
                                className='mb-5 bg-gray-100 border-b border-gray-500 w-full p-3'
                                placeholder='Enter Middle Name...'
                                name='middlename'
                                value={formData.middlename}
                                onChange={handleChange}
                            />

                            <p>Last Name</p>
                            <input
                                className='mb-5 bg-gray-100 border-b border-gray-500 w-full p-3'
                                placeholder='Enter Last Name...'
                                name='lastname'
                                value={formData.lastname}
                                onChange={handleChange}
                            />

                            <button
                                type='submit'
                                className='bg-blue-950 w-full h-[45px] hover:bg-blue-900 text-white font-bold rounded'
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateEmployee;