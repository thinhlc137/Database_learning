/* Runnable lesson examples. Each run owns a fresh, short-lived COMPANY database. */
(function () {
 'use strict';
 const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const cell=value=>value===null?'<span class="db-null">NULL</span>':escape(value);
 function table(columns,rows){
  return `<div class="table-wrap"><table><thead><tr>${columns.map(c=>`<th>${escape(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${cell(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="course-row-count">${rows.length} hàng${rows.length?'':' · Tập kết quả rỗng'}</p>`;
 }
 function mount(article,{examples,createDatabase}){
  const byId=new Map(examples.map(e=>[e.id,e]));
  for(const pre of article.querySelectorAll('pre')){
   const code=pre.querySelector('code');
   if(!code)continue;
   const match=code.textContent.match(/^-- @lab (S\d{2})\n/);
   if(!match){
    if(code.classList.contains('language-tsql')){
     const label=document.createElement('div');label.className='course-dialect';label.textContent='SQL Server · T-SQL';pre.before(label);
    }
    continue;
   }
   const example=byId.get(match[1]);if(!example)continue;
   const box=document.createElement('section');box.className='course-example';box.dataset.example=example.id;
   box.setAttribute('aria-label',`Ví dụ ${example.id} chạy bằng SQLite`);
   box.innerHTML=`<div class="course-example-head"><b>${escape(example.id)} · SQLite</b><span>COMPANY mới mỗi lần chạy</span></div><div class="course-code"></div><details class="course-edit"><summary>Sửa SQL để thử</summary><label for="edit-${example.id}">SQL của ví dụ ${example.id}</label><textarea id="edit-${example.id}" spellcheck="false">${escape(example.sql)}</textarea></details><div class="course-example-actions"><button class="primary course-run">Chạy ví dụ →</button><button class="course-reset">Khôi phục SQL</button></div><div class="course-output" aria-live="polite"></div>`;
   pre.replaceWith(box);box.querySelector('.course-code').appendChild(pre);
   const editor=box.querySelector('textarea'),run=box.querySelector('.course-run'),reset=box.querySelector('.course-reset'),output=box.querySelector('.course-output');
   reset.onclick=()=>{editor.value=example.sql;output.replaceChildren();};
   run.onclick=async()=>{
    const query=editor.value;run.disabled=true;reset.disabled=true;run.textContent='Đang chạy…';
    let db;
    try{
     db=await createDatabase();
     const results=[];
     // Unlike exec(), this retains column names for SELECTs that return no rows.
     for(const statement of db.iterateStatements(query)){
      const columns=statement.getColumnNames(),values=[];
      while(statement.step()){if(columns.length)values.push(statement.get());}
      if(columns.length)results.push({columns,values});
     }
     if(!box.isConnected)return;
     const original=query.trim()===example.sql.trim();
     const matches=JSON.stringify(results.map(r=>r.values))===JSON.stringify(example.expected);
     output.innerHTML=results.map((r,i)=>`<h4>Kết quả ${i+1}</h4>${table(r.columns,r.values)}`).join('')||'<p>Đã thực thi, không có bảng kết quả.</p>';
     const status=document.createElement('p');status.className=original?(matches?'course-match':'course-mismatch'):'course-edited';
     status.textContent=original?(matches?'✓ Khớp kết quả mẫu đã kiểm chứng.':'Kết quả khác mẫu; kiểm tra phiên bản database và câu lệnh.'):'Đang hiển thị kết quả SQL bạn sửa; mỗi lần chạy vẫn bắt đầu từ COMPANY mới.';
     output.appendChild(status);
    }catch(error){if(box.isConnected)output.innerHTML=`<p class="error-box" role="alert">${escape(error.message)}</p>`;}
    finally{db?.close();if(box.isConnected){run.disabled=false;reset.disabled=false;run.textContent='Chạy ví dụ →';}}
   };
   editor.onkeydown=event=>{if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();if(!run.disabled)run.click();}};
  }
 }
 window.SQLCourse={mount};
})();
