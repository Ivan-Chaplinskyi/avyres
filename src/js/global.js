let mobileWidth = 750,
  tabletWidth = 990,
  windowDynamicEvents = ["scroll", "resize"],
  isDesktop = window.innerWidth > tabletWidth,
  isTablet = window.innerWidth <= tabletWidth && window.innerWidth >= mobileWidth,
  isMobile = window.innerWidth < mobileWidth,
  body = document.querySelector("body"),
  main = document.querySelector("main"),
  sectionsOfHeaderGroup = Array.from(document.querySelectorAll(".shopify-section-group-header-group")).filter(e => !e.classList.contains("section-header")),
  headerElement = document.querySelector("#header, #shopify-section-main-password-header"),
  header = (headerElement && sectionsOfHeaderGroup.push(headerElement), document.querySelector("#header, #shopify-section-main-password-header")),
  announcementBar = document.querySelector(".js-announcement-bar"),
  heroBanner = document.querySelector(".hero-banner"),
  isHeaderSticky = header?.classList.contains("is-sticky"),
  sectionsOfAnnouncementBar = document.querySelectorAll(".section-announcement-bar");
if (sectionsOfAnnouncementBar) {
  let e = (e, t) => {
    document.documentElement.style.setProperty(e, t)
  };

  function calcSectionHeights(e) {
    return {
      visibleHeight: Math.max(0, Math.min(e.offsetHeight, window.innerHeight - e.getBoundingClientRect().top, e.getBoundingClientRect().bottom)),
      height: e.getBoundingClientRect().height
    }
  }

  function updateVisibleHeightsOfAnnouncementBars() {
    let r = 0,
      s = 0;
    sectionsOfAnnouncementBar.forEach(e => {
      Array.from(sectionsOfAnnouncementBar).forEach(e => {
        var {
          height: e,
          visibleHeight: t
        } = calcSectionHeights(e);
        s += e, r += t
      })
    }), e("--announcement-bars-before-header-heights", parseFloat(s) + "px"), e("--announcement-bars-before-header-visible-heights", parseFloat(r) + "px")
  }
  updateVisibleHeightsOfAnnouncementBars(), window.addEventListener("scroll", updateVisibleHeightsOfAnnouncementBars), window.addEventListener("resize", updateVisibleHeightsOfAnnouncementBars)
}
let productMedia = document.querySelector(".main-product__media"),
  productMediaSwiper = document.querySelector(".main-product__media .swiper--product-gallery"),
  productCardMedia = document.querySelector(".product-card__media"),
  productCardCollections = document.querySelector(".product-card");

function getCoordinates(e) {
  e = e.getBoundingClientRect();
  return {
    top: e.top + window.scrollY,
    right: e.right + window.scrollX,
    bottom: e.bottom + window.scrollY,
    left: e.left + window.scrollX
  }
}

function setCustomProperty(e, t) {
  document.documentElement.style.setProperty(e, t)
}

function setRootCustomProperties() {
  let i = (e, t) => {
    document.documentElement.style.setProperty(e, t)
  };
  0 < sectionsOfHeaderGroup.length && (r = Array.from(sectionsOfHeaderGroup).reduce((e, t) => e + t.offsetHeight, 0), document.documentElement.style.setProperty("--header-group-height", r - 1 + "px"));
  let e = 0;
  header && (e = header.getBoundingClientRect().height.toFixed(2)), i("--header-height", parseFloat(e) + "px");
  var r = document.querySelector(".cart-drawer__body");

  function t() {
    if (productMedia && body.classList.contains("template--product")) {
      let e = 0;
      var r = getCoordinates(main).top,
        s = getCoordinates(productMedia).top,
        o = document.querySelector(".product__topbar-nav");
      let t = 0;
      o && (t = o.offsetHeight), e = window.innerHeight - Math.round(r) - 2 * Math.round(s - r) + Math.round(t), 0 < Array.prototype.indexOf.call(main.children, document.querySelector("main section.main-product")) && (e = window.innerHeight - Math.round(r) - 2 * Math.round(s - r) + Math.round(t)), e = Math.round(e - 24), i("--product-media-area-height", e + "px")
    }
  }

  function s() {
    var e = document.querySelector(".main-product__media--slider-wrapper");
    e && i("--product-media-area-swiper-height", parseInt(e.offsetHeight) + "px")
  }
  r && (i("--cart-drawer-body-width", parseFloat(r.offsetWidth) + "px"), i("--cart-drawer-body-height", parseFloat(r.offsetHeight) + "px")), productMedia && i("--product-media-area-width", parseFloat(productMedia.offsetWidth) + "px"), document.addEventListener("DOMContentLoaded", t), window.addEventListener("resize", t), document.addEventListener("DOMContentLoaded", s), window.addEventListener("resize", s), productMedia && new MutationObserver(() => {
    t(), s()
  }).observe(productMedia, {
    childList: !0,
    subtree: !0
  }), Shopify.designMode && window.addEventListener("shopify:section:load", s), heroBanner && (i("--hero-banner-top", parseFloat(getCoordinates(heroBanner).top) + "px"), i("--hero-banner-bottom", parseFloat(getCoordinates(heroBanner).bottom) + "px"));
  var r = document.querySelector(".js-article-hero-media"),
    o = document.querySelector(".js-article-content");
  if (r || o) {
    let e = 0,
      t = 0;
    var n = parseInt(header.getBoundingClientRect().bottom);
    t = r ? (e = parseInt(r.getBoundingClientRect().top), parseInt(r.getBoundingClientRect().right)) : (e = parseInt(o.getBoundingClientRect().y), parseInt(o.getBoundingClientRect().right)), e < 0 + n && (e = n), i("--social-share-sticky-top", e + "px"), i("--social-share-sticky-start", t + "px")
  }
  heroBanner ? 0 < (r = heroBanner.querySelectorAll(".hero__inner")).length && (o = r[0].getAttribute("data-header-menu-text-color")) && i("--transparent-header-menu-text-color", "" + o) : i("--transparent-header-menu-text-color", "var(--color-background)"), productCardMedia && i("--product-card-media-height", parseInt(productCardMedia.offsetHeight) + "px")
}

