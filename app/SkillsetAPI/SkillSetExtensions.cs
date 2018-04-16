using SkillsetAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SkillsetAPI
{

  public static class SkillSetExtensions
  {
    public static void EnsureSeedDataForContext(this SkillSetContext ctx)
    {
      SeedAssociate(ctx);
      SeedDepartment(ctx);
      SeedLocation(ctx);
      SeedSkillset(ctx);
      SeedDepartmentSkillsets(ctx);
      SeedAssociateSeedDepartmentSkillsets(ctx);
    }

    private static void SeedAssociate(SkillSetContext ctx)
    {
      if (ctx.Associates.Any())
      {
        return;
      }

      var associates = new List<Associate>()
                    {
                        new Associate()
                        {
                            FullName = "Federico Sarmiento",
                            UserID = "USER-20150428-001",
                            PhoneNumber = "22-88-7584",
                            VPN = true,
                            DepartmentID = 1,
                            LocationID = 1,
                            UpdatedOn = new DateTime(2017,04,28,19,05,40),
                            IsActive = true
                        },
                        new Associate()
                        {
                            FullName = "Erso Alvarez",
                            UserID = "USER-20171128-002",
                            PhoneNumber = "22-88-7584",
                            VPN = true,
                            DepartmentID = 1,
                            LocationID = 1,
                            UpdatedOn = new DateTime(2015,11,28,19,05,40),
                            IsActive = true
                        }
                    };

      ctx.Associates.AddRange(associates);
      ctx.SaveChanges();
    }

    private static void SeedDepartment(SkillSetContext ctx)
    {
      if (ctx.Departments.Any())
      {
        return;
      }

      var departments = new List<Department>()
                    {
                        new Department()
                        {
                            DepartmentDescr = "Admin",
                            IsActive = true
                        },
                        new Department()
                        {
                            DepartmentDescr = "Marketing",
                            IsActive = true
                        }
                    };

      ctx.Departments.AddRange(departments);
      ctx.SaveChanges();
    }

    private static void SeedLocation(SkillSetContext ctx)
    {
      if (ctx.Locations.Any())
      {
        return;
      }

      var locations = new List<Location>()
                    {
                        new Location()
                        {
                            LocationDescr = "Boston",
                            IsActive = true
                        },
                        new Location()
                        {
                            LocationDescr = "Toronto",
                            IsActive = true
                        }
                    };

      ctx.Locations.AddRange(locations);
      ctx.SaveChanges();
    }

    private static void SeedSkillset(SkillSetContext ctx)
    {
      if (ctx.Skillsets.Any())
      {
        return;
      }

      var skillsets = new List<Skillset>()
                    {
                        new Skillset()
                        {
                            SkillsetDescr = "Windows",
                            IsActive = true
                        },
                        new Skillset()
                        {
                            SkillsetDescr = "Linux",
                            IsActive = true
                        }
                    };

      ctx.Skillsets.AddRange(skillsets);
      ctx.SaveChanges();
    }

    private static void SeedDepartmentSkillsets(SkillSetContext ctx)
    {
      if (ctx.DepartmentSkillsets.Any())
      {
        return;
      }

      var departmentSkillsets = new List<DepartmentSkillset>()
                    {
                        new DepartmentSkillset()
                        {
                            DepartmentID = 1,
                            SkillsetID = 1
                        },
                        new DepartmentSkillset()
                        {
                            DepartmentID = 2,
                            SkillsetID = 2
                        }
                    };
      ctx.DepartmentSkillsets.AddRange(departmentSkillsets);
      ctx.SaveChanges();
    }

    private static void SeedAssociateSeedDepartmentSkillsets(SkillSetContext ctx)
    {
      if (ctx.AssociateDepartmentSkillsets.Any())
      {
        return;
      }

      var associateDepartmentSkillsets = new List<AssociateDepartmentSkillset>()
                    {
                        new AssociateDepartmentSkillset()
                        {
                            AssociateID = 1,
                            DepartmentSkillsetID = 1,
                            LastWorkedOn=""
                        },
                        new AssociateDepartmentSkillset()
                        {
                            AssociateID = 2,
                            DepartmentSkillsetID = 2,
                            LastWorkedOn=""
                        }
                    };

      ctx.AssociateDepartmentSkillsets.AddRange(associateDepartmentSkillsets);
      ctx.SaveChanges();
    }
  }
}
