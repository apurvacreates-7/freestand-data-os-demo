/* router · reads ?t= (tab) and #n (step), renders chrome + screen + drawer, talks to the hub shell */
const TAB=+(new URLSearchParams(location.search).get("t")||1);
const STEPS=TAB===1?DATAOS:TAB===2?LIBRARY:SCALE;
const MENU=[["grp","Data"],["mi","Overview","overview","layers"],["mi","Sources and pipelines","ingest","database"],["mi","Identity resolution","identity","users"],["mi","Validation","validate","check"],["mi","Unified profiles","profile","usercheck"],["mi","Consent and storage","consent","shield"],
 ["grp","Audience"],["mi","Cohort builder","cohort","users2"],["mi","Saved cohorts","saved","star"],
 ["grp","Activation"],["mi","Destinations","activate","globe"],["mi","Value exchange library","library","gift"],["mi","Journeys","journeys","tree"],
 ["grp","Intelligence"],["mi","Measure","measure","chart"],["mi","Data health","health","bars"],
 ["grp","Admin"],["mi","Capacity and scale","scale","box"],["mi","Security and RBAC","security","key"]];
const RAIL=["layers","database","users","check","shield","users2","globe","gift","chart","box"];
let cur=0, drawerOpen=false;
function drawRail(on){ document.getElementById("rail").innerHTML='<div class="logo"><img src="assets/img/freestand-icon.svg" alt="FreeStand" style="width:22px;height:22px;object-fit:contain"/></div>'+RAIL.map((n,i)=>'<div class="ri'+(n===on?" on":"")+'">'+ic(n,15,"rgba(255,255,255,0.78)")+'</div>').join(""); }
function drawMenu(pg){ document.getElementById("menu").innerHTML='<div class="cons"><span>'+ic("layers",13,"#052762")+'</span>FreeStand Data OS</div>'+MENU.map(m=>m[0]==="grp"?'<div class="mgrp">'+m[1]+'</div>':'<div class="mi'+(m[2]===pg?" on":"")+'">'+ic(m[3],13,m[2]===pg?"#1D4ED8":"#9CA3AF")+m[1]+'</div>').join(""); }
function setDrawer(open){
  drawerOpen=open; const d=document.getElementById("drawer"); d.classList.toggle("open",open);
  document.getElementById("hood-tab").style.display=open?"none":"flex";
}
function show(){
  const i=Math.max(0,Math.min(STEPS.length-1,parseInt(location.hash.slice(1)||"0",10)||0));
  const st=STEPS[i]; cur=i; setDrawer(false);
  drawRail(st.rail||"layers"); drawMenu(st.menu);
  document.getElementById("ptitle").textContent=st.title; document.getElementById("crumb").textContent=st.crumb||"";
  document.getElementById("brandsel").innerHTML=(st.brand||"Mondelez · India")+ic("chevD",12,"#9CA3AF");
  document.getElementById("copbtn").innerHTML=ic("ai",13,"#fff")+"AI Copilot";
  const body=document.getElementById("body"); body.innerHTML=st.render()+ILL;
  const ins=document.getElementById("ins"); ins.className=st.insPos||""; ins.style.display=st.ins?"block":"none";
  if(st.ins) ins.innerHTML='<div class="k">'+st.ins[0]+'</div><div class="t">'+st.ins[1]+'</div>'+(st.ins[2]?'<div class="s">'+st.ins[2]+'</div>':"");
  document.getElementById("drawer-title").textContent=st.hood?st.hood[0]:"";
  document.getElementById("drawer-body").innerHTML=st.hood?st.hood[1]():"";
  document.getElementById("hood-tab").style.display=st.hood?"flex":"none";
  if(st.after) setTimeout(()=>st.after(body),50);
}
document.getElementById("hood-tab").onclick=()=>setDrawer(true);
document.getElementById("drawer-close").onclick=()=>setDrawer(false);
window.addEventListener("hashchange",show); window.addEventListener("load",show);
(function(){ let HUB=false; const emb=window.self!==window.top; if(emb){ window.addEventListener("message",e=>{ if(!e.data)return; if(e.data.hubHello)HUB=true; if(e.data.hubDrawer) setDrawer(!drawerOpen); }); try{ parent.postMessage({hubPing:true},"*"); }catch(e){} }
 const step=d=>{ if(HUB){ parent.postMessage({hubGo:d},"*"); return; } const i=Math.max(0,Math.min(STEPS.length-1,(parseInt(location.hash.slice(1)||"0",10)||0)+d)); location.hash=i; };
 window.addEventListener("keydown",e=>{ if(e.key==="ArrowRight"||e.key===" "){ step(1); e.preventDefault(); } else if(e.key==="ArrowLeft"){ step(-1); e.preventDefault(); } else if(e.key==="d"||e.key==="D"){ setDrawer(!drawerOpen); } else if(e.key==="Escape"){ setDrawer(false); } });
 const jump=i=>{ if(HUB){ parent.postMessage({hubJump:i},"*"); return; } location.hash=i; };
 document.addEventListener("click",e=>{ const m=e.target.closest("[data-mech]"); if(m){ jump(+m.dataset.mech); } });
})();
