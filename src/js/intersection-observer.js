let MOBILE_BREAKPOINT = 750,
  DEFAULT_DELAY = 300,
  DEFAULT_DURATION = 900,
  parseIntSafe = (e, t) => {
    e = parseInt(e);
    return isNaN(e) ? t : e
  },
  isMobileDevice = () => window.innerWidth < MOBILE_BREAKPOINT;
document.querySelectorAll("[data-intersection-observer]").forEach((e, t) => {
  let r = e.dataset.id,
    o = document.querySelector(`[data-id="${r}"]`);
  if (o) {
    let a = "false" !== o.dataset.intersectOnce;
    e = {
      rootMargin: "0px 0px -50% 0px",
      threshold: 0,
      ...(() => {
        try {
          return JSON.parse(o.dataset.intersectionObserver || "{}")
        } catch {
          return {}
        }
      })()
    };
    let i = o.querySelector(".full-width-banner__animation--body"),
      n = o.querySelectorAll(".full-width-banner__animation"),
      s = new IntersectionObserver(e => {
        e.forEach(e => {
          var t;
          e.isIntersecting && r === e.target.dataset.id && (e = isMobileDevice(), t = "false" !== o.dataset.animationMobile, e && !t || o.classList.contains("isAnimated") && a || (o.classList.remove("inAnimation", "isAnimated"), e = i ? parseIntSafe(i.dataset.animationDelay, DEFAULT_DELAY) : DEFAULT_DELAY, t = i ? parseIntSafe(i.dataset.animationDuration, DEFAULT_DURATION) : DEFAULT_DURATION, (e => {
            let {
              observerElement: l,
              animationBody: t,
              animationElements: a
            } = e;
            if (a?.length) {
              let n = t ? parseIntSafe(t.dataset.animationDelay, DEFAULT_DELAY) : DEFAULT_DELAY,
                s = t ? parseIntSafe(t.dataset.animationDuration, DEFAULT_DURATION) : DEFAULT_DURATION,
                r = (l.classList.add("inAnimation"), 0),
                o = a.length;
              a.forEach((e, t) => {
                e && ((t, e) => {
                  var a = parseIntSafe(t.dataset.animationDelay, n);
                  let i = parseIntSafe(t.dataset.animationDuration, s);
                  e = (e + 1) * a, a = e + i;
                  setTimeout(() => {
                    requestAnimationFrame(() => {
                      t.classList.add("inAnimation");
                      var e = t.querySelector("*");
                      e && (e.style.animationDuration = i + "ms")
                    })
                  }, e), setTimeout(() => {
                    requestAnimationFrame(() => {
                      var e = t.querySelector("*");
                      e && (e.style.animationDuration = "", e.style.length || e.removeAttribute("style")), t.classList.remove("inAnimation"), t.classList.add("isAnimated"), ++r === o && (l.classList.remove("inAnimation"), l.classList.add("isAnimated"))
                    })
                  }, a)
                })(e, t)
              })
            } else l.classList.add("isAnimated")
          })({
            observerElement: o,
            animationBody: i,
            animationElements: n
          }), e = n.length * e + (e + t), setTimeout(() => {
            o.classList.contains("isAnimated") && a ? s.unobserve(o) : o.classList.contains("isAnimated") && !a && o.classList.remove("isAnimated")
          }, e)))
        })
      }, e);
    s.observe(o)
  } else console.warn("Observer element not found for ID: " + r)
});