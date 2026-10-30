/* 머니퍼즐 노래방 전용 사이트 — 얇은 연결 코드 (2026-10-30)
 *  · 노래방 화면 = 투어앱과 같은 karaoke.js 의 #karBox 를 그대로 연다 (karOpen("site"))
 *  · 여기서 하는 일: 머리글(4번 로고·「Money Puzzle Karaoke / 머니퍼즐 노래방」·언어 6개·앱 설치·내 계정), ✕ 나가기 숨김,
 *    반주기 옆면 걸이 마이크(장식) — 누르면 관리자 로그인(admin/), 언어 바꾸면 화면 다시 그림, 서비스 워커 등록
 */
(function(){
"use strict";
var TX={
 sub:{ko:"머니퍼즐 노래방 · 금영 공식 유튜브 노래방",en:"머니퍼즐 노래방 · KY official karaoke",ja:"머니퍼즐 노래방 · KY公式カラオケ",zhs:"머니퍼즐 노래방 · 金永(KY) 官方卡拉OK",zht:"머니퍼즐 노래방 · 金永(KY) 官方卡拉OK",es:"머니퍼즐 노래방 · Karaoke oficial KY"},
 inst:{ko:"앱 설치",en:"Install",ja:"アプリ",zhs:"安装",zht:"安裝",es:"Instalar"},
 acc:{ko:"내 계정",en:"Account",ja:"アカウント",zhs:"账户",zht:"帳戶",es:"Cuenta"},
 iosT:{ko:"1. 화면 아래(또는 위)의 「공유」 단추를 누르세요.<br>2. 「홈 화면에 추가」를 누르세요.<br>3. 「추가」를 누르면 홈 화면에 앱이 생깁니다.",en:"1. Tap the Share button at the bottom (or top) of the screen.<br>2. Tap “Add to Home Screen”.<br>3. Tap “Add” — the app appears on your home screen.",ja:"1. 画面下（または上）の「共有」ボタンを押します。<br>2.「ホーム画面に追加」を押します。<br>3.「追加」を押すとホーム画面にアプリができます。",zhs:"1. 点屏幕下方（或上方）的「分享」按钮。<br>2. 点「添加到主屏幕」。<br>3. 点「添加」，主屏幕上就会出现应用。",zht:"1. 點螢幕下方（或上方）的「分享」按鈕。<br>2. 點「加入主畫面」。<br>3. 點「新增」，主畫面上就會出現應用程式。",es:"1. Toca el botón Compartir abajo (o arriba).<br>2. Toca «Añadir a pantalla de inicio».<br>3. Toca «Añadir» y la app aparecerá en tu pantalla de inicio."},
 dev:{ko:"개발 중",en:"Under development",ja:"開発中",zhs:"开发中",zht:"開發中",es:"En desarrollo"},
 ok:{ko:"닫기",en:"Close",ja:"閉じる",zhs:"关闭",zht:"關閉",es:"Cerrar"}
};
function L(o){ return o[window.LANG]||o.en; }
function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
var instEv=null;
function isApp(){ return matchMedia("(display-mode: standalone)").matches||navigator.standalone===true; }
function isIOS(){ return /iPhone|iPad|iPod/i.test(navigator.userAgent); }
window.addEventListener("beforeinstallprompt",function(e){ e.preventDefault(); instEv=e; deco(); });
function instGo(){
  if(instEv){ instEv.prompt(); instEv.userChoice.then(function(){ instEv=null; deco(); }); return; }
  var o=document.createElement("div"); o.id="karInst";
  o.innerHTML='<div><img src="logo.png" alt=""><div style="font-size:18px;font-weight:900;margin:10px 0 8px">Money Puzzle Karaoke<br>머니퍼즐 노래방</div><div style="font-size:14.5px;line-height:1.7;text-align:left">'+L(TX.iosT)+'</div><button type="button" style="background:#ffe066;color:#1a1300">'+esc(L(TX.ok))+'</button></div>';
  document.body.appendChild(o); o.querySelector("button").onclick=function(){ o.remove(); }; o.onclick=function(e){ if(e.target===o) o.remove(); }; }
function account(){ if(!window.mpPG) return; mpPG.open(); var p=document.getElementById("pgBox"); if(p) p.style.zIndex="2147483006"; }
// 「내 계정」 단추는 뺐다 — 초록 남은 곡 칸이 로그인·계정 창을 연다 (사장님 10-30)
// 노래방 화면(#karBox)이 생길 때마다 머리글을 사이트용으로 (karaoke.js 가 토스 결제창에서 돌아올 때 스스로 다시 열어도 같게)
function deco(){ var b=document.getElementById("karBox"); if(!b) return; var hd=b.querySelector(".khd"); if(!hd) return;
  var t=hd.querySelector(".kttl");
  if(!t){ var d0=hd.firstElementChild; if(d0&&!d0.classList.contains("kx")) d0.classList.add("kttl"); t=d0;
    var lg=document.createElement("img"); lg.className="klogo"; lg.src="logo.png"; lg.alt="Money Puzzle Karaoke"; hd.insertBefore(lg,hd.firstChild); }
  if(t) t.innerHTML='<b>Money Puzzle</b><small>StageSong</small>';   // 머리글 = Money Puzzle / StageSong (사장님 10-30 — 말줄임 없이, 금영 글자 뺌)
  var s=hd.querySelector(".ksite"); if(!s){ s=document.createElement("div"); s.className="ksite"; hd.appendChild(s); }
  s.innerHTML='<select aria-label="Language">'+["ko","en","ja","zhs","zht","es"].map(function(l){ return '<option value="'+l+'"'+(l===window.LANG?' selected':'')+'>'+esc(({ko:"한국어",en:"English",ja:"日本語",zhs:"简体中文",zht:"繁體中文",es:"Español"})[l])+'</option>'; }).join("")+'</select>'
    +'<button type="button" class="kshr" aria-label="'+esc(L(SH.btn))+'" title="'+esc(L(SH.btn))+'">'+SHI.other.replace('fill="#5b93ff"','fill="currentColor"')+'</button>'
    +(!isApp()&&(instEv||isIOS())?'<button type="button" class="kinst">'+esc(L(TX.inst))+'</button>':'');
  s.querySelector("select").onchange=function(){ window.setLang(this.value); reopen(); };
  s.querySelector(".kshr").onclick=shareOpen;
  var ib=s.querySelector(".kinst"); if(ib) ib.onclick=instGo;
  // 「개발 중」 띠 — 영상 화면 오른쪽 위 모서리에 비스듬히 (사장님 10-30 「좀 가려도 돼」). 누름은 그대로 아래로 통과
  var pl=b.querySelector(".kpl"); if(pl){ var dv=pl.querySelector(".kdev"); if(!dv){ dv=document.createElement("div"); dv.className="kdev"; pl.appendChild(dv); } dv.textContent=L(TX.dev); }
  // 반주기(곡 이용권 칸) 옆면에 걸린 마이크 — 손님에겐 장식. 누르면 관리자 로그인
  var pay=b.querySelector(".kpay");
  if(pay&&!pay.querySelector(".kmic")){ var m=document.createElement("img"); m.className="kmic"; m.src="img/mic_hook.png"; m.alt=""; m.setAttribute("aria-hidden","true"); m.draggable=false;
    m.addEventListener("click",function(e){ e.preventDefault(); e.stopPropagation(); location.href="admin/"; }); pay.appendChild(m); } }
// 공유 — 투어앱 「이 앱 공유하기」 창과 같은 단추 (사장님 10-30). 보내는 주소는 노래방 사이트
var SHI=window.karSHI||{other:""}, SH=window.karSH||{};   // 공유 아이콘·문구는 karaoke.js 로 옮김 (투어앱과 같이 씀, 10-30)
function shareOpen(){ try{ ntap("_app","share"); }catch(e){}   // 공유창 본체는 karaoke.js(karShare) — 영상 공유와 같은 창 (10-30)
  var u="https://karaoke.moneypuzzle.co.kr/", txt=window.LANG==="ko"?"머니퍼즐 노래방 · Money Puzzle Karaoke":"Money Puzzle Karaoke · 머니퍼즐 노래방";
  if(window.karShare) karShare({hd:L(SH.hd),url:u,iurl:u+"?install=1",txt:txt,kk:{title:"머니퍼즐 노래방 · Money Puzzle Karaoke",desc:L(SH.kdesc),img:"https://karaoke.moneypuzzle.co.kr/icon-512.png",b1:L(SH.kopen)}}); }
function reopen(){ var b=document.getElementById("karBox"), keepPay=b&&b.querySelector(".kpm"); if(keepPay){ deco(); return; }   // 결제 창이 열려 있으면 그 창은 karaoke.js 가 그 언어로 다시 그린다
  if(window.karClose) karClose(); if(window.karOpen) karOpen("site"); }
new MutationObserver(function(ms){ for(var i=0;i<ms.length;i++) for(var j=0;j<ms[i].addedNodes.length;j++){ var n=ms[i].addedNodes[j]; if(n.id==="karBox"){ deco(); return; } } }).observe(document.body,{childList:true});
// ── 공유 링크로 들어온 손님 화면 ?v=<영상id> (사장님 10-30) — 첫 로고 화면 건너뛰고 영상 카드 한 장
//   손님 기기(mp_owner 없음)도 이 화면만은 열린다 · 허브 /kst/pv (열쇠 없이) — 전체 공개만 영상, 팔로워만·우리끼리는 잠김 안내
var VQ=(location.search.match(/[?&]v=([0-9a-f]{16})(?![0-9a-z])/i)||[])[1]||""; VQ=VQ.toLowerCase();
var VT={sing:{ko:"{n}님의 노래",en:"Sung by {n}",ja:"{n}さんの歌",zhs:"{n} 的演唱",zht:"{n} 的演唱",es:"Cantada por {n}"},
 try:{ko:"나도 불러 보기",en:"Sing it myself",ja:"自分も歌ってみる",zhs:"我也来唱",zht:"我也來唱",es:"Cantar yo también"},
 lkF:{ko:"팔로우하면 볼 수 있어요",en:"Follow to watch this video",ja:"フォローすると見られます",zhs:"关注后即可观看",zht:"追蹤後即可觀看",es:"Sigue a esta persona para verlo"},
 lkR:{ko:"우리끼리 방 사람만 볼 수 있어요",en:"Only members of this Just-us room can watch",ja:"「仲間だけ」ルームのメンバーだけが見られます",zhs:"仅小圈子房间成员可观看",zht:"僅小圈子房間成員可觀看",es:"Solo los miembros de esta sala «Solo nosotros» pueden verlo"},
 no:{ko:"영상을 찾을 수 없어요.",en:"This video isn't available.",ja:"動画が見つかりません。",zhs:"找不到该视频。",zht:"找不到該影片。",es:"Este vídeo no está disponible."},
 lo:{ko:"불러오는 중…",en:"Loading…",ja:"読み込み中…",zhs:"加载中…",zht:"載入中…",es:"Cargando…"},
 sc:{ko:"노래 점수",en:"Singing score",ja:"歌唱得点",zhs:"演唱得分",zht:"演唱得分",es:"Puntuación"},
 pt:{ko:"점",en:"pts",ja:"点",zhs:"分",zht:"分",es:"pts"}};
function vDev(){ var d=""; try{ d=localStorage.getItem("mpv_dev")||""; if(!/^[0-9a-f]{16,32}$/.test(d)){ d=Array.prototype.map.call(crypto.getRandomValues(new Uint8Array(12)),function(v){ return ("0"+v.toString(16)).slice(-2); }).join(""); localStorage.setItem("mpv_dev",d); } }catch(e){} return d; }
function vInst(){ var ua=navigator.userAgent||""; if(!/KAKAOTALK|FBAN|FBAV|Instagram|NAVER\(inapp|DaumApps| Line\//i.test(ua)&&(instEv||isIOS())){ instGo(); return; }
  location.href=location.origin+"/?install=1"; }   // 앱 안 브라우저 등 = ?install=1 흐름(바깥 브라우저로 → 설치 창)
function vPage(){ var pre=document.getElementById("pre"); if(pre) pre.style.display="none"; var o=document.getElementById("karV"); if(o) o.remove();
  o=document.createElement("div"); o.id="karV"; document.body.appendChild(o);
  var draw=function(j,stt){ var h='<div class="vin"><div class="vhd"><img src="logo.png" alt=""><div><b>Money Puzzle</b><small>StageSong</small></div></div>', nm=esc((j&&j.nick)||"guest");
    if(stt==="lo") h+='<p class="vmsg">'+esc(L(VT.lo))+'</p>';
    else if(stt==="no") h+='<p class="vmsg">'+esc(L(VT.no))+'</p>';
    else if(j.locked) h+='<div class="vlk"><img src="img/kara/kst_lock.png" alt=""><p>'+esc(L(j.locked==="room"?VT.lkR:VT.lkF))+'</p><div class="vn">'+esc(L(VT.sing)).replace("{n}",'<b>'+nm+'</b>')+'</div></div>';
    else h+='<video class="vv" controls playsinline preload="metadata"'+(j.th?' poster="'+esc(HUB+"/kst/t/"+j.id)+'"':'')+' src="'+esc(HUB+"/kst/v/"+j.id+(j.th?"":"#t=0.1"))+'"></video>'
      +'<h2 class="vt">'+esc(j.t||"StageSong")+'</h2><div class="vn">'+esc(L(VT.sing)).replace("{n}",'<b>'+nm+'</b>')+'</div>'
      +(typeof j.sc==="number"?'<div class="vsc"><small>'+esc(L(VT.sc))+'</small><b>'+j.sc+'</b><i>'+esc(L(VT.pt))+'</i></div>':'');
    h+='<div class="vbt"><button type="button" class="vgo">'+esc(L(VT.try))+'</button>'+(isApp()?'':'<button type="button" class="vins">'+esc(L(TX.inst))+'</button>')+'</div></div>';
    o.innerHTML=h;
    o.querySelector(".vgo").onclick=function(){ try{ ntap("kara_site","pv_sing"); }catch(e){} VQ=""; try{ var q=location.search.slice(1).split("&").filter(function(x){ return !/^v=/i.test(x); }).join("&"); history.replaceState(history.state,"",location.pathname+(q?"?"+q:"")+location.hash); }catch(e){}
      var v=o.querySelector("video"); if(v) try{ v.pause(); }catch(e){} o.remove(); T0=0; start(); };
    var ib=o.querySelector(".vins"); if(ib) ib.onclick=function(){ try{ ntap("kara_site","pv_inst"); }catch(e){} vInst(); }; };
  draw(null,"lo");
  fetch(HUB+"/kst/pv?id="+VQ+"&dev="+encodeURIComponent(vDev())).then(function(r){ return r.json(); }).then(function(j){ draw(j,j&&j.ok?"ok":"no"); }).catch(function(){ draw(null,"no"); });
  try{ ntap("kara_site","pv_open"); }catch(e){} }
var T0=Date.now(), PRE_MS=7000;   // 첫 화면 = 로고만 3초 → 로고+「Money Puzzle / StageSong」 4초 → 노래방 (사장님 10-30)
setTimeout(function(){ var t=document.getElementById("preT"); if(t) t.style.visibility="visible"; },3000);
function start(){ if(VQ) return; var w=PRE_MS-(Date.now()-T0); if(w>0&&!document.getElementById("karBox")){ clearTimeout(start._t); start._t=setTimeout(start,w); return; }
  var pre=document.getElementById("pre"); if(pre) pre.style.display="none";
  if(!document.getElementById("karBox")&&window.karOpen) karOpen("site");
  try{ ntap("kara_site","tap"); }catch(e){} }
// karaoke.js 는 ?karres= (토스에서 돌아옴)이면 0.7초 뒤 스스로 연다 — 그때는 먼저 열지 않는다
if(/[?&]karres=/.test(location.search)) setTimeout(function(){ var pre=document.getElementById("pre"); if(pre) pre.style.display="none"; if(!document.getElementById("karBox")) start(); },1500);
else if(VQ){ if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",vPage); else vPage(); }
else if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start); else start();
// 노래방 닫기(뒤로가기 등)로 화면이 비면 다시 연다 — 이 사이트는 노래방뿐
setInterval(function(){ if(!VQ&&!document.getElementById("karBox")&&!/[?&]karres=/.test(location.search)) start(); },1500);
// 「앱 설치」 링크로 온 손님 — 안드로이드: 가운데 큰 「앱 설치」(브라우저 규칙상 한 번은 눌러야 함) · 아이폰: 홈 화면에 추가 안내 (투어앱과 같은 방식, 10-30)
(function(){ var want=false; try{ want=sessionStorage.getItem("mpv_wantinst")==="1"; }catch(e){} if(!want||isApp()) return;
  var done=function(){ try{ sessionStorage.removeItem("mpv_wantinst"); }catch(e){} };
  if(isIOS()){ window.addEventListener("load",function(){ setTimeout(function(){ done(); instGo(); },1200); }); return; }
  var shown=false, show=function(){ if(shown||!instEv) return; shown=true; done();
    var o=document.createElement("div"); o.id="karInst";
    o.innerHTML='<div><img src="logo.png" alt=""><div style="font-size:18px;font-weight:900;margin:10px 0 8px">Money Puzzle Karaoke<br>머니퍼즐 노래방</div><button type="button" class="ky" style="display:block;width:100%;background:#ffe066;color:#1a1300;font-size:18px">'+esc(L(TX.inst))+'</button><button type="button" class="kn" style="background:none;color:#cfc6e8;font-size:14px">'+esc(L(TX.ok))+'</button></div>';
    document.body.appendChild(o); o.querySelector(".ky").onclick=function(){ o.remove(); instGo(); }; o.querySelector(".kn").onclick=function(){ o.remove(); }; };
  window.addEventListener("beforeinstallprompt",function(){ setTimeout(show,300); }); if(instEv) setTimeout(show,300); })();
if("serviceWorker" in navigator) window.addEventListener("load",function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); });
})();
