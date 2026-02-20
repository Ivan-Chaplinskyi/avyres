if (!customElements.get("product-tabs")) {
  class a extends HTMLElement {
    constructor() {
      super(), this.id = this.getAttribute("id"), Shopify.designMode && window.addEventListener("shopify:section:load", this.init.bind(this))
    }
    connectedCallback() {
      this.init()
    }
    init() {
      this.querySelectorAll(".product__tab--trigger").forEach(e => {
        e.addEventListener("click", t => {
          this.openTab(t, e.dataset.tab)
        })
      }), this.openDefaultTab()
    }
    openDefaultTab() {
      var t = new MouseEvent("click", {
        view: window,
        bubbles: !0,
        cancelable: !0
      });
      this.querySelector(".product__tab[data-default-open]")?.dispatchEvent(t)
    }
    openTab(t, e) {
      this.querySelectorAll(".product__tab-content").forEach(t => {
        t.style.display = "none"
      });
      this.querySelectorAll(".product__tab").forEach(t => {
        t.classList.remove("active")
      });
      e = this.querySelector("#" + e);
      e && (e.style.display = "block", t.currentTarget) && t.currentTarget.classList.add("active")
    }
  }
  customElements.define("product-tabs", a)
}