// 📌 Function para i-update ang cart count (Desktop + Mobile)
function updateCartCount(change) {
  const cartCountElement = document.getElementById("cart-count"); // desktop sidebar
  const floatingCartCountElement = document.getElementById("floating-cart-count"); // mobile floating button

  let count = parseInt(cartCountElement?.textContent) || 0;
  count += change;
  count = Math.max(count, 0); // wag bumaba sa 0

  // Update desktop cart badge
  if (cartCountElement) {
    cartCountElement.textContent = count;
    cartCountElement.classList.toggle("hidden", count === 0);
  }

  // Update mobile cart badge
  if (floatingCartCountElement) {
    floatingCartCountElement.textContent = count;
    floatingCartCountElement.classList.toggle("hidden", count === 0);
  }

  updateCheckoutButton();
}

// 📌 Function para mag-update ng Checkout button state (Desktop + Floating)
function updateCheckoutButton() {
  const checkoutBtn = document.querySelector("#checkout-btn");
  const floatingCheckoutBtn = document.querySelector("#floating-checkout-btn");
  const cartItems = document.querySelectorAll("#cart-items .cart-item");

  const hasItems = cartItems.length > 0;

  if (checkoutBtn) {
    checkoutBtn.disabled = !hasItems;
    checkoutBtn.style.opacity = hasItems ? "1" : "0.5";
    checkoutBtn.style.cursor = hasItems ? "pointer" : "not-allowed";
  }

  if (floatingCheckoutBtn) {
    floatingCheckoutBtn.disabled = !hasItems;
    floatingCheckoutBtn.style.opacity = hasItems ? "1" : "0.5";
    floatingCheckoutBtn.style.cursor = hasItems ? "pointer" : "not-allowed";
  }
}

// 📌 Function para magdagdag ng item sa cart (Desktop + Floating)
function addToCart(name, price, size) {
  const desktopCart = document.querySelector("#cart-items");
  const mobileCart = document.querySelector("#floating-cart-items");
  const cartTotal = document.querySelector("#cart-total");
  const mobileCartTotal = document.querySelector("#floating-cart-total");

  let total = parseFloat(cartTotal?.textContent.replace("P ", "")) || 0;
  let sizeAbbreviation = size.charAt(0).toUpperCase();

  function createCartItem() {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item", "flex", "justify-between", "items-center", "py-3", "border-b");
    cartItem.dataset.name = name;
    cartItem.dataset.size = size;

    cartItem.innerHTML = `
      <span class="cart-name text-white text-sm mr-2">(${sizeAbbreviation}) ${name}</span>
      <span class="cart-price text-white text-sm">P${price}</span>
      <span class="cart-quantity bg-gray-700 text-white text-sm px-2 py-1 rounded">1</span>
      <button class="remove-item text-red-500 ml-2">✖</button>
    `;
    return cartItem;
  }

  // Add sa desktop cart
  let existingDesktopItem = [...desktopCart.children].find(
    item => item.dataset.name === name && item.dataset.size === size
  );
  if (existingDesktopItem) {
    let quantityElement = existingDesktopItem.querySelector(".cart-quantity");
    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
  } else {
    desktopCart.appendChild(createCartItem());
  }

  // Add sa mobile cart
  let existingMobileItem = [...mobileCart.children].find(
    item => item.dataset.name === name && item.dataset.size === size
  );
  if (existingMobileItem) {
    let quantityElement = existingMobileItem.querySelector(".cart-quantity");
    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
  } else {
    mobileCart.appendChild(createCartItem());
  }

  // Update total
  total += parseFloat(price);
  if (cartTotal) cartTotal.textContent = `P ${total.toFixed(2)}`;
  if (mobileCartTotal) mobileCartTotal.textContent = `P ${total.toFixed(2)}`;

  updateCartCount(1);

  // Alisin empty message sa parehong cart
  document.querySelector("#cart-items p")?.remove();
  document.querySelector("#floating-cart-items p")?.remove();
}

// 📌 Event Delegation para sa "Remove" button (Desktop + Floating)
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-item")) {
    const cartItem = event.target.closest(".cart-item");
    const isMobile = cartItem.closest("#floating-cart-items");
    const otherCartSelector = isMobile ? "#cart-items" : "#floating-cart-items";

    let price = parseFloat(cartItem.querySelector(".cart-price").textContent.replace("P", "").trim());
    let quantityElement = cartItem.querySelector(".cart-quantity");
    let quantity = parseInt(quantityElement.textContent);

    const cartTotal = document.querySelector("#cart-total");
    const mobileCartTotal = document.querySelector("#floating-cart-total");
    let total = parseFloat(cartTotal?.textContent.replace("P ", "")) || 0;

    if (quantity > 1) {
      quantityElement.textContent = quantity - 1;
      total -= price;
      updateCartCount(-1);

      // Sync sa kabilang cart
      let otherCartItem = [...document.querySelector(otherCartSelector).children].find(
        item => item.dataset.name === cartItem.dataset.name && item.dataset.size === cartItem.dataset.size
      );
      if (otherCartItem) {
        let otherQty = otherCartItem.querySelector(".cart-quantity");
        otherQty.textContent = parseInt(otherQty.textContent) - 1;
      }
    } else {
      total -= price;
      cartItem.remove();
      updateCartCount(-1);

      // Alisin din sa kabilang cart
      [...document.querySelector(otherCartSelector).children].forEach(item => {
        if (item.dataset.name === cartItem.dataset.name && item.dataset.size === cartItem.dataset.size) {
          item.remove();
        }
      });
    }

    total = Math.max(total, 0);
    if (cartTotal) cartTotal.textContent = `P ${total.toFixed(2)}`;
    if (mobileCartTotal) mobileCartTotal.textContent = `P ${total.toFixed(2)}`;

    // Kung wala nang items, ipakita empty message
    if (document.querySelector("#cart-items").children.length === 0) {
      document.querySelector("#cart-items").innerHTML = `<p class="text-gray-400 text-center">Your cart is empty.</p>`;
    }
    if (document.querySelector("#floating-cart-items").children.length === 0) {
      document.querySelector("#floating-cart-items").innerHTML = `<p class="text-gray-400 text-center">Your cart is empty.</p>`;
    }
  }
});

