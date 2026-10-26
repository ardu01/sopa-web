# Traspaso

Fecha: 26 de octubre de 2026 (actualizado; el resto del texto es del 19 de octubre).

El turno de este grupo fue del 17 al 21 de octubre de 2026. Otro grupo comparte el repositorio. `main` publicado, antes de este cambio, es `34c8855` (PR #17, fusionado). Este archivo acompaña la pasada de rendimiento con Lighthouse en móvil: https://github.com/ardu01/sopa-web/pull/18 contra `main`, rama `cursor/rendimiento-lighthouse-c470`. No está fusionado.

## Último cambio (26 de octubre de 2026)

- Pull request de la beta 1.18.0 contra `main` (rama `beta-1.18.0`). Se hizo desde la caja: el agente en la nube no puede leer Sopa-IA/sopa-motor.
  - La web está en la beta 1.18.0 (Latest de Sopa-IA/sopa-motor, publicada el 25 de octubre de 2026 a las 14:25, hora de Madrid). Descargas alojadas en `descargas/`: `Sopa-1.18.0-windows-setup.exe` (56 880 015 B, SHA-256 `c7e7ad75…c9990`) y `Sopa-1.18.0-windows.zip` (39 455 587 B, SHA-256 `c3681288…a7b93`). Los hashes coinciden con las notas de la Release. Las de la 1.16.8 se han quitado.
  - Oferta del código fuente para Sopa 1.18.0 (etiqueta v1.18.0), por issue en este repositorio, al menos tres años. Licencia GPL-3.0-only. `LICENSE` es idéntico al de la etiqueta v1.18.0.
  - Novedades sacadas de las notas de la 1.16.9, la 1.17.0 y la 1.18.0, todas con «En pruebas»: captura de la página HTML en la etiqueta del chat (ordenador y Sopa Mobile), pruebas locales que vuelven al modelo hasta «Código comprobado» o 3 intentos, JavaScript de tipo módulo sin Node «sin comprobar», plan y línea de estado en el chat y los agentes, respuesta limpia en español, Investigación con dos o tres fuentes y enlaces, «Confirmar» en Automatizaciones y al preparar un archivo, «Parar», aviso cerca del límite con resumen, bloques de código con desplazamiento propio y textos largos desde el móvil que ya no se pierden. Ayuda tocada: el primer chat, Sopa Mobile, Automatizaciones e instalar en Windows.
  - Embeddings en la GPU y Diseño 3D no entran en la 1.18.0 y no se mencionan. «Ver imágenes» sigue en «Lo que viene».
  - Se quita el problema conocido de la página HTML larga cortada desde el móvil: la 1.16.9 corrige la pérdida de textos largos en el móvil emparejado. Los otros tres problemas conocidos se mantienen porque ninguna nota dice que estén arreglados.
  - La ruta de versiones ya no marca «ahora» en la 1.16; la versión actual la dice la línea de encima.
- `auditar.py` sigue con los 2 errores antiguos (`404.html` fuera del sitemap y la falta de `applicationCategory`). html-validate, enlaces internos y axe pasan en local.

## Pendiente (26 de octubre de 2026)

- No hay capturas reales de la 1.18.0. Las capturas de la app de la web son las de antes; no se ha inventado ninguna. Hay que sustituirlas cuando haya capturas de verdad de la 1.18.0 (la etiqueta con la captura de la página HTML, el plan y la línea de estado, el botón «Confirmar» de Automatizaciones y la vista en Sopa Mobile).
- La 1.17.0 y la 1.18.0 no constan probadas en la torre MSI_TORRE: solo CI (Linux 3.12 y 3.13, Windows exe, pruebas-windows y e2e, CodeQL). La 1.16.9 pasó en la torre los casos es-md, web y largo. Por eso todo lo nuevo va «En pruebas». Cuando haya prueba en la torre, se puede quitar la etiqueta de lo que pase.
- El simulador sigue enseñando la interfaz de la 1.16.0; solo cambia el número de versión del pie.

## Cambio anterior (25 de octubre de 2026)

- https://github.com/ardu01/sopa-web/pull/22 contra `main`, fusionado el 25 de octubre de 2026 a las 10:14 (hora de Madrid), squash, commit `e12b3f6`. La CI estaba en verde. Pages lo publicó a las 10:15.
  - La web está en la beta 1.16.8. Descargas alojadas en `descargas/`: `Sopa-1.16.8-windows-setup.exe` (56 834 466 B, SHA-256 `5da0bd88…58dfe`) y `Sopa-1.16.8-windows.zip` (39 409 627 B, SHA-256 `660b75c8…527e5`). Las de la 1.16.7 se han quitado y dan 404.
  - Licencia: GPL-3.0-only desde la 1.16.8; hasta la 1.16.7, GPL-3.0-or-later. Lo dice la caja de descarga. La oferta del código fuente es para Sopa 1.16.8 (etiqueta v1.16.8), por issue en este repositorio, al menos tres años. `LICENSE` es el texto de la GPLv3, idéntico al de la etiqueta v1.16.8.
  - Novedades de la 1.16.8 sacadas de las notas, marcadas «En pruebas»: código comprobado (también desde Sopa Mobile), «Ir al final», «Copiar» y el chat sin desplazamiento lateral. Problema conocido nuevo: una página HTML larga pedida desde el móvil puede llegar cortada y sin comprobar.
  - Se quitó la fuente `https://comparehw.com/gpus/amd` de `datos/ancho-de-banda.json` y `js/anchos.js`, porque da 404 y rompía «Enlaces externos». Cada gráfica afectada conserva su otra fuente.
- `auditar.py` sigue con los 2 errores antiguos (`404.html` fuera del sitemap y la falta de `applicationCategory`).

## Pendiente anterior (25 de octubre de 2026, sustituido por el de arriba)

- No hay capturas reales de la 1.16.8. Las capturas de la app de la web son las de antes; no se ha inventado ninguna. Hay que sustituirlas cuando haya capturas de verdad de la 1.16.8 (la etiqueta «Código comprobado», «Ir al final» y la barra nueva de Sopa Mobile en el iPhone).
- La comprobación del código de la 1.16.8 va «En pruebas»: en la torre solo se hizo una prueba corta, por un problema de estabilidad del equipo.

## Cambio anterior (24 de octubre de 2026)

- https://github.com/ardu01/sopa-web/pull/21 contra `main`, fusionado el 24 de octubre de 2026 a las 08:55 (hora de Madrid), squash, commit `f64559c`. La CI estaba en verde.
  - La web está en la beta 1.16.7. Las descargas están alojadas en `descargas/`: instalador y zip de la 1.16.7, con su SHA-256. Las de la 1.9.4 se han quitado.
  - Oferta del código fuente (GPLv3) en `index.html#codigo-fuente`: se pide abriendo un issue en este repositorio. Se mantiene al menos tres años.
  - Licencia: GPLv3 (GPL-3.0-only). Los archivos de la 1.16.7 se publicaron como GPL-3.0-or-later; desde la próxima versión serán GPL-3.0-only. La caja de descarga lo dice.
  - Lo posterior a la 1.9.4 lleva «En pruebas». Menú móvil (≤700 px) en `js/menu.js`. `js/catalogo.js` y `js/compatibilidad.js` al día con la revisión 7 del catálogo (41 modelos).
- https://github.com/ardu01/sopa-web/pull/19 y https://github.com/ardu01/sopa-web/pull/20, cerrados sin fusionar el 24 de octubre de 2026: los sustituye el #21.
- `auditar.py` sigue con los 2 errores antiguos: `404.html` no está en el sitemap y a `SoftwareApplication` le falta `applicationCategory`.

## Hecho (fusionado y publicado)

Hasta el #21, la descarga pública era la beta 1.9.4 y lo posterior llevaba «En la próxima versión pública». No hay precios, planes ni datos personales. No hay enlaces a repositorios privados.

- https://github.com/ardu01/sopa-web/pull/1 contra `main`, fusionado. El Supervisor dio el OK el 17 de octubre de 2026. Quita Plus y Pro, la compra única y la clave de licencia. `LICENSE` es el texto íntegro de la GNU GPLv3. El copyright (Miguel Rodríguez Saiz, 2026) está en `NOTICE`, en el README y en el pie. El menú apunta a `#licencia`; el ancla `#planes` se conserva vacío. Entra el CI «HTML válido y enlaces internos» (`.github/workflows/html-y-enlaces.yml`): html-validate, enlaces relativos y axe-core (WCAG 2 A y AA) en escritorio y en móvil. No entra en `descargas/`.
- https://github.com/ardu01/sopa-web/pull/2 contra `main`, fusionado. El Supervisor dio el OK el 18 de octubre de 2026. Accesibilidad y rendimiento: «Saltar al contenido», foco visible, menú en pantallas estrechas, `prefers-reduced-motion` y el primer pantallazo de la portada sin esperar a la animación.
- https://github.com/ardu01/sopa-web/pull/3 contra `main`, fusionado el 18 de octubre de 2026. SEO: title, descripción, canonical, Open Graph y Twitter Card en cada página. `sitemap.xml`, `robots.txt` y `404.html` con enlaces absolutos `/sopa-web/`.
- https://github.com/ardu01/sopa-web/pull/4 contra `main`, fusionado el 18 de octubre de 2026. CI «Enlaces externos» (`.github/workflows/enlaces-externos.yml`, `lychee.toml`). No cambia la web visible. EatYourBytes, TechPowerUp y `https://www.gnu.org/licenses/gpl-3.0.html` se excluyen porque el comprobador no llega; el enlace de la GPL sigue en la web y el texto está en `LICENSE`.
- https://github.com/ardu01/sopa-web/pull/5 contra `main`, fusionado el 18 de octubre de 2026 (commit `296d34dd42a43c314a3f3f96eb24793283a58759`). Contenido de la 1.12.1 (búsqueda web, Investigación, límites de «Permitir desde el móvil») marcado «En la próxima versión pública». El interruptor en sí es de la 1.5. No se publicó la política de privacidad.
- https://github.com/ardu01/sopa-web/pull/6 contra `main`, fusionado el 18 de octubre de 2026 (commit `e0e0f4f8221eee967c1916f121c0ea714824166a`). Cuatro guías nuevas. Pages: https://github.com/ardu01/sopa-web/actions/runs/39114768199
- https://github.com/ardu01/sopa-web/pull/7 contra `main`, fusionado el 18 de octubre de 2026 (commit `a1b775faa408cf782882b8cafa4373b0413e0483`). Capturas también en AVIF; el WebP se queda. Pages: https://github.com/ardu01/sopa-web/actions/runs/39115128798
- https://github.com/ardu01/sopa-web/pull/8 contra `main`, fusionado el 18 de octubre de 2026 (commit `03a2fbfdec8106f1cd0bfe1a2d1194b6d10d226d`). Simulador de la interfaz 1.12.1, sin calculadora de velocidades. Pages: https://github.com/ardu01/sopa-web/actions/runs/39117092609
- https://github.com/ardu01/sopa-web/pull/9 contra `main`, fusionado el 18 de octubre de 2026 (commit `4fd534c2a9e7f806da807fcd692deccdacd9d103`). Las guías describen ese simulador, no una calculadora. Pages: https://github.com/ardu01/sopa-web/actions/runs/39117309235
- https://github.com/ardu01/sopa-web/pull/10 contra `main`, fusionado el 18 de octubre de 2026 (commit `7eb8d34`). Avisos de descarga y de poca memoria de la 1.13.0 en el simulador, con «En la próxima versión pública» y los gigabytes en blanco.
- https://github.com/ardu01/sopa-web/pull/12 contra `main`, fusionado el 18 de octubre de 2026 (commit `e2d3209`). Portada de la ayuda e «Instalar Sopa en Windows». El Supervisor dio el OK al formato.
- https://github.com/ardu01/sopa-web/pull/13 contra `main`, fusionado el 18 de octubre de 2026 (commit `b916136`). Resto del centro de ayuda: ocho temas (el primer chat, elegir un modelo, Tus documentos, Memoria, Entrenamiento, automatizaciones, Sopa Mobile y problemas frecuentes). El índice ya no dice «Próximamente».
- https://github.com/ardu01/sopa-web/pull/14 contra `main`, fusionado el 18 de octubre de 2026 por el dueño (commit `5810a01`). Cierre de turno: solo actualizaba este archivo. La CI estaba en verde.
- https://github.com/ardu01/sopa-web/pull/15 contra `main`, fusionado (commit `be82eeb`). Simulador y centro de ayuda al día con la 1.14.0, la 1.15.0 y la 1.16.0. Lo posterior a la 1.9.4 lleva «En la próxima versión pública». No se tocó `descargas/` ni `datos/descarga.js`.
  - 1.14.0: en el chat la respuesta aparece mientras se escribe, con un cursor verde al final. El razonamiento y los bloques de herramienta van aparte. Menús y botones del chat no cambian. El instalador pesa 55,6 MB (antes 66,4), sigue sin firmar (SmartScreen) y se instala a mano porque el actualizador no la ofrece. Está contado en la ayuda de instalación; la descarga de la web sigue siendo la 1.9.4.
  - 1.15.0: pantalla «Comparar» en «Tu IA», debajo de «Entrenamiento», y página de ayuda `ayuda/comparar.html`. Modelo base Qwen3.5 0.8B y el personalizado, uno detrás de otro, misma temperatura, sin herramientas, sin web y sin agentes. Si no hay personalizado, o si falta el base, salen los avisos de la app; sin el base el botón queda desactivado y no descarga nada. En Tus documentos la pantalla no cambia: la ayuda explica el orden en lenguaje llano (las dos búsquedas se juntan y, si un fragmento tiene más palabras de la pregunta, pasa delante).
  - 1.16.0: tarjeta «Preparar ejemplos» encima del paso 1, también en la ayuda de Entrenamiento. Botones «Elegir origen...» y «Crear ejemplos». El resultado va en letra normal. No llama al modelo. Un archivo con macros no se lee. El pie del simulador dice «Versión 1.16.0 beta».
  - Dato medido, no una promesa: en un PC con RTX 5070, Qwen3 4B corre en la gráfica a unos 61 tok/s. Está en la ayuda de elegir un modelo y en una nota del simulador. No es la velocidad de otro equipo.

- https://github.com/ardu01/sopa-web/pull/16 contra `main`, fusionado el 19 de octubre de 2026 por el dueño (commit `37cfb19`). Página `ayuda/esta-usando-mi-grafica.html` y el matiz «En pruebas; se está puliendo para la próxima versión.» en el streaming de respuestas largas, la búsqueda web y los agentes. El Markdown de las respuestas no se presentaba como función que ya va bien. La CI estaba en verde.
- https://github.com/ardu01/sopa-web/pull/17 contra `main`, fusionado (commit `34c8855`). Su contenido se retiró de la web el 23 de octubre de 2026 por decisión de Miguel (ver «Retirado»).

## Retirado

- La app aparte de mando táctil (iPad o móvil para el PC), que tenía página de ayuda y menciones en la web, se retiró por decisión de Miguel el 23 de octubre de 2026: Miguel la abandonó el 22 y no debe volver a la web. Se borró su página de ayuda y todas sus menciones, enlaces y la entrada del sitemap. No se vuelve a añadir.

## En borrador

- https://github.com/ardu01/sopa-web/pull/11 contra `main`, borrador, rama `cursor/descarga-siguiente-c470`. Ficha de descarga de la 1.13.x, apagada. Para activarla se edita `datos/descarga.js` (`version`, `urlInstalador`, `sha256`, `nombreArchivo`, `urlCodigoFuente` y `activa: true`) solo cuando el dueño haga públicas las releases. Hasta entonces no se fusiona y no se ofrecen esas descargas.

## En este turno (abierto, no fusionado)

Pasada de rendimiento con Lighthouse 12.8.2, preset móvil por defecto (412×823, DPR 1,75, red lenta simulada y CPU ×4), tres pasadas y mediana. Servido en local bajo `/sopa-web/`. Páginas: portada, simulador, índice de la ayuda y `ayuda/instalar-sopa-en-windows.html`. Los JSON no se publican: quedan fuera del repositorio.

No cambia el texto ni el aspecto. No se ha tocado `descargas/` ni `datos/descarga.js`.

- Portada: el `sizes` de las capturas de la app usa el ancho real (`100vw - 48px`), así el móvil pide el AVIF de 640 px y no el de 832. `app.js` se sirve minificado (`app.min.js`).
- Simulador: deja de bajar el CSS de la portada que no usa (`comun.css` en su lugar). El logotipo de Inicio tiene copia a 192 px. `js/simulador.js` se sirve minificado.
- Ayuda: una sola hoja `bloque-ayuda.css` (lo compartido, las guías y la ayuda), sin el CSS de la portada. El buscador va con `defer` y minificado.
- `terser` 5.44.0 está fijado en `package.json`. `node scripts/empaquetar.mjs` regenera la hoja de la ayuda. Pages no ejecuta nada: los archivos resultantes van en el repositorio.
- La caché y la compresión de texto las pone GitHub Pages. El servidor local de la medida no las envía, y no se pueden fijar en los archivos estáticos. Siguen saliendo en Lighthouse.

## Pendiente

Nada de esta pasada queda sin medir. Este turno lo deja en https://github.com/ardu01/sopa-web/pull/18, sin fusionar. No se empieza el arreglo de la 1.16.1.

## Bloqueado, a decisión del dueño

- Enlaces a releases privadas de Sopa-IA (Sopa Desktop 1.12.1 y motor-ligero v0.1.0-exe.1). Los repos Sopa-IA/sopa-motor y Sopa-IA/motor-ligero no son públicos. Esta integración recibe 404 si los consulta.
- Política de privacidad v1.4. Es un borrador, no está en vigor y no se ha publicado. Tampoco hay aviso legal.
- El dato de contacto lo decide el titular. No se han copiado NIF, correo, domicilio ni teléfono.
- Licencias antiguas. Un archivo de una versión anterior no abre ni cierra el uso. No se documenta aquí ninguna clave.

## Normas

- Reportar al Supervisor. Fusionar solo con la CI en verde, y solo cuando lo ordene el dueño.
- Nada de precios, planes ni datos personales.
- No enlazar repositorios privados ni releases que no estén públicas.
- GPLv3. Copyright de Miguel Rodríguez Saiz.
- La publicación del 17 de octubre se probó con una revisión del Supervisor, no en el portátil MSI. Esa excepción es solo para la web: el MSI no funciona por un fallo de la app.

## Notas

- No se ha gastado dinero ni se han creado secretos.
- «HTML válido y enlaces internos» corre en cada pull request y al hacer push a `main`. html-validate 10.5.0 y axe-core 4.10.3 están fijados. El workflow instala npm 11.21.1 y con él hace `npm ci`: el npm 10.9.9 de Node 22.23 falla al instalar el validador. Axe usa `prefers-reduced-motion` para no medir texto todavía invisible. Si el runner no trae Chrome, descarga Chrome headless 131. GitHub Pages publica `main` aparte, con `pages-build-deployment`.
- «Enlaces externos» corre en cada pull request y, en `main`, cada lunes. No comprueba el envío del formulario de fallos. El formulario sigue con el destino que ya tenía.
- El simulador no calcula velocidades. Las respuestas son de ejemplo y no copian el texto preparado de las pruebas de Windows. El pie de esa ventana dice «Versión 1.16.7 beta». Las automatizaciones están en Ajustes, no en la barra.
- El centro de ayuda está en `ayuda/`. Hay página de Comparar, Preparar ejemplos está dentro de Entrenamiento y «¿Está usando mi gráfica?» explica el Administrador de tareas. La descarga de la web es la beta 1.16.7. Desde la 1.9.4 o anteriores se instala a mano, porque su actualizador no la ofrece.
