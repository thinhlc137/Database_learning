/* Live SQLite inspector: reads the same connection as the SQL editor. */
'use strict';
window.DBExplorer=(()=>{
 const PAGE_SIZE=25;
 const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const quote=name=>'"'+String(name).replace(/"/g,'""')+'"';
 const key=(schema,name)=>JSON.stringify([schema,name]);
 function query(db,sql,params=[]){
  const statement=db.prepare(sql);
  try{statement.bind(params);const columns=statement.getColumnNames(),rows=[];while(statement.step())rows.push(statement.get());return {columns,rows};}
  finally{statement.free();}
 }
 function objects(result){return result.rows.map(row=>Object.fromEntries(result.columns.map((c,i)=>[c,row[i]])));}
 function cell(value){if(value===null)return '<span class="db-null">NULL</span>';if(value instanceof Uint8Array)return `<span class="muted">BLOB · ${value.length} byte</span>`;return escape(value);}
 function grid(columns,rows){return `<div class="db-grid-wrap" tabindex="0" aria-label="Bảng dữ liệu có thể cuộn ngang"><table class="db-grid"><thead><tr>${columns.map(c=>`<th>${escape(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${cell(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
 function create(host,{getDatabase,onPreview}){
  let catalog=[],selected=null,tab='data',search='',page=0,timer;
  host.innerHTML='<p class="tool-help">Đang nạp các bảng…</p>';
  function select(value){selected=value;page=0;search='';tab='data';render();}
  function metadata(table){
   const db=getDatabase(),schema=quote(table.schema),argument=quote(table.name);
   return {columns:objects(query(db,`PRAGMA ${schema}.table_xinfo(${argument})`)).filter(c=>c.hidden!==1),foreignKeys:objects(query(db,`PRAGMA ${schema}.foreign_key_list(${argument})`))};
  }
  function renderData(table,meta){
   const db=getDatabase(),target=quote(table.schema)+'.'+quote(table.name),columns=meta.columns;
   const condition=search&&columns.length?' WHERE '+columns.map(c=>`instr(lower(CAST(${quote(c.name)} AS TEXT)),lower(?))>0`).join(' OR '):'';
   const params=condition?columns.map(()=>search):[];
   const count=query(db,`SELECT COUNT(*) FROM ${target}${condition}`,params).rows[0][0];
   page=Math.min(page,Math.max(0,Math.ceil(count/PAGE_SIZE)-1));
   const pk=columns.filter(c=>c.pk).sort((a,b)=>a.pk-b.pk),order=(pk.length?pk:columns).map(c=>quote(c.name)).join(',');
   const result=query(db,`SELECT * FROM ${target}${condition}${order?' ORDER BY '+order:''} LIMIT ? OFFSET ?`,[...params,PAGE_SIZE,page*PAGE_SIZE]);
   const flags=new Map(columns.map(c=>[c.name,{pk:c.pk,fk:meta.foreignKeys.some(f=>f.from===c.name),type:c.type}]));
   const headers=result.columns.map(name=>{const f=flags.get(name)||{};return `<th title="${escape(f.type||'')}">${escape(name)}${f.pk?'<span class="db-key db-pk">PK</span>':''}${f.fk?'<span class="db-key db-fk">FK</span>':''}</th>`;}).join('');
   $('#db-detail',host).innerHTML=`<div class="db-filter"><label for="db-filter">Tìm giá trị trong bảng</label><input id="db-filter" type="search" value="${escape(search)}" placeholder="Tên, mã, số…" autocomplete="off"></div><div class="db-grid-wrap" tabindex="0" aria-label="Dữ liệu ${escape(table.name)}; cuộn ngang để xem đủ cột"><table class="db-grid"><thead><tr>${headers}</tr></thead><tbody>${result.rows.map(row=>`<tr>${row.map(value=>`<td>${cell(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${count?'':'<p class="db-empty">'+(search?'Không có hàng phù hợp.':'Bảng đang rỗng.')+'</p>'}<div class="db-pagination"><span id="db-row-count">${count?page*PAGE_SIZE+1:0}–${Math.min((page+1)*PAGE_SIZE,count)} / ${count} hàng${search?' phù hợp':''}</span><div><button id="db-prev" ${page===0?'disabled':''} aria-label="Trang dữ liệu trước">←</button><button id="db-next" ${(page+1)*PAGE_SIZE>=count?'disabled':''} aria-label="Trang dữ liệu tiếp">→</button></div></div><p class="db-legend"><span class="db-key db-pk">PK</span> Khóa chính <span class="db-key db-fk">FK</span> Khóa ngoại · ${PAGE_SIZE} hàng/trang</p>`;
   $('#db-filter',host).oninput=e=>{search=e.target.value;page=0;clearTimeout(timer);timer=setTimeout(()=>{if(!host.isConnected)return;const focus=document.activeElement?.id==='db-filter',caret=document.activeElement?.selectionStart;renderDetail();if(focus){const input=$('#db-filter',host);input?.focus();if(caret!==null)input?.setSelectionRange(caret,caret);}},180);};
   $('#db-prev',host).onclick=()=>{page--;renderDetail();};$('#db-next',host).onclick=()=>{page++;renderDetail();};
  }
  function renderSchema(table,meta){
   const rows=meta.columns.map(c=>[c.name,c.type||'—',c.pk?'PK #'+c.pk:'—',c.notnull?'NOT NULL':'—',c.dflt_value??'—']);
   const ddl=query(getDatabase(),`SELECT sql FROM ${quote(table.schema)}.sqlite_schema WHERE name=? AND type=?`,[table.name,table.type]).rows[0]?.[0]||'';
   $('#db-detail',host).innerHTML=`<h4>Cột & ràng buộc</h4>${grid(['Cột','Kiểu','Khóa chính','NOT NULL','DEFAULT'],rows)}<h4>Khóa ngoại</h4>${meta.foreignKeys.length?`<ul class="db-relations">${meta.foreignKeys.map(f=>`<li><code>${escape(f.from)}</code><span>→</span><button class="db-parent" data-target="${escape(key(table.schema,f.table))}">${escape(f.table)}.${escape(f.to||'(PK)')}</button><small>DELETE ${escape(f.on_delete)} · UPDATE ${escape(f.on_update)}</small></li>`).join('')}</ul>`:'<p class="tool-help">Bảng này không khai báo khóa ngoại.</p>'}<details class="db-ddl"><summary>SQL tạo ${table.type==='view'?'view':'bảng'} · gồm CHECK / UNIQUE</summary><pre><code>${escape(ddl)}</code></pre></details>`;
   $$('.db-parent',host).forEach(button=>button.onclick=()=>{const [schema,name]=JSON.parse(button.dataset.target),parent=catalog.find(t=>t.schema===schema&&t.name.toLowerCase()===name.toLowerCase());if(parent)select(parent.key);});
  }
  function renderDetail(){
   const table=catalog.find(t=>t.key===selected);if(!table)return;
   try{const meta=metadata(table);if(tab==='data')renderData(table,meta);else renderSchema(table,meta);}
   catch(error){$('#db-detail',host).innerHTML=`<p class="error-box">Không thể đọc bảng: ${escape(error.message||error)}</p>`;}
  }
  function render(){
   if(!host.isConnected)return;
   const table=catalog.find(t=>t.key===selected);
   host.innerHTML=`<div class="db-heading"><div><h3>Khám phá database</h3><p id="db-summary">${catalog.length} bảng / view · dữ liệu hiện tại trong tab</p></div><span class="db-live">● LIVE</span></div><div class="db-catalog" aria-label="Chọn bảng để xem dữ liệu">${catalog.map(t=>`<button class="db-table-button ${selected===t.key?'selected':''}" aria-pressed="${selected===t.key}" data-table="${escape(t.key)}"><span>${escape(t.schema==='main'?t.name:t.schema+'.'+t.name)}${t.type==='view'?' <small>view</small>':''}</span><b>${t.count===null?'?':t.count}</b></button>`).join('')}</div>${table?`<div class="db-toolbar"><strong id="db-current-table">${escape(table.name)}</strong><button id="db-preview" title="Chỉ nạp truy vấn vào ô SQL, chưa chạy">Nạp SELECT *</button></div><div class="db-tabs" role="group" aria-label="Chế độ xem bảng"><button data-db-tab="data" class="${tab==='data'?'selected':''}" aria-pressed="${tab==='data'}">Dữ liệu</button><button data-db-tab="schema" class="${tab==='schema'?'selected':''}" aria-pressed="${tab==='schema'}">Cấu trúc & khóa</button></div><div id="db-detail"></div>`:'<p class="db-empty">Database chưa có bảng. Viết CREATE TABLE rồi chạy SQL để bắt đầu.</p>'}`;
   $$('.db-table-button',host).forEach(button=>button.onclick=()=>select(button.dataset.table));
   $$('[data-db-tab]',host).forEach(button=>button.onclick=()=>{tab=button.dataset.dbTab;render();});
   if(table){$('#db-preview',host).onclick=()=>onPreview(`SELECT * FROM ${quote(table.schema)}.${quote(table.name)};`);renderDetail();}
  }
  function refresh({reset=false}={}){
   if(!host.isConnected||!getDatabase())return;
   clearTimeout(timer);if(reset){selected=null;page=0;search='';tab='data';}
   try{
    const db=getDatabase();catalog=[];
    for(const schema of objects(query(db,'PRAGMA database_list'))){
     for(const t of objects(query(db,`SELECT name,type FROM ${quote(schema.name)}.sqlite_schema WHERE type IN ('table','view') AND substr(name,1,7)<>'sqlite_' ORDER BY name COLLATE NOCASE`))){
      let count=null;try{count=query(db,`SELECT COUNT(*) FROM ${quote(schema.name)}.${quote(t.name)}`).rows[0][0];}catch{}
      catalog.push({...t,schema:schema.name,key:key(schema.name,t.name),count});
     }
    }
    if(!catalog.some(t=>t.key===selected))selected=(catalog.find(t=>t.name.toLowerCase()==='employee')||catalog.find(t=>t.name.toLowerCase()==='anime')||catalog[0])?.key||null;
    render();
   }catch(error){host.innerHTML=`<p class="error-box">Không thể đọc database: ${escape(error.message||error)}</p>`;}
  }
  // Scoped DOM helpers keep remounts and async initialization isolated.
  function $(selector,parent=host){return parent.querySelector(selector);}
  function $$(selector,parent=host){return [...parent.querySelectorAll(selector)];}
  return {refresh};
 }
 return {create};
})();
