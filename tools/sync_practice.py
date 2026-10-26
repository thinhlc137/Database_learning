"""Regenerate practice Markdown and SQL from canonical authored JSON data."""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
def main():
 data=json.loads((ROOT/'sql/exercises.json').read_text(encoding='utf-8'))
 (ROOT/'sql/solutions.sql').write_text('-- SQLite; lời giải đầy đủ và dữ liệu kỳ vọng ở exercises.json\n\n'+'\n\n'.join(f"-- {x['id']}: {x['title']}\n-- {x['explanation']}\n{x['sql']};" for x in data)+'\n',encoding='utf-8')
 (ROOT/'sql/practice.sql').write_text('-- Tự điền SELECT dưới mỗi đề; lời giải trong solutions.sql\n\n'+'\n\n'.join(f"-- {x['id']}: {x['title']}\n-- Viết lời giải của bạn ở đây." for x in data)+'\n',encoding='utf-8')
 parts=['# 40 bài SQL: tự làm → dự đoán → chạy → chữa','\nTất cả dùng COMPANY fixture của project. Kết quả đầy đủ được kiểm bằng expected rows trong exercises.json. Q21 là bẫy cố ý; Q22 sửa nó.\n']
 for x in data:
  result='```json\n'+json.dumps(x['expected'],ensure_ascii=False)+'\n```'
  parts.append(f"## {x['id']} · {x['title']}\n\nMức: {x['level']}. Chạy `python tools/lab.py --exercise {x['id']}`.\n\n<details><summary>SQL, kết quả và giải thích</summary>\n\n```sql\n{x['sql']};\n```\n\n{result}\n\n{x['explanation']}\n\n</details>\n")
 (ROOT/'labs/03-exercises.md').write_text('\n'.join(parts),encoding='utf-8')
 data=json.loads((ROOT/'docs/quiz.json').read_text(encoding='utf-8'))
 parts=['# 50 câu tự luyện có giải thích','\nĐề biên soạn bổ sung theo các nhóm kiến thức của tài liệu. Không phải đề thi hoặc đáp án chính thức.\n']
 for q in data:
  parts.append(f"## {q['id']} · {q['prompt']}\n\n"+'\n'.join(f"- **{chr(65+i)}.** {c}" for i,c in enumerate(q['choices']))+f"\n\n<details><summary>Đáp án và giải thích</summary>\n\n**{chr(65+q['answer'])}.** {q['explanation']}\n\n</details>\n")
 (ROOT/'labs/07-mock-exam.md').write_text('\n'.join(parts),encoding='utf-8')
if __name__=='__main__':main()
