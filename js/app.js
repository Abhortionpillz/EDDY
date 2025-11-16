const WHATSAPP_NUMBER = "2347035074453";
    const grid = document.getElementById("productGrid");
    const categoryFilter = document.getElementById("categoryFilter");

    // Load and render products
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Extract unique categories
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });

    function renderProducts(filter = "all") {
      grid.innerHTML = "";
      const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

      if (filtered.length === 0) {
        grid.innerHTML = "<p style='text-align:center;'>No products available in this category.</p>";
        return;
      }

      filtered.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>₦${p.price}</p>
          <p><small>${p.category}</small></p>
          <button onclick="goToWhatsApp('${p.name}', '${p.price}')">Order via WhatsApp</button>
        `;
        grid.appendChild(div);
      });
    }

    function goToWhatsApp(name, price) {
      const message = encodeURIComponent(`Hi! I'm interested in buying *${name}* for ₦${price}.`);
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    }

    categoryFilter.addEventListener("change", () => {
      renderProducts(categoryFilter.value);
    });

    renderProducts();
  import { neon } from '@netlify/neon';
const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL
const [post] = await sql`SELECT * FROM posts WHERE id = ${postId}`;
