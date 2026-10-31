'use strict';
document.body.classList.add('js');
const menu = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#navigation');
const theme = document.querySelector('#theme-toggle');
const dialog = document.querySelector('#search-dialog');
const searchOpen = document.querySelector('#search-open');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');
const base = document.body.dataset.base;
menu.hidden = false;
theme.hidden = false;
searchOpen.hidden = false;
menu.addEventListener('click', () => {
 const open = menu.getAttribute('aria-expanded') !== 'true';
 menu.setAttribute('aria-expanded', String(open));
 menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
 navigation.classList.toggle('open', open);
});
document.addEventListener('keydown', e => {
 if(e.key==='Escape' && navigation.classList.contains('open')){menu.click();menu.focus();}
});
document.addEventListener('click', e => {
 if(navigation.classList.contains('open') && !e.target.closest('.header-right'))menu.click();
});
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
const currentTheme = () => document.documentElement.dataset.theme || (systemTheme.matches ? 'dark' : 'light');
function labelTheme(){theme.setAttribute('aria-label',`Switch to ${currentTheme()==='dark'?'light':'dark'} theme`);}
labelTheme();
systemTheme.addEventListener('change', labelTheme);
theme.addEventListener('click', () => {
 const next = currentTheme()==='dark'?'light':'dark';
 document.documentElement.dataset.theme=next;
 try{localStorage.setItem('theme',next);}catch{}
 labelTheme();
});
let searchData;
let loading;
async function loadSearch(){
 if(searchData)return searchData;
 loading ||= fetch(`${base}assets/search.json`).then(r=>{if(!r.ok)throw Error('Search unavailable');return r.json();}).catch(e=>{loading=null;throw e;});
 searchData = await loading;
 return searchData;
}
let searchRequest=0;
const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
async function renderSearch(){
 const request=++searchRequest;
 searchResults.textContent='Loading…';
 try{
  const data=await loadSearch();
  if(request!==searchRequest)return;
  const query=normalize(searchInput.value.trim());
  const terms=query.split(/\s+/).filter(Boolean);
  const hits=data.filter(x=>terms.every(term=>normalize(`${x.title} ${x.text}`).includes(term)));
  searchResults.replaceChildren();
  if(!hits.length){const note=document.createElement('p');note.textContent='No matches. Try “Schwann”, “R” or “education”.';searchResults.append(note);return;}
  for(const hit of hits){
   const a=document.createElement('a');a.href=`${base}${hit.path}`;
   const title=document.createElement('strong');title.textContent=hit.title;
   const detail=document.createElement('span');detail.textContent=hit.title==='CV'?'Education, experience, training, skills and languages':hit.text.slice(0,110)+'…';
   a.append(title,detail);searchResults.append(a);
  }
 }catch{searchResults.textContent='Search is temporarily unavailable. You can still use the main navigation.';}
}
function openSearch(){dialog.showModal();searchInput.focus();renderSearch();}
searchOpen.addEventListener('click',openSearch);
document.querySelector('#search-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
searchInput.addEventListener('input',renderSearch);
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(dialog.open)dialog.close();else openSearch();}});
document.querySelectorAll('.publication-filters').forEach(group=>group.hidden=false);
document.querySelectorAll('[data-year]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-year]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 document.querySelectorAll('[data-publication-year]').forEach(group=>{group.hidden=button.dataset.year!=='all'&&group.dataset.publicationYear!==button.dataset.year;});
}));
const printButton=document.querySelector('#print-cv');
if(printButton){printButton.hidden=false;printButton.addEventListener('click',()=>window.print());}
