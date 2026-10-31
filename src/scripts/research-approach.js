const researchVisual=document.querySelector('.research-visual');
if(researchVisual){
 const stages=researchVisual.querySelectorAll('[data-research-stage]');
 const caption=document.querySelector('#research-caption');
 function selectStage(button,manual=false){
  stages.forEach(stage=>stage.setAttribute('aria-pressed',String(stage===button)));
  // Automatic visual updates do not repeatedly interrupt screen reader users.
  caption.setAttribute('aria-live',manual?'polite':'off');
  caption.textContent=button.dataset.caption;
 }
 stages.forEach(button=>{
  button.disabled=false;
  button.addEventListener('click',()=>selectStage(button,true));
  const node=button.querySelector('.node-icon');
  // The animation itself is the clock, so highlights and captions stay in sync.
  const syncStage=event=>{if(event.animationName==='research-pulse')selectStage(button);};
  node.addEventListener('animationstart',syncStage);
  node.addEventListener('animationiteration',syncStage);
 });
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 function updateResearchMotion(){
  researchVisual.classList.toggle('is-animated',!reducedMotion.matches);
 }
 reducedMotion.addEventListener('change',updateResearchMotion);
 updateResearchMotion();
}
