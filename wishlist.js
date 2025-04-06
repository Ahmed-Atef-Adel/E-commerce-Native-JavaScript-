      // Function to render wishlist items
function renderWishlist() {
const wishlistContainer = document.getElementById('wishlist-container');
const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

if (wishlist.length === 0) {
    wishlistContainer.innerHTML = '<p>No items in wishlist.</p>';
} 
else {
    wishlist.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('col-md-3');  // Set column size to 3 (4 cards per row)
        card.innerHTML = `
            <div class="card h-100">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.category}</p>
                    <p class="card-text">${product.price}$</p>
                    <p class="card-text">${product.stock} items in stock</p>
                </div>
            </div>
        `;
        wishlistContainer.appendChild(card);
    });
}
}

// Call the renderWishlist function when the page loads
window.onload = renderWishlist;