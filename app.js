'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
function closeMenu(){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open))});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();if(document.activeElement?.closest('#navigation'))menu?.focus()}});
const cards=[...document.querySelectorAll('.project-card[data-category]')],filterButtons=[...document.querySelectorAll('[data-filter]')],search=document.querySelector('#project-search');let activeFilter='all';
function filterProjects(){const query=(search?.value||'').trim().toLowerCase();let count=0;cards.forEach(card=>{const visible=(activeFilter==='all'||card.dataset.category===activeFilter)&&card.dataset.search.includes(query);card.hidden=!visible;if(visible)count++});const status=document.querySelector('#project-count');if(status)status.textContent=`${count} ${count===1?'project':'projects'}`;const empty=document.querySelector('#no-results');if(empty)empty.hidden=count>0;}
filterButtons.forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;filterButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filterProjects()}));search?.addEventListener('input',filterProjects);
let timer;function notify(text){const node=document.querySelector('#notice');if(!node)return;clearTimeout(timer);node.textContent=text;node.hidden=false;timer=setTimeout(()=>{node.hidden=true},5000)}
document.querySelectorAll('.copy-email').forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('shashwatjain8733@gmail.com');notify('Email address copied.')}catch{notify('Email: shashwatjain8733@gmail.com')}}));
const email='shashwatjain8733@gmail.com',subject='Opportunity for Shashwat Jain',body='Hi Shashwat,\n\nI explored your portfolio and would like to discuss an opportunity with you.\n\nRole / opportunity:\nCompany:\nDetails:\n\nBest regards,\n';
const mailto='mailto:'+email+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
document.querySelectorAll('[data-hire-link]').forEach(link=>link.href=mailto);
let buffer='';document.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||e.repeat||e.isComposing||e.target.closest('input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="textbox"]')){buffer='';return}if(e.key.length!==1){if(e.key!=='Shift')buffer='';return}buffer=(buffer+e.key.toUpperCase()).slice(-4);if(buffer==='HIRE'){buffer='';const panel=document.querySelector('#hire-email-panel');if(panel)panel.hidden=false;document.querySelector('#contact')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});notify('Opening an email draft. Review it and press Send in your email app.');window.location.href=mailto}});

// Progressive enhancement: the first slide and original downloads work without JavaScript.
const slideViewer=document.querySelector('[data-slide-viewer]');
if(slideViewer){
 const titles=['Introduction','Problem statement','Objectives','System pipeline','Experimental setup','How 4-bit quantization works','NVFP4 on tensor cores','Our Triton 4-bit kernel','Kernel results','Memory footprint','Live power traces','Energy per token','Batched energy','Accuracy preserved','Carbon and water estimates','Key findings','Attainment of objectives','Publications (as supplied)','Future scope','References'];
 let slideIndex=0;
 const previous=slideViewer.querySelector('[data-slide-prev]'),next=slideViewer.querySelector('[data-slide-next]');
 function showSlide(){const src=`../assets/llm-quantization/slide-${String(slideIndex+1).padStart(2,'0')}.webp`;const img=slideViewer.querySelector('[data-slide-image]');img.src=src;img.alt=`Slide ${slideIndex+1}: ${titles[slideIndex]}`;slideViewer.querySelector('[data-slide-full]').href=src;slideViewer.querySelector('[data-slide-status]').textContent=`${slideIndex+1} / ${titles.length} · ${titles[slideIndex]}`;previous.disabled=slideIndex===0;next.disabled=slideIndex===titles.length-1;}
 previous.addEventListener('click',()=>{if(slideIndex>0){slideIndex--;showSlide();}});next.addEventListener('click',()=>{if(slideIndex<titles.length-1){slideIndex++;showSlide();}});
 slideViewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();(e.key==='ArrowLeft'?previous:next).click();}});
 slideViewer.querySelector('.slide-controls').hidden=false;showSlide();
}
