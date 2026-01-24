if (!customElements.get("card-slider")) {
  class a extends HTMLElement {
    constructor() {
      super();
      let t = JSON.parse(this.getAttribute("data-swiper-options")) || {};
      var e;
      window.addEventListener("shopify:section:load", () => {
        this.initSlider(t)
      }), this.initSlider(t), this.classList.contains("js-testimonials") && ((e = () => {
        var e = window.innerWidth < mobileWidth,
          i = this.slider && "slide" === this.slider.params.effect;
        (e && !i || !e && i) && this.reInitSlider(t)
      })(), window.addEventListener("resize", e)), window.addEventListener("resize", () => {
        t.disabledOnMobile && window.innerWidth < mobileWidth ? this.slider && this.slider.destroy() : this.slider || this.initSlider(t)
      })
    }
    reInitSlider(e) {
      this.slider.destroy(), this.initSlider(e)
    }
    initSlider(i) {
      let s = document.querySelector(`.autoplay-progress--${i.sectionId} svg`),
        n = document.querySelector(`.autoplay-progress--${i.sectionId} span`);
      if (!(i.disabledOnMobile && window.innerWidth < mobileWidth)) {
        "render_bullet" == i.pagination ? i.pagination = {
          el: ".swiper-pagination",
          clickable: !0,
          renderBullet: function(e, i) {
            return `
              <button class="${i}">
                <span>${e+1}</span>
              </button>
            `
          }
        } : "progressbar" == i.pagination ? i.pagination = {
          el: ".swiper-pagination",
          type: "progressbar"
        } : "bullets" == i.pagination ? i.pagination = {
          el: ".swiper-pagination",
          clickable: !0
        } : i.pagination = !1, i.loop && i.slideCount < 2 && (i.loop = !1);
        let e = {
          slidesPerView: i.slidesPerView || 1.1,
          spaceBetween: i.spaceBetweenMobile ?? 16,
          resistanceRatio: .72,
          navigation: i.navigation || {
            nextEl: ".swiper-button--next",
            prevEl: ".swiper-button--prev"
          },
          breakpoints: {
            480: {
              slidesPerView: "auto",
              spaceBetween: i.spaceBetweenMobile || 2
            },
            750: {
              slidesPerView: i.slidesPerViewDesktop || 3,
              spaceBetween: i.spaceBetweenDesktop ?? 16
            }
          }
        };
        var t = this.classList.contains("js-articles"),
          o = this.classList.contains("js-collections"),
          a = this.classList.contains("js-featured-products");
        t || o || a ? e.breakpoints[575] = {
          slidesPerView: 2
        } : e = this.classList.contains("horizontal-w-media") ? {
          slidesPerView: i.slidesPerView || 1.1,
          rewind: i.rewind || !1,
          followFinger: i.followFinger || !1,
          spaceBetween: i.spaceBetweenMobile || 16,
          pagination: i.pagination || !1,
          navigation: i.navigation || {
            nextEl: ".swiper-button--next",
            prevEl: ".swiper-button--prev"
          },
          loop: i.loop || !1,
          autoplay: i.autoplay || !1,
          breakpoints: {
            750: {
              slidesPerView: 2.2,
              spaceBetween: i.spaceBetweenDesktop || 16
            },
            990: {
              slidesPerView: 1
            }
          },
          on: {
            autoplayTimeLeft(e, i, t) {
              s.style.setProperty("--progress", 1 - t), n.textContent = Math.ceil(i / 1e3) + "s"
            }
          }
        } : this.classList.contains("vertical-w-media") ? 750 < window.innerWidth ? {
          slidesPerView: i.slidesPerView || 1.1,
          rewind: i.rewind || !1,
          followFinger: i.followFinger || !1,
          spaceBetween: i.spaceBetweenMobile || 16,
          pagination: {
            el: ".swiper-pagination",
            clickable: !0,
            renderBullet: function(e, i) {
              return `<button class="${i}"><span>${e+1}</span></button>`
            }
          },
          navigation: i.navigation || {
            nextEl: ".swiper-button--next",
            prevEl: ".swiper-button--prev"
          },
          loop: i.loop || !1,
          autoplay: i.autoplay || !1,
          breakpoints: {
            750: {
              slidesPerView: 2.2,
              spaceBetween: i.spaceBetweenDesktop || 16,
              pagination: {
                el: ".swiper-pagination",
                clickable: !0,
                renderBullet: function(e, i) {
                  return `<button class="${i}"><span>${e+1}</span></button>`
                }
              }
            },
            990: {
              slidesPerView: 1,
              grid: {
                rows: 3
              }
            }
          }
        } : {
          slidesPerView: i.slidesPerView || 1.1,
          rewind: i.rewind || !1,
          followFinger: i.followFinger || !1,
          spaceBetween: i.spaceBetweenMobile || 16,
          navigation: i.navigation || {
            nextEl: ".swiper-button--next",
            prevEl: ".swiper-button--prev"
          },
          loop: i.loop || !1,
          autoplay: i.autoplay || !1,
          on: {
            autoplayTimeLeft(e, i, t) {
              s.style.setProperty("--progress", 1 - t), n.textContent = Math.ceil(i / 1e3) + "s"
            }
          }
        } : this.classList.contains("carousel-none-media") ? {
          slidesPerView: i.slidesPerView || 1.1,
          rewind: i.rewind || !1,
          followFinger: i.followFinger || !1,
          spaceBetween: i.spaceBetweenMobile || 16,
          pagination: i.pagination || !1,
          navigation: i.navigation || {
            nextEl: ".swiper-button--next",
            prevEl: ".swiper-button--prev"
          },
          loop: i.loop || !1,
          autoplay: i.autoplay || !1,
          breakpoints: {
            750: {
              slidesPerView: 2.2,
              spaceBetween: i.spaceBetweenDesktop || 16
            },
            990: {
              slidesPerView: 3.2
            }
          },
          on: {
            autoplayTimeLeft(e, i, t) {
              s.style.setProperty("--progress", 1 - t), n.textContent = Math.ceil(i / 1e3) + "s"
            }
          }
        } : {
          effect: "fade",
          slidesPerView: 1,
          rewind: !0,
          followFinger: !1,
          navigation: {
            nextEl: ".swiper-button--next",
            prevEl: ".swiper-button--prev"
          }
        }, this.slider = new Swiper(this, e)
      }
    }
  }
  customElements.define("card-slider", a)
}