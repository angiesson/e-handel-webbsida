const products = [
  {
    brand: "Nike",
    color: "svart",
    price: 899,
    size: [38, 39, 40, 41],
    image: "../images/nike-svart.jpg"
  },
  {
    brand: "Adidas",
    color: "vit",
    price: 1099,
    size: [40, 41, 42],
    image: "../images/adidas-vit.jpg"
  },
  {
    brand: "Ugg",
    color: "blå",
    price: 799,
    size: [37, 38, 39],
    image: "../images/ugg-bla.jpg"
  },
  {
    brand: "New Balance",
    color: "svart",
    price: 1199,
    size: [42, 43, 44],
    image: "../images/newbalance-svart.jpg"
  }
];
const productGrid = document.querySelector(".product-grid");
const resultCount = document.querySelector(".result-counts strong");

function renderProducts(productList) {
  productGrid.innerHTML = "";

  productList.forEach(product => {
    const article = document.createElement("article");
    article.classList.add("product-card");

    article.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.brand} ${product.color}">
        <h3>${product.brand}</h3>
      <p class="meta">${product.color} - ${product.price} kr</p>
        `;

    productGrid.appendChild(article);
  });

  resultCount.textContent = productList.length;
}
renderProducts(products);

const searchInput = document.querySelector(".search-input");
const colorInputs = document.querySelectorAll('input[name="color"]');
const sizeInputs = document.querySelectorAll('input[name="size"]');
const priceMinInput = document.querySelector('input[name="priceMin"]');
const priceMaxInput = document.querySelector('input[name="priceMax"]');
const brandSelect = document.querySelector('select[name="brand"]');
const clearButton = document.querySelector(".clear-btn");

function normalizeBrand(value) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function filterProducts() {
  let filtered = products;

  const searchValue = searchInput.value.toLowerCase().trim();
  if (searchValue) {
    filtered = filtered.filter(product =>
      product.brand.toLowerCase().includes(searchValue)
    );
  }

  const selectedColors = Array.from(colorInputs)
    .filter(input => input.checked)
    .map(input => input.value);
  if (selectedColors.length > 0) {
    filtered = filtered.filter(product =>
      selectedColors.includes(product.color)
    );
  }

  const selectedSizes = Array.from(sizeInputs)
    .filter(input => input.checked)
    .map(input => Number(input.value));
  if (selectedSizes.length > 0) {
    filtered = filtered.filter(product =>
      product.size.some(size => selectedSizes.includes(size))
    );
  }

  const min = Number(priceMinInput.value);
  const max = Number(priceMaxInput.value);

  if (!Number.isNaN(min) && priceMinInput.value !== "") {
    filtered = filtered.filter(product => product.price >= min);
  }
  if (!Number.isNaN(max) && priceMaxInput.value !== "") {
    filtered = filtered.filter(product => product.price <= max);
  }

  if (brandSelect.value) {
    filtered = filtered.filter(product =>
      normalizeBrand(product.brand) === brandSelect.value
    );
  }

  renderProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
colorInputs.forEach(input => input.addEventListener("change", filterProducts));
sizeInputs.forEach(input => input.addEventListener("change", filterProducts));
priceMinInput.addEventListener("input", filterProducts);
priceMaxInput.addEventListener("input", filterProducts);
brandSelect.addEventListener("change", filterProducts);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  colorInputs.forEach(input => {
    input.checked = false;
  });
  sizeInputs.forEach(input => {
    input.checked = false;
  });
  priceMinInput.value = "";
  priceMaxInput.value = "";
  brandSelect.value = "";

  renderProducts(products);
});





