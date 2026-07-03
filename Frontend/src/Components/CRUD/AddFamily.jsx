import React, { useState, useEffect } from "react";
import LoadFamily from "./LoadFamily";

function AddFamily({ employee, onAdded }) {
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const [family, setFamily] = useState({
        employeeid: employee?.id || "",
        firstname: "",
        middlename: "",
        lastname: "",
        suffix: "",
        relationship: "",
        status:"",
        contactno: "",
        address: "",
    });

    useEffect(() => {
        setFamily((prev) => ({
            ...prev,
            employeeid: employee?.id || "",
        }));
    }, [employee]);

    const handleChange = (e) => {
        setFamily({
            ...family,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !family.relationship ||
            !family.firstname ||
            !family.lastname
        ) {
            alert("Relationship, First Name and Last Name are required.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost/Amkor_DataEntry_System_2026/Backend/addFamily.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(family),
                }
            );

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                setFamily({
                    employeeid: employee?.id || "",
                    firstname: "",
                    middlename: "",
                    lastname: "",
                    suffix: "",
                    relationship: "",
                    status:"",
                    contactno: "",
                    address: "",
                });

                setRefresh((prev) => prev + 1);

                onAdded?.();
            }
        } catch (error) {
            console.error(error);
            alert("Unable to connect to the server.");
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-red-900 text-white rounded w-[10vh] hover:bg-red-950"
            >
                +
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[130vh] h-[80vh]">

                        <div className="flex justify-between mb-4">
                            <h2 className="font-bold text-lg">
                                Add Immediate Family Member
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="border rounded-full px-2"
                            >
                                Close
                            </button>
                        </div>

                        <div className="border border-gray-300 rounded p-3 flex justify-between mb-2">
                            <p className="text-gray-600 font-bold text-[14px]">Employee ID: {employee?.id}</p>
                            <p className="text-gray-600 font-bold text-[14px]">First Name: {employee?.firstName}</p>
                            <p className="text-gray-600 font-bold text-[14px]">Middle Name: {employee?.middleName}</p>
                            <p className="text-gray-600 font-bold text-[14px]">Last Name: {employee?.lastName}</p>
                        </div>

                        <div className="bg-gray-100 h-[40vh] overflow-y-auto p-2 rounded">

                            <LoadFamily
                                employeeId={employee?.id}
                                refresh={refresh}
                            />

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-4 gap-4 mt-4">
                            <div>
                                <p>Relationship</p>

                                <select
                                    name="relationship"
                                    value={family.relationship}
                                    onChange={handleChange}
                                    className="w-full border-b p-1">
                                    <option value="">Select</option>
                                    <option>Father</option>
                                    <option>Mother</option>
                                    <option>Sibling</option>
                                    <option>Spouse</option>
                                    <option>Child</option>
                                </select>
                            </div>

                            <div>
                                <p>Status</p>

                                <select
                                    name="status"
                                    value={family.status}
                                    onChange={handleChange}
                                    className="w-full border-b p-1">
                                    <option value="">Select</option>
                                    <option value="Deceased">Deceased</option>
                                    <option value="Alive">Alive</option>
                                </select>
                            </div>

                            <div>
                                <p>First Name</p>

                                <input
                                    name="firstname"
                                    value={family.firstname}
                                    onChange={handleChange}
                                    className="w-full border-b p-1"
                                />
                            </div>

                            <div>
                                <p>Middle Name</p>

                                <input
                                    name="middlename"
                                    value={family.middlename}
                                    onChange={handleChange}
                                    className="w-full border-b p-1"
                                />
                            </div>

                            <div>
                                <p>Last Name</p>

                                <input
                                    name="lastname"
                                    value={family.lastname}
                                    onChange={handleChange}
                                    className="w-full border-b p-1"
                                />
                            </div>

                            <div>
                                <p>Suffix</p>

                                <select
                                    name="suffix"
                                    value={family.suffix}
                                    onChange={handleChange}
                                    className="w-full border-b p-1"
                                >
                                    <option value="">Select</option>
                                    <option>Jr.</option>
                                    <option>Sr.</option>
                                    <option>II</option>
                                    <option>III</option>
                                    <option>IV</option>
                                    <option>V</option>
                                </select>
                            </div>

                            <div>
                                <p>Contact No.</p>

                                <input
                                    name="contactno"
                                    value={family.contactno}
                                    onChange={handleChange}
                                    className="w-full border-b p-1"
                                />
                            </div>

                            <div>
                                <p>Address</p>

                                <input
                                    name="address"
                                    value={family.address}
                                    onChange={handleChange}
                                    className="w-full border-b p-1"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-950 w-[125vh] py-3 text-white rounded hover:bg-blue-900 transition-colors duration-300"
                            >
                                Save
                            </button>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}

export default AddFamily;