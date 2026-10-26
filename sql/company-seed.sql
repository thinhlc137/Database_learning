-- Familiar COMPANY names; synthetic teaching fixture, not an official answer key.
-- Added: Mai (unknown salary, no assignment); Innovation (empty department).
BEGIN;
INSERT INTO DEPARTMENT VALUES
 ('Research',5,'333445555','1988-05-22'),
 ('Administration',4,'987654321','1995-01-01'),
 ('Headquarters',1,'888665555','1981-06-19'),
 ('Innovation',9,NULL,NULL);
INSERT INTO EMPLOYEE VALUES
 ('John','B','Smith','123456789','1965-01-09','Houston','M',30000,'333445555',5),
 ('Franklin','T','Wong','333445555','1955-12-08','Houston','M',40000,'888665555',5),
 ('Alicia','J','Zelaya','999887777','1968-01-19','Spring','F',25000,'987654321',4),
 ('Jennifer','S','Wallace','987654321','1941-06-20','Bellaire','F',43000,'888665555',4),
 ('Ramesh','K','Narayan','666884444','1962-09-15','Humble','M',38000,'333445555',5),
 ('Joyce','A','English','453453453','1972-07-31','Houston','F',25000,'333445555',5),
 ('Ahmad','V','Jabbar','987987987','1969-03-29','Houston','M',25000,'987654321',4),
 ('James','E','Borg','888665555','1937-11-10','Houston','M',55000,NULL,1),
 ('Mai',NULL,'Nguyen','111222333','2000-01-01','HCMC','F',NULL,'987654321',4);
INSERT INTO DEPT_LOCATIONS VALUES (1,'Houston'),(4,'Stafford'),(5,'Bellaire'),(5,'Sugarland'),(5,'Houston');
INSERT INTO PROJECT VALUES
 ('ProductX',1,'Bellaire',5),('ProductY',2,'Sugarland',5),('ProductZ',3,'Houston',5),
 ('Computerization',10,'Stafford',4),('Reorganization',20,'Houston',1),('Newbenefits',30,'Stafford',4);
INSERT INTO WORKS_ON VALUES
 ('123456789',1,32.5),('123456789',2,7.5),('333445555',2,10),('333445555',3,10),
 ('333445555',10,10),('333445555',20,10),('999887777',30,30),('999887777',10,10),
 ('987654321',30,20),('987654321',20,15),('666884444',3,40),
 ('453453453',1,20),('453453453',2,20),('987987987',10,35),('987987987',30,5),
 ('888665555',20,NULL);
INSERT INTO DEPENDENT VALUES
 ('333445555','Alice','F','1986-04-05','Daughter'),('333445555','Theodore','M','1983-10-25','Son'),
 ('333445555','Joy','F','1958-05-03','Spouse'),('987654321','Abner','M','1942-02-28','Spouse'),
 ('123456789','Michael','M','1988-01-04','Son'),('123456789','Alice','F','1988-12-30','Daughter'),
 ('123456789','Elizabeth','F','1967-05-05','Spouse');
COMMIT;
