USE master
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'go-elastic-pool-dbs-dev/Solid')
BEGIN
	ALTER DATABASE [go-elastic-pool-dbs-dev/Solid] SET SINGLE_USER WITH ROLLBACK IMMEDIATE
	DROP DATABASE [go-elastic-pool-dbs-dev/Solid];
END
GO

-- #>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#><##
-- ----------------------------------------------------------------------------------------------------------------
-- Catalog 'go-elastic-pool-dbs-dev/Solid'
-- ----------------------------------------------------------------------------------------------------------------
USE master
GO
CREATE DATABASE [go-elastic-pool-dbs-dev/Solid] /* ON PRIMARY (NAME=go-elastic-pool-dbs-dev/Solid_dat, FILENAME='c:\mycatalogs\ go-elastic-pool-dbs-dev/Solid.mdf', SIZE=10MB) */
GO

USE [go-elastic-pool-dbs-dev/Solid]
GO

-- CREATE LOGIN [.\\FenomenModelerUser] FROM WINDOWS WITH DEFAULT_DATABASE=[PulpDesigner], DEFAULT_LANGUAGE=[us_english] 
-- GO

-- CREATE USER [FenomenModelerUser] FOR LOGIN [.\\FenomenModelerUser] WITH DEFAULT_SCHEMA=[dbo]
-- GO

-- sp_addrolemember  'db_owner', 'FenomenModelerUser'
-- GO

-- ----------------------------------------------------------------------------------------------------------------
-- Users contained in DB : 'app' and 'consult'
-- ----------------------------------------------------------------------------------------------------------------
IF ServerProperty('Edition') != 'SQL Azure'
BEGIN
    EXEC sp_configure 'contained database authentication', 1
    EXEC ('RECONFIGURE')
    EXEC ('ALTER DATABASE [go-elastic-pool-dbs-dev/Solid] SET containment = partial')
END
GO
-- Create user 'app' (Insert, Delete, Update and Select) --
CREATE USER app WITH PASSWORD = 'E2DC52BF-24E9-4756-BD1B-3C8E1DE70934'
ALTER ROLE db_datareader  ADD MEMBER app
ALTER ROLE db_datawriter  ADD MEMBER app
GO
-- Create user 'consult' (Select only) --
CREATE USER consult WITH PASSWORD = 'CCE90C2E-1191-44AC-AB11-B92B877DDE8F'
ALTER ROLE db_datareader  ADD MEMBER consult
GO


-- ----------------------------------------------------------------------------------------------------------------
-- Schema 'dbo'
-- ----------------------------------------------------------------------------------------------------------------

-- -------[ Tables ]-----------------------------------------------------------------------------------------------
CREATE TABLE [dbo].[UserProfile] 
(
	[Uri] [nvarchar] (300) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL 
) ON [PRIMARY]
GO 
-- ----------------------------------------------------------------------------------------------------------------
-- Schema 'GOSecurity'
-- ----------------------------------------------------------------------------------------------------------------
CREATE SCHEMA [GOSecurity] /* AUTHORIZATION owner_name */
GO

