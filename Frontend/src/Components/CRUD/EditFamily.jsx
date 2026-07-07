import React, { useEffect, useState } from "react";

function EditFamily({ member, onUpdated }) {
    const [showModal, setShowModal] = useState(false);

    const [family, setFamily] = useState({
        id: "",
        relationship: "",
        status: "",
        firstname: "",
        middlename: "",
        lastname: "",
        suffix: "",
        contactno: "",
        address: ""
    });

    useEffect(() => {
        if (member) {
            setFamily(member);
        }
    }, [member]);

    const handleChange = (e) => {
        setFamily({
            ...family,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost/Amkor_DataEntry_System_2026/Backend/editFamily.php",
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
                setShowModal(false);
                onUpdated?.();
            }

        } catch (error) {
            console.error(error);
            alert("Unable to connect.");
        }
    };

    return (
        <div>

            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-950 text-white rounded w-[10vh] h-[3vh] hover:bg-blue-800 duration-300 transition-colors cursor-pointer"
            >
                Edit
            </button>

            {showModal && (

                <div className="bg-black/20 fixed inset-0 flex items-center justify-center">

                    <div className="bg-white h-[29vh] w-[80vh] rounded shadow-lg p-3">

                        <div className="h-[4vh] flex items-center justify-between border-b border-gray-400">

                            <p className="text-[18px]">
                                Edit Family Member
                            </p>

                            <button
                                onClick={() => setShowModal(false)}
                                className="border rounded-full px-2"
                            >
                                Close
                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="text-gray-500 py-5 grid grid-cols-4 gap-3"
                        >

                            <div>

                                <p>Relationship</p>

                                <select
                                    name="relationship"
                                    value={family.relationship}
                                    onChange={handleChange}
                                    className="bg-gray-100 border-b p-1 w-[17vh]"
                                >
                                    <option value="">Select</option>
                                    <option>Father</option>
                                    <option>Mother</option>
                                    <option>Brother</option>
                                    <option>Sister</option>
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
                                    className="bg-gray-100 border-b p-1 w-[17vh]"
                                >
                                    <option value="">Select</option>
                                    <option>Alive</option>
                                    <option>Deceased</option>
                                </select>

                            </div>

                            <div>

                                <p>First Name</p>

                                <input
                                    name="firstname"
                                    value={family.firstname}
                                    onChange={handleChange}
                                    className="border-b w-[17vh] p-1 bg-gray-100"
                                />

                            </div>

                            <div>

                                <p>Middle Name</p>

                                <input
                                    name="middlename"
                                    value={family.middlename}
                                    onChange={handleChange}
                                    className="border-b w-[17vh] p-1 bg-gray-100"
                                />

                            </div>

                            <div>

                                <p>Last Name</p>

                                <input
                                    name="lastname"
                                    value={family.lastname}
                                    onChange={handleChange}
                                    className="border-b w-[17vh] p-1 bg-gray-100"
                                />

                            </div>

                            <div>

                                <p>Suffix</p>

                                <select
                                    name="suffix"
                                    value={family.suffix}
                                    onChange={handleChange}
                                    className="bg-gray-100 border-b p-1 w-[17vh]"
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
                                    className="border-b w-[17vh] p-1 bg-gray-100"
                                />

                            </div>

                            <div>

                                <p>Address</p>

                                <input
                                    name="address"
                                    value={family.address}
                                    onChange={handleChange}
                                    className="border-b w-[17vh] p-1 bg-gray-100"
                                />

                            </div>

                            <button
                                type="submit"
                                className="bg-blue-950 w-[76vh] py-3 text-white"
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

export default EditFamily;