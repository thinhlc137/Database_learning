"""Generate precise, editable SVG teaching diagrams with Python stdlib."""
from pathlib import Path
from html import escape
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/assets'
NAVY='#17333b';TEAL='#087f78';MUTED='#577077';BLUE='#3b66bf';BG='#f5f9f8';BORDER='#c8dcd8';ORANGE='#b76b24'
class SVG:
 def __init__(self,title,subtitle):
  self.s=[f'<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="640" viewBox="0 0 1100 640" role="img" aria-label="{escape(title,quote=True)}"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="{TEAL}"/></marker></defs><rect width="1100" height="640" rx="24" fill="{BG}"/>']
  self.text(44,42,'DATABASE LEARNING LAB',13,TEAL,weight=700)
  self.text(44,83,title,30,NAVY,weight=700);self.text(44,115,subtitle,17,MUTED)
 def text(self,x,y,t,size=18,color=NAVY,anchor='start',weight=400):
  self.s.append(f'<text x="{x}" y="{y}" font-family="Arial, sans-serif" font-size="{size}" fill="{color}" text-anchor="{anchor}" font-weight="{weight}">{escape(str(t))}</text>')
 def box(self,x,y,w,h,title,lines=(),color=TEAL):
  self.s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="white" stroke="{BORDER}" stroke-width="2"/>')
  self.s.append(f'<rect x="{x}" y="{y}" width="5" height="{h}" rx="2" fill="{color}"/>')
  self.text(x+18,y+30,title,19,color,weight=700)
  for i,t in enumerate(lines):self.text(x+18,y+59+i*25,t,16)
 def line(self,x1,y1,x2,y2,arrow=True,dash=False,color=TEAL):
  self.s.append(f'<path d="M{x1} {y1}L{x2} {y2}" fill="none" stroke="{color}" stroke-width="2.3"'+(' marker-end="url(#arrow)"' if arrow else '')+(' stroke-dasharray="7 5"' if dash else '')+'/>')
 def path(self,d,arrow=True):self.s.append(f'<path d="{d}" fill="none" stroke="{TEAL}" stroke-width="2.3"'+(' marker-end="url(#arrow)"' if arrow else '')+'/>')
 def table(self,x,y,cols,rows,width=390):
  cw=width/len(cols);h=43*(len(rows)+1)
  self.s.append(f'<rect x="{x}" y="{y}" width="{width}" height="{h}" rx="10" fill="white" stroke="{BORDER}"/>')
  for i,row in enumerate([cols]+rows):
   if i==0:self.s.append(f'<rect x="{x}" y="{y}" width="{width}" height="43" rx="8" fill="#e3f0ec"/>')
   for j,t in enumerate(row):self.text(x+14+j*cw,y+28+i*43,t,17,TEAL if i==0 else NAVY,weight=700 if i==0 else 400)
 def save(self,name):
  self.text(44,610,'Mô hình minh họa · Đọc giả thiết trong bài học trước khi áp dụng.',14,MUTED)
  (OUT/name).write_text(''.join(self.s)+'</svg>',encoding='utf-8')

