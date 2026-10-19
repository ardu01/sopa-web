/**
 * Copyright (C) 2026 Miguel Rodríguez Saiz
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Pasa axe-core (WCAG 2.0 y 2.1, niveles A y AA) por las páginas HTML.
 * No entra en descargas/ ni en los archivos de Search Console.
 * Usa el Chrome del sistema (CHROME_PATH) o google-chrome en el PATH.
 */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { connect } from "node:net";
import puppeteer from "puppeteer-core";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core"), "utf8");
const puerto = 8770;
const paginas = [
  "/",
  "/simulador.html",
  "/guias/",
  "/guias/que-es-una-ia-local.html",
  "/guias/ia-local-en-windows-sin-programar.html",
  "/guias/cuanta-vram-necesito.html",
  "/guias/como-elegir-un-modelo.html",
  "/guias/ia-local-frente-a-la-nube.html",
  "/guias/como-resumir-tus-documentos.html",
  "/guias/que-es-la-cuantizacion.html",
  "/enlazar-movil/",
  "/fallos/",
  "/404.html",
  "/ayuda/",
  "/ayuda/instalar-sopa-en-windows.html",
  "/ayuda/el-primer-chat.html",
  "/ayuda/elegir-un-modelo.html",
  "/ayuda/esta-usando-mi-grafica.html",
  "/ayuda/tus-documentos.html",
  "/ayuda/memoria.html",
  "/ayuda/entrenamiento.html",
  "/ayuda/comparar.html",
  "/ayuda/automatizaciones.html",
  "/ayuda/sopa-mobile.html",
  "/ayuda/problemas-frecuentes.html",
];

function esperarPuerto() {
  return new Promise((resolve, reject) => {
    const inicio = Date.now();
    const probar = () => {
      const socket = connect(puerto, "127.0.0.1");
      socket.once("connect", () => {
        socket.end();
        resolve();
      });
      socket.once("error", () => {
        socket.destroy();
        if (Date.now() - inicio > 8000) reject(new Error("El servidor local no arrancó"));
        else setTimeout(probar, 100);
      });
    };
    probar();
  });
}

const servidor = spawn("python3", ["-m", "http.server", String(puerto), "--bind", "127.0.0.1"], {
  stdio: "ignore",
});

let codigo = 0;
try {
  await esperarPuerto();
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || "google-chrome",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  try {
    const page = await browser.newPage();
    // El texto que aún no ha entrado en pantalla sigue a opacidad 0. Con movimiento
    // reducido la web lo muestra ya, y el contraste es el del estado final.
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    const vistas = [
      { nombre: "escritorio", width: 1280, height: 800 },
      { nombre: "móvil", width: 390, height: 844 },
    ];
    for (const vista of vistas) {
      await page.setViewport({ width: vista.width, height: vista.height });
      for (const ruta of paginas) {
        await page.goto(`http://127.0.0.1:${puerto}${ruta}`, { waitUntil: "networkidle0" });
        await page.evaluate(axeSource);
        const resultado = await page.evaluate(async () => {
          return axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
          });
        });
        const fallos = resultado.violations;
        if (fallos.length === 0) {
          console.log(`OK ${vista.nombre} ${ruta}`);
          continue;
        }
        codigo = 1;
        console.error(`FALLO ${vista.nombre} ${ruta}`);
        for (const fallo of fallos) {
          const nodos = fallo.nodes.map((n) => n.target.join(" ")).slice(0, 5).join("; ");
          console.error(`  ${fallo.id}: ${fallo.help} [${nodos}]`);
        }
      }
    }
  } finally {
    await browser.close();
  }
} catch (error) {
  console.error(error);
  codigo = 1;
} finally {
  servidor.kill();
}
process.exit(codigo);
