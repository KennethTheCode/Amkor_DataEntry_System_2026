<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";

$sql = "SELECT employeeid, firstname, middlename, lastname FROM Employees";
$result = $conn->query($sql);

$employees = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $employees[] = [
            'id' => $row['employeeid'],
            'firstName' => $row['firstname'],
            'middleName' => $row['middlename'],
            'lastName' => $row['lastname'],
        ];
    }
}

echo json_encode($employees);
