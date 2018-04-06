using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Entities
{
    public class SkillSetContext : DbContext
    {
        public SkillSetContext(DbContextOptions<SkillSetContext> options) : base(options)
        {
            //This is only used for testing not for production
            //Database.EnsureCreated();

            //Comment below for using add-migration or changing the tables
            Database.Migrate();
        }

        public DbSet<SetUser> SetUsers { get; set; }
        public DbSet<SetGroup> SetGroups { get; set; }
        public DbSet<SetUserAccess> SetUserAccesses { get; set; }
        public DbSet<SetModule> SetModules { get; set; }
        public DbSet<SetGroupAccess> SetGroupAccesses { get; set; }
        public DbSet<Associate> Associates { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Skillset> Skillsets { get; set; }
        public DbSet<DepartmentSkillset> DepartmentSkillsets { get; set; }
        public DbSet<AssociateDepartmentSkillset> AssociateDepartmentSkillsets { get; set; }
    }
}
