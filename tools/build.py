"""Rebuild the offline reader bundle from all Markdown sources; Python stdlib only."""
from pathlib import Path
import json,re,hashlib
ROOT=Path(__file__).resolve().parents[1]
TITLES=['Nền tảng & kiến trúc','ER · Thực thể và quan hệ','EER · Kế thừa và phân loại','Relational mapping','Đại số quan hệ','SQL từ cơ bản đến nâng cao','FD & Chuẩn hóa','Storage & Indexing']
GUIDES=['01-foundations','02-er','03-eer','04-mapping','05-algebra','06-sql','07-normalization','08-storage']

def headings(text):
    fenced=False
    result=[]
    for line in text.splitlines():
        if line.startswith('```'):
            fenced=not fenced
        if not fenced and re.match(r'^#{1,6} ',line):
            result.append(line)
    return result

def sections(text):
    # Split at H2 outside fenced code. Preserve every source character.
    result=[];start=0;pos=0;fenced=False
    for line in text.splitlines(keepends=True):
        if line.startswith('```'):fenced=not fenced
        if not fenced and line.startswith('## '):
            if pos>start:result.append(text[start:pos])
            start=pos
        pos+=len(line)
    if start<len(text):result.append(text[start:])
    return result

def main():
    from sync_practice import main as sync_practice
    sync_practice()
    pages=[];groups=[]
    for i in range(1,10):
        group=f'c{i}' if i<9 else 'final'
        name=f'DB-Chapter{i}.md' if i<9 else 'DB-Final.md'
        source=(ROOT/'materials'/name).read_text(encoding='utf-8')
        chunks=sections(source)
        assert ''.join(chunks)==source, name
        groups.append({'id':group,'title':TITLES[i-1] if i<9 else 'Tổng ôn · DB-Final','file':name,'guide':f'guide-{i}' if i<9 else 'guide-final','sourcePages':len(chunks)})
        for j,chunk in enumerate(chunks):
            display=chunk.replace('D# Chương 1:','# Chương 1:',1) if i==1 and j==0 else chunk
            hs=headings(display);title=re.sub(r'^#+\s*','',hs[0]) if hs else 'Giới thiệu và xuất xứ'
            # Source H1 may dominate long Final sections; use earliest actual heading.
            pages.append({'id':f'{group}-{j:02}','group':group,'kind':'source','title':title,'markdown':display,'file':f'materials/{name}','section':j})
        if i<9:
            file=ROOT/'lessons'/f'{GUIDES[i-1]}.md'
            pages.append({'id':f'guide-{i}','group':group,'kind':'guide','title':TITLES[i-1],'markdown':file.read_text(encoding='utf-8'),'file':str(file.relative_to(ROOT))})
    extra=[('guide-final','final','Ôn cuối kỳ & lộ trình','lessons/10-exam-roadmap.md'),('guide-advanced','final','Security & Advanced topics','lessons/09-security-advanced.md'),('editorial','info','Chú giải & nguồn đối chiếu','lessons/11-corrections-and-sources.md')]
    extra += [(f'lab-{i+1}','labs',f.name.split('-',1)[1].removesuffix('.md').replace('-',' ').title(),str(f.relative_to(ROOT))) for i,f in enumerate(sorted((ROOT/'labs').glob('*.md')))]
    for id,group,title,file in extra:
        content=(ROOT/file).read_text(encoding='utf-8')
        title=re.sub(r'^#\s*','',content.splitlines()[0])
        pages.append(dict(id=id,group=group,kind='guide',title=title,markdown=content,file=file))
    manifest=json.loads((ROOT/'materials/manifest.json').read_text(encoding='utf-8'))
    for m in manifest:
        assert hashlib.sha256((ROOT/'materials'/m['file']).read_bytes()).hexdigest()==m['sha256'],'Original source changed'
    fixtures={name: '\n'.join((ROOT/'sql'/f'{name}-{part}.sql').read_text(encoding='utf-8') for part in ['schema','seed']) for name in ['company','anime']}
    bundle={'fixtures':fixtures,'pages':pages,'groups':groups,'manifest':manifest,'quiz':json.loads((ROOT/'docs/quiz.json').read_text(encoding='utf-8')),'sql':json.loads((ROOT/'sql/exercises.json').read_text(encoding='utf-8'))}
    (ROOT/'docs/content.js').write_text('window.DB_CONTENT = '+json.dumps(bundle,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
    # Machine-readable coverage: every imported H2 section is reachable in the reader.
    coverage={'sources':len(manifest),'source_lines':sum(x['lines'] for x in manifest),'source_characters':sum(x['characters'] for x in manifest),'source_sections':sum(x['kind']=='source' for x in pages),'learning_pages':sum(x['kind']=='guide' for x in pages),'quiz_questions':len(bundle['quiz']),'sql_exercises':len(bundle['sql']),'pages':[{'id':p['id'],'file':p['file'],'title':p['title']} for p in pages]}
    (ROOT/'docs/coverage.json').write_text(json.dumps(coverage,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print({k:v for k,v in coverage.items() if k!='pages'})
if __name__=='__main__':main()
