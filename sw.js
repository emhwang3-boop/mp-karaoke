/* 머니퍼즐 노래방 — 간단한 서비스 워커 (2026-10-30)
 *  · 우리 사이트 파일만: 네트워크 먼저, 안 되면 저장해 둔 것 (늘 새 판이 먼저 보이게 — 깃허브 CDN 캐시 10분은 그대로)
 *  · 허브·유튜브·토스·구글/애플 로그인은 손대지 않는다 (같은 출처가 아니면 그냥 통과) */
var C="mpkara-v1030";
var CORE=["./","index.html","site.js","karaoke.js","pg.js","manifest.webmanifest","logo.png","icon-192.png","img/mic_hook.png","img/kara/tj.jpg","img/kara/ky.jpg"];
self.addEventListener("install",function(e){ self.skipWaiting(); e.waitUntil(caches.open(C).then(function(c){ return c.addAll(CORE); }).catch(function(){})); });
self.addEventListener("activate",function(e){ e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k!==C; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); })); });
self.addEventListener("fetch",function(e){ var r=e.request, u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==self.location.origin||u.pathname.indexOf("/admin/")===0) return;
  e.respondWith(fetch(r).then(function(res){ if(res&&res.ok&&res.type==="basic"){ var cp=res.clone(); caches.open(C).then(function(c){ c.put(r,cp); }); } return res; })
    .catch(function(){ return caches.match(r,{ignoreSearch:true}).then(function(m){ return m||caches.match("./"); }); })); });
