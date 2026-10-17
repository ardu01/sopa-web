# Traspaso

Fecha: 17 de octubre de 2026.

El turno de este grupo es del 17 al 21 de octubre de 2026. Otro grupo comparte este repositorio.

## Qué se ha hecho en este PR

- Se han quitado de la web los planes de pago Plus y Pro: tarjetas de precios, menú «Planes» y menciones del tipo «incluido en Plus y Pro». El asistente, organizar, los varios pasos y las automatizaciones quedan como disponibles para todos. No se han inventado funciones ni precios.
- También se ha quitado la compra única y lo del archivo de licencia (activación o clave de licencia de pago). La pregunta «¿Es gratis?» dice que Sopa es software libre y gratuito, sin planes, sin pagos y sin clave de licencia.
- `LICENSE` es el texto oficial e íntegro de la GNU GPLv3, sin cambios y sin el aviso de copyright delante. El copyright (Miguel Rodríguez Saiz, 2026) está en `NOTICE`, en el README y en el pie. Se ha quitado el correo personal que había en `LICENSE`.
- El pie ya no dice «Todos los derechos reservados». Dice que Sopa es software libre (GNU GPLv3), enlaza el texto oficial y el `LICENSE`, y mantiene que el nombre y el logotipo de Sopa no se licencian.
- Se han matizado las frases del tipo «100 % local… Siempre» y «sin internet» como promesa absoluta. La web dice que la IA funciona en el equipo y que las conversaciones, los documentos y los recuerdos se quedan ahí; y que Sopa se conecta para buscar actualizaciones y descargar modelos y, si se activa, para la búsqueda web. El chat, con el modelo ya descargado, sigue sin conexión.
- El menú apunta a `#licencia`. El ancla antiguo `#planes` se conserva vacío para no romper enlaces ya publicados. No había ancla `#precios`.
- Hay un CI propio: `.github/workflows/html-y-enlaces.yml` (check «HTML válido y enlaces internos»). En cada pull request, y también al hacer push a `main`, valida el HTML con html-validate (preajuste de la especificación) y revisa en local los `href` y `src` relativos y sus anclas. No usa secretos ni servicios de pago. No entra en `descargas/` ni trata como HTML los archivos de verificación de Search Console. El workflow instala npm 11.21.1 para lanzar el validador: el npm 10.9.9 que trae Node 22.23 falla al instalarlo. GitHub Pages sigue publicando `main` con `pages-build-deployment`, aparte de este check.

## Pendiente de decisión del dueño

- Política de privacidad y aviso legal. No se han creado ni enlazado, como se pidió en este PR.
- Descargas de la 1.9.4 (`descargas/` y los enlaces de la portada). No se han tocado. Siguen publicadas tal cual. Falta decidir si se retiran o se mantienen con la licencia con la que salieron. Este PR no añade oferta de código fuente ni cambia los SHA-256.

## PRs abiertos

- Este: https://github.com/ardu01/sopa-web/pull/1 contra `main`, sin fusionar.
- Al abrirlo no había otros PRs abiertos en el repositorio.

## Bloqueos

- Falta una prueba real en el portátil MSI del dueño antes de publicar.
- La fusión solo con el OK del Supervisor.
- No se ha fusionado este PR.

## Notas

- La base es `main` actual, incluidos los commits de hoy `2dddde4` y `bece093`, dados por buenos.
- No se ha gastado dinero ni se han creado secretos. No se han publicado datos personales nuevos.
- El check de este PR es «HTML válido y enlaces internos», del workflow «HTML y enlaces».
- El formulario de fallos sigue usando el destino que ya tenía, para que pueda enviar. No se ha cambiado y no se copia aquí.