def main():
 OUT.mkdir(exist_ok=True,parents=True)
 a=SVG('Ba mức mô tả dữ liệu','Không đồng nhất external / conceptual / internal với ba tầng frontend / API / server.')
 a.box(60,170,280,140,'EXTERNAL',['Góc nhìn giảng viên','Góc nhìn sinh viên','Một phần dữ liệu được phép xem'])
 a.box(410,170,280,140,'CONCEPTUAL',['Entity, bảng, quan hệ','Khóa và ràng buộc','Toàn bộ cấu trúc logic'])
 a.box(760,170,280,140,'INTERNAL',['File / page / block','Index và access path','Cách tổ chức lưu trữ'])
 a.line(345,238,400,238);a.line(695,238,750,238)
 a.box(65,375,460,130,'Logical data independence',['Đổi cấu trúc logic; duy trì external interface.','Ví dụ: tách bảng và giữ view tương thích.'],BLUE)
 a.box(575,375,460,130,'Physical data independence',['Đổi storage/index; giữ interface logic.','Ví dụ: thêm index, SQL ứng dụng giữ nguyên.'])
 a.save('architecture.svg')
 a=SVG('Chen: maximum khác minimum','ANIME—GENRE là M:N; ANIME total, GENRE partial theo miniworld của lab.')
 a.s.append('<ellipse cx="160" cy="190" rx="95" ry="32" fill="white" stroke="#087f78" stroke-width="2"/>');a.text(160,196,'AnimeID',19,anchor='middle');a.line(120,201,200,201,False);a.line(160,222,160,280,False)
 for x,title in [(60,'ANIME'),(820,'GENRE')]:a.s.append(f'<rect x="{x}" y="280" width="220" height="90" fill="white" stroke="{TEAL}" stroke-width="2.5"/>');a.text(x+110,334,title,23,anchor='middle',weight=700)
 a.s.append(f'<polygon points="550,255 680,325 550,395 420,325" fill="#e3f0ec" stroke="{TEAL}" stroke-width="2.5"/>');a.text(550,332,'Has_genre',21,anchor='middle')
 a.line(280,321,420,321,False);a.line(280,329,420,329,False);a.line(680,325,820,325,False)
 a.text(345,304,'M',21,weight=700);a.text(750,304,'N',21,weight=700)
 a.box(60,440,460,110,'ANIME: ít nhất một',['Đường đôi = total participation.','Không giới hạn tối đa là một.'])
 a.box(580,440,460,110,'GENRE: có thể chưa được dùng',['Đường đơn = partial participation.','Có thể gắn với nhiều anime.'],BLUE)
 a.save('chen.svg')
 a=SVG('Bốn tổ hợp specialization','d/o nói về giao; total/partial nói về độ bao phủ superclass.')
 for x,y,title,lines in [(60,160,'Disjoint + total',['V ∩ A = ∅','V ∪ A = ACCOUNT','Mỗi account đúng một loại.']), (570,160,'Overlapping + total',['Có thể thuộc cả V và A','V ∪ A = ACCOUNT','Mỗi account có ít nhất một loại.']), (60,370,'Disjoint + partial',['V ∩ A = ∅','Có thể thiếu account trong V ∪ A','Có thể chưa có loại.']), (570,370,'Overlapping + partial',['Có thể thuộc cả V và A','Có thể thiếu account trong V ∪ A','Có thể kiêm nhiệm hoặc chưa có loại.'])]:a.box(x,y,470,175,title,lines)
 a.save('specialization.svg')
 a=SVG('Bảng liên kết giữ đúng ngữ nghĩa M:N','Bản rút gọn của 12 bảng trong sql/anime-schema.sql · PK = khóa chính, FK = khóa ngoại.')
 a.box(50,160,280,130,'WATCH_LIST',['PK list_id','FK viewer_id → VIEWER','name'])
 a.box(410,160,280,130,'CONTAINS',['PK/FK list_id','PK/FK anime_id','added_at ← thuộc quan hệ'])
 a.box(770,160,280,130,'ANIME',['PK anime_id','title','release_year'])
 a.line(410,218,340,218);a.line(690,218,760,218)
 a.box(50,380,280,125,'EPISODE',['PK/FK anime_id','PK episode_no','title, duration_sec'])
 a.box(410,380,280,125,'ANIME_GENRE',['PK/FK anime_id','PK/FK genre_id'])
 a.box(770,380,280,125,'GENRE',['PK genre_id','name UNIQUE'])
 a.path('M550 380V332H910V300');a.line(690,440,760,440);a.path('M190 380V345H730V260H760')
 a.text(50,558,'FK không tự buộc ANIME phải xuất hiện trong ANIME_GENRE ít nhất một lần.',18,ORANGE)
 a.save('schema.svg')
 a=SVG('Theo dõi từng relation trung gian','σ lọc hàng · π chọn cột và loại trùng theo set semantics · ⋈ ghép theo điều kiện.')
 a.text(60,174,'R ban đầu',20,weight=700);a.table(60,195,['Student','Course'],[['An','DB'],['An','AI'],['Bình','DB']])
 a.line(465,270,590,270);a.text(525,242,'σ Course=DB',17,TEAL,anchor='middle')
 a.text(640,174,'Sau selection',20,weight=700);a.table(640,195,['Student','Course'],[['An','DB'],['Bình','DB']])
 a.box(60,430,450,110,'π Course(R) = {DB, AI}',['RA loại tuple trùng.','SQL cần DISTINCT nếu muốn tương ứng.'])
 a.box(580,430,450,110,'R ÷ {DB, AI} = {An}',['An có đủ mọi Course yêu cầu.','Bình thiếu AI nên bị loại.'],BLUE)
 a.save('algebra.svg')
 a=SVG('Đọc SQL theo thứ tự logic','Optimizer có thể chọn thứ tự vật lý khác nhưng phải giữ ngữ nghĩa truy vấn.')
 for i,(t,ls) in enumerate([('FROM / ON',['Tạo các cặp match']),('WHERE',['Giữ hàng TRUE']),('GROUP / HAVING',['Tạo và lọc nhóm']),('SELECT / ORDER',['Tính output, sắp xếp'])]):
  x=50+i*265;a.box(x,170,220,100,t,ls)
  if i<3:a.line(x+224,220,x+253,220)
 a.box(50,350,480,175,'LEFT JOIN + ON Salary>40000',['ON chọn cặp; vẫn giữ phòng không match.','Administration → Jennifer','Headquarters → James','Innovation, Research → NULL'])
 a.box(570,350,480,175,'LEFT JOIN rồi WHERE Salary>40000',['WHERE loại hàng khi predicate UNKNOWN.','Administration → Jennifer','Headquarters → James','Innovation, Research bị loại.'],ORANGE)
 a.save('sql-pipeline.svg')
 a=SVG('Bao đóng A⁺: chỉ dừng khi không thêm được gì','R(A,B,C,D,E), F = {A→BC, B→D, CD→E}.')
 for x,y,title,lines in [(60,165,'0 · Khởi tạo',['A⁺ = {A}']),(570,165,'1 · Áp dụng A→BC',['A⁺ = {A,B,C}']),(60,330,'2 · Áp dụng B→D',['A⁺ = {A,B,C,D}']),(570,330,'3 · Áp dụng CD→E',['A⁺ = {A,B,C,D,E}'])]:a.box(x,y,470,115,title,lines)
 a.line(535,222,555,222);a.path('M805 292V312H295V320');a.line(535,387,555,387)
 a.text(60,515,'A xác định toàn bộ R → superkey. A không suy được từ các thuộc tính khác.',20,weight=700)
 a.text(60,550,'Ở ví dụ này: A là candidate key duy nhất; không suy điều đó cho mọi bộ FD.',18,MUTED)
 a.save('normalization.svg')
 a=SVG('B+ tree: separator ở trong, data entries ở lá','Cây minh họa key tăng dần; internal separator là khóa nhỏ nhất ở nhánh bên phải.')
 a.box(425,160,250,85,'[ 20 | 40 ]',['Internal node'])
 for x,title,ls in [(65,'[ 5 | 10 ]',['Data entries < 20']),(425,'[ 20 | 30 ]',['20 ≤ keys < 40']),(785,'[ 40 | 50 ]',['keys ≥ 40'])]:a.box(x,355,250,105,title,ls)
 a.line(460,250,190,345);a.line(550,250,550,345);a.line(640,250,910,345)
 a.line(320,410,415,410);a.line(680,410,775,410)
 a.text(60,530,'Point lookup: root → đúng leaf. Range scan: tìm leaf đầu → duyệt liên kết lá.',20,weight=700)
 a.text(60,565,'Sức chứa internal và leaf khác nhau; ghi rõ pointer, header và quy ước order.',18,MUTED)
 a.save('bplus.svg')
 a=SVG('CAP: bắt đầu từ tình huống network partition','C theo CAP là linearizable consistency; A là availability theo định nghĩa hình thức.')
 a.box(60,175,350,140,'Replica A',['Nhận ghi: đặt ghế cuối','Không gửi được sang B','Giá trị cục bộ đã thay đổi'])
 a.box(690,175,350,140,'Replica B',['Chưa thấy ghi mới ở A','Nhận một yêu cầu khác','Không xác minh được với A'])
 a.line(425,240,675,240,False,True,ORANGE);a.text(550,213,'MẤT LIÊN LẠC',17,ORANGE,anchor='middle',weight=700)
 a.box(60,400,460,125,'Ưu tiên consistency',['Có thể phải từ chối hoặc chờ request.','Không bảo đảm A cho mọi node không lỗi.'])
 a.box(580,400,460,125,'Ưu tiên availability',['Tiếp tục trả lời theo trạng thái cục bộ.','Có thể không giữ được C trong partition.'],BLUE)
 a.save('cap.svg')
 print('Generated 9 SVG teaching diagrams')
if __name__=='__main__':
 main()
 from sql_diagrams import main as sql_diagrams
 sql_diagrams()
