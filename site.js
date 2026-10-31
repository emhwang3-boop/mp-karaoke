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
 iosT:{ko:"1. 화면 아래(또는 위)의 「공유」 버튼을 누르세요.<br>2. 「홈 화면에 추가」를 누르세요.<br>3. 「추가」를 누르면 홈 화면에 앱이 추가됩니다.",en:"1. Tap the Share button at the bottom (or top) of the screen.<br>2. Tap “Add to Home Screen”.<br>3. Tap “Add” — the app appears on your home screen.",ja:"1. 画面下（または上）の「共有」ボタンを押します。<br>2.「ホーム画面に追加」を押します。<br>3.「追加」を押すとホーム画面にアプリができます。",zhs:"1. 点屏幕下方（或上方）的「分享」按钮。<br>2. 点「添加到主屏幕」。<br>3. 点「添加」，主屏幕上就会出现应用。",zht:"1. 點螢幕下方（或上方）的「分享」按鈕。<br>2. 點「加入主畫面」。<br>3. 點「新增」，主畫面上就會出現應用程式。",es:"1. Toca el botón Compartir abajo (o arriba).<br>2. Toca «Añadir a pantalla de inicio».<br>3. Toca «Añadir» y la app aparecerá en tu pantalla de inicio."},
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
  if(window.karShare) karShare({hd:L(SH.hd),url:u,iurl:u+"?install=1",txt:txt,kk:{title:"머니퍼즐 노래방 · Money Puzzle Karaoke",desc:L(SH.kdesc),img:"https://karaoke.moneypuzzle.co.kr/img/card/card_app.png",w:1200,h:630,b1:L(SH.kopen)}}); }
function reopen(){ var b=document.getElementById("karBox"), keepPay=b&&b.querySelector(".kpm"); if(keepPay){ deco(); return; }   // 결제 창이 열려 있으면 그 창은 karaoke.js 가 그 언어로 다시 그린다
  if(window.karClose) karClose(); if(window.karOpen) karOpen("site"); }
