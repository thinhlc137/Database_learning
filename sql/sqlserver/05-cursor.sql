-- SQL Server only. Run 00-setup.sql first.
USE DatabaseLearningLab;
GO
CREATE OR ALTER PROCEDURE course.PrintEmployee_Cursor
AS
BEGIN
 SET NOCOUNT ON;
 DECLARE @ssn char(9),@name nvarchar(70),@counter int=0;
 DECLARE EmployeeCursor CURSOR LOCAL FAST_FORWARD FOR
  SELECT Ssn,CONCAT(Fname,N' ',Lname)
  FROM course.EMPLOYEE ORDER BY Ssn;

 BEGIN TRY
 OPEN EmployeeCursor;
 FETCH NEXT FROM EmployeeCursor INTO @ssn,@name;
 WHILE @@FETCH_STATUS=0
 BEGIN
  IF @counter=0 PRINT N'EmployeeSSN'+NCHAR(9)+N'Name';
  PRINT @ssn+NCHAR(9)+@name;
  SET @counter=@counter+1;
  FETCH NEXT FROM EmployeeCursor INTO @ssn,@name;
 END;
 CLOSE EmployeeCursor;
 DEALLOCATE EmployeeCursor;
 END TRY
 BEGIN CATCH
  IF CURSOR_STATUS('local','EmployeeCursor')>=0 CLOSE EmployeeCursor;
  IF CURSOR_STATUS('local','EmployeeCursor')>=-1 DEALLOCATE EmployeeCursor;
  THROW;
 END CATCH;
 SELECT @counter AS PrintedRows;
END;
GO
EXEC course.PrintEmployee_Cursor;
GO
