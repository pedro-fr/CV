document.body.classList.add('js');
const menu=document.querySelector('#menu-toggle');
const navigation=document.querySelector('#navigation');
menu.hidden = false;
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