function scrollPositionY() {
  setCustomProperty("--window-scroll-y-position", window.scrollY), 0 === window.scrollY ? (document.body.classList.add("is-at-top"), document.body.classList.remove("is-scrolled")) : (document.body.classList.add("is-scrolled"), document.body.classList.remove("is-at-top"))
}
document.addEventListener("DOMContentLoaded", function() {
  function s(e) {
    e && e.hasAttribute("loading") && setTimeout(() => {
      e.removeAttribute("loading"), e.classList.remove("lazy")
    }, 100)
  }
  document.querySelectorAll('img[loading="lazy"]:not(.animation-none)').forEach(e => {
    e.classList.add("lazy"), e.addEventListener("load", function() {
      s(e)
    }), e.complete && s(e)
  }), new MutationObserver(function(e, t) {
    for (var r of e) "childList" === r.type && 0 < r.addedNodes.length && r.addedNodes.forEach(e => {
      e instanceof HTMLElement && e.querySelector('img[loading="lazy"]') && e.querySelectorAll('img[loading="lazy"]').forEach(e => {
        s(e)
      })
    })
  }).observe(document.querySelector("body"), {
    childList: !0,
    subtree: !0
  })
}), document.querySelectorAll(".hero__inner > .media > video > img").forEach(function(e) {
  e.setAttribute("loading", "lazy"), e.setAttribute("alt", "Video Cover")
}), document.querySelectorAll(".lazyload").forEach(function(e) {
  e.setAttribute("loading", "lazy")
}), windowDynamicEvents.forEach(e => {
  window.addEventListener(e, () => {
    setRootCustomProperties()
  })
}), setRootCustomProperties(), Shopify.designMode && (window.addEventListener("shopify:section:load", setRootCustomProperties), window.addEventListener("shopify:section:select", setRootCustomProperties)), window.addEventListener("shopify:section:load", function() {
  header = document.querySelector("#header, #shopify-section-main-password-header header"), announcementBar = document.querySelector(".js-announcement-bar"), productCardMedia = document.querySelector(".product-card__media")
}), scrollPositionY(), window.addEventListener("scroll", scrollPositionY);
let bodyScroll = {
    lock(e) {
      bodyScrollLock.disableBodyScroll(e)
    },
    unlock(e) {
      bodyScrollLock.enableBodyScroll(e)
    },
    clear() {
      bodyScrollLock.clearAllBodyScrollLocks()
    }
  },
  onKeyUpEscape = e => {
    var t;
    "ESCAPE" === e.code.toUpperCase() && (e = e.target.closest("details[open]")) && (t = e.querySelector("summary"), e.removeAttribute("open"), t.setAttribute("aria-expanded", !1), t.focus({
      preventScroll: !0
    }))
  },
  getFocusableElements = e => Array.from(e.querySelectorAll('summary, a[href], button:enabled, [tabindex]:not([tabindex^="-"]), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe')),
  trapFocusHandlers = (document.querySelectorAll('[id^="Details-"] summary').forEach(e => {
    e.setAttribute("role", "button"), e.setAttribute("aria-expanded", e.parentNode.hasAttribute("open")), e.nextElementSibling.getAttribute("id") && e.setAttribute("aria-controls", e.nextElementSibling.id), e.addEventListener("click", e => {
      e.currentTarget.setAttribute("aria-expanded", !e.currentTarget.closest("details").hasAttribute("open"))
    }), e.closest("header-drawer") || e.parentElement.addEventListener("keyup", onKeyUpEscape)
  }), {}),
  removeTrapFocus = (e = null) => {
    document.removeEventListener("focusin", trapFocusHandlers.focusin), document.removeEventListener("focusout", trapFocusHandlers.focusout), document.removeEventListener("keydown", trapFocusHandlers.keydown), e && e.focus({
      preventScroll: !0
    })
  },
  trapFocus = (t, e = t) => {
    var r = getFocusableElements(t),
      s = r[0],
      o = r[r.length - 1];
    removeTrapFocus(), trapFocusHandlers.focusin = e => {
      e.target !== t && e.target !== o && e.target !== s || document.addEventListener("keydown", trapFocusHandlers.keydown)
    }, trapFocusHandlers.focusout = function() {
      document.removeEventListener("keydown", trapFocusHandlers.keydown)
    }, trapFocusHandlers.keydown = function(e) {
      "TAB" === e.code.toUpperCase() && (e.target !== o || e.shiftKey || (e.preventDefault(), s.focus()), e.target === t || e.target === s) && e.shiftKey && (e.preventDefault(), o.focus())
    }, document.addEventListener("focusout", trapFocusHandlers.focusout), document.addEventListener("focusin", trapFocusHandlers.focusin), e.focus()
  },
  serializeForm = e => {
    var t, r = {},
      s = new FormData(e);
    for (t of s.keys()) r[t] = s.get(t);
    return JSON.stringify(r)
  },
  deepClone = e => JSON.parse(JSON.stringify(e)),
  handleize = e => e.replace(/[ /_]/g, "-").toLowerCase(),
  decode = e => decodeURIComponent(e).replace(/\+/g, " "),
  getOffsetTop = e => {
    let t = 0;
    for (; isNaN(e.offsetTop) || (t += e.offsetTop), e = e.offsetParent;);
    return t
  };
class MenuDrawer extends HTMLElement {
  constructor() {
    super(), this.details = this.querySelector("details"), this.summary = this.querySelector("summary"), this.drawer = this.querySelector(".js-drawer"), this.btnsCloseDrawer = this.querySelectorAll(".js-btn-close-drawer"), this.btnsCloseDrawer = [...this.btnsCloseDrawer].filter(e => this.drawer === e.closest(".js-drawer")), this.elementToFocus = this.querySelector(".js-drawer-focus-element") || this.btnsCloseDrawer[0], this.toggleButtons = [this.summary, ...this.btnsCloseDrawer], this.isParentDrawerOpen = !1, this.predictiveSearch = this.querySelector("predictive-search"), this.HeaderDrawer = document.querySelector("header-drawer"), this.setInitialAccessibilityAttr(), this.toggleButtons.forEach(e => {
      e.addEventListener("click", e => {
        e.preventDefault(), this.toggleDrawer()
      })
    }), this.addEventListener("keydown", e => {
      var e = "Escape" === e.key,
        t = this.details.classList.contains("menu-opening"),
        r = this.details.querySelector("details[open]");
      !e || r || !t || this.predictiveSearch && this.predictiveSearch.input == document.activeElement || this.toggleDrawer()
    }), this.toggleTrapFocus()
  }
  toggleDrawer() {
    this.details.classList.contains("drawer-transitioning");
    var e = this.details.hasAttribute("open"),
      t = document.getElementById("header");
    e ? (this.details.classList.remove("menu-opening"), this.toggleButtons.forEach(e => {
      e.classList.remove("menu-is-open"), e.setAttribute("aria-expanded", !1)
    }), body.style.overflow = "", body.style.position = "", body.style.top = "", body.style.width = "", window.scrollTo(0, this.scrollTopValue), body.classList.remove("drawer--is-open"), this.isParentDrawerOpen && (this.parentDrawer.style.overflow = ""), setTimeout(() => {
      this.details.removeAttribute("open")
    }, 500)) : (this.details.setAttribute("open", ""), this.toggleButtons.forEach(e => {
      e.classList.add("menu-is-open"), e.setAttribute("aria-expanded", !0)
    }), this.details.classList.add("menu-opening"), t.classList.add("menu-open"), "hidden" === body.style.overflow ? (this.parentDrawer = this.closest(".js-drawer"), this.parentDrawer && (this.isParentDrawerOpen = !0)) : (body.style.overflow = "hidden", body.classList.add("drawer--is-open"), this.scrollTopValue = window.scrollY, body.style.top = `-${this.scrollTopValue}px`, body.style.position = "fixed", body.style.width = "100%"), (e = this.querySelector("#search-desktop")) && (e.focus(), t) && t.classList.remove("menu-open"));
    let r = e => {
      e.target === this.drawer && "visibility" === e.propertyName && (this.details.classList.remove("drawer-transitioning"), this.elementToFocus && this.elementToFocus.focus({
        preventScroll: !0
      }), this.details.hasAttribute("open") || (this.toggleButtons.forEach(e => {
        e.setAttribute("aria-expanded", !1)
      }), this.summary.focus({
        preventScroll: !0
      })), this.isParentDrawerOpen ? (this.parentDrawer.style.overflow = "", document.body.style.overflow = "") : document.body.style.overflow = "hidden", e.target.removeEventListener("transitionend", r))
    };
    this.drawer.addEventListener("transitionstart", e => {
      this.details.classList.add("drawer-transitioning")
    }, {
      once: !0
    }), this.drawer.addEventListener("transitionend", r)
  }
  closeAllOtherDrawers() {
    document.querySelectorAll(".js-drawer").forEach(e => {
      var t = e.closest("details");
      t && t !== this.details && (t.removeAttribute("open"), e.style.overflow = "")
    }), document.body.style.overflow = ""
  }
  instantlyHideDrawer() {
    this.toggleButtons.forEach(e => {
      e.setAttribute("aria-expanded", !1)
    }), this.details.classList.remove("menu-opening"), this.details.removeAttribute("open"), body.style.overflow = ""
  }
  toggleTrapFocus(s = this.drawer) {
    let o = !1;
    document.addEventListener("focusin", e => {
      var t, r;
      o || (o = !0, r = this.details.classList.contains("menu-opening"), o = (r && (r = e.target.closest("details.menu-opening .js-drawer"), t = this.details.querySelector("details.menu-opening"), r === this.drawer || t || (e.preventDefault(), r = getFocusableElements(s), t = s.compareDocumentPosition(e.target), r = (e = r.filter(e => {
        var t, r, s = "none" === getComputedStyle(e).display;
        if (!s) return s = "SUMMARY" === e.tagName, t = (e = e.closest("details")).parentElement.closest("details"), ((r = e.querySelector(".js-drawer")) ? r === this.drawer : e === this.details) || s && t.hasAttribute("open")
      }))[0], (4 <= t ? r : e[e.length - 1]).focus({
        preventScroll: !0
      }))), !1))
    })
  }
  setInitialAccessibilityAttr() {
    var e = this.details.hasAttribute("open");
    this.summary.setAttribute("role", "button"), this.summary.setAttribute("aria-controls", this.drawer.id), this.summary.setAttribute("aria-expanded", e)
  }
}
customElements.define("menu-drawer", MenuDrawer);
class HeaderDrawer extends MenuDrawer {
  constructor() {
    super(), window.addEventListener("resize", e => {
      var t, r;
      this.classList.contains("mobile-drawer") && (t = window.innerWidth < tabletWidth, r = this.details.classList.contains("menu-opening"), !t) && r && this.instantlyHideDrawer()
    })
  }
  instantlyHideDrawer() {
    super.instantlyHideDrawer()
  }
  toggleDrawer() {
    this.details.classList.contains("drawer-transitioning");
    var e = this.querySelector(".drawer__button");
    e.classList.contains("menu-is-open") ? (header.classList.remove("menu-open"), e.classList.remove("menu-is-open"), body.style.removeProperty("position"), window.scrollTo(0, this.scrollTopValue)) : (this.scrollTopValue = window.scrollY, header.classList.add("menu-open"), e.classList.add("menu-is-open")), super.toggleDrawer(), this.querySelectorAll(".drawer__menu-item").forEach(e => {
      e.classList.toggle("is--visible")
    }), this.querySelectorAll(".drawer__subnav-item").forEach(e => {
      e.classList.toggle("is--visible")
    })
  }
  toggleTrapFocus() {
    super.toggleTrapFocus(this.details)
  }
}
customElements.define("header-drawer", HeaderDrawer);
class DesktopDrawer extends MenuDrawer {
  constructor() {
    super(), window.addEventListener("resize", e => {
      var t = window.innerWidth < tabletWidth,
        r = this.details.classList.contains("menu-opening");
      t && r && this.instantlyHideDrawer()
    })
  }
}
customElements.define("desktop-drawer", DesktopDrawer);
class SearchDrawer extends MenuDrawer {
  constructor() {
    super(), window.addEventListener("resize", e => {
      this.details.classList.contains("menu-opening")
    }), this.btn = this.querySelector(".drawer__button"), this.btn.addEventListener("click", () => {
      var e = document.querySelector("header-drawer details");
      e && (e.removeAttribute("open"), e.classList.remove("menu-opening"))
    })
  }
}

