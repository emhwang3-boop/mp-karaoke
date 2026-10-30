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
var SHI={"x": "<svg class=\"shi\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z\"/></svg>", "sms": "<svg class=\"shi\" viewBox=\"0 0 24 24\"><path fill=\"#34C759\" d=\"M12 3C6.98 3 3 6.36 3 10.5c0 2.35 1.28 4.43 3.3 5.8-.13 1.02-.5 2.2-1.3 3.2 1.7-.2 3.2-.94 4.3-1.7.85.2 1.75.3 2.7.3 5.02 0 9-3.36 9-7.6S17.02 3 12 3z\"/></svg>", "tg": "<svg class=\"shi\" viewBox=\"0 0 24 24\"><path fill=\"#26A5E4\" d=\"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z\"/></svg>", "line": "<svg class=\"shi\" viewBox=\"0 0 24 24\"><path fill=\"#00C300\" d=\"M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314\"/></svg>", "fb": "<svg class=\"shi\" viewBox=\"0 0 24 24\"><path fill=\"#1877F2\" d=\"M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z\"/></svg>", "band": "<svg class=\"shi\" viewBox=\"0 0 24 24\"><rect width=\"24\" height=\"24\" rx=\"6\" fill=\"#00C73C\"/><text x=\"12\" y=\"17.5\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#fff\" font-family=\"Arial\">B</text></svg>", "wa": "<svg class=\"shi\" viewBox=\"0 0 24 24\"><path fill=\"#25D366\" d=\"M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z\"/></svg>", "mail": "<svg class=\"shi\" viewBox=\"0 0 24 24\"><path fill=\"#EA4335\" d=\"M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z\"/></svg>", "kakao": "<svg class=\"shi\" viewBox=\"0 0 24 24\"><rect width=\"24\" height=\"24\" rx=\"6\" fill=\"#FEE500\"/><g transform=\"translate(3.2,3.2) scale(0.73)\"><path fill=\"#3C1E1E\" d=\"M22.125 0H1.875C.8394 0 0 .8394 0 1.875v20.25C0 23.1606.8394 24 1.875 24h20.25C23.1606 24 24 23.1606 24 22.125V1.875C24 .8394 23.1606 0 22.125 0zM12 18.75c-.591 0-1.1697-.0413-1.7317-.1209-.5626.3965-3.813 2.6797-4.1198 2.7225 0 0-.1258.0489-.2328-.0141s-.0876-.2282-.0876-.2282c.0322-.2198.8426-3.0183.992-3.5333-2.7452-1.36-4.5701-3.7686-4.5701-6.5135C2.25 6.8168 6.6152 3.375 12 3.375s9.75 3.4418 9.75 7.6875c0 4.2457-4.3652 7.6875-9.75 7.6875zM8.0496 9.8672h-.8777v3.3417c0 .2963-.2523.5372-.5625.5372s-.5625-.2409-.5625-.5372V9.8672h-.8777c-.3044 0-.552-.2471-.552-.5508s.2477-.5508.552-.5508h2.8804c.3044 0 .552.2471.552.5508s-.2477.5508-.552.5508zm10.9879 2.9566a.558.558 0 0 1 .108.4167.5588.5588 0 0 1-.2183.371.5572.5572 0 0 1-.3383.1135.558.558 0 0 1-.4493-.2236l-1.3192-1.7479-.1952.1952v1.2273a.5635.5635 0 0 1-.5627.5628.563.563 0 0 1-.5625-.5625V9.3281c0-.3102.2523-.5625.5625-.5625s.5625.2523.5625.5625v1.209l1.5694-1.5694c.0807-.0807.1916-.1252.312-.1252.1404 0 .2814.0606.3871.1661.0985.0984.1573.2251.1654.3566.0082.1327-.036.2542-.1241.3425l-1.2818 1.2817 1.3845 1.8344zm-8.3502-3.5023c-.095-.2699-.3829-.5475-.7503-.5557-.3663.0083-.6542.2858-.749.5551l-1.3455 3.5415c-.1708.5305-.0217.7272.1333.7988a.8568.8568 0 0 0 .3576.0776c.2346 0 .4139-.0952.4678-.2481l.2787-.7297 1.7152.0001.2785.7292c.0541.1532.2335.2484.4681.2484a.8601.8601 0 0 0 .3576-.0775c.1551-.0713.3041-.2681.1329-.7999l-1.3449-3.5398zm-1.3116 2.4433l.5618-1.5961.5618 1.5961H9.3757zm5.9056 1.3836c0 .2843-.2418.5156-.5391.5156h-1.8047c-.2973 0-.5391-.2314-.5391-.5156V9.3281c0-.3102.2576-.5625.5742-.5625s.5742.2523.5742.5625v3.3047h1.1953c.2974 0 .5392.2314.5392.5156z\"/></g></svg>", "copy": "<svg class=\"shi\" viewBox=\"0 0 24 24\"><path fill=\"none\" stroke=\"#8a93a3\" stroke-width=\"2\" stroke-linecap=\"round\" d=\"M10 13.5a3.5 3.5 0 0 0 5 0l3-3a3.54 3.54 0 0 0-5-5l-1.2 1.2M14 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.54 3.54 0 0 0 5 5l1.2-1.2\"/></svg>", "other": "<svg class=\"shi\" viewBox=\"0 0 24 24\"><path fill=\"#5b93ff\" d=\"M18 16.08a2.9 2.9 0 0 0-1.96.77L8.9 12.7a3.3 3.3 0 0 0 0-1.4l7.05-4.11A2.92 2.92 0 1 0 15 5a3 3 0 0 0 .06.6L8.04 9.72a3 3 0 1 0 0 4.56l7.1 4.15c-.04.2-.06.4-.06.6a2.92 2.92 0 1 0 2.92-2.95z\"/></svg>"};
var SH={hd:{ko:"이 앱 공유하기",en:"Share this app",ja:"このアプリを共有",zhs:"分享此应用",zht:"分享此應用",es:"Compartir esta app"},
 btn:{ko:"공유",en:"Share",ja:"共有",zhs:"分享",zht:"分享",es:"Compartir"},
 sms:{ko:"문자",en:"Message",ja:"メッセージ",zhs:"短信",zht:"簡訊",es:"Mensaje"},
 tg:{ko:"텔레그램",en:"Telegram",ja:"Telegram",zhs:"Telegram",zht:"Telegram",es:"Telegram"},
 fb:{ko:"페이스북",en:"Facebook",ja:"Facebook",zhs:"Facebook",zht:"Facebook",es:"Facebook"},
 band:{ko:"밴드",en:"BAND",ja:"BAND",zhs:"BAND",zht:"BAND",es:"BAND"},
 mail:{ko:"메일",en:"Email",ja:"メール",zhs:"邮件",zht:"郵件",es:"Correo"},
 kakao:{ko:"카카오톡",en:"KakaoTalk",ja:"カカオトーク",zhs:"KakaoTalk",zht:"KakaoTalk",es:"KakaoTalk"},
 copy:{ko:"링크 복사",en:"Copy link",ja:"リンクをコピー",zhs:"复制链接",zht:"複製連結",es:"Copiar enlace"},
 other:{ko:"다른 앱으로",en:"Other apps",ja:"他のアプリ",zhs:"其他应用",zht:"其他應用",es:"Otras apps"},
 kinst:{"ko": "앱 설치", "en": "Install app", "ja": "アプリを入れる", "zhs": "安装应用", "zht": "安裝應用", "es": "Instalar app"},
 kopen:{"ko": "노래방 열기", "en": "Open karaoke", "ja": "カラオケを開く", "zhs": "打开练歌房", "zht": "開啟練歌房", "es": "Abrir karaoke"},
 kdesc:{"ko": "금영 노래방 공식 영상으로 바로 부르는 온라인 노래방", "en": "Sing right away with official KY karaoke videos", "ja": "KY公式カラオケ動画ですぐ歌えるオンラインカラオケ", "zhs": "用金永(KY)官方卡拉OK视频马上开唱", "zht": "用金永(KY)官方卡拉OK影片馬上開唱", "es": "Canta al instante con vídeos oficiales de karaoke KY"},
 copied:{ko:"링크를 복사했습니다:",en:"Link copied:",ja:"リンクをコピーしました:",zhs:"已复制链接:",zht:"已複製連結:",es:"Enlace copiado:"}};
