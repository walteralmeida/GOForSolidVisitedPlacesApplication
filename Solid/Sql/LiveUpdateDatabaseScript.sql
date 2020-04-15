﻿-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- BEGIN LIVE UPDATE DATABASE TRANSACTION
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
SET NOCOUNT ON
SET NOEXEC OFF
SET ARITHABORT ON
SET XACT_ABORT ON
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
GO
BEGIN TRAN
GO
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- CREATE SCHEMAS
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- TRANSFER SCHEMAS
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- DROP UNIQUE CONSTRAINTS
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- DROP FK CONSTRAINTS
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- DROP PK CONSTRAINTS
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- DROP TABLEs
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- CREATE TABLEs
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- step 1: create table dbo.UserProfile 
CREATE TABLE [dbo].[UserProfile] 
(
	[Uri] [nvarchar] (150) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL 
) ON [PRIMARY]
GO
IF @@ERROR <> 0 AND @@TRANCOUNT > 0 BEGIN PRINT 'error at step 1, transaction will be rolled back' ROLLBACK TRAN END
GO
IF @@TRANCOUNT = 0 BEGIN PRINT 'Error at step 1' SET NOEXEC ON END
GO
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- RENAME TABLEs
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- COLUMN Drops (soft)
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- COLUMN RENAMEs
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- COLUMN ADDs
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- COLUMN MODIFYs
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- COLUMN Drops (hard)
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ADD PK CONSTRAINTS
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- step 2: Add Primary Key Constraint dbo.UserProfile 
ALTER TABLE [dbo].[UserProfile] WITH NOCHECK 
	ADD CONSTRAINT [PK_UserProfile] PRIMARY KEY CLUSTERED 
	( 
		[Uri] 
	) ON [PRIMARY]
GO
IF @@ERROR <> 0 AND @@TRANCOUNT > 0 BEGIN PRINT 'error at step 2, transaction will be rolled back' ROLLBACK TRAN END
GO
IF @@TRANCOUNT = 0 BEGIN PRINT 'Error at step 2' SET NOEXEC ON END
GO
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ADD FK CONSTRAINTS
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- step 3: Add Foreign Key Constraint GOSecurity.GOUser to dbo.UserProfile 
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
IF @@ERROR <> 0 AND @@TRANCOUNT > 0 BEGIN PRINT 'error at step 3, transaction will be rolled back' ROLLBACK TRAN END
GO
IF @@TRANCOUNT = 0 BEGIN PRINT 'Error at step 3' SET NOEXEC ON END
GO
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- ADD UNIQUE CONSTRAINTS
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- step 4: Add/Update Unique constraint U_GOUser_UserProfile 
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
IF @@ERROR <> 0 AND @@TRANCOUNT > 0 BEGIN PRINT 'error at step 4, transaction will be rolled back' ROLLBACK TRAN END
GO
IF @@TRANCOUNT = 0 BEGIN PRINT 'Error at step 4' SET NOEXEC ON END
GO
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- MODEL TO DATABASE SYNCHRONISATION
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
UPDATE [GO.LiveUpdate].[ModelSync] SET [ModelRevisionId] = 47, [When] = GETUTCDATE() WHERE Id = 'AF3DF4FF-A05A-4969-9796-FAC22A6ED2AF'
GO
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- COMMIT LIVE UPDATE DATABASE TRANSACTION
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
IF @@TRANCOUNT > 0 
BEGIN 
	COMMIT TRAN PRINT 'Synchronization completed successfully.' 
END
GO
SET NOEXEC OFF
GO
