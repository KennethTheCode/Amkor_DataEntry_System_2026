<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include "db.php";

$employeeid = $_GET['employeeid'] ?? "";

$sql = "SELECT
            id,
            employeeid,
            firstname,
            middlename,
            lastname,
            suffix,
            relationship,
            contactno,
            address
        FROM RelatedDependents
        WHERE employeeid = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $employeeid);
$stmt->execute();

$result = $stmt->get_result();

$family = [];

while ($row = $result->fetch_assoc()) {
    $family[] = [
        "id" => $row["id"],
        "employeeid" => $row["employeeid"],
        "firstname" => $row["firstname"],
        "middlename" => $row["middlename"],
        "lastname" => $row["lastname"],
        "suffix" => $row["suffix"],
        "relationship" => $row["relationship"],
        "contactno" => $row["contactno"],
        "address" => $row["address"]
    ];
}

echo json_encode($family);