// --- Global Modal and Cart State ---
let cart = JSON.parse(localStorage.getItem('starbucksCart')) || [];

/**
 * Saves the current cart array back to localStorage.
 */
function saveCart() {
    // Filter out items with quantity 0
    cart = cart.filter(item => item.quantity > 0);
    localStorage.setItem('starbucksCart', JSON.stringify(cart));
    updateCartCounter();
}

// --- Modal Functions (Replaces alert() ---
const modalOverlay = document.createElement('div');
modalOverlay.className = 'modal-overlay';
modalOverlay.innerHTML = `
    <div class="modal-content">
        <h3 id="modal-title"></h3>
        <p id="modal-message"></p>
        <button onclick="hideModal()" class="cta-btn" style="width: 100px; padding: 8px; margin-top: 15px;">OK</button>
    </div>
`;
document.body.appendChild(modalOverlay);

function showModal(title, message, type = 'success') {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    
    const content = modalOverlay.querySelector('.modal-content');
    content.className = `modal-content ${type}`; // Apply success/error styling

    modalOverlay.classList.add('visible');
    
    // Hide modal automatically after 3 seconds for quick confirmations
    if (type === 'success') {
        setTimeout(hideModal, 3000);
    }
}

function hideModal() {
    modalOverlay.classList.remove('visible');
}

// --- Cart Counter Function ---
function updateCartCounter() {
    const counterElement = document.getElementById('cart-total-counter');
    if (counterElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (totalItems > 0) {
            counterElement.textContent = totalItems;
            counterElement.style.display = 'block';
        } else {
            counterElement.style.display = 'none';
        }
    }
}

// --- Cart Modification Functions (Called from menu.html and checkout.html) ---

window.addToCart = function(name, price) {
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    saveCart();
    showModal('Success!', `Added ${name} to your cart.`, 'success');
};

window.updateQuantity = function(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
    }
    saveCart();
    renderCart(); // Re-render the checkout page to update totals
};

window.removeItem = function(name) {
    const initialLength = cart.length;
    cart = cart.filter(item => item.name !== name);
    
    if (cart.length < initialLength) {
        showModal('Removed!', `${name} has been removed from your cart.`, 'success');
    }
    
    saveCart();
    renderCart(); // Re-render the checkout page
};


// --- Checkout Page Rendering Logic ---

/**
 * Renders the cart items on the checkout page with interactive controls.
 */
function renderCart() {
    const cartList = document.getElementById('cart-items-list');
    const totalAmountSpan = document.getElementById('order-total-amount');

    // Only run if we are on the checkout page
    if (!cartList || !totalAmountSpan) return; 

    if (cart.length === 0) {
        cartList.innerHTML = '<div class="order-item-detail" style="display: block;"><span>Your cart is empty.</span></div>';
        totalAmountSpan.textContent = '$0.00';
        return;
    }

    cartList.innerHTML = ''; // Clear existing list
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'order-item-detail';
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span class="item-price">$${item.price.toFixed(2)}</span>
            
            <div class="quantity-controls">
                <button onclick="updateQuantity('${item.name}', -1)" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                <span data-quantity>${item.quantity}</span>
                <button onclick="updateQuantity('${item.name}', 1)">+</button>
            </div>
            
            <button class="remove-btn" onclick="removeItem('${item.name}')">Remove</button>
        `;
        cartList.appendChild(itemDiv);
    });

    totalAmountSpan.textContent = `$${total.toFixed(2)}`;
}


// --- General Page Logic ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial counter update for all pages
    updateCartCounter();

    // 2. Run the cart rendering function if we are on the checkout page
    renderCart();

    // 3. Handle the final order submission on checkout.html
    const paymentForm = document.getElementById('payment-details-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Check if cart is empty before submitting
            if (cart.length === 0) {
                 showModal('Error', 'Your cart is empty! Please add items before checking out.', 'error');
                 return;
            }

            const total = document.getElementById('order-total-amount').textContent;
            
            const successMessage = `
                Total Charged: ${total}. 
                Your order is being prepared and will be ready for pickup soon.
            `;
            
            showModal('Order Successfully Placed!', successMessage, 'success');
            
            // Clear the cart after successful order
            cart = [];
            saveCart();
            
            // Update the form area to show success message
            const checkoutContainer = document.querySelector('.checkout-container');
            checkoutContainer.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <h1 style="color: var(--starbucks-green);">Thank You!</h1>
                    <p>${successMessage}</p>
                    <button class="cta-btn" onclick="window.location.href='index.html'">Return Home</button>
                </div>
            `;
        });
    }

    // 4. Form Validation on Sign In / Join (basic check)
    const signInForm = document.querySelector('.sign-in-form form');
    const joinForm = document.querySelector('.join-form form');
    
    if (signInForm) {
        signInForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Simple validation simulation
            const email = document.getElementById('login-email').value;
            if (email.includes('@')) {
                showModal('Welcome Back!', 'Simulating successful sign in. Redirecting to home...', 'success');
                setTimeout(() => { window.location.href = 'index.html'; }, 1000);
            } else {
                showModal('Error', 'Please enter a valid email address.', 'error');
            }
        });
    }

    if (joinForm) {
        joinForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const password = document.getElementById('join-password').value;
            if (password.length < 6) {
                showModal('Error', 'Password must be at least 6 characters long.', 'error');
            } else {
                showModal('Welcome to Rewards!', 'Simulating successful account creation. Redirecting to home...', 'success');
                setTimeout(() => { window.location.href = 'index.html'; }, 1000);
            }
        });
    }

});