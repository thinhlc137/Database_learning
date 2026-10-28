-- SQL Server only. Run 00-setup.sql first.
USE DatabaseLearningLab;
GO
DECLARE @name nvarchar(30);              -- NULL
DECLARE @message nvarchar(30)=N'Xin chào';
DECLARE @count int=0,@factor decimal(5,2)=1.20;
SELECT @name AS Name,@message AS Message,@count AS CountValue;
GO
DECLARE @pattern varchar(30);
SET @pattern='J%';
SELECT Fname,Lname FROM course.EMPLOYEE
WHERE Fname LIKE @pattern ORDER BY Ssn;
GO
DECLARE @x int=99;
SELECT @x=Dnumber FROM course.DEPARTMENT WHERE Dnumber=999;
SELECT @x AS AfterSelect;      -- 99
SET @x=(SELECT Dnumber FROM course.DEPARTMENT WHERE Dnumber=999);
SELECT @x AS AfterSet;         -- NULL
GO
DECLARE @total decimal(19,2);
SELECT @total=COALESCE(SUM(Salary),0) FROM course.EMPLOYEE;
IF @total>250000
BEGIN
 PRINT N'Quỹ lương đã biết lớn hơn 250000';
END
ELSE
BEGIN
 PRINT N'Quỹ lương đã biết không vượt 250000';
END;
GO
DECLARE @counter int=1;
WHILE @counter<=5
BEGIN
 PRINT @counter;
 SET @counter=@counter+1;
END;
GO
DECLARE @num int=1;
WHILE @num<=10
BEGIN
 IF @num=5
 BEGIN
  SET @num=@num+1;
  CONTINUE;
 END;
 IF @num=8
 BEGIN
  PRINT 'Loop stopped at number 8.';
  BREAK;
 END;
 PRINT 'Current number: '+CAST(@num AS varchar(11));
 SET @num=@num+1;
END;
GO

