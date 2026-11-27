document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='전체'&&card.dataset.category!==button.dataset.filter;});}));
const viewer=document.querySelector('#image-viewer');let previousFocus;
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{previousFocus=button;const im=viewer.querySelector('img');im.src=button.dataset.zoom;im.alt=button.dataset.caption;viewer.querySelector('p').textContent=button.dataset.caption;viewer.classList.toggle('vector-view',button.dataset.zoom.endsWith('.svg'));viewer.showModal();viewer.querySelector('.image-pan').scrollTo(0,0);}));
viewer?.querySelector('button').addEventListener('click',()=>viewer.close());viewer?.addEventListener('click',e=>{if(e.target===viewer)viewer.close();});viewer?.addEventListener('close',()=>previousFocus?.focus());
document.querySelectorAll('[data-video]').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.video;if(!/^https?:$/.test(location.protocol)){window.open('https://www.youtube.com/watch?v='+id,'_blank','noopener');return;}const iframe=document.createElement('iframe');iframe.src='https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0&playsinline=1&origin='+encodeURIComponent(location.origin);iframe.title='얼쑤 시연 영상';iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';button.replaceWith(iframe);}));
if('IntersectionObserver' in window){const links=[...document.querySelectorAll('.case-nav a')];const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){links.forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}},{rootMargin:'-25% 0px -55% 0px'});document.querySelectorAll('.case-section[id]').forEach(s=>observer.observe(s));}
const projectViewer=document.querySelector('#project-detail-viewer');
let projectPreviousFocus;
document.querySelectorAll('[data-project-detail]').forEach(button=>button.addEventListener('click',()=>{
  const template=document.getElementById('detail-'+button.dataset.projectDetail);
  if(!template||!projectViewer)return;
  projectPreviousFocus=button;
  projectViewer.querySelector('.project-detail-body').replaceChildren(template.content.cloneNode(true));
  projectViewer.showModal();
  projectViewer.scrollTop=0;
}));
projectViewer?.querySelector('.close-project-detail').addEventListener('click',()=>projectViewer.close());
projectViewer?.addEventListener('click',event=>{if(event.target===projectViewer){const rect=projectViewer.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)projectViewer.close();}});
projectViewer?.addEventListener('close',()=>projectPreviousFocus?.focus());