function pauseAllMedia() {
  document.querySelectorAll(".js-youtube").forEach(e => {
    e.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
  }), document.querySelectorAll(".js-vimeo").forEach(e => {
    e.contentWindow.postMessage('{"method":"pause"}', "*")
  }), document.querySelectorAll("video").forEach(e => e.pause()), document.querySelectorAll("product-model").forEach(e => {
    e.modelViewerUI && e.modelViewerUI.pause()
  })
}

function unpauseAllMedia() {
  document.querySelectorAll(".js-youtube").forEach(e => {
    e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
  }), document.querySelectorAll(".js-vimeo").forEach(e => {
    e.contentWindow.postMessage('{"method":"play"}', "*")
  }), document.querySelectorAll("video").forEach(t => {
    var e = t.play();
    void 0 !== e && e.then(e => {}).catch(e => {
      t.play()
    })
  }), document.querySelectorAll("product-model").forEach(e => {
    e.modelViewerUI && e.modelViewerUI.play()
  })
}
customElements.define("search-drawer", SearchDrawer);
let debounce = (t, r) => {
    let s;
    return (...e) => {
      clearTimeout(s), s = setTimeout(() => t.apply(this, e), r)
    }
  },
  fetchConfig = (e = "json") => ({
    method: "POST",
    headers: {
      "Content-Type": "application/" + e,
      Accept: "application/" + e
    }
  });
class QuantityInput extends HTMLElement {
  constructor() {
    super(), this.input = this.querySelector("input"), this.changeEvent = new Event("change", {
      bubbles: !0
    }), this.querySelectorAll("button").forEach(e => e.addEventListener("click", this.onButtonClick.bind(this)))
  }
  onButtonClick(e) {
    e.preventDefault();
    var e = e.target.name ? e.target : e.target.closest("button"),
      t = this.input.value;
    "increment" === e.name ? this.input.stepUp() : this.input.stepDown(), t !== this.input.value && this.input.dispatchEvent(this.changeEvent)
  }
}
customElements.define("quantity-input", QuantityInput);
class ModalOpener extends HTMLElement {
  constructor() {
    super();
    let t = this.querySelector("button");
    t && t.addEventListener("click", () => {
      var e = document.querySelector(this.getAttribute("data-modal"));
      e && e.show(t)
    })
  }
}
customElements.define("modal-opener", ModalOpener);
class ModalDialog extends HTMLElement {
  constructor() {
    super(), this.dialogHolder = this.querySelector('[role="dialog"]'), this.querySelector('[id^="ModalClose-"]').addEventListener("click", this.hide.bind(this, !1)), this.addEventListener("keyup", e => {
      "ESCAPE" !== e.code?.toUpperCase() || e.target.closest("age-verification-popup") || this.hide()
    }), this.addEventListener("click", e => {
      e.target !== this || e.target.closest("age-verification-popup") || this.hide()
    }), this.dialogHolder.addEventListener("click", e => {
      e.stopPropagation()
    })
  }
  connectedCallback() {
    this.moved || (this.moved = !0, document.body.appendChild(this))
  }
  show(e) {
    this.openedBy = e, bodyScroll.lock(this.dialogHolder), this.setAttribute("open", ""), trapFocus(this, this.dialogHolder), window.pauseAllMedia()
  }
  hide() {
    bodyScroll.unlock(this.dialogHolder), document.body.dispatchEvent(new CustomEvent("modalClosed")), this.removeAttribute("open"), removeTrapFocus(this.openedBy), window.unpauseAllMedia()
  }
}

