void 0 === window.Shopify && (window.Shopify = {}), Shopify.bind = function(t, e) {
  return function() {
    return t.apply(e, arguments)
  }
}, Shopify.setSelectorByValue = function(t, e) {
  for (var n = 0, i = t.options.length; n < i; n++) {
    var o = t.options[n];
    if (e == o.value || e == o.innerHTML) return t.selectedIndex = n
  }
}, Shopify.addListener = function(t, e, n) {
  t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent("on" + e, n)
}, Shopify.postLink = function(t, e) {
  var n, i = (e = e || {}).method || "post",
    o = e.parameters || {},
    r = document.createElement("form");
  for (n in r.setAttribute("method", i), r.setAttribute("action", t), o) {
    var l = document.createElement("input");
    l.setAttribute("type", "hidden"), l.setAttribute("name", n), l.setAttribute("value", o[n]), r.appendChild(l)
  }
  document.body.appendChild(r), r.submit(), document.body.removeChild(r)
}, Shopify.CountryProvinceSelector = function(t, e, n) {
  this.countryEl = document.getElementById(t), this.provinceEl = document.getElementById(e), this.provinceContainer = document.getElementById(n.hideElement || e), Shopify.addListener(this.countryEl, "change", Shopify.bind(this.countryHandler, this)), this.initCountry(), this.initProvince()
}, Shopify.CountryProvinceSelector.prototype = {
  initCountry: function() {
    var t = this.countryEl.getAttribute("data-default");
    Shopify.setSelectorByValue(this.countryEl, t), this.countryHandler()
  },
  initProvince: function() {
    var t = this.provinceEl.getAttribute("data-default");
    t && 0 < this.provinceEl.options.length && Shopify.setSelectorByValue(this.provinceEl, t)
  },
  countryHandler: function(t) {
    var e = (i = this.countryEl.options[this.countryEl.selectedIndex]).getAttribute("data-provinces"),
      n = JSON.parse(e);
    if (this.clearOptions(this.provinceEl), n && 0 == n.length) this.provinceContainer.style.display = "none";
    else {
      for (var i, o = 0; o < n.length; o++)(i = document.createElement("option")).value = n[o][0], i.innerHTML = n[o][1], this.provinceEl.appendChild(i);
      this.provinceContainer.style.display = ""
    }
  },
  clearOptions: function(t) {
    for (; t.firstChild;) t.removeChild(t.firstChild)
  },
  setOptions: function(t, e) {
    var n = 0;
    for (e.length; n < e.length; n++) {
      var i = document.createElement("option");
      i.value = e[n], i.innerHTML = e[n], t.appendChild(i)
    }
  }
};