const cart = [];
const totalEl = document.getElementById("total");
const cartList = document.getElementById("cart");
let selectedProduct = null;
let selectedIngredients = [];

// Seleccionar producto
document.querySelectorAll(".select-product").forEach(btn => {
  btn.addEventListener("click", e => {
    selectedProduct = e.target.closest(".producto").dataset;
    document.getElementById("ingredientes").classList.remove("hidden");
    selectedIngredients = [];
  });
});

// Seleccionar ingredientes
document.querySelectorAll(".ingrediente").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("seleccionado");
    const name = item.dataset.name;
    if (selectedIngredients.includes(name)) {
      selectedIngredients = selectedIngredients.filter(i => i !== name);
    } else {
      selectedIngredients.push(name);
    }
  });
});

// Confirmar pedido
document.getElementById("confirmar").addEventListener("click", () => {
  if (!selectedProduct) return;
  const product = selectedProduct.name;
  const price = parseFloat(selectedProduct.price);
  const ingredients = selectedIngredients.join(", ") || "Sin extras";
  cart.push({ product, price, ingredients });
  renderCart();
  document.getElementById("ingredientes").classList.add("hidden");
});

// Render carrito
function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.product} (${item.ingredients}) - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
  });
  totalEl.textContent = total.toFixed(2);
}

// Enviar por WhatsApp
document.getElementById("btn-whatsapp").addEventListener("click", () => {
  const phone = "593000000000"; // tu número
  const message = encodeURIComponent(
    "🧾 Pedido Click y Sabor:\n" +
    cart.map(i => `• ${i.product} (${i.ingredients})`).join("\n") +
    `\nTotal: $${totalEl.textContent}`
  );
  window.open(`https://wa.me/${phone}?text=${message}`);
});

function limpiarYSalir() {
  localStorage.removeItem("carrito");  // Vaciar carrito
  window.location.href = "index.html"; // Ir al inicio
}
