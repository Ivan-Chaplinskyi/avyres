let getSectionData = (e, t, r) => ({
    id: e,
    section: t,
    selector: r
  }),
  cartDrawer = document.querySelector("cart-drawer"),
  sectionsToRender = [];
if (cartDrawer) {
  let e = document.getElementById("main-cart-items")?.dataset.id;
  sectionsToRender = e ? [getSectionData("#shopify-section-" + e, e, `#shopify-section-${e} cart-items`), getSectionData("#cart-counter", "cart-counter", "#shopify-section-cart-counter"), getSectionData("#CartDrawer-Body", "cart-drawer", "#shopify-section-cart-drawer #CartDrawer-Body")] : [getSectionData("#CartDrawer-Body", "cart-drawer", "#shopify-section-cart-drawer #CartDrawer-Body")]
} else {
  let e = document.getElementById("main-cart-items")?.dataset.id;
  sectionsToRender = e ? [getSectionData("#shopify-section-" + e, e, `#shopify-section-${e} cart-items`), getSectionData("#cart-counter", "cart-counter", "#shopify-section-cart-counter")] : []
}
class CartRemoveButton extends HTMLElement {
  constructor() {
    super(), this.addEventListener("click", e => {
      e.preventDefault(), (this.closest("cart-drawer-items") || this.closest("cart-items")).updateQuantity(this.dataset.index, 0), updateFreeShipping()
    })
  }
}
customElements.define("cart-remove-button", CartRemoveButton);
class CartItems extends HTMLElement {
  constructor() {
    super(), this.freeShipping = document.querySelectorAll("shipping-bar"), this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]')).reduce((e, t) => e + parseInt(t.value), 0), this.debouncedOnChange = debounce(e => {
      this.onChange(e)
    }, 300), this.addEventListener("change", this.debouncedOnChange.bind(this)), updateFreeShipping()
  }
  calculateTotalItemCount(e) {
    return e.reduce((e, t) => e + t.quantity, 0)
  }
  onChange(e) {
    "updates[]" === e.target.name && this.updateQuantity(e.target.dataset.index, e.target.value, document.activeElement.getAttribute("name"))
  }
  getSectionsToRender() {
    return sectionsToRender
  }
  updateQuantity(t, e, n) {
    this.classList.add("is-loading");
    e = JSON.stringify({
      line: t,
      quantity: e,
      sections: this.getSectionsToRender().map(e => e.section),
      sections_url: window.location.pathname
    });
    fetch("" + routes.cart_change_url, {
      ...fetchConfig(),
      body: e
    }).then(e => e.text()).then(e => {
      let r = JSON.parse(e);
      this.getSectionsToRender()?.forEach(e => {
        var t = document.querySelector(e.selector) || document.querySelector(e.id);
        t ? r.errors || (t.innerHTML = this.getSectionInnerHTML(r.sections[e.section], e.selector)) : console.error(`Element with selector ${e.selector} not found`)
      }), r.errors || (this.totalItemCount = this.calculateTotalItemCount(r.items)), this.updateLiveRegions(t, r.item_count, r.errors);
      e = document.getElementById("CartItem-" + t);
      e && e.querySelector(`[name="${n}"]`) && e.querySelector(`[name="${n}"]`).focus(), updateCartCounters(), updateFreeShipping()
    }).finally(() => this.classList.remove("is-loading"))
  }
  getSectionInnerHTML(e, t) {
    return e = e.replace("/collections", "/collections/bestsellers"), (new DOMParser).parseFromString(e, "text/html").querySelector(t).innerHTML
  }
  updateLiveRegions(e, t, r) {
    r && document.querySelectorAll(`[data-line-item-error][data-line="${e}"]`).forEach(e => {
      e.innerHTML = r
    }), this.currentItemCount = t
  }
}
customElements.define("cart-items", CartItems);
class CartDrawer extends HTMLElement {
  constructor() {
    super(), this.addEventListener("keyup", e => "ESCAPE" === e.code.toUpperCase() && this.close()), this.setCartLink(), this.parentElement.addEventListener("shopify:section:select", () => this.open()), this.parentElement.addEventListener("shopify:section:deselect", () => this.close())
  }
  setCartLink() {
    let t = document.querySelector("[data-cart-link]");
    t ? (t.setAttribute("role", "button"), t.setAttribute("aria-haspopup", "dialog"), t.addEventListener("click", e => {
      e.preventDefault(), this.open(t)
    }), t.addEventListener("keydown", e => {
      "SPACE" === e.code.toUpperCase() && (e.preventDefault(), this.open(t))
    })) : console.error("Cart link not found")
  }
  open(e) {
    e && this.setActiveElement(e), this.classList.add("is-visible"), document.querySelector("body").style.overflow = "hidden", this.addEventListener("transitionend", () => {
      this.focusOnCartDrawer()
    }, {
      once: !0
    }), setTimeout(() => {
      document.addEventListener("click", this.handleOutsideClick)
    }, 100);
    e = document.querySelector(".product-recommendations");
    e && (e.classList.contains("hidden") ? document.querySelector(".cart-drawer-items").classList.add("cart-drawer-items__full") : document.querySelector(".cart-drawer-items").classList.remove("cart-drawer-items__full"))
  }
  close() {
    var e;
    this.classList.remove("is-visible"), document.querySelector("body").style.overflow = "auto", removeTrapFocus(this.activeElement), document.removeEventListener("click", this.handleOutsideClick), header.classList.contains("menu-open") || "/cart" === window.location.pathname && (e = document.getElementById("CartDrawer-FormSummary")) && e.submit()
  }
  handleOutsideClick = e => {
    var t = this.querySelector(".cart-drawer__inner");
    t && !t.contains(e.target) && this.close()
  };
  setActiveElement(e) {
    this.activeElement = e
  }
  focusOnCartDrawer() {
    var e = this.firstElementChild,
      t = this.querySelector("[data-drawer-close]");
    trapFocus(e, t)
  }
  renderContents(r, e = !0) {
    this.getSectionsToRender()?.forEach(e => {
      var t = document.querySelector(e.id);
      t && (t.innerHTML = this.getSectionInnerHTML(r.sections[e.section], e.selector), updateCartCounters())
    }), e && this.open()
  }
  getSectionsToRender() {
    return sectionsToRender
  }
  getSectionInnerHTML(e, t) {
    return (new DOMParser).parseFromString(e, "text/html").querySelector(t).innerHTML
  }
}
customElements.define("cart-drawer", CartDrawer);
class CartDrawerItems extends CartItems {
  getSectionsToRender() {
    return sectionsToRender
  }
}
customElements.define("cart-drawer-items", CartDrawerItems);