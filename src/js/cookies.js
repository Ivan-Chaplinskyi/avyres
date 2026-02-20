let setCookie = (e, t, o) => {
    var i, n = "";
    o && ((i = new Date).setTime(i.getTime() + 24 * o * 60 * 60 * 1e3), n = "; expires=" + i.toUTCString()), document.cookie = e + "=" + (t || "") + n + "; path=/"
  },
  getCookie = e => {
    for (var t = e + "=", o = document.cookie.split(";"), i = 0; i < o.length; i++) {
      for (var n = o[i];
        " " == n.charAt(0);) n = n.substring(1, n.length);
      if (0 == n.indexOf(t)) return n.substring(t.length, n.length)
    }
    return null
  },
  eraseCookie = e => {
    document.cookie = e + "=; Max-Age=-99999999"
  };