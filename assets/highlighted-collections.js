if (!customElements.get("highlighted-collections")) {
  class a extends HTMLElement {
    constructor() {
      super(), Shopify.designMode && window.addEventListener("shopify:section:load", () => {
        this.init()
      }), 990 <= window.innerWidth && this.init()
    }
    init() {
      this.displayImages()
    }
    displayImages() {
      let t = this.querySelectorAll(".highlighted__collections-item-box"),
        s = this.querySelectorAll(".highlighted__collections-image");
      t.forEach(i => {
        i.addEventListener("mouseenter", () => {
          t.forEach(e => e.classList.remove("highlighted__collections-active")), s.forEach(e => {
            e.classList.remove("highlighted-img--active")
          });
          var e = i.getAttribute("data-image"),
            e = this.querySelector(`[data-hover="image-${e}"]`);
          e && e.classList.add("highlighted-img--active")
        })
      })
    }
  }
  customElements.define("highlighted-collections", a)
}