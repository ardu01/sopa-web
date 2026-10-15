/* Port literal a JS de sopa_app/compatibilidad.py, hardware.py (driver) y sopa_motor/estimacion.py de Sopa v0.8.0.
   No añade fórmulas propias. Ver pruebas/ para la comparación con Python. */
(function (raiz, f) { if (typeof module === "object" && module.exports) module.exports = f(); else raiz.SopaCompat = f(); })(this, function () {
  "use strict";
  // Formato numérico idéntico a Python (redondeo sobre el valor binario exacto, empates a par).
  function pyRound(x, d) {
    var s = x.toFixed(d), p = Math.pow(10, d), y = x * p, fl = Math.floor(y);
    if (y - fl === 0.5 && Number.isFinite(y) && (y === x * p)) { var r = (fl % 2 === 0 ? fl : fl + 1) / p; return r; }
    return Number(s);
  }
  function pyFixed(x, d) { return pyRound(x, d).toFixed(d); }

  // hardware.py
  var DRIVER_MINIMO = 560.0;
  function version_driver(texto) {
    var partes = String(texto || "").trim().split(".");
    if (!/^[+-]?\d+$/.test(partes[0].trim())) return 0.0;
    var dec = partes.length > 1 ? partes[1] : "0";
    var v = Number(parseInt(partes[0], 10) + "." + dec);
    return Number.isFinite(v) && /^\d*$/.test(dec) ? v : 0.0;
  }
  function vram_gb(hw) { return hw.gpus.reduce(function (a, g) { return Math.max(a, g.vram_total_gb); }, 0.0); }
  function driver_insuficiente(hw) {
    if (!hw.gpus.length) return null;
    var v = version_driver(hw.gpus[0].driver);
    if (v >= DRIVER_MINIMO) return null;
    return "Tu driver NVIDIA (" + (hw.gpus[0].driver || "desconocido") + ") es demasiado antiguo para usar la GPU: hace falta la versión 560 o superior. Mientras tanto Sopa usará el procesador.";
  }
  function hardware_efectivo(hw) {
    if (!driver_insuficiente(hw)) return hw;
    return Object.assign({}, hw, { gpus: [], cuda: "" });
  }

  // compatibilidad.py
  var MARGEN_CHAT_GB = 0.6, PERSONALIZAR_GB_POR_B = 0.8, PERSONALIZAR_FIJO_GB = 1.6, MARGEN_MEDIDO = 1.1;
  var REFERENCIAS = { "GTX 1650 Max-Q 4 GB (driver 617.42)": 4.0 };
  function medidoDe(m) { return m.medido || {}; }
  function necesidad_chat_gb(m) {
    var medido = medidoDe(m).chat_vram_gb;
    if (medido) return pyRound(medido * MARGEN_MEDIDO, 2);
    return pyRound(m.gguf_gb + MARGEN_CHAT_GB, 2);
  }
  function necesidad_personalizar_gb(m) {
    var medido = medidoDe(m).personalizar_vram_gb;
    if (medido) return pyRound(medido * MARGEN_MEDIDO, 2);
    return pyRound(m.parametros_b * PERSONALIZAR_GB_POR_B + PERSONALIZAR_FIJO_GB, 2);
  }
  function capacidadDe(hw) {
    if (!hw.gpus.length) return 0.0;
    var c = String(hw.gpus[0].capacidad || "").trim();
    return /^[+-]?(\d+\.?\d*|\.\d+)$/.test(c) ? parseFloat(c) : 0.0;
  }
  function estado_verificacion(m, hw, chat, personalizar) {
    if (chat === "no" && personalizar === "no") return ["no_soportado", "Este modelo no funciona en tu equipo."];
    var medido = m.medido || {}, tiene = Object.keys(medido).length > 0;
    var ref = REFERENCIAS[medido.equipo || ""];
    var capacidad = capacidadDe(hw);
    if (tiene && ref && vram_gb(hw) >= ref && capacidad >= 7.5) {
      if (medido.alcance === "chat" && personalizar !== "no")
        return ["estimado", "El chat está probado en " + medido.equipo + "; personalizarlo aún es una estimación."];
      return ["verificado", "Probado de verdad en " + medido.equipo + ", igual o más modesta que la tuya."];
    }
    if (tiene && ref) return ["estimado", "Medido en " + medido.equipo + "; en tu equipo es una estimación."];
    return ["estimado", "Calculado a partir del tamaño del modelo; aún no lo hemos probado en un equipo real."];
  }
  function evaluar(m, hw0) {
    var aviso_driver = driver_insuficiente(hw0);
    var hw = hardware_efectivo(hw0);
    var vram = vram_gb(hw);
    var medido_pers = medidoDe(m).personalizar_vram_gb;
    var chat = necesidad_chat_gb(m), pers = necesidad_personalizar_gb(m);
    var disco = m.gguf_gb * 3 + 1;
    var modo_chat, texto_chat, modo_pers, texto_pers;
    if (vram >= chat) { modo_chat = "gpu"; texto_chat = "Funciona con fluidez en tu GPU."; }
    else if (hw.gpus.length && vram >= 2 && hw.ram_total_gb >= (chat - vram) + 4) { modo_chat = "mixto"; texto_chat = "Funciona repartido entre tu GPU y la memoria; algo más lento."; }
    else if (hw.ram_total_gb >= chat + 2) { modo_chat = "cpu"; texto_chat = "Funciona, pero en el procesador irá más lento."; }
    else { modo_chat = "no"; texto_chat = "No hay memoria suficiente."; }
    if (m.solo_catalogo) { modo_pers = "no"; texto_pers = "Solo en el catálogo: Sopa aún no lo descarga ni lo personaliza."; }
    else if (m.solo_chat) { modo_pers = "no"; texto_pers = "Este modelo se ofrece solo para chatear."; }
    else if (vram >= pers) { modo_pers = "si"; texto_pers = "Puedes personalizarlo en tu GPU."; }
    else if (medido_pers && vram >= medido_pers) { modo_pers = "justo"; texto_pers = "Va justo: cabe en tu GPU con poco margen. Cierra otras aplicaciones antes."; }
    else if (!medido_pers && vram >= pers * 0.75 && hw.ram_total_gb >= 12) { modo_pers = "justo"; texto_pers = "Va justo: se usará el modo de poca VRAM y tardará más."; }
    else {
      var motivo = !hw.gpus.length ? (aviso_driver ? "actualiza el driver NVIDIA (560 o superior)" : "no tienes GPU NVIDIA")
        : "necesita unos " + pyFixed(pers, 1) + " GB de VRAM y tienes " + pyFixed(vram, 1) + " GB";
      modo_pers = "no"; texto_pers = "No se puede personalizar: " + motivo + ".";
    }
    var v = estado_verificacion(m, hw, modo_chat, modo_pers);
    return Object.assign({}, m, { necesita_chat_gb: chat, necesita_personalizar_gb: pers, chat: modo_chat, chat_texto: texto_chat,
      personalizar: modo_pers, personalizar_texto: texto_pers, disco_suficiente: hw.disco_libre_gb >= disco,
      verificacion: v[0], verificacion_texto: v[1] });
  }
  function catalogo_para(catalogo, hw, solo_compatibles) {
    var orden = { si: 0, justo: 1, no: 2 };
    var res = catalogo.map(function (m) { return evaluar(m, hw); });
    if (solo_compatibles) res = res.filter(function (r) { return r.chat !== "no"; });
    return res.map(function (r, i) { return [r, i]; }).sort(function (a, b) {
      var x = a[0], y = b[0];
      return (orden[x.personalizar] - orden[y.personalizar]) || ((x.chat === "no") - (y.chat === "no")) ||
        (y.parametros_b - x.parametros_b) || (a[1] - b[1]);
    }).map(function (p) { return p[0]; });
  }

  // estimacion.py
  var MEDIDOS = { "0.5": 6.6, "1.5": 9.6, "3": 17.1 }, BASE_S = 4.0, POR_B_S = 4.26, REF_LONGITUD = 512, REF_ACUMULACION = 8, FACTOR_DPO = 2.5, FACTOR_CPU = 12.0;
  function medidoPorTam(b) { var k = String(pyRound(b, 1)); return Object.prototype.hasOwnProperty.call(MEDIDOS, k) ? MEDIDOS[k] : null; }
  function segundos_por_paso(parametros_b, longitud, acumulacion, tarea, dispositivo, medido) {
    longitud = longitud == null ? 512 : longitud; acumulacion = acumulacion == null ? 8 : acumulacion; tarea = tarea || "sft"; dispositivo = dispositivo || "cuda";
    var t = medidoPorTam(parametros_b);
    var s = medido ? medido : (t !== null ? t : BASE_S + POR_B_S * parametros_b);
    s *= (longitud / REF_LONGITUD) * (acumulacion / REF_ACUMULACION);
    if (tarea === "dpo") s *= FACTOR_DPO;
    if (dispositivo === "cpu") s *= FACTOR_CPU;
    return s;
  }
  function pasos_totales(ejemplos, epocas, tam_lote, acumulacion, pasos_max) {
    tam_lote = tam_lote == null ? 1 : tam_lote; acumulacion = acumulacion == null ? 8 : acumulacion; pasos_max = pasos_max || 0;
    var pasos = Math.ceil(Math.max(1, Math.ceil(Math.ceil(ejemplos / tam_lote) / acumulacion)) * epocas);
    return pasos_max > 0 ? Math.min(pasos, pasos_max) : pasos;
  }
  function estimar(parametros_b, ejemplos, epocas, longitud, tam_lote, acumulacion, tarea, dispositivo, medido, pasos_max) {
    longitud = longitud == null ? 512 : longitud; tam_lote = tam_lote == null ? 1 : tam_lote; acumulacion = acumulacion == null ? 8 : acumulacion;
    tarea = tarea || "sft"; dispositivo = dispositivo || "cuda";
    var pasos = pasos_totales(ejemplos, epocas, tam_lote, acumulacion, pasos_max);
    // Cada paso procesa tam_lote × acumulación ejemplos: el tiempo escala con ese producto.
    var s = segundos_por_paso(parametros_b, longitud, acumulacion * tam_lote, tarea, dispositivo, medido);
    return { pasos: pasos, segundos_por_paso: pyRound(s, 1), segundos: pyRound(pasos * s, 0), fiabilidad: fiabilidad(parametros_b, dispositivo, medido) };
  }
  function texto_duracion(segundos) {
    var m = Math.max(1, pyRound(segundos / 60, 0));
    if (m < 60) return "unos " + m + " min";
    var h = Math.floor(m / 60); m = m % 60;
    return m ? "unas " + h + " h " + (m < 10 ? "0" : "") + m + " min" : "unas " + h + " h";
  }
  function fiabilidad(parametros_b, dispositivo, medido) {
    return ((dispositivo || "cuda") === "cuda" && (medido != null || medidoPorTam(parametros_b) !== null)) ? "medido" : "aproximado";
  }

  return { DRIVER_MINIMO: DRIVER_MINIMO, MARGEN_CHAT_GB: MARGEN_CHAT_GB, PERSONALIZAR_GB_POR_B: PERSONALIZAR_GB_POR_B, PERSONALIZAR_FIJO_GB: PERSONALIZAR_FIJO_GB,
    MARGEN_MEDIDO: MARGEN_MEDIDO, REFERENCIAS: REFERENCIAS, version_driver: version_driver, driver_insuficiente: driver_insuficiente,
    hardware_efectivo: hardware_efectivo, vram_gb: vram_gb, necesidad_chat_gb: necesidad_chat_gb, necesidad_personalizar_gb: necesidad_personalizar_gb,
    estado_verificacion: estado_verificacion, evaluar: evaluar, catalogo_para: catalogo_para, segundos_por_paso: segundos_por_paso,
    fiabilidad: fiabilidad, pasos_totales: pasos_totales, estimar: estimar, texto_duracion: texto_duracion, pyRound: pyRound, pyFixed: pyFixed };
});
