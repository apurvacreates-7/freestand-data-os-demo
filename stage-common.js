/* shared building blocks for every screen · plain functions returning HTML strings */
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
const sec=(t,s,body,tools,style)=>'<div class="sec fade"'+(style?' style="'+style+'"':'')+'><div class="sh"><div><div class="t">'+t+'</div>'+(s?'<div class="s">'+s+'</div>':'')+'</div>'+(tools?'<div class="tools">'+tools+'</div>':'')+'</div>'+body+'</div>';
const stat=(v,l,d,i)=>'<div class="stat fade" style="animation-delay:'+((i||0)*.07)+'s"><div class="v">'+v+'</div><div class="l">'+l+'</div>'+(d?'<div class="d">'+d+'</div>':'')+'</div>';
const kv=(k,v)=>'<div class="kv"><div class="k">'+k+'</div><div class="v">'+v+'</div></div>';
const pill=(t,k)=>'<span class="pill'+(k||"B")+'">'+t+'</span>';
const tag=(t,k)=>'<span class="tag'+(k?" tag"+k:"")+'">'+t+'</span>';
const table=(head,rows,cls)=>'<table class="dt'+(cls?" "+cls:"")+'"><tr>'+head.map(h=>'<th>'+h+'</th>').join("")+'</tr>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join("")+'</tr>').join("")+'</table>';
const bars=(rows,max,color)=>rows.map((r,i)=>'<div class="sbar-row"><span class="l">'+r[0]+'</span><span class="b"><i style="width:'+Math.round(r[1]/(max||Math.max(...rows.map(x=>x[1])))*100)+'%;background:'+(color||"#052762")+';animation-delay:'+(i*.06)+'s"></i></span><span class="v">'+(r[2]!=null?r[2]:r[1].toLocaleString("en-IN"))+'</span></div>').join("");
const ring=(pct,label,color)=>{ const off=314-314*pct/100; return '<div class="ring"><svg width="96" height="96" viewBox="0 0 110 110"><circle class="bg" cx="55" cy="55" r="50"/><circle class="fg" cx="55" cy="55" r="50" style="stroke-dashoffset:'+off+(color?';stroke:'+color:'')+'"/></svg><div class="v">'+pct+'%<small>'+(label||"complete")+'</small></div></div>'; };
const code=(s)=>'<pre>'+s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/("[^"]*")(?=\s*:)/g,'<span class="hk">$1</span>').replace(/:\s*("[^"]*"|\d[\d.,]*)/g,m=>': <span class="hl">'+m.slice(m.indexOf(':')+1).trim()+'</span>')+'</pre>';
const dcard=(t,body)=>'<div class="sec"><div class="sh"><div class="t" style="font-size:12px">'+t+'</div></div>'+body+'</div>';
const ILL='<div class="ill">Illustrative data · synthetic · PII masked</div>';
/* phone frame with WhatsApp or microsite content */
function phone(inner,kind,brand){
  const wa=kind!=="site";
  return '<div class="phone"><div class="scr"><div class="notch"></div><div class="sbar" style="'+(wa?'':'color:#111')+'"><span>9:41</span><span>●●● ▲ ▮▮</span></div>'
   +(wa?'<div class="wa-h" style="padding-top:36px;height:auto"><div class="a">'+(brand||"CD")+'</div><div><b>'+(brand==="OR"?"Oreo India":brand==="BV"?"Bournvita":brand==="JC"?"Joy Club":"Cadbury India")+' ✓</b><small>Official business account</small></div></div><div class="wa-c">'+inner+'</div><div class="wa-i"><div class="f">Type a message</div><span style="width:28px;height:28px;border-radius:50%;background:#075E54;display:inline-block"></span></div>'
   :'<div class="ms-h">'+(brand||"Cadbury")+'<span class="mut" style="margin-left:auto;font-weight:400;font-size:10px">powered by FreeStand</span></div><div class="ms-b">'+inner+'</div>')
   +'</div></div>';
}
const wb=(t,opts,me,i)=>'<div class="wb'+(me?" me":"")+'" style="animation-delay:'+((i||0)*.25)+'s">'+t+(opts?opts.map(o=>'<div class="btn">'+o+'</div>').join(""):"")+'</div>';
/* lightweight count-up */
function countUp(el,to,ms){ const start=performance.now(), from=0; const f=n=>n.toLocaleString("en-IN"); (function tick(now){ const p=Math.min(1,(now-start)/(ms||900)); const v=Math.round(from+(to-from)*(1-Math.pow(1-p,3))); el.textContent=f(v); if(p<1) requestAnimationFrame(tick); })(start); }
const lakh=n=>n>=10000000?(n/10000000).toFixed(1).replace(/\.0$/,"")+" Cr":n>=100000?(n/100000).toFixed(1).replace(/\.0$/,"")+"L":n.toLocaleString("en-IN");
