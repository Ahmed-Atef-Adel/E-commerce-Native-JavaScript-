
document.addEventListener('DOMContentLoaded', function(){
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0){
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
    else{
        cart.forEach(product => {
            const card = document.createElement('div');
            card.classList.add("col-md-3");  // Set column size to 3 (4 cards per row)
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.category}</p>
                        <p class="card-text">${product.price}$</p>
                    </div>
                </div>
            `;
            cartContainer.appendChild(card);
        });
    }
});