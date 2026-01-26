class FacetFiltersForm extends HTMLElement {
  constructor() {
    super(), this.onActiveFilterClick = this.onActiveFilterClick.bind(this), this.debouncedOnSubmit = debounce(e => {
      this.onSubmitHandler(e)
    }, 800);
    this.querySelector("form").addEventListener("input", this.debouncedOnSubmit.bind(this));
    var e = this.querySelector("#FacetsWrapperDesktop");
    e && e.addEventListener("keyup", onKeyUpEscape)
  }
  static setListeners() {
    window.addEventListener("popstate", e => {
      e = e.state ? e.state.searchParams : FacetFiltersForm.searchParamsInitial;
      e !== FacetFiltersForm.searchParamsPrev && FacetFiltersForm.renderPage(e, null, !1)
    })
  }
  static toggleActiveFacets(t = !0) {
    document.querySelectorAll(".js-facet-remove").forEach(e => {
      e.classList.toggle("disabled", t)
    })
  }
  static renderPage(r, a, e = !0) {
    FacetFiltersForm.searchParamsPrev = r;
    var t = FacetFiltersForm.getSections(),
      n = document.getElementById("ProductCount"),
      i = document.getElementById("ProductCountDesktop");
    document.getElementById("ProductGridContainer").querySelector(".collection-grid-container").classList.add("loading"), n && n.classList.add("loading"), i && i.classList.add("loading"), t.forEach(e => {
      let t = `${window.location.pathname}?section_id=${e.section}&` + r;
      e = e => e.url === t;
      FacetFiltersForm.filterData.some(e) ? FacetFiltersForm.renderSectionFromCache(e, a) : FacetFiltersForm.renderSectionFromFetch(t, a)
    }), e && FacetFiltersForm.updateURLHash(r)
  }
  static renderSectionFromFetch(t, r) {
    fetch(t).then(e => e.text()).then(e => {
      FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, {
        html: e,
        url: t
      }], FacetFiltersForm.renderFilters(e, r), FacetFiltersForm.renderProductGridContainer(e), FacetFiltersForm.renderProductCount(e), document.getElementById("SortBy") && document.getElementById("SortBy").dispatchEvent(new Event("change", {
        bubbles: !0
      })), "function" == typeof initializeScrollAnimationTrigger && initializeScrollAnimationTrigger(e.innerHTML)
    })
  }
  static renderSectionFromCache(e, t) {
    e = FacetFiltersForm.filterData.find(e).html;
    FacetFiltersForm.renderFilters(e, t), FacetFiltersForm.renderProductGridContainer(e), FacetFiltersForm.renderProductCount(e), document.getElementById("SortBy") && document.getElementById("SortBy").dispatchEvent(new Event("change", {
      bubbles: !0
    })), "function" == typeof initializeScrollAnimationTrigger && initializeScrollAnimationTrigger(e.innerHTML)
  }
  static renderProductGridContainer(e) {
    document.getElementById("ProductGridContainer").innerHTML = (new DOMParser).parseFromString(e, "text/html").getElementById("ProductGridContainer").innerHTML, document.getElementById("ProductGridContainer").querySelectorAll(".scroll-trigger").forEach(e => {
      e.classList.add("scroll-trigger--cancel")
    })
  }
  static renderProductCount(e) {
    var e = (new DOMParser).parseFromString(e, "text/html").getElementById("ProductCount").innerHTML,
      t = document.getElementById("ProductCount"),
      r = document.getElementById("ProductCountDesktop");
    t.innerHTML = e, t.classList.remove("loading"), r && (r.innerHTML = e, r.classList.remove("loading"))
  }
  static renderFilters(e, r) {
    e = (new DOMParser).parseFromString(e, "text/html");
    let a = e.querySelectorAll("#FacetFiltersForm .js-filter");
    var t = document.querySelectorAll("#FacetFiltersForm .js-filter");
    Array.from(t).forEach(t => {
      Array.from(a).some(({
        id: e
      }) => t.id === e) || t.remove()
    });
    let n = e => {
        var t = r ? r.target.closest(".js-filter") : void 0;
        return !!t && e.id === t.id
      },
      i = Array.from(a).filter(e => !n(e));
    var t = Array.from(a).find(n);
    i.forEach((e, t) => {
      var r;
      document.getElementById(e.id) ? document.getElementById(e.id).innerHTML = e.innerHTML : 0 < t && ({
        className: t,
        id: r
      } = i[t - 1], e.className === t) && document.getElementById(r).after(e)
    }), FacetFiltersForm.renderActiveFacets(e), t && (e = r.target.closest(".js-filter").id) && (FacetFiltersForm.renderCounts(t, r.target.closest(".js-filter")), t = document.getElementById(e).querySelector(".facets__summary"), e = "text" === r.target.getAttribute("type"), t) && !e && t.focus()
  }
  static renderActiveFacets(r) {
    [".active-facets"].forEach(e => {
      var t = r.querySelector(e);
      t && (document.querySelector(e).innerHTML = t.innerHTML)
    }), FacetFiltersForm.toggleActiveFacets(!1)
  }
  static renderCounts(e, t) {
    var r = t.querySelector(".facets__summary"),
      a = e.querySelector(".facets__summary"),
      r = (a && r && (r.outerHTML = a.outerHTML), t.querySelector(".facets__header")),
      a = e.querySelector(".facets__header"),
      r = (a && r && (r.outerHTML = a.outerHTML), t.querySelector(".facets-wrap")),
      a = e.querySelector(".facets-wrap");
    a && r && (Boolean(t.querySelector("show-more-button .label-show-more.hidden")) && a.querySelectorAll(".facets__item.hidden").forEach(e => e.classList.replace("hidden", "show-more-item")), r.outerHTML = a.outerHTML)
  }
  static updateURLHash(e) {
    history.pushState({
      searchParams: e
    }, "", "" + window.location.pathname + (e && "?".concat(e)))
  }
  static getSections() {
    return [{
      section: document.getElementById("product-grid").dataset.id
    }]
  }
  createSearchParams(e) {
    e = new FormData(e);
    return new URLSearchParams(e).toString()
  }
  onSubmitForm(e, t) {
    FacetFiltersForm.renderPage(e, t)
  }
  onSubmitHandler(e) {
    e.preventDefault();
    let t = new URLSearchParams;
    var r = new URL(window.location.href).searchParams.get("sort_by"),
      r = (r && t.set("sort_by", r), document.getElementById("SortBy"));
    r && r.value && t.set("sort_by", r.value), document.querySelectorAll("facet-filters-form form").forEach(e => {
      e.querySelectorAll('input[type="checkbox"]').forEach(e => {
        e.checked && t.append(e.name, e.value)
      }), e.querySelectorAll('input:not([type="checkbox"])').forEach(e => {
        e.value && "sort_by" !== e.name && t.set(e.name, e.value)
      }), e.querySelectorAll("select").forEach(e => {
        e.value && "sort_by" === e.name && t.set("sort_by", e.value)
      })
    }), this.onSubmitForm(t.toString(), e)
  }
  onActiveFilterClick(e) {
    e.preventDefault(), FacetFiltersForm.toggleActiveFacets();
    e = -1 == e.currentTarget.href.indexOf("?") ? "" : e.currentTarget.href.slice(e.currentTarget.href.indexOf("?") + 1);
    FacetFiltersForm.renderPage(e)
  }
}
FacetFiltersForm.filterData = [], FacetFiltersForm.searchParamsInitial = window.location.search.slice(1), FacetFiltersForm.searchParamsPrev = window.location.search.slice(1), customElements.define("facet-filters-form", FacetFiltersForm), FacetFiltersForm.setListeners();
class PriceRange extends HTMLElement {
  constructor() {
    super(), this.querySelectorAll("input").forEach(e => {
      e.addEventListener("change", this.onRangeChange.bind(this)), e.addEventListener("keydown", this.onKeyDown.bind(this))
    }), this.setMinAndMaxValues()
  }
  onRangeChange(e) {
    this.adjustToValidValues(e.currentTarget), this.setMinAndMaxValues()
  }
  onKeyDown(e) {
    ["Backspace", "Tab", "Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Delete", "Escape"].includes(e.key) || /[0-9.,]/.test(e.key) || e.preventDefault()
  }
  setMinAndMaxValues() {
    var e = this.querySelectorAll("input"),
      t = e[0],
      e = e[1];
    e.value ? t.setAttribute("data-max", e.value) : t.setAttribute("data-max", e.getAttribute("max")), t.value ? e.setAttribute("data-min", t.value) : e.setAttribute("data-min", t.getAttribute("min"))
  }
  adjustToValidValues(e) {
    var t = Number(e.value),
      r = Number(e.getAttribute("min")) || 0,
      a = Number(e.getAttribute("max"));
    !isNaN(r) && t < r && (e.value = r), !isNaN(a) && a < t && (e.value = a)
  }
}
customElements.define("price-range", PriceRange);
class FacetRemove extends HTMLElement {
  constructor() {
    super();
    var e = this.querySelector("a");
    e.setAttribute("role", "button"), e.addEventListener("click", this.closeFilter.bind(this)), e.addEventListener("keyup", e => {
      e.preventDefault(), "SPACE" === e.code.toUpperCase() && this.closeFilter(e)
    })
  }
  closeFilter(e) {
    e.preventDefault(), (this.closest("facet-filters-form") || document.querySelector("facet-filters-form")).onActiveFilterClick(e)
  }
}
customElements.define("facet-remove", FacetRemove);