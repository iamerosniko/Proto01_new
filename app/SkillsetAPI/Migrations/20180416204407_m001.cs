using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace SkillsetAPI.Migrations
{
  public partial class m001 : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "set_group");

      migrationBuilder.DropTable(
          name: "set_group_access");

      migrationBuilder.DropTable(
          name: "set_module");

      migrationBuilder.DropTable(
          name: "set_user");

      migrationBuilder.DropTable(
          name: "set_user_access");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "set_group",
          columns: table => new
          {
            grp_id = table.Column<string>(maxLength: 25, nullable: false),
            created_date = table.Column<DateTime>(nullable: false),
            grp_desc = table.Column<string>(maxLength: 255, nullable: true),
            grp_name = table.Column<string>(maxLength: 50, nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_set_group", x => x.grp_id);
          });

      migrationBuilder.CreateTable(
          name: "set_group_access",
          columns: table => new
          {
            grp_mod_id = table.Column<int>(nullable: false)
                  .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            can_add = table.Column<bool>(nullable: false),
            can_delete = table.Column<bool>(nullable: false),
            can_edit = table.Column<bool>(nullable: false),
            can_view = table.Column<bool>(nullable: false),
            grp_id = table.Column<string>(maxLength: 25, nullable: true),
            mod_id = table.Column<string>(maxLength: 25, nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_set_group_access", x => x.grp_mod_id);
          });

      migrationBuilder.CreateTable(
          name: "set_module",
          columns: table => new
          {
            mod_id = table.Column<string>(maxLength: 25, nullable: false),
            created_date = table.Column<DateTime>(nullable: false),
            mod_desc = table.Column<string>(maxLength: 255, nullable: true),
            mod_name = table.Column<string>(maxLength: 50, nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_set_module", x => x.mod_id);
          });

      migrationBuilder.CreateTable(
          name: "set_user",
          columns: table => new
          {
            user_id = table.Column<string>(maxLength: 25, nullable: false),
            can_DEV = table.Column<bool>(nullable: false),
            can_PEER = table.Column<bool>(nullable: false),
            can_PROD = table.Column<bool>(nullable: false),
            can_UAT = table.Column<bool>(nullable: false),
            created_date = table.Column<DateTime>(nullable: false),
            user_first_name = table.Column<string>(maxLength: 50, nullable: true),
            user_last_name = table.Column<string>(maxLength: 50, nullable: true),
            user_middle_name = table.Column<string>(maxLength: 50, nullable: true),
            user_name = table.Column<string>(maxLength: 25, nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_set_user", x => x.user_id);
          });

      migrationBuilder.CreateTable(
          name: "set_user_access",
          columns: table => new
          {
            user_grp_id = table.Column<int>(nullable: false)
                  .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            grp_id = table.Column<string>(maxLength: 25, nullable: true),
            user_id = table.Column<string>(maxLength: 25, nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_set_user_access", x => x.user_grp_id);
          });
    }
  }
}
