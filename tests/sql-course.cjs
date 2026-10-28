/* Exercise the actual lesson controls, SQL engine, links and isolation offline. */
const assert=require('assert/strict');
module.exports=async function(page,go){
 const examples=await page.evaluate(()=>DB_CONTENT.sqlCourseExamples);
 let current;
 for(const example of examples){
  if(current!==example.page){await go(page,example.page);current=example.page;}
  const box=page.locator(`[data-example="${example.id}"]`);
  await box.locator('.course-run').click();
  await box.locator('.course-match').waitFor();
  const actual=await box.locator('.course-output table').evaluateAll(tables=>tables.map(t=>[...t.tBodies[0].rows].map(r=>[...r.cells].map(c=>c.textContent))));
  const expected=example.expected.map(rows=>rows.map(row=>row.map(v=>v===null?'NULL':String(v))));
  assert.deepEqual(actual,expected,example.id);
 }
 await go(page,'guide-6');
 const unavailable=await page.locator('#article a.unavailable').allTextContents();
 assert.deepEqual(unavailable,[],'Course roadmap links must be reachable');
 await page.locator('#article a[href="#sql-04"]').click();
 await page.waitForFunction(()=>document.querySelector('#main').dataset.page==='sql-04');
 await page.locator('#pager a').first().click();
 await page.waitForFunction(()=>document.querySelector('#main').dataset.page==='sql-03');
 await go(page,'sql-01');
 assert.equal(await page.locator('#article img').evaluateAll(xs=>xs.every(x=>x.complete&&x.naturalWidth>0)),true);
 const box=page.locator('[data-example="S01"]');
 await box.locator('.course-edit summary').click();
 await box.locator('textarea').fill("SELECT '<img src=x onerror=alert(1)>' AS value;");
 await box.locator('.course-run').click();await box.locator('.course-edited').waitFor();
 assert.equal(await box.locator('.course-output img').count(),0);
 assert.match(await box.locator('.course-output').innerText(),/<img src=x/);
 await box.locator('textarea').fill('SELECT not_a_column FROM EMPLOYEE;');
 await box.locator('.course-run').click();await box.locator('.error-box').waitFor();
 assert.equal(await box.locator('.course-run').isEnabled(),true);
 await box.locator('.course-reset').click();await box.locator('.course-run').click();await box.locator('.course-match').waitFor();
 // A lesson UPDATE must not change the playground's connection, and vice versa.
 await go(page,'workshop');await page.waitForFunction(()=>document.querySelector('#sql-run')?.disabled===false);
 await page.locator('#sql-fixture').selectOption('company');
 await page.waitForFunction(()=>document.querySelector('#sql-editor').value.includes('FROM EMPLOYEE'));
 await page.locator('#sql-editor').fill("UPDATE EMPLOYEE SET Salary=12345 WHERE Ssn='123456789';");
 await page.locator('#sql-run').click();
 await go(page,'sql-09');
 const mutating=page.locator('[data-example="S40"]');
 await mutating.locator('.course-run').click();await mutating.locator('.course-match').waitFor();
 await mutating.locator('.course-run').click();await mutating.locator('.course-match').waitFor();
 await go(page,'workshop');await page.waitForFunction(()=>document.querySelector('#sql-run')?.disabled===false);
 await page.locator('#sql-editor').fill("SELECT Salary FROM EMPLOYEE WHERE Ssn='123456789';");await page.locator('#sql-run').click();
 assert.equal(await page.locator('#sql-result td').innerText(),'12345');
 await page.locator('#sql-reset').click();await page.waitForFunction(()=>document.querySelector('#sql-run')?.disabled===false);
 await page.locator('#search-open').click();await page.locator('#search-input').fill('XACT_STATE');await page.waitForSelector('.search-result[href="#sql-16"]');await page.locator('#search-close').click();
 await go(page,'sql-server-setup');assert.equal(await page.locator('#article a.unavailable').count(),0);
 await page.setViewportSize({width:390,height:844});await go(page,'sql-06');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Mobile course page overflow');
 await page.locator('[data-example="S23"] .course-run').click();await page.locator('[data-example="S23"] .course-match').waitFor();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Mobile result table overflow');
 await page.setViewportSize({width:1440,height:1000});
 console.log('PASS: 43 editable lesson examples, outputs, empty sets, reset, errors, escaping, links, search, connection isolation and mobile.');
};
