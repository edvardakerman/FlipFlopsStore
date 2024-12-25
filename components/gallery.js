class Gallery extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-4 mb-10">
            <product-item
                product-name="Blue/Light Blue Flip Flops"
                product-description="Comfortable flip-flops with a stylish blue and light blue design."
                product-price=25
                image-src="./public/blue.jpg"
                image-alt="./public/blue_alt.jpg"
            ></product-item>
            <product-item
                product-name="Blue/Green Flip Flops"
                product-description="Eco-friendly flip-flops with a refreshing blue and green color combination."
                product-price=30
                image-src="./public/green.jpg"
                image-alt="./public/green_alt.jpg"
            ></product-item>
            <product-item
                product-name="Green/Yellow Flip Flops"
                product-description="Vibrant green and yellow flip-flops perfect for summer."
                product-price=20
                image-src="./public/yellow.jpg"
                image-alt="./public/yellow_alt.jpg"
            ></product-item>
            <product-item
                product-name="Blue/Purple Flip Flops"
                product-description="Stylish blue and purple flip-flops for casual outings."
                product-price=22
                image-src="./public/purple.jpg"
                image-alt="./public/purple_alt.jpg"
            ></product-item>
            <product-item
                product-name="Black/Black Flip Flops"
                product-description="Classic black flip-flops that go with any outfit."
                product-price=18
                image-src="./public/black.jpg"
                image-alt="./public/black_alt.jpg"
            ></product-item>
            <product-item
                product-name="Blue/Blue Flip Flops"
                product-description="Ocean-inspired blue flip-flops for beach adventures."
                product-price=28
                image-src="./public/ocean.jpg"
                image-alt="./public/ocean_alt.jpg"
            ></product-item>
        </div>`;
    }
}

customElements.define('product-gallery', Gallery);
