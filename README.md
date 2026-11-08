# SOPA IA | Official Website

**Sitio web oficial de SOPA, una plataforma de inteligencia artificial local para Windows desarrollada por Ardu Solutions.**

[![Website](https://img.shields.io/badge/Website-Online-16A34A?style=flat-square)](https://ardu01.github.io/sopa-web/)
![HTML5](https://img.shields.io/badge/HTML5-Web-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Design-1572B6?style=flat-square&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Hosting-GitHub_Pages-222222?style=flat-square&logo=github)
![License](https://img.shields.io/badge/License-GPL--3.0-blue?style=flat-square)

---

## Descripción

**SOPA Web** es la página oficial de presentación y distribución de **SOPA IA**, una plataforma de inteligencia artificial diseñada para ejecutar modelos de lenguaje directamente en ordenadores personales.

Su objetivo es ofrecer un espacio público donde conocer las funcionalidades de SOPA, consultar su evolución, acceder a documentación y descargar las versiones disponibles de la aplicación.

SOPA apuesta por una inteligencia artificial local, privada y gratuita, sin necesidad de suscripciones ni servicios de inferencia en la nube para ejecutar los modelos descargados.

La web forma parte del ecosistema tecnológico de **Ardu Solutions**.

**Desarrollador:** Miguel Rodríguez Saiz  
**Organización:** Ardu Solutions  
**Categoría:** Desarrollo Web / Inteligencia Artificial / Presentación de Producto  
**Versión del producto presentada:** 2.2.0  
**Publicación:** GitHub Pages

## Acceder a la web

**[Visitar la web oficial de SOPA IA](https://ardu01.github.io/sopa-web/)**

## Características

- Presentación oficial de SOPA IA.
- Información sobre sus funcionalidades y capacidades.
- Descarga de la aplicación para Windows.
- Documentación y guías de utilización.
- Simulador interactivo de la interfaz.
- Capturas reales de la aplicación.
- Información sobre modelos de inteligencia artificial.
- Notas de versiones y evolución del producto.
- Diseño adaptable a diferentes dispositivos.
- Compatibilidad con modos claro y oscuro.
- Optimización de imágenes y recursos web.
- Información sobre privacidad y licencias.
- Web estática sin cookies ni rastreadores.

## Tecnologías

| Tecnología | Función |
|---|---|
| HTML5 | Estructura y contenido |
| CSS3 | Diseño visual e interfaz |
| JavaScript | Interactividad y simulador |
| Node.js | Herramientas auxiliares de desarrollo |
| WebP / AVIF | Optimización de imágenes |
| GitHub Pages | Alojamiento y publicación |
| Git | Control de versiones |

La web funciona como un sitio estático, sin necesidad de un backend propio para mostrar su contenido.

Las herramientas de desarrollo incluyen utilidades para validación, automatización y optimización de archivos.

## Estructura del proyecto

Entre los archivos y componentes principales del repositorio se encuentran:

| Archivo o directorio | Función |
|---|---|
| `index.html` | Página principal del producto |
| `simulador.html` | Simulador de la interfaz |
| `simulador.css` | Estilos del simulador |
| `guias.css` | Presentación de guías y documentación |
| `manifest.webmanifest` | Metadatos de la aplicación web |
| `package.json` | Herramientas de desarrollo |
| `package-lock.json` | Dependencias bloqueadas |
| `robots.txt` | Instrucciones para buscadores |
| `sitemap.xml` | Mapa del sitio |
| `LICENSE` | Licencia GNU GPLv3 |
| `NOTICE` | Autoría y avisos de terceros |

## Ejecución local

Clonar el repositorio:

```bash
git clone https://github.com/ardu01/sopa-web.git
cd sopa-web
```

Para consultar la página localmente, iniciar un servidor HTTP:

```bash
python3 -m http.server 8000
```

Acceder desde el navegador a:

`http://localhost:8000`

La web publicada no requiere instalar dependencias de Node.js para visualizarse.

### Herramientas de desarrollo

Para trabajar con las herramientas auxiliares del repositorio:

```bash
npm ci
```

El proyecto incluye comandos para empaquetar y minificar recursos:

```bash
npm run empaquetar
npm run minificar
```

Estos comandos están destinados al mantenimiento y preparación de los archivos del proyecto.

## Proyecto principal: SOPA IA

Esta web presenta **SOPA**, una plataforma de inteligencia artificial local orientada a ofrecer una experiencia accesible para ejecutar y utilizar modelos de lenguaje desde Windows.

Entre las capacidades documentadas de SOPA se encuentran:

- Ejecución local de modelos de inteligencia artificial.
- Conversaciones con modelos descargados.
- Gestión y selección de modelos.
- Integración de agentes especializados.
- Trabajo con archivos y documentos.
- Herramientas de programación.
- Automatizaciones y tareas de varios pasos.
- Personalización del comportamiento.
- Entrenamiento y adaptación de modelos.
- Integración con SOPA Mobile.
- Herramientas experimentales de diseño 3D.

Algunas funcionalidades de la versión 2.2.0 se encuentran identificadas como **experimentales o en pruebas**.

La disponibilidad y el comportamiento de cada función dependen de la versión instalada, el hardware y los componentes configurados.

### Inteligencia artificial local

SOPA permite ejecutar modelos compatibles directamente en el ordenador del usuario.

Una vez descargados, los modelos pueden utilizarse para conversar sin conexión a Internet.

Determinadas funciones, como la descarga de modelos, la búsqueda de actualizaciones o las consultas web opcionales, requieren conexión.

### Privacidad

SOPA está diseñada para mantener localmente las conversaciones y los datos de trabajo.

El funcionamiento del modelo local no requiere enviar las conversaciones a servidores externos para realizar inferencia.

Las funcionalidades que acceden a servicios de terceros se documentan por separado.

## Descargas

La página oficial incorpora la distribución de **SOPA 2.2.0 para Windows de 64 bits**, mediante instalador y paquete comprimido.

**[Acceder a las descargas oficiales](https://ardu01.github.io/sopa-web/)**

Se recomienda consultar los requisitos, las notas de versión y los valores SHA-256 publicados antes de instalar el programa.

Este repositorio corresponde a la web del producto y no debe confundirse con el repositorio del motor de inteligencia artificial.

## Autor

**Miguel Rodríguez Saiz**

Diseño y desarrollo del proyecto.

**Ardu Solutions** — Desarrollo de inteligencia artificial, software, sistemas y soluciones tecnológicas.

- **Web oficial:** https://ardu01.github.io/sopa-web/
- **Portfolio:** https://ardu01.github.io/proyectos/
- **Ardu Solutions:** https://ardusolutions.pages.dev/
- **GitHub:** https://github.com/ardu01
- **Repositorio:** https://github.com/ardu01/sopa-web

## Licencia

El código y los contenidos cubiertos por la licencia de este repositorio se distribuyen bajo **GNU General Public License v3.0 (GPL-3.0-only)**.

Se permite utilizar, estudiar, modificar y redistribuir el software respetando las condiciones de dicha licencia.

Las versiones derivadas que se distribuyan deberán cumplir las obligaciones correspondientes de GPLv3.

El nombre **SOPA** y su logotipo no se conceden bajo esta licencia.

Las dependencias y recursos de terceros conservan sus propias condiciones.

Para más información, consultar los archivos [LICENSE](LICENSE) y [NOTICE](NOTICE).

---

**© 2026 Miguel Rodríguez Saiz · Ardu Solutions**

*SOPA IA — Tu inteligencia artificial. Tu ordenador. Tus reglas.*
