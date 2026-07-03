import React, { useEffect, useState } from "react";
import DeleteFamily from "./DeleteFamily";

function LoadFamily({ employeeId, refresh }) {
    const [data, setData] = useState([]);

    const loadFamily = async () => {
        if (!employeeId) return;

        try {
            const response = await fetch(
                `http://localhost/Amkor_DataEntry_System_2026/Backend/getFamily.php?employeeid=${employeeId}`,
                {
                    cache: "no-store",
                }
            );

            const result = await response.json();

            setData(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadFamily();
    }, [employeeId, refresh]);

    return (
        <div className="flex flex-col gap-3">
            {data.length === 0 ? (
                <div className="text-center text-gray-500">
                    No family members found.
                </div>
            ) : (
                data.map((member) => (
                    <div
                        key={member.id}
                        className="bg-white rounded shadow-lg p-2 h-[11vh] flex justify-between items-center"
                    >
                        <div>
                            <p className="text-gray-500 text-[13px] font-bold">Relationship: {member.relationship}</p>
                            <p className="text-gray-500 text-[13px] font-bold">Status: {member.status}</p>
                            <p className="text-gray-500 text-[13px] font-bold"> Contact: {member.contactno}</p>
                            <p className="text-gray-500 text-[13px] font-bold">Address: {member.address}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-[13px] font-bold">First Name: {member.firstname}</p>
                            <p className="text-gray-500 text-[13px] font-bold">Middle Name: {member.middlename}</p>
                            <p className="text-gray-500 text-[13px] font-bold">Last Name: {member.lastname}</p>
                            <p className="text-gray-500 text-[13px] font-bold">Suffix: {member.suffix}</p>
                        </div>

                        <button className="bg-blue-950 text-white rounded px-6 h-[5vh]">
                            Edit
                        </button>
                        <DeleteFamily/>
                    </div>
                ))
            )}
        </div>
    );
}

export default LoadFamily;