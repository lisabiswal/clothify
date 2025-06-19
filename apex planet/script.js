// Demo clothing products
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 1999.99,
        image: "OIP (4).jpg"
    },
    {
        id: 2,
        name: "Blue Denim Jacket",
        price: 4999.99,
        image: "OIP.webp" // Updated image for Blue Denim Jacket
    },
    {
        id: 3,
        name: "Summer Floral Dress",
        price: 3879.99,
        image: "OIP (1).webp"
    },
    {
        id: 4,
        name: "Black Skinny Jeans",
        price: 2990.99,
        image: "OIP (2).webp"
    },
    {
        id: 5,
        name: "Red Hoodie",
        price: 3450.99,
        image: "download.webp"
    },
    {
        id: 6,
        name: "Beige Chinos",
        price: 927.99,
        image: "OIF.webp"
    }
];

// --- Cart Persistence ---
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// --- Products Page Logic ---
if (document.getElementById('product-list')) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price.toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

window.addToCart = function(productId) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += 1;
    } else {
        const prod = products.find(p => p.id === productId);
        cart.push({ ...prod, qty: 1 });
    }
    setCart(cart);
    alert('Added to cart!');
};

// --- Cart Page Logic ---
if (document.getElementById('cart-items')) {
    renderCart();
    document.getElementById('place-order-btn').onclick = function() {
        document.getElementById('order-form').style.display = 'block';
        this.style.display = 'none';
    };
    document.getElementById('order-form').onsubmit = function(e) {
        e.preventDefault();
        // Clear cart and show success
        setCart([]);
        document.getElementById('cart-items').style.display = 'none';
        document.getElementById('cart-summary').style.display = 'none';
        document.getElementById('order-form').style.display = 'none';
        document.getElementById('order-success').style.display = 'block';
    };
}

function renderCart() {
    const cart = getCart();
    const cartItemsDiv = document.getElementById('cart-items');
    const cartSummaryDiv = document.getElementById('cart-summary');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        cartSummaryDiv.innerHTML = "";
        document.getElementById('place-order-btn').style.display = 'none';
        return;
    }
    let total = 0;
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        total += item.price * item.qty;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <span class="cart-item-name">${item.name}</span><br>
                <span>Price: ₹${item.price.toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
            </div>
            <span class="cart-item-qty">Qty: ${item.qty}</span>
            <span class="cart-item-remove" onclick="removeFromCart(${item.id})">&times;</span>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    cartSummaryDiv.innerHTML = `Total: ₹${total.toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}`;
    document.getElementById('place-order-btn').style.display = 'inline-block';
}

window.removeFromCart = function(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    setCart(cart);
    renderCart();
};