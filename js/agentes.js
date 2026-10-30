/*
 * Copyright (C) 2026 Miguel Rodríguez Saiz
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Relato al hacer scroll: del chat 1.x al equipo de agentes.
 * El puente es el clip de la piscina (sin controles): avanza con la página.
 * En un viewport estrecho el cuenco se queda centrado y el clip
 * recorre un tramo corto. «Hasta en la sopa» salta al equipo.
 * Con movimiento reducido, o sin este archivo, se ve el equipo 2.0
 * y solo los retratos quietos.
 */
(function () {
  var seccion = document.getElementById("agentes-20");
  if (!seccion) return;
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)");
  var ancho = window.matchMedia("(min-width: 960px)");
  var estrecho = window.matchMedia("(max-width: 959px)");
  var visor = seccion.querySelector(".rollo-visor");
  var pasos = [].slice.call(seccion.querySelectorAll(".rollo-paso"));
  var figuras = [].slice.call(seccion.querySelectorAll(".rollo-figura"));
  var puente = seccion.querySelector("video.clip-puente");
  var ejemplo = document.getElementById("agentes-ejemplo");
  var salto = seccion.querySelector(".salto-equipo");
  var huecos = [];
  var marco = 0;
  var objetivo = -1;
  var buscando = false;
  var espera = 0;
  var preparando = false;
  var preparado = false;
  var intentos = 0;

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

  function pasoZamb() {
    for (var i = 0; i < pasos.length; i++) {
      if (pasos[i].getAttribute("data-escena") === "zambullida") return pasos[i];
    }
    return null;
  }

  function progreso(paso) {
    var r = paso.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    var avance;
    if (estrecho.matches) {
      /* El tramo útil es el recorrido en el que el cuenco está clavado,
         más un poco antes para que el primer gesto ya mueva el clip. */
      var altoMarco = Math.min(r.height, Math.max(1, vh - 52));
      var suelta = Math.max(0, r.height - altoMarco);
      var desde = Math.min(vh * 0.16, Math.max(36, suelta * 0.2));
      avance = (desde - r.top) / Math.max(1, desde + suelta);
    } else {
      avance = (vh * 0.42 - r.top) / (r.height || 1);
    }
    if (avance < 0) return 0;
    if (avance > 1) return 1;
    return avance;
  }

  function buscarDirecto(t) {
    if (Math.abs((puente.currentTime || 0) - t) < 0.04) return;
    try {
      if (!puente.paused) puente.pause();
      puente.currentTime = t;
    } catch (e) { /* aún no se puede buscar en el clip */ }
  }

  function buscarEnCola(t) {
    if (buscando) {
      objetivo = t;
      return;
    }
    if (Math.abs((puente.currentTime || 0) - t) < 0.02) return;
    buscando = true;
    objetivo = -1;
    var cerrado = false;
    function cerrar() {
      if (cerrado) return;
      cerrado = true;
      puente.removeEventListener("seeked", cerrar);
      if (espera) { clearTimeout(espera); espera = 0; }
      buscando = false;
      if (objetivo >= 0) {
        var siguiente = objetivo;
        objetivo = -1;
        buscarEnCola(siguiente);
      }
    }
    puente.addEventListener("seeked", cerrar);
    espera = setTimeout(cerrar, 70);
    try {
      if (!puente.paused) puente.pause();
      puente.currentTime = t;
    } catch (e) { cerrar(); }
  }

  var cargado = false;

  function puedeBuscar(t) {
    try {
      if (!puente.seekable || puente.seekable.length < 1) return false;
      return puente.seekable.end(puente.seekable.length - 1) + 0.01 >= t;
    } catch (e) { return false; }
  }

  function prepararPuente() {
    if (!puente || reducido.matches || preparado || preparando || !estrecho.matches) return;
    if (puente.readyState < 2 || intentos > 4) return;
    intentos += 1;
    preparando = true;
    puente.muted = true;
    puente.playsInline = true;
    function listo() {
      try { puente.pause(); } catch (e) {}
      preparando = false;
      preparado = true;
      pedir();
    }
    function fallo() { preparando = false; }
    var hecho = puente.play();
    if (hecho && hecho.then) hecho.then(listo).catch(fallo);
    else listo();
  }

  function scrub(paso) {
    if (!puente || reducido.matches) return;
    if (!isFinite(puente.duration) || puente.duration <= 0) return;
    var t = progreso(paso) * Math.max(0, puente.duration - 0.04);
    if (!puedeBuscar(t)) return;
    if (estrecho.matches) buscarEnCola(t);
    else buscarDirecto(t);
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
    if (!seccion.classList.contains("rollo-vivo")) return;
    var mejor = pasos[0];
    var mejorDist = Infinity;
    var vh = window.innerHeight || 1;
    var foco = vh * 0.42;
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
    if (zamb && !reducido.matches) {
      var rz = zamb.getBoundingClientRect();
      var aLaVista = rz.bottom > 0 && rz.top < vh;
      if (estrecho.matches) {
        if (aLaVista) scrub(zamb);
      } else if (escena === "zambullida") {
        scrub(zamb);
      }
    }
    clips(escena === "equipo");
  }

  function seguirPista() {
    if (!seccion.classList.contains("rollo-vivo") || reducido.matches || !estrecho.matches) return false;
    var zamb = pasoZamb();
    if (!zamb) return false;
    var r = zamb.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    return r.bottom > -40 && r.top < vh + 40;
  }

  function tick() {
    marco = 0;
    actualizar();
    if (seguirPista()) pedir();
  }

  function pedir() {
    if (marco) return;
    marco = requestAnimationFrame(tick);
  }

  function saltar(e) {
    var destino = document.getElementById("agentes-equipo");
    if (!destino) return;
    e.preventDefault();
    var raiz = document.documentElement;
    var previo = raiz.style.scrollBehavior;
    var y = destino.getBoundingClientRect().top + window.pageYOffset - 72;
    raiz.style.scrollBehavior = "auto";
    void raiz.offsetHeight;
    window.scrollTo(0, Math.max(0, y));
    raiz.style.scrollBehavior = previo;
    if (window.history && history.pushState) history.pushState(null, "", "#agentes-equipo");
    if (destino.focus) destino.focus({ preventScroll: true });
    pedir();
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
    /* El clip nace oculto. Si se carga así, Safari y Chrome no dejan buscar
       en el tiempo y el scrub no arranca. Se recarga ya visible. */
    if (puente && !cargado) {
      cargado = true;
      puente.preload = "auto";
      puente.load();
    }
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

  if (salto) salto.addEventListener("click", saltar);
  window.addEventListener("scroll", pedir, { passive: true });
  window.addEventListener("resize", pedir);
  window.addEventListener("touchstart", prepararPuente, { passive: true });
  window.addEventListener("pointerdown", prepararPuente, { passive: true });
  if (window.visualViewport) {
    visualViewport.addEventListener("resize", pedir);
    visualViewport.addEventListener("scroll", pedir);
  }
  if (puente) {
    puente.addEventListener("loadedmetadata", pedir);
    puente.addEventListener("durationchange", pedir);
  }
  if (ancho.addEventListener) {
    ancho.addEventListener("change", aplicar);
    reducido.addEventListener("change", aplicar);
    estrecho.addEventListener("change", aplicar);
  } else if (ancho.addListener) {
    ancho.addListener(aplicar);
    reducido.addListener(aplicar);
    estrecho.addListener(aplicar);
  }
  aplicar();
})();
