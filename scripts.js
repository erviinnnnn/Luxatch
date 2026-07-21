document.addEventListener("DOMContentLoaded", function () {
    // Event listener untuk tombol tambah ke keranjang
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            alert('Produk telah ditambahkan ke keranjang!');
        });
    });

    // Event listener untuk tombol View More
    const viewMoreButton = document.querySelector('#view-more');
    const hiddenProducts = document.querySelectorAll('.product-item.hidden');

    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', () => {
            hiddenProducts.forEach(product => {
                product.classList.remove('hidden');
            });
            viewMoreButton.style.display = 'none';
        });

    }
});

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));
    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

function currentSlide(index) {
    slideIndex = index - 1;
    showSlide(slideIndex);
}

// Auto-slide tiap 4 detik
setInterval(() => {
    nextSlide();
}, 4000);

// Load pertama kali
showSlide(slideIndex);

function toggleMenu() {
    document.querySelector("nav ul").classList.toggle("show");
}