function isIOS() {
  return /iPad|iPhone|iPod|iPad Simulator|iPhone Simulator|iPod Simulator/.test(navigator.platform) || "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints
}
customElements.define("modal-dialog", ModalDialog);
class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    var e = this.querySelector('[id^="Deferred-Poster-"]');
    e && e.addEventListener("click", this.loadContent.bind(this))
  }
  loadContent(e = !0) {
    var t;
    this.getAttribute("loaded") || ((t = document.createElement("div")).appendChild(this.querySelector("template").content.firstElementChild.cloneNode(!0)), this.setAttribute("loaded", !0), t = this.appendChild(t.querySelector("video, model-viewer, iframe")), isIOS() && (t.controls = !0), t.play && t.play(), e && t.focus())
  }
}
customElements.define("deferred-media", DeferredMedia);
class LocalizationForm extends HTMLElement {
  constructor() {
    super(), this.form = this.querySelector("form"), this.localizationInputElements = this.querySelectorAll('[name="country_code"], [name="language_code"]'), this.localizationInputElements.forEach(e => {
      e.addEventListener("input", () => {
        this.form.submit()
      })
    })
  }
}
customElements.define("localization-form", LocalizationForm);
class AccordionDefault extends HTMLElement {
  constructor() {
    super(), this.hideMultiple = this.hasAttribute("data-hide-multiple"), this.summaryElements = this.querySelectorAll("summary"), this.setInitialAccessibilityAttr(), this.addEventListener("click", e => {
      let t = e.target.classList.contains("js-btn");
      (t = t || e.target.closest("summary.js-btn")) && (e.preventDefault(), this.toggleDropdown(e.target.classList.contains("js-btn") ? e.target : e.target.closest("summary")), this.collapseInactiveItems())
    }), this.addEventListener("keydown", e => {
      "Escape" === e.key && (e = document.activeElement.closest("details.is-active")) && (e = e.querySelector("summary"), this.closest("menu-drawer").classList.contains("facets__drawer") ? this.closest("menu-drawer").toggleDrawer() : (this.toggleDropdown(e), this.collapseInactiveItems()))
    })
  }
  collapseInactiveItems() {
    this.hideMultiple && document.querySelectorAll("accordion-default summary").forEach(e => {
      e.closest("accordion-default").toggleDropdown(e, !0)
    })
  }
  toggleDropdown(o, e) {
    let i = o.nextElementSibling;
    var t = i.classList.contains("is-transitioning");
    if (!t) {
      let s = o.parentElement,
        t = s.closest(".product__accordion");
      if (e) s.classList.remove("is-active"), s.removeAttribute("open"), o.setAttribute("aria-expanded", !1), i.style.height = "0px";
      else {
        s.classList.toggle("is-active");
        let r = s.classList.contains("is-active");
        o.setAttribute("aria-expanded", r), r ? (s.setAttribute("open", ""), i.style.height = i.scrollHeight + "px", setTimeout(() => {
          var e;
          t && (e = t.getBoundingClientRect(), e = window.scrollY + e.top - 150, window.scrollTo({
            top: e,
            behavior: "smooth"
          }))
        }, 150)) : (i.style.height = i.scrollHeight + "px", setTimeout(() => {
          i.style.height = "0px"
        }, 0)), i.classList.add("is-transitioning"), i.addEventListener("transitionend", function e(t) {
          i.removeEventListener("transitionend", e);
          i.classList.remove("is-transitioning");
          if (r) return void(i.style.height = "auto");
          s.removeAttribute("open");
          o.focus()
        })
      }
    }
  }
  setInitialAccessibilityAttr() {
    this.summaryElements.forEach(e => {
      var t = e.parentElement,
        r = e.nextElementSibling,
        t = t.hasAttribute("open");
      e.setAttribute("role", "button"), e.setAttribute("aria-controls", r.id), e.setAttribute("aria-expanded", t)
    })
  }
}
customElements.define("accordion-default", AccordionDefault);
let nav = document.querySelector(".js-nav"),
  navItems = (nav?.addEventListener("click", function(e) {
    var t, r = matchMedia("(hover: none)").matches,
      s = e.target.classList.contains("js-nav-link");
    r && s && (s = (r = e.target.parentElement).parentElement.querySelector(".js-nav-item.is-active"), t = r.classList.contains("has-dropdown"), s !== r && s?.classList.remove("is-active"), t) && (e.preventDefault(), r.classList.toggle("is-active"))
  }), document.addEventListener("click", function(e) {
    e.target.closest(".js-nav-item.is-active") || 0 != (e = document.querySelectorAll(".js-nav-item.is-active")).length && e.forEach(e => {
      e.classList.remove("is-active")
    })
  }), document.querySelectorAll(".js-nav-item.has-dropdown:not(.dropdown)")),
  hero = (window.addEventListener("shopify:section:load", function() {
    navItems = document.querySelectorAll(".js-nav-item.has-dropdown:not(.dropdown)")
  }), ["DOMContentLoaded", "resize"].forEach(e => {
    window.addEventListener(e, () => {
      (navItems = document.querySelectorAll(".js-nav-item.has-dropdown:not(.dropdown)")).forEach(e => {
        var t, r, s = e.querySelector(".js-dropdown");
        s && ({
          y: t,
          height: r
        } = e.getBoundingClientRect(), (t += r) !== (r = s.getBoundingClientRect().y)) && (s = Math.round(r - t), e.style.setProperty("--after-height", s + "px"))
      })
    })
  }), document.querySelector(".hero-banner") || document.querySelector("main section")),
  megaMenu = (window.addEventListener("shopify:section:load", function() {
    hero = document.querySelector(".hero-banner") || document.querySelector("main section")
  }), document.querySelector("nav.js-nav"));

function toggleHeaderTransparency() {
  megaMenu.querySelector(".js-dropdown.is-visible") ? header.classList.add("is-megamenu-open") : header.classList.remove("is-megamenu-open")
}

function closeAllDropdowns() {
  megaMenu.querySelectorAll(".js-dropdown.is-visible").forEach(e => {
    var t = e.closest(".js-nav-item")?.getAttribute("data-menu-item");
    megaMenu.querySelectorAll(".header__nav-sublinks").forEach(e => {
      e.classList.contains("is-visible") && e.classList.remove("is-visible")
    }), null !== t && e.classList.remove("is-visible")
  })
}
megaMenu && (megaMenu.querySelectorAll(".js-nav-item").forEach(t => {
  let r = t.querySelector(".js-dropdown");
  t.addEventListener("mouseenter", () => {
    null !== t.getAttribute("data-menu-item") && (closeAllDropdowns(), r && r.classList.add("is-visible"), toggleHeaderTransparency())
  }), t.addEventListener("mouseleave", e => {
    e = e.relatedTarget;
    e && (r?.contains(e) || t.contains(e) || megaMenu.contains(e)) || (closeAllDropdowns(), toggleHeaderTransparency())
  }), r && r.addEventListener("mouseleave", e => {
    e = e.relatedTarget;
    e && (r.contains(e) || t.contains(e) || megaMenu.contains(e)) || (closeAllDropdowns(), toggleHeaderTransparency())
  })
}), megaMenu.addEventListener("mouseleave", () => {
  closeAllDropdowns(), toggleHeaderTransparency()
})), document.querySelectorAll(".header__nav-item.dropdown [data-child-menu-item]").forEach(t => {
  let r = t.querySelector("[data-child-menu-content]");
  t.addEventListener("mouseenter", () => {
    document.querySelectorAll(".header__nav-item.dropdown [data-child-menu-content]").forEach(e => {
      e.classList.remove("is-visible")
    }), r?.classList.add("is-visible")
  }), t.addEventListener("mouseleave", e => {
    e = e.relatedTarget;
    e && e.closest("[data-child-menu-item]") !== t && e.closest("[data-child-menu-item]") && r?.classList.remove("is-visible")
  })
});
let animationObserverOptions = {
    rootMargin: "-100px"
  },
  animationObserver = new IntersectionObserver(e => {
    e.forEach(e => {
      e.isIntersecting && (e.target.classList.add("animation-init"), e.target.addEventListener("animationend", () => {
        e.target.classList.add("animation-none")
      }, {
        once: !0
      }), animationObserver.unobserve(e.target))
    })
  }, animationObserverOptions);

function observeAnimationElements() {
  document.querySelectorAll('[class*="js-animation-"]').forEach(e => {
    animationObserver.observe(e)
  })
}

