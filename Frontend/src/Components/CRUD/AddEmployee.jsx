import React, { useState } from "react";

function AddEmployee() {
    const [employee, setEmployee] = useState({
        employeeid: "",
        firstname: "",
        middlename: "",
        lastname: "",
    });

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Employee ID
    if (!/^\d{10}$/.test(employee.employeeid)) {
        alert("Employee ID must be exactly 10 digits.");
        return;
    }

    if (!employee.firstname || !employee.middlename || !employee.lastname) {
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