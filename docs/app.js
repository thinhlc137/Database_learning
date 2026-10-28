/* Offline reader. All content and dependencies are local; no network requests. */
'use strict';
const D=window.DB_CONTENT, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();
const pageById=new Map(D.pages.map(p=>[p.id,p]));
const groups=new Map(D.groups.map(g=>[g.id,g]));
const desc=['DBMS, schema, ba tầng và độc lập dữ liệu.','Entity, attribute, cardinality và Chen notation.','Subclass, total/partial và category.','Từ ER/EER đến PK, FK và semantic constraints.','Selection, projection, join và division.','SQL căn bản đến T-SQL: 18 bài chi tiết theo 157 slide.','Bao đóng, candidate keys, 3NF và BCNF.','Block, file organization, B+ tree và chi phí I/O.'];
let saved={done:[],quiz:{},last:'home'};
try{saved={...saved,...JSON.parse(localStorage.getItem('db-lab-v1')||'{}')};}catch{}
if(!Array.isArray(saved.done))saved.done=[];
if(!saved.quiz||typeof saved.quiz!=='object')saved.quiz={};
function persist(){try{localStorage.setItem('db-lab-v1',JSON.stringify(saved));}catch{}}
function toast(s){$('#toast').textContent=s;$('#toast').style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').style.display='none',2500);}
function progress(){const n=D.groups.slice(0,8).filter(g=>saved.done.includes(g.guide)).length;$('#progress-text').textContent=`${n} / 8`;$('#progress-bar').style.width=`${n/8*100}%`;}
function navigation(route){
 $('#chapters').innerHTML=D.groups.slice(0,8).map((g,i)=>`<a href="#${g.guide}" class="${route===g.guide||route.startsWith(g.id+'-')||(g.id==='c6'&&(route.startsWith('sql-')))?'active':''}"><span class="chapter-num">${String(i+1).padStart(2,'0')}</span><span>${esc(g.title)}</span>${saved.done.includes(g.guide)?'<span class="done-dot">✓</span>':''}</a>`).join('');
 const extra=[['guide-6','SQL chi tiết · 18 bài mới'],['guide-final','Ôn cuối kỳ & lộ trình'],['guide-advanced','Security & Advanced'],['lab-1','Bắt đầu thực hành'],['lab-3','40 bài SQL có lời giải'],['lab-6','Anime capstone']];
 $('#extras').innerHTML=extra.map(([id,title])=>`<a href="#${id}" class="${route===id?'active':''}">${esc(title)}</a>`).join('');
 $$('.main-nav a').forEach(a=>a.classList.toggle('active',a.dataset.nav===route));progress();
}
function home(){
 $('#main').dataset.ready='true';
 const previous=pageById.has(saved.last)?saved.last:'guide-1';
 $('#main').innerHTML=`<section class="hero"><div><div class="eyebrow">TỪ NỀN TẢNG ĐẾN THỰC HÀNH</div><h1>Hiểu dữ liệu.<br><em>Làm chủ Database.</em></h1><p>Một góc học tập bằng tiếng Việt: đọc sâu lý thuyết, nhìn rõ từng ví dụ và tự tay kiểm chứng bằng SQL.</p><div class="hero-actions"><a class="button primary" href="#${previous}">${previous==='guide-1'?'Bắt đầu học':'Tiếp tục bài học'} <span>↗</span></a><a class="button" href="#workshop">Mở xưởng tương tác <span>→</span></a></div></div><div class="hero-art" aria-label="Minh họa hai bảng và truy vấn SQL"><div class="hero-board"><div class="board-top"><span><i class="board-dot"></i> A LITTLE STRUCTURE. A LOT OF CLARITY.</span><span>01 / 08</span></div><div class="schema-mini"><div class="mini-card"><strong>EMPLOYEE</strong><div><b>PK</b> Ssn<br>Fname<br><b>FK</b> Dno</div></div><div class="mini-link">⟶</div><div class="mini-card"><strong>DEPARTMENT</strong><div><b>PK</b> Dnumber<br>Dname<br>Mgr_ssn</div></div></div><div class="board-code"><span class="kw">SELECT</span> e.Fname, d.Dname<br><span class="kw">FROM</span> EMPLOYEE e<br><span class="kw">JOIN</span> DEPARTMENT d <span class="kw">ON</span> e.Dno = d.Dnumber;</div></div><div class="floating-chip"><span>●</span> Đọc → thử → hiểu vì sao</div></div></section>
 <section class="stats" aria-label="Nội dung project"><div class="stat"><strong>08 + 01</strong><span>Chương nền tảng & tổng ôn</span></div><div class="stat"><strong>40</strong><span>Bài SQL có kết quả đối chiếu</span></div><div class="stat"><strong>50</strong><span>Câu tự luyện có giải thích</span></div><div class="stat"><strong>100%</strong><span>Nội dung chạy offline</span></div></section>
 <a class="course-banner" href="#guide-6"><div><small>KHÓA SQL MỞ RỘNG · 4A + 4B</small><h2>Đọc sâu SQL. Tự tay kiểm chứng.</h2><p>18 bài · 157 slide được đối chiếu · 43 ví dụ chạy ngay trong bài · 20 bài tổng hợp · SQL Server lab</p></div><span>Vào học →</span></a><section><div class="section-head"><div><h2>Lộ trình của bạn</h2><p>Đi từ câu hỏi “vì sao” đến khả năng tự thiết kế và truy vấn.</p></div><a href="#guide-final">Xem kế hoạch ôn thi →</a></div><div class="chapters-grid">${D.groups.slice(0,8).map((g,i)=>`<a class="chapter-card" href="#${g.guide}"><div class="card-top"><span>CHƯƠNG ${String(i+1).padStart(2,'0')}</span><span class="card-tag">${saved.done.includes(g.guide)?'ĐÃ HỌC':'CORE'}</span></div><h3>${esc(g.title)}</h3><p>${desc[i]}</p><div class="card-bottom"><span>${g.sourcePages} phần tài liệu gốc</span><span>Khám phá ↗</span></div></a>`).join('')}</div></section>
 <div class="home-bottom"><div class="feature-card"><div><small>HỌC BẰNG CÁCH LÀM</small><h3>Biến lý thuyết thành kết quả</h3><p>SQL chạy thật · Bao đóng & khóa · Storage · JOIN</p></div><a href="#workshop" aria-label="Mở công cụ tương tác">↗</a></div><div class="feature-card"><div><small>TỰ KIỂM TRA KIẾN THỨC</small><h3>Không chỉ nhớ đáp án</h3><p>50 câu hỏi, giải thích và bộ lọc theo chủ đề.</p></div><a href="#quiz" aria-label="Mở bộ câu hỏi">↗</a></div></div><div class="source-note">Nhập đủ <b>9 file Markdown · ${D.manifest.reduce((n,x)=>n+x.lines,0).toLocaleString('vi-VN')} dòng</b>. Tài liệu ôn do người dùng cung cấp; xem <a href="#editorial">chú giải, dialect và phạm vi kiểm chứng</a>.</div>`;
}
function slug(s){return s.toLowerCase().replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}\s_-]/gu,'').trim().replace(/\s+/g,'-');}
function markdownHTML(source){
 const math=[];
 const protectedParts=source.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
 const masked=protectedParts.map((part,i)=>{
  if(i%2)return part;
  return part.replace(/\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)|\$(?!\s)([^$\n]+?\S|[^$\n\s])\$/g,(match,a,b,c,d)=>{
   const formula=a??b??c??d;const display=a!==undefined||b!==undefined;
   let html;
   try{html=katex.renderToString(formula,{displayMode:display,throwOnError:false,strict:false,trust:false});}catch{html=`<code class="math-fallback">${esc(formula)}</code>`;}
   const id=math.push(html)-1;return `ZZMATH${id}ZZ`;
  });
 }).join('');
 let html=marked.parse(masked,{gfm:true,breaks:false});
 html=html.replace(/ZZMATH(\d+)ZZ/g,(_,i)=>math[Number(i)]);
 const template=document.createElement('template');template.innerHTML=html;
 template.content.querySelectorAll('img').forEach(e=>{const src=e.getAttribute('src')||'';if(/^(?:\.\.\/)+docs\/assets\//.test(src))e.setAttribute('src',src.replace(/^(?:\.\.\/)+docs\/assets\//,'assets/'));});
 template.content.querySelectorAll('script,iframe,object,embed,style,form').forEach(e=>e.remove());
 template.content.querySelectorAll('*').forEach(e=>{for(const attr of [...e.attributes]){if(attr.name.toLowerCase().startsWith('on')||(['href','src'].includes(attr.name)&&/^\s*(javascript|vbscript):/i.test(attr.value)))e.removeAttribute(attr.name);}});
 return template.innerHTML;
}
let routeEpoch=0;
async function readPage(p,epoch){
 const g=groups.get(p.group),isSource=p.kind==='source';
 $('#main').innerHTML=`<div class="page-header"><div class="eyebrow">${isSource?'TÀI LIỆU ĐẦY ĐỦ · '+esc(g?.file||''):'HƯỚNG DẪN HỌC & THỰC HÀNH'}</div><h1>${esc(p.title.replace(/[*`]/g,''))}</h1><div class="page-subtitle">${isSource?'Một phần được tách để dễ đọc; toàn bộ nội dung nguồn vẫn được giữ trong project.':'Đọc ví dụ → tự làm bài → mở lời giải → đối chiếu với tài liệu đầy đủ.'}</div><div class="page-actions">${!isSource&&(/^guide-[1-8]$/.test(p.id)||p.course)?`<button id="mark-done">${saved.done.includes(p.id)?'✓ Đã học xong':'Đánh dấu đã học'}</button>`:''}<button id="print-page">In bài đang mở</button><button id="download-page">Tải Markdown bài này ↓</button>${g?`<a class="button" href="#${g.guide}">Lộ trình chương ↗</a>`:''}</div></div>
 ${isSource?'<div class="source-note">Phần gốc có thể dùng thuật ngữ, dialect hoặc nhận định về kỳ thi cần đối chiếu. <a href="#editorial">Đọc chú giải quan trọng</a>. Hai PowerPoint 4A/4B được giải thích trong khóa SQL mới; các PDF/quiz khác được dẫn tên chưa được cung cấp.</div>':''}
 <div class="reader-grid"><article class="article" id="article">${markdownHTML(p.markdown)}</article><nav class="toc" aria-label="Mục lục trong bài"><div class="toc-title">TRONG BÀI NÀY</div><div id="toc-links"></div></nav></div><div id="source-sections"></div><div id="pager" class="pager"></div>`;
 $('#print-page').onclick=()=>window.print();
 $('#download-page').onclick=()=>{const blob=new Blob([p.markdown],{type:'text/markdown;charset=utf-8'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=p.id+'.md';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};
 if($('#mark-done'))$('#mark-done').onclick=()=>{saved.done=saved.done.includes(p.id)?saved.done.filter(x=>x!==p.id):[...saved.done,p.id];persist();navigation(p.id);$('#mark-done').textContent=saved.done.includes(p.id)?'✓ Đã học xong':'Đánh dấu đã học';};
 if(p.course){const trail=document.createElement('div');trail.className='course-trail';trail.innerHTML=`<a href="#guide-6">← Mục lục 18 bài SQL</a><span>Bài ${D.sqlCourse.findIndex(x=>x.id===p.id)+1} / ${D.sqlCourse.length}</span>`;$('#article').before(trail);}
 const used={};
 $('#toc-links').innerHTML=$$('#article h1,#article h2,#article h3').map(h=>{let id=slug(h.textContent);const n=used[id]||0;used[id]=n+1;if(n)id+='-'+n;h.id=id;return h.tagName==='H1'?'':`<a href="#${encodeURIComponent(id)}" data-heading="${esc(id)}" class="level-${h.tagName.slice(1)}">${esc(h.textContent)}</a>`;}).join('');
 $$('[data-heading]').forEach(a=>a.onclick=e=>{e.preventDefault();document.getElementById(a.dataset.heading)?.scrollIntoView();});
 $$('#article table').forEach(t=>{const w=document.createElement('div');w.className='table-wrap';t.replaceWith(w);w.appendChild(t);});
 $$('#article pre').forEach(pre=>{if(pre.querySelector('.language-mermaid'))return;const b=document.createElement('button');b.className='copy';b.textContent='Sao chép';b.onclick=async()=>{const txt=pre.querySelector('code')?.textContent||'';try{await navigator.clipboard.writeText(txt);toast('Đã sao chép');}catch{const t=document.createElement('textarea');t.value=txt;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();toast('Đã sao chép');}};pre.appendChild(b);});
 SQLCourse.mount($('#article'),{examples:D.sqlCourseExamples,createDatabase:async()=>{const SQL=await engine(),db=new SQL.Database();try{db.run(D.fixtures.company);return db;}catch(error){db.close();throw error;}}});
 $$('#article a').forEach(a=>{
  const href=a.getAttribute('href')||'';
  if(/^https?:/i.test(href)){a.target='_blank';a.rel='noopener noreferrer';return;}
  if(href.startsWith('#')){a.onclick=e=>{e.preventDefault();let target;try{target=decodeURIComponent(href.slice(1));}catch{return;}if(pageById.has(target)){location.hash=target;return;}if(document.getElementById(target)){document.getElementById(target).scrollIntoView();return;}const same=D.pages.filter(x=>x.group===p.group);const found=same.find(x=>norm(slug(x.title))===norm(target)||norm(x.markdown).includes(norm(target.replace(/-/g,' '))));if(found)location.hash=found.id;else toast('Mục này thuộc phần khác; dùng tìm kiếm để mở.');};return;}
  let resolved;try{resolved=decodeURIComponent(new URL(href,'https://reader.local/'+p.file).pathname.slice(1));}catch{}
  const localPage=D.pages.find(x=>x.file===resolved);if(localPage){a.href='#'+localPage.id;return;}
  if(D.downloads.includes(resolved)){a.href='../'+resolved;a.download=resolved.split('/').pop();return;}
  const file=href.split('/').pop()?.split('#')[0];
  const group=D.groups.find(x=>x.file===file);
  if(group){a.href='#'+group.guide;return;}
  a.classList.add('unavailable');a.title='File được nhắc trong nguồn chưa nằm trong bộ upload';a.onclick=e=>{e.preventDefault();toast('File tham chiếu này chưa được cung cấp.');};
 });
 if(g&&!isSource&&!p.course&&p.id!=='sql-server-setup'){const sources=D.pages.filter(x=>x.group===g.id&&x.kind==='source');$('#source-sections').innerHTML=`<section class="source-list"><div class="section-head"><div><h2>Đọc sâu · ${esc(g.file)}</h2><p>${sources.length} phần đầy đủ từ file gốc; chọn phần muốn học.</p></div></div><div class="section-links">${sources.map(x=>`<a class="section-link" href="#${x.id}"><span>${esc(x.title.replace(/[*`]/g,''))}</span><span>↗</span></a>`).join('')}</div></section>`;}
 const sequence=p.course?D.sqlCourse.map(x=>pageById.get(x.id)):isSource?D.pages.filter(x=>x.group===p.group&&x.kind==='source'):D.groups.slice(0,8).map(x=>pageById.get(x.guide));const index=sequence.findIndex(x=>x.id===p.id);
 $('#pager').innerHTML=(index>0?`<a href="#${sequence[index-1].id}">← ${esc(sequence[index-1].title.replace(/[*`]/g,''))}</a>`:'<span></span>')+(index>=0&&index<sequence.length-1?`<a href="#${sequence[index+1].id}">${esc(sequence[index+1].title.replace(/[*`]/g,''))} →</a>`:'');
 const diagrams=$$('#article code.language-mermaid');
 for(let i=0;i<diagrams.length;i++){
  if(epoch!==routeEpoch)return;
  const code=diagrams[i],pre=code.parentElement,source=code.textContent;
  try{const renderSource=source.replace(/^(\s*[A-Za-z_]\w*\s*)\{\s*(.+?)\s*\}\s*$/gm,(_,head,body)=>head+'{\n'+body.split(';').map(x=>'  '+x.trim()).filter(x=>x.trim()).join('\n')+'\n}');const out=await mermaid.render(`diagram-${epoch}-${i}`,renderSource);if(epoch!==routeEpoch)return;const w=document.createElement('div');w.className='mermaid-wrap';w.innerHTML=out.svg;pre.replaceWith(w);}catch{if(epoch!==routeEpoch)return;document.getElementById(`ddiagram-${epoch}-${i}`)?.remove();const hint=document.createElement('p');hint.className='diagram-error';hint.textContent='Sơ đồ nguồn chưa render được; mã Mermaid được giữ để đối chiếu.';pre.after(hint);}
 }
 if(epoch===routeEpoch)$('#main').dataset.ready='true';
}
function parseAttrs(text){const a=[...new Set(text.split(',').map(x=>x.trim()).filter(Boolean))];if(!a.length||a.length>12)throw Error('Nhập 1–12 thuộc tính, phân cách bằng dấu phẩy.');return a;}
function parseFDs(text,attrs){return text.split(';').filter(x=>x.trim()).map(x=>{const p=x.replace(/→/g,'->').split('->');if(p.length!==2)throw Error('Định dạng FD: A,B->C; C->D');const left=parseAttrs(p[0]),right=parseAttrs(p[1]);if([...left,...right].some(a=>!attrs.includes(a)))throw Error('FD chứa thuộc tính ngoài R.');return {left,right};});}
function closure(start,fds){const known=new Set(start),trace=[{rule:'Khởi tạo',known:[...known].sort()}];let changed=true;while(changed){changed=false;for(const f of fds)if(f.left.every(x=>known.has(x))&&f.right.some(x=>!known.has(x))){f.right.forEach(x=>known.add(x));changed=true;trace.push({rule:f.left.join(',')+' → '+f.right.join(','),known:[...known].sort()});}}return {known,trace};}
function candidateKeys(attrs,fds){if(attrs.length>12)throw Error('Giới hạn 12 thuộc tính.');const keys=[];for(let size=0;size<=attrs.length;size++)for(let mask=0;mask<2**attrs.length;mask++){const x=attrs.filter((a,i)=>mask&(1<<i));if(x.length!==size||keys.some(k=>k.every(a=>x.includes(a))))continue;if(closure(x,fds).known.size===attrs.length)keys.push(x);}return keys;}
function storage(v){if(Object.values(v).some(x=>!Number.isSafeInteger(x)||x<=0||x>100000000))throw Error('Nhập số nguyên dương không quá 100 triệu.');const bfr=Math.floor(v.block/v.record),cap=Math.floor(v.block/(v.key+v.pointer));if(bfr<1||cap<2)throw Error('Record phải vừa block và index capacity phải ≥ 2.');const blocks=Math.ceil(v.records/bfr);let n=blocks,levels=[];do{const b=Math.ceil(n/cap);levels.push({entries:n,blocks:b});n=b;}while(n>1);return {bfr,cap,blocks,levels,accesses:levels.length+1};}
window.DBUtils={parseAttrs,parseFDs,closure,candidateKeys,storage,markdownHTML};
let tool='sql', sqlEnginePromise,sqlDB,sqlFixture='company';
function workshop(){
 $('#main').dataset.ready='true';
 $('#main').innerHTML=`<div class="page-header"><div class="eyebrow">HIỂU BẰNG CÁCH THAY ĐỔI DỮ LIỆU</div><h1>Xưởng tương tác</h1><p class="page-subtitle">Đổi một điều kiện. Quan sát kết quả. Giải thích vì sao.</p></div><div class="tabs" role="group" aria-label="Chọn công cụ">${[['sql','SQL chạy thật'],['fd','Bao đóng & khóa'],['storage','Storage & Index'],['join','LEFT JOIN trực quan']].map(([id,title])=>`<button data-tool="${id}" class="${tool===id?'selected':''}">${title}</button>`).join('')}</div><div id="tool-body"></div>`;
 $$('[data-tool]').forEach(b=>b.onclick=()=>{tool=b.dataset.tool;workshop();});
 ({sql:sqlWorkshop,fd:fdWorkshop,storage:storageWorkshop,join:joinWorkshop}[tool])();
}
function fdWorkshop(){
 $('#tool-body').innerHTML=`<div class="tool-grid"><form id="fd-form" class="panel"><h2>Bao đóng thuộc tính</h2><p>Tên thuộc tính phân cách bằng dấu phẩy. Tối đa 12 thuộc tính để tìm đủ candidate keys.</p><label class="field"><span>Relation R</span><input id="fd-attrs" value="A,B,C,D,E" required></label><label class="field"><span>Tập phụ thuộc hàm F</span><textarea id="fd-rules" required>A->B,C; B->D; C,D->E</textarea></label><label class="field"><span>Tập bắt đầu X</span><input id="fd-start" value="A" required></label><button class="primary" type="submit">Tính từng bước →</button><a class="link-box" href="#guide-7">Đọc lý thuyết & ví dụ chuẩn hóa ↗</a></form><div id="fd-result" class="panel tool-output" aria-live="polite"></div></div>`;
 const run=e=>{e?.preventDefault();try{const attrs=parseAttrs($('#fd-attrs').value),fds=parseFDs($('#fd-rules').value,attrs),start=parseAttrs($('#fd-start').value);if(start.some(a=>!attrs.includes(a)))throw Error('X chứa thuộc tính ngoài R.');const c=closure(start,fds),keys=candidateKeys(attrs,fds);$('#fd-result').innerHTML=`<h2>Theo dõi suy diễn</h2>${c.trace.map((s,i)=>`<div class="trace-step"><span>${i}</span><div><b>${esc(s.rule)}</b><small>X⁺ = {${esc(s.known.join(', '))}}</small></div></div>`).join('')}<div class="answer-box"><b>X⁺ = {${esc([...c.known].sort().join(', '))}}</b><br>${c.known.size===attrs.length?'X là superkey. Cần kiểm tối thiểu trước khi gọi candidate key.':'X chưa phải superkey.'}<p>Candidate keys của R: <b>${keys.map(k=>'{'+esc(k.join(', '))+'}').join(' ; ')}</b></p></div><p class="tool-help">Mỗi dòng áp dụng một FD làm tăng tập. Lặp đến điểm bất động. Key được duyệt theo bao hàm; có thể có key khác số thuộc tính.</p>`;}catch(e){$('#fd-result').innerHTML=`<div class="error-box" role="alert">${esc(e.message)}</div>`;}};
 $('#fd-form').onsubmit=run;run();
}
function storageWorkshop(){
 const fields=[['records','Số record r',30000],['record','Record size R (byte)',100],['block','Block size B (byte)',4096],['key','Key size (byte)',8],['pointer','Pointer size (byte)',8]];
 $('#tool-body').innerHTML=`<div class="tool-grid"><form class="panel" id="storage-form"><h2>Từ record đến index</h2><p>Unspanned · sparse primary index · không header/pointer liên kết · không cache.</p>${fields.map(([id,title,v])=>`<label class="field"><span>${title}</span><input id="s-${id}" type="number" step="1" min="1" max="100000000" required value="${v}"></label>`).join('')}<button class="primary">Tính chi phí →</button></form><div class="panel" id="storage-result" aria-live="polite"></div></div>`;
 const run=e=>{e?.preventDefault();try{const v=Object.fromEntries(fields.map(([id])=>[id,Number($('#s-'+id).value)])),r=storage(v);$('#storage-result').innerHTML=`<h2>Ghi đơn vị ở từng bước</h2><div class="metric-row"><div class="metric"><b>${r.bfr}</b><span>record / block</span></div><div class="metric"><b>${r.blocks}</b><span>data blocks</span></div><div class="metric"><b>${r.accesses}</b><span>block accesses</span></div></div><div class="formula">bfr = floor(${v.block} / ${v.record}) = ${r.bfr}<br>b = ceil(${v.records} / ${r.bfr}) = ${r.blocks}<br>index capacity = floor(${v.block} / (${v.key}+${v.pointer})) = ${r.cap}</div><table class="data-table"><tr><th>Mức từ dưới lên</th><th>Entries</th><th>Blocks</th></tr>${r.levels.map((l,i)=>`<tr><td>${i+1}</td><td>${l.entries}</td><td>${l.blocks}</td></tr>`).join('')}</table><div class="answer-box">${r.levels.length} mức index + 1 data block = <b>${r.accesses} accesses</b>.</div><p class="tool-help">Đây là mô hình bài tập, không mô phỏng page header, B+ tree occupancy hoặc cache thực tế. CLI hỗ trợ thêm overhead cố định.</p><a class="link-box" href="#guide-8">Đọc điều kiện áp dụng công thức ↗</a>`;}catch(e){$('#storage-result').innerHTML=`<div class="error-box" role="alert">${esc(e.message)}</div>`;}};
 $('#storage-form').onsubmit=run;run();
}
function tableHTML(columns,rows){return `<div class="tool-result-table"><table class="data-table"><thead><tr>${columns.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c===null?'<span class="muted">NULL</span>':esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>${rows.length?'':`<p class="empty">0 rows · kết quả rỗng</p>`}</div>`;}
function joinWorkshop(){
 $('#tool-body').innerHTML=`<div class="tool-grid"><div class="panel"><h2>Điều kiện đặt ở đâu?</h2><p>Research có An (45000) và Bình (30000). Innovation chưa có nhân viên.</p><label class="field"><span>Vị trí điều kiện Salary &gt; 40000</span><select id="join-mode"><option value="on">Trong ON — giữ mọi phòng</option><option value="where">Trong WHERE — lọc sau join</option></select></label><p>Đổi lựa chọn để nhìn hàng NULL-extended được giữ hoặc bị loại.</p><a class="link-box" href="#guide-6">Đọc giải thích chi tiết ↗</a></div><div class="panel" id="join-result" aria-live="polite"></div></div>`;
 const run=()=>{const on=$('#join-mode').value==='on';$('#join-result').innerHTML=`<h2>${on?'Giữ Innovation':'Innovation bị loại'}</h2><pre class="sql-console" style="min-height:0;white-space:pre-wrap">SELECT d.name, e.name, e.salary
FROM department d LEFT JOIN employee e
  ON e.dept_id=d.id${on?' AND e.salary&gt;40000':'\nWHERE e.salary&gt;40000'};</pre>${tableHTML(['Department','Employee','Salary'],on?[['Research','An',45000],['Innovation',null,null]]:[['Research','An',45000]])}<div class="answer-box">${on?'ON lọc cặp match; LEFT JOIN vẫn tạo hàng cho Innovation.':'WHERE gặp NULL > 40000 → UNKNOWN; chỉ TRUE được giữ.'}</div><p class="tool-help">Minh họa dùng bộ dữ liệu nhỏ riêng, không phải COMPANY. Thử query tương ứng trên dữ liệu COMPANY bằng Q27/Q28.</p>`;};$('#join-mode').onchange=run;run();
}
async function engine(){if(!sqlEnginePromise){const bytes=Uint8Array.from(atob(window.SQL_WASM_BASE64),c=>c.charCodeAt(0));sqlEnginePromise=initSqlJs({wasmBinary:bytes});}return sqlEnginePromise;}
async function resetDB(name){const SQL=await engine();sqlDB?.close();sqlDB=new SQL.Database();sqlFixture=name;sqlDB.run(D.fixtures[name]);return sqlDB;}
function sqlWorkshop(){
 $('#tool-body').innerHTML=`<div class="panel" id="sql-playground"><h2>SQL Playground · SQLite thật trong trình duyệt</h2><p>Chọn bảng để xem dữ liệu và khóa ngay cạnh ô SQL. Database nằm trong RAM của tab này; “Reset dữ liệu” khôi phục mẫu ban đầu.</p><div class="query-list"><label for="sql-example" class="tool-help">Nạp một bài tập (Q21 là bẫy NULL cố ý)</label><select id="sql-example">${D.sql.map(q=>`<option value="${q.id}">${q.id} · ${esc(q.title)}</option>`).join('')}</select></div><label class="field"><span>Database</span><select id="sql-fixture"><option value="company" ${sqlFixture==='company'?'selected':''}>COMPANY · dữ liệu mẫu nhân viên và dự án</option><option value="anime" ${sqlFixture==='anime'?'selected':''}>ANIME · dữ liệu mẫu phim và người xem</option></select></label><div class="sql-workspace"><div class="sql-writing"><label class="field"><span>SQL của bạn · Ctrl/⌘ + Enter để chạy</span><textarea class="sql-console" id="sql-editor" spellcheck="false" aria-label="SQL editor">${esc(sqlFixture==='anime'?'SELECT * FROM anime ORDER BY anime_id;':D.sql[0].sql+';')}</textarea></label><div class="query-controls"><button class="primary" id="sql-run" disabled>Đang nạp SQLite…</button><button id="sql-reset" disabled>Reset dữ liệu</button></div><p id="sql-status" class="tool-help" aria-live="polite"></p><section class="sql-results" aria-label="Kết quả truy vấn"><h3>Kết quả SQL</h3><div id="sql-result" aria-live="polite"><p class="tool-help">Chạy một truy vấn để xem kết quả tại đây.</p></div></section><div id="sql-explanation" class="sql-tip"></div><p class="sql-browser-tip">Chạy SELECT để đối chiếu kết quả bên dưới. Chạy INSERT / UPDATE / DELETE để thấy bảng bên cạnh thay đổi; cấu trúc cũng cập nhật sau CREATE / ALTER / DROP.</p><a class="link-box" href="#lab-3">40 bài tập có lời giải ↗</a></div><section class="db-explorer" id="db-explorer" aria-label="Khám phá bảng trong database"></section></div></div>`;
 const root=$('#sql-playground'),live=()=>root.isConnected;
 const explorer=DBExplorer.create($('#db-explorer'),{getDatabase:()=>sqlDB,onPreview:sql=>{if(!live())return;$('#sql-editor').value=sql;$('#sql-editor').focus();}});
 function busy(value){if(!live())return;for(const selector of ['#sql-run','#sql-reset','#sql-fixture','#sql-example'])$(selector).disabled=value;}
 async function loadFixture(name,reset=true){
  busy(true);
  try{if(reset||!sqlDB)await resetDB(name);if(!live())return;$('#sql-fixture').value=sqlFixture;$('#sql-run').textContent='Chạy SQL →';$('#sql-status').textContent='SQLite đã sẵn sàng · '+sqlFixture.toUpperCase();explorer.refresh({reset});}
  catch(error){if(live())$('#sql-result').innerHTML=`<div class="error-box" role="alert">${esc(error.message)}. Có thể chạy cùng SQL bằng tools/lab.py.</div>`;}
  finally{busy(!sqlDB);}
 }
 loadFixture(sqlFixture,false);
 $('#sql-run').onclick=()=>{
  try{const result=sqlDB.exec($('#sql-editor').value);$('#sql-result').innerHTML=result.length?result.map(r=>tableHTML(r.columns,r.values)+`<p class="tool-help">${r.values.length} rows</p>`).join(''):'<div class="answer-box">Đã thực thi. Xem dữ liệu hiện tại trong phần Khám phá database.</div>';$('#sql-status').textContent='Hoàn tất trong database '+sqlFixture.toUpperCase();}
  catch(error){$('#sql-result').innerHTML=`<div class="error-box" role="alert">${esc(error.message)}</div>`;$('#sql-status').textContent='SQL gặp lỗi; phần xem bảng phản ánh dữ liệu hiện tại.';}
  finally{explorer.refresh();}
 };
 $('#sql-editor').onkeydown=e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();$('#sql-run').click();}};
 $('#sql-example').onchange=async()=>{const q=D.sql.find(q=>q.id===$('#sql-example').value);if(sqlFixture!=='company')await loadFixture('company');if(!live())return;$('#sql-fixture').value='company';$('#sql-editor').value=q.sql+';';$('#sql-explanation').textContent=q.explanation;$('#sql-result').innerHTML='';};
 $('#sql-fixture').onchange=async()=>{const name=$('#sql-fixture').value;await loadFixture(name);if(!live())return;$('#sql-editor').value=sqlFixture==='anime'?'SELECT * FROM anime ORDER BY anime_id;':D.sql[0].sql+';';$('#sql-result').innerHTML='';$('#sql-explanation').textContent='';toast('Đã nạp fixture '+sqlFixture.toUpperCase());};
 $('#sql-reset').onclick=async()=>{await loadFixture(sqlFixture);if(!live())return;$('#sql-result').innerHTML='<p class="tool-help">Đã khôi phục dữ liệu mẫu.</p>';toast('Đã khôi phục dữ liệu mẫu');};
}

