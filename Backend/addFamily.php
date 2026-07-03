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

$employeeid = isset($data["employeeid"]) ? (int)$data["employeeid"] : 0;
$relationship = $data["relationship"] ?? "";
$firstname = $data["firstname"] ?? "";
$middlename = $data["middlename"] ?? "";
$lastname = $data["lastname"] ?? "";
$suffix = $data["suffix"] ?? "";
$contactno = isset($data["contactno"]) && $data["contactno"] !== "" ? (int)$data["contactno"] : 0;
$address = $data["address"] ?? "";

$sql = "INSERT INTO RelatedDependents
(employeeid, relationship, firstname, middlename, lastname, suffix, contactno, address)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "isssssss",
    $employeeid,
    $relationship,
    $firstname,
    $middlename,
    $lastname,
    $suffix,
    $contactno,
    $address
);

if($stmt->execute()){
    echo json_encode([
        "success"=>true,
        "message"=>"Employee Added Successfully"
    ]);
}else{
    echo json_encode([
        "success"=>false,
        "message"=>"Failed to Add Employee: " . $stmt->error
    ]);
}