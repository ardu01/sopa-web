# Traspaso

Fecha: 19 de octubre de 2026.

El turno de este grupo fue del 17 al 21 de octubre de 2026. Otro grupo comparte el repositorio. `main` publicado, antes de este cierre, es `b0ff1f6` (PR #18, fusionado). Este archivo es el cierre de turno: solo se actualiza este documento. https://github.com/ardu01/sopa-web/pull/20 contra `main`, rama `cursor/cierre-turno-c470`. No está fusionado.

## Hecho (fusionado y publicado)

La descarga pública sigue siendo la beta 1.9.4. Lo posterior lleva «En la próxima versión pública». No hay precios, planes ni datos personales. No hay enlaces a repositorios privados.

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
- https://github.com/ardu01/sopa-web/pull/17 contra `main`, fusionado (commit `34c8855`). Ayuda de Sopa Deck. Toda la página lleva «En la próxima versión pública». Se mantiene «Todavía no se ha probado en un ordenador de verdad.» Sin enlace de descarga. La CI estaba en verde.
- https://github.com/ardu01/sopa-web/pull/18 contra `main`, fusionado (commit `b0ff1f6`). Rendimiento en móvil con Lighthouse: menos CSS en el simulador y en la ayuda, imágenes al ancho de la pantalla y JS minificado. La CI estaba en verde.

## En borrador

- https://github.com/ardu01/sopa-web/pull/11 contra `main`, borrador, rama `cursor/descarga-siguiente-c470`. Ficha de descarga de la 1.13.x, apagada. Para activarla se edita `datos/descarga.js` (`version`, `urlInstalador`, `sha256`, `nombreArchivo`, `urlCodigoFuente` y `activa: true`) solo cuando el dueño haga públicas las releases. Hasta entonces no se fusiona y no se ofrecen esas descargas.
- https://github.com/ardu01/sopa-web/pull/19 contra `main`, borrador, rama `cursor/novedades-c470`. Página Novedades. No está enlazada en el menú ni en el sitemap. No se fusiona y no se saca de borrador en este cierre.

## En este turno

Cierre de turno por orden del dueño. Solo se actualiza este archivo. No se toca el código, ni `descargas/`, ni `datos/descarga.js`. No se tocan los PR #11 ni #19.

## Pendiente

Para el próximo turno: ni Sopa Desktop 1.16.1 ni Sopa Deck 0.5.1 han pasado todavía la prueba en la torre. Cuando el Supervisor pase sus notas reales, rellenar https://github.com/ardu01/sopa-web/pull/19. La página dice 0.5.0: corregir a la versión que indique el Supervisor. Entonces enlazarla en el menú y en el pie, y añadirla al sitemap. Hasta ese momento #19 sigue en borrador y sin enlazar. #11 sigue en borrador. No se publica ninguna descarga de Sopa Deck.

## Bloqueado, a decisión del dueño

- Enlaces a releases privadas de Sopa-IA (Sopa Desktop 1.12.1, Sopa Deck v0.4.0 y motor-ligero v0.1.0-exe.1). Los repos Sopa-IA/sopa-motor, Sopa-IA/sopa-deck y Sopa-IA/motor-ligero no son públicos. Esta integración recibe 404 si los consulta.
- Sustituir las descargas de la 1.9.4 por las de la 1.12.1 o posteriores. No tocar `descargas/`. Siguen publicadas tal cual, con sus SHA-256. No se añade oferta de código fuente.
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
- El simulador no calcula velocidades. Las respuestas son de ejemplo y no copian el texto preparado de las pruebas de Windows. El pie de esa ventana dice «Versión 1.16.0 beta». Las automatizaciones están en Ajustes, no en la barra.
- El centro de ayuda está en `ayuda/`. Hay página de Comparar, Preparar ejemplos está dentro de Entrenamiento, «¿Está usando mi gráfica?» explica el Administrador de tareas, y Sopa Deck explica instalar, vincular el iPad y los avisos de Windows. La instalación que se puede hacer hoy es la beta 1.9.4, a mano: el actualizador no ofrece la 1.12.1 ni ninguna posterior. Sopa Deck no tiene descarga en esta web.
