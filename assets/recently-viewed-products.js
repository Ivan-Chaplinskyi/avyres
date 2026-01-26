if (!customElements.get("recently-viewed-products")) {
  class a extends customElements.get("card-product-slider") {
    constructor() {
      super(), this.section = this.closest(".js-section"), this.sliderWrapper = this.querySelector(".swiper-wrapper"), this.productHandle = this.dataset.productHandle, this.fetchRecentProducts(), document.querySelector("quick-cart-drawer") && this.querySelector(".swiper-slide") && document.querySelector("quick-cart-drawer").init(), Shopify.designMode && document.querySelector("quick-cart-drawer") && this.querySelector(".swiper-slide") && document.querySelector("quick-cart-drawer").init()
    }
    fetchRecentProducts() {
      var e = localStorage.getItem("recently-viewed");
      if (e) {
        let d = e.split(",").filter(e => e && e !== this.productHandle && "undefined" !== e);
        0 !== d.length && d.forEach((i, s) => {
          (async () => {
            try {
              var e, t, r, c = await fetch(window.Shopify.routes.root + `products/${i}?view=card`);
              c.ok ? (t = await c.text(), (r = document.createElement("DIV")).classList.add("swiper-slide", "card-product-slider__slide"), r.insertAdjacentHTML("beforeend", t), r.querySelector("product-card") && r.querySelector(".product-card") && this.sliderWrapper.append(r)) : (e = localStorage.getItem("recently-viewed").replace(i + ",", "").replace(i, ""), localStorage.setItem("recently-viewed", e))
            } catch (e) {} finally {
              if (!(s === d.length - 1)) return;
              this.initSlider(), this.section?.classList.remove("hidden")
            }
          })()
        })
      }
    }
  }
  customElements.define("recently-viewed-products", a)
}