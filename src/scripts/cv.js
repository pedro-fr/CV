const printButton=document.querySelector('#print-cv');
if(printButton){printButton.hidden=false;printButton.addEventListener('click',()=>window.print());}
