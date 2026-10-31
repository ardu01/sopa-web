# Traspaso

Fecha: 31 de octubre de 2026 (actualizado; el resto del texto es del 19 de octubre).

El turno de este grupo fue del 17 al 21 de octubre de 2026. Otro grupo comparte el repositorio. `main` publicado, antes de este cambio, es `34c8855` (PR #17, fusionado). Este archivo acompaña la pasada de rendimiento con Lighthouse en móvil: https://github.com/ardu01/sopa-web/pull/18 contra `main`, rama `cursor/rendimiento-lighthouse-c470`. No está fusionado.

## Último cambio (31 de octubre de 2026)

- La web pasa a Sopa 2.0.0, la Latest de Sopa-IA/sopa-motor (publicada el 31 de octubre de 2026 a las 03:54, hora de Madrid, con la etiqueta v2.0.0). Se hizo desde la caja en el PR #33 (https://github.com/ardu01/sopa-web/pull/33), con la CI en verde («HTML válido y enlaces internos» y «Enlaces externos»). Se fusionó por squash `f8ceeeb` el 31 de octubre de 2026 a las 10:13 (hora de Madrid) y GitHub Pages lo publicó a las 10:14. Todos los commits van con el noreply de ardu01. La config git local del clon llevaba el correo personal y se cambió antes del primer commit.
  - Comprobación en vivo a las 10:14 (hora de Madrid): las dos descargas de la 2.0.0 dan 200 con el tamaño y el SHA-256 de abajo, las de la 1.20.0 dan 404, la portada dice «Beta 2.0.0» y `ayuda/equipo.html` da 200 y está en el sitemap.
  - Las descargas están en `descargas/`: `Sopa-2.0.0-windows-setup.exe` (66 572 037 B, 63,5 MB, SHA-256 `3cc2f72b…9ac7`) y `Sopa-2.0.0-windows.zip` (49 145 104 B, 46,9 MB, SHA-256 `afd93f07…ed03`). Coinciden con `SHA256SUMS.txt` y con las notas de la Release. Se quitaron las de la 1.20.0.
  - La oferta del código fuente es para Sopa 2.0.0 (etiqueta v2.0.0), con `LICENSE` idéntico al de la etiqueta. GPL-3.0-only.
  - El rótulo sigue siendo «Beta 2.0.0», aunque la Release se titula «Sopa 2.0.0» y no está marcada como prerelease. No se ha anunciado ningún fin de beta, así que la decisión queda para el dueño.
  - Las novedades salen solo de las notas y del código de v2.0.0, y todas van «En pruebas»:
    - el equipo de agentes, cada uno con su hilo, su memoria, su nombre y su cara;
    - Investigación, Documentos, Archivos y Automatizaciones con bucle de herramientas;
    - los archivos nuevos solo se escriben al confirmar, después de ver la vista previa;
    - planes de 2 a 8 pasos, con la vista previa de lo leído y los códigos copiados tal cual;
    - Markdown y el idioma del usuario;
    - el móvil con archivos, que confirma o cancela;
    - la interfaz nueva: paleta, Sala y Taller.
    Aparecen en la caja de descarga, en la FAQ, en `#pasos` y en `#agentes-20`.
  - `#agentes-20` pasa a «Nuevo en la 2.0.0» (En pruebas) y en el menú se llama «Equipo». Se ha quitado «Próximamente» y no se promete nada más. En `#proximamente` solo queda Ver imágenes.
  - No hay capturas de la 2.0.0. La galería y el chat de `#agentes-20` dicen que sus capturas son de la beta 1.20.0. La ilustración de las caras conserva su rótulo. El simulador sigue en la interfaz 1.16.0 y avisa de que la 2.0.0 trae Sala y Taller.
  - Ayuda: hay una página nueva, `ayuda/equipo.html`, enlazada desde el índice, «Otras páginas», el sitemap y `scripts/accesibilidad.mjs`. La navegación se ajustó a la 2.0.0 en estas páginas:
    - el primer chat: Sala › Conversación, «Nueva» y «Habla con…»;
    - modelos: Taller › Modelos, con los filtros nuevos y la columna «Funciona aquí»;
    - memoria y Tus documentos: el grupo «Lo tuyo»;
    - entrenamiento, comparar y Diseño 3D: las pestañas del Taller;
    - instalar: la 2.0.0, con el zip;
    - Sopa Mobile: una línea sobre la 2.0.0.
  - El catálogo de modelos no cambia entre v1.20.0 y v2.0.0. Solo cambia una nota, «Probado en la torre de pruebas», que `js/catalogo.js` ya decía así. No se encontró el nombre del equipo de pruebas en ninguna parte.
  - `auditar.py` (fuera del repo) da solo los 2 errores antiguos. html-validate, los enlaces internos y axe (escritorio y móvil) pasan en local.

## Pendiente (31 de octubre de 2026)

- Faltan capturas reales de la 2.0.0 (Sala, Taller, equipo) para la galería, `#agentes-20` y la ayuda. No se ha inventado ninguna.
- Decidir con el dueño si el rótulo pasa de «Beta 2.0.0» a «Sopa 2.0.0», es decir, si termina la beta.
- La 2.0.0 aún no se ha usado en el día a día ni se ha probado en el portátil de referencia. Según sus notas, pasó en la torre de pruebas la batería entera (51 de 51), y por eso lo nuevo va «En pruebas».
- El simulador sigue en la interfaz 1.16.0, sin Sala, Taller ni Diseño 3D.
- Siguen pendientes los PR #11 (borrador) y #19, como abajo.

## Cambio anterior (30 de octubre de 2026, tarde)

- https://github.com/ardu01/sopa-web/pull/31 — portada pulida a petición de Miguel («Arréglalo déjalo profesional pulido como si Apple la hubiese publicado»). Fusionado por squash `b38c324` el 30 de octubre de 2026 a las 13:45 (hora de Madrid), con la CI «HTML válido y enlaces internos» y «Enlaces externos» en verde. En vivo a las 13:45. Hecho desde la caja, después del cierre de turno del otro grupo (`60e78f4`, #29 y #30).
  - `#agentes-20` pasa al final, junto a `#proximamente`, y en el menú aparece como «Próximamente». Solo da la idea general: equipo de agentes con nombre, trabajo y cara, sin fecha. Se quitan las promesas de detalle (confirmación antes de escribir, lo que recuerda cada agente, la lista de plantillas y los estados) y los pasos «pantalla» y «rotulo», con las capturas del desarrollo `07-pagina-agentes` y `01-desktop-inicio`. Los archivos de esas capturas siguen en `img/`, pero no se usan. La demo de caras lleva el rótulo «Ilustración. No es una captura de la app.» y frases de papel genéricas. El botón ahora dice «Conoce al equipo».
  - Los rótulos «Nuevo en la 0.10/1.x» y «Desde la 1.10/1.12» pasan a ir por tema. Las etiquetas Ya funciona, Beta y En pruebas no cambian.
  - Las notas de pruebas van en `.letra-pequena`, con el texto intacto. Se quitan las 4 líneas «Esta función está disponible para todos.» (restos de planes) y la línea de versiones (`.ruta`). El hero tiene ahora el botón «Descargar la beta» (#descarga). El titular final es «Pruébala hoy.».
  - La caja de descargas y `#licencia` no cambian.
  - Capturas de antes y después en `capturas-revision/portada-30oct/`.

## Cambio anterior (30 de octubre de 2026, mañana)

1) https://github.com/ardu01/sopa-web/pull/26 — capturas de la portada 1.20.0. Fusionado por squash `8fb884f` el 29 de octubre de 2026 a las 19:56 (hora de Madrid). CI «HTML válido y enlaces internos» y «Enlaces externos» en verde. Sustituye oscuro-eleccion/claro-modelos/oscuro-memoria «010» por oscuro-chat-120, claro-modelos-120, oscuro-diseno-3d-120 (webp/avif y variantes 640/832). Deck y el resto sin tocar. Capturas hechas en el PC del dueño (client 1164×761 → 1149×751), no en la torre de pruebas.

2) https://github.com/ardu01/sopa-web/pull/27 — portada `#agentes-20`: relato al scroll del chat beta 1.20.0 al equipo de agentes. Fusionado por squash `9133321` el 30 de octubre de 2026 a las 12:18 (hora de Madrid) con el OK explícito de Miguel («Sí, publica cuando CI esté verde»). CI «HTML válido y enlaces internos» y «Enlaces externos» en verde en el head `10a2c12`. Rama `cursor/agentes-20-scrollytelling-9df7`. Cloud agent `bc-95775f49-cea1-5829-9270-346191ac9df7`.
   - La transición es solo el clip `media/sopa-pool-dive-v3.webm` / `.mp4` (scrub al bajar; sin controles; sin otra animación). Los textos son de producto (nombre, trabajo, cara) y no explican el scroll. Con `prefers-reduced-motion` no hay scrub: se ve el equipo.
   - Avatares oficiales en `img/avatares/` (PNG/WebP y WebM en bucle): Sopa, Director, Código, Documentos, Archivos, Investigación, Automatizaciones (plantillas web-plantillas y anim-alpha).
   - `#planes` sigue vacío. Sin Plus/Pro.
   - URL viva: https://ardu01.github.io/sopa-web/#agentes-20 (Pages tras el merge).