-- -------[ Tables ]-----------------------------------------------------------------------------------------------
CREATE TABLE [GOSecurity].[GOGroup] 
(
	[DisplayName] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, 
	[Name] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, 
	[Description] [nvarchar] (250) COLLATE SQL_Latin1_General_CP1_CI_AS NULL, 
	[IsSpecialGroup] [bit] NOT NULL, 
	[SpecialGroup] [int] NOT NULL 
) ON [PRIMARY]
GO 
CREATE TABLE [GOSecurity].[GOGroupRole] 
(
	[GOGroupName] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, 
	[GORoleName] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL 
) ON [PRIMARY]
GO 
CREATE TABLE [GOSecurity].[GOLoginHistory] 
(
	[Id] [int] IDENTITY (1,1) NOT NULL, 
	[Info] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, 
	[User] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, 
	[Timestamp] [datetime] NOT NULL, 
	[Result] [bit] NOT NULL 
) ON [PRIMARY]
GO 
CREATE TABLE [GOSecurity].[GOUser] 
(
	[Id] [uniqueidentifier] NOT NULL, 
	[EmailAddress] [nvarchar] (150) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, 
	[UserName] [nvarchar] (150) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, 
	[FullName] [nvarchar] (250) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, 
	[LastName] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL, 
	[Password] [nvarchar] (150) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL, 
	[FirstName] [nvarchar] (100) COLLATE SQL_Latin1_General_CP1_CI_AS NULL, 
	[PasswordExpiry] [datetime] NULL, 
	[Unregistered] [bit] NOT NULL, 
	[EmailValidated] [bit] NOT NULL, 
	[Blocked] [bit] NOT NULL, 
	[UserValidated] [bit] NOT NULL 
) ON [PRIMARY]
GO 
CREATE TABLE [GOSecurity].[GOUserGroup] 
(
	[GOUserId] [uniqueidentifier] NOT NULL, 
	[GOGroupName] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL 
) ON [PRIMARY]
GO 
CREATE TABLE [GOSecurity].[GOUserRole] 
(
	[GOUserId] [uniqueidentifier] NOT NULL, 
	[GORoleName] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL 
) ON [PRIMARY]
GO 
-- ----------------------------------------------------------------------------------------------------------------
-- LiveUpdate Model Sync
-- ----------------------------------------------------------------------------------------------------------------
CREATE SCHEMA [GO.LiveUpdate]
GO
CREATE TABLE [GO.LiveUpdate].[ModelSync](
	[Id] [uniqueidentifier] NOT NULL,
	[ModelRevisionId] [int] NOT NULL,
	[When] [datetime] NOT NULL,
CONSTRAINT [PK_ModelSyncId] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO 
-- #>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#>#><##
-- ----------------------------------------------------------------------------------------------------------------
-- Catalog 'go-elastic-pool-dbs-dev/Solid'
-- ----------------------------------------------------------------------------------------------------------------
USE [go-elastic-pool-dbs-dev/Solid]
GO
-- ----------------------------------------------------------------------------------------------------------------
-- Primary Key constraints for schema 'dbo'
-- ----------------------------------------------------------------------------------------------------------------
ALTER TABLE [dbo].[UserProfile] WITH NOCHECK 
	ADD CONSTRAINT [PK_UserProfile] PRIMARY KEY CLUSTERED 
	( 
		[Uri] 
	) ON [PRIMARY]
GO 
-- ----------------------------------------------------------------------------------------------------------------
-- Unique constraints for schema 'dbo'
-- ----------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------
-- Primary Key constraints for schema 'GOSecurity'
-- ----------------------------------------------------------------------------------------------------------------
ALTER TABLE [GOSecurity].[GOGroup] WITH NOCHECK 
	ADD CONSTRAINT [PK_GOGroup] PRIMARY KEY CLUSTERED 
	( 
		[Name] 
	) ON [PRIMARY]
GO 
ALTER TABLE [GOSecurity].[GOGroupRole] WITH NOCHECK 
	ADD CONSTRAINT [PK_GOGroupRole] PRIMARY KEY CLUSTERED 
	( 
		[GOGroupName], [GORoleName] 
	) ON [PRIMARY]
GO 
ALTER TABLE [GOSecurity].[GOLoginHistory] WITH NOCHECK 
	ADD CONSTRAINT [PK_GOLoginHistory] PRIMARY KEY CLUSTERED 
	( 
		[Id] 
	) ON [PRIMARY]
GO 
ALTER TABLE [GOSecurity].[GOUser] WITH NOCHECK 
	ADD CONSTRAINT [PK_GOUser] PRIMARY KEY CLUSTERED 
	( 
		[Id] 
	) ON [PRIMARY]
GO 
ALTER TABLE [GOSecurity].[GOUserGroup] WITH NOCHECK 
	ADD CONSTRAINT [PK_GOUserGroup] PRIMARY KEY CLUSTERED 
	( 
		[GOGroupName], [GOUserId] 
	) ON [PRIMARY]
GO 
ALTER TABLE [GOSecurity].[GOUserRole] WITH NOCHECK 
	ADD CONSTRAINT [PK_GOUserRole] PRIMARY KEY CLUSTERED 
	( 
		[GORoleName], [GOUserId] 
	) ON [PRIMARY]
GO 
-- ----------------------------------------------------------------------------------------------------------------
-- Unique constraints for schema 'GOSecurity'
-- ----------------------------------------------------------------------------------------------------------------
IF (SELECT COUNT (*) FROM [GOSecurity].[GOUser] WHERE [UserName] IS NULL) <= 1 
BEGIN
CREATE UNIQUE NONCLUSTERED INDEX [U_GOUser_UserProfile]
ON [GOSecurity].[GOUser] 	
	([UserName]) 
END
ELSE
BEGIN
	PRINT 'WARNING: Failed to apply Unique Constraint on entity table GOUser - there is more than one existing NULL in mandatory column(s): [UserName]'
END
GO 
IF (SELECT COUNT (*) FROM [GOSecurity].[GOUser] WHERE [UserName] IS NULL) <= 1 
BEGIN
CREATE UNIQUE NONCLUSTERED INDEX [U_UserNameUniqueConstraint]
ON [GOSecurity].[GOUser] 	
	([UserName]) 
END
ELSE
BEGIN
	PRINT 'WARNING: Failed to apply Unique Constraint on entity table GOUser - there is more than one existing NULL in mandatory column(s): [UserName]'
END
GO 

-- ----------------------------------------------------------------------------------------------------------------
-- All foreign Key constraints
-- ----------------------------------------------------------------------------------------------------------------
ALTER TABLE [GOSecurity].[GOGroupRole] 
	ADD CONSTRAINT [FK_GOGroupRole_GOGroup_25573f8a-6428-413f-86e5-fdca2856d7fd] FOREIGN KEY
	(
		[GOGroupName] 
	)
	REFERENCES [GOSecurity].[GOGroup]
	(
		[Name] 
	) ON UPDATE NO ACTION ON DELETE NO ACTION 
GO 
ALTER TABLE [GOSecurity].[GOUser] 
	ADD CONSTRAINT [FK_GOUser_UserProfile_2f6a1f05-9cc8-4eb0-be38-6afcce780faa] FOREIGN KEY
	(
		[UserName] 
	)
	REFERENCES [dbo].[UserProfile]
	(
		[Uri] 
	) ON UPDATE NO ACTION ON DELETE NO ACTION 
GO 
ALTER TABLE [GOSecurity].[GOUserGroup] 
	ADD CONSTRAINT [FK_GOUserGroup_GOUser_804177ee-5952-4650-843d-35ab88fbb191] FOREIGN KEY
	(
		[GOUserId] 
	)
	REFERENCES [GOSecurity].[GOUser]
	(
		[Id] 
	) ON UPDATE NO ACTION ON DELETE NO ACTION 
GO 
ALTER TABLE [GOSecurity].[GOUserGroup] 
	ADD CONSTRAINT [FK_GOUserGroup_GOGroup_88da1414-3ade-4077-b6c3-b14e3513ff63] FOREIGN KEY
	(
		[GOGroupName] 
	)
	REFERENCES [GOSecurity].[GOGroup]
	(
		[Name] 
	) ON UPDATE NO ACTION ON DELETE NO ACTION 
GO 
ALTER TABLE [GOSecurity].[GOUserRole] 
	ADD CONSTRAINT [FK_GOUserRole_GOUser_6bf995e9-d718-4571-9e3f-f002c222bf0c] FOREIGN KEY
	(
		[GOUserId] 
	)
	REFERENCES [GOSecurity].[GOUser]
	(
		[Id] 
	) ON UPDATE NO ACTION ON DELETE NO ACTION 
GO 
		
 
-- ----------------------------------------------------------------------------------------------------------------
-- Default Admin user
-- ----------------------------------------------------------------------------------------------------------------
DECLARE @AdminIdTable table(Id uniqueidentifier NOT NULL);
INSERT INTO GOSecurity.GOUser (Id, UserName, FullName, Password, EmailAddress, EmailValidated, UserValidated, Blocked, Unregistered) OUTPUT Inserted.ID INTO @AdminIdTable VALUES (NEWID(), 'Admin', 'Admin', 'e3afed0047b08059d0fada10f400c1e5', 'admin@generativeobjects.com', 'True', 'True', 'False', 'False')
INSERT INTO GOSecurity.GOUserRole (GOUserId, GORoleName) VALUES ((SELECT TOP (1) Id From @AdminIdTable), 'Administrator')
GO
-- ----------------------------------------------------------------------------------------------------------------
-- Add special group for guest (anonymous) access
-- ----------------------------------------------------------------------------------------------------------------
INSERT INTO GOSecurity.GOGroup(IsSpecialGroup, SpecialGroup, Name, DisplayName, Description) VALUES(1, 1, 'AnonymousUsers', 'Anonymous Users', NULL)
GO
-- ----------------------------------------------------------------------------------------------------------------
-- Assign Anonymous Users the Guest role
-- ----------------------------------------------------------------------------------------------------------------
INSERT INTO GOSecurity.GOGroupRole(GORoleName,GOGroupName) VALUES('Guest', 'AnonymousUsers')
GO
-- ----------------------------------------------------------------------------------------------------------------
-- LiveUpdate Model Sync
-- ----------------------------------------------------------------------------------------------------------------
INSERT INTO [GO.LiveUpdate].[ModelSync] ([Id], [ModelRevisionId], [When]) VALUES ('AF3DF4FF-A05A-4969-9796-FAC22A6ED2AF', 46, GETUTCDATE())
GO
-- ----------------------------------------------------------------------------------------------------------------
