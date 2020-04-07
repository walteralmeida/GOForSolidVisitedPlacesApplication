-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- CHECK AND TRY TO APPLY MODEL CONSTRAINTS SCRIPT
-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- step 1: Check for NOT NULL constraint for FK GOSecurity.GOGroupRole.GOGroupName and try to apply if not already done so
IF (SELECT is_nullable FROM sys.columns WHERE object_id = object_id('[GOSecurity].[GOGroupRole]') and name = 'GOGroupName') = 1
BEGIN
	IF NOT EXISTS (SELECT GOGroupName FROM [GOSecurity].[GOGroupRole] WHERE GOGroupName is NULL)
	BEGIN	
		ALTER TABLE [GOSecurity].[GOGroupRole] 
			ALTER COLUMN [GOGroupName] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL 
		PRINT 'INFO: GOGroupRole.GOGroupName has been constrained successfully (Mandatory, NOT NULL)'
	END
	ELSE
		PRINT 'WARNING: Unable to apply NOT NULL constraint to column GOGroupRole.GOGroupName because there is at least one existing NULL value in the database. Column constraint will remain NULL (optional).'
END
GO
-- step 2: Check for NOT NULL constraint for FK GOSecurity.GOGroupRole.GORoleName and try to apply if not already done so
IF (SELECT is_nullable FROM sys.columns WHERE object_id = object_id('[GOSecurity].[GOGroupRole]') and name = 'GORoleName') = 1
BEGIN
	IF NOT EXISTS (SELECT GORoleName FROM [GOSecurity].[GOGroupRole] WHERE GORoleName is NULL)
	BEGIN	
		ALTER TABLE [GOSecurity].[GOGroupRole] 
			ALTER COLUMN [GORoleName] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL 
		PRINT 'INFO: GOGroupRole.GORoleName has been constrained successfully (Mandatory, NOT NULL)'
	END
	ELSE
		PRINT 'WARNING: Unable to apply NOT NULL constraint to column GOGroupRole.GORoleName because there is at least one existing NULL value in the database. Column constraint will remain NULL (optional).'
END
GO
-- step 3: Check for Unique Constraint U_UserNameUniqueConstraint on [GOSecurity].[GOUser] and try to apply if not already done so
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'U_UserNameUniqueConstraint' AND object_id = OBJECT_ID('[GOSecurity].[GOUser]'))
BEGIN
	IF (SELECT COUNT (*) FROM [GOSecurity].[GOUser] WHERE [UserName] IS NULL) <= 1 
	BEGIN
		CREATE UNIQUE NONCLUSTERED INDEX [U_UserNameUniqueConstraint]
		ON [GOSecurity].[GOUser] 
			([UserName]) 
		PRINT 'INFO: Unique Constraint U_UserNameUniqueConstraint has been applied successfully'
	END
	ELSE
	BEGIN
		PRINT 'WARNING: Failed to apply Unique Constraint on entity table GOUser - there is more than one existing NULL in mandatory column(s): [UserName]'
	END
END
GO
-- step 4: Check for NOT NULL constraint for FK GOSecurity.GOUserRole.GOUserId and try to apply if not already done so
IF (SELECT is_nullable FROM sys.columns WHERE object_id = object_id('[GOSecurity].[GOUserRole]') and name = 'GOUserId') = 1
BEGIN
	IF NOT EXISTS (SELECT GOUserId FROM [GOSecurity].[GOUserRole] WHERE GOUserId is NULL)
	BEGIN	
		ALTER TABLE [GOSecurity].[GOUserRole] 
			ALTER COLUMN [GOUserId] [uniqueidentifier] NOT NULL 
		PRINT 'INFO: GOUserRole.GOUserId has been constrained successfully (Mandatory, NOT NULL)'
	END
	ELSE
		PRINT 'WARNING: Unable to apply NOT NULL constraint to column GOUserRole.GOUserId because there is at least one existing NULL value in the database. Column constraint will remain NULL (optional).'
END
GO
-- step 5: Check for NOT NULL constraint for FK GOSecurity.GOUserRole.GORoleName and try to apply if not already done so
IF (SELECT is_nullable FROM sys.columns WHERE object_id = object_id('[GOSecurity].[GOUserRole]') and name = 'GORoleName') = 1
BEGIN
	IF NOT EXISTS (SELECT GORoleName FROM [GOSecurity].[GOUserRole] WHERE GORoleName is NULL)
	BEGIN	
		ALTER TABLE [GOSecurity].[GOUserRole] 
			ALTER COLUMN [GORoleName] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL 
		PRINT 'INFO: GOUserRole.GORoleName has been constrained successfully (Mandatory, NOT NULL)'
	END
	ELSE
		PRINT 'WARNING: Unable to apply NOT NULL constraint to column GOUserRole.GORoleName because there is at least one existing NULL value in the database. Column constraint will remain NULL (optional).'
END
GO
-- step 6: Check for NOT NULL constraint for FK GOSecurity.GOUserGroup.GOUserId and try to apply if not already done so
IF (SELECT is_nullable FROM sys.columns WHERE object_id = object_id('[GOSecurity].[GOUserGroup]') and name = 'GOUserId') = 1
BEGIN
	IF NOT EXISTS (SELECT GOUserId FROM [GOSecurity].[GOUserGroup] WHERE GOUserId is NULL)
	BEGIN	
		ALTER TABLE [GOSecurity].[GOUserGroup] 
			ALTER COLUMN [GOUserId] [uniqueidentifier] NOT NULL 
		PRINT 'INFO: GOUserGroup.GOUserId has been constrained successfully (Mandatory, NOT NULL)'
	END
	ELSE
		PRINT 'WARNING: Unable to apply NOT NULL constraint to column GOUserGroup.GOUserId because there is at least one existing NULL value in the database. Column constraint will remain NULL (optional).'
END
GO
-- step 7: Check for NOT NULL constraint for FK GOSecurity.GOUserGroup.GOGroupName and try to apply if not already done so
IF (SELECT is_nullable FROM sys.columns WHERE object_id = object_id('[GOSecurity].[GOUserGroup]') and name = 'GOGroupName') = 1
BEGIN
	IF NOT EXISTS (SELECT GOGroupName FROM [GOSecurity].[GOUserGroup] WHERE GOGroupName is NULL)
	BEGIN	
		ALTER TABLE [GOSecurity].[GOUserGroup] 
			ALTER COLUMN [GOGroupName] [nvarchar] (200) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL 
		PRINT 'INFO: GOUserGroup.GOGroupName has been constrained successfully (Mandatory, NOT NULL)'
	END
	ELSE
		PRINT 'WARNING: Unable to apply NOT NULL constraint to column GOUserGroup.GOGroupName because there is at least one existing NULL value in the database. Column constraint will remain NULL (optional).'
END
GO
