using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace SkillsetAPI.Migrations
{
  public partial class m003 : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.AddColumn<DateTime>(
          name: "TransferDate",
          table: "SS_Associates",
          nullable: true);

      migrationBuilder.AddColumn<DateTime>(
          name: "StartDate",
          table: "SS_Associates",
          nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.AlterColumn<DateTime>(
          name: "TransferDate",
          table: "SS_Associates",
          nullable: false,
          oldClrType: typeof(DateTime),
          oldNullable: true);

      migrationBuilder.AlterColumn<DateTime>(
          name: "StartDate",
          table: "SS_Associates",
          nullable: false,
          oldClrType: typeof(DateTime),
          oldNullable: true);
    }
  }
}
