/*
 * Copyright (C) 2026 Miguel Rodríguez Saiz
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Relato al hacer scroll: del chat 1.x al equipo de agentes.
 * El puente es el clip de la piscina (sin controles): avanza con la página.
 * Con movimiento reducido, o sin este archivo, se ve el equipo 2.0
 * y solo los retratos quietos.
 */
(function () {
  var seccion = document.getElementById("agentes-20");
  if (!seccion) return;
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)");
  var ancho = window.matchMedia("(min-width: 960px)");
  var visor = seccion.querySelector(".rollo-visor");
  var pasos = [].slice.call(seccion.querySelectorAll(".rollo-paso"));
  var figuras = [].slice.call(seccion.querySelectorAll(".rollo-figura"));
  var puente = seccion.querySelector("video.clip-puente");
  var ejemplo = document.getElementById("agentes-ejemplo");
  var huecos = [];
  var marco = 0;
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
    var avance = (foco - r.top) / (r.height || 1);
    if (avance < 0) return 0;
    if (avance > 1) return 1;
    return avance;
  }

  function scrub(paso) {
    if (!puente || reducido.matches) return;
    if (!isFinite(puente.duration) || puente.duration <= 0) return;
    var t = progreso(paso) * Math.max(0, puente.duration - 0.04);
    if (Math.abs((puente.currentTime || 0) - t) < 0.045) return;
    nuestros += 1;
    try {
      if (!puente.paused) puente.pause();
      puente.currentTime = t;
    } catch (e) { /* aún no se puede buscar en el clip */ }
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
    if (zamb && escena === "zambullida") scrub(zamb);
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
    if (puente) puente.preload = "auto";
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
