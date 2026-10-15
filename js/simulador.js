(function () {
  "use strict";
  var C = window.SopaCompat, CAT = window.SOPA_CATALOGO;
  // Gráficas habituales: VRAM y capacidad de cómputo según las especificaciones de NVIDIA.
  var AB = window.SOPA_ANCHOS, REF = AB.gpus.filter(function (g) { return g.id === AB.referencia; })[0];
  var GPUS = [{ id: "ninguna", nombre: "Sin gráfica dedicada", detalle: "Integrada", vram: 0 }].concat(AB.gpus.map(function (g) {
    return { id: g.id, nombre: g.nombre, vram: g.vram, cap: g.cap, gbs: g.gbs, amd: g.marca === "AMD", detalle: g.marca === "AMD" ? g.vram + "\u00a0GB · Sopa usa el procesador" : null };
  }));
  var RAMS = [8, 12, 16, 32, 64];
  var DRIVERS = [{ id: "ok", nombre: "560 o superior", v: "560.0" }, { id: "viejo", nombre: "Anterior a 560", v: "550.0" }];
  var st = { gpu: "gtx1650maxq", vram: 4, ram: 16, driver: "ok", solo: false };
  var $ = function (id) { return document.getElementById(id); };

  function radios(cont, items, clave, etiqueta, sub) {
    // Los botones vienen ya en el HTML (evita saltos de diseño); si faltan, se crean.
    var hechos = {}; [].forEach.call(cont.querySelectorAll("button"), function (b) { hechos[b.dataset.v] = b; });
    items.forEach(function (it) {
      var b = hechos[String(it.id)];
      if (!b) {
        b = document.createElement("button");
        b.type = "button"; b.setAttribute("role", "radio"); b.dataset.v = it.id;
        b.innerHTML = "<span>" + etiqueta(it) + "</span>" + (sub && sub(it) ? "<small>" + sub(it) + "</small>" : "");
        cont.appendChild(b);
      }
      b.addEventListener("click", function () { st[clave] = it.id; if (clave === "gpu" && it.vram) st.vram = it.vram; pintar(); });
    });
    cont.addEventListener("keydown", function (e) {
      var bs = [].slice.call(cont.querySelectorAll("button")), i = bs.indexOf(document.activeElement);
      if (i < 0) return;
      var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d) return; e.preventDefault();
      var n = bs[(i + d + bs.length) % bs.length]; n.click(); n.focus();
    });
  }
  function marcar(cont, v) {
    cont.querySelectorAll("button").forEach(function (b) {
      var on = b.dataset.v === String(v); b.setAttribute("aria-checked", on); b.tabIndex = on ? 0 : -1;
    });
  }
  function hw() {
    var g = GPUS.filter(function (x) { return x.id === st.gpu; })[0];
    var drv = DRIVERS.filter(function (x) { return x.id === st.driver; })[0];
    return { ram_total_gb: st.ram, disco_libre_gb: 1e9,
      gpus: g.vram && !g.amd ? [{ vram_total_gb: st.vram, driver: drv.v, capacidad: g.cap }] : [] };
  }
  var T_CHAT = { gpu: ["Sí", "ok"], mixto: ["Sí, más lento", "warn"], cpu: ["Sí, en el procesador", "warn"], no: ["No", "err"] };
  var T_PERS = { si: ["Sí", "ok"], justo: ["Va justo", "warn"], no: ["No", "err"] };
  var T_VER_SOLO = { verificado: ["Verificado · solo chat", "ok"], estimado: ["Estimado · solo chat", "info"], no_soportado: ["No soportado", "err"] };
  var T_VER = { verificado: ["Verificado", "ok"], estimado: ["Estimado", "info"], no_soportado: ["No soportado", "err"] };
  function fmt(n) { return String(n).replace(".", ","); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function badge(t) { return '<span class="b b-' + t[1] + '">' + t[0] + "</span>"; }

  // tok/s: solo se escala lo medido, por ancho de banda de memoria (rango ±25 %).
  // tok/s: solo se escala lo medido, por ancho de banda (decisiones de Sopa Motor).
  var TOPE = 150;
  function velocidad(r, g, hay) {
    var med = (r.medido || {}).chat_tokens_por_segundo;
    if (r.chat === "no") return '<span class="v-no">No funciona</span>';
    if (r.chat === "cpu") return '<span class="v-lento">Lento, solo en procesador</span>';
    if (r.chat === "mixto") return '<span class="v-lento">Lento (parte en RAM)</span>';
    if (!med) return '<span class="v-sin">Sin medida aún</span>';
    var et = function (t) { return ' <span class="b ' + (t === "medido" ? "b-ok" : "b-info") + '">' + t + "</span>"; };
    var rapido = function (t) { return '<span class="v-rapido">Muy rápido</span>' + et(t); };
    if (g.id === REF.id) return med > TOPE ? rapido("medido") : "<b>" + fmt(med) + "\u00a0tok/s</b>" + et("medido");
    var k = g.gbs / REF.gbs;
    if (k < 0.5) return '<span class="v-lento">Lento</span>' + et("estimado");
    if (k > 4) { var n = Math.round(med * 4 * 0.75); return n > TOPE ? rapido("estimado") : "<b>Más de " + n + "\u00a0tok/s</b>" + et("estimado"); }
    var c = med * k, lo = Math.round(c * 0.75), hi = Math.round(c * 1.25);
    return hi > TOPE ? rapido("estimado") : "<b>" + lo + "–" + hi + "\u00a0tok/s</b>" + et("estimado");
  }
  function pintar() {
    var g = GPUS.filter(function (x) { return x.id === st.gpu; })[0], hay = !!g.vram && !g.amd;
    marcar($("gpus"), st.gpu); marcar($("rams"), st.ram); marcar($("driver"), st.driver);
    $("vram").value = st.vram; $("o-vram").textContent = hay ? st.vram + "\u00a0GB" : "—";
    $("f-vram").disabled = !hay; $("f-driver").disabled = !hay;
    $("f-vram").classList.toggle("off", !hay); $("f-driver").classList.toggle("off", !hay);
    var res = C.catalogo_para(CAT, hw(), st.solo);
    var todos = C.catalogo_para(CAT, hw(), false);
    var nc = todos.filter(function (r) { return r.chat !== "no"; }).length;
    var np = todos.filter(function (r) { return r.personalizar !== "no"; }).length;
    $("resumen").innerHTML = "<b>" + nc + "</b> de " + todos.length + " modelos para chatear · <b>" + np + "</b> para personalizar";
    var aviso = C.driver_insuficiente(hw());
    $("lista").innerHTML = (aviso ? '<li class="alerta">' + esc(aviso) + "</li>" : "") + res.map(function (r) {
      var md = r.medido || {}, extra = [], vel = velocidad(r, g, hay);
      if (md.chat_tokens_por_segundo) extra.push("Medido en GTX 1650 Max-Q: " + fmt(md.chat_tokens_por_segundo) + "\u00a0tok/s");
      if (r.personalizar !== "no" && hay && st.driver === "ok") {
        var s = C.segundos_por_paso(r.parametros_b, 512, 8, "sft", "cuda", md.segundos_por_paso);
        var fi = C.fiabilidad(r.parametros_b, "cuda", md.segundos_por_paso);
        extra.push((fi === "medido" ? "Entrenamiento medido en GTX 1650: " : "Entrenamiento en GTX 1650, aproximado: ") + fmt(C.pyFixed(s, 1)) + "\u00a0s por paso");
      }
      var pers = r.solo_catalogo || r.solo_chat ? "" : " · personalizar " + fmt(r.necesita_personalizar_gb) + "\u00a0GB";
      return '<li class="modelo v-' + r.verificacion + '">' +
        '<div class="m-cab"><div><h3>' + esc(r.nombre) + '</h3><p class="m-meta">' + fmt(r.parametros_b) + "\u00a0mil millones de parámetros · " + esc(r.licencia || "") + "</p></div>" + badge((r.solo_chat ? T_VER_SOLO : T_VER)[r.verificacion]) + "</div>" +
        '<dl class="m-dl"><div><dt>Chatear</dt><dd>' + badge(T_CHAT[r.chat]) + "</dd></div><div><dt>Personalizar</dt><dd>" + (r.solo_chat ? '<span class="b b-neu">No disponible</span>' : badge(T_PERS[r.personalizar])) + "</dd></div>" +
        "<div><dt>Velocidad</dt><dd class=\"vel\">" + vel + "</dd></div><div><dt>Necesita</dt><dd class=\"gb\">chat " + fmt(r.necesita_chat_gb) + "\u00a0GB" + pers + "</dd></div></dl>" +
        '<p class="m-txt">' + esc(r.chat_texto) + " " + esc(r.personalizar_texto) + "</p>" +
        '<p class="m-txt sec">' + esc(r.verificacion_texto) + "</p>" +
        (extra.length ? '<p class="m-ref">' + extra.map(esc).join(" · ") + "</p>" : "") + "</li>";
    }).join("");
  }

  radios($("gpus"), GPUS, "gpu", function (g) { return g.nombre; }, function (g) { return g.detalle || (g.vram + "\u00a0GB"); });
  radios($("rams"), RAMS.map(function (r) { return { id: r }; }), "ram", function (r) { return r.id + "\u00a0GB"; });
  radios($("driver"), DRIVERS, "driver", function (d) { return d.nombre; });
  $("vram").addEventListener("input", function (e) { st.vram = Number(e.target.value); pintar(); });
  $("solo").addEventListener("change", function (e) { st.solo = e.target.checked; pintar(); });
  pintar();
  $("lista").style.minHeight = "";
})();
(function () {
  var AB = window.SOPA_ANCHOS, f = document.getElementById("fuentes");
  var host = function (u) { try { return new URL(u).hostname.replace("www.", ""); } catch (e) { return u; } };
  f.innerHTML = '<table><thead><tr><th scope="col">Gráfica</th><th scope="col">GB/s</th><th scope="col">Fuente</th></tr></thead><tbody>' +
    AB.gpus.map(function (g) {
      return "<tr><td>" + g.nombre + (g.id === AB.referencia ? " <em>(referencia)</em>" : "") + "</td><td class=\"n\">" + String(g.gbs).replace(".", ",") + "</td><td>" +
        g.fuentes.map(function (u) { return '<a href="' + u + '" rel="noopener noreferrer nofollow" target="_blank">' + host(u) + "</a>"; }).join(", ") + "</td></tr>";
    }).join("") + "</tbody></table><p class=\"ayuda\">" + AB.nota + "</p>";
})();
