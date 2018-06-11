CREATE TABLE [dbo].[SS_Departments] (
    [DepartmentID]    INT            IDENTITY (1, 1) NOT NULL,
    [DepartmentDescr] NVARCHAR (100) NOT NULL,
    [IsActive]        BIT            NOT NULL,
    CONSTRAINT [PK_SS_Departments] PRIMARY KEY CLUSTERED ([DepartmentID] ASC)
);

