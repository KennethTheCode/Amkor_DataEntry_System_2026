import React, { useEffect, useRef, useState } from "react";

function SearchBar({ onSearch }) {
    const [keyword, setKeyword] = useState("");
    const debounceRef = useRef(null);

    const doSearch = async (value) => {
        try {
            const response = await fetch(
                "http://localhost/Amkor_DataEntry_System_2026/Backend/searchEmployee.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ keyword: value }),
                }
            );

            const data = await response.json();
            onSearch(data);
        } catch (error) {
            console.error(error);
            alert("Unable to connect");
        }
    };

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            doSearch(keyword);
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [keyword]);

    return (
        <div className="mb-2 sticky top-0 z-50">
            <div className="flex flex-col">
                <input
                    type="text"
                    name="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                    className="bg-gray-200 border-b border-gray-500 p-[4px] font-bold shadow-xl placeholder:text-gray-500 text-[13px] rounded-t"
                    placeholder="Search Employee ID or Name..."
                />

            </div>
        </div>
    );
}

export default SearchBar;