function shareOpen(){ try{ ntap("_app","share"); }catch(e){}
  var u="https://karaoke.moneypuzzle.co.kr/", iu=u+"?install=1", txt=window.LANG==="ko"?"머니퍼즐 노래방 · Money Puzzle Karaoke":"Money Puzzle Karaoke · 머니퍼즐 노래방", e=encodeURIComponent;
  var it=[["X",SHI.x,"https://twitter.com/intent/tweet?text="+e(txt)+"&url="+e(u)],
    [L(SH.sms),SHI.sms,"sms:?&body="+e(txt+" "+u+"\n"+L(SH.kinst)+": "+iu)],
    [L(SH.tg),SHI.tg,"https://t.me/share/url?url="+e(u)+"&text="+e(txt+"\n"+L(SH.kinst)+": "+iu)],
    ["LINE",SHI.line,"https://social-plugins.line.me/lineit/share?url="+e(u)],
    [L(SH.fb),SHI.fb,"https://www.facebook.com/sharer/sharer.php?u="+e(u)],
    [L(SH.band),SHI.band,"https://band.us/plugin/share?body="+e(txt+"\n"+u+"\n"+L(SH.kinst)+": "+iu)+"&route="+e(u)],
    ["WhatsApp",SHI.wa,"https://api.whatsapp.com/send?text="+e(txt+" "+u+"\n"+L(SH.kinst)+": "+iu)],
    [L(SH.mail),SHI.mail,"mailto:?subject="+e(txt)+"&body="+e(u+"\n"+L(SH.kinst)+": "+iu)],
    [L(SH.kakao),SHI.kakao,"#kakao"],[L(SH.copy),SHI.copy,"#copy"]];
  if(navigator.share) it.push([L(SH.other),SHI.other,"#share"]);
  var o=document.getElementById("karShr"); if(o) o.remove(); o=document.createElement("div"); o.id="karShr";
  o.innerHTML='<div class="shin"><div class="shhd">'+esc(L(SH.hd))+'</div><div class="shgrid">'+it.map(function(a){ var h=a[2];
      if(h.charAt(0)==="#") return '<button type="button" data-a="'+h.slice(1)+'">'+a[1]+' '+esc(a[0])+'</button>';
      return '<a href="'+esc(h)+'"'+(/^(sms|mailto):/.test(h)?'':' target="_blank" rel="noopener"')+'>'+a[1]+' '+esc(a[0])+'</a>'; }).join("")+'</div><div class="shmsg"></div></div>';
  document.body.appendChild(o);
  o.onclick=function(ev){ if(ev.target===o){ o.remove(); return; } var b=ev.target.closest&&ev.target.closest("button[data-a]"); if(!b) return; var m=o.querySelector(".shmsg");
    if(b.getAttribute("data-a")==="kakao"){   // 카카오 「친구에게 보내기」 — 받은 카톡에 「노래방 열기」·「앱 설치」 단추 (10-30)
      try{ if(!window.Kakao) throw 0; if(!Kakao.isInitialized()) Kakao.init("90a47ca48c2a967dd4d14b3b48de2e3b");
        Kakao.Share.sendDefault({objectType:"feed",content:{title:"머니퍼즐 노래방 · Money Puzzle Karaoke",description:L(SH.kdesc),imageUrl:"https://karaoke.moneypuzzle.co.kr/icon-512.png",link:{webUrl:u,mobileWebUrl:u}},buttons:[{title:L(SH.kopen),link:{webUrl:u,mobileWebUrl:u}},{title:L(SH.kinst),link:{webUrl:iu,mobileWebUrl:iu}}]}); return; }
      catch(x){ if(navigator.share){ navigator.share({title:txt,text:txt+"\n"+L(SH.kinst)+": "+iu,url:u}).catch(function(){}); return; } } }
    if(b.getAttribute("data-a")==="share"&&navigator.share){ navigator.share({title:txt,text:txt+"\n"+L(SH.kinst)+": "+iu,url:u}).catch(function(){}); return; }   // 카카오톡·다른 앱으로 — 폰 공유창, 안 되면 링크 복사
    try{ navigator.clipboard.writeText(u).then(function(){ m.textContent=L(SH.copied)+" "+u; },function(){ m.textContent=u; }); }catch(x){ m.textContent=u; } }; }
