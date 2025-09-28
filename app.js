document.addEventListener("DOMContentLoaded", () => {
  let productList = document.getElementById("product-list");
  if (!productList) return;

  let products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((p, index) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h2>${p.name}</h2>
      <p>₦${p.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
});

function addToCart(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(products[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}
