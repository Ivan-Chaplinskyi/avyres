if (!customElements.get("social-media-highlights-slider")) {
  class a extends HTMLElement {
    constructor() {
      super(), this.slideContent = this.querySelector(".section__social-media-highlights--content-card");
      var e = JSON.parse(this.getAttribute("data-swiper-options")) || {},
        i = this.getAttribute("data-swiper-layout") || "default";
      this.sliderItem = this.querySelector(".swiper"), this.sliderOptions = {
        slidesPerView: 1,
        spaceBetween: e.spaceBetweenMobile || 2,
        breakpoints: {
          750: {
            slidesPerView: e.slidesPerViewDesktop || 3,
            spaceBetween: e.spaceBetweenDesktop || 2
          },
          1100: {
            slidesPerView: e.slidesPerViewDesktop || 4,
            spaceBetween: e.spaceBetweenDesktop || 2
          }
        },
        on: {
          afterInit: () => this.querySelector(".swiper-smh").removeAttribute("style")
        }
      }, 0 != e.autoplaySpeed && "default" === i && (this.sliderOptions = {
        speed: e.autoplaySpeed || 1e4,
        autoplay: {
          delay: 0,
          disableOnInteraction: !1,
          pauseOnMouseEnter: !0
        },
        ...this.sliderOptions
      }), "default" === i && (this.sliderOptions = {
        loop: !0,
        ...this.sliderOptions
      }), "stacked" === i && (this.sliderOptions = {
        navigation: {
          prevEl: ".swiper-button--prev",
          nextEl: ".swiper-button--next"
        },
        ...this.sliderOptions
      }), Shopify.designMode && window.addEventListener("shopify:section:load", this.init.bind(this))
    }
    connectedCallback() {
      this.init()
    }
    init() {
      this.swiper = new Swiper(this.sliderItem, this.sliderOptions), this.toggleSlideContentCard()
    }
    toggleSlideContentCard() {
      let e = !1,
        i = (window.innerWidth < 750 && this.swiper.removeSlide(2), () => {
          e && (window.innerWidth < 750 ? this.swiper.removeSlide(2) : this.swiper.addSlide(2, this.slideContent))
        });
      i(), window.addEventListener("resize", debounce(() => {
        i()
      }, 200)), this.addEventListener("swiper:init", () => {
        e = !0
      })
    }
  }
  customElements.define("social-media-highlights-slider", a)
}