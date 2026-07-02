<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$employeeid = $data["employeeid"];
$firstname = $data["firstname"];
$middlename = $data["middlename"];
$lastname = $data["lastname"];

$sql = "INSERT INTO Employees
(employeeid, firstname, middlename, lastname)
VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssss",
    $employeeid,
    $firstname,
    $middlename,
    $lastname
);

if($stmt->execute()){
    echo json_encode([
        "success"=>true,
        "message"=>"Employee Added Successfully"
    ]);
}else{
    echo json_encode([
        "success"=>false,
        "message"=>"Failed to Add Employee"
    ]);
}