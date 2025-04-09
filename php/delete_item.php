<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = (int)$_POST["id"];

    $sql = "DELETE FROM items WHERE id = $id";
    if (mysqli_query($conn, $sql)) {
        echo "Item berhasil dihapus";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
mysqli_close($conn);
?>