// A simple function to add a basic interactive element

// 1. Get a reference to the CTA button using its ID
const ctaButton = document.getElementById('cta-button');

// 2. Define a function to handle the click event
function handleCtaClick() {
    // Alert the user that an action is happening
    alert("Thanks for your interest! Taking you to the menu...");

    // Change the text of the button to show it was clicked
    ctaButton.textContent = 'Added to Cart!';

    // Optional: Change the button's style
    ctaButton.style.backgroundColor = '#cc0000'; // Change to red to indicate a state change
    
    // Optional: Disable the button after it's clicked once
    ctaButton.disabled = true;

    // Log the action to the console (good practice for debugging)
    console.log('CTA button was clicked and action performed.');
}

// 3. Attach the function to the 'click' event of the button
ctaButton.addEventListener('click', handleCtaClick);

// You could add other simple JS here, like a scroll-based animation, 
// but this is a solid start for a student project!