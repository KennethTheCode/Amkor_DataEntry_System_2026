import React, { useState } from "react";

function AddEmployee() {
    const [employee, setEmployee] = useState({
        employeeid: "",
        firstname: "",
        middlename: "",
        lastname: "",
        suffix: "",
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee.firstname || !employee.middlename || !employee.lastname || !employee.suffix) {
        alert("All fields are required.");
        return;
    }

    try {
        const response = await fetch(
            "http://localhost/Amkor_DataEntry_System_2026/Backend/addEmployee.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employee),
            }
        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {
            setEmployee({
                employeeid: "",
                firstname: "",
                middlename: "",
                lastname: "",
                suffix: "",
            });

            window.location.reload();
        } else {
            console.error("Failed to add employee:", data.message);
        }
    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
};

    return (
        <div className="bg-gray-200 rounded-xl shadow-xl h-[85vh] w-[55vh] p-4">
            <form onSubmit={handleSubmit}>
                <p className="font-bold text-[18px] mb-5">Employees Form</p>

                <p>Employee ID</p>
                <input
                    className="mb-5 bg-gray-100 border-b border-gray-500 w-full p-3"
                    placeholder="Enter Employee ID..."
                    name="employeeid"
                    minLength={5}
                    maxLength={5}
                    value={employee.employeeid}
                    onChange={handleChange}
                />

                <p>First Name</p>
                <input
                    className="mb-5 bg-gray-100 border-b border-gray-500 w-full p-3"
                    placeholder="Enter First Name..."
                    name="firstname"
                    value={employee.firstname}
                    onChange={handleChange}
                />

                <p>Middle Name</p>
                <input
                    className="mb-5 bg-gray-100 border-b border-gray-500 w-full p-3"
                    placeholder="Enter Middle Name..."
                    name="middlename"
                    value={employee.middlename}
                    onChange={handleChange}
                />

                <p>Last Name</p>
                <input
                    className="mb-5 bg-gray-100 border-b border-gray-500 w-full p-3"
                    placeholder="Enter Last Name..."
                    name="lastname"
                    value={employee.lastname}
                    onChange={handleChange}
                />

                <p>Suffix</p>
                <select
                    className="mb-5 bg-gray-100 border-b border-gray-500 w-full p-3"
                    placeholder="Enter Suffix..."
                    name="suffix"
                    value={employee.suffix}
                    onChange={handleChange} >
                
                    <option className='text-gray-100' value="">Select Suffix</option>
                    <option value="Jr.">Jr.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-950 w-full h-[45px] hover:bg-blue-900 text-white font-bold rounded"
                >
                    Submit
                </button>
                

                
            </form>
        </div>
    );
}

export default AddEmployee;