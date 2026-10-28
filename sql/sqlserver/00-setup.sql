-- SQL Server 2016 SP1+ (CREATE OR ALTER), run with SSMS/sqlcmd.
-- Creates an isolated learning database. Existing course tables cause a stop.
USE master;
GO
IF DB_ID(N'DatabaseLearningLab') IS NULL
 EXEC(N'CREATE DATABASE DatabaseLearningLab;');
GO
USE DatabaseLearningLab;
GO
IF SCHEMA_ID(N'course') IS NULL EXEC(N'CREATE SCHEMA course AUTHORIZATION dbo;');
GO
IF OBJECT_ID(N'course.EMPLOYEE') IS NOT NULL OR OBJECT_ID(N'course.DEPARTMENT') IS NOT NULL
 OR OBJECT_ID(N'course.PROJECT') IS NOT NULL OR OBJECT_ID(N'course.WORKS_ON') IS NOT NULL
 OR OBJECT_ID(N'course.DEPENDENT') IS NOT NULL OR OBJECT_ID(N'course.DEPT_LOCATIONS') IS NOT NULL
 THROW 50030,N'Course tables already exist. Setup stopped; no data was replaced.',1;
SET XACT_ABORT ON;
BEGIN TRY
 BEGIN TRAN;
 CREATE TABLE course.DEPARTMENT(
  Dname nvarchar(30) NOT NULL CONSTRAINT UQ_Department_Name UNIQUE,
  Dnumber int NOT NULL CONSTRAINT PK_Department PRIMARY KEY,
  Mgr_ssn char(9) NULL,Mgr_start_date date NULL
 );
 CREATE TABLE course.EMPLOYEE(
  Fname nvarchar(30) NOT NULL,Minit char(1) NULL,Lname nvarchar(30) NOT NULL,
  Ssn char(9) NOT NULL CONSTRAINT PK_Employee PRIMARY KEY,
  Bdate date NULL,Address nvarchar(100) NULL,Sex char(1) NULL,
  Salary decimal(12,2) NULL CONSTRAINT CK_Employee_Salary CHECK(Salary>=0),
  Super_ssn char(9) NULL,Dno int NOT NULL
 );
 CREATE TABLE course.DEPT_LOCATIONS(
  Dnumber int NOT NULL,Dlocation nvarchar(30) NOT NULL,
  CONSTRAINT PK_Dept_Locations PRIMARY KEY(Dnumber,Dlocation),
  CONSTRAINT FK_Locations_Department FOREIGN KEY(Dnumber)
   REFERENCES course.DEPARTMENT(Dnumber) ON DELETE CASCADE
 );
 CREATE TABLE course.PROJECT(
  Pname nvarchar(30) NOT NULL CONSTRAINT UQ_Project_Name UNIQUE,
  Pnumber int NOT NULL CONSTRAINT PK_Project PRIMARY KEY,
  Plocation nvarchar(30) NULL,Dnum int NOT NULL,
  CONSTRAINT FK_Project_Department FOREIGN KEY(Dnum) REFERENCES course.DEPARTMENT(Dnumber)
 );
 CREATE TABLE course.WORKS_ON(
  Essn char(9) NOT NULL,Pno int NOT NULL,Hours decimal(5,1) NULL,
  CONSTRAINT PK_Works_On PRIMARY KEY(Essn,Pno),
  CONSTRAINT CK_Works_On_Hours CHECK(Hours>=0 AND Hours<=168),
  CONSTRAINT FK_Works_Employee FOREIGN KEY(Essn) REFERENCES course.EMPLOYEE(Ssn) ON DELETE CASCADE,
  CONSTRAINT FK_Works_Project FOREIGN KEY(Pno) REFERENCES course.PROJECT(Pnumber) ON DELETE CASCADE
 );
 CREATE TABLE course.DEPENDENT(
  Essn char(9) NOT NULL,Dependent_name nvarchar(30) NOT NULL,
  Sex char(1) NULL,Bdate date NULL,Relationship nvarchar(20) NULL,
  CONSTRAINT PK_Dependent PRIMARY KEY(Essn,Dependent_name),
  CONSTRAINT FK_Dependent_Employee FOREIGN KEY(Essn) REFERENCES course.EMPLOYEE(Ssn) ON DELETE CASCADE
 );
