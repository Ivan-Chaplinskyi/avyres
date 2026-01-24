Shopify.designMode && window.addEventListener("shopify:block:select", function(e) {
  document.querySelectorAll(".section-interactive-banner .section-interactive-banner__element.active").forEach(function(e) {
    e.classList.remove("active")
  });
  var t = document.querySelector(".section-interactive-banner__media-element-" + e.detail.blockId);
  document.querySelector(`.section-interactive-banner__element[data-hover-target='.section-interactive-banner__media-element-${e.detail.blockId}']`).classList.add("active"), t.classList.add("active")
}), document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".section-interactive-banner__element").forEach(e => {
    var t = e.innerText,
      n = (e.innerHTML = "", document.createElement("div")),
      i = (n.classList.add("block"), document.createElement("span"));
    i.innerText = "" === t.trim() ? " " : t, i.classList.add("word"), n.appendChild(i), e.appendChild(n), e.appendChild(n.cloneNode(!0));
    t = e.querySelector(".block").getBoundingClientRect().height;
    e.style.setProperty("--interactive-banner-element-height", t + "px")
  })
});