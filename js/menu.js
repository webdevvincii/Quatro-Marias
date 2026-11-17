// Sample food data
const foodData = {
    pasta: [
        { name: "Pansit Palabok", prices: { small: 480, medium: 850, large: 1250 }, img: "Tumbnails/palabok.jpg" },
        { name: "Pansit Bihon", prices: { small: 480, medium: 850, large: 1250 }, img: "Tumbnails/bihon.jpg" },
        { name: "Pansit Bam-e", prices: { small: 480, medium: 850, large: 1250 }, img: "Tumbnails/bam-e.jpg" },
        { name: "Creamy Carbonara", prices: { small: 480, medium: 850, large: 1250 }, img: "Tumbnails/carbonara.jpg" },
        { name: "Beef Spaghetti", prices: { small: 480, medium: 850, large: 1250 }, img: "Tumbnails/spaghetti.jpg" },
        { name: "Chicken Baked Mac", prices: { small: 500, medium: 950, large: 1450 }, img: "Tumbnails/chicken mac.jpg" },
        { name: "Pork Baked Mac", prices: { small: 500, medium: 950, large: 1450 }, img: "Tumbnails/pork mac.jpg" },
        { name: "Beef Baked Mac", prices: { small: 500, medium: 950, large: 1450 }, img: "Tumbnails/beef mac.jpg" },
    ],
    pork: [
        { name: "Pork Adobo", prices: { medium: 850, large: 1250 }, img: "Tumbnails/adobo.jpg" },
        { name: "Pork Afritada", prices: { medium: 850, large: 1250 }, img: "Tumbnails/afritada.jpg" },
        { name: "Pork Binagoongan", prices: { medium: 850, large: 1250 }, img: "Tumbnails/binagoongan.jpg" },
        { name: "Pork Bicol Express", prices: { medium: 850, large: 1250 }, img: "Tumbnails/bicol.jpg" },
        { name: "Pork Caldereta", prices: { medium: 850, large: 1250 }, img: "Tumbnails/caldereta.jpg" },
        { name: "Pork Dinuguan", prices: { medium: 850, large: 1250 }, img: "Tumbnails/dinuguan.jpg" },
        { name: "Pork Lauya", prices: { medium: 850, large: 1250 }, img: "Tumbnails/lauya.jpg" },
        { name: "Pork Steak", prices: { medium: 850, large: 1250 }, img: "Tumbnails/pork steak.jpg" },
        { name: "Pork Menudo", prices: { medium: 850, large: 1250 }, img: "Tumbnails/menudo.jpg" },
    ],
    veggies: [
        { name: "Buttered Veggies", prices: { medium: 850, large: 1250 }, img: "Tumbnails/buttered.jpg" },
        { name: "Chopsuey", prices: { medium: 850, large: 1250 }, img: "Tumbnails/chopsuey.jpg" },
        { name: "Pinakbet(Pork/Beef)", prices: { medium: 220, large: 1250 }, img: "Tumbnails/pakbet.jpg" },
        { name: "Caesar Salad", prices: { medium: 850, large: 1250 }, img: "Tumbnails/salad.jpg" }
    ],
    lumpia: [
        { name: "Veggie Lumpia", prices: { small: 500, large: 850 }, img: "Tumbnails/gulay.jpg" },
        { name: "Fish Lumpia", prices: { small: 500, large: 850 }, img: "Tumbnails/fish.jpg" },
        { name: "Pork Lumpia", prices: { small: 220, large: 850 }, img: "Tumbnails/baboy.jpg" },
        { name: "Beef Lumpia", prices: { small: 500, large: 850 }, img: "Tumbnails/beef.jpg" }
    ]
};

const categoryButtons = document.querySelectorAll(".category-btn");
const gridContainer = document.getElementById("grid-container");