- Pack de redes, fuera del repo, en la caja del agente Sopa Web: `/workspace/pack-redes-agentes-20/` (`COPY.md`, `MANIFIESTO.md`, `media/`). No se ha copiado al repo.

## Pendiente anterior (30 de octubre de 2026, sustituido por el de arriba)

- El simulador sigue en la interfaz 1.16.0 (sin Diseño 3D en pantalla).
- https://github.com/ardu01/sopa-web/pull/11, borrador (ficha de descarga 1.13.x), sin fusionar.
- https://github.com/ardu01/sopa-web/pull/19 (Novedades; corregir 0.5.0→0.5.1 si aplica) cuando el dueño lo diga. El #20 se cerró sin fusionar el 24 de octubre de 2026 (sustituido históricamente).
- La torre de pruebas no se puede usar (BSOD/RAM). No exigir prueba ahí para este cierre.
- Quitar planes Plus/Pro del texto residual si queda alguno (norma: Sopa es GPLv3 / software libre), solo si el Supervisor reabre ese alcance.

## Cambio anterior (29 de octubre de 2026)

- Web a la beta 1.20.0 (Latest de Sopa-IA/sopa-motor, publicada el 29 de octubre de 2026 a las 09:33, hora de Madrid; etiqueta en el squash `bb78528`). Hecho desde la caja: PR #25 (https://github.com/ardu01/sopa-web/pull/25), CI en verde (HTML válido y enlaces internos, y Enlaces externos), fusionado por squash `ea160ef` el 29 de octubre de 2026 a las 10:14 (hora de Madrid); GitHub Pages publicado a las 10:15.
  - Comprobado en vivo a las 10:17 (hora de Madrid): las dos descargas de la 1.20.0 dan 200 con el tamaño y el SHA-256 de arriba; las de la 1.19.0 dan 404; la portada dice «Beta 1.20.0»; `ayuda/diseno-3d.html` da 200 y está en el sitemap.
  - Descargas en `descargas/`: `Sopa-1.20.0-windows-setup.exe` (56 956 528 B, SHA-256 `c8aa361b…a1363b`) y `Sopa-1.20.0-windows.zip` (39 533 072 B, SHA-256 `4b88228b…dcdde`). Coinciden con `SHA256SUMS.txt` y con las notas de la Release. Las de la 1.19.0 se han quitado.
  - Oferta del código fuente para Sopa 1.20.0 (etiqueta v1.20.0). `LICENSE` es idéntico al de la etiqueta v1.20.0. GPL-3.0-only.
  - Novedad de la 1.20.0 con «En pruebas»: Diseño 3D (OpenSCAD, si no CadQuery, si no cubos/cilindros/esferas; hasta 3 correcciones; inventario JSON local; sin ejecutar Python del modelo). En la caja de descarga, en la FAQ de versión y en la página nueva `ayuda/diseno-3d.html` (en el índice de la ayuda, en «Otras páginas», en el sitemap y en `scripts/accesibilidad.mjs`). Los textos de la pantalla salen de `sopa_app/ui/index.html`, `ui/diseno3d.js`, `diseno3d.py` y `backend.py` de la etiqueta; no hay captura.
  - La 1.20.0 quita del chat «Creatividad» y «Pensar antes de responder», y en la app no hay corte por silencio. Se dice en la caja de descarga. En la portada, «Activa el razonamiento…» pasa a «elige «Para razonar»». En el simulador se quitan el deslizador, la casilla, su ejemplo de razonamiento en `js/simulador.js` (y `.min.js`) y la fila «Pensar antes de responder» de la tabla; se añade la fila de Diseño 3D (pruebas automáticas), como en `funciones.json`. El simulador sigue siendo la interfaz de la 1.16.0 y lo dice.
  - El catálogo de modelos no cambia entre v1.19.0 y v1.20.0 (diff de la API). El tope de 45 s de las tareas de varios pasos (`pasos.py`) sigue y no se toca.
  - `auditar.py` (copiado de `/workspace/sopa-web/herramientas/`, apuntando a este clon): solo los 2 errores antiguos. html-validate, enlaces internos y axe (escritorio y móvil) pasan en local.

