class LazyContent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadContent();
                    observer.unobserve(this);
                }
            });
        }, { rootMargin: '0px 0px 200px 0px' });

        observer.observe(this);
    }

    loadContent() {
        const template = this.querySelector('template');

        if (!template) return;

        const content = template.content.cloneNode(true);
        this.replaceWith(content);
    }
}

if (!customElements.get('lazy-content')) {
    customElements.define('lazy-content', LazyContent);
}