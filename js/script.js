document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#inventory-table-body");
 
   
    // Fungsi untuk load data dari database
    function loadItems() {
        fetch("php/get_items.php")
            .then(response => response.json())
            .then(data => {
                tableBody.innerHTML = "";
                data.forEach(item => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
						<td>${parseFloat(item.price).toLocaleString('id-ID', { minimumFractionDigits: 2 })}</td>
                        <td><button class="delete-btn" onclick="deleteProduct(${item.id})">Hapus</button></td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching items:", error));
    }

    // Load data saat halaman dibuka
    loadItems();

    // Fungsi tambah produk
    window.addProduct = function () {
        const productName = document.getElementById("product-name").value.trim();
        const productQuantity = document.getElementById("product-quantity").value.trim();
        const productPrice = document.getElementById("product-price").value.trim();

        if (productName && productQuantity && productPrice) {
            fetch("php/add_item.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `name=${productName}&quantity=${productQuantity}&price=${productPrice}`
            })
            .then(response => response.text())
            .then(() => {
                document.getElementById("inventory-form").reset();
                loadItems(); // Refresh tabel
            })
            .catch(error => console.error("Error adding item:", error));
        } else {
            alert("Mohon isi semua data sebelum menambahkan.");
        }
    };

    // Fungsi hapus produk
    window.deleteProduct = function (id) {
        if (confirm("Yakin ingin menghapus item ini?")) {
            fetch("php/delete_item.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `id=${id}`
            })
            .then(() => loadItems()) // Refresh tabel
            .catch(error => console.error("Error deleting item:", error));
        }
    };
});