## Pendiente anterior (29 de octubre de 2026, sustituido por el de arriba)

- No hay capturas reales de la 1.18.0, la 1.19.0 ni la 1.20.0. No se ha inventado ninguna. Falta, además, la pantalla Diseño 3D y el chat sin Creatividad ni Pensar.
- La 1.17.0, la 1.18.0, la 1.19.0 y la 1.20.0 no constan probadas en la torre de pruebas: solo CI. Diseño 3D no se ha probado con OpenSCAD real (el binario no se lanzó en CI). Todo lo nuevo va «En pruebas».
- El simulador sigue enseñando la interfaz de la 1.16.0 (sin Creatividad ni Pensar); no tiene la pantalla Diseño 3D.

## Cambio anterior (27 de octubre de 2026)

- Web a la beta 1.19.0 (Latest de Sopa-IA/sopa-motor, publicada el 27 de octubre de 2026 a la 01:11, hora de Madrid; etiqueta en el squash `0ff5241`). Hecho desde la caja, en un PR contra `main`.
  - Descargas en `descargas/`: `Sopa-1.19.0-windows-setup.exe` (56 891 485 B, SHA-256 `99462db5…d44b2`) y `Sopa-1.19.0-windows.zip` (39 467 024 B, SHA-256 `7e6a2b74…67380`). Coinciden con `SHA256SUMS.txt` y con las notas de la Release. Las de la 1.18.0 se han quitado.
  - Oferta del código fuente para Sopa 1.19.0 (etiqueta v1.19.0). `LICENSE` es idéntico al de la etiqueta v1.19.0. GPL-3.0-only.
  - Novedad de la 1.19.0, sacada de las notas y con «En pruebas»: la búsqueda por significado de Tus documentos puede usar la gráfica cuando el chat no la usa; si el chat la usa o va a cargar un modelo, el buscador va al procesador o le deja sitio; sin gráfica o con driver viejo, procesador. Está en la caja de descarga y en `ayuda/tus-documentos.html`. No se cita el texto exacto de la pantalla porque no hay captura.
  - Diseño 3D no entra en la 1.19.0 y no se menciona. No es la 2.0. Los problemas conocidos no cambian: ninguna nota dice que estén arreglados.
  - `auditar.py`: 0 errores. html-validate pasa en local.

