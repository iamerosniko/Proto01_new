IF OBJECT_ID(N'__EFMigrationsHistory') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    CREATE TABLE [set_group] (
        [grp_id] nvarchar(25) NOT NULL,
        [created_date] datetime2 NOT NULL,
        [grp_desc] nvarchar(255) NULL,
        [grp_name] nvarchar(50) NULL,
        CONSTRAINT [PK_set_group] PRIMARY KEY ([grp_id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    CREATE TABLE [set_group_access] (
        [grp_mod_id] int NOT NULL IDENTITY,
        [can_add] bit NOT NULL,
        [can_delete] bit NOT NULL,
        [can_edit] bit NOT NULL,
        [can_view] bit NOT NULL,
        [grp_id] nvarchar(25) NULL,
        [mod_id] nvarchar(25) NULL,
        CONSTRAINT [PK_set_group_access] PRIMARY KEY ([grp_mod_id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    CREATE TABLE [set_module] (
        [mod_id] nvarchar(25) NOT NULL,
        [created_date] datetime2 NOT NULL,
        [mod_desc] nvarchar(255) NULL,
        [mod_name] nvarchar(50) NULL,
        CONSTRAINT [PK_set_module] PRIMARY KEY ([mod_id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    CREATE TABLE [set_user] (
        [user_id] nvarchar(25) NOT NULL,
        [can_DEV] bit NOT NULL,
        [can_PEER] bit NOT NULL,
        [can_PROD] bit NOT NULL,
        [can_UAT] bit NOT NULL,
        [created_date] datetime2 NOT NULL,
        [user_first_name] nvarchar(50) NULL,
        [user_last_name] nvarchar(50) NULL,
        [user_middle_name] nvarchar(50) NULL,
        [user_name] nvarchar(25) NULL,
        CONSTRAINT [PK_set_user] PRIMARY KEY ([user_id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    CREATE TABLE [set_user_access] (
        [user_grp_id] int NOT NULL IDENTITY,
        [grp_id] nvarchar(25) NULL,
        [user_id] nvarchar(25) NULL,
        CONSTRAINT [PK_set_user_access] PRIMARY KEY ([user_grp_id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    CREATE TABLE [SS_AssociateDepartmentSkillsets] (
        [AssociateDepartmentSkillsetID] int NOT NULL IDENTITY,
        [AssociateID] int NOT NULL,
        [DepartmentSkillsetID] int NOT NULL,
        [LastWorkedOn] nvarchar(30) NOT NULL,
        CONSTRAINT [PK_SS_AssociateDepartmentSkillsets] PRIMARY KEY ([AssociateDepartmentSkillsetID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    CREATE TABLE [SS_Associates] (
        [AssociateID] int NOT NULL IDENTITY,
        [DepartmentID] int NOT NULL,
        [FullName] nvarchar(100) NULL,
        [IsActive] bit NOT NULL,
        [LocationID] int NOT NULL,
        [PhoneNumber] nvarchar(20) NULL,
        [UpdatedOn] datetime2 NOT NULL,
        [UserID] nvarchar(25) NULL,
        [VPN] bit NOT NULL,
        CONSTRAINT [PK_SS_Associates] PRIMARY KEY ([AssociateID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    CREATE TABLE [SS_Departments] (
        [DepartmentID] int NOT NULL IDENTITY,
        [DepartmentDescr] nvarchar(30) NOT NULL,
        [IsActive] bit NOT NULL,
        CONSTRAINT [PK_SS_Departments] PRIMARY KEY ([DepartmentID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    CREATE TABLE [SS_DepartmentSkillsets] (
        [DepartmentSkillsetID] int NOT NULL IDENTITY,
        [DepartmentID] int NOT NULL,
        [SkillsetID] int NOT NULL,
        CONSTRAINT [PK_SS_DepartmentSkillsets] PRIMARY KEY ([DepartmentSkillsetID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    CREATE TABLE [SS_Locations] (
        [LocationID] int NOT NULL IDENTITY,
        [IsActive] bit NOT NULL,
        [LocationDescr] nvarchar(30) NOT NULL,
        CONSTRAINT [PK_SS_Locations] PRIMARY KEY ([LocationID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    CREATE TABLE [SS_Skillsets] (
        [SkillsetID] int NOT NULL IDENTITY,
        [IsActive] bit NOT NULL,
        [SkillsetDescr] nvarchar(50) NOT NULL,
        CONSTRAINT [PK_SS_Skillsets] PRIMARY KEY ([SkillsetID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180214144746_initialcreate')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20180214144746_initialcreate', N'2.0.1-rtm-125');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180416204407_m001')
BEGIN
    DROP TABLE [set_group];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180416204407_m001')
BEGIN
    DROP TABLE [set_group_access];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180416204407_m001')
BEGIN
    DROP TABLE [set_module];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180416204407_m001')
BEGIN
    DROP TABLE [set_user];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180416204407_m001')
BEGIN
    DROP TABLE [set_user_access];
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180416204407_m001')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20180416204407_m001', N'2.0.1-rtm-125');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180416205059_m002')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'SS_Skillsets') AND [c].[name] = N'SkillsetDescr');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [SS_Skillsets] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [SS_Skillsets] ALTER COLUMN [SkillsetDescr] nvarchar(100) NOT NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180416205059_m002')
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'SS_Locations') AND [c].[name] = N'LocationDescr');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [SS_Locations] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [SS_Locations] ALTER COLUMN [LocationDescr] nvarchar(100) NOT NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180416205059_m002')
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'SS_Departments') AND [c].[name] = N'DepartmentDescr');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [SS_Departments] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [SS_Departments] ALTER COLUMN [DepartmentDescr] nvarchar(100) NOT NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180416205059_m002')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20180416205059_m002', N'2.0.1-rtm-125');
END;

GO

