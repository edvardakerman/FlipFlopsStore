class Gallery extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.gallertyTitle = this.getAttribute('gallery-title') || 'Product Gallery';
        const dataUrl = this.getAttribute('data-url');
        if (dataUrl) {
            this.fetchProducts(dataUrl);
        }
    }

    async fetchProducts(url) {
        try {
            const response = await fetch(url);
            const items = await response.json();
            this.render(items);
        } catch (error) {
            console.error('Error fetching the product data:', error);
        }
    }

    render(items) {

        if (!items || items.length === 0) {
            this.shadow.innerHTML = `
            <div class="text-center text-gray-500">
                <p>No products found.</p>
            </div>`;
            return;
        } else {

            let itemsToRender = items.map(item => {
                return `
            <product-item
                product-name="${item.name}"
                product-description="${item.description}"
                product-price="${item.price}"
                image-src="${item.image}"
                image-alt="${item.imageAlt}"
            ></product-item>`;
            })

            this.shadow.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <h3 class="text-2xl font-semibold mb-2">${this.gallertyTitle}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8 mb-16">
        ${itemsToRender.join('')}
        </div>`;
        }
    }
}

customElements.define('product-gallery', Gallery);
