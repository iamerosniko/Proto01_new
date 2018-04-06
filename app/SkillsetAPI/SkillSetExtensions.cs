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
            SeedSetUsers(ctx);
            SeedSetGroups(ctx);
            SeedSetUserAccess(ctx);
            SeedSetModules(ctx);
            SeedSetGroupAccess(ctx);
            SeedAssociate(ctx);
            SeedDepartment(ctx);
            SeedLocation(ctx);
            SeedSkillset(ctx);
            SeedDepartmentSkillsets(ctx);
            SeedAssociateSeedDepartmentSkillsets(ctx);
        }

        private static void SeedSetUsers(SkillSetContext ctx)
        {
            if (ctx.SetUsers.Any())
            {
                return;
            }

            var setUsers = new List<SetUser>()
                    {
                        new SetUser()
                        {
                            user_id = "USER-20150428-001",
                            user_name = "sarmife",
                            user_last_name = "Sarmiento",
                            user_first_name = "Federico",
                            user_middle_name = "Paras",
                            can_PROD = false,
                            can_UAT = false,
                            can_PEER = false,
                            can_DEV = false,
                            created_date = new DateTime(2015,04,28,19,05,40)
                        },
                        new SetUser()
                        {
                            user_id = "USER-20171128-002",
                            user_name = "alverer",
                            user_last_name = "Alvarez",
                            user_first_name = "Eros",
                            user_middle_name = "K",
                            can_PROD = false,
                            can_UAT = false,
                            can_PEER = false,
                            can_DEV = false,
                            created_date = new DateTime(2017,11,28,19,05,40)
                        },
                        new SetUser()
                        {
                            user_id = "USER-20171128-003",
                            user_name = "alverer@mfcgd.com",
                            user_last_name = "Alvarez",
                            user_first_name = "Eros",
                            user_middle_name = "K",
                            can_PROD = false,
                            can_UAT = false,
                            can_PEER = false,
                            can_DEV = false,
                            created_date = new DateTime(2017,11,28,19,05,40)
                        }
                    };

            ctx.SetUsers.AddRange(setUsers);

            ctx.SaveChanges();
        }

        private static void SeedSetGroups(SkillSetContext ctx)
        {
            if (ctx.SetGroups.Any())
            {
                return;
            }

            var setGroups = new List<SetGroup>()
                    {
                        new SetGroup()
                        {
                            grp_id = "GRP-20150428-001",
                            grp_name = "Admin",
                            grp_desc = "Super user of Skillset",
                            created_date = new DateTime(2015,04,28,19,05,40)
                        },
                        new SetGroup()
                        {
                            grp_id = "GRP-20150428-002",
                            grp_name = "Limited",
                            grp_desc = "Limited user",
                            created_date = new DateTime(2015,04,28,19,05,40)
                        }
                    };

            ctx.SetGroups.AddRange(setGroups);
            ctx.SaveChanges();
        }

        private static void SeedSetUserAccess(SkillSetContext ctx)
        {
            if (ctx.SetUserAccesses.Any())
            {
                return;
            }

            var setUserAccess = new List<SetUserAccess>()
                    {
                        new SetUserAccess()
                        {
                            grp_id = "GRP-20150428-001",
                            user_id ="USER-20150428-001"
                        },
                        new SetUserAccess()
                        {
                            grp_id = "GRP-20150428-002",
                            user_id ="USER-20171128-002"
                        },
                        new SetUserAccess()
                        {
                            grp_id = "GRP-20150428-002",
                            user_id ="USER-20171128-003"
                        }
                    };

            ctx.SetUserAccesses.AddRange(setUserAccess);
            ctx.SaveChanges();
        }

        private static void SeedSetModules(SkillSetContext ctx)
        {
            if (ctx.SetModules.Any())
            {
                return;
            }

            var setModules = new List<SetModule>()
                    {
                        new SetModule()
                        {
                            mod_id = "MOD-20150428-001",
                            mod_name = "Skillset",
                            mod_desc = "Main Dashboard",
                            created_date = new DateTime(2015,04,28,19,05,40)
                        },
                        new SetModule()
                        {
                            mod_id = "MOD-20150428-002",
                            mod_name = "Maintenace",
                            mod_desc = "Maintenance module",
                            created_date = new DateTime(2015,04,28,19,05,40)
                        }
                    };

            ctx.SetModules.AddRange(setModules);
            ctx.SaveChanges();
        }

        private static void SeedSetGroupAccess(SkillSetContext ctx)
        {
            if (ctx.SetGroupAccesses.Any())
            {
                return;
            }

            var setGroupAccesses = new List<SetGroupAccess>()
                    {
                        new SetGroupAccess()
                        {
                            grp_id = "GRP-20150428-001",
                            mod_id = "MOD-20150428-001",
                            can_view = true,
                            can_add = false,
                            can_edit = false,
                            can_delete = false
                        }
                    };

            ctx.SetGroupAccesses.AddRange(setGroupAccesses);
            ctx.SaveChanges();
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