## Pendiente anterior (27 de octubre de 2026, sustituido por el de arriba)

- No hay capturas reales de la 1.18.0 ni de la 1.19.0. No se ha inventado ninguna. Falta, además de lo de la 1.18.0, la pantalla de documentos diciendo dónde va el buscador.
- La 1.17.0, la 1.18.0 y la 1.19.0 no constan probadas en la torre de pruebas: solo CI. Todo lo nuevo va «En pruebas».
- El simulador sigue enseñando la interfaz de la 1.16.0; solo cambia el número de versión del pie.

## Cambio anterior (26 de octubre de 2026)

- https://github.com/ardu01/sopa-web/pull/23 contra `main`, fusionado el 26 de octubre de 2026 a las 10:10 (hora de Madrid), squash, commit `1ca7bbf`. La CI estaba en verde («HTML válido y enlaces internos» y «Enlaces externos»). Pages lo publicó a las 10:11. Se hizo desde la caja: el agente en la nube no puede leer Sopa-IA/sopa-motor.
  - Comprobado en vivo: la portada dice «Beta 1.18.0»; las dos descargas responden 200 con el tamaño y el SHA-256 correctos; `descargas/Sopa-1.16.8-windows-setup.exe` da 404.
  - La web está en la beta 1.18.0 (Latest de Sopa-IA/sopa-motor, publicada el 25 de octubre de 2026 a las 14:25, hora de Madrid). Descargas alojadas en `descargas/`: `Sopa-1.18.0-windows-setup.exe` (56 880 015 B, SHA-256 `c7e7ad75…c9990`) y `Sopa-1.18.0-windows.zip` (39 455 587 B, SHA-256 `c3681288…a7b93`). Los hashes coinciden con las notas de la Release. Las de la 1.16.8 se han quitado.
  - Oferta del código fuente para Sopa 1.18.0 (etiqueta v1.18.0), por issue en este repositorio, al menos tres años. Licencia GPL-3.0-only. `LICENSE` es idéntico al de la etiqueta v1.18.0.
  - Novedades sacadas de las notas de la 1.16.9, la 1.17.0 y la 1.18.0, todas con «En pruebas»: captura de la página HTML en la etiqueta del chat (ordenador y Sopa Mobile), pruebas locales que vuelven al modelo hasta «Código comprobado» o 3 intentos, JavaScript de tipo módulo sin Node «sin comprobar», plan y línea de estado en el chat y los agentes, respuesta limpia en español, Investigación con dos o tres fuentes y enlaces, «Confirmar» en Automatizaciones y al preparar un archivo, «Parar», aviso cerca del límite con resumen, bloques de código con desplazamiento propio y textos largos desde el móvil que ya no se pierden. Ayuda tocada: el primer chat, Sopa Mobile, Automatizaciones e instalar en Windows.
  - Embeddings en la GPU y Diseño 3D no entran en la 1.18.0 y no se mencionan. «Ver imágenes» sigue en «Lo que viene».
  - Se quita el problema conocido de la página HTML larga cortada desde el móvil: la 1.16.9 corrige la pérdida de textos largos en el móvil emparejado. Los otros tres problemas conocidos se mantienen porque ninguna nota dice que estén arreglados.
  - La ruta de versiones ya no marca «ahora» en la 1.16; la versión actual la dice la línea de encima.
- `auditar.py` sigue con los 2 errores antiguos (`404.html` fuera del sitemap y la falta de `applicationCategory`). html-validate, enlaces internos y axe pasan en local.

## Pendiente anterior (26 de octubre de 2026, sustituido por el de arriba)

- No hay capturas reales de la 1.18.0. Las capturas de la app de la web son las de antes; no se ha inventado ninguna. Hay que sustituirlas cuando haya capturas de verdad de la 1.18.0 (la etiqueta con la captura de la página HTML, el plan y la línea de estado, el botón «Confirmar» de Automatizaciones y la vista en Sopa Mobile).
- La 1.17.0 y la 1.18.0 no constan probadas en la torre de pruebas: solo CI (Linux 3.12 y 3.13, Windows exe, pruebas-windows y e2e, CodeQL). La 1.16.9 pasó en la torre los casos es-md, web y largo. Por eso todo lo nuevo va «En pruebas». Cuando haya prueba en la torre, se puede quitar la etiqueta de lo que pase.
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
