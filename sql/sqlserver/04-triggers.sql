-- SQL Server only. Run 00-setup.sql first.
USE DatabaseLearningLab;
GO
IF OBJECT_ID(N'course.SalaryAudit',N'U') IS NULL
BEGIN
 CREATE TABLE course.SalaryAudit(
  AuditId int IDENTITY(1,1) NOT NULL CONSTRAINT PK_SalaryAudit PRIMARY KEY,
  Ssn char(9) NOT NULL,OldSalary decimal(12,2) NULL,NewSalary decimal(12,2) NULL,
  ChangedAt datetime2(3) NOT NULL CONSTRAINT DF_SalaryAudit_Time DEFAULT SYSUTCDATETIME()
 );
END;
GO
CREATE OR ALTER TRIGGER course.Check_Dnumber
ON course.DEPARTMENT AFTER INSERT,UPDATE
AS
BEGIN
 SET NOCOUNT ON;
 IF EXISTS(SELECT 1 FROM inserted WHERE Dnumber<1 OR Dnumber>20)
 BEGIN
  THROW 51001,N'Dnumber phải thuộc 1..20.',1;
 END;
END;
GO
CREATE OR ALTER TRIGGER course.CHECK_AGE
ON course.EMPLOYEE AFTER INSERT,UPDATE
AS
BEGIN
 SET NOCOUNT ON;
 IF EXISTS (
  SELECT 1 FROM inserted
  WHERE Bdate IS NULL
     OR DATEADD(year,18,Bdate)>CONVERT(date,GETDATE())
 )
 BEGIN
  THROW 51000,N'Nhân viên phải có ngày sinh và đủ 18 tuổi.',1;
 END;
END;
GO
CREATE OR ALTER TRIGGER course.AuditSalary
ON course.EMPLOYEE AFTER UPDATE
AS
BEGIN
 SET NOCOUNT ON;
 INSERT INTO course.SalaryAudit(Ssn,OldSalary,NewSalary)
 SELECT i.Ssn,d.Salary,i.Salary
 FROM inserted i JOIN deleted d ON d.Ssn=i.Ssn
 WHERE i.Salary<>d.Salary
    OR (i.Salary IS NULL AND d.Salary IS NOT NULL)
    OR (i.Salary IS NOT NULL AND d.Salary IS NULL);
END;
GO
