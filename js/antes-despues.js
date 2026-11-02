/* Antes y después del lavado de cara: el control mueve el corte entre las dos imágenes. Sin dependencias. */
(function () {
  document.querySelectorAll('.ad').forEach(function (fig) {
    var marco = fig.querySelector('.ad-marco'), rango = fig.querySelector('.ad-rango');
    if (!marco || !rango) return;
    function poner() {
      var v = Number(rango.value);
      marco.style.setProperty('--pos', v + '%');
      rango.setAttribute('aria-valuetext', v <= 2 ? 'Solo la maqueta' : v >= 98 ? 'Solo la versión de ahora' : v === 50 ? 'Mitad y mitad' : 'Ahora, ' + v + ' %; maqueta, ' + (100 - v) + ' %');
    }
    rango.addEventListener('input', poner);
    var arrastrando = false;
    function desde(e) {
      var r = marco.getBoundingClientRect();
      rango.value = Math.round(Math.min(100, Math.max(0, (e.clientX - r.left) / r.width * 100)));
      poner();
    }
    marco.addEventListener('pointerdown', function (e) { arrastrando = true; marco.setPointerCapture(e.pointerId); desde(e); });
    marco.addEventListener('pointermove', function (e) { if (arrastrando) desde(e); });
    marco.addEventListener('pointerup', function () { arrastrando = false; });
    marco.addEventListener('pointercancel', function () { arrastrando = false; });
    poner();
  });
})();
