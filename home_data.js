let list = document.querySelector('.container-ass');


    let products = [
          { id: 9, image: './image/jam8.jpg',
            name: 'Rolex Submariner',
            jenis3: "Rolex",price: 300000,
            ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg']},

          { id: 10,
            image: './image/jam9.jpg',
            name: 'Guess Horizon',
            jenis3: "Guess",
            price: 120000,
            ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg']},

          { id: 11,
            image: './image/jam12.jpg',
            name: 'Elizabeth Classic',
            jenis3: "Elizabeth",
            price: 360000,
            ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg'] },

          { id: 12,
            image: './image/jam11.jpeg',
            name: 'Alexander Christie 9205',
            jenis3: "Alexander Christie",
            price: 380000,
            ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg'] },
    ];



    function initApp2() {
        products.forEach(value => {
            let newDiv = document.createElement('div');
            newDiv.classList.add('product-card', 'openModal');
            newDiv.setAttribute("data-id", value.id); // Tambahkan atribut data-id
            newDiv.innerHTML = `
                <span class="label">Terlaris</span>
                <img src="${value.image}" alt="${value.name}">
                <h2>${value.name}</h2>
                ${value.jenis3 ? `<p class="jenis3" style="color:white; font-size: 12px;">${value.jenis3}</p>` : ""}
                <p class="price">Rp${value.price.toLocaleString()}
                    <span class="old-price">Rp1.129.000</span>
                </p>
                <div class="rating-container">
                    <div class="rating">★★★★★ (864)</div>
                    <button class="wishlist">❤</button>
                </div>
            `;
            list.appendChild(newDiv);
        });
    }

    initApp2();


    document.addEventListener("DOMContentLoaded", function() {
        const modal = document.getElementById("productModal");
        const openModalButtons = document.querySelectorAll(".openModal");
        const closeModal = document.querySelector(".close");
        const modalImage = document.getElementById("modalImage");
        const modalTitle = document.getElementById("modalTitle");
        const modalPrice = document.getElementById("modalPrice");
        const thumbnailContainer = document.getElementById("thumbnail-container");

        openModalButtons.forEach(button => {
            button.addEventListener("click", function() {
                const productId = this.getAttribute("data-id");
                const product = products.find(p => p.id == productId);

                if (product) {
                    // Update gambar utama
                    modalImage.src = product.image;
                    modalImage.alt = product.name;

                    // Update judul dan harga
                    modalTitle.textContent = product.name;
                    modalPrice.textContent = `Rp${product.price.toLocaleString()}`;

                    // Kosongkan thumbnail-container
                    thumbnailContainer.innerHTML = "";

                    // Masukkan ExtraImage sebagai thumbnail
                    if (product.ExtraImage) {
                        product.ExtraImage.forEach(imgSrc => {
                            let thumb = document.createElement("img");
                            thumb.src = imgSrc;
                            thumb.classList.add("thumbnail");
                            thumb.addEventListener("click", function() {
                                modalImage.src = imgSrc;
                            });
                            thumbnailContainer.appendChild(thumb);
                        });
                    }

                    // Tampilkan modal
                    modal.style.display = "flex";
                }
            });
        });

        // Tutup modal saat tombol close diklik
        if (closeModal) {
            closeModal.addEventListener("click", function() {
                modal.style.display = "none";
            });
        }

        // Tutup modal saat klik di luar area modal
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });

    
        function toggleMenu() {
        document.querySelector("nav ul").classList.toggle("show");
        }
