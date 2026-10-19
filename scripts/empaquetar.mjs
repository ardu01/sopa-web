/**
 * Copyright (C) 2026 Miguel Rodríguez Saiz
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Junta el CSS compartido con el de cada sección. El resultado se sube al
 * repositorio: GitHub Pages no ejecuta este paso.
 */
import { readFileSync, writeFileSync } from "node:fs";

function empaquetar(archivos, destino) {
  const css = archivos
    .map((archivo) => readFileSync(archivo, "utf8"))
    .join("\n")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim() + "\n";
  writeFileSync(destino, css);
  console.log(destino, css.length);
}

empaquetar(["comun.css", "guias.css", "ayuda.css"], "bloque-ayuda.css");
