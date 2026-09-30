if (typeof document !== 'undefined') {
/* PrimeForm3D — vitrine v2
   JS mínimo: menu mobile + scroll-spy do header + ano no footer.
   Sem dependências; roda em qualquer navegador moderno. */

(function () {
  "use strict";

  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  var backdrop = document.getElementById("nav-backdrop");
  var menuLinks = nav ? nav.querySelectorAll("a") : [];

  function setMenu(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    }
    if (backdrop) backdrop.hidden = !open;
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("nav-open"));
    });
    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    if (backdrop) {
      backdrop.addEventListener("click", function () { setMenu(false); });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ── Scroll-spy: realça o link da seção visível ── */
  var spyTargets = Array.prototype.slice.call(document.querySelectorAll("main > section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  function spy() {
    var probe = window.scrollY + 140;
    var currentId = null;
    for (var i = 0; i < spyTargets.length; i++) {
      if (spyTargets[i].offsetTop <= probe) currentId = spyTargets[i].id;
    }
    navLinks.forEach(function (link) {
      var active = link.getAttribute("href") === "#" + currentId;
      link.classList.toggle("is-active", active);
    });
  }

  if (spyTargets.length && navLinks.length) {
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  /* ── Ano no rodapé ── */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

}

const CONFIG = {whatsapp:'556199318306', instagram:'https://instagram.com/primeform.3d', api:'assets/data/catalogo.json'};
const CATEGORIES = ['Action figure','Anime','Personalizados','Chaveiros','Decorativos','Outros'];
const key = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
function category(s) {const label = typeof s === 'string' ? s.trim() : ''; return CATEGORIES.find(c=>key(c)===key(label)) || label || 'Outros';}
function selectProducts(items, selected) {return selected ? items.filter(p=>key(category(p.category))===key(selected)) : items;}
function safeImage(value, origin) {try {if (typeof value!=='string'||!value) return null;const u=new URL(value,origin);if(u.origin!==origin) return null;return /(^|\/)uploads\/[^/]+$/.test(u.pathname)?u.href:null;} catch(_){return null;}}
function priceLabel(p) {const v=p.sale_print_value;return v!==null && v!==undefined && String(v).trim()!=='' && Number.isFinite(Number(v)) && Number(v)>=0 ? new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v)) : 'Preco sob consulta';}
function whatsappLink(p) {const n=Number(p.models_per_print);return 'https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(`Ola! Tenho interesse no modelo ${p.name} (${priceLabel(p)}${n>1?`, lote de ${n} pecas`:''}).`);}
if(typeof module!=='undefined' && module.exports) module.exports={category,selectProducts,safeImage,priceLabel,whatsappLink};
if(typeof document!=='undefined') {
 document.querySelectorAll('a[href*="wa.me/"]').forEach(a=>{const u=new URL(a.href);u.pathname='/'+CONFIG.whatsapp;a.href=u.href;});
 document.querySelectorAll('a[href*="instagram.com/"]').forEach(a=>{a.href=CONFIG.instagram;});
 const grid=document.getElementById('catalog-grid'), selector=document.getElementById('catalog-category'), status=document.getElementById('catalog-status'), retry=document.getElementById('catalog-retry'), template=document.getElementById('product-card');
 let products=[];
 function card(p) {
  const c=template.content.firstElementChild.cloneNode(true);
  c.querySelector('.product-name').textContent=p.name;
  c.querySelector('.product-category').textContent=category(p.category);
  c.querySelector('.product-price').textContent=priceLabel(p);
  c.querySelector('.product-unit').textContent=Number(p.models_per_print)>1?`Valor do lote de ${Number(p.models_per_print)} pecas`:'Valor por peca';
  const img=c.querySelector('img'),missing=c.querySelector('.product-no-image'),url=safeImage(p.image_url,location.origin);
  const fallback=()=>{img.hidden=true;missing.hidden=false;};
  if(url){img.src=url;img.alt=p.name;img.addEventListener('error',fallback,{once:true});}else fallback();
  const a=c.querySelector('.product-buy');a.href=whatsappLink(p);a.setAttribute('aria-label',`Consultar ${p.name} pelo WhatsApp`);return c;
 }
 function render(){const visible=selectProducts(products,selector.value);grid.replaceChildren(...visible.map(card));status.textContent=visible.length?`${visible.length} de ${products.length} modelos`:products.length?'Nenhum modelo nesta categoria.':'Nenhum modelo disponivel no momento.';}
 async function load(){
  retry.hidden=true;retry.disabled=true;selector.disabled=true;grid.setAttribute('aria-busy','true');grid.replaceChildren();status.textContent='Carregando modelos...';
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
  try{
   const r=await fetch(CONFIG.api,{cache:'no-store',signal:controller.signal,headers:{Accept:'application/json'}});if(!r.ok)throw Error('API');
   const data=await r.json();if(!Array.isArray(data)||data.some(p=>!p||typeof p.name!=='string'))throw Error('Formato');products=data;
   const current=selector.value,labels=[...CATEGORIES];products.forEach(p=>{const c=category(p.category);if(!labels.some(x=>key(x)===key(c)))labels.push(c);});
   selector.replaceChildren(new Option('Todas as categorias',''),...labels.map(c=>new Option(c,c)));selector.value=labels.includes(current)?current:'';selector.disabled=false;render();
  }catch(_){status.textContent='Nao foi possivel carregar os modelos. Tente novamente ou fale conosco pelo WhatsApp.';retry.hidden=false;}
  finally{clearTimeout(timer);retry.disabled=false;grid.setAttribute('aria-busy','false');}
 }
 if(grid){selector.addEventListener('change',render);retry.addEventListener('click',load);load();}
}
