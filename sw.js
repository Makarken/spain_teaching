const VERSION='vamos-es-v3-2026-11-07';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('vamos-es-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const req=e.request,u=new URL(req.url);
 if(req.method!=='GET'||u.origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  e.respondWith(fetch(req).then(r=>{if(r.ok){let c=r.clone();caches.open(VERSION).then(cache=>cache.put('./index.html',c));}return r;}).catch(()=>caches.match('./index.html')));return;
 }
 e.respondWith(caches.match(req).then(r=>r||fetch(req).then(f=>{if(f.ok){let clone=f.clone();caches.open(VERSION).then(c=>c.put(req,clone));}return f;})));
});