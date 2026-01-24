class LazyContent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // const observer = new IntersectionObserver((entries, observer) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             this.loadContent();
    //             observer.unobserve(this);
    //         }
    //     });
    // }, { rootMargin: '0px 0px 200px 0px' });

    // observer.observe(this);

    setTimeout(() => {
      ['click', 'keydown', 'touchstart', 'mousemove', 'scroll', 'keydown'].forEach(eventType => {
        document.addEventListener(eventType, () => {
          this.loadContent();
        }, {
          once: true
        });
      });
    }, 1000);
  }

  loadContent() {
    console.log('Loading lazy content');
    const template = this.querySelector('template');

    if (!template) return;

    const content = template.content.cloneNode(true);
    this.replaceWith(content);
  }
}

if (!customElements.get('lazy-content')) {
  customElements.define('lazy-content', LazyContent);
}