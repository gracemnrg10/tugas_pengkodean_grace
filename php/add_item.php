<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $quantity = (int)$_POST["quantity"];
    $price = (int)$_POST["price"];

    $sql = "INSERT INTO items (name, quantity, price) VALUES ('$name', $quantity, $price)";
    if (mysqli_query($conn, $sql)) {
        echo "Item berhasil ditambahkan";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
mysqli_close($conn);
?>