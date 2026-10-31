const theme=document.querySelector('#theme-toggle');
theme.hidden=false;
const currentTheme = () => document.documentElement.dataset.theme || 'light';
function labelTheme(){theme.setAttribute('aria-label',`Switch to ${currentTheme()==='dark'?'light':'dark'} theme`);}
labelTheme();
theme.addEventListener('click', () => {
 const next = currentTheme()==='dark'?'light':'dark';
 document.documentElement.dataset.theme=next;
 try{localStorage.setItem('theme',next);}catch{}
 labelTheme();
});
