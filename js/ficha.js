/*
 * Copyright (C) 2026 Miguel Rodríguez Saiz
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Gestos sobrios de la ficha: barra de descarga, recorrido del clip
 * y un desplazamiento muy corto de la captura. Sin dependencias.
 * Con menos movimiento no hay parallax ni transiciones.
 */
(function () {
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var notas = document.getElementById("notas-version");
  function abrirNotas() {
    if (notas) notas.open = true;
  }
  if (notas && location.hash === "#notas-version") abrirNotas();
  document.querySelectorAll('a[href="#notas-version"]').forEach(function (a) {
    a.addEventListener("click", abrirNotas);
  });

  var fija = document.querySelector(".cta-fija");
  var ancla = document.querySelector(".descarga .btn");
  if (fija && ancla && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entradas) {
      fija.hidden = entradas[0].isIntersecting;
    }, { threshold: 0.2 });
    io.observe(ancla);
    /* En el iPhone el cuenco va clavado a la pantalla (#29). La barra no debe tapar «Conoce al equipo». */
    var zamb = document.querySelector('.rollo-paso[data-escena="zambullida"]');
    if (zamb) {
      var ioZ = new IntersectionObserver(function (entradas) {
        var e = entradas[0];
        fija.classList.toggle("cta-aparte", e.isIntersecting && e.intersectionRatio > 0.45);
      }, { threshold: [0, 0.45, 0.7] });
      ioZ.observe(zamb);
    }
  }

  var video = document.getElementById("clip-visible");
  var rango = document.getElementById("clip-rango");
  if (video && rango) {
    video.removeAttribute("controls");
    function alTiempo() {
      if (!video.duration || document.activeElement === rango) return;
      rango.value = String(Math.round((video.currentTime / video.duration) * 1000));
    }
    video.addEventListener("loadedmetadata", function () {
      rango.max = "1000";
      rango.value = "0";
    });
    rango.addEventListener("input", function () {
      if (!video.duration) return;
      video.pause();
      video.currentTime = (Number(rango.value) / 1000) * video.duration;
    });
    video.addEventListener("timeupdate", alTiempo);
  }

  var shot = document.querySelector(".hero-shot .shot-activo");
  if (!reducido && shot) {
    var ultimo = 0;
    function parallax() {
      ultimo = 0;
      var caja = shot.getBoundingClientRect();
      var centro = caja.top + caja.height / 2 - window.innerHeight / 2;
      var y = Math.max(-12, Math.min(12, -centro * 0.015));
      shot.style.transform = "translateY(" + y.toFixed(1) + "px)";
    }
    window.addEventListener("scroll", function () {
      if (ultimo) return;
      ultimo = window.requestAnimationFrame(parallax);
    }, { passive: true });
  }
})();
