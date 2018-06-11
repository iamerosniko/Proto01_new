CREATE TABLE [dbo].[SS_DepartmentSkillsets] (
    [DepartmentSkillsetID] INT IDENTITY (1, 1) NOT NULL,
    [DepartmentID]         INT NOT NULL,
    [SkillsetID]           INT NOT NULL,
    CONSTRAINT [PK_SS_DepartmentSkillsets] PRIMARY KEY CLUSTERED ([DepartmentSkillsetID] ASC)
);

