document.addEventListener("DOMContentLoaded", () => {
  var e = localStorage.getItem("recently-viewed"),
    t = document.querySelector(".js-product").dataset.productHandle;
  e ? e.includes(t) || (10 < (e = [t, ...e.split(",")]).length && e.pop(), localStorage.setItem("recently-viewed", e.join(","))) : localStorage.setItem("recently-viewed", t)
});