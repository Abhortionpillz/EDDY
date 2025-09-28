// Replace with your client’s WhatsApp number (with country code, no + or leading zeros)
const WHATSAPP_NUMBER = "2348012345678";

let products = JSON.parse(localStorage.getItem("products")) || [];
let productList = document.getElementById("product-list");

products.forEach((p, index) => {
  let div = document.createElement("div");
  div.innerHTML = `
    <h2>${p.name}</h2>
    <p>₦${p.price}</p>
    <img src="${p.image}" width="150"><br>
    <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Hello,%20I%20want%20to%20order:%20${encodeURIComponent(p.name)}%20for%20₦${p.price}" target="_blank">
      <button>Place Order</button>
    </a>
  `;
  productList.appendChild(div);
});