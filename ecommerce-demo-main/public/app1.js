/* ---------------- 1. PRODUCT LIST ---------------- */
function loadProducts() {
    const products = [
        { id: 101, name: "Running Shoes", price: 50, image: "https://picsum.photos/250?1" },
        { id: 102, name: "Laptop", price: 900, image: "https://picsum.photos/250?2" },
        { id: 103, name: "Smartphone", price: 600, image: "https://picsum.photos/250?3" }
    ];

    const container = document.getElementById("products");
    if (!container) return;

    container.innerHTML = "";
    products.forEach(p => {
        let div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <img src="${p.image}" width="100">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <input type="number" id="qty${p.id}" value="1" min="1" style="width:40px">
            <button onclick='addToCart(${p.id}, "${p.name}", ${p.price}, "qty${p.id}")'>
                Add to Cart
            </button>
        `;
        container.appendChild(div);
    });
}

/* ---------------- 2. ADD TO CART LOGIC ---------------- */
function addToCart(id, name, price, qtyInputId) {
    // Get the quantity from the input box
    const quantity = parseInt(document.getElementById(qtyInputId).value) || 1;
    
    // Get current cart from storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item already exists to update quantity
    let existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += quantity;
    } else {
        cart.push({ id: id, name: name, price: price, qty: quantity });
    }

    // Save back to storage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${quantity} x ${name} added to cart!`);
    console.log("Current Cart:", cart);
}

// Load products automatically when page opens
document.addEventListener("DOMContentLoaded", loadProducts);
