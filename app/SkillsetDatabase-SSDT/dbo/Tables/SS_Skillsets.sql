CREATE TABLE [dbo].[SS_Skillsets] (
    [SkillsetID]    INT            IDENTITY (1, 1) NOT NULL,
    [IsActive]      BIT            NOT NULL,
    [SkillsetDescr] NVARCHAR (100) NOT NULL,
    [SampleChanges] NCHAR (10)     NOT NULL,
    CONSTRAINT [PK_SS_Skillsets] PRIMARY KEY CLUSTERED ([SkillsetID] ASC)
);



