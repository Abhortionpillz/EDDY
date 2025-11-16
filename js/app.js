// app.js (updated)

const WHATSAPP_NUMBER = "2347035074453";
const grid = document.getElementById("product-list"); // Updated ID
const categoryFilter = document.getElementById("category-filter"); // Updated ID

// Load and render products
async function fetchProducts() {
  try {
    const response = await fetch("/api/getProducts");
    if (!response.ok) throw new Error("Failed to fetch products");
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function renderProducts(filter = "all") {
  const products = await fetchProducts();
  
  grid.innerHTML = "";
  
  // Extract unique categories and populate filter
  const categories = [...new Set(products.map(p => p.data.category))];
  // Clear and repopulate filter options (except 'All Categories')
  while (categoryFilter.options.length > 1) {
    categoryFilter.remove(1);
  }

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
  
  const filtered = filter === "all" ? products : products.filter(p => p.data.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = "<p style='text-align:center;'>No products available in this category.</p>";
    return;
  }

  filtered.forEach(p => {
    // Note: Data structure is p.data because FaunaDB returns { ref, ts, data: {...} }
    const product = p.data; 
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₦${product.price}</p>
      <p><small>${product.category}</small></p>
      <button onclick="goToWhatsApp('${product.name}', '${product.price}')">Order via WhatsApp</button>
    `;
    grid.appendChild(div);
  });
}

function goToWhatsApp(name, price) {
  const phoneNumber = WHATSAPP_NUMBER; // Use the constant
  const message = encodeURIComponent(`Hi! I'm interested in buying *${name}* for ₦${price}.`);
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}

categoryFilter.addEventListener("change", () => {
  renderProducts(categoryFilter.value);
});

// Initial call
renderProducts();