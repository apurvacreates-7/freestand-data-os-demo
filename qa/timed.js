const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim()+'/playwright');
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1440,height:900}});
  await p.goto('http://localhost:8790/index.html'); await p.waitForTimeout(1500); await p.locator('.hub-step').nth(0).click(); await p.waitForTimeout(800); await p.keyboard.press('Home'); await p.waitForTimeout(500);
  const t0=Date.now(); for(let i=1;i<12;i++){ await p.waitForTimeout(8000); await p.locator('#hub-next').click(); } await p.waitForTimeout(8000);
  console.log('Tab 1 timed run · Next only · 8 s per step:', ((Date.now()-t0)/1000).toFixed(0),'s'); await b.close(); })();
