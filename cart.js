const DELIVERY_COST = 49;

let cart = [
{
id: 1,
name: "Nike Air Max Women",
size: 38,
price: 1799,
image: "images/women-shoe.jpg",
quantity: 1
},
{
id: 2,
name: "Adidas Ultraboost Men",
size: 43,
price: 1999,
image: "images/men-shoe.jpg",
quantity: 1
},
{
id: 3,
name: "Nike Kids Sport",
size: 32,
price: 899,
image: "images/kids-shoe.jpg",
quantity: 1
}
];

const cartItemsContainer = document.getElementById("cart-items");
const cartTitle = document.getElementById("cart-title");
const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery");
const totalElement = document.getElementById("total");
const checkoutButton = document.getElementById("checkout-btn");
const cartCount = document.getElementById("cart-count");
function formatPrice(price){
return price + " KR";
}

function getTotalItemCount(){
return cart.reduce(function(sum,item){
return sum + item.quantity;
},0);
}

function updateSummary(){

const subtotal = cart.reduce(function(sum,item){
return sum + item.price * item.quantity;
},0);

const delivery = cart.length > 0 ? DELIVERY_COST : 0;
const total = subtotal + delivery;

subtotalElement.textContent = formatPrice(subtotal);
deliveryElement.textContent = formatPrice(delivery);
totalElement.textContent = formatPrice(total);

}

function renderCart(){

cartItemsContainer.innerHTML = "";

if(cart.length === 0){

cartItemsContainer.innerHTML = "Your cart is empty";

cartTitle.textContent = "Your Cart (0 Products)";
subtotalElement.textContent = "0 KR";
deliveryElement.textContent = "0 KR";
totalElement.textContent = "0 KR";
checkoutButton.disabled = true;

return;
}

checkoutButton.disabled = false;

cart.forEach(function(item){

const cartItem = document.createElement("div");
cartItem.classList.add("cart-item");

cartItem.innerHTML = `
<img src="${item.image}">
<div class="cart-item-info">
<h3>${item.name}</h3>
<p>Size: ${item.size}</p>
<p>${formatPrice(item.price)}</p>

<div class="quantity-controls">
<button onclick="decreaseQuantity(${item.id})">-</button>
<span>${item.quantity}</span>
<button onclick="increaseQuantity(${item.id})">+</button>
<button onclick="removeItem(${item.id})">REMOVE</button>
</div>

</div>
`;

cartItemsContainer.appendChild(cartItem);

});

cartTitle.textContent = "Your Cart (" + getTotalItemCount() + " Products)";

updateSummary();

}

function increaseQuantity(id){

const product = cart.find(function(item){
return item.id === id;
});

if(product){
product.quantity += 1;
renderCart();
}

}

function decreaseQuantity(id){

const product = cart.find(function(item){
return item.id === id;
});

if(product){

if(product.quantity > 1){
product.quantity -= 1;
}
else{
cart = cart.filter(function(item){
return item.id !== id;
});
}

renderCart();

}

}

function removeItem(id){

cart = cart.filter(function(item){
return item.id !== id;
});

renderCart();

}

checkoutButton.addEventListener("click", function(){

if(cart.length === 0){
alert("Your cart is empty");
return;
}

cartCount.textContent = getTotalItemCount();

alert("Proceeding to checkout");

});


renderCart();