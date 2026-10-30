/*
 * Copyright (C) 2026 Miguel Rodríguez Saiz
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Relato al hacer scroll: del chat 1.x al equipo de agentes.
 * Los avatares entran en el cuenco uno a uno. No hay reproductor.
 * Con movimiento reducido, o sin este archivo, se ve el equipo 2.0
 * (o el relato seguido, sin la zambullida) y solo los retratos quietos.
 */
(function () {
  var seccion = document.getElementById("agentes-20");
  if (!seccion) return;
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)");
  var ancho = window.matchMedia("(min-width: 960px)");
  var visor = seccion.querySelector(".rollo-visor");
  var pasos = [].slice.call(seccion.querySelectorAll(".rollo-paso"));
  var figuras = [].slice.call(seccion.querySelectorAll(".rollo-figura"));
  var divers = [].slice.call(seccion.querySelectorAll(".zambullidores li"));
  var cuenco = seccion.querySelector(".cuenco");
  var onda = seccion.querySelector(".cuenco-onda");
  var quien = document.getElementById("entra-quien");
  var prefijo = document.getElementById("entra-prefijo");
  var ejemplo = document.getElementById("agentes-ejemplo");
  var NOMBRES = ["Sopa", "Director", "Código", "Documentos", "Archivos", "Investigación", "Automatizaciones"];
  var LADOS = [-1, 0.72, -0.45, 1, -0.78, 0.4, 0];
  var huecos = [];
  var marco = 0;

  figuras.forEach(function (fig) {
    var paso = fig.closest(".rollo-paso");
    if (paso) fig.setAttribute("data-escena", paso.getAttribute("data-escena") || "");
  });

  function recordar() {
    if (huecos.length) return;
    figuras.forEach(function (fig) {
      var marca = document.createComment("rollo");
      fig.parentNode.insertBefore(marca, fig);
      huecos.push({ fig: fig, marca: marca });
    });
  }

  function aVisor() {
    if (!visor) return;
    recordar();
    huecos.forEach(function (h) { visor.appendChild(h.fig); });
    visor.hidden = false;
    seccion.classList.add("rollo-columnas");
  }

  function aPasos() {
    huecos.forEach(function (h) {
      if (h.marca.parentNode) h.marca.parentNode.insertBefore(h.fig, h.marca.nextSibling);
    });
    if (visor) visor.hidden = true;
    seccion.classList.remove("rollo-columnas");
    figuras.forEach(function (fig) {
      fig.inert = false;
      fig.classList.remove("activa");
    });
  }

  function progreso(paso) {
    var r = paso.getBoundingClientRect();
    var foco = window.innerHeight * 0.42;
    var avance = (foco - r.top) / (r.height || 1);
    if (avance < 0) return 0;
    if (avance > 1) return 1;
    return avance;
  }

  function colocar(el, local, lado) {
    if (local <= 0) {
      el.style.opacity = "0";
      el.style.transform = "translate(calc(-50% + " + (lado * 90).toFixed(0) + "px), -160px) scale(.92)";
      return 0;
    }
    if (local >= 1) {
      el.style.opacity = "0";
      el.style.transform = "translate(-50%, 92px) scale(.12)";
      return 1;
    }
    var e = local < 0.5 ? 2 * local * local : 1 - Math.pow(-2 * local + 2, 2) / 2;
    var x = lado * 92 * (1 - e);
    var y = -160 + e * 252;
    var s = 1.02 - e * 0.9;
    var o = local < 0.14 ? local / 0.14 : local > 0.8 ? (1 - local) / 0.2 : 1;
    el.style.opacity = String(Math.max(0, Math.min(1, o)));
    el.style.transform = "translate(calc(-50% + " + x.toFixed(1) + "px), " + y.toFixed(1) + "px) scale(" + s.toFixed(3) + ")";
    return local;
  }

  function zambullir(p) {
    var n = divers.length || 1;
    var recorrido = Math.min(1, p / 0.9);
    var activo = -1;
    var pico = 0;
    for (var i = 0; i < divers.length; i++) {
      var local = recorrido * n - i;
      var ahora = colocar(divers[i], local, LADOS[i] || 0);
      if (ahora > 0 && ahora < 1) {
        activo = i;
        if (ahora > 0.62 && ahora < 0.9) pico = (ahora - 0.62) / 0.28;
      }
    }
    if (cuenco) cuenco.classList.toggle("llena", p > 0.9);
    if (onda) {
      onda.style.opacity = pico > 0 ? String(Math.sin(pico * Math.PI) * 0.85) : "0";
      onda.style.transform = "translate(-50%, -50%) scale(" + (0.45 + pico * 1.15).toFixed(3) + ")";
    }
    if (quien && prefijo) {
      if (p > 0.9) {
        prefijo.textContent = "";
        quien.textContent = "Ya están dentro";
      } else {
        var idx = activo >= 0 ? activo : Math.min(n - 1, Math.floor(recorrido * n));
        prefijo.textContent = "Entra ";
        quien.textContent = NOMBRES[idx] || NOMBRES[0];
      }
    }
  }

  function clips(encender) {
    var lista = seccion.querySelectorAll(".avatar-clip");
    for (var i = 0; i < lista.length; i++) {
      var video = lista[i];
      if (!encender || reducido.matches) {
        video.pause();
        continue;
      }
      video.muted = true;
      var hecho = video.play();
      if (hecho && hecho.catch) {
        hecho.catch(function () { seccion.classList.add("sin-clips"); });
      }
    }
  }

  function actualizar() {
    marco = 0;
    if (!seccion.classList.contains("rollo-vivo")) return;
    var mejor = pasos[0];
    var mejorDist = Infinity;
    var foco = window.innerHeight * 0.42;
    var zamb = null;
    for (var i = 0; i < pasos.length; i++) {
      var r = pasos[i].getBoundingClientRect();
      var dist = r.top <= foco && r.bottom >= foco ? 0 : Math.min(Math.abs(r.top - foco), Math.abs(r.bottom - foco));
      if (dist < mejorDist) {
        mejorDist = dist;
        mejor = pasos[i];
      }
      if (pasos[i].getAttribute("data-escena") === "zambullida") zamb = pasos[i];
    }
    var escena = mejor.getAttribute("data-escena");
    for (var j = 0; j < pasos.length; j++) pasos[j].classList.toggle("activa", pasos[j] === mejor);
    var columnas = seccion.classList.contains("rollo-columnas");
    for (var k = 0; k < figuras.length; k++) {
      var activa = figuras[k].getAttribute("data-escena") === escena;
      figuras[k].classList.toggle("activa", activa);
      figuras[k].inert = columnas ? !activa : false;
    }
    if (zamb) zambullir(progreso(zamb));
    clips(escena === "equipo");
  }

  function pedir() {
    if (marco) return;
    marco = requestAnimationFrame(actualizar);
  }

  function aplicar() {
    if (reducido.matches) {
      seccion.classList.remove("rollo-vivo");
      if (huecos.length) aPasos();
      clips(false);
      return;
    }
    seccion.classList.add("rollo-vivo");
    if (ancho.matches) aVisor();
    else aPasos();
    pedir();
  }

  function ponerAvatar(caraEl, avatar) {
    if (!caraEl) return;
    var quieto = caraEl.querySelector(".avatar-still");
    var clip = caraEl.querySelector(".avatar-clip");
    var foto = "img/avatares/" + avatar + ".webp";
    var loop = "img/avatares/" + avatar + ".webm";
    if (quieto) quieto.src = foto;
    if (!clip) return;
    clip.poster = foto;
    var fuente = clip.querySelector("source");
    if (fuente) fuente.src = loop;
    clip.load();
    if (seccion.classList.contains("rollo-vivo") && !reducido.matches) {
      clip.muted = true;
      var hecho = clip.play();
      if (hecho && hecho.catch) hecho.catch(function () { seccion.classList.add("sin-clips"); });
    }
  }

  seccion.addEventListener("click", function (e) {
    var boton = e.target.closest(".equipo-lista button");
    if (!boton || !ejemplo) return;
    var botones = seccion.querySelectorAll(".equipo-lista button");
    for (var i = 0; i < botones.length; i++) botones[i].setAttribute("aria-pressed", botones[i] === boton ? "true" : "false");
    var nombre = boton.querySelector(".cara-nombre");
    var estado = boton.getAttribute("data-estado") || "Listo";
    var frase = boton.getAttribute("data-respuesta") || "";
    var avatar = boton.getAttribute("data-avatar") || "sopa";
    var nombreEl = ejemplo.querySelector(".ejemplo-nombre");
    var estadoEl = ejemplo.querySelector(".ejemplo-estado");
    var fraseEl = ejemplo.querySelector(".ejemplo-frase");
    ponerAvatar(ejemplo.querySelector(".ejemplo-cara"), avatar);
    if (nombreEl && nombre) nombreEl.textContent = nombre.textContent;
    if (estadoEl) {
      estadoEl.textContent = estado;
      estadoEl.className = "ejemplo-estado est " + (estado === "Trabajando" ? "est-trabaja" : "est-listo");
    }
    if (fraseEl) fraseEl.textContent = frase;
  });

  window.addEventListener("scroll", pedir, { passive: true });
  window.addEventListener("resize", pedir);
  if (ancho.addEventListener) {
    ancho.addEventListener("change", aplicar);
    reducido.addEventListener("change", aplicar);
  } else if (ancho.addListener) {
    ancho.addListener(aplicar);
    reducido.addListener(aplicar);
  }
  aplicar();
})();
