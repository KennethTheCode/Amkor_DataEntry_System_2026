<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$sql = "SELECT *
        FROM RelatedDependents
        ORDER BY employeeid";

$result = $conn->query($sql);

$family = [];

while($row = $result->fetch_assoc()){

    $family[] = [
        "employeeid"=>$row["employeeid"],
        "relationship"=>$row["relationship"],
        "status"=>$row["status"],
        "firstname"=>$row["firstname"],
        "middlename"=>$row["middlename"],
        "lastname"=>$row["lastname"],
        "suffix"=>$row["suffix"],
        "contactno"=>$row["contactno"],
        "address"=>$row["address"]
    ];

}

echo json_encode($family);