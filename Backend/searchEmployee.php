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

// Get JSON data from React
$data = json_decode(file_get_contents("php://input"), true);

$keyword = trim($data["keyword"] ?? "");

// If search is empty, return all employees
if ($keyword == "") {
    $sql = "SELECT employeeid, firstname, middlename, lastname, suffix
            FROM Employees
            ORDER BY employeeid ASC";

    $result = $conn->query($sql);

} else {

    $search = "%" . $keyword . "%";

    $sql = "SELECT employeeid, firstname, middlename, lastname, suffix
            FROM Employees
            WHERE employeeid LIKE ?
               OR firstname LIKE ?
               OR middlename LIKE ?
               OR lastname LIKE ?
            ORDER BY employeeid ASC";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "ssss",
        $search,
        $search,
        $search,
        $search
    );

    $stmt->execute();
    $result = $stmt->get_result();
}

$employees = [];

while ($row = $result->fetch_assoc()) {
    $employees[] = [
        "id" => $row["employeeid"],
        "firstName" => $row["firstname"],
        "middleName" => $row["middlename"],
        "lastName" => $row["lastname"],
        "suffix" => $row["suffix"]
    ];
}

echo json_encode($employees);

$conn->close();

?>