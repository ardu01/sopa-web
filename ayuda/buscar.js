/**
 * Copyright (C) 2026 Miguel Rodríguez Saiz
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Filtra el índice de la ayuda en esta página. No envía la búsqueda a ningún sitio.
 */
const campo = document.getElementById("q");
const temas = [...document.querySelectorAll(".tema")];
const vacio = document.getElementById("busqueda-vacia");
const estado = document.getElementById("busqueda-estado");

function filtrar() {
  const texto = campo.value.trim().toLocaleLowerCase("es");
  let visibles = 0;
  for (const tema of temas) {
    const coincide = texto === "" || tema.textContent.toLocaleLowerCase("es").includes(texto);
    tema.hidden = !coincide;
    if (coincide) visibles += 1;
  }
  vacio.hidden = visibles !== 0;
  if (texto === "") estado.textContent = "";
  else if (visibles === 1) estado.textContent = "1 tema";
  else estado.textContent = `${visibles} temas`;
}

campo.addEventListener("input", filtrar);