// Quick fade transition
function loadCategoryWithFastTransition(category) {
    gridContainer.style.transition = "opacity 0.2s ease, transform 0.2s ease";
    gridContainer.style.opacity = "0";
    gridContainer.style.transform = "scale(0.98)";

    setTimeout(() => {
        gridContainer.innerHTML = "";
        loadCategory(category);
        requestAnimationFrame(() => {
            gridContainer.style.transition = "opacity 0.2s ease, transform 0.2s ease";
            gridContainer.style.opacity = "1";
            gridContainer.style.transform = "scale(1)";
        });
    }, 150);
}

// Button click = change category
categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
        const category = this.getAttribute("data-category");
        loadCategoryWithFastTransition(category);

        categoryButtons.forEach(btn => {
            btn.classList.remove("active", "bg-red-500");
        });

        this.classList.add("active", "bg-red-500");
    });
});

// Load selected category
function loadCategory(category) {
    console.log("Loading category:", category);
    gridContainer.classList.add("opacity-0", "transition-opacity", "duration-500");

    setTimeout(() => {
        gridContainer.innerHTML = "";

        if (foodData[category]) {
            gridContainer.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-20 opacity-0 transition-opacity duration-500";

            foodData[category].forEach(item => {
                const availableSizes = Object.keys(item.prices);
                const defaultSize = availableSizes.includes("small") ? "small" : availableSizes[0];

                const foodCard = document.createElement("div");
                foodCard.className = "p-4 mb-2 w-full bg-gray-200/5 hover:bg-red-600 rounded-xl transition-all shadow-lg transform hover:scale-105 duration-300";

                foodCard.innerHTML = `
                    <a class="block relative h-48 rounded-xl overflow-hidden">
                        <img alt="${item.name}" class="object-cover object-center w-full h-full block" src="${item.img}">
                    </a>
                    <div class="mt-4">
                        <h2 class="text-gray-200 text-lg font-bold">${item.name}</h2>
                    </div>
                    <div class="flex justify-between items-center mt-2 bg-gray-900 p-3 rounded-xl shadow-md">
                        <select class="size-select border border-gray-300 p-2 px-2 rounded-lg text-white bg-transparent">
                            ${availableSizes.map(size => `<option value="${size}" class="text-black" ${size === defaultSize ? "selected" : ""}>${size.charAt(0).toUpperCase()}</option>`).join("")}
                        </select>
                        <p class="price-display font-semibold text-white text-lg">P ${item.prices[defaultSize]}.00</p>
                        <button class="add-to-cart relative group p-2 rounded-full bg-gray-700 hover:bg-white text-white hover:text-red-600 transition">
                            <span class="material-icons">add_shopping_cart</span>
                        </button>
                    </div>
                    <button class="order-btn border-2 text-gray-200 font-lg text-md mt-4 w-full rounded-lg py-2 hover:bg-white hover:text-red-600 border-gray-200 transition-all">
                        Order Now
                    </button>
                `;

                // Update price on size change
                const sizeSelect = foodCard.querySelector(".size-select");
                const priceDisplay = foodCard.querySelector(".price-display");
                sizeSelect.addEventListener("change", function () {
                    const selectedSize = this.value;
                    priceDisplay.textContent = `P ${item.prices[selectedSize]}.00`;
                });

                // "Order Now" shows checkout
                const orderBtn = foodCard.querySelector(".order-btn");
                orderBtn.addEventListener("click", function () {
                    document.querySelector("#checkout-form").classList.remove("hidden");
                });

                gridContainer.appendChild(foodCard);
            });

            setTimeout(() => {
                gridContainer.classList.remove("opacity-0");
                gridContainer.classList.add("opacity-100");
            }, 50);
        } else {
            gridContainer.innerHTML = "<p class='text-gray-400 text-center'>No items available for this category.</p>";
        }
    }, 300);
}

// URL params support
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
}

document.addEventListener("DOMContentLoaded", function () {
    const selectedCategory = getCategoryFromURL() || "pasta";
    document.querySelectorAll(".category-btn").forEach(button => {
        if (button.dataset.category === selectedCategory) {
            button.classList.add("active", "bg-red-500");
        } else {
            button.classList.remove("active", "bg-red-500");
        }
    });
    loadCategory(selectedCategory);
});
