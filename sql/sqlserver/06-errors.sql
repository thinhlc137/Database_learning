-- SQL Server only. Run 00-setup.sql first.
USE DatabaseLearningLab;
GO
CREATE OR ALTER PROCEDURE course.InsertDept
 @DNumber int,@DName nvarchar(30),
 @MgrSSN char(9)=NULL,@MgrStartDate date=NULL
AS
BEGIN
 SET NOCOUNT ON;
 SET XACT_ABORT ON;
 -- Hợp đồng ví dụ: gọi độc lập, không bên trong transaction của caller
 IF @@TRANCOUNT<>0
  THROW 50020,N'Hãy gọi InsertDept ngoài transaction đang mở.',1;
 BEGIN TRY
  BEGIN TRAN;
  INSERT INTO course.DEPARTMENT(Dname,Dnumber,Mgr_ssn,Mgr_start_date)
  VALUES(@DName,@DNumber,@MgrSSN,@MgrStartDate);
  COMMIT;
 END TRY
 BEGIN CATCH
  IF XACT_STATE()<>0 ROLLBACK;
  THROW;
 END CATCH;
END;
GO
-- Controlled demo: exception caught and displayed, no persistent data changes.
BEGIN TRY
 DECLARE @studentID int=NULL;
 IF @studentID IS NULL THROW 50010,N'Student ID cannot be NULL.',1;
END TRY
BEGIN CATCH
 SELECT ERROR_NUMBER() AS ErrorNumber,ERROR_MESSAGE() AS ErrorMessage,
        ERROR_SEVERITY() AS Severity,ERROR_STATE() AS State;
END CATCH;
GO
-- Informational message: execution continues, no CATCH for severity 10 alone.
BEGIN TRY
 RAISERROR(N'Progress: %d percent',10,1,50) WITH NOWAIT;
 PRINT N'After informational message';
END TRY
BEGIN CATCH
 THROW;
END CATCH;
GO

