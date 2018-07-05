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
    [StartDate]    DATETIME2 (7)  NOT NULL,
    [TransferDate] DATETIME2 (7)  NOT NULL,
    CONSTRAINT [PK_SS_Associates] PRIMARY KEY CLUSTERED ([AssociateID] ASC)
);



