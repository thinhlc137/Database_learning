"""Exact SQL teaching diagrams, using the project's existing SVG vocabulary."""
from diagrams import SVG, TEAL, BLUE, ORANGE


def main():
    a=SVG('COMPANY: sáu bảng, một mô hình xuyên suốt',
          'Mũi tên đi từ khóa ngoại đến bảng được tham chiếu. Khóa ghép được ghi cùng một cặp.')
    a.box(50,165,330,140,'EMPLOYEE',['PK Ssn · Fname · Salary','FK Dno → DEPARTMENT','FK Super_ssn → EMPLOYEE'])
    a.box(430,165,280,140,'DEPARTMENT',['PK Dnumber · Dname','FK Mgr_ssn → EMPLOYEE','Mgr_start_date'])
    a.box(770,165,280,140,'DEPT_LOCATIONS',['PK (Dnumber, Dlocation)','FK Dnumber → DEPARTMENT'])
    a.box(50,390,280,140,'DEPENDENT',['PK (Essn, Dependent_name)','FK Essn → EMPLOYEE'])
    a.box(410,390,280,140,'WORKS_ON',['PK (Essn, Pno) · Hours','FK Essn → EMPLOYEE','FK Pno → PROJECT'])
    a.box(770,390,280,140,'PROJECT',['PK Pnumber · Pname','FK Dnum → DEPARTMENT','Plocation'])
    a.line(380,240,420,240)
    a.path('M430 185H402V140H220V155')
    a.path('M50 210H25V140H100V155')
    a.line(770,240,720,240)
    a.line(190,390,190,315)
    a.path('M480 390V340H290V315')
    a.line(690,455,760,455)
    a.path('M910 390V340H570V315')
    a.text(50,570,'9 nhân viên · 4 phòng · 6 dự án · 16 phân công · 7 người phụ thuộc',20,TEAL,weight=700)
    a.save('sql-company.svg')

    a=SVG('JOIN: mỗi cặp hàng khớp trở thành một hàng',
          'A có khóa 1,2. B có khóa 2,3. Điều kiện ON A.id=B.id.')
    a.table(60,170,['A.id','A.label'],[['1','A'],['2','B']],350)
    a.table(690,170,['B.id','B.label'],[['2','X'],['3','Y']],350)
    a.line(415,275,680,230)
    a.text(550,198,'Chỉ cặp id=2 khớp',18,TEAL,anchor='middle',weight=700)
    a.box(60,380,310,160,'INNER JOIN',['2, B, 2, X','Chỉ hàng có cặp khớp'])
    a.box(395,380,310,160,'LEFT JOIN',['1, A, NULL, NULL','2, B, 2, X','Giữ mọi hàng bên A'],BLUE)
    a.box(730,380,310,160,'FULL JOIN',['1, A, NULL, NULL','2, B, 2, X','NULL, NULL, 3, Y'],ORANGE)
    a.save('sql-joins.svg')

    a=SVG('NULL: so sánh thiếu thông tin tạo UNKNOWN',
          'T = TRUE · F = FALSE · U = UNKNOWN. WHERE chỉ giữ TRUE; CHECK từ chối FALSE.')
    a.text(60,175,'AND',24,TEAL,weight=700)
    a.table(60,195,['AND','T','F','U'],[['T','T','F','U'],['F','F','F','F'],['U','U','F','U']],460)
    a.text(580,175,'OR',24,BLUE,weight=700)
    a.table(580,195,['OR','T','F','U'],[['T','T','T','T'],['F','T','F','U'],['U','T','U','U']],460)
    a.box(60,430,460,110,'Salary = NULL → UNKNOWN',['Dùng IS NULL để kiểm thiếu dữ liệu.','NOT UNKNOWN vẫn là UNKNOWN.'])
    a.box(580,430,460,110,'DEFAULT không tự sửa NULL',['COUNT(*) đếm hàng.','COUNT(Salary) chỉ đếm lương đã biết.'],ORANGE)
    a.save('sql-null.svg')

    a=SVG('GROUP BY: nhìn rõ từng nhóm và mẫu số',
          'Salary NULL không được AVG đếm vào mẫu số. Phòng rỗng cần bắt đầu từ DEPARTMENT.')
    a.box(60,165,470,140,'Administration · Dno=4',['25000 + 43000 + 25000 + NULL','4 nhân viên, 3 lương đã biết','SUM=93000 · AVG=93000/3=31000'])
    a.box(570,165,470,140,'Research · Dno=5',['30000 + 40000 + 38000 + 25000','4 nhân viên, 4 lương đã biết','SUM=133000 · AVG=33250'],BLUE)
    a.table(60,365,['Phòng','COUNT(*)','COUNT(e.Ssn)','AVG(Salary)'],[
        ['Headquarters','1','1','55000'],['Administration','4','4','31000'],
        ['Research','4','4','33250'],['Innovation','1','0','NULL']],980)
    a.text(60,345,'Sau DEPARTMENT LEFT JOIN EMPLOYEE:',18,TEAL,weight=700)
    a.save('sql-groups.svg')

    a=SVG('SQL Server trigger: inserted và deleted là tập hàng',
          'Một UPDATE của phòng 5 tác động 4 nhân viên. Trigger xử lý cả bốn, không chọn một biến đại diện.')
    a.text(60,172,'deleted: giá trị cũ',22,TEAL,weight=700)
    a.table(60,195,['Ssn','Salary'],[['123456789','30000'],['333445555','40000'],['453453453','25000'],['666884444','38000']],440)
    a.text(600,172,'inserted: giá trị mới',22,BLUE,weight=700)
    a.table(600,195,['Ssn','Salary'],[['123456789','31000'],['333445555','41000'],['453453453','26000'],['666884444','39000']],440)
    a.line(510,300,590,300)
    a.box(60,455,980,100,'Ghép old/new theo định danh ổn định để audit',[
        'INSERT audit SELECT ... FROM inserted i JOIN deleted d ON d.Ssn=i.Ssn;'])
    a.save('sql-trigger-rows.svg')


if __name__=='__main__':
    main()
