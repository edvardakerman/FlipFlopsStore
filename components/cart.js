class Cart extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.items = [];
        this.cartVisible = false; // Cart is hidden by default
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners(); // Attach listeners initially
    }

    addItem(newItem) {
        const existingItem = this.items.find(item => item.name === newItem.name);

        if (existingItem) {
            existingItem.quantity++; // Increment the quantity if the item exists
        } else {
            this.items.push({ ...newItem, quantity: 1 }); // Add new item with quantity 1
        }

        this.render(); // Re-render the component after adding an item
        this.attachEventListeners(); // Reattach event listeners after re-rendering
    }

    toggleCart() {
        this.cartVisible = !this.cartVisible; // Toggle cart visibility
        this.render(); // Re-render the component based on the new state
        this.attachEventListeners(); // Reattach event listeners after re-rendering
    }

    // Function to increase item quantity
    increaseItemQuantity(index) {
        this.items[index].quantity++; // Increase quantity based on the item index
        this.render();
        this.attachEventListeners(); // Reattach event listeners after re-rendering
    }

    // Function to decrease item quantity
    decreaseItemQuantity(index) {
        const item = this.items[index];
        if (item.quantity > 1) {
            item.quantity--; // Decrease quantity if greater than 1
        } else {
            this.items.splice(index, 1); // Remove item from the cart if quantity is 0
        }
        this.render();
        this.attachEventListeners(); // Reattach event listeners after re-rendering
    }

    attachEventListeners() {
        const cartIcon = this.shadow.querySelector('#cart');
        const closeCartButton = this.shadow.querySelector('#close-cart');
        const checkoutButton = this.shadow.querySelector("#checkout-button"); //custom-btn

        // Toggle the cart when clicking on the cart icon
        if (cartIcon) {
            cartIcon.addEventListener('click', () => this.toggleCart());
        }

        // Close the cart when clicking the "X" button
        if (closeCartButton) {
            closeCartButton.addEventListener('click', () => this.toggleCart());
        }

        // Attach event listeners for increase and decrease buttons
        this.items.forEach((item, index) => {
            const increaseButton = this.shadow.querySelector(`#increase-${index}`);
            const decreaseButton = this.shadow.querySelector(`#decrease-${index}`);

            if (increaseButton) {
                increaseButton.addEventListener('click', () => this.increaseItemQuantity(index));
            }

            if (decreaseButton) {
                decreaseButton.addEventListener('click', () => this.decreaseItemQuantity(index));
            }
        });

        if (checkoutButton && this.items.length > 0) {
            checkoutButton.addEventListener("click", () => window.location.reload());
        }
    }

    render() {
        if (this.cartVisible) {
            // Render the cart sidebar when the cart is open
            this.shadow.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <div class="fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 w-80 flex flex-col justify-between">
                <div class="p-4">
                    <div class="flex justify-between items-center">
                        <h1 class="font-bold">Your Cart</h1>
                        <button id="close-cart" class="font-bold cursor-pointer">X</button>
                    </div>
                    <ul class="my-5">
                        ${this.items.length > 0 ? this.items.map((item, index) => `
                            <li class="flex justify-between my-2">
                                <div class="flex flex-row">
                                    <div class="mr-2">
                                        <img src="${item.image}" alt="${item.name}" class="w-10 h-15 object-cover">
                                    </div>
                                    <div class="flex flex-col">
                                        <span>${item.name}</span>
                                        <div>
                                            <button id="decrease-${index}" class="font-bold">-</button>
                                            <span class="px-1">${item.quantity}</span>
                                            <button id="increase-${index}" class="font-bold">+</button>
                                        </div>
                                    </div>
                                </div>
                                <span>$${item.price * item.quantity}</span>
                            </li>`).join('') : '<p>Your cart is empty</p>'}
                    </ul>
                </div>
                <div class="p-4">
                    <p class="font-bold">Total: $${this.items.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                    <custom-btn
                        id="checkout-button"
                        text="Checkout"
                        custom-styles="w-full py-2 ${this.items.length === 0 ? 'opacity-50 cursor-not-allowed disabled' : 'hover:bg-blue-700'}"
                    ></custom-btn>
                </div>
            </div>`;
        } else {
            // Render the cart when the cart is closed
            this.shadow.innerHTML = `
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <div class="relative">
                <span id="cart" class="cursor-pointer text-xl float-right hover:text-gray-500">Cart ${this.items.length > 0 ? `(${this.items.reduce((total, item) => total + item.quantity, 0)})` : ''}</span>
            </div>`;
        }
    }
}

customElements.define('shopping-cart', Cart);
