﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using SkillsetAPI.Entities;
using System;

namespace SkillsetAPI.Migrations
{
    [DbContext(typeof(SkillSetContext))]
    [Migration("20180705210742_m003")]
    partial class m003
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SkillsetAPI.Entities.Associate", b =>
                {
                    b.Property<int>("AssociateID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DepartmentID");

                    b.Property<string>("FullName")
                        .HasMaxLength(100);

                    b.Property<bool>("IsActive");

                    b.Property<int>("LocationID");

                    b.Property<string>("PhoneNumber")
                        .HasMaxLength(20);

                    b.Property<DateTime?>("StartDate");

                    b.Property<DateTime?>("TransferDate");

                    b.Property<DateTime>("UpdatedOn");

                    b.Property<string>("UserID")
                        .HasMaxLength(25);

                    b.Property<bool>("VPN");

                    b.HasKey("AssociateID");

                    b.ToTable("SS_Associates");
                });

            modelBuilder.Entity("SkillsetAPI.Entities.AssociateDepartmentSkillset", b =>
                {
                    b.Property<int>("AssociateDepartmentSkillsetID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AssociateID");

                    b.Property<int>("DepartmentSkillsetID");

                    b.Property<string>("LastWorkedOn")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.HasKey("AssociateDepartmentSkillsetID");

                    b.ToTable("SS_AssociateDepartmentSkillsets");
                });

            modelBuilder.Entity("SkillsetAPI.Entities.Department", b =>
                {
                    b.Property<int>("DepartmentID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DepartmentDescr")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<bool>("IsActive");

                    b.HasKey("DepartmentID");

                    b.ToTable("SS_Departments");
                });

            modelBuilder.Entity("SkillsetAPI.Entities.DepartmentSkillset", b =>
                {
                    b.Property<int>("DepartmentSkillsetID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DepartmentID");

                    b.Property<int>("SkillsetID");

                    b.HasKey("DepartmentSkillsetID");

                    b.ToTable("SS_DepartmentSkillsets");
                });

            modelBuilder.Entity("SkillsetAPI.Entities.Location", b =>
                {
                    b.Property<int>("LocationID")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsActive");

                    b.Property<string>("LocationDescr")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("LocationID");

                    b.ToTable("SS_Locations");
                });

            modelBuilder.Entity("SkillsetAPI.Entities.Skillset", b =>
                {
                    b.Property<int>("SkillsetID")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsActive");

                    b.Property<string>("SkillsetDescr")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("SkillsetID");

                    b.ToTable("SS_Skillsets");
                });
#pragma warning restore 612, 618
        }
    }
}
