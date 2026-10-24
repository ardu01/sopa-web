/*
 * Copyright (C) 2026 Miguel Rodríguez Saiz
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Menú de la cabecera en pantallas estrechas. Sin dependencias.
 * Sin este script el menú se ve entero, como antes.
 */
(function () {
  var cab = document.querySelector("header.nav");
  if (!cab) return;
  var boton = cab.querySelector(".menu-btn");
  var menu = document.getElementById(boton ? boton.getAttribute("aria-controls") : "");
  if (!boton || !menu) return;
  cab.classList.add("con-menu");
  function poner(abierto, foco) {
    cab.classList.toggle("abierto", abierto);
    boton.setAttribute("aria-expanded", abierto ? "true" : "false");
    boton.setAttribute("aria-label", abierto ? "Cerrar el menú" : "Abrir el menú");
    if (!abierto && foco) boton.focus();
  }
  boton.addEventListener("click", function () {
    poner(boton.getAttribute("aria-expanded") !== "true", false);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) poner(false, false);
  });
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Escape" || e.key === "Esc") && cab.classList.contains("abierto")) poner(false, true);
  });
  var mq = window.matchMedia("(max-width: 700px)");
  var alCambiar = function () { if (!mq.matches) poner(false, false); };
  if (mq.addEventListener) mq.addEventListener("change", alCambiar); else if (mq.addListener) mq.addListener(alCambiar);
})();
