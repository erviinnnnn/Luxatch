let list = document.querySelector('.container-ass');
let cart = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let body = document.querySelector('body');
cart.addEventListener('click', ()=>{
    body.classList.add('active'); //ketika class .shopping di klik maka body/tubuh akan memiliki class = "active"
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');//ketika class .shopping di klik maka class = "active" pada tubuh akan dihapus
})


    let productsX = [
        { id: 1, image: './image/jam8.jpg',
          name: 'Rolex Submariner',
          jenis3: "Rolex",price: 300000,
          ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg']},

        { id: 2,
          image: './image/jam9.jpg',
          name: 'Guess Horizon',
          jenis3: "Guess",
          price: 120000,
          ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg']},

        { id: 3,
          image: './image/jam12.jpg',
          name: 'Elizabeth Classic',
          jenis3: "Elizabeth",
          price: 360000,
          ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg'] },

        { id: 4,
          image: './image/jam11.jpeg',
          name: 'Alexander Christie 9205',
          jenis3: "Alexander Christie",
          price: 380000,
          ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg'] },

        { id: 5,
          image: './image/jam8.jpg',
          name: 'Rolex Submariner',
          jenis3: "Rolex",
          price: 400000,
          ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg'] },

        { id: 6,
          image: './image/jam9.jpg',
          name: 'Guess Horizon',
          jenis3: "Guess",
          price: 500000,
          ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg'] },

        { id: 7,
          image: './image/jam12.jpg',
          name: 'Elizabeth Classic',
          jenis3: "Elizabeth",
          price: 600000,
          ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg'] },

        { id: 8,
          image: './image/jam11.jpeg',
          name: 'Alexander Christie 9205',
          jenis3: "Alexander Christie",
          price: 700000,
          ExtraImage:['./image/jam8.jpg','./image/jam9.jpg','./image/jam12.jpg','./image/jam11.jpeg'] },
    ];



    function initApp() {
        productsX.forEach(value => {
            let newDiv = document.createElement('div');
            newDiv.classList.add('product-card', 'openModal');
            newDiv.setAttribute("data-id", value.id); // Tambahkan atribut data-id
            newDiv.innerHTML = `
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

    initApp();


    function toggleMenu() {
    document.querySelector("nav ul").classList.toggle("show");
    }


    document.addEventListener("DOMContentLoaded", function () {
        const modal = document.getElementById("productModal");
        const openModalButtons = document.querySelectorAll(".openModal");
        const closeModal = document.querySelector(".close");
        const modalImage = document.getElementById("modalImage");
        const modalTitle = document.getElementById("modalTitle");
        const modalPrice = document.getElementById("modalPrice");
        const thumbnailContainer = document.getElementById("thumbnail-container");
        const addToCartButton = document.getElementById("addToCartButton");
    
        let listCards = JSON.parse(localStorage.getItem("cartData")) || {}; // Ambil data keranjang dari localStorage
    
        // ✅ 1. Event untuk membuka modal produk
        openModalButtons.forEach(button => {
            button.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                const product = productsX.find(p => p.id == productId);
    
                if (product) {
                    modalImage.src = product.image;
                    modalImage.alt = product.name;
                    modalTitle.textContent = product.name;
                    modalPrice.textContent = `Rp${product.price.toLocaleString()}`;
    
                    thumbnailContainer.innerHTML = "";
                    if (product.ExtraImage) {
                        product.ExtraImage.forEach(imgSrc => {
                            let thumb = document.createElement("img");
                            thumb.src = imgSrc;
                            thumb.classList.add("thumbnail");
                            thumb.addEventListener("click", function () {
                                modalImage.src = imgSrc;
                            });
                            thumbnailContainer.appendChild(thumb);
                        });
                    }
    
                    addToCartButton.onclick = function () {
                        addToCart(product);
                    };
    
                    modal.style.display = "flex";
                }
            });
        });
    
        // ✅ 2. Event untuk menutup modal
        if (closeModal) {
            closeModal.addEventListener("click", function () {
                modal.style.display = "none";
            });
        }
    
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    
        // ✅ 3. Fungsi menambahkan produk ke keranjang (disimpan ke localStorage)
        function addToCart(product) {
            if (listCards[product.id]) {
                listCards[product.id].quantity += 1;
            } else {
                listCards[product.id] = {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: 1
                };
            }
    
            localStorage.setItem("cartData", JSON.stringify(listCards));
            reloadCart();
        }
    
        // ✅ 4. Fungsi untuk memperbarui tampilan keranjang
        function reloadCart() {
            const listCard = document.querySelector(".listCard");
            const total = document.querySelector(".total");
            const quantity = document.querySelector(".quantity");
    
            listCards = JSON.parse(localStorage.getItem("cartData")) || {};
            listCard.innerHTML = "";
            let count = 0;
            let totalPrice = 0;
    
            Object.values(listCards).forEach(product => {
                totalPrice += product.price * product.quantity;
                count += product.quantity;
    
                let newDiv = document.createElement("li");
                newDiv.innerHTML = `
                    <div><img src="${product.image}"></div>
                    <div class="title">${product.name}</div>
                    <div class="price">Rp${product.price.toLocaleString()}</div>
                    <div>
                        <button class="decrease" data-id="${product.id}">-</button>
                        <div class="count">${product.quantity}</div>
                        <button class="increase" data-id="${product.id}">+</button>
                    </div>`;
                listCard.appendChild(newDiv);
            });
    
            total.innerText = `Rp${totalPrice.toLocaleString()}`;
            quantity.innerText = count;
        }
    
        // ✅ 5. Fungsi untuk mengubah jumlah barang di keranjang
        function changeQuantity(id, quantity) {
            if (quantity <= 0) {
                delete listCards[id];
            } else {
                listCards[id].quantity = quantity;
            }
    
            localStorage.setItem("cartData", JSON.stringify(listCards));
            reloadCart();
        }
    
        // ✅ 6. Event listener untuk tombol + dan -
        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("decrease")) {
                let id = event.target.getAttribute("data-id");
                changeQuantity(id, listCards[id].quantity - 1);
            } else if (event.target.classList.contains("increase")) {
                let id = event.target.getAttribute("data-id");
                changeQuantity(id, listCards[id].quantity + 1);
            }
        });
    
        // ✅ 7. Pindah ke halaman checkout tanpa menghapus data
        document.querySelector(".total").addEventListener("click", function () {
            if (Object.keys(listCards).length === 0) {
                alert("Keranjang belanja kosong!");
                return;
            }
            window.location.href = "checkout.html";
        });
    
        // ✅ 8. Saat halaman dimuat, langsung tampilkan keranjang
        reloadCart();
    });
    