function reopen(){ var b=document.getElementById("karBox"), keepPay=b&&b.querySelector(".kpm"); if(keepPay){ deco(); return; }   // 결제 창이 열려 있으면 그 창은 karaoke.js 가 그 언어로 다시 그린다
  if(window.karClose) karClose(); if(window.karOpen) karOpen("site"); }
new MutationObserver(function(ms){ for(var i=0;i<ms.length;i++) for(var j=0;j<ms[i].addedNodes.length;j++){ var n=ms[i].addedNodes[j]; if(n.id==="karBox"){ deco(); return; } } }).observe(document.body,{childList:true});
var T0=Date.now(), PRE_MS=7000;   // 첫 화면 = 로고만 3초 → 로고+「Money Puzzle / StageSong」 4초 → 노래방 (사장님 10-30)
setTimeout(function(){ var t=document.getElementById("preT"); if(t) t.style.visibility="visible"; },3000);
function start(){ var w=PRE_MS-(Date.now()-T0); if(w>0&&!document.getElementById("karBox")){ clearTimeout(start._t); start._t=setTimeout(start,w); return; }
  var pre=document.getElementById("pre"); if(pre) pre.style.display="none";
  if(!document.getElementById("karBox")&&window.karOpen) karOpen("site");
  try{ ntap("kara_site","tap"); }catch(e){} }
// karaoke.js 는 ?karres= (토스에서 돌아옴)이면 0.7초 뒤 스스로 연다 — 그때는 먼저 열지 않는다
if(/[?&]karres=/.test(location.search)) setTimeout(function(){ var pre=document.getElementById("pre"); if(pre) pre.style.display="none"; if(!document.getElementById("karBox")) start(); },1500);
else if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start); else start();
// 노래방 닫기(뒤로가기 등)로 화면이 비면 다시 연다 — 이 사이트는 노래방뿐
setInterval(function(){ if(!document.getElementById("karBox")&&!/[?&]karres=/.test(location.search)) start(); },1500);
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
