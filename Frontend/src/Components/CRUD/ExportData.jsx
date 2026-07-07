import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportData() {

    const exportExcel = async () => {
        try {

            // Fetch employees
            const employees = await fetch(
                "http://localhost/Amkor_DataEntry_System_2026/Backend/getEmployees.php"
            ).then((res) => res.json());

            // Fetch family members
            const family = await fetch(
                "http://localhost/Amkor_DataEntry_System_2026/Backend/getAllFamily.php"
            ).then((res) => res.json());

            // Create workbook
            const workbook = XLSX.utils.book_new();

            // Employees sheet
            const employeeSheet = XLSX.utils.json_to_sheet(employees);
            XLSX.utils.book_append_sheet(workbook, employeeSheet, "Employees");

            // Family sheet
            const familySheet = XLSX.utils.json_to_sheet(family);
            XLSX.utils.book_append_sheet(workbook, familySheet, "Family Members");

            // Employee + Family sheet
            const joined = [];

            employees.forEach((emp) => {
                const members = family.filter(
                    (f) => f.employeeid === emp.id
                );

                if (members.length === 0) {
                    joined.push({
                        EmployeeID: emp.id,
                        Employee: `${emp.firstName} ${emp.middleName} ${emp.lastName} ${emp.suffix}`,
                        Relationship: "",
                        FamilyMember: "",
                        Contact: "",
                        Address: "",
                    });
                } else {
                    members.forEach((member) => {
                        joined.push({
                            EmployeeID: emp.id,
                            Employee: `${emp.firstName} ${emp.middleName} ${emp.lastName} ${emp.suffix}`,
                            Relationship: member.relationship,
                            FamilyMember: `${member.firstname} ${member.middlename} ${member.lastname} ${member.suffix}`,
                            Contact: member.contactno,
                            Address: member.address,
                        });
                    });
                }
            });

            const joinedSheet = XLSX.utils.json_to_sheet(joined);
            XLSX.utils.book_append_sheet(
                workbook,
                joinedSheet,
                "Employee & Family"
            );

            // Export
            const excelBuffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });

            const blob = new Blob([excelBuffer], {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            saveAs(blob, "Amkor_Employees.xlsx");

        } catch (error) {
            console.error(error);
            alert("Failed to export Excel.");
        }
    };

    return (
        <div>
            <button
                onClick={exportExcel}
                className="bg-green-500 border border-green-400 rounded py-1 px-4 hover:bg-green-400 transition-colors duration-300"
            >
                <p className="text-white font-bold text-[15px]">
                    Export Excel
                </p>
            </button>
        </div>
    );
}

export default ExportData;