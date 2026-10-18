/* Copyright (C) 2026 Miguel Rodríguez Saiz
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Único sitio para activar la descarga de la beta siguiente
 * (1.13.x y las que vengan después). La 1.9.4 no se toca.
 *
 * Para activarla, rellena los huecos de abajo y pon activa: true.
 * No inventes una URL ni un SHA-256. No pegues la dirección de un
 * repositorio privado: el enlace al código fuente se pone cuando sea público.
 *
 * Huecos:
 *   version          número público, por ejemplo 1.13.x
 *   urlInstalador    URL https de la release pública
 *   sha256           SHA-256 del instalador, 64 caracteres hexadecimales
 *   nombreArchivo    nombre del archivo que se descarga
 *   urlCodigoFuente  URL https del código fuente, cuando el repo sea público
 */
(function () {
  var D = {
    activa: false,
    version: "",
    esBeta: true,
    requisitos: "Un ordenador con Windows.",
    instalacion: "Se instala a mano. El actualizador automático no ofrece esta versión.",
    urlInstalador: "",
    sha256: "",
    nombreArchivo: "",
    urlCodigoFuente: ""
  };

  var raiz = document.getElementById("descarga-siguiente");
  if (!raiz) return;

  function texto(id, valor) {
    var n = document.getElementById(id);
    if (n && valor) n.textContent = valor;
  }

  function httpsValida(url) {
    if (typeof url !== "string") return false;
    var u = url.trim();
    if (u.indexOf("https://") !== 0) return false;
    if (/\s/.test(u)) return false;
    if (/pendiente|ejemplo|example|hueco|placeholder/i.test(u)) return false;
    return true;
  }

  function shaValido(s) {
    return typeof s === "string" && /^[a-fA-F0-9]{64}$/.test(s.trim());
  }

  texto("sig-requisitos", D.requisitos);
  texto("sig-instalacion", D.instalacion);
  if (D.esBeta) texto("sig-beta", "Es una beta.");
  if (D.version.trim()) texto("sig-version", D.version.trim());

  if (!D.activa) return;

  if (httpsValida(D.urlInstalador) && shaValido(D.sha256)) {
    var url = document.getElementById("sig-url");
    if (url) {
      url.textContent = "";
      var a = document.createElement("a");
      a.href = D.urlInstalador.trim();
      a.textContent = D.nombreArchivo.trim() || "Descargar para Windows";
      url.appendChild(a);
    }
    texto("sig-sha", D.sha256.trim());
  }

  if (httpsValida(D.urlCodigoFuente)) {
    var fuente = document.getElementById("sig-fuente");
    if (fuente) {
      fuente.textContent = "";
      var c = document.createElement("a");
      c.href = D.urlCodigoFuente.trim();
      c.textContent = "Código fuente";
      fuente.appendChild(c);
    }
  }
})();
