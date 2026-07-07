import React, { useState } from "react";

function DeleteFamily({ member, onDeleted }) {
    const [showModal, setShowModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!member?.id) return;

        setIsDeleting(true);

        try {
            const response = await fetch(
                "http://localhost/Amkor_DataEntry_System_2026/Backend/deleteFamily.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: member.id }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setShowModal(false);
                onDeleted(member.id);
            } else {
                console.error("Failed to delete dependent:", data.message);
                alert(data.message || "Unable to delete dependent.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to connect to the server.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="bg-red-700 text-white rounded w-[10vh] h-[3vh] hover:bg-red-800 transition-colors duration-300 cursor-pointer"
            >
                Delete
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white w-[55vh] h-[15vh] rounded shadow-xl p-2">
                        <div className="flex justify-center items-center h-[4vh] border-b border-gray-300 py-3 mb-1">
                            <p className="text-[17px]">Delete Dependent</p>
                        </div>
                        <div className="h-[8vh] flex items-center justify-center flex-col gap-2">
                            <p className="text-[17px] text-gray-500">
                                ARE YOU SURE YOU WANT TO <span className="text-red-600">DELETE</span> THIS DEPENDENT?
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="bg-red-700 text-white rounded w-[10vh] h-[3vh] hover:bg-red-800 transition-colors duration-300 disabled:opacity-50"
                                >
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="border border-gray-400 rounded-full px-2 text-gray-500 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteFamily;