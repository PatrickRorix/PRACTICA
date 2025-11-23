☕ Starbucks Clone Website (Student Project)

This project is a multi-page, fully functional clone of the Starbucks website, built using vanilla HTML, CSS, and JavaScript. The goal of this project was to practice front-end development fundamentals, including responsive design, client-side state management (cart logic), and multi-page routing.

 Key Features

Multi-Page Navigation: Full navigation between the Home, Menu, Rewards, Gift Cards, Find a Store, and Sign In pages.

Fully Functional Cart:

Items can be added from the menu.html page.

The Cart Counter updates in real-time in the header.

On the checkout.html page, users can increase/decrease quantities and remove items.

The cart state is persisted across page reloads using localStorage.

Custom Modals: Replaced standard browser alert() calls with custom, styled success and error modals for a better user experience (e.g., confirming an item addition or placing an order).

Form Validation: Basic JavaScript validation implemented on the Sign In / Join forms.

Starbucks Branding: Uses the signature green, white, and dark gray color palette for a familiar look.

🛠️ Project Structure

This project consists of six core HTML pages, one stylesheet, and one JavaScript file:

starbucks-clone/
├── images/                 <-- Store all product images here (required!)
├── index.html              <-- Homepage / Landing Page
├── menu.html               <-- Full Menu with Add-to-Cart functionality
├── checkout.html           <-- Cart Review, Quantity Control, and Payment Form
├── rewards.html            <-- Rewards Program details page
├── giftcards.html          <-- Gift Cards purchase and reload page
├── findastore.html         <-- Store Finder page with map placeholder
├── signin.html             <-- Sign In / Join forms
├── script.js               <-- ALL JavaScript logic (Cart, Modals, Forms)
└── style.css               <-- ALL CSS styling


🚀 Getting Started

To run this project locally, follow these simple steps:

Prerequisites

You only need a modern web browser (like Chrome, Firefox, or Edge).

Installation and Setup

Clone or Download: Download the project files or clone the repository to your local machine.

Create the Images Folder: In the root directory of the project, create a new folder named images.

Add Images: For the site to display correctly, you must add simple placeholder images (any .jpg or .png will work) inside the images folder with the following names:

promo.jpg

coffee.jpg

pastry.jpg

coldbrew.jpg

seasonal1.jpg

seasonal2.jpg

hot1.jpg

hot2.jpg

iced1.jpg

iced2.jpg

bakery1.jpg

Open the Project: Right-click on index.html and choose "Open with Live Server" (if using VS Code) or simply open the file in your browser.

 Next Steps & Potential Upgrades

If you wish to continue developing this project, here are a few ideas:

Implement Persistence: Currently, user authentication is simulated. A major upgrade would be integrating a real backend (like Firebase or Supabase) to handle user accounts and persistent orders.

Image Carousel: Add a JavaScript image carousel to the index.html hero section.

Live Store Data: Integrate with a geo-location or store API to populate the findastore.html page dynamically.

CSS Enhancements: Focus on modern CSS features like CSS Grid for a more sophisticated layout on the Menu and Checkout pages.

📄 License

This project is open-source and available for educational use.
