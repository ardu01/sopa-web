(()=>{const d=document.documentElement;d.classList.add('js');
const red=matchMedia('(prefers-reduced-motion: reduce)').matches;
const els=document.querySelectorAll('.r');
const cuenta=el=>{const n=+el.dataset.n,t0=performance.now();const f=t=>{const p=Math.min((t-t0)/1200,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
if(!('IntersectionObserver' in window)||red){els.forEach(e=>e.classList.add('v'));return}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;
const sib=[...el.parentElement.children].filter(c=>c.classList.contains('r'));el.style.transitionDelay=Math.min(sib.indexOf(el),5)*80+'ms';
el.classList.add('v');el.querySelectorAll('.cuenta').forEach(cuenta);io.unobserve(el)}),{threshold:.15,rootMargin:'0px 0px -40px 0px'});
els.forEach(e=>io.observe(e))})();