function preventDefault(e) {
  e.preventDefault()
}
observeAnimationElements(), window.addEventListener("shopify:section:load", () => {
  observeAnimationElements()
});
class DropdownInput extends HTMLElement {
  constructor() {
    super(), this.select = this.querySelector("select"), this.dropdown = null, this.buttons = null, this.detailsTemplate = this.querySelector('template[data-name="details"]'), this.optionTemplate = this.querySelector('template[data-name="option"]'), this.select
  }
  connectedCallback() {
    this.init()
  }
  init() {
    this.select.classList.add("hidden"), this.appendTemplate()
  }
  appendTemplate() {
    let o = this.detailsTemplate.content.firstElementChild.cloneNode(!0),
      i = this.optionTemplate.content;
    var e, t = Array.from(this.select.options);
    0 !== t.length && (e = t.find(e => e.selected), o.querySelector("[data-label]").textContent = e.label, t.forEach(e => {
      var t = i.cloneNode(!0),
        r = t.querySelector("button"),
        s = t.querySelector("li");
      r.setAttribute("data-value", e.value), r.textContent = e.label, r.toggleAttribute("disabled", e.disabled), s.classList.toggle("is-active", e.selected), o.querySelector("[data-options]").append(t)
    }), this.append(o), this.dropdown = this.querySelector("details"), this.buttons = this.dropdown.querySelectorAll("button"), this.setHandlers())
  }
  update() {
    this.dropdown = null, this.buttons = null, this.querySelector("details")?.remove(), this.appendTemplate()
  }
  setHandlers() {
    this.querySelector("summary").addEventListener("click", this.onSummaryClick.bind(this)), this.buttons.forEach((e, t) => {
      e.addEventListener("click", e => this.onOptionSelect(e, t))
    })
  }
  onOptionSelect(e, t) {
    e.preventDefault(), Array.from(this.select.options).forEach(e => e.removeAttribute("selected")), this.select.options[t].setAttribute("selected", "selected"), this.select.value = e.target.dataset.value, this.select.dispatchEvent(new Event("change", {
      bubbles: !0
    })), this.querySelector("[data-label]").textContent = this.select.options[t].label, this.setSelectedOption(e.target), this.update()
  }
  setSelectedOption(e) {
    this.buttons.forEach(e => {
      e.parentElement.classList.remove("is-active")
    }), e.parentElement.classList.add("is-active"), this.select.dispatchEvent(new Event("change")), this.select.closest("form")?.dispatchEvent(new Event("input")), this.close(void 0, this.dropdown.querySelector("summary"), this.dropdown)
  }
  onSummaryClick(e) {
    var t = e.currentTarget,
      r = t.parentNode;
    r.hasAttribute("open") ? this.close(e, t, r) : this.open(t, r)
  }
  open(e, t) {
    setTimeout(() => {
      t.classList.add("is-open")
    }), e.setAttribute("aria-expanded", !0), trapFocus(t, e)
  }
  close(e, t, r) {
    e && e.preventDefault(), r.classList.remove("is-open"), removeTrapFocus(t), this.closeAnimation(r)
  }
  closeAnimation(t) {
    let r, s = e => {
      e - (r = void 0 === r ? e : r) < 300 ? window.requestAnimationFrame(s) : t.removeAttribute("open")
    };
    window.requestAnimationFrame(s)
  }
}
customElements.define("dropdown-input", DropdownInput);
class CountdownTimer extends HTMLElement {
  constructor() {
    super();
    var e = this.dataset.timezone,
      t = this.dataset.date.split("-").filter(function(e) {
        return "" != e
      }),
      r = parseInt(t[0]),
      s = parseInt(t[1]),
      t = parseInt(t[2]);
    let o = this.dataset.time,
      i, n;
    null != o && (o = o.split(":"), i = parseInt(o[0]), n = parseInt(o[1]));
    e = s + "/" + r + "/" + t + " " + i + ":" + n + " GMT" + e;
    this.countDownDate = new Date(t, s - 1, r, i, n, 0, 0).getTime(), this.countDownDate = new Date(e).getTime()
  }
  convertDateForIos(e) {
    var t = e.split(/[- :]/);
    return e = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5])
  }
  connectedCallback() {
    let u = this,
      p = u.dataset.timerLayout;
    u.dataset.endMessage;

    function h() {
      var e = (new Date).getTime(),
        e = u.countDownDate - e,
        t = Math.floor(e / 864e5),
        r = Math.floor(e % 864e5 / 36e5),
        s = Math.floor(e % 36e5 / 6e4),
        o = Math.floor(e % 6e4 / 1e3),
        i = u.querySelector(".countdown-timer__columns"),
        n = u.querySelector(".countdown-timer__message"),
        a = u.querySelector(".days .countdown-timer__column-number"),
        l = u.querySelector(".hours .countdown-timer__column-number"),
        c = u.querySelector(".minutes .countdown-timer__column-number"),
        d = u.querySelector(".seconds .countdown-timer__column-number");
      e < 0 ? (a && (a.innerHTML = 0), l && (l.innerHTML = 0), c && (c.innerHTML = 0), d && (d.innerHTML = 0), u.classList.add("loading-effect"), u.setAttribute("data-is-ended", "true"), "1" !== p && (i && i.classList.add("hidden"), n) && n.classList.remove("hidden"), "1" === p && (e = u.closest(".callout-banner")?.querySelector(".callout-banner__content-heading")) && (e.innerHTML = u.dataset.endMessage)) : (requestAnimationFrame(h), a && (a.innerHTML = CountdownTimer.addZero(t)), l && (l.innerHTML = CountdownTimer.addZero(r)), c && (c.innerHTML = CountdownTimer.addZero(s)), d && (d.innerHTML = CountdownTimer.addZero(o)), 0 === t && a && a.parentElement.parentElement.remove(), u.classList.remove("loading-effect"))
    }
    requestAnimationFrame(h)
  }
  static addZero(e) {
    return e < 10 && 0 <= e ? "0" + e : e
  }
}
if (customElements.define("countdown-timer", CountdownTimer), !customElements.get("text-truncator")) {
  class Bc extends HTMLElement {
    constructor() {
      super(), this.initElements()
    }
    connectedCallback() {
      this.setupTextTruncation()
    }
    initElements() {
      this.textTruncatorButton = this.querySelector(".text-truncator__button"), this.textTruncatorButtonText = this.textTruncatorButton?.querySelector(".text-truncator__button-text"), this.textTruncatorIconPlus = this.textTruncatorButton?.querySelector(".icon-plus"), this.textTruncatorIconMinus = this.textTruncatorButton?.querySelector(".icon-minus")
    }
    setupTextTruncation() {
      var e = this.querySelector(".text-truncator"),
        {
          lineHeight: t,
          lineCount: r,
          maxLineCount: s
        } = (e.style.display = "block", this.calculateLineCounts(e));
      s < r ? (this.applyTextTruncation(e, t, s), this.setupButton(e)) : this.removeTextTruncation(e)
    }
    calculateLineCounts(e) {
      var t = parseFloat(window.getComputedStyle(e).lineHeight);
      return {
        lineHeight: t,
        lineCount: Math.floor(e.clientHeight / t),
        maxLineCount: parseInt(this.dataset.maxLineCount)
      }
    }
    applyTextTruncation(e, t, r) {
      e.classList.add("text-truncator--hidden");
      e = t * r + "px", t = document.createElement("style");
      t.innerHTML = `.text-truncator--hidden { max-height: ${e}; }`, document.head.appendChild(t), this.textTruncatorButton && (this.textTruncatorButton.style.display = "")
    }
    removeTextTruncation(e) {
      e.classList.remove("text-truncator--hidden"), this.textTruncatorButton && (this.textTruncatorButton.style.display = "none")
    }
    setupButton(t) {
      this.textTruncatorButton && (this.textTruncatorButtonText.innerHTML = `<span>${this.dataset.readMore}</span>`, this.toggleIcons("plus"), this.textTruncatorButton.addEventListener("click", e => {
        e.preventDefault(), this.toggleTextTruncation(t)
      }))
    }
    toggleTextTruncation(e) {
      var t = e.querySelectorAll("p");
      let r = e.classList.contains("text-truncator--hidden");
      t.forEach((e, t) => {
        e.style.marginTop = r && 0 !== t ? "1rem" : ""
      }), e.classList.toggle("text-truncator--hidden"), this.textTruncatorButtonText.innerHTML = `<span>${r?this.dataset.readLess:this.dataset.readMore}</span>`, this.toggleIcons(r ? "minus" : "plus"), r && window.innerWidth < 768 ? e.style.overflow = "scroll" : (e.style.maxHeight = "", e.style.overflow = "")
    }
    toggleIcons(e) {
      this.textTruncatorIconPlus.style.display = "plus" === e ? "inline-block" : "none", this.textTruncatorIconMinus.style.display = "minus" === e ? "inline-block" : "none"
    }
  }
  customElements.define("text-truncator", Bc)
}
class BackToTop extends HTMLElement {
  constructor() {
    super(), this.vertical_offset_for_trigger = .5 * window.innerHeight, this.addEventListener("click", this.scrollToTop.bind(this))
  }
  scrollToTop() {
    window.scroll({
      top: 0,
      behavior: "smooth"
    })
  }
  connectedCallback() {
    window.addEventListener("scroll", () => this.handleScroll(), {
      passive: !0
    })
  }
  handleScroll() {
    window.pageYOffset > this.vertical_offset_for_trigger ? this.classList.remove("hide") : this.classList.add("hide")
  }
}
customElements.define("back-to-top", BackToTop);
let submenuButtons = document.querySelectorAll(".drawer__submenu-btn"),
  PUB_SUB_EVENTS = (submenuButtons.forEach(s => {
    s.addEventListener("click", function() {
      var e = s.parentElement,
        t = e.classList.contains("is-active"),
        r = e.querySelector(".drawer__submenu-second");
      r && (r.style.height = t ? "0px" : "auto"), document.querySelectorAll(".drawer__submenu-first-item").forEach(e => {
        e.classList.remove("is-active");
        e = e.querySelector(".drawer__submenu-second");
        e && (e.style.height = "0px")
      }), !t && (e.classList.add("is-active"), r = e.querySelector(".drawer__submenu-second")) && (r.style.height = "auto")
    })
  }), {
    cartUpdate: "cart-update",
    quantityUpdate: "quantity-update",
    variantChange: "variant-change",
    cartError: "cart-error"
  });
