<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];

$relationship = $data["relationship"];
$status = $data["status"];
$firstname = $data["firstname"];
$middlename = $data["middlename"];
$lastname = $data["lastname"];
$suffix = $data["suffix"];
$contactno = $data["contactno"];
$address = $data["address"];

$sql = "UPDATE RelatedDependents
SET
relationship=?,
status=?,
firstname=?,
middlename=?,
lastname=?,
suffix=?,
contactno=?,
address=?
WHERE id=?";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssssssssi",
    $relationship,
    $status,
    $firstname,
    $middlename,
    $lastname,
    $suffix,
    $contactno,
    $address,
    $id
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Family member updated successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);

}

$stmt->close();
$conn->close();