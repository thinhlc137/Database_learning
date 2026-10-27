/* Exercises the live inspector against real SQL.js, including mutations and DDL. */
const assert=require('assert/strict');
module.exports=async function databaseBrowserTests(page){
 const run=async sql=>{await page.locator('#sql-editor').fill(sql);await page.locator('#sql-run').click();};
 const choose=async(name,schema='main')=>{const buttons=page.locator('.db-table-button'),keys=await buttons.evaluateAll(bs=>bs.map(b=>JSON.parse(b.dataset.table)));const index=keys.findIndex(k=>k[0]===schema&&k[1]===name);assert(index>=0,`Missing ${schema}.${name}`);await buttons.nth(index).click();};
 const reset=async()=>{await page.locator('#sql-reset').click();await page.waitForFunction(()=>!document.querySelector('#sql-run').disabled);};
 await page.locator('#sql-fixture').selectOption('company');await page.waitForFunction(()=>document.querySelectorAll('.db-table-button').length===6);
 assert.equal(await page.locator('#db-current-table').innerText(),'EMPLOYEE');assert.equal(await page.locator('#db-detail tbody tr').count(),9);
 assert.equal(await page.locator('#db-detail th .db-pk').count(),1);assert.equal(await page.locator('#db-detail th .db-fk').count(),2);
 await page.locator('[data-db-tab="schema"]').click();assert.match(await page.locator('#db-detail').innerText(),/Super_ssn/);assert.match(await page.locator('#db-detail').innerText(),/DEPARTMENT.Dnumber/);
 await page.locator('.db-parent').filter({hasText:'DEPARTMENT.Dnumber'}).click();assert.equal(await page.locator('#db-current-table').innerText(),'DEPARTMENT');assert.equal(await page.locator('#db-detail tbody tr').count(),4);
 await choose('EMPLOYEE');await page.locator('#db-preview').click();assert.equal(await page.locator('#sql-editor').inputValue(),'SELECT * FROM "main"."EMPLOYEE";');
 await run("UPDATE EMPLOYEE SET Salary=31001 WHERE Ssn='123456789'");assert.match(await page.locator('#db-detail tbody').innerText(),/31001/);
 await run("INSERT INTO EMPLOYEE(Fname,Lname,Ssn,Dno) VALUES('Test','Person','000000000',5)");assert.equal(await page.locator('#db-detail tbody tr').count(),10);
 await run("DELETE FROM EMPLOYEE WHERE Ssn='000000000'");assert.equal(await page.locator('#db-detail tbody tr').count(),9);
 // A failing second statement does not undo an earlier autocommitted update.
 await run("UPDATE EMPLOYEE SET Salary=31002 WHERE Ssn='123456789'; SELECT bad FROM missing;");assert.equal(await page.locator('#sql-result .error-box').count(),1);assert.match(await page.locator('#db-detail tbody').innerText(),/31002/);
 await run("BEGIN; UPDATE EMPLOYEE SET Salary=31003 WHERE Ssn='123456789';");assert.match(await page.locator('#db-detail tbody').innerText(),/31003/);
 await run('ROLLBACK');assert.match(await page.locator('#db-detail tbody').innerText(),/31002/);
 await reset();await choose('EMPLOYEE');assert.match(await page.locator('#db-detail tbody').innerText(),/30000/);assert.doesNotMatch(await page.locator('#db-detail tbody').innerText(),/31002/);
 await run('CREATE TABLE scratch(id INTEGER PRIMARY KEY, label TEXT); WITH RECURSIVE seq(n) AS (VALUES(1) UNION ALL SELECT n+1 FROM seq WHERE n<60) INSERT INTO scratch SELECT n,\'row-\'||n FROM seq;');
 await choose('scratch');assert.equal(await page.locator('#db-detail tbody tr').count(),25);assert.match(await page.locator('#db-row-count').innerText(),/1–25 \/ 60/);
 await page.locator('#db-next').click();assert.match(await page.locator('#db-row-count').innerText(),/26–50 \/ 60/);await page.locator('#db-next').click();assert.equal(await page.locator('#db-detail tbody tr').count(),10);
 await page.locator('#db-filter').fill('row-59');await page.waitForFunction(()=>document.querySelector('#db-row-count').textContent.includes('/ 1 hàng'));assert.match(await page.locator('#db-detail tbody').innerText(),/row-59/);
 await page.locator('#db-filter').fill("' OR 1=1 --");await page.waitForFunction(()=>document.querySelector('#db-detail .db-empty'));assert.equal(await page.locator('#db-detail tbody tr').count(),0);
 await run('ALTER TABLE scratch ADD COLUMN note TEXT;');await page.locator('[data-db-tab="schema"]').click();assert.match(await page.locator('#db-detail tbody').innerText(),/note/);
 await run('DROP TABLE scratch');assert.equal(await page.locator('.db-table-button').count(),6);assert.equal(await page.locator('#db-current-table').innerText(),'EMPLOYEE');
 await run('CREATE TABLE reference_case(d INTEGER REFERENCES department(Dnumber));');await choose('reference_case');await page.locator('[data-db-tab="schema"]').click();await page.locator('.db-parent').click();assert.equal(await page.locator('#db-current-table').innerText(),'DEPARTMENT');await run('DROP TABLE reference_case;');
 await run('CREATE TABLE "odd\"\"<name>"("a\"\"b" TEXT); INSERT INTO "odd\"\"<name>" VALUES(\'<img src=x onerror=alert(1)>\');');
 await choose('odd"<name>');assert.equal(await page.locator('#db-detail img').count(),0);assert.match(await page.locator('#db-detail tbody').innerText(),/<img src=x/);
 await page.locator('#db-preview').click();await page.locator('#sql-run').click();assert.equal(await page.locator('#sql-result .error-box').count(),0);
 await run('CREATE TEMP TABLE scratch_temp(x TEXT); INSERT INTO scratch_temp VALUES(\'temporary\');');await choose('scratch_temp','temp');assert.match(await page.locator('#db-detail').innerText(),/temporary/);
 await page.locator('#sql-fixture').selectOption('anime');await page.waitForFunction(()=>document.querySelectorAll('.db-table-button').length===12);assert.equal(await page.locator('#db-current-table').innerText(),'anime');
 await choose('anime_genre');assert.equal(await page.locator('#db-detail th .db-pk').count(),2);assert.equal(await page.locator('#db-detail th .db-fk').count(),2);
 await run('CREATE VIEW titles AS SELECT title FROM anime;');await choose('titles');assert.equal(await page.locator('#db-detail tbody tr').count(),4);
 await choose('studio');await run('DELETE FROM studio WHERE studio_id=1;');assert.equal(await page.locator('#sql-result .error-box').count(),1);assert.equal(await page.locator('#db-detail tbody tr').count(),2);
 await choose('rating');await run('DELETE FROM rating;');assert.match(await page.locator('#db-detail .db-empty').innerText(),/Bảng đang rỗng/);assert.equal(await page.locator('#db-detail th').count(),3);
 await reset();assert.equal(await page.locator('.db-table-button').count(),12);
 const viewport=page.viewportSize();await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await choose('episode');await page.locator('[data-db-tab="schema"]').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.setViewportSize(viewport);
 // Empty databases, CREATE after a drop, and fallback to a remaining table.
 await page.locator('#sql-fixture').selectOption('company');await page.waitForFunction(()=>document.querySelectorAll('.db-table-button').length===6);
 await run('PRAGMA foreign_keys=OFF; DROP TABLE DEPENDENT; DROP TABLE WORKS_ON; DROP TABLE PROJECT; DROP TABLE DEPT_LOCATIONS; DROP TABLE EMPLOYEE; DROP TABLE DEPARTMENT;');assert.equal(await page.locator('.db-table-button').count(),0);assert.match(await page.locator('#db-explorer').innerText(),/Database chưa có bảng/);
 await run('CREATE TABLE fresh(id INTEGER PRIMARY KEY);');await choose('fresh');assert.equal(await page.locator('#db-detail tbody tr').count(),0);await reset();assert.equal(await page.locator('.db-table-button').count(),6);
 console.log('PASS: live database explorer — fixtures, PK/FK, DML, DDL, rollback, partial failure, quoting, filtering, pagination, TEMP/view, empty DB, reset and mobile.');
};