if (document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("button.menu-link").forEach(function(n) {
      n.addEventListener("click", function() {
        var e = document.querySelector(".menu-panel.is-active")?.hasAttribute("data-menu-nested"),
          t = n.dataset.ref,
          r = document.querySelector('div.menu-panel[data-menu="' + t + '"]'),
          s = document.querySelectorAll(".menu-panel");
        let o = document.querySelector(".primary-menu-panel"),
          i = !1;
        r ? (s.forEach(function(e) {
          e.classList.contains("is-active") && (i = !0, e.hasAttribute("data-menu-nested") ? (e.classList.add("was-active"), o.style.opacity = "0", e.classList.remove("is-active")) : (setTimeout(() => {
            e.style.opacity = "0"
          }, 300), setTimeout(() => {
            e.classList.remove("is-active")
          }, 500)), e.classList.contains("is-back") && e.classList.remove("is-back"), o.style.opacity = "0")
        }), i ? o.style.opacity = "0" : o.style.opacity = "1", r.classList.add("is-active"), r.style.opacity = "1", r.classList.contains("is-back") && r.classList.remove("is-back"), e && r.classList.add("is-instant"), setTimeout(() => {
          s.forEach(function(e) {
            e.classList.contains("was-active") && e.classList.remove("was-active"), r.classList.remove("is-instant")
          })
        }, 300)) : (o.style.opacity = "1", s.forEach(function(e) {
          e.classList.contains("is-active") && (e.classList.remove("is-active"), e.classList.add("is-back"), e.classList.add("non-active"), setTimeout(() => {
            e.classList.remove("non-active")
          }, 300))
        }))
      })
    }), document.querySelector(".template--faq") && document.querySelectorAll(".accordion__section").forEach(function(s) {
      s.addEventListener("click", function() {
        var e = document.querySelector(".header").offsetHeight,
          t = this.offsetHeight,
          r = s.getBoundingClientRect().top,
          t = r - e - t;
        t < 0 && (t = 0), e < r && (t = window.scrollY), window.scrollTo({
          top: t,
          behavior: "smooth"
        })
      })
    })
  }), document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".swiper-buttons").forEach(function(e) {
      var t = e.querySelector("[class^='swiper-button--prev'], [class*=' swiper-button--prev']"),
        r = e.querySelector("[class^='swiper-button--next'], [class*=' swiper-button--next']"),
        t = (t && r && t.classList.contains("swiper-button-disabled") && r.classList.contains("swiper-button-disabled") && (e.style.display = "none"), e.parentElement.parentElement);
      t.classList.contains("section__foot") && !t.querySelector("a.button") && (t.style.marginBlockStart = "0")
    })
  }), !customElements.get("product-card")) {
  class D2 extends HTMLElement {
    constructor() {
      super(), this.isQuickCart = this.classList.contains("product-card--quick-cart"), this.init()
    }
    init() {
      this.initForm(), this.initVariants(), this.imageBorderCalc(), this.querySelector(".product-card__media") && this.querySelector(".product-card__media").classList.contains("product-card__media--hoverable") && this.secondImgHoverStates(), document.querySelector("quick-cart-drawer") || this.querySelector(".quick-cart-drawer__trigger")?.remove()
    }
    initForm() {
      this.cart = document.querySelector("cart-notification") || document.querySelector("cart-drawer"), this.addToCartForm = this.querySelector("form.product-card__add-to-cart--form"), this.addToCartForm && (this.addToCartForm.removeAttribute("method"), this.addToCartForm.removeAttribute("action")), this.submitButton = this.querySelector('button[type="submit"]'), this.addToCartForm && this.addToCartForm.addEventListener("submit", this.submitAddToCartForm.bind(this))
    }
    submitAddToCartForm(e) {
      e.preventDefault(), this.submitButton.setAttribute("disabled", ""), this.submitButton.classList.add("add-to-cart--is-disabled");
      var t = fetchConfig("javascript"),
        e = (t.headers["X-Requested-With"] = "XMLHttpRequest", delete t.headers["Content-Type"], new FormData(e.target));
      this.cart && (e.append("sections", this.cart.getSectionsToRender().map(e => e.section)), e.append("sections_url", window.location.pathname), this.cart.setActiveElement(document.activeElement)), t.body = e, fetch("" + routes.cart_add_url, t).then(e => e.json()).then(e => {
        e.errors ? this.handleErrorMessage(e.errors) : (this.cart && this.cart.renderContents(e), updateCartCounters())
      }).catch(e => {
        console.error(e)
      }).finally(() => {
        this.submitButton.removeAttribute("disabled"), this.submitButton.classList.remove("add-to-cart--is-disabled");
        var e = this.closest("quick-cart-drawer");
        e && e.close()
      })
    }
    handleErrorMessage(e = !1) {
      this.errorMessageWrapper = this.querySelector(".product-form__error-message-wrapper"), this.errorMessageWrapper && (this.errorMessage = this.errorMessageWrapper.querySelector(".product-form__error-message"), this.errorMessageWrapper.toggleAttribute("hidden", !e), e && (this.errorMessage.textContent = e), setTimeout(() => {
        this.resetErrorMessage()
      }, 5e3))
    }
    resetErrorMessage() {
      this.errorMessageWrapper && (this.errorMessageWrapper.toggleAttribute("hidden", !0), this.errorMessageWrapper.textContent = "")
    }
    initVariants() {
      this.getVariantsData(), this.querySelectorAll(".button--variant input").forEach(e => {
        e.addEventListener("click", this.onClickOptionRadioInputs.bind(this))
      });
      let t = [];
      this.querySelectorAll(".variant-option-radio-input").forEach(e => {
        e.checked && t.push(e.value)
      }), 0 === t.length && this.querySelector(".variant-option-radio-input")?.click(), this.updateVariantStatuses();
      var e = this.findCurrentVariantFromOptionRadioInputs().currentVariantId;
      this.querySelector(".product-card__media")?.dataset.updateMedia || this.updateMediaForVariant(e), this.setCartButtonState()
    }
    updateVariantStatuses() {
      let o = this.variantsObj?.filter(e => this.querySelector(":checked")?.value === e.option1),
        i = [...this.querySelectorAll(".js-product-card-options")];
      i.forEach((e, r) => {
        if (0 !== r) {
          e = [...e.querySelectorAll('input[type="radio"]')];
          let t = i[r - 1].querySelector(":checked")?.value;
          var s = o?.filter(e => e.available && e["option" + r] === t).map(e => e["option" + (r + 1)]);
          this.setInputAvailability(e, s)
        }
      })
    }
    setInputAvailability(e, r) {
      e.forEach(e => {
        var t = e.getAttribute("value"),
          t = r.includes(t);
        e.closest("li").classList.toggle("disabled", !t), e.toggleAttribute("disabled", !t)
      })
    }
    onClickOptionRadioInputs(e) {
      let {
        currentVariantId: r,
        currentCheckedOptions: t,
        currentVariantMediaId: s
      } = this.findCurrentVariantFromOptionRadioInputs(), o = (this.clearRadioInputStates(e), t.includes(e.target.value) && (e.target.setAttribute("checked", ""), this.updateVariantStatuses(), this.disableAddToCartButons(), this.updatePriceForVariant(r), this.updateDiscountBadgeForVariant(r)), this.updateFormVariantIdInput(), []);
      this.querySelectorAll("[data-product-images]").forEach(e => {
        e.getAttribute("data-product-images").split(",").forEach(e => {
          o.push(e)
        })
      }), o.includes(r.toString()) && this.updateMediaForVariant(r), this.isQuickCart && s && document.querySelector("quick-cart-drawer").setActiveMedia(s), this.querySelectorAll("[data-product-link]").forEach(e => {
        var t = e.getAttribute("href");
        r && (t = t.split("?variant=")[0] + "?variant=" + r, e.setAttribute("href", t))
      })
    }
    setCartButtonState() {
      var e = this.findCurrentVariantFromOptionRadioInputs().currentVariantAvailable;
      e && this.submitButton?.toggleAttribute("disabled", !e)
    }
    updateMediaForVariant(t) {
      t && this.querySelectorAll("[data-product-images]").forEach(e => {
        e.classList.toggle("hidden", !e.getAttribute("data-product-images").includes(t))
      })
    }
    updateFormVariantIdInput() {
      var e = this.findCurrentVariantFromOptionRadioInputs().currentVariantId,
        t = this.querySelector('input[name="id"]');
      e && t && (this.querySelector('input[name="id"]').value = e)
    }
    updatePriceForVariant(t) {
      var r, s, o, i = this.variantsObj?.find(e => e.id === t);
      if (i) {
        let e = this.querySelector(".price__container");
        e || (s = this.previousElementSibling) && (e = s.querySelector(".price__container")), e && (r = formatPrice(s = e.dataset.moneyFormat, i.price / 100), s = formatPrice(s, i.compare_at_price / 100), i = e.dataset.labelPriceRegular, o = e.dataset.labelPriceSale, parseFloat(s) > parseFloat(r) ? e.innerHTML = `
            <div class="price__sale">
              <div class="price__sale-inner">
                <span class="visually-hidden">${o}</span>
                <s>${s}</s>
                <ins>
                  <span class="visually-hidden">${i}</span>
                  ${r}
                </ins>
              </div>
            </div>
          ` : e.innerHTML = `
            <div class="price__sale">
              <div class="price__sale-inner">
                <span class="visually-hidden">${i}</span>
                ${r}
              </div>
            </div>
          `)
      }
    }
    updateDiscountBadgeForVariant(t) {
      var r, s = this.variantsObj?.find(e => e.id === t);
      if (s) {
        let e = this.querySelector(".product-card__badge--discount");
        e || (r = this.previousElementSibling) && (e = r.querySelector(".product-card__badge--discount")), e && (s.compare_at_price > s.price ? (e.classList.remove("hidden"), r = e.querySelector(".percentage"), s = Math.round((s.compare_at_price - s.price) / s.compare_at_price * 100), r.textContent = s) : e.classList.add("hidden"))
      }
    }
    disableCheckedVariantOptions() {
      this.querySelectorAll(".variant-option-radio-input[checked]").forEach(e => {
        this.isQuickCart ? e.setAttribute("disabled", "") : e.removeAttribute("disabled")
      })
    }
    disableAddToCartButons() {
      var e = this.findCurrentVariantFromOptionRadioInputs().currentVariantAvailable,
        t = this.querySelector(".product-card__add-to-cart--form button[type='submit']");
      t && !t.classList.contains("product-card__add-to-cart--button") && (e ? t.removeAttribute("disabled") : t.setAttribute("disabled", ""))
    }
    clearRadioInputStates(e) {
      e.target.closest(".js-product-card-options").querySelectorAll(".variant-option-radio-input").forEach(e => {
        e.removeAttribute("checked")
      })
    }
    findCurrentVariantFromOptionRadioInputs() {
      let t = null,
        r = "",
        s = "",
        o = [];
      return this.querySelectorAll(".js-product-card-options").forEach(e => {
        e.parentNode.classList.contains("hidden") ? o.push(e.querySelector('input[type="radio"]').value) : e.querySelectorAll('input[type="radio"]').forEach(e => {
          e.checked && o.push(e.value)
        })
      }), this.variantsObj?.forEach(e => {
        (e.options.join() === o.join() || 1 === e.options.length && 0 === o.length) && (r = e.id, t = e.available, s = e.featured_media?.id || null)
      }), {
        currentVariantAvailable: t,
        currentVariantId: r,
        currentCheckedOptions: o,
        currentVariantMediaId: s
      }
    }
    findAndDisableAllUnavailableOptionsForSelectedVariant(e) {
      let r = "";
      r = (e || this.querySelectorAll(".variant-option-radio-input")[0]).value;
      e = this.findCurrentVariantFromOptionRadioInputs().currentCheckedOptions;
      let s = e.indexOf(r) + 1;
      this.variantsObj.forEach(t => {
        t["option" + s] !== r || t.available || [1, 2, 3].forEach(e => {
          e !== s && t["option" + e] && this.querySelector(`.variant-option-radio-input[value="${t["option"+e]}"]`).closest("li").classList.add("disabled")
        })
      })
    }
    getVariantsData() {
      var e = JSON.parse(this.querySelector("[data-product-variants-json]") ? this.querySelector("[data-product-variants-json]").textContent : "[]");
      return (!e || 0 !== Object.keys(e).length) && (this.variantsObj = e)
    }
    secondImgHoverStates() {
      let e = this.querySelector(".product-card__actions");
      !e || window.innerWidth < 750 || (e.addEventListener("mouseenter", () => e.classList.add("is--hovering")), e.addEventListener("mouseleave", () => e.classList.remove("is--hovering")))
    }
    imageBorderCalc() {
      var e = document.querySelectorAll(".product-swatch__inner-border--enable img");

      function t(e) {
        var t = document.createElement("canvas"),
          r = t.getContext("2d"),
          s = e.naturalWidth || e.width,
          o = e.naturalHeight || e.height,
          t = (t.width = s, t.height = o, r.drawImage(e, 0, 0, s, o), Math.floor(s / 2)),
          s = Math.floor(o / 2),
          o = r.getImageData(t, s, 1, 1).data,
          r = o[0],
          t = o[1],
          s = o[2],
          o = Math.max(0, Math.floor(.8 * r)),
          r = Math.max(0, Math.floor(.8 * t)),
          t = Math.max(0, Math.floor(.8 * s));
        e.style.borderColor = `rgb(${o}, ${r}, ${t})`
      }
      e && e.forEach(e => {
        e.complete ? t(e) : e.onload = () => t(e)
      })
    }
  }
  customElements.define("product-card", D2)
}
async function updateCartCounters() {
  var e = document.querySelectorAll(".cart-count-badge"),
    r = document.querySelectorAll(".cart-drawer__title-counter"),
    r = [...e, ...r].filter(e => null !== e);
  try {
    var s = await (await fetch(routes.cart_url + ".json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })).text();
    let t = JSON.parse(s);
    0 < r.length && r.forEach(e => {
      e.textContent = t.item_count
    }), 0 < e.length && e.forEach(e => {
      e.classList.toggle("hidden", 0 === t.item_count)
    })
  } catch (e) {
    console.error("Cart counters could not be updated:", e)
  }
}
async function updateFreeShipping() {
  var r = Shopify.currency.rate;
  let {
    cart_free_shipping_text: n,
    cart_free_shipping_text_success: a,
    cart_free_shipping_threshold: l,
    money_format: c
  } = window.theme.settings;
  var d = document.querySelectorAll("shipping-bar");
  try {
    let {
      total_price: s,
      item_count: e
    } = await (await fetch("/cart.js")).json(), t = 0 == e ? "hidden" : "visible", o = (d.forEach(e => e.style.visibility = t), Math.round(l * r)), i = o - s;
    d.forEach(e => {
      var t, r = e.querySelector(".progress-bar__text"),
        e = e.querySelector("[data-progress-line]");
      s >= o ? (r.innerHTML = a, e.style.width = "100%") : ((t = n.match(/<span class="money">(.*)<\/span>/)) && (t = n.replace(t[1], "" + formatPrice(c, i / 100)), r.innerHTML = t), e.style.width = `calc(${s/o*100}% + 2px)`)
    })
  } catch (e) {
    console.error("Error fetching cart data:", e)
  }
}

function formatPrice(e, t) {
  t = t.toFixed(2);
  var r = /{{(.*?)}}/;
  let s = "",
    o = (e.match(r) ? s = e.match(r)[1] : console.error("No match found"), "");
  switch (s) {
    case "amount":
      o = e.replace(r, Intl.NumberFormat(Shopify.locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(t));
      break;
    case "amount_with_comma_separator":
      o = e.replace(r, t.toString().replace(".", ","));
      break;
    case "amount_no_decimals":
      o = e.replace(r, Math.round(t));
      break;
    case "amount_no_decimals_with_comma_separator":
      o = e.replace(r, Intl.NumberFormat(Shopify.locale).format(Math.round(t)).toString().replace(".", ","));
      break;
    default:
      o = e.replace(r, t)
  }
  return o
}
class SwiperComponent extends HTMLElement {
  constructor() {
    super(), this.swiperOptions = JSON.parse(this.getAttribute("data-swiper-options")) || {}, this.swiperInitialized = !1, this.section = this.closest("section"), this.observer = null
  }
  connectedCallback() {
    this.section && this.section.classList.contains("shopify-section") && (this.observer = new IntersectionObserver((e, t) => {
      e.forEach(e => {
        e.isIntersecting && (this.init(), t.disconnect())
      })
    }), this.observer.observe(this.section)), Shopify.designMode ? (window.addEventListener("shopify:section:load", () => this.init()), window.addEventListener("shopify:section:select", () => this.init()), setTimeout(() => {
      this.swiperInitialized || this.init()
    }, 100)) : window.addEventListener("load", () => this.init())
  }
  init() {
    if (!this.swiperInitialized) {
      this.swiperInitialized = !0;
      var e = this.swiperOptions,
        t = {
          slideshowId: e.swiperId || "",
          slideCount: e.slideCount || 1,
          slidesPerView: e.slidesPerView || "auto",
          slidesPerViewDesktop: e.slidesPerViewDesktop || e.slidesPerView || 4,
          slidesPerViewTablet: e.slidesPerViewTablet || e.slidesPerViewDesktop || e.slidesPerView || 3,
          spaceBetween: e.spaceBetweenMobile || 0,
          spaceBetweenDesktop: e.spaceBetweenDesktop || e.spaceBetween || 0,
          spaceBetweenTablet: e.spaceBetweenTablet || e.spaceBetweenDesktop || e.spaceBetweenMobile || 0,
          enabled: e.enabled ?? !0,
          enabledDesktop: e.enabledDesktop ?? e.enabled ?? !0,
          enabledTablet: e.enabledTablet ?? e.enabledDesktop ?? e.enabled ?? !0,
          allowTouchMove: e.allowTouchMove ?? ("number" != typeof e.slidesPerView || e.slideCount > e.slidesPerView),
          allowTouchMoveTablet: e.allowTouchMoveTablet ?? ("number" != typeof e.slidesPerViewTablet || e.slideCount > e.slidesPerViewTablet),
          allowTouchMoveDesktop: e.allowTouchMoveDesktop ?? ("number" != typeof e.slidesPerViewDesktop || e.slideCount > e.slidesPerViewDesktop)
        };
      if (this.swiperOptions = {
          a11y: !1,
          allowTouchMove: t.allowTouchMove,
          loop: e.loop || !1,
          rewind: e.rewind || !1,
          followFinger: e.followFinger || !1,
          cssMode: e.cssMode || !1,
          enabled: t.enabled,
          watchOverflow: !0,
          observer: !0,
          cache: !0,
          slidesPerView: t.slidesPerView,
          spaceBetween: t.spaceBetween,
          breakpoints: {
            750: {
              enabled: t.enabledTablet,
              allowTouchMove: t.allowTouchMoveTablet,
              slidesPerView: t.slidesPerViewTablet,
              spaceBetween: t.spaceBetweenTablet
            },
            990: {
              enabled: t.enabledDesktop,
              allowTouchMove: t.allowTouchMoveDesktop,
              slidesPerView: t.slidesPerViewDesktop,
              spaceBetween: t.spaceBetweenDesktop
            }
          }
        }, e.navigation && (this.swiperOptions.navigation = {
          ...e.navigation
        }), "fade" == e.effect && (this.swiperOptions.effect = "fade", this.swiperOptions.fadeEffect = {
          crossFade: !0
        }), this.swiperOptions.pagination = "custom_bullet" == e.pagination ? {
          el: e.paginationElement,
          clickable: !0,
          renderBullet: function(e, t) {
            return `
            <button class="${t}">
              <span></span>
            </button>
          `
          }
        } : {
          el: ".swiper-pagination--" + e.swiperId,
          clickable: !0
        }, e.autoplay && (this.swiperOptions.autoplay = {
          ...e.autoplay
        }, e.autoplayProgress)) {
        let s = this.querySelector(`.autoplay-progress--${e.swiperId} svg`),
          o = this.querySelector(`.autoplay-progress--${e.swiperId} span`);
        this.swiperOptions.on = {
          autoplayTimeLeft(e, t, r) {
            s.style.setProperty("--progress", 1 - r), o.textContent = "" + Math.ceil(t / 1e3)
          }
        }
      }
      this.swiper = new Swiper(this, {
        ...this.swiperOptions
      })
    }
  }
}
customElements.define("swiper-component", SwiperComponent);
class ShowPopup extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.querySelectorAll("[data-toggle-popup]").forEach(e => {
      e.addEventListener("click", () => {
        this.querySelector('[data-popup="show-popup"]').classList.toggle("hidden")
      })
    })
  }
}
customElements.define("show-popup", ShowPopup);