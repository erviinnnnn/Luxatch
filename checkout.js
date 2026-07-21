document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".item-checkbox");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");
    const paymentDetails = document.getElementById("payment-details");
    const finalPriceElement = document.getElementById("final-price");

    function updateTotalPrice() {
        let total = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseInt(checkbox.dataset.price);
            }
        });
        totalPriceElement.textContent = `Rp${total.toLocaleString("id-ID")}`;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateTotalPrice);
    });

    checkoutButton.addEventListener("click", function () {
        let total = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseInt(checkbox.dataset.price);
            }
        });

        if (total > 0) {
            finalPriceElement.textContent = `Rp${total.toLocaleString("id-ID")}`;
            paymentDetails.classList.remove("hidden");
        } else {
            alert("Pilih minimal satu produk untuk checkout.");
        }
    });
});
