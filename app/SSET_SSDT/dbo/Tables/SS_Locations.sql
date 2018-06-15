CREATE TABLE [dbo].[SS_Locations] (
    [LocationID]    INT            IDENTITY (1, 1) NOT NULL,
    [IsActive]      BIT            NOT NULL,
    [LocationDescr] NVARCHAR (100) NOT NULL,
    CONSTRAINT [PK_SS_Locations] PRIMARY KEY CLUSTERED ([LocationID] ASC)
);

