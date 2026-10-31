document.querySelectorAll('.publication-filters').forEach(group=>group.hidden=false);
document.querySelectorAll('[data-year]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-year]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 document.querySelectorAll('[data-publication-year]').forEach(group=>{group.hidden=button.dataset.year!=='all'&&group.dataset.publicationYear!==button.dataset.year;});
}));
