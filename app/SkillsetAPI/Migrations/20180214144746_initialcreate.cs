using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SkillsetAPI.Migrations
{
    public partial class initialcreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "SS_AssociateDepartmentSkillsets",
                columns: table => new
                {
                    AssociateDepartmentSkillsetID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AssociateID = table.Column<int>(nullable: false),
                    DepartmentSkillsetID = table.Column<int>(nullable: false),
                    LastWorkedOn = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SS_AssociateDepartmentSkillsets", x => x.AssociateDepartmentSkillsetID);
                });

            migrationBuilder.CreateTable(
                name: "SS_Associates",
                columns: table => new
                {
                    AssociateID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DepartmentID = table.Column<int>(nullable: false),
                    FullName = table.Column<string>(maxLength: 100, nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    LocationID = table.Column<int>(nullable: false),
                    PhoneNumber = table.Column<string>(maxLength: 20, nullable: true),
                    UpdatedOn = table.Column<DateTime>(nullable: false),
                    UserID = table.Column<string>(maxLength: 25, nullable: true),
                    VPN = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SS_Associates", x => x.AssociateID);
                });

            migrationBuilder.CreateTable(
                name: "SS_Departments",
                columns: table => new
                {
                    DepartmentID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DepartmentDescr = table.Column<string>(maxLength: 30, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SS_Departments", x => x.DepartmentID);
                });

            migrationBuilder.CreateTable(
                name: "SS_DepartmentSkillsets",
                columns: table => new
                {
                    DepartmentSkillsetID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DepartmentID = table.Column<int>(nullable: false),
                    SkillsetID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SS_DepartmentSkillsets", x => x.DepartmentSkillsetID);
                });

            migrationBuilder.CreateTable(
                name: "SS_Locations",
                columns: table => new
                {
                    LocationID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    LocationDescr = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SS_Locations", x => x.LocationID);
                });

            migrationBuilder.CreateTable(
                name: "SS_Skillsets",
                columns: table => new
                {
                    SkillsetID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    IsActive = table.Column<bool>(nullable: false),
                    SkillsetDescr = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SS_Skillsets", x => x.SkillsetID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropTable(
                name: "SS_AssociateDepartmentSkillsets");

            migrationBuilder.DropTable(
                name: "SS_Associates");

            migrationBuilder.DropTable(
                name: "SS_Departments");

            migrationBuilder.DropTable(
                name: "SS_DepartmentSkillsets");

            migrationBuilder.DropTable(
                name: "SS_Locations");

            migrationBuilder.DropTable(
                name: "SS_Skillsets");
        }
    }
}
