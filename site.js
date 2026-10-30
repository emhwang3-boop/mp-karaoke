/* 머니퍼즐 노래방 전용 사이트 — 얇은 연결 코드 (2026-10-30)
 *  · 노래방 화면 = 투어앱과 같은 karaoke.js 의 #karBox 를 그대로 연다 (karOpen("site"))
 *  · 여기서 하는 일: 머리글(4번 로고·「Money Puzzle Karaoke / 머니퍼즐 노래방」·언어 6개·앱 설치·내 계정), ✕ 나가기 숨김,
 *    반주기 옆면 걸이 마이크(장식) — 누르면 관리자 로그인(admin/), 언어 바꾸면 화면 다시 그림, 서비스 워커 등록
 */
(function(){
"use strict";
var TX={
 sub:{ko:"머니퍼즐 노래방 · TJ·금영 공식 유튜브 노래방",en:"머니퍼즐 노래방 · TJ & KY official karaoke",ja:"머니퍼즐 노래방 · TJ・KY公式カラオケ",zhs:"머니퍼즐 노래방 · TJ·KY 官方卡拉OK",zht:"머니퍼즐 노래방 · TJ·KY 官方卡拉OK",es:"머니퍼즐 노래방 · Karaoke oficial TJ y KY"},
 inst:{ko:"앱 설치",en:"Install",ja:"アプリ",zhs:"安装",zht:"安裝",es:"Instalar"},
 acc:{ko:"내 계정",en:"Account",ja:"アカウント",zhs:"账户",zht:"帳戶",es:"Cuenta"},
 iosT:{ko:"1. 화면 아래(또는 위)의 「공유」 단추를 누르세요.<br>2. 「홈 화면에 추가」를 누르세요.<br>3. 「추가」를 누르면 홈 화면에 앱이 생깁니다.",en:"1. Tap the Share button at the bottom (or top) of the screen.<br>2. Tap “Add to Home Screen”.<br>3. Tap “Add” — the app appears on your home screen.",ja:"1. 画面下（または上）の「共有」ボタンを押します。<br>2.「ホーム画面に追加」を押します。<br>3.「追加」を押すとホーム画面にアプリができます。",zhs:"1. 点屏幕下方（或上方）的「分享」按钮。<br>2. 点「添加到主屏幕」。<br>3. 点「添加」，主屏幕上就会出现应用。",zht:"1. 點螢幕下方（或上方）的「分享」按鈕。<br>2. 點「加入主畫面」。<br>3. 點「新增」，主畫面上就會出現應用程式。",es:"1. Toca el botón Compartir abajo (o arriba).<br>2. Toca «Añadir a pantalla de inicio».<br>3. Toca «Añadir» y la app aparecerá en tu pantalla de inicio."},
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
// 노래방 화면(#karBox)이 생길 때마다 머리글을 사이트용으로 (karaoke.js 가 토스 결제창에서 돌아올 때 스스로 다시 열어도 같게)
function deco(){ var b=document.getElementById("karBox"); if(!b) return; var hd=b.querySelector(".khd"); if(!hd) return;
  var t=hd.querySelector(".kttl");
  if(!t){ var d0=hd.firstElementChild; if(d0&&!d0.classList.contains("kx")) d0.classList.add("kttl"); t=d0;
    var lg=document.createElement("img"); lg.className="klogo"; lg.src="logo.png"; lg.alt="Money Puzzle Karaoke"; hd.insertBefore(lg,hd.firstChild); }
  if(t) t.innerHTML='<b>Money Puzzle Karaoke</b><small>'+esc(L(TX.sub))+'</small>';
  var s=hd.querySelector(".ksite"); if(!s){ s=document.createElement("div"); s.className="ksite"; hd.appendChild(s); }
  s.innerHTML='<select aria-label="Language">'+["ko","en","ja","zhs","zht","es"].map(function(l){ return '<option value="'+l+'"'+(l===window.LANG?' selected':'')+'>'+esc(({ko:"한국어",en:"English",ja:"日本語",zhs:"简体中文",zht:"繁體中文",es:"Español"})[l])+'</option>'; }).join("")+'</select>'
    +'<button type="button" class="kacc">'+esc(L(TX.acc))+'</button>'
    +(!isApp()&&(instEv||isIOS())?'<button type="button" class="kinst">'+esc(L(TX.inst))+'</button>':'');
  s.querySelector("select").onchange=function(){ window.setLang(this.value); reopen(); };
  s.querySelector(".kacc").onclick=account;
  var ib=s.querySelector(".kinst"); if(ib) ib.onclick=instGo;
  // 반주기(곡 이용권 칸) 옆면에 걸린 마이크 — 손님에겐 장식. 누르면 관리자 로그인
  var pay=b.querySelector(".kpay");
  if(pay&&!pay.querySelector(".kmic")){ var m=document.createElement("img"); m.className="kmic"; m.src="img/mic_hook.png"; m.alt=""; m.setAttribute("aria-hidden","true"); m.draggable=false;
    m.addEventListener("click",function(e){ e.preventDefault(); e.stopPropagation(); location.href="admin/"; }); pay.appendChild(m); } }
function reopen(){ var b=document.getElementById("karBox"), keepPay=b&&b.querySelector(".kpm"); if(keepPay){ deco(); return; }   // 결제 창이 열려 있으면 그 창은 karaoke.js 가 그 언어로 다시 그린다
  if(window.karClose) karClose(); if(window.karOpen) karOpen("site"); }
new MutationObserver(function(ms){ for(var i=0;i<ms.length;i++) for(var j=0;j<ms[i].addedNodes.length;j++){ var n=ms[i].addedNodes[j]; if(n.id==="karBox"){ deco(); return; } } }).observe(document.body,{childList:true});
function start(){ var pre=document.getElementById("pre"); if(pre) pre.style.display="none";
  if(!document.getElementById("karBox")&&window.karOpen) karOpen("site");
  try{ ntap("kara_site","tap"); }catch(e){} }
// karaoke.js 는 ?karres= (토스에서 돌아옴)이면 0.7초 뒤 스스로 연다 — 그때는 먼저 열지 않는다
if(/[?&]karres=/.test(location.search)) setTimeout(function(){ var pre=document.getElementById("pre"); if(pre) pre.style.display="none"; if(!document.getElementById("karBox")) start(); },1500);
else if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start); else start();
// 노래방 닫기(뒤로가기 등)로 화면이 비면 다시 연다 — 이 사이트는 노래방뿐
setInterval(function(){ if(!document.getElementById("karBox")&&!/[?&]karres=/.test(location.search)) start(); },1500);
if("serviceWorker" in navigator) window.addEventListener("load",function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); });
})();
