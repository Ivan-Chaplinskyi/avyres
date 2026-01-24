let map, markers = [],
  mapElement = document.getElementById("google_map");
async function initMap() {
  var e = (await google.maps.importLibrary("maps")).Map,
    t = (await google.maps.importLibrary("marker")).AdvancedMarkerElement,
    r = document.querySelectorAll(".store-locator-card"),
    o = Array.from(document.querySelectorAll(".store-locator-card__longitude")).map(e => e.textContent),
    a = Array.from(document.querySelectorAll(".store-locator-card__latitude")).map(e => e.textContent),
    m = Array.from(document.querySelectorAll(".store-locator-card__coordinate-title")).map(e => e.textContent).map(e => e.replace(/([A-Z])/g, " $1").trim()),
    l = Array.from(document.querySelectorAll(".store-locator-card__address")).map(e => e.textContent),
    c = Array.from(document.querySelectorAll(".store-locator-card__opening-hour")).map(e => e.innerHTML),
    n = Array.from(document.querySelectorAll(".store-locator-card__actions")).map(e => e.innerHTML);
  let s = Number(document.getElementById("google_map").dataset.mapZoomLevel) || 4,
    d = s <= 18 ? 3 : 0,
    i = [];
  for (let e = 0; e < o.length; e++) {
    var p = e,
      u = Number(a[p]),
      _ = m[p],
      p = l[p],
      p = p && !_ ? p : _;
    u && i.push([`<b>${p}</b><br/><a href="https://maps.google.com/?q=${u},${Number(o[e])}" target="_blank" style="text-decoration: underline;">Location</a>`, u, Number(o[e])])
  }
  var g = Math.min(...o),
    y = Math.min(...a),
    h = Math.max(...o),
    y = (y + Math.max(...a)) / 2,
    g = (g + h) / 2;
  if ("undefined" != typeof google && void 0 !== google.maps) {
    map = new e(mapElement, {
      zoom: s,
      center: {
        lat: y,
        lng: g
      },
      scrollwheel: !0,
      gestureHandling: "greedy",
      disableDefaultUI: !0,
      backgroundColor: "#89b4f8",
      mapId: "4504f8b37365c3d0"
    });
    mapElement.dataset.mapPinIcon, new google.maps.InfoWindow({
      maxWidth: 200
    });
    for (let o = 0; o < i.length; o++) {
      ((e, t) => {
        e.addEventListener("click", function() {
          map.panTo(new google.maps.LatLng(i[t][1], i[t][2])), map.setZoom(s + d)
        })
      })(r[o], o);
      var f = document.createElement("div"),
        k = document.createElement("div"),
        L = document.createElement("div"),
        A = document.createElement("div"),
        v = document.createElement("div"),
        L = (f.className = "store-locator__map--custom-marker", f.setAttribute("id", "store-locator__map--custom-marker--" + o), k.className = "store-locator__map--custom-marker--label", k.textContent = m[o], L.className = "store-locator__map--custom-marker--point", A.className = "store-locator__map--custom-marker--hours", A.innerHTML = c[o], v.className = "store-locator__map--custom-marker--buttons", v.innerHTML = n[o], f.appendChild(k), f.appendChild(L), k.appendChild(A), k.appendChild(v), new t({
          position: new google.maps.LatLng(i[o][1], i[o][2]),
          map: map,
          content: f
        }));

      function b() {
        document.querySelectorAll(".store-locator__map--custom-marker").forEach(e => e.classList.remove("store-locator__map--custom-marker--active")), document.querySelectorAll(".store-locator-card").forEach(e => e.removeAttribute("style"))
      }
      markers = [...markers, L], google.maps.event.addListener(L, "click", (t => function() {
        let e;
        e = window.innerWidth <= 750 ? new google.maps.LatLng(i[o][1] - 5, i[o][2]) : new google.maps.LatLng(i[o][1], i[o][2]), map.panTo(e), document.querySelectorAll(".store-locator__map--custom-marker").forEach(e => e.classList.remove("store-locator__map--custom-marker--active")), document.getElementById("store-locator__map--custom-marker--" + t).classList.add("store-locator__map--custom-marker--active"), (!document.querySelector(".store-locator__map-layout").classList.contains("store-locator__map-layout--with-search") || window.innerWidth < 750) && (document.querySelectorAll(".store-locator-card").forEach(e => e.style.display = "none"), document.querySelector(`[data-marker-index="${t}"]`).style.display = "block")
      })(o)), map.addListener("click", () => {
        b()
      }), document.querySelectorAll(".store-locator-card__cross").forEach(e => {
        e.addEventListener("click", () => {
          b()
        })
      })
    }
  }
}
initMap();