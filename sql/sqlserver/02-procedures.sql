-- SQL Server only. Run 00-setup.sql first.
USE DatabaseLearningLab;
GO
CREATE OR ALTER PROCEDURE course.ListEmployees
 @Dno int=5
AS
BEGIN
 SET NOCOUNT ON;
 SELECT Ssn,Fname,Lname,Salary
 FROM course.EMPLOYEE WHERE Dno=@Dno ORDER BY Ssn;
END;
GO
EXEC course.ListEmployees;              -- default 5
EXEC course.ListEmployees @Dno=4;        -- named argument
GO
CREATE OR ALTER PROCEDURE course.Update_Sal
 @p_emp_id char(9),
 @p_factor decimal(5,2),
 @new_salary decimal(12,2) OUTPUT
AS
BEGIN
 SET NOCOUNT ON;
 SET @new_salary=NULL;
 IF @p_factor IS NULL OR @p_factor<=0
  THROW 50001,N'Hệ số phải lớn hơn 0.',1;

 DECLARE @changed TABLE(Salary decimal(12,2));
 UPDATE course.EMPLOYEE
 SET Salary=Salary*@p_factor
 OUTPUT inserted.Salary INTO @changed(Salary)
 WHERE Ssn=@p_emp_id;
 IF @@ROWCOUNT=0
  THROW 50002,N'Không tìm thấy nhân viên.',1;

 SELECT @new_salary=Salary FROM @changed;
 RETURN 0;
END;
GO
DECLARE @salary decimal(12,2),@status int;
BEGIN TRAN;
EXEC @status=course.Update_Sal
 @p_emp_id='123456789',@p_factor=1.20,@new_salary=@salary OUTPUT;
SELECT @status AS Status,@salary AS NewSalary;
ROLLBACK;
GO
