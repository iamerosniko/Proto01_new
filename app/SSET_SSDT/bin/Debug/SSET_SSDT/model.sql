CREATE TABLE [dbo].[__EFMigrationsHistory] (
    [MigrationId]    NVARCHAR (150) NOT NULL,
    [ProductVersion] NVARCHAR (32)  NOT NULL,
    CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED ([MigrationId] ASC)
);

GO
CREATE TABLE [dbo].[SS_AssociateDepartmentSkillsets] (
    [AssociateDepartmentSkillsetID] INT           IDENTITY (1, 1) NOT NULL,
    [AssociateID]                   INT           NOT NULL,
    [DepartmentSkillsetID]          INT           NOT NULL,
    [LastWorkedOn]                  NVARCHAR (30) NOT NULL,
    CONSTRAINT [PK_SS_AssociateDepartmentSkillsets] PRIMARY KEY CLUSTERED ([AssociateDepartmentSkillsetID] ASC)
);

GO
CREATE TABLE [dbo].[SS_Associates] (
    [AssociateID]  INT            IDENTITY (1, 1) NOT NULL,
    [DepartmentID] INT            NOT NULL,
    [FullName]     NVARCHAR (100) NULL,
    [IsActive]     BIT            NOT NULL,
    [LocationID]   INT            NOT NULL,
    [PhoneNumber]  NVARCHAR (20)  NULL,
    [UpdatedOn]    DATETIME2 (7)  NOT NULL,
    [UserID]       NVARCHAR (25)  NULL,
    [VPN]          BIT            NOT NULL,
    CONSTRAINT [PK_SS_Associates] PRIMARY KEY CLUSTERED ([AssociateID] ASC)
);

GO
CREATE TABLE [dbo].[SS_Departments] (
    [DepartmentID]    INT            IDENTITY (1, 1) NOT NULL,
    [DepartmentDescr] NVARCHAR (100) NOT NULL,
    [IsActive]        BIT            NOT NULL,
    CONSTRAINT [PK_SS_Departments] PRIMARY KEY CLUSTERED ([DepartmentID] ASC)
);

GO
CREATE TABLE [dbo].[SS_DepartmentSkillsets] (
    [DepartmentSkillsetID] INT IDENTITY (1, 1) NOT NULL,
    [DepartmentID]         INT NOT NULL,
    [SkillsetID]           INT NOT NULL,
    CONSTRAINT [PK_SS_DepartmentSkillsets] PRIMARY KEY CLUSTERED ([DepartmentSkillsetID] ASC)
);

GO
CREATE TABLE [dbo].[SS_Locations] (
    [LocationID]    INT            IDENTITY (1, 1) NOT NULL,
    [IsActive]      BIT            NOT NULL,
    [LocationDescr] NVARCHAR (100) NOT NULL,
    CONSTRAINT [PK_SS_Locations] PRIMARY KEY CLUSTERED ([LocationID] ASC)
);

GO
CREATE TABLE [dbo].[SS_Skillsets] (
    [SkillsetID]    INT            IDENTITY (1, 1) NOT NULL,
    [IsActive]      BIT            NOT NULL,
    [SkillsetDescr] NVARCHAR (100) NOT NULL,
    CONSTRAINT [PK_SS_Skillsets] PRIMARY KEY CLUSTERED ([SkillsetID] ASC)
);

GO