// 📌 Sidebar Toggle (Menu & Cart)
const menuContent = document.getElementById("menu-content");
const cartContent = document.getElementById("cart-content");
const viewCartBtn = document.getElementById("view-cart-btn");
const backToMenuBtn = document.getElementById("back-to-menu");

function showCart() {
  menuContent.classList.add("hidden");
  cartContent.classList.remove("hidden");
}

function showMenu() {
  cartContent.classList.add("hidden");
  menuContent.classList.remove("hidden");
}

viewCartBtn?.addEventListener("click", showCart);
backToMenuBtn?.addEventListener("click", showMenu);

// 📌 Add to Cart buttons (Desktop + Mobile)
document.addEventListener("click", function (event) {
  if (event.target.closest(".add-to-cart")) {
    const foodCard = event.target.closest(".p-4");
    const name = foodCard.querySelector("h2").textContent;
    const price = foodCard.querySelector(".price-display").textContent.replace("P ", "").replace(".00", "");
    const size = foodCard.querySelector(".size-select").value;
    addToCart(name, price, size);
  }
});

// 📌 Size select updates price display
document.addEventListener("change", function (event) {
  if (event.target.classList.contains("size-select")) {
    const foodCard = event.target.closest(".p-4");
    const selectedSize = event.target.value;
    const itemName = foodCard.querySelector("h2").textContent;
    const itemData = Object.values(foodData).flat().find(item => item.name === itemName);

    if (itemData && itemData.prices[selectedSize]) {
      const newPrice = itemData.prices[selectedSize];
      foodCard.querySelector(".price-display").textContent = `P ${newPrice}.00`;
    }
  }
});

// 📌 On page load initialize cart count and button state
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount(0);
});

// 📌 Floating cart open/close and button show/hide
document.addEventListener("DOMContentLoaded", function () {
  const floatingCartBtn = document.getElementById("floating-cart-btn");
  const floatingCartPanel = document.getElementById("floating-cart-panel");
  const closeFloatingCart = document.getElementById("close-floating-cart");

  floatingCartBtn?.addEventListener("click", () => {
    floatingCartPanel.classList.remove("hidden");  // Show floating cart panel
    floatingCartBtn.classList.add("hidden");       // Hide floating cart button while panel open
  });

  closeFloatingCart?.addEventListener("click", () => {
    floatingCartPanel.classList.add("hidden");     // Hide floating cart panel
    floatingCartBtn.classList.remove("hidden");    // Show floating cart button again
  });
});

// 📌 Checkout form show/hide with floating cart button toggle and cart validation
function showCheckoutForm() {
  const cartItems = document.querySelectorAll("#cart-items .cart-item");
  if (cartItems.length === 0) {
    // Disable checkout if empty cart, no popup
    return;
  }

  const floatingCartPanel = document.getElementById("floating-cart-panel");
  const floatingCartBtn = document.getElementById("floating-cart-btn");

  // Hide floating cart panel if open
  if (floatingCartPanel && !floatingCartPanel.classList.contains("hidden")) {
    floatingCartPanel.classList.add("hidden");
  }
  // Hide floating cart button while checkout form is visible
  if (floatingCartBtn) {
    floatingCartBtn.classList.add("hidden");
  }

  // Show checkout form
  document.querySelector("#checkout-form").classList.remove("hidden");
}

function hideCheckoutForm() {
  document.querySelector("#checkout-form").classList.add("hidden");

  // Show floating cart button again when checkout form is hidden
  const floatingCartBtn = document.getElementById("floating-cart-btn");
  if (floatingCartBtn) {
    floatingCartBtn.classList.remove("hidden");
  }
}

// 📌 Event listeners for checkout buttons
document.querySelector("#checkout-btn")?.addEventListener("click", showCheckoutForm);
document.querySelector("#floating-checkout-btn")?.addEventListener("click", showCheckoutForm);

// 📌 Cancel checkout button listener (element with id="cancel-checkout")
document.querySelector("#cancel-checkout")?.addEventListener("click", hideCheckoutForm);

// 📌 Submit order function example
function submitOrder() {
  hideCheckoutForm(); // Hide checkout form & show floating cart button

  // Also hide floating cart panel to clean UI
  document.getElementById("floating-cart-panel")?.classList.add("hidden");

  Swal.fire({
    title: "Order Placed!",
    text: "Kindly wait for call/text confirmation.",
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "#e02c30",
  });
}
