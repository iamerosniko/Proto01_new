CREATE TABLE [dbo].[SS_AssociateDepartmentSkillsets] (
    [AssociateDepartmentSkillsetID] INT           IDENTITY (1, 1) NOT NULL,
    [AssociateID]                   INT           NOT NULL,
    [DepartmentSkillsetID]          INT           NOT NULL,
    [LastWorkedOn]                  NVARCHAR (30) NOT NULL,
    CONSTRAINT [PK_SS_AssociateDepartmentSkillsets] PRIMARY KEY CLUSTERED ([AssociateDepartmentSkillsetID] ASC)
);

