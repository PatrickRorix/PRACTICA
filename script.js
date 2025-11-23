// --- Cart Management Functions (Uses localStorage to persist cart between pages) ---

// Initialize the cart array from localStorage, or start with an empty array
let cart = JSON.parse(localStorage.getItem('starbucksCart')) || [];

/**
 * Saves the current cart array back to localStorage.
 */
function saveCart() {
    localStorage.setItem('starbucksCart', JSON.stringify(cart));
}

/**
 * Adds an item to the cart and updates localStorage.
 * This function is called by the 'onclick' event on menu.html buttons.
 * @param {string} name - The name of the item.
 * @param {number} price - The price of the item.
 */
function addToCart(name, price) {
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex > -1) {
        // Item already exists, just increase quantity
        cart[itemIndex].quantity += 1;
    } else {
        // New item, add to cart
        cart.push({ name: name, price: price, quantity: 1 });
    }

    saveCart();
    
    // Simple confirmation message (using the modal system since alert() is banned)
    // NOTE: For a student project, using a simple console log and changing the button text (below) is often enough.
    console.log(`Added ${name} to cart. Cart total items: ${cart.length}`);

    // Change button text briefly to confirm
    const button = event.target; // event is globally available in an onclick
    const originalText = button.textContent;
    
    button.textContent = 'Added!';
    button.style.backgroundColor = '#cc0000'; // Temporary color change
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = ''; // Revert to CSS default
    }, 800);
}


// --- Checkout Page Rendering Logic (Runs only on checkout.html) ---

/**
 * Renders the cart items on the checkout page.
 */
function renderCart() {
    const cartList = document.getElementById('cart-items-list');
    const totalAmountSpan = document.getElementById('order-total-amount');

    if (!cartList || !totalAmountSpan) {
        // We are not on the checkout page, so stop.
        return;
    }

    if (cart.length === 0) {
        cartList.innerHTML = '<div class="order-item"><span>Your cart is empty.</span></div>';
        totalAmountSpan.textContent = '$0.00';
        return;
    }

    cartList.innerHTML = ''; // Clear existing list
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'order-item';
        itemDiv.innerHTML = `
            <span>${item.quantity}x ${item.name}</span>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        cartList.appendChild(itemDiv);
    });

    totalAmountSpan.textContent = `$${total.toFixed(2)}`;
}

// --- General Page Logic ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Run the cart rendering function if we are on the checkout page
    renderCart();

    // 2. Original CTA button logic (for index.html)
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        // If we are on index.html, attach the original click handler
        ctaButton.addEventListener('click', () => {
             // In a student project, use a simple redirection or console log
             console.log("Order button clicked, normally leads to menu.html");
             // Example: window.location.href = 'menu.html';
        });
    }

    // 3. Handle the final order submission on checkout.html
    const paymentForm = document.getElementById('payment-details-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Simple success simulation
            const total = document.getElementById('order-total-amount').textContent;
            
            // This message replaces the banned alert()
            const successMessage = `
                Order successfully placed! 
                Total Charged: ${total}. 
                Your order is being prepared. 
                Thank you for shopping at Starbucks Clone!
            `;
            
            console.log(successMessage);
            
            // Clear the cart after successful order
            cart = [];
            saveCart();
            renderCart(); // Re-render the empty cart
            
            // Disable the form buttons and display a thank you
            paymentForm.innerHTML = `<h2 style="color: var(--starbucks-green); text-align: center;">Order Complete!</h2><p style="text-align: center;">${successMessage}</p>`;
        });
    }

});