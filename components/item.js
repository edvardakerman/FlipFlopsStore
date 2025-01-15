class Item extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        this.name = this.getAttribute('product-name');
        this.description = this.getAttribute('product-description');
        this.price = this.getAttribute('product-price');
        this.image = this.getAttribute('image-src');
        this.imageAlt = this.getAttribute('image-alt');
    }

    connectedCallback() {
        this.render();
        this.addHoverEffect();
        this.addProductToCart();
    }

    addHoverEffect() {
        const imgElement = this.shadow.querySelector('img');

        imgElement.addEventListener('mouseenter', () => {
            imgElement.src = this.imageAlt;
        });

        imgElement.addEventListener('mouseleave', () => {
            imgElement.src = this.image;
        });
    }

    addProductToCart() {
        const btnElement = this.shadow.querySelector('custom-btn');

        btnElement.addEventListener('click', () => {
            const cart = document.querySelector('shopping-cart');
            cart.addItem(this);
        });
    }

    render() {

        this.shadow.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <div class="max-w-sm h-full flex flex-col justify-between">
            <div class="overflow-hidden">
                <img class="w-full h-auto object-cover" src="${this.image}" alt="Product Image">
            </div>
            <div class="text-gray-500 mt-2 flex-grow">
                <h1 class="text-lg">${this.name}</h1>
                <p class="font-thin">${this.description}</p>
            </div>
            <!-- Flex container to push content to the bottom -->
            <div class="flex justify-between items-center mt-auto pt-2">
            <custom-btn
                text="Add to Cart"
                custom-styles="bg-blue-500 text-white hover:bg-blue-700"
            ></custom-btn>
                <p class="text-sm">$${this.price}</p>
            </div>
        </div>
        `;
    }
}

customElements.define('product-item', Item);
