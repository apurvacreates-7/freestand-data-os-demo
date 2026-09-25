const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
const [W,H,out]=[+(process.argv[2]||1440),+(process.argv[3]||900),process.argv[4]||'qa/s'];
(async()=>{
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:W,height:H}});
  const errs=[]; p.on('pageerror',e=>errs.push('PAGEERROR '+e.message.slice(0,200))); p.on('console',m=>{ if(m.type()==='error') errs.push('CONSOLE '+m.text().slice(0,200)); });
  await p.goto('http://localhost:8790/index.html'); await p.waitForTimeout(2500);
  const tabs=await p.locator('.hub-step').count(); const t0=Date.now(); let clicks=0;
  for(let d=0; d<tabs; d++){
    await p.locator('.hub-step').nth(d).click(); await p.waitForTimeout(1200); await p.keyboard.press('Home'); await p.waitForTimeout(800);
    const total=+((await p.locator('#hub-counter').textContent()).match(/\/\s*(\d+)/)||[0,0])[1];
    for(let i=1;i<=total;i++){
      await p.waitForTimeout(d===0?4200:1800);
      await p.screenshot({path:`${out}_t${d+1}_${String(i).padStart(2,'0')}.png`});
      // overflow / clipping check inside the stage iframe
      const fr=p.frames().find(f=>f.url().includes('stage.html'));
      if(fr){ const r=await fr.evaluate(()=>{ const out=[]; const body=document.getElementById('body'); const br=body.getBoundingClientRect(); body.querySelectorAll('*').forEach(el=>{ const c=el.getBoundingClientRect(); if(c.width>0&&(c.right>br.right+1||c.bottom>br.bottom+1)) out.push(el.className||el.tagName); }); return {over:[...new Set(out)].slice(0,4), sh:body.scrollHeight, ch:body.clientHeight}; }); if(r.over.length||r.sh>r.ch+2) console.log(`  t${d+1} s${i} OVERFLOW`, JSON.stringify(r)); }
      if(d===0){ // drawer
        await p.keyboard.press('d'); await p.waitForTimeout(600); await p.screenshot({path:`${out}_t${d+1}_${String(i).padStart(2,'0')}_drawer.png`}); await p.keyboard.press('d'); await p.waitForTimeout(300);
      }
      if(i<total){ await p.locator('#hub-next').click(); clicks++; }
    }
    console.log('tab',d+1,'steps',total);
  }
  console.log('errors:',errs.length?errs.join('\n'):'none'); await b.close();
})();
