// ===============================
// FREEZ - SHOP SYSTEM
// ===============================

let cart = JSON.parse(localStorage.getItem("freezCart")) || [];

const cartCount = document.querySelector("#cart-count");

// Update cart number
function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.reduce(
            (total, product) => total + product.quantity,
            0
        );
    }
}

// Add product to cart
function addToCart(name, price, image) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("freezCart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added to cart 🧊");
}

// Remove product
function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("freezCart", JSON.stringify(cart));

    displayCart();
    updateCartCount();
}

// Change quantity
function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("freezCart", JSON.stringify(cart));

    displayCart();
    updateCartCount();
}

// Display cart
function displayCart() {

    const cartContainer = document.querySelector("#cart-items");
    const totalElement = document.querySelector("#cart-total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty.</h2>
                <p>Discover the FREEZ collection.</p>
                <a href="shop.html" class="btn">
                    SHOP NOW
                </a>
            </div>
        `;

        if (totalElement) {
            totalElement.textContent = "0 DT";
        }

        return;
    }

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price * product.quantity;

        cartContainer.innerHTML += `
            <div class="cart-product">

                <div class="cart-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>

                <div class="cart-info">

                    <h3>${product.name}</h3>

                    <p>${product.price} DT</p>

                    <div class="quantity">

                        <button onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>${product.quantity}</span>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                    <button
                        class="remove"
                        onclick="removeFromCart(${index})">
                        REMOVE
                    </button>

                </div>

            </div>
        `;
    });

    if (totalElement) {
        totalElement.textContent = total + " DT";
    }
}

// ===============================
// COUNTDOWN
// ===============================

const countdown = document.querySelector("#countdown");

if (countdown) {

    const dropDate = new Date();

    dropDate.setDate(dropDate.getDate() + 7);

    function updateCountdown() {

        const now = new Date().getTime();
        const distance = dropDate.getTime() - now;

        if (distance <= 0) {
            countdown.innerHTML = "DROP LIVE";
            return;
        }

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

        countdown.textContent =
            `${days}D ${hours}H ${minutes}M ${seconds}S`;
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);
}

// Start
updateCartCount();
displayCart();