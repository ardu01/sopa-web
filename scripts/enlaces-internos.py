#!/usr/bin/env python3
# Copyright (C) 2026 Miguel Rodríguez Saiz
#
# Este programa es software libre: puedes redistribuirlo y/o modificarlo
# bajo los términos de la Licencia Pública General GNU publicada por la
# Free Software Foundation, versión 3 de la Licencia.
#
# SPDX-License-Identifier: GPL-3.0-only
"""Comprueba href y src relativos, y las anclas a las que apuntan.

No sale a internet. No mira descargas/ como páginas: solo comprueba que
los archivos enlazados desde el HTML existan.
"""

from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

RAIZ = Path(__file__).resolve().parent.parent
EXCLUIR = {"descargas", "node_modules"}
ESQUEMAS = ("http:", "https:", "mailto:", "data:", "javascript:", "tel:")


class Recolector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.refs: list[tuple[int, str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        datos = {clave: valor for clave, valor in attrs if valor is not None}
        if identificador := datos.get("id"):
            self.ids.add(identificador)
        if tag == "a" and (nombre := datos.get("name")):
            self.ids.add(nombre)
        linea = self.getpos()[0]
        for atributo in ("href", "src"):
            if atributo in datos:
                self.refs.append((linea, atributo, datos[atributo]))
        if srcset := datos.get("srcset"):
            for trozo in srcset.split(","):
                url = trozo.strip().split()[0] if trozo.strip() else ""
                if url:
                    self.refs.append((linea, "srcset", url))


def paginas() -> list[Path]:
    encontradas = []
    for ruta in RAIZ.rglob("*.html"):
        relativa = ruta.relative_to(RAIZ)
        if EXCLUIR.intersection(relativa.parts):
            continue
        encontradas.append(ruta)
    return sorted(encontradas)


def externo(url: str) -> bool:
    limpio = url.strip()
    if limpio.startswith("//"):
        return True
    bajo = limpio.lower()
    return bajo.startswith(ESQUEMAS)


SITIO = "/sopa-web"


def destino(desde: Path, ruta: str) -> Path | None:
    ruta = unquote(ruta)
    if ruta.startswith("/"):
        if ruta != SITIO and not ruta.startswith(SITIO + "/"):
            return None
        resto = ruta[len(SITIO):].lstrip("/")
        candidato = RAIZ if resto == "" else (RAIZ / resto).resolve()
    else:
        if ruta == "":
            return desde
        candidato = (desde.parent / ruta).resolve()
    try:
        candidato.relative_to(RAIZ)
    except ValueError:
        return None
    return candidato


def anclas_de(ruta: Path, cache: dict[Path, set[str]]) -> set[str]:
    if ruta not in cache:
        parser = Recolector()
        parser.feed(ruta.read_text(encoding="utf-8"))
        cache[ruta] = parser.ids
    return cache[ruta]


def main() -> int:
    errores: list[str] = []
    cache: dict[Path, set[str]] = {}
    archivos = paginas()
    if not archivos:
        print("No hay HTML que comprobar.", file=sys.stderr)
        return 1

    for archivo in archivos:
        parser = Recolector()
        parser.feed(archivo.read_text(encoding="utf-8"))
        cache[archivo] = parser.ids
        for linea, atributo, url in parser.refs:
            if url.strip() == "" or externo(url):
                continue
            partes = urlsplit(url)
            if partes.scheme or partes.netloc:
                continue
            objetivo = destino(archivo, partes.path)
            donde = f"{archivo.relative_to(RAIZ)}:{linea}"
            if objetivo is None:
                errores.append(f"{donde}: {atributo} «{url}» sale del repositorio")
                continue
            pagina = objetivo
            if partes.path.endswith("/") or (objetivo.exists() and objetivo.is_dir()):
                if not objetivo.is_dir() or not (objetivo / "index.html").is_file():
                    errores.append(f"{donde}: {atributo} «{url}» no tiene index.html")
                    continue
                pagina = objetivo / "index.html"
            elif not objetivo.is_file():
                errores.append(f"{donde}: {atributo} «{url}» no existe")
                continue
            if partes.fragment and pagina.suffix.lower() == ".html":
                if partes.fragment not in anclas_de(pagina, cache):
                    errores.append(
                        f"{donde}: ancla «#{partes.fragment}» no está en {pagina.relative_to(RAIZ)}"
                    )

    if errores:
        print(f"{len(errores)} enlace(s) interno(s) roto(s):", file=sys.stderr)
        for error in errores:
            print(error, file=sys.stderr)
        return 1
    print(f"Enlaces internos correctos ({len(archivos)} páginas HTML).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
