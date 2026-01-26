if (!customElements.get("announcement-bar-slider")) {
  class a extends HTMLElement {
    constructor() {
      super();
      let i = JSON.parse(this.getAttribute("data-swiper-options")) || {};
      this.initSlider(i), window.addEventListener("shopify:section:load", e => {
        this.initSlider(i)
      })
    }
    initSlider(e) {
      e = {
        slidesPerView: e.slidesPerView || 1,
        resistanceRatio: .72,
        loop: e.loop || !1,
        allowTouchMove: e.allowTouchMove || !0,
        autoplay: e.autoplay || !1,
        breakpoints: {
          750: {
            slidesPerView: e.slidesPerViewDesktop || "auto",
            loop: e.loopDesktop || e.loop || !1
          }
        }
      };
      this.slider = new Swiper(this, e)
    }
  }
  customElements.define("announcement-bar-slider", a)
}