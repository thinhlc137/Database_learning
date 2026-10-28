-- SQL Server only. Run 00-setup.sql first.
USE DatabaseLearningLab;
GO
-- Run after 01..06. Raises an error if an expectation fails.
-- Tests use rollback. Do not run with a pre-existing transaction.
IF @@TRANCOUNT<>0 THROW 50040,N'Run self-check outside a transaction.',1;
IF (SELECT COUNT(*) FROM course.EMPLOYEE)<>9 THROW 50041,N'Fixture changed: expected 9 employees.',1;
IF course.Get_Sal('333445555')<>40000 THROW 50042,N'Get_Sal failed.',1;
IF (SELECT COUNT(*) FROM course.EmpAndDependent())<>16 THROW 50043,N'TVF failed.',1;
IF (SELECT COUNT(*) FROM course.EmployeesByDept(5))<>4 THROW 50044,N'Inline TVF failed.',1;
GO
BEGIN TRY
 BEGIN TRAN;
 DECLARE @new decimal(12,2),@status int;
 EXEC @status=course.Update_Sal '123456789',1.20,@new OUTPUT;
 IF @status<>0 OR @new IS NULL OR @new<>36000 THROW 50045,N'Procedure OUTPUT failed.',1;
 ROLLBACK;
END TRY
BEGIN CATCH
 IF XACT_STATE()<>0 ROLLBACK;
 THROW;
END CATCH;
GO
-- Multirow audit; audit rows are also rolled back.
BEGIN TRY
 BEGIN TRAN;
 DECLARE @before int=(SELECT COUNT(*) FROM course.SalaryAudit);
 UPDATE course.EMPLOYEE SET Salary=Salary+1000 WHERE Dno=5;
 IF (SELECT COUNT(*) FROM course.SalaryAudit)<>@before+4
  THROW 50046,N'Multirow audit failed.',1;
 ROLLBACK;
END TRY
BEGIN CATCH
 IF XACT_STATE()<>0 ROLLBACK;
 THROW;
END CATCH;
GO
-- Both rows in a single INSERT must be rejected by the trigger.
BEGIN TRY
 BEGIN TRAN;
 INSERT INTO course.DEPARTMENT(Dname,Dnumber) VALUES(N'TestValid',10),(N'TestInvalid',99);
 ROLLBACK;
 THROW 50047,N'Trigger failed to reject Dnumber=99.',1;
END TRY
BEGIN CATCH
 IF XACT_STATE()<>0 ROLLBACK;
 IF ERROR_NUMBER()<>51001 THROW;
 PRINT N'PASS: multirow trigger rejected invalid department.';
END CATCH;
GO
-- Invalid factor must be rejected before UPDATE.
BEGIN TRY
 DECLARE @salary decimal(12,2);
 EXEC course.Update_Sal '123456789',0,@salary OUTPUT;
 THROW 50048,N'Procedure failed to reject factor=0.',1;
END TRY
BEGIN CATCH
 IF ERROR_NUMBER()<>50001 THROW;
 PRINT N'PASS: invalid factor rejected.';
END CATCH;
GO
EXEC course.PrintEmployee_Cursor; -- PrintedRows=9
PRINT N'Self-check completed. Inspect expected outputs and errors above.';
GO

