<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid request data"]);
    exit;
}

$oldEmployeeId = $data["oldEmployeeId"] ?? $data["employeeid"] ?? "";
$employeeid = $data["employeeid"] ?? "";
$firstname = $data["firstname"] ?? "";
$middlename = $data["middlename"] ?? "";
$lastname = $data["lastname"] ?? "";

if ($oldEmployeeId === "" || $employeeid === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Employee ID is required"]);
    exit;
}

$sql = "UPDATE Employees SET employeeid = ?, firstname = ?, middlename = ?, lastname = ? WHERE employeeid = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to prepare update statement"]);
    exit;
}

$stmt->bind_param("sssss", $employeeid, $firstname, $middlename, $lastname, $oldEmployeeId);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Employee updated successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to update employee"]);
}
