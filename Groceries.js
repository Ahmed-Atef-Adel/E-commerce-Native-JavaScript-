'use strict';

const countriesContainer = document.querySelector('.countries');

let wishlist = [];  // Create an empty array to store wishlist items
let cart = []; // Create an empty array to store cart items

function render(products) {
    const row = document.createElement("div");  // Create a row container
    row.classList.add("row", "g-4", "m-3");  // Bootstrap row with gap

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add('col-md-3');  // Set column size to 3 (4 cards per row)
        card.innerHTML = `
            <div class="card h-100">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.category}</p>
                    <p class="card-text">${product.price}$</p>
                    <button class="btn btn-primary add-to-cart-btn" data-id = "${product.id}">Add to Cart</button>
                    <p class="card-text">${product.stock} items in stock</p>                
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                <button class="btn btn-outline-danger wishlist-btn" data-id="${product.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="M8 15s-3.315-3.124-5.657-5.193C.636 8.084 0 6.9 0 5.5 0 3.42 1.5 2 3.5 2c1.136 0 2.195.43 3 1.122C7.805 2.43 8.864 2 10 2c2 0 3.5 1.42 3.5 3.5 0 1.4-.636 2.584-2.343 4.307C11.315 11.876 8 15 8 15z"/>
                    </svg>
                </button>
                </div>                
            </div>
        `;
        row.appendChild(card);  // Append each card to the row
    }); 

    countriesContainer.appendChild(row);  // Append the row to the container
    countriesContainer.style.opacity = 1;  // Make the container visible

       // Add eventlistener to wishlist button that change the color

       document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function(){
            const productId = parseInt(this.getAttribute('data-id'));
            toggleWishlist(productId, products);
            this.classList.toggle('added');
            });
        });

        // Add eventlistener to "Add to cart" button.
        
        document.querySelectorAll('.add-to-cart-btn').forEach(button =>{
            button.addEventListener('click', function(){
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId, products)
            })
        })

}


// Function that add items to the cart

function addToCart(productId, products){
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} has been added to your cart`);
}


// Function that add and remove items from wishing list.

function toggleWishlist(productId, products){
    const product = products.find(p => p.id === productId);
    const index = wishlist.findIndex(item => item.id === productId);

    if (index === -1){
        wishlist.push(product);
    }
    else{
        wishlist.splice(index, 1);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}


const URL = "https://dummyjson.com/products/category/groceries";
const callData = function() {
    fetch(URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data.products);  // Display the list of products
            render(data.products);  // Pass the products array to render function
        })
        .catch(error => console.error('Error fetching data:', error));
};

callData();
