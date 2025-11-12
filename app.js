const WHATSAPP_NUMBER = "2347035074453";

const products = JSON.parse(localStorage.getItem("products")) || [];
const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category-filter");

// Populate category filter dynamically
const categories = [...new Set(products.map(p => p.category))];
categories.forEach(cat => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categoryFilter.appendChild(option);
});

// Display products by selected category
function displayProducts(category = "all") {
  productList.innerHTML = "";

  const filtered = category === "all"
    ? products
    : products.filter(p => p.category === category);

  filtered.forEach(p => {
    const message = `Hello! I want to order this product:
🛍️ *${p.name}*
💰 Price: ₦${p.price}
📦 Category: ${p.category}
📸 Image: ${p.image}`;

    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    const div = document.createElement("div");
    div.innerHTML = `
        <img src="${p.image}" width="150" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₦${p.price}</p>
        <small>Category: ${p.category}</small><br>
        <a href="${whatsappLink}" target="_blank">
          <button>Order on WhatsApp</button>
        </a>
      </div>
    `;
    productList.appendChild(div);
  });
}

// Initial load
displayProducts();

// Filter change event
categoryFilter.addEventListener("change", (e) => {
  displayProducts(e.target.value);
});
