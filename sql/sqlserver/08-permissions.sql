-- Optional SQL Server permissions lab. Use only the dedicated learning database.
-- Requires authority to create users and grant permissions in this database.
-- Creates database-only demo users WITHOUT LOGIN; no server login/password.
USE DatabaseLearningLab;
GO
IF DATABASE_PRINCIPAL_ID(N'CourseA2') IS NULL CREATE USER CourseA2 WITHOUT LOGIN;
IF DATABASE_PRINCIPAL_ID(N'CourseA3') IS NULL CREATE USER CourseA3 WITHOUT LOGIN;
IF DATABASE_PRINCIPAL_ID(N'CourseA4') IS NULL CREATE USER CourseA4 WITHOUT LOGIN;
GO
CREATE OR ALTER VIEW course.ResearchPublic AS
SELECT Fname,Lname,Bdate,Address FROM course.EMPLOYEE WHERE Dno=5;
GO
GRANT INSERT,DELETE ON OBJECT::course.DEPARTMENT TO CourseA2;
GRANT SELECT ON OBJECT::course.EMPLOYEE TO CourseA3 WITH GRANT OPTION;
GO
EXECUTE AS USER=N'CourseA3';
GRANT SELECT ON OBJECT::course.EMPLOYEE TO CourseA4;
REVERT;
GO
EXECUTE AS USER=N'CourseA4';
SELECT HAS_PERMS_BY_NAME(N'course.EMPLOYEE',N'OBJECT',N'SELECT') AS CanReadBefore; -- 1
REVERT;
GO
REVOKE SELECT ON OBJECT::course.EMPLOYEE FROM CourseA3 CASCADE;
GO
EXECUTE AS USER=N'CourseA4';
SELECT HAS_PERMS_BY_NAME(N'course.EMPLOYEE',N'OBJECT',N'SELECT') AS CanReadAfter; -- 0 in this isolated demo
REVERT;
GO
GRANT SELECT ON OBJECT::course.ResearchPublic TO CourseA3;
GRANT UPDATE(Salary) ON OBJECT::course.EMPLOYEE TO CourseA4;
GO
EXECUTE AS USER=N'CourseA3';
SELECT Fname,Lname FROM course.ResearchPublic ORDER BY Fname;
REVERT;
GO
-- Demo principals and permissions remain in the learning database for inspection.
-- If an interrupted EXECUTE AS leaves impersonation active, use REVERT.
