class Button extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.text = this.getAttribute('text') || 'Default Button';
        this.customStyles = this.getAttribute('custom-styles') || '';
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <button class="bg-blue-500 text-white py-1 px-2 rounded-md ${this.customStyles}">
            ${this.text}
        </button>`;
    }
}

customElements.define('custom-btn', Button);