new MutationObserver(function(ms){ for(var i=0;i<ms.length;i++) for(var j=0;j<ms[i].addedNodes.length;j++){ var n=ms[i].addedNodes[j]; if(n.id==="karBox"){ deco(); return; } } }).observe(document.body,{childList:true});
// ── 공유 링크로 들어온 손님 화면 ?v=<영상id> (사장님 10-30) — 첫 로고 화면 건너뛰고 영상 카드 한 장
//   누구나 · 허브 /kst/pv (열쇠 없이) — 전체 공개만 영상, 팔로워만·우리끼리는 잠김 안내
var VQ=(location.search.match(/[?&]v=([0-9a-f]{16})(?![0-9a-z])/i)||[])[1]||""; VQ=VQ.toLowerCase();
var VT={sing:{ko:"{n}님의 노래",en:"Sung by {n}",ja:"{n}さんの歌",zhs:"{n} 的演唱",zht:"{n} 的演唱",es:"Cantada por {n}"},
 try:{ko:"나도 도전",en:"Sing it myself",ja:"自分も歌ってみる",zhs:"我也来唱",zht:"我也來唱",es:"Cantar yo también"},
 lkF:{ko:"팔로우하면 시청할 수 있어요",en:"Follow to watch this video",ja:"フォローすると見られます",zhs:"关注后即可观看",zht:"追蹤後即可觀看",es:"Sigue a esta persona para verlo"},
 lkR:{ko:"우리끼리 노래 방 멤버만 시청할 수 있어요",en:"Only members of this Just Us Karaoke room can watch",ja:"「仲間だけカラオケ」ルームのメンバーだけが見られます",zhs:"仅小圈子房间成员可观看",zht:"僅小圈子房間成員可觀看",es:"Solo los miembros de esta sala «Solo nosotros» pueden verlo"},
 no:{ko:"해당 영상이 존재하지 않아요.",en:"This video isn't available.",ja:"動画が見つかりません。",zhs:"找不到该视频。",zht:"找不到該影片。",es:"Este vídeo no está disponible."},
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
// ── 우리끼리 방 카톡 초대 링크 ?rinv=<토큰> (사장님 10-31) — 토큰은 localStorage "kst_rinv" {tok,at} 에 보관(설치 뒤·오픈 뒤에도 쓰게)
//   (10-31 출시판) 누구나 — 브라우저(앱 밖)는 초대 카드(「앱 설치」·「노래방 입장」) → 노래방 열고 karRoomJoin(로그인 전이면 로그인부터 → 허브 join → 스테이지 › 우리끼리 › 그 방) · 앱 안은 바로 입장
var RT={hd:{ko:"우리끼리 노래 방 초대",en:"Just Us Karaoke room invitation",ja:"「仲間だけカラオケ」ルームへの招待",zhs:"小圈子K歌房邀请",zht:"小圈子K歌房邀請",es:"Invitación a una sala «Solo nosotros Karaoke»"},
 soon:{ko:"노래방에 입장하면 초대받은 방에 바로 참여합니다",en:"Open the karaoke to join the room you were invited to",ja:"カラオケに入ると、招待されたルームにすぐ参加します",zhs:"进入练歌房即可直接加入受邀的房间",zht:"進入練歌房即可直接加入受邀的房間",es:"Abre el karaoke para unirte a la sala a la que te invitaron"},
 kar:{ko:"노래방 입장",en:"Open karaoke",ja:"カラオケを開く",zhs:"打开练歌房",zht:"開啟練歌房",es:"Abrir karaoke"}};
var RQ=(location.search.match(/[?&]rinv=([A-Za-z0-9]{16})(?![A-Za-z0-9])/)||[])[1]||"";
if(RQ){ try{ localStorage.setItem("kst_rinv",JSON.stringify({tok:RQ,at:Date.now()})); }catch(e){}
  try{ var rq=location.search.slice(1).split("&").filter(function(x){ return !/^rinv=/i.test(x); }).join("&"); history.replaceState(history.state,"",location.pathname+(rq?"?"+rq:"")+location.hash); }catch(e){} }
function rTok(){ try{ var x=JSON.parse(localStorage.getItem("kst_rinv")||"null"); if(x&&/^[A-Za-z0-9]{16}$/.test(x.tok||"")&&Date.now()-(+x.at||0)<8*86400000) return x.tok; localStorage.removeItem("kst_rinv"); }catch(e){} return ""; }
function rOwn(){ return true; }   // (10-31 출시판) 사장님 기기 구분 없음 — 누구나 입장
var RP=!!(RQ&&!isApp()&&!window.Capacitor&&!VQ);   // 브라우저 = 초대 카드(앱 설치·입장)가 떠 있는 동안 노래방을 열지 않는다 · 앱 안은 바로
function rPage(){ var pre=document.getElementById("pre"); if(pre) pre.style.display="none"; var o=document.getElementById("karV"); if(o) o.remove();
  o=document.createElement("div"); o.id="karV"; document.body.appendChild(o);
  o.innerHTML='<div class="vin"><div class="vhd"><img src="logo.png" alt=""><div><b>Money Puzzle</b><small>StageSong</small></div></div>'
    +'<div class="vlk"><img src="img/kara/kst_room.png" alt=""><p>'+esc(L(RT.hd))+'</p><div class="vn">'+esc(L(RT.soon))+'</div></div>'
    +'<div class="vbt">'+(isApp()?'':'<button type="button" class="vins">'+esc(L(TX.inst))+'</button>')+'<button type="button" class="vgo">'+esc(L(RT.kar))+'</button></div></div>';
  var ib=o.querySelector(".vins"); if(ib) ib.onclick=function(){ try{ ntap("kara_site","rinv_inst"); }catch(e){} vInst(); };
  o.querySelector(".vgo").onclick=function(){ try{ ntap("kara_site","rinv_kar"); }catch(e){} RP=false; o.remove(); T0=0; start(); };
  try{ ntap("kara_site","rinv_open"); }catch(e){} }
// 노래방 화면이 생기면 보관한 토큰으로 한 번 입장
var RJ=false; function rJoin(){ if(RJ||!rOwn()) return; var t=rTok(); if(!t||!window.karRoomJoin) return; var n=0;
  RJ=true; (function w(){ if(document.getElementById("karBox")){ setTimeout(function(){ window.karRoomJoin(t); },300); return; } if(++n<60) setTimeout(w,250); else RJ=false; })(); }
// ── 챌린지 초대 ?chal=<id> · 릴레이 차례 알림 ?room=<rid> (사장님 10-31) — 누구나: 브라우저는 초대 카드(「앱 설치」·「노래방 입장」) → 노래방 열고 그 챌린지·그 방 · 앱 안은 바로
var CT={hd:{ko:"StageSong 챌린지 초대",en:"StageSong challenge invitation",ja:"StageSongチャレンジへの招待",zhs:"StageSong 挑战邀请",zht:"StageSong 挑戰邀請",es:"Invitación a un reto de StageSong"},
 rhd:{ko:"우리끼리 노래 방 릴레이",en:"Just Us Karaoke room relay",ja:"「仲間だけカラオケ」ルームのリレー",zhs:"小圈子K歌房接力",zht:"小圈子K歌房接力",es:"Relevo de la sala «Solo nosotros Karaoke»"},
 soon:{ko:"노래방에 입장하면 바로 참여할 수 있습니다",en:"Open the karaoke to join right away",ja:"カラオケに入ると、すぐに参加できます",zhs:"进入练歌房即可直接参加",zht:"進入練歌房即可直接參加",es:"Abre el karaoke para participar ahora mismo"}};
var CQ=((location.search.match(/[?&]chal=([0-9a-f]{12})(?![0-9a-z])/i)||[])[1]||"").toLowerCase(), MQ=((location.search.match(/[?&]room=([0-9a-f]{12})(?![0-9a-z])/i)||[])[1]||"").toLowerCase();
if(CQ||MQ){ try{ var cq2=location.search.slice(1).split("&").filter(function(x){ return !/^(chal|room)=/i.test(x); }).join("&"); history.replaceState(history.state,"",location.pathname+(cq2?"?"+cq2:"")+location.hash); }catch(e){} }
var CP=!!((CQ||MQ)&&!isApp()&&!window.Capacitor&&!VQ&&!RQ);   // 브라우저 = 초대 카드가 떠 있는 동안 노래방을 열지 않는다 · 앱 안은 바로
function cPage(){ var pre=document.getElementById("pre"); if(pre) pre.style.display="none"; var o=document.getElementById("karV"); if(o) o.remove();
  o=document.createElement("div"); o.id="karV"; document.body.appendChild(o);
  o.innerHTML='<div class="vin"><div class="vhd"><img src="logo.png" alt=""><div><b>Money Puzzle</b><small>StageSong</small></div></div>'
    +'<div class="vlk"><img src="img/kara/'+(CQ?"kst_chal":"kst_relay")+'.png" alt=""><p>'+esc(L(CQ?CT.hd:CT.rhd))+'</p><div class="vn">'+esc(L(CT.soon))+'</div></div>'
    +'<div class="vbt">'+(isApp()?"":'<button type="button" class="vins">'+esc(L(TX.inst))+'</button>')+'<button type="button" class="vgo">'+esc(L(RT.kar))+'</button></div></div>';
  var ib=o.querySelector(".vins"); if(ib) ib.onclick=function(){ try{ ntap("kara_site",CQ?"chal_inst":"room_inst"); }catch(e){} vInst(); };
  o.querySelector(".vgo").onclick=function(){ try{ ntap("kara_site",CQ?"chal_kar":"room_kar"); }catch(e){} CP=false; o.remove(); T0=0; start(); };
  try{ ntap("kara_site",CQ?"chal_open":"room_open"); }catch(e){} }
var CJ=false; function cGo(){ if(CJ||!rOwn()||!(CQ||MQ)) return; var n=0; CJ=true;
  (function w(){ if(document.getElementById("karBox")&&(CQ?window.karChal:window.karRoomOpen)){ setTimeout(function(){ if(CQ) window.karChal(CQ); else window.karRoomOpen(MQ); CQ=""; MQ=""; },300); return; } if(++n<60) setTimeout(w,250); else CJ=false; })(); }
// ── 도란도란(영상 사랑방) 초대 ?dor=<토큰> (사장님 10-31 밤) — 우리끼리 노래 초대(?rinv=)와 같은 방식 · 토큰은 localStorage "kdor_inv" {tok,at}
//   브라우저(앱 밖) = 초대 카드(「앱 설치」·「노래방 입장」) → 노래방 열고 karDorJoin(로그인 전이면 로그인부터 → 입장 확인 → 사랑방) · 앱 안은 바로
var DT={hd:{ko:"도란도란 초대",en:"Doran-doran video room invitation",ja:"ドランドラン（ビデオ談話室）への招待",zhs:"Doran-doran 视频聊天室邀请",zht:"Doran-doran 視訊聊天室邀請",es:"Invitación a la sala de video Doran-doran"},
 soon:{ko:"노래방에 입장하면 초대받은 도란도란 방에 바로 참여합니다 · 카메라와 마이크를 사용합니다",en:"Open the karaoke to join the video room you were invited to. Your camera and mic will be used.",ja:"カラオケに入ると、招待されたドランドランにすぐ参加します。カメラとマイクを使用します",zhs:"进入练歌房即可直接加入受邀的视频聊天室，将使用摄像头和麦克风",zht:"進入練歌房即可直接加入受邀的視訊聊天室，將使用相機和麥克風",es:"Abre el karaoke para unirte a la sala de video. Se usarán tu cámara y micrófono."}};
var DQ=(location.search.match(/[?&]dor=([A-Za-z0-9]{16})(?![A-Za-z0-9])/)||[])[1]||"";
if(DQ){ try{ localStorage.setItem("kdor_inv",JSON.stringify({tok:DQ,at:Date.now()})); }catch(e){}
  try{ var dq2=location.search.slice(1).split("&").filter(function(x){ return !/^dor=/i.test(x); }).join("&"); history.replaceState(history.state,"",location.pathname+(dq2?"?"+dq2:"")+location.hash); }catch(e){} }
function dTok(){ try{ var x=JSON.parse(localStorage.getItem("kdor_inv")||"null"); if(x&&/^[A-Za-z0-9]{16}$/.test(x.tok||"")&&Date.now()-(+x.at||0)<2*86400000) return x.tok; localStorage.removeItem("kdor_inv"); }catch(e){} return ""; }
var DP=!!(DQ&&!isApp()&&!window.Capacitor&&!VQ&&!RQ);
function dPage(){ var pre=document.getElementById("pre"); if(pre) pre.style.display="none"; var o=document.getElementById("karV"); if(o) o.remove();
  o=document.createElement("div"); o.id="karV"; document.body.appendChild(o);
  o.innerHTML='<div class="vin"><div class="vhd"><img src="logo.png" alt=""><div><b>Money Puzzle</b><small>StageSong</small></div></div>'
    +'<div class="vlk"><img src="img/kara/dor_l.png" alt=""><p>'+esc(L(DT.hd))+'</p><div class="vn">'+esc(L(DT.soon))+'</div></div>'
    +'<div class="vbt">'+(isApp()?'':'<button type="button" class="vins">'+esc(L(TX.inst))+'</button>')+'<button type="button" class="vgo">'+esc(L(RT.kar))+'</button></div></div>';
  var ib=o.querySelector(".vins"); if(ib) ib.onclick=function(){ try{ ntap("kara_site","dor_inst"); }catch(e){} vInst(); };
  o.querySelector(".vgo").onclick=function(){ try{ ntap("kara_site","dor_kar"); }catch(e){} DP=false; o.remove(); T0=0; start(); };
  try{ ntap("kara_site","dor_open"); }catch(e){} }
var DJ=false; function dJoin(){ if(DJ) return; var t=dTok(); if(!t) return; var n=0; DJ=true;
  (function w(){ if(document.getElementById("karBox")&&window.karDorJoin){ setTimeout(function(){ try{ localStorage.removeItem("kdor_inv"); }catch(e){} window.karDorJoin(t); },300); return; } if(++n<60) setTimeout(w,250); else DJ=false; })(); }
var T0=Date.now(), PRE_MS=1500;   // 첫 화면 = 로고+「Money Puzzle / StageSong」 1.5초 → 노래방 (사장님 10-31 밤 「로고만 화면 삭제」)
(function(){ var t=document.getElementById("preT"); if(t) t.style.visibility="visible"; })();
function start(){ if(VQ||RP||CP||DP) return; if((RQ||CQ||MQ||DQ)&&rOwn()) T0=0; var w=PRE_MS-(Date.now()-T0); if(w>0&&!document.getElementById("karBox")){ clearTimeout(start._t); start._t=setTimeout(start,w); return; }
  var pre=document.getElementById("pre"); if(pre) pre.style.display="none";
  if(!document.getElementById("karBox")&&window.karOpen) karOpen("site");
  rJoin(); cGo(); dJoin();
  try{ ntap("kara_site","tap"); }catch(e){} }
// karaoke.js 는 ?karres= (토스에서 돌아옴)이면 0.7초 뒤 스스로 연다 — 그때는 먼저 열지 않는다
if(/[?&](karres|kptres)=/.test(location.search)) setTimeout(function(){ var pre=document.getElementById("pre"); if(pre) pre.style.display="none"; if(!document.getElementById("karBox")) start(); },1500);
else if(VQ){ if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",vPage); else vPage(); }
else if(RP){ if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",rPage); else rPage(); }
else if(CP){ if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",cPage); else cPage(); }
else if(DP){ if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",dPage); else dPage(); }
else if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start); else start();
// 노래방 닫기(뒤로가기 등)로 화면이 비면 다시 연다 — 이 사이트는 노래방뿐
setInterval(function(){ if(!VQ&&!RP&&!CP&&!DP&&!document.getElementById("karBox")&&!/[?&](karres|kptres)=/.test(location.search)) start(); },1500);
// 「앱 설치」 링크로 온 손님 — 안드로이드: 가운데 큰 「앱 설치」(브라우저 규칙상 한 번은 눌러야 함) · 아이폰: 홈 화면에 추가 안내 (투어앱과 같은 방식, 10-30)
(function(){ var want=false; try{ want=sessionStorage.getItem("mpv_wantinst")==="1"; }catch(e){} if(!want||isApp()) return;
  var done=function(){ try{ sessionStorage.removeItem("mpv_wantinst"); }catch(e){} };
  if(isIOS()){ window.addEventListener("load",function(){ setTimeout(function(){ done(); instGo(); },1200); }); return; }
  var shown=false, show=function(){ if(shown||!instEv) return; shown=true; done();
    var o=document.createElement("div"); o.id="karInst";
    o.innerHTML='<div><img src="logo.png" alt=""><div style="font-size:18px;font-weight:900;margin:10px 0 8px">Money Puzzle Karaoke<br>머니퍼즐 노래방</div><button type="button" class="ky" style="display:block;width:100%;background:#ffe066;color:#1a1300;font-size:18px">'+esc(L(TX.inst))+'</button><button type="button" class="kn" style="background:none;color:#cfc6e8;font-size:14px">'+esc(L(TX.ok))+'</button></div>';
    document.body.appendChild(o); o.querySelector(".ky").onclick=function(){ o.remove(); instGo(); }; o.querySelector(".kn").onclick=function(){ o.remove(); }; };
  window.addEventListener("beforeinstallprompt",function(){ setTimeout(show,300); }); if(instEv) setTimeout(show,300); })();
// 방문자 수 (사장님 10-31, 투어앱과 같은 방식) — 세션마다 한 번 · 사장님 기기(mp_owner)는 안 센다(n=0) · 허브 /hc?s=kara (따로 된 칸) · 노래방 화면 맨 아래 회색 작은 글씨
var VC=null, VCT={ko:"누적 방문자 {u}명 · 오늘 방문자 {t}명 · 오늘 방문 {d}회",en:"Total visitors {u} · Visitors today {t} · Visits today {d}",ja:"累計訪問者 {u}人 · 本日の訪問者 {t}人 · 本日の訪問 {d}回",zhs:"累计访客 {u}人 · 今日访客 {t}人 · 今日访问 {d}次",zht:"累計訪客 {u}人 · 今日訪客 {t}人 · 今日造訪 {d}次",es:"Visitantes totales {u} · Visitantes hoy {t} · Visitas hoy {d}"};
window.KAR_VC=function(){ if(!VC) return ""; var f=function(x){ return Number(x||0).toLocaleString(); }; return L(VCT).replace("{u}",f(VC.uniq)).replace("{t}",f(VC.tuniq)).replace("{d}",f(VC.today)); };
function vcPaint(){ [].forEach.call(document.querySelectorAll("#karBox .kvc"),function(e){ e.textContent=window.KAR_VC(); }); }
(function(){ try{ var v=""; try{ v=localStorage.getItem("kara_vid")||""; if(!v){ v=Math.random().toString(36).slice(2)+Date.now().toString(36); localStorage.setItem("kara_vid",v); } }catch(x){}
  var n="1"; try{ if(sessionStorage.getItem("kara_hit")) n="0"; else sessionStorage.setItem("kara_hit","1"); if(localStorage.getItem("mp_owner")) n="0"; }catch(x){}
  fetch(HUB+"/hc?s=kara&n="+n+"&vid="+encodeURIComponent(v),{cache:"no-store"}).then(function(r){ return r.json(); }).then(function(j){ VC=j; vcPaint(); }).catch(function(){}); }catch(x){} })();
if("serviceWorker" in navigator) window.addEventListener("load",function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); });
})();