let quizIndex=0,quizFilter='all',quizPick=null;
function filteredQuestions(){return D.quiz.filter(q=>quizFilter==='all'||q.topic===quizFilter);}
function quiz(){
 $('#main').dataset.ready='true';
 const pool=filteredQuestions();quizIndex=Math.min(quizIndex,pool.length-1);const q=pool[quizIndex],a=saved.quiz[q.id];quizPick=a===undefined?null:a;
 const answered=D.quiz.filter(x=>Number.isInteger(saved.quiz[x.id])),correct=answered.filter(x=>saved.quiz[x.id]===x.answer).length;
 const topics=[['all','Tất cả chủ đề'],...D.groups.slice(0,8).map(g=>[g.id,g.title]),['security','Security'],['advanced','Advanced']];
 $('#main').innerHTML=`<div class="page-header"><div class="eyebrow">ÔN TẬP CÓ GIẢI THÍCH</div><h1>Hiểu vì sao đáp án đúng.</h1><p class="page-subtitle">Đề tự biên soạn theo tài liệu; không phải đề thi chính thức. Tiến độ được lưu trên trình duyệt.</p></div><div class="quiz-layout"><section class="panel"><div class="section-head" style="margin:0 0 16px"><span class="tag">${esc(q.topic.toUpperCase())} · ${q.id}</span><span class="tool-help">${quizIndex+1} / ${pool.length}</span></div><h2 style="font-size:20px;line-height:1.6">${esc(q.prompt)}</h2><div class="quiz-options" role="group" aria-label="Lựa chọn đáp án">${q.choices.map((c,i)=>`<button class="quiz-option ${a===i?'chosen':''} ${a!==undefined&&(i===q.answer?'correct':i===a?'wrong':'')}" data-option="${i}" ${a!==undefined?'disabled':''}><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(c)}</span></button>`).join('')}</div><div id="quiz-feedback" aria-live="polite">${a!==undefined?`<div class="${a===q.answer?'answer-box':'error-box'}"><b>${a===q.answer?'Đúng.':'Chưa đúng.'} Đáp án ${String.fromCharCode(65+q.answer)}.</b> ${esc(q.explanation)}</div>`:''}</div><div class="quiz-nav"><button id="quiz-prev" ${quizIndex===0?'disabled':''}>← Trước</button><button class="primary" id="quiz-check" ${a!==undefined?'disabled':''}>Kiểm tra đáp án</button><button id="quiz-next" ${quizIndex===pool.length-1?'disabled':''}>Tiếp →</button></div></section><aside class="panel quiz-aside"><h3>Nhịp học của bạn</h3><div class="quiz-score">${correct}<span class="tool-help"> / ${answered.length} đã trả lời</span></div><label class="tool-help" for="quiz-filter">Lọc chủ đề</label><select class="quiz-filter" id="quiz-filter">${topics.map(([id,title])=>`<option value="${id}" ${quizFilter===id?'selected':''}>${esc(title)}</option>`).join('')}</select><div class="quiz-map">${pool.map((x,i)=>`<button data-question="${i}" class="${i===quizIndex?'current':''} ${saved.quiz[x.id]===undefined?'':saved.quiz[x.id]===x.answer?'answered':'missed'}" aria-label="Câu ${x.id}">${x.id.slice(1)}</button>`).join('')}</div><button id="quiz-reset" style="margin-top:20px;font-size:11px;width:100%">Làm lại bộ câu hỏi</button><a class="link-box" href="#lab-7">Đọc đề & lời giải dạng tài liệu ↗</a></aside></div>`;
 $$('[data-option]').forEach(b=>b.onclick=()=>{quizPick=Number(b.dataset.option);$$('[data-option]').forEach(x=>x.classList.toggle('chosen',x===b));});
 $('#quiz-check').onclick=()=>{if(quizPick===null){toast('Chọn một đáp án trước khi kiểm tra.');return;}saved.quiz[q.id]=quizPick;persist();quiz();};
 $('#quiz-prev').onclick=()=>{quizIndex--;quiz();};$('#quiz-next').onclick=()=>{quizIndex++;quiz();};
 $$('[data-question]').forEach(b=>b.onclick=()=>{quizIndex=Number(b.dataset.question);quiz();});
 $('#quiz-filter').onchange=()=>{quizFilter=$('#quiz-filter').value;quizIndex=0;quiz();};
 $('#quiz-reset').onclick=()=>{saved.quiz={};persist();quizIndex=0;quiz();toast('Đã bắt đầu lại bộ câu hỏi');};
}
function route(){
 const id=decodeURIComponent(location.hash.slice(1)||'home');
 // Hashes for article headings are handled locally, never overwrite current route.
 routeEpoch++;$('#main').dataset.ready='false';$('#main').dataset.page=id;navigation(id);$('#sidebar').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');window.scrollTo({top:0,behavior:'instant'});
 if(id==='home')home();else if(id==='workshop')workshop();else if(id==='quiz')quiz();else if(pageById.has(id)){saved.last=id;persist();readPage(pageById.get(id),routeEpoch);}else{$('#main').innerHTML='<div class="panel"><h1>Không tìm thấy phần này</h1><p>Dùng tìm kiếm hoặc quay về lộ trình.</p><a class="button" href="#home">Về tổng quan</a></div>';}
}
const index=D.pages.map(p=>({...p,search:norm(p.title+' '+p.markdown),plain:p.markdown.replace(/[#*`>|]/g,'')}));
function search(){const term=norm($('#search-input').value.trim());if(term.length<2){$('#search-results').innerHTML='<p class="search-hint">Gõ ít nhất 2 ký tự. Tìm được cả tiếng Việt không dấu và thuật ngữ tiếng Anh.</p>';return;}const words=term.split(/\s+/);const hits=index.filter(p=>words.every(w=>p.search.includes(w))).sort((a,b)=>Number(norm(b.title).includes(term))-Number(norm(a.title).includes(term)));$('#search-results').innerHTML=`<p class="search-hint">${hits.length} phần phù hợp${hits.length>40?' · hiển thị 40 kết quả đầu':''}</p>`+hits.slice(0,40).map(p=>{const plain=norm(p.plain),pos=Math.max(0,plain.indexOf(words[0])-60),snippet=p.plain.slice(pos,pos+210);return `<a class="search-result" href="#${p.id}"><small>${esc(groups.get(p.group)?.title||p.group)} · ${p.kind==='source'?'TÀI LIỆU GỐC':'HƯỚNG DẪN'}</small><b>${esc(p.title.replace(/[*`]/g,''))}</b><p>…${esc(snippet)}…</p></a>`;}).join('');$$('.search-result').forEach(a=>a.onclick=()=>$('#search-dialog').close());}
$('#search-open').onclick=()=>{$('#search-dialog').showModal();$('#search-input').focus();search();};$('#search-close').onclick=()=>$('#search-dialog').close();
$('#search-input').oninput=()=>{clearTimeout(search.timer);search.timer=setTimeout(search,120);};
$('#search-dialog').onclick=e=>{if(e.target===$('#search-dialog'))$('#search-dialog').close();};
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#search-open').click();}});
$('#menu').onclick=()=>{const open=$('#sidebar').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(open));};
mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:'neutral',suppressErrorRendering:true,flowchart:{htmlLabels:true},maxTextSize:150000});
window.addEventListener('hashchange',route);route();
