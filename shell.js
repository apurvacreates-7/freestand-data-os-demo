/* FreeStand demo hub · numbered-tab shell (same behaviour as the existing hubs) */
(function(){
const DEMOS=window.HUB_DEMOS;
const state=(()=>{ try{return JSON.parse(localStorage.getItem("fs-demo-hub-dataos")||"{}");}catch(e){return {};} })();
let sel=DEMOS.some(d=>d.id===state.sel)?state.sel:DEMOS[0].id, frame=state.frame||0;
function save(){ localStorage.setItem("fs-demo-hub-dataos",JSON.stringify({sel,frame})); }
function demo(){ return DEMOS.find(d=>d.id===sel); }
function segs(d){ return d.pages||[]; }
function nSteps(d){ return segs(d).reduce((a,s)=>a+s.steps.length,0); }
function locate(d,i){ let n=i; const S=segs(d); for(let k=0;k<S.length;k++){ const s=S[k]; if(n<s.steps.length) return {page:s.page,hash:(s.from||0)+n,label:s.steps[n]}; n-=s.steps.length; } const L=S[S.length-1], m=L.steps.length-1; return {page:L.page,hash:(L.from||0)+m,label:L.steps[m]}; }
const tabsEl=document.getElementById("hub-tabs"), sidebar=document.getElementById("hub-side-list"), stage=document.getElementById("hub-stage"), counter=document.getElementById("hub-counter"), label=document.getElementById("hub-label"), prevBtn=document.getElementById("hub-prev"), nextBtn=document.getElementById("hub-next");
function renderSidebar(){
  sidebar.innerHTML="";
  DEMOS.forEach((d,i)=>{
    const el=document.createElement("div"); el.className="hub-step"+(d.id===sel?" active":"");
    el.innerHTML='<div class="num">'+(i+1)+'</div><div class="lbl"><div class="t">'+d.name+'</div>'+(d.sub?'<div class="s">'+d.sub+'</div>':'')+'</div>';
    el.onclick=()=>{ sel=d.id; frame=0; save(); render(); };
    sidebar.appendChild(el);
  });
}
function fitFrame(box,w,h){
  const inner=box.querySelector("iframe"); if(!inner)return;
  let bw=box.clientWidth, bh=box.clientHeight;
  if(!bw||!bh){ const sw=stage.clientWidth-40, sh=stage.clientHeight-40; const s0=Math.min(sw/w,sh/h); bw=w*s0; bh=h*s0; }
  const s=Math.min(bw/w,bh/h); if(!(s>0)||!isFinite(s)){ requestAnimationFrame(()=>fitFrame(box,w,h)); return; }
  inner.style.transform="scale("+s+")"; inner.style.transformOrigin="top left";
  box.style.width=Math.round(w*s)+"px"; box.style.height=Math.round(h*s)+"px";
}
const fitObserver=new ResizeObserver(()=>{ const b=stage.querySelector(".hub-frame"); if(b){ const d=demo(); fitFrame(b,d.w||1280,d.h||832); } });
let pageBox=null, pageSrc=null;
function nav(f,len){ const i=DEMOS.findIndex(x=>x.id===sel); prevBtn.disabled=f===0&&i<=0; nextBtn.disabled=f===len-1&&i>=DEMOS.length-1; nextBtn.textContent=(f===len-1&&i<DEMOS.length-1)?"Next demo →":"Next →"; prevBtn.textContent=(f===0&&i>0)?"← Previous demo":"← Previous"; }
function renderTabs(d,f){
  const S=d.sections||[]; if(!S.length){ tabsEl.innerHTML=""; return; }
  const sorted=S.map((x,i)=>[x[1],i]).sort((a,b)=>a[0]-b[0]); let act=-1; sorted.forEach(x=>{ if(f>=x[0]) act=x[1]; });
  tabsEl.innerHTML=S.map((x,i)=>'<div class="hub-tab'+(i===act?" active":"")+'" data-at="'+x[1]+'"><span class="n">'+(i+1)+'</span>'+x[0]+'</div>').join("");
  tabsEl.querySelectorAll(".hub-tab").forEach(el=>{ el.onclick=()=>{ frame=+el.dataset.at; save(); renderStage(); }; });
}
function renderStage(){
  const d=demo(); const total=nSteps(d); frame=Math.max(0,Math.min(frame,total-1));
  const w=d.w||1280,h=d.h||832, loc=locate(d,frame);
  if(pageSrc!==loc.page||!stage.contains(pageBox)){
    stage.innerHTML=""; pageBox=document.createElement("div"); pageBox.className="hub-frame";
    const f=document.createElement("iframe"); f.src=loc.page+"#"+loc.hash; f.style.width=w+"px"; f.style.height=h+"px"; f.addEventListener("load",()=>fitFrame(pageBox,w,h));
    pageBox.appendChild(f); stage.appendChild(pageBox); pageSrc=loc.page;
    fitFrame(pageBox,w,h); fitObserver.disconnect(); fitObserver.observe(stage); requestAnimationFrame(()=>fitFrame(pageBox,w,h)); setTimeout(()=>fitFrame(pageBox,w,h),120);
  } else { try{ pageBox.firstChild.contentWindow.location.replace(loc.page+"#"+loc.hash); }catch(e){ pageBox.firstChild.src=loc.page+"#"+loc.hash; } }
  counter.textContent=(frame+1)+" / "+total; label.textContent=loc.label||""; nav(frame,total); renderTabs(d,frame);
}
window.addEventListener("resize",()=>{ const b=stage.querySelector(".hub-frame"); if(b){ const d=demo(); fitFrame(b,d.w||1280,d.h||832); } });
function jump(dir){ const i=DEMOS.findIndex(x=>x.id===sel), n=i+dir; if(n<0||n>=DEMOS.length)return; sel=DEMOS[n].id; const len=nSteps(DEMOS[n]); frame=dir>0?0:Math.max(0,len-1); save(); render(); }
function go(dir){ const d=demo(); const len=nSteps(d); const n=frame+dir; if(n<0||n>=len){ jump(dir); return; } frame=n; save(); renderStage(); }
function drawer(){ try{ pageBox.firstChild.contentWindow.postMessage({hubDrawer:true},"*"); }catch(e){} }
window.addEventListener("message",e=>{ if(!e.data)return; if(typeof e.data.hubGo==="number") go(e.data.hubGo); if(typeof e.data.hubJump==="number"){ frame=e.data.hubJump; save(); renderStage(); } if(e.data.hubPing&&e.source){ try{ e.source.postMessage({hubHello:true},"*"); }catch(x){} } if(e.data.hubRestart){ sel=DEMOS[0].id; frame=0; save(); render(); } });
prevBtn.onclick=()=>go(-1); nextBtn.onclick=()=>go(1);
window.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight"||e.key===" "){ go(1); e.preventDefault(); }
  else if(e.key==="ArrowLeft"){ go(-1); e.preventDefault(); }
  else if(e.key==="d"||e.key==="D"){ drawer(); }
  else if(e.key==="Home"){ frame=0; save(); renderStage(); }
  else if(e.key==="End"){ const len=nSteps(demo()); if(len){frame=len-1; save(); renderStage();} }
});
function render(){ renderSidebar(); renderStage(); }
render();
})();
