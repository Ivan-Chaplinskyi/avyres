if (!customElements.get("product-selector")) {
  class a extends HTMLElement {
    constructor() {
      super(), this.mainElement = this.closest(".highlighted-product"), this.inputWrapper = "[data-input-wrapper]", this.variants = JSON.parse(this.querySelector('[type="application/json"]').textContent), this.variantOptionInputs = this.querySelectorAll(".product-option__input"), this.form = document.querySelector("#ProductForm-" + this.dataset.sectionId), this.purchaseOptions = document.querySelector("#Product-Purchase-Options-" + this.dataset.sectionId), this.productBar = document.querySelector("#ProductBar-" + this.dataset.sectionId), this.installmentsForm = document.querySelector("#Product-Installments-" + this.dataset.installmentsFormId), this.addEventListener("change", this.onVariantChange), this.addEventListener("keydown", this.onKeyDown), this.updateOptions(), this.updateVariantStatuses(), this.updateVariant(), this.updateMedia(), this.scrollToImage(), this.form?.toggleAddButton(!this.currentVariant.available, "")
    }
    updateVariantStatuses() {
      let e = this.querySelector(this.inputWrapper).querySelector(":checked").value,
        r = this.variants.filter(t => e === t.option1),
        s = [...this.querySelectorAll(this.inputWrapper)];
      s.forEach((t, a) => {
        if (0 !== a) {
          let e = s[a - 1].querySelector(":checked").value,
            i = r.filter(t => t.available && t["option" + a] === e).map(t => t["option" + (a + 1)]);
          [...t.querySelectorAll('input[type="radio"], option')].forEach(t => {
            var e, a = !i.includes(t.getAttribute("value"));
            t.disabled = a, "option" === t.tagName.toLowerCase() && (e = `button[data-value="${t.value.replace(/"/g,'\\"')}"]`, e = t.closest("dropdown-input").querySelector(e)) && (e.disabled = a), this.productBar && (e = t.dataset.id || t.id, t = this.productBar.querySelector(`option[data-id="${e}"]`)) && (t.disabled = a)
          })
        }
      }), this.querySelectorAll('input[type="radio"]').forEach(t => {
        t.checked && t.nextElementSibling.classList.add("is-active")
      }), this.updateVariantOptionsLegend()
    }
    updatePriceForVariant(e) {
      var t, a, i, r, s = this.variants.find(t => t.id === e);
      s && (t = this.mainElement.querySelector(".price__container")) && (i = t.dataset.moneyFormat, a = formatPrice(i, s.price / 100), i = formatPrice(i, s.compare_at_price / 100), s = t.dataset.labelPriceRegular, r = t.dataset.labelPriceSale, parseFloat(i) > parseFloat(a) ? t.innerHTML = `
            <div class="price__sale">
              <div class="price__sale-inner">
                <span class="visually-hidden">${r}</span>
                <s>${i}</s>
                <ins>
                  <span class="visually-hidden">${s}</span>
                  ${a}
                </ins>
              </div>
            </div>
          ` : t.innerHTML = `
            <div class="price__sale">
              <div class="price__sale-inner">
                <span class="visually-hidden">${s}</span>
                ${a}
              </div>
            </div>
          `)
    }
    updateDiscountBadgeForVariant(e) {
      var t, a, i = this.variants.find(t => t.id === e);
      i && (t = this.mainElement.querySelector(".product-card__badge--discount")) && (i.compare_at_price > i.price ? (t.classList.remove("hidden"), a = t.querySelector(".percentage"), i = Math.round((i.compare_at_price - i.price) / i.compare_at_price * 100), a.textContent = i) : t.classList.add("hidden"))
    }
    onKeyDown(t) {
      "Enter" === t.key && (t = t.target).classList.contains("swatch") && t.click()
    }
    onVariantChange(t) {
      "number" !== t.target.type && (this.updateOptions(), this.currentVariant !== this.getVariantData()) && (this.updateVariant(), this.updateVariantStatuses(), this.updatePriceForVariant(this.currentVariant.id), this.updateDiscountBadgeForVariant(this.currentVariant.id), this.productBarUpdateOptions(), this.updatePickupAvailability(), this.form.removeAttribute("data-has-selling-plan"), this.form.toggleAddButton(!1, ""), this.form.handleErrorMessage(), this.currentVariant ? (this.currentVariant.available || this.form.toggleAddButton(!0, window.variantStrings.soldOut), this.closest(".product").classList.contains("highlighted-product") || this.updateURL(), this.updateVariantInput(), this.renderProductInfo(), this.updateSKU(), this.updateVariantOptionsLegend(), this.updateMedia(), this.scrollToImage()) : (this.form.toggleAddButton(!0, ""), this.setUnavailable()))
    }
    updateOptions() {
      this.querySelectorAll('input[type="radio"]').forEach(t => {
        t.disabled ? t.nextElementSibling.classList.toggle("is-active", !1) : t.nextElementSibling.classList.toggle("is-active", t.checked)
      }), this.options = Array.from(this.querySelectorAll('input[type="radio"]:checked, select'), t => ({
        name: t.dataset.name || t.name,
        value: t.value
      }))
    }
    productBarUpdateOptions() {
      this.productBar && (Array.from(this.productBar.querySelectorAll("select")).map(e => {
        e.value = this.options.find(t => t.name === e.name).value
      }), this.productBar.querySelectorAll("dropdown-input").forEach(t => {
        t.update()
      }))
    }
    updateInventoryNotice(t) {
      var e = this.closest(".product").querySelector("[data-inventory-notice]"),
        t = t.querySelector("[data-inventory-notice]");
      t && e && (e.innerHTML = t.innerHTML)
    }
    updatePickupAvailability() {
      var t = document.querySelector("pickup-availability");
      t && this.currentVariant && (t.dataset.variantId = this.currentVariant.id, this.currentVariant && this.currentVariant.available ? (t.setAttribute("available", ""), t.fetchAvailability(t.dataset.variantId)) : (t.removeAttribute("available"), t.innerHTML = ""))
    }
    updateVariant() {
      this.currentVariant = this.getVariantData()
    }
    getVariantData() {
      return this.options.length ? this.variants.find(t => !t.options.map((t, e) => this.options[e].value === t).includes(!1)) : this.variants[0]
    }
    updateMedia() {
      if (this.currentVariant && this.currentVariant.featured_media) {
        let t = this.closest(".product").querySelector("product-media");
        (t = t || this.closest(".main-product").querySelector("swiper-product-gallery")).setActiveMedia(this.currentVariant.featured_media.id)
      }
    }
    updateSKU() {
      document.querySelector(".product__sku") && (document.querySelector(".product__sku span").innerText = this.currentVariant.sku || "")
    }
    updateURL(t) {
      var e;
      this.currentVariant && ((e = new URLSearchParams(window.location.search))[e.has("variant") ? "set" : "append"]("variant", this.currentVariant.id), t ? e[e.has("selling_plan") ? "set" : "append"]("selling_plan", t) : e.delete("selling_plan"), window.history.replaceState({}, "", this.dataset.url + "?" + e.toString()))
    }
    updateVariantInput() {
      [this.querySelector('[name="id"'), this.installmentsForm?.querySelector('[name="id"]')].forEach(t => {
        t && (t.value = this.currentVariant.id, t.dispatchEvent(new Event("change", {
          bubbles: !0
        })))
      })
    }
    setUnavailable() {
      var t = this.form.submitButton,
        e = this.querySelector("#Product-Price-" + this.dataset.sectionId);
      t && (t.textContent = window.variantStrings.unavailable, e) && e.classList.add("visibility-hidden")
    }
    renderProductInfo() {
      var t = new URLSearchParams(window.location.search);
      t[t.has("variant") ? "set" : "append"]("variant", this.currentVariant.id), this.closest(".product").classList.contains("highlighted-product") || t.append("section_id", this.dataset.sectionId), fetch(this.dataset.url + "?" + t.toString()).then(t => t.text()).then(t => {
        let a = (new DOMParser).parseFromString(t, "text/html");
        ["#Product-Price-" + this.dataset.sectionId, "#Product-Purchase-Options-" + this.dataset.sectionId, ".product__sticky-cart-wrapper"].map(t => {
          var e = document.querySelector(t),
            t = a.querySelector(t);
          this.updateInventoryNotice(a), e && t && (e.classList.remove("visibility-hidden"), e.innerHTML = t.innerHTML)
        })
      })
    }
    updateVariantOptionsLegend() {
      this.variantOptionInputs.forEach(t => {
        var e, a = t.closest(".js-product-variants").querySelector("legend").querySelector(".product-selector__label-text");
        a && t.checked && (t = t.nextElementSibling.title, (e = a.nextElementSibling) && e.classList.contains("active-variant-label") ? e.textContent = t : ((e = document.createElement("span")).classList.add("active-variant-label"), e.textContent = t, a.insertAdjacentElement("afterend", e)))
      })
    }
    scrollToImage() {
      this.closest(".product").querySelectorAll("[data-product-images]").forEach(t => {
        t.getAttribute("data-product-images").includes(this.currentVariant.id) && t.scrollIntoView({
          behavior: "smooth"
        })
      })
    }
  }
  customElements.define("product-selector", a)
}