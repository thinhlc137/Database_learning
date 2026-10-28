-- SQL Server only. Run 00-setup.sql first.
USE DatabaseLearningLab;
GO
CREATE OR ALTER FUNCTION course.Get_Sal(@p_id char(9))
RETURNS decimal(12,2)
AS
BEGIN
 DECLARE @salary decimal(12,2);
 SET @salary=(SELECT Salary FROM course.EMPLOYEE WHERE Ssn=@p_id);
 RETURN @salary;
END;
GO
SELECT course.Get_Sal('333445555') AS FranklinSalary;
SELECT course.Get_Sal('111222333') AS MaiSalary;
SELECT course.Get_Sal('000000000') AS MissingEmployee;
GO
CREATE OR ALTER FUNCTION course.EmployeesByDept(@dno int)
RETURNS TABLE
AS
RETURN (
 SELECT Ssn,Fname,Lname,Salary
 FROM course.EMPLOYEE WHERE Dno=@dno
);
GO
SELECT Fname,Salary FROM course.EmployeesByDept(5)
WHERE Salary>=30000 ORDER BY Fname;
GO
CREATE OR ALTER FUNCTION course.EmpAndDependent()
RETURNS @person TABLE(
 first_name nvarchar(30),last_name nvarchar(30),
 sex char(1),person_type varchar(10)
)
AS
BEGIN
 INSERT INTO @person(first_name,last_name,sex,person_type)
 SELECT Fname,Lname,Sex,'Employee' FROM course.EMPLOYEE;

 INSERT INTO @person(first_name,last_name,sex,person_type)
 SELECT d.Dependent_name,e.Lname,d.Sex,'Dependent'
 FROM course.DEPENDENT d JOIN course.EMPLOYEE e ON e.Ssn=d.Essn;
 RETURN;
END;
GO
SELECT person_type,COUNT(*) AS N
FROM course.EmpAndDependent()
GROUP BY person_type;
GO
