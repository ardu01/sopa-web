/*
 * Copyright (C) 2026 Miguel Rodríguez Saiz
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Relato al hacer scroll: del chat 1.x al equipo de agentes.
 * Con movimiento reducido, o sin este archivo, el relato se lee seguido
 * y el vídeo no depende del scroll: se queda el cartel y los controles.
 */
(function () {
  var seccion = document.getElementById("agentes-20");
  if (!seccion) return;
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)");
  var ancho = window.matchMedia("(min-width: 960px)");
  var visor = seccion.querySelector(".rollo-visor");
  var pasos = [].slice.call(seccion.querySelectorAll(".rollo-paso"));
  var figuras = [].slice.call(seccion.querySelectorAll(".rollo-figura"));
  var video = seccion.querySelector("video");
  var ejemplo = document.getElementById("agentes-ejemplo");
  var huecos = [];
  var marco = 0;
  var mano = false;
  var nuestros = 0;

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
    var recorrido = r.height || 1;
    var avance = (foco - r.top) / recorrido;
    if (avance < 0) return 0;
    if (avance > 1) return 1;
    return avance;
  }

  function scrub(paso) {
    if (!video || !isFinite(video.duration) || video.duration <= 0) return;
    var t = progreso(paso) * Math.max(0, video.duration - 0.05);
    if (Math.abs((video.currentTime || 0) - t) < 0.05) return;
    nuestros += 1;
    try {
      if (!video.paused) video.pause();
      video.currentTime = t;
    } catch (e) { /* el navegador aún no deja buscar */ }
  }

  function actualizar() {
    marco = 0;
    if (!seccion.classList.contains("rollo-vivo")) return;
    var mejor = pasos[0];
    var mejorDist = Infinity;
    var foco = window.innerHeight * 0.42;
    for (var i = 0; i < pasos.length; i++) {
      var r = pasos[i].getBoundingClientRect();
      var dist = r.top <= foco && r.bottom >= foco ? 0 : Math.min(Math.abs(r.top - foco), Math.abs(r.bottom - foco));
      if (dist < mejorDist) {
        mejorDist = dist;
        mejor = pasos[i];
      }
    }
    var escena = mejor.getAttribute("data-escena");
    for (var j = 0; j < pasos.length; j++) pasos[j].classList.toggle("activa", pasos[j] === mejor);
    var columnas = seccion.classList.contains("rollo-columnas");
    for (var k = 0; k < figuras.length; k++) {
      var activa = figuras[k].getAttribute("data-escena") === escena;
      figuras[k].classList.toggle("activa", activa);
      figuras[k].inert = columnas ? !activa : false;
    }
    if (escena !== "salto") mano = false;
    if (escena === "salto" && !mano) scrub(mejor);
  }

  function pedir() {
    if (marco) return;
    marco = requestAnimationFrame(actualizar);
  }

  function aplicar() {
    if (reducido.matches) {
      seccion.classList.remove("rollo-vivo");
      if (huecos.length) aPasos();
      return;
    }
    seccion.classList.add("rollo-vivo");
    if (video) video.preload = "auto";
    if (ancho.matches) aVisor();
    else aPasos();
    pedir();
  }

  seccion.addEventListener("click", function (e) {
    var boton = e.target.closest(".equipo-lista button");
    if (!boton || !ejemplo) return;
    var botones = seccion.querySelectorAll(".equipo-lista button");
    for (var i = 0; i < botones.length; i++) botones[i].setAttribute("aria-pressed", botones[i] === boton ? "true" : "false");
    var nombre = boton.querySelector(".cara-nombre");
    var estado = boton.getAttribute("data-estado") || "Listo";
    var frase = boton.getAttribute("data-respuesta") || "";
    var cara = boton.getAttribute("data-cara") || "cara-sopa";
    var caraEl = ejemplo.querySelector(".ejemplo-cara");
    var nombreEl = ejemplo.querySelector(".ejemplo-nombre");
    var estadoEl = ejemplo.querySelector(".ejemplo-estado");
    var fraseEl = ejemplo.querySelector(".ejemplo-frase");
    if (caraEl) caraEl.className = "ejemplo-cara cara " + cara;
    if (nombreEl && nombre) nombreEl.textContent = nombre.textContent;
    if (estadoEl) {
      estadoEl.textContent = estado;
      estadoEl.className = "ejemplo-estado est " + (estado === "Trabajando" ? "est-trabaja" : "est-listo");
    }
    if (fraseEl) fraseEl.textContent = frase;
  });

  if (video) {
    video.addEventListener("seeking", function () {
      if (nuestros > 0) {
        nuestros -= 1;
        return;
      }
      // Al cargar, el navegador puede buscar el segundo 0. Eso no es la persona.
      if ((video.currentTime || 0) < 0.08) return;
      mano = true;
    });
    video.addEventListener("play", function () { mano = true; });
    video.addEventListener("pointerdown", function () { mano = true; });
    video.addEventListener("keydown", function () { mano = true; });
  }

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