INSERT INTO course.DEPARTMENT VALUES
 ('Research',5,'333445555','19880522'),
 ('Administration',4,'987654321','19950101'),
 ('Headquarters',1,'888665555','19810619'),
 ('Innovation',9,NULL,NULL);
INSERT INTO course.EMPLOYEE VALUES
 ('John','B','Smith','123456789','19650109','Houston','M',30000,'333445555',5),
 ('Franklin','T','Wong','333445555','19551208','Houston','M',40000,'888665555',5),
 ('Alicia','J','Zelaya','999887777','19680119','Spring','F',25000,'987654321',4),
 ('Jennifer','S','Wallace','987654321','19410620','Bellaire','F',43000,'888665555',4),
 ('Ramesh','K','Narayan','666884444','19620915','Humble','M',38000,'333445555',5),
 ('Joyce','A','English','453453453','19720731','Houston','F',25000,'333445555',5),
 ('Ahmad','V','Jabbar','987987987','19690329','Houston','M',25000,'987654321',4),
 ('James','E','Borg','888665555','19371110','Houston','M',55000,NULL,1),
 ('Mai',NULL,'Nguyen','111222333','20000101','HCMC','F',NULL,'987654321',4);
INSERT INTO course.DEPT_LOCATIONS VALUES (1,'Houston'),(4,'Stafford'),(5,'Bellaire'),(5,'Sugarland'),(5,'Houston');
INSERT INTO course.PROJECT VALUES
 ('ProductX',1,'Bellaire',5),('ProductY',2,'Sugarland',5),('ProductZ',3,'Houston',5),
 ('Computerization',10,'Stafford',4),('Reorganization',20,'Houston',1),('Newbenefits',30,'Stafford',4);
INSERT INTO course.WORKS_ON VALUES
 ('123456789',1,32.5),('123456789',2,7.5),('333445555',2,10),('333445555',3,10),
 ('333445555',10,10),('333445555',20,10),('999887777',30,30),('999887777',10,10),
 ('987654321',30,20),('987654321',20,15),('666884444',3,40),
 ('453453453',1,20),('453453453',2,20),('987987987',10,35),('987987987',30,5),
 ('888665555',20,NULL);
INSERT INTO course.DEPENDENT VALUES
 ('333445555','Alice','F','19860405','Daughter'),('333445555','Theodore','M','19831025','Son'),
 ('333445555','Joy','F','19580503','Spouse'),('987654321','Abner','M','19420228','Spouse'),
 ('123456789','Michael','M','19880104','Son'),('123456789','Alice','F','19881230','Daughter'),
 ('123456789','Elizabeth','F','19670505','Spouse');

 -- Add cyclic references after both tables and valid rows exist.
 ALTER TABLE course.EMPLOYEE ADD CONSTRAINT FK_Employee_Supervisor
  FOREIGN KEY(Super_ssn) REFERENCES course.EMPLOYEE(Ssn);
 ALTER TABLE course.EMPLOYEE ADD CONSTRAINT FK_Employee_Department
  FOREIGN KEY(Dno) REFERENCES course.DEPARTMENT(Dnumber);
 ALTER TABLE course.DEPARTMENT ADD CONSTRAINT FK_Department_Manager
  FOREIGN KEY(Mgr_ssn) REFERENCES course.EMPLOYEE(Ssn);
 CREATE UNIQUE INDEX UX_Department_Manager ON course.DEPARTMENT(Mgr_ssn)
  WHERE Mgr_ssn IS NOT NULL;
 COMMIT;
END TRY
BEGIN CATCH
 IF XACT_STATE()<>0 ROLLBACK;
 THROW;
END CATCH;
GO
SELECT COUNT(*) AS Employees FROM course.EMPLOYEE; -- 9
SELECT COUNT(*) AS Departments FROM course.DEPARTMENT; -- 4
SELECT SUM(Salary) AS KnownPayroll FROM course.EMPLOYEE; -- 281000
GO
