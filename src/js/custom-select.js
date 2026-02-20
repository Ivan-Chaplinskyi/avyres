if (!customElements.get("custom-select")) {
  class a extends HTMLElement {
    constructor() {
      super(), this.selectEl = this.querySelector("select"), this.createCustomSelect(), this.dropdown = this.querySelector(".js-dropdown"), this.btnToggleDropdown = this.querySelector(".js-btn-dropdown"), this.listOptions = this.querySelector(".js-list-options"), this.isExpanded = !1, this.selectLabel = this.getAttribute("data-label"), window.addEventListener("shopify:section:load", () => {
        clearTimeout(this.loadTimeout)
      }), window.addEventListener("resize", () => {
        window.innerWidth < tabletWidth || +this.btnToggleDropdown.style.width.replace("px", "") === this.dropdown.clientWidth || (this.btnToggleDropdown.style.width = this.dropdown.clientWidth + "px")
      }), this.btnToggleDropdown.addEventListener("click", t => {
        t.preventDefault(), this.classList.contains("is-expanded") ? this.hideDropdown() : this.showDropdown()
      }), this.btnToggleDropdown.addEventListener("keydown", e => {
        if (e.key.includes("Arrow")) {
          e.preventDefault();
          var s = e.key.includes("Right"),
            i = e.key.includes("Left") || s;
          if (this.isExpanded && i) return;
          var i = s || e.key.includes("Down"),
            s = this.listOptions.querySelector(".js-btn-option.is-selected"),
            n = s.parentElement;
          let t = (i ? n.nextElementSibling : n.previousElementSibling)?.firstElementChild;
          t = t || (i ? this.listOptions.firstElementChild : this.listOptions.lastElementChild).firstElementChild, void this.changeSelectedOption(s, t)
        } else !this.isExpanded || "Escape" !== e.key && "Tab" !== e.key || (e.preventDefault(), this.hideDropdown())
      }), this.listOptions.addEventListener("click", t => {
        var e;
        t.target.classList.contains("js-btn-option") && (t.preventDefault(), e = (t = t.target).classList.contains("is-selected"), this.hideDropdown(), e || this.changeSelectedOption(void 0, t))
      }), document.addEventListener("click", t => {
        this.isExpanded && t.target.closest("custom-select") !== this && this.hideDropdown()
      })
    }
    createCustomSelect() {
      this.getAttribute("data-label");
      var t = this.querySelectorAll("option"),
        e = this.selectEl.querySelector('option[selected="selected"]');
      let s = "";
      t.forEach(t => {
        t = `
          <li class="custom-select__item">
            <button
              type="button"
              class="custom-select__option button-reset js-btn-option ${t.selected?"is-selected":""}"
              data-value="${t.value}"
              tabindex="-1"
              aria-selected="${t.selected}"
            >${t.textContent}</button>
          </li>
        `;
        s += t
      });
      t = `
        <div class="custom-select__wrapper">
          <button
            type="button"
            class="custom-select__btn button-reset focus-inset js-btn-dropdown facets__button-custom"
            aria-controls="${this.dataset.dropdownId}"
            aria-expanded="false"
          >
            ${e.textContent} ${this.dataset.iconChevronDown}
          </button>
          <div class="custom-select__dropdown js-dropdown" id="${this.dataset.dropdownId}">
            <ul class="custom-select__items list-unstyled js-list-options">
              ${s}
            </ul>
          </div>
        </div>
      `;
      this.insertAdjacentHTML("afterbegin", t), this.dataset.value = e.value
    }
    changeSelectedOption(t = this.listOptions.querySelector(".js-btn-option.is-selected"), e) {
      this.btnToggleDropdown.innerHTML = e.textContent + this.dataset.iconChevronDown, this.dataset.value = e.dataset.value, e.classList.add("is-selected"), e.setAttribute("aria-selected", !0), t.classList.remove("is-selected"), t.setAttribute("aria-selected", !1);
      e = this.selectEl.querySelector('option[selected="selected"]'), t = this.selectEl.querySelector(`option[value="${this.dataset.value}"]`), e.removeAttribute("selected"), t.setAttribute("selected", "selected"), e = new Event("input", {
        bubbles: !0
      });
      this.selectEl.dispatchEvent(e)
    }
    showDropdown() {
      this.isExpanded = !0, this.classList.add("is-expanded"), this.btnToggleDropdown.setAttribute("aria-expanded", !0)
    }
    hideDropdown() {
      this.isExpanded = !1, this.classList.remove("is-expanded"), this.btnToggleDropdown.setAttribute("aria-expanded", !1)
    }
  }
  customElements.define("custom-select", a)
}