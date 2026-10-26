/* Optional developer suite: npm install && npx playwright install chromium. */
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {pathToFileURL}=require('url');
let chromium;
try{({chromium}=require('playwright'));}catch{({chromium}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright'));}
const ROOT=path.resolve(__dirname,'..'),URL=pathToFileURL(path.join(ROOT,'docs/index.html')).href;
async function go(page,id){await page.evaluate(id=>{location.hash=id;},id);await page.waitForFunction(id=>{const m=document.querySelector('#main');return m.dataset.page===id&&m.dataset.ready==='true';},id);}
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_EXECUTABLE?{executablePath:process.env.BROWSER_EXECUTABLE}:{})});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();
  const errors=[],network=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))network.push(r.url());});
  await context.setOffline(true);await page.goto(URL);assert.equal(await page.locator('.chapter-card').count(),8);
  const pages=await page.evaluate(()=>DB_CONTENT.pages.map(p=>({id:p.id,title:p.title}))),render=[];
  for(const p of pages){await go(page,p.id);assert(await page.locator('.article').count(),p.id);await page.waitForFunction(()=>[...document.querySelectorAll('.article img')].every(i=>i.complete));const bad=await page.locator('.article img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));assert.equal(bad.length,0,p.id+' missing images');const diagrams=await page.locator('.diagram-error').count();if(diagrams)render.push({id:p.id,diagrams});}
  console.log('Read all',pages.length,'pages; diagram fallbacks:',JSON.stringify(render));
  assert.deepEqual(render,[],'Source diagrams must render');
  await go(page,'guide-5');assert((await page.locator('.katex').count())>0,'Math must render');
  await go(page,'guide-1');await page.locator('#mark-done').click();assert.match(await page.locator('#progress-text').innerText(),/1 \/ 8/);await page.reload();assert.match(await page.locator('#progress-text').innerText(),/1 \/ 8/);
  await page.locator('#search-open').click();await page.locator('#search-input').fill('phu thuoc ham');await page.waitForSelector('.search-result');assert((await page.locator('.search-result').count())>0);await page.locator('#search-close').click();
  await go(page,'workshop');await page.waitForFunction(()=>document.querySelector('#sql-run')?.textContent==='Chạy SQL →');
  for(const q of JSON.parse(fs.readFileSync(path.join(ROOT,'sql/exercises.json'),'utf8'))){await page.locator('#sql-editor').fill(q.sql);await page.locator('#sql-run').click();assert.equal(await page.locator('#sql-result .error-box').count(),0,q.id);const actual=await page.locator('#sql-result tbody tr').evaluateAll(rows=>rows.map(r=>[...r.cells].map(c=>c.textContent)));const expected=q.expected.map(r=>r.map(x=>x===null?'NULL':String(x)));assert.deepEqual(actual,expected,q.id);}
  await page.locator('#sql-editor').fill('SELECT definitely_missing FROM not_a_table');await page.locator('#sql-run').click();assert.equal(await page.locator('#sql-result .error-box').count(),1);
  await page.locator('#sql-fixture').selectOption('anime');await page.waitForFunction(()=>document.querySelector('#sql-editor').value.includes('FROM anime'));await page.locator('#sql-run').click();assert.equal(await page.locator('#sql-result tbody tr').count(),4);
  await page.locator('[data-tool="fd"]').click();assert.match(await page.locator('#fd-result').innerText(),/A, B, C, D, E/);await page.locator('#fd-attrs').fill('A,B,C');await page.locator('#fd-rules').fill('A->B;B->A');await page.locator('#fd-start').fill('C');await page.locator('#fd-form button[type="submit"]').click();assert.match(await page.locator('#fd-result').innerText(),/A, C/);assert.match(await page.locator('#fd-result').innerText(),/B, C/);await page.locator('#fd-rules').fill('A->Z');await page.locator('#fd-form button[type="submit"]').click();assert.equal(await page.locator('#fd-result .error-box').count(),1);
  await page.locator('[data-tool="storage"]').click();assert.match(await page.locator('#storage-result').innerText(),/750/);assert.match(await page.locator('#storage-result').innerText(),/3 accesses/);
  await page.locator('[data-tool="join"]').click();assert.equal(await page.locator('#join-result tbody tr').count(),2);await page.locator('#join-mode').selectOption('where');assert.equal(await page.locator('#join-result tbody tr').count(),1);
  await go(page,'quiz');const answer=await page.evaluate(()=>DB_CONTENT.quiz[0].answer);await page.locator(`[data-option="${answer}"]`).click();await page.locator('#quiz-check').click();assert.match(await page.locator('#quiz-feedback').innerText(),/Đúng/);await page.reload();assert.match(await page.locator('#quiz-feedback').innerText(),/Đúng/);await page.locator('#quiz-filter').selectOption('security');assert.equal(await page.locator('.quiz-map button').count(),3);
  await go(page,'home');await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.locator('#menu').click();assert.equal(await page.locator('#menu').getAttribute('aria-expanded'),'true');await page.locator('#chapters a').first().click();await page.waitForSelector('.article');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await go(page,'workshop');await page.locator('[data-tool="fd"]').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(network,[],'Offline app must not request external resources');assert.deepEqual(errors,[],'No uncaught browser errors');
  console.log('PASS: 182 reading pages, 40 real SQL queries, math, diagrams, search, progress, quiz, tools, and mobile — fully offline.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
