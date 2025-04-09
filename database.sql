CREATE DATABASE harmonia_inventory;

USE harmonia_inventory;

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL
);