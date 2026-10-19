/* Simulación de la interfaz. No instala, no descarga y no calcula velocidades. */
(function () {
  "use strict";
  var marco = document.getElementById("marco");
  var toastT;
  var VISTAS = ["inicio", "chat", "agentes", "documentos", "memoria", "modelos", "entrenamiento", "comparar", "ajustes", "registro"];
  var escritura = 0;
  var baseEjemplo = false;
  var cmpGen = 0;

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function toast(texto) {
    var t = $("toast");
    t.hidden = false;
    t.textContent = texto;
    clearTimeout(toastT);
    toastT = setTimeout(function () { t.hidden = true; }, 5000);
  }
  function ir(id) {
    if (VISTAS.indexOf(id) < 0) id = "inicio";
    VISTAS.forEach(function (v) { $("v-" + v).hidden = v !== id; });
    marco.querySelectorAll("[data-vista]").forEach(function (b) {
      if (b.getAttribute("data-vista") === id) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
  }
  function dialogar(titulo, texto, acciones) {
    $("dlg-t").textContent = titulo;
    $("dlg-p").textContent = texto;
    var act = $("dlg-act");
    act.replaceChildren();
    acciones.forEach(function (a) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = a.primario ? "btn-p" : "btn";
      b.textContent = a.nombre;
      b.addEventListener("click", function () {
        $("dlg").close();
        if (a.fn) a.fn();
      });
      act.appendChild(b);
    });
    $("dlg").showModal();
  }

  marco.querySelectorAll("[data-vista]").forEach(function (b) {
    b.addEventListener("click", function () { ir(b.getAttribute("data-vista")); });
  });
  window.addEventListener("hashchange", function () { ir(location.hash.slice(1)); });

  function temaElegido() {
    var v = $("tema").value;
    if (v === "sistema") {
      marco.dataset.tema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "oscuro" : "claro";
    } else marco.dataset.tema = v;
  }
  $("tema").addEventListener("change", temaElegido);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if ($("tema").value === "sistema") temaElegido();
  });

  function webEncendida() { return $("web").getAttribute("aria-pressed") === "true"; }
  function pintarWeb(on) {
    $("web").setAttribute("aria-pressed", on ? "true" : "false");
    $("web").classList.toggle("web-on", on);
    $("web").title = on ? "Buscar en la web está encendido" : "Buscar en la web está apagado";
    $("web-extra").textContent = on ? " · encendida" : "";
    $("web-ajustes").checked = on;
    $("pie-estado").textContent = on ? "Buscar en la web está encendido" : "Todo ocurre en este equipo";
    var vacio = $("vacio-txt");
    if (vacio) vacio.textContent = on
      ? "Web está encendido: si lo pides, busco en la web y leo una página."
      : "Escribe y Sopa cargará el modelo adecuado. Nada sale de tu ordenador.";
  }
  $("web").addEventListener("click", function () { pintarWeb(!webEncendida()); });
  $("web-ajustes").addEventListener("change", function () { pintarWeb($("web-ajustes").checked); });

  function agenteNombre() {
    var s = $("agente");
    return s.options[s.selectedIndex].textContent;
  }
  function pintarAgente() {
    var nombre = agenteNombre();
    var linea = $("agente-linea");
    linea.textContent = "Agente activo: " + nombre;
    linea.classList.toggle("esp", nombre !== "Chat");
    $("invest-nota").hidden = nombre !== "Investigación" || webEncendida();
  }
  $("agente").addEventListener("change", pintarAgente);

  $("creatividad").addEventListener("input", function () {
    $("o-crea").textContent = String($("creatividad").value).replace(".", ",");
  });

  document.querySelectorAll(".ideas button").forEach(function (b) {
    b.addEventListener("click", function () { $("mensaje").value = b.textContent; $("mensaje").focus(); });
  });

  function escribir(destino, texto, alFinal) {
    escritura += 1;
    var marca = escritura;
    var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducido) {
      destino.textContent = texto;
      if (alFinal) alFinal();
      return;
    }
    var i = 0;
    var cursor = document.createElement("span");
    cursor.className = "cursor-verde";
    cursor.setAttribute("aria-hidden", "true");
    destino.replaceChildren(cursor);
    var id = setInterval(function () {
      if (marca !== escritura) { clearInterval(id); return; }
      i += 1;
      destino.replaceChildren(document.createTextNode(texto.slice(0, i)), cursor);
      if (i >= texto.length) {
        clearInterval(id);
        cursor.remove();
        if (alFinal) alFinal();
      }
    }, 16);
  }
  function bloque(texto) {
    var p = document.createElement("p");
    p.className = "bloque";
    p.textContent = texto;
    return p;
  }
  $("enviar").addEventListener("click", function () {
    var texto = $("mensaje").value.trim();
    if (!texto) return;
    $("vacio").hidden = true;
    var lista = $("mensajes");
    var yo = document.createElement("div");
    yo.className = "burbuja usuario";
    yo.innerHTML = '<p class="quien">Tú</p><p></p>';
    yo.lastChild.textContent = texto;
    var ia = document.createElement("div");
    ia.className = "burbuja";
    var quien = document.createElement("p");
    quien.className = "quien";
    quien.textContent = "Ejemplo · Sopa";
    ia.appendChild(quien);
    if ($("pensar").checked) {
      ia.appendChild(bloque("Ejemplo de razonamiento, aparte de la respuesta. No se escribe dentro del texto."));
    }
    if ($("agente").value !== "chat") {
      ia.appendChild(bloque("Ejemplo de bloque de herramienta, aparte de la respuesta."));
    }
    if ($("agente").value === "investigacion" && !webEncendida()) {
      ia.appendChild(bloque("Buscar en la web está apagado. Uso solo los documentos de este equipo."));
    }
    if (webEncendida()) {
      ia.appendChild(bloque("He buscado «" + texto.slice(0, 80) + "» en la web."));
    }
    var resp = document.createElement("p");
    ia.appendChild(resp);
    lista.append(yo, ia);
    escribir(resp, "Ejemplo de respuesta. En tu ordenador la escribe el modelo. Esta página no calcula ninguna velocidad.");
    $("mensaje").value = "";
    var item = document.createElement("li");
    var abrir = document.createElement("button");
    abrir.type = "button";
    abrir.className = "abrir";
    abrir.textContent = "Ejemplo";
    abrir.addEventListener("click", function () {
      toast("Ejemplo de conversación. No se carga ningún modelo.");
    });
    var guardar = document.createElement("button");
    guardar.type = "button";
    guardar.className = "btn";
    guardar.textContent = "Guardar como texto: Ejemplo";
    guardar.addEventListener("click", function () {
      toast("Ejemplo: no se guarda ningún archivo.");
    });
    var borrar = document.createElement("button");
    borrar.type = "button";
    borrar.className = "btn-peligro";
    borrar.textContent = "Borrar conversación: Ejemplo";
    borrar.addEventListener("click", function () {
      item.remove();
      if (!$("historial-lista").children.length) $("historial-vacio").hidden = false;
      toast("Ejemplo: la conversación no se borra de ningún equipo.");
    });
    item.append(abrir, guardar, borrar);
    $("historial-lista").appendChild(item);
    $("historial-vacio").hidden = true;
  });
  $("mensaje").addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("enviar").click(); }
  });
  $("cargar").addEventListener("click", function () {
    toast("Ejemplo: aquí no se carga ningún modelo.");
  });
  $("nueva").addEventListener("click", function () {
    $("mensajes").replaceChildren();
    $("vacio").hidden = false;
    $("mensaje").value = "";
  });

  $("memoria-add").addEventListener("click", function () {
    var texto = $("memoria-txt").value.trim();
    if (!texto) return;
    var li = document.createElement("li");
    li.className = "tarjeta";
    li.innerHTML = "<p></p><p class=\"fila\"><button type=\"button\" class=\"btn\">Cambiar</button><button type=\"button\" class=\"btn-peligro\">Borrar</button></p>";
    li.firstChild.textContent = texto;
    li.querySelector(".btn-peligro").addEventListener("click", function () {
      li.remove();
      var n = $("memoria-lista").children.length;
      $("memoria-vacio").hidden = n > 0;
      $("memoria-n").textContent = n ? (n === 1 ? "1 recuerdo" : n + " recuerdos") : "";
      toast("Borrado.");
    });
    $("memoria-lista").appendChild(li);
    $("memoria-txt").value = "";
    $("memoria-vacio").hidden = true;
    var n = $("memoria-lista").children.length;
    $("memoria-n").textContent = n === 1 ? "1 recuerdo" : n + " recuerdos";
    toast("Guardado.");
  });
  $("memoria-usar").addEventListener("change", function () {
    $("memoria-off").hidden = $("memoria-usar").checked;
  });

  $("add-carpeta").addEventListener("click", function () {
    if ($("carpetas").children.length) return;
    var li = document.createElement("li");
    li.className = "tarjeta";
    li.innerHTML = '<p><b>Apuntes</b></p><p class="ayuda">Ejemplo de carpeta. La app muestra aquí la ruta; esta simulación no pone ninguna.</p>' +
      '<label class="casilla"><input type="checkbox" checked> <span>Leer</span></label>' +
      '<label class="casilla"><input type="checkbox" checked> <span>Buscar</span></label>' +
      '<label class="casilla"><input type="checkbox" checked> <span>Resumir</span></label>' +
      '<label class="casilla"><input type="checkbox" checked> <span>Cambiar archivos</span></label>' +
      '<label class="casilla"><input type="checkbox"> <span>Permitir desde el móvil</span></label>' +
      '<button type="button" class="btn-peligro">Quitar</button>';
    li.querySelector(".btn-peligro").addEventListener("click", function () {
      li.remove();
      $("carpeta-vacio").hidden = false;
      toast("Carpeta quitada. Sopa ya no propondrá acciones ahí.");
    });
    $("carpetas").appendChild(li);
    $("carpeta-vacio").hidden = true;
    toast("Carpeta añadida. Sopa puede proponer acciones aquí, siempre con tu confirmación.");
  });

  function revisarAuto() {
    $("auto-guardar").disabled = !$("auto-ok").checked || !$("auto-nombre").value.trim();
  }
  $("auto-ok").addEventListener("change", revisarAuto);
  $("auto-nombre").addEventListener("input", revisarAuto);
  $("auto-hace").addEventListener("change", function () {
    $("auto-archivo").hidden = $("auto-hace").value !== "leer";
    $("auto-modo").hidden = $("auto-hace").value !== "organizar";
  });
  $("auto-cuando").addEventListener("change", function () {
    var v = $("auto-cuando").value;
    $("auto-hora").hidden = v !== "dia" && v !== "semana";
    $("auto-dia").hidden = v !== "semana";
    $("auto-momento").hidden = v !== "una";
  });
  $("auto-guardar").addEventListener("click", function () {
    var li = document.createElement("li");
    li.textContent = $("auto-nombre").value.trim();
    $("auto-lista").appendChild(li);
    $("auto-vacio").hidden = true;
    $("auto-nombre").value = "";
    $("auto-ok").checked = false;
    revisarAuto();
    toast("Guardada.");
  });

  $("buscar-docs").addEventListener("click", function () {
    $("docs-res").hidden = false;
    $("docs-res").textContent = "No he encontrado nada parecido.";
  });
  $("instalar-motor").addEventListener("click", function () {
    $("motor-txt").textContent = "El motor de entrenamiento está instalado.";
    $("instalar-motor").hidden = true;
    toast("Ejemplo: aquí no se instala nada. El registro sigue vacío.");
    ir("registro");
  });
  var verModelos = $("ver-modelos");
  if (verModelos) verModelos.addEventListener("click", function () { ir("modelos"); });
  $("empezar-chat").addEventListener("click", function () { ir("chat"); });

  document.querySelectorAll("[data-descarga]").forEach(function (b) {
    b.addEventListener("click", function () {
      dialogar(b.getAttribute("data-nombre"), b.getAttribute("data-nota"), [
        { nombre: "Descargar", primario: true, fn: function () { toast("Esta simulación no descarga el modelo."); } },
        { nombre: "Cancelar" }
      ]);
    });
  });
  $("importar").addEventListener("click", function () { toast("Esta simulación no importa archivos."); });
  $("ver-licencia").addEventListener("click", function () { $("panel-licencia").hidden = !$("panel-licencia").hidden; });
  $("avisos-terceros").addEventListener("click", function () { $("panel-avisos").hidden = !$("panel-avisos").hidden; });
  $("acceso-movil").addEventListener("change", function () { $("panel-movil").hidden = !$("acceso-movil").checked; });
  $("fuera-casa").addEventListener("change", function () { $("panel-tunel").hidden = !$("fuera-casa").checked; });
  $("comprobar").addEventListener("click", function () { toast("Ejemplo: no se le pregunta al router y no se muestra ninguna IP."); });
  $("ipify").addEventListener("click", function () { toast("Ejemplo: no se pregunta en internet y no se muestra ninguna IP."); });
  $("informar").addEventListener("click", function () { location.href = "fallos/"; });
  $("guardar-agente").addEventListener("click", function () { toast("Agente guardado."); });
  $("limpiar-agente").addEventListener("click", function () { toast("Ejemplo: el formulario no se envía a ningún sitio."); });
  $("entrenar").addEventListener("click", function () { toast("Ejemplo: no se entrena nada y no se muestra cuánto tardaría."); });
  $("detener").addEventListener("click", function () { toast("Ejemplo: no hay un entrenamiento en curso."); });
  $("lanzar").addEventListener("click", function () { toast("Elige un agente y escribe la tarea."); });

  var AVISO_SIN_MODELO = "Todavía no tienes un modelo personalizado. Entrénalo en Entrenamiento y vuelve aquí.";
  var AVISO_SIN_BASE = "Falta el modelo base «Qwen3.5 0.8B». Descárgalo en Modelos y vuelve a comparar.";
  var AVISO_LISTO = "Misma pregunta, dos respuestas. El personalizado queda cargado en el chat.";
  function iconoAviso(tipo) {
    if (tipo === "ok") {
      return '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M8 12.5l2.5 2.5L16 9.5" fill="none" stroke="currentColor" stroke-width="1.75"/></svg>';
    }
    if (tipo === "warn") {
      return '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 4l8 14H4z" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M12 10v4" stroke="currentColor" stroke-width="1.75"/><circle cx="12" cy="16.5" r="0.8" fill="currentColor"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M12 11v5" stroke="currentColor" stroke-width="1.75"/><circle cx="12" cy="8" r="0.8" fill="currentColor"/></svg>';
  }
  function pintarComparar() {
    escritura += 1;
    cmpGen += 1;
    var nombre = $("cmp-modelo").value;
    var aviso = $("cmp-aviso");
    $("cmp-base").textContent = "";
    $("cmp-per").textContent = "";
    if (!nombre) {
      aviso.hidden = false;
      aviso.className = "aviso-app info";
      aviso.innerHTML = iconoAviso("info") + "<span></span>";
      aviso.lastChild.textContent = AVISO_SIN_MODELO;
      $("cmp-base-t").textContent = "Base";
      $("cmp-per-t").textContent = "Personalizado";
      $("cmp-btn").disabled = true;
      return;
    }
    $("cmp-base-t").textContent = "Base · Qwen3.5 0.8B";
    $("cmp-per-t").textContent = "Personalizado · " + nombre;
    if (!baseEjemplo) {
      aviso.hidden = false;
      aviso.className = "aviso-app warn";
      aviso.innerHTML = iconoAviso("warn") + "<span></span>";
      aviso.lastChild.textContent = AVISO_SIN_BASE;
      $("cmp-btn").disabled = true;
      return;
    }
    aviso.hidden = true;
    aviso.className = "aviso-app";
    aviso.textContent = "";
    $("cmp-btn").disabled = false;
  }
  $("cmp-modelo").addEventListener("change", pintarComparar);
  $("cmp-ejemplo").addEventListener("click", function () {
    baseEjemplo = true;
    if (!$("cmp-modelo").value) $("cmp-modelo").value = "mi-asistente";
    pintarComparar();
    toast("Ejemplo: no se descarga ningún modelo.");
  });
  $("cmp-btn").addEventListener("click", function () {
    var pregunta = $("cmp-pregunta").value.trim();
    if (!$("cmp-modelo").value || !baseEjemplo) return;
    if (!pregunta) return;
    var aviso = $("cmp-aviso");
    var gen = cmpGen;
    aviso.hidden = true;
    $("cmp-btn").disabled = true;
    escribir($("cmp-base"), "Ejemplo de respuesta del modelo base. Esta página no llama a ningún modelo.", function () {
      if (gen !== cmpGen) return;
      escribir($("cmp-per"), "Ejemplo de respuesta del modelo personalizado. Esta página no llama a ningún modelo.", function () {
        if (gen !== cmpGen) return;
        aviso.hidden = false;
        aviso.className = "aviso-app ok";
        aviso.innerHTML = iconoAviso("ok") + "<span></span>";
        aviso.lastChild.textContent = AVISO_LISTO;
        $("cmp-btn").disabled = false;
      });
    });
  });

  function contarTextos(texto) {
    return texto.split(/\n\s*\n/).map(function (t) { return t.trim(); }).filter(Boolean).length;
  }
  function esDocumento(nombre) {
    return /\.(txt|md|html|pdf|docx)$/i.test(nombre);
  }
  $("origen").addEventListener("change", function () {
    var archivo = $("origen").files && $("origen").files[0];
    $("origen-nombre").textContent = archivo ? archivo.name : "";
    $("crear-ejemplos").disabled = !archivo;
    $("preparar-res").hidden = true;
  });
  $("crear-ejemplos").addEventListener("click", function () {
    var archivo = $("origen").files && $("origen").files[0];
    if (!archivo) return;
    var salida = $("preparar-res");
    var paso = $("paso2-res");
    function mostrar(texto, rellenar) {
      salida.hidden = false;
      salida.textContent = texto;
      if (rellenar) {
        $("paso2-nombre").textContent = archivo.name;
        paso.hidden = false;
        paso.textContent = texto;
      } else {
        paso.hidden = true;
        paso.textContent = "";
      }
    }
    if (/\.xlsm$/i.test(archivo.name)) {
      mostrar("Un archivo con macros no se lee.", false);
      return;
    }
    if (!esDocumento(archivo.name) || !/\.(txt|md|html)$/i.test(archivo.name)) {
      mostrar("Ejemplo: esta simulación no abre ese archivo y no llama al modelo.", false);
      return;
    }
    var lector = new FileReader();
    lector.onload = function () {
      var n = contarTextos(String(lector.result || ""));
      if (!n) {
        mostrar("No hay texto suficiente para un ejemplo.", false);
        return;
      }
      var frase = n + " ejemplos, formato «texto». Ya están elegidos en el paso 2.";
      if (n === 1) frase = "1 ejemplo, formato «texto». Ya están elegidos en el paso 2.";
      if (n < 50) frase += " Con menos de 50 ejemplos el resultado suele notarse poco.";
      mostrar(frase, true);
    };
    lector.readAsText(archivo);
  });

  temaElegido();
  pintarWeb(false);
  pintarAgente();
  revisarAuto();
  pintarComparar();
  ir(location.hash.slice(1) || "inicio");
})();
