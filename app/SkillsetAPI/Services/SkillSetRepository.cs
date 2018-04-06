using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SkillsetAPI.Entities;

namespace SkillsetAPI.Services
{
    public class SkillSetRepository : ISkillSetRepository
    {
        private SkillSetContext _ctx;

        public SkillSetRepository(SkillSetContext ctx)
        {
            _ctx = ctx;
        }

        public bool Save()
        {
            return (_ctx.SaveChanges() >= 0);
        }

        public IEnumerable<SetUser> ReadSetUsers()
        {
            return _ctx.SetUsers.OrderBy(u => u.user_name).ToList();
        }

        public SetUser ReadSetUser(string userId)
        {
            return _ctx.SetUsers.Where(u => u.user_id == userId).FirstOrDefault();
        }

        public IEnumerable<SetGroup> ReadSetGroups()
        {
            return _ctx.SetGroups.OrderBy(g => g.grp_name).ToList();
        }

        public SetGroup ReadSetGroup(string groupId)
        {
            return _ctx.SetGroups.Where(g => g.grp_id == groupId).FirstOrDefault();
        }

        public IEnumerable<SetUserAccess> ReadSetUserAccesses()
        {
            return _ctx.SetUserAccesses.OrderBy(a => a.user_grp_id).ToList();
        }

        public SetUserAccess ReadSetUserAccess(int accessId)
        {
            return _ctx.SetUserAccesses.Where(a => a.user_grp_id == accessId).FirstOrDefault();
        }

        public IEnumerable<Associate> ReadAssociates()
        {
            return _ctx.Associates.OrderBy(a => a.AssociateID).ToList();
        }

        public Associate ReadAssociate(int ascId)
        {
            return _ctx.Associates.Where(a => a.AssociateID == ascId).FirstOrDefault();
        }

        public void CreateAssociate(Associate associate)
        {
            _ctx.Associates.Add(associate);
        }

        public void DeleteAssociate(Associate associate)
        {
            _ctx.Associates.Remove(associate);
        }

        public IEnumerable<Department> ReadDepartments()
        {
            return _ctx.Departments.OrderBy(d => d.DepartmentDescr).ToList();
        }

        public Department ReadDepartment(int depId)
        {
            return _ctx.Departments.Where(d => d.DepartmentID == depId).FirstOrDefault();
        }

        public void CreateDepartment(Department department)
        {
            _ctx.Departments.Add(department);
        }

        public void DeleteDepartment(Department department)
        {
            _ctx.Departments.Remove(department);
        }

        public IEnumerable<Location> ReadLocations()
        {
            return _ctx.Locations.OrderBy(d => d.LocationDescr).ToList();
        }

        public Location ReadLocation(int locId)
        {
            return _ctx.Locations.Where(d => d.LocationID == locId).FirstOrDefault();
        }

        public void CreateLocation(Location location)
        {
            _ctx.Locations.Add(location);
        }

        public void DeleteLocation(Location location)
        {
            _ctx.Locations.Remove(location);
        }

        public IEnumerable<Skillset> ReadSkillsets()
        {
            return _ctx.Skillsets.OrderBy(d => d.SkillsetDescr).ToList();
        }

        public Skillset ReadSkillset(int sklId)
        {
            return _ctx.Skillsets.Where(d => d.SkillsetID == sklId).FirstOrDefault();
        }

        public void CreateSkillset(Skillset skillset)
        {
            _ctx.Skillsets.Add(skillset);
        }

        public void DeleteSkillset(Skillset skillset)
        {
            _ctx.Skillsets.Remove(skillset);
        }

        public IEnumerable<DepartmentSkillset> ReadDepartmentSkillsets()
        {
            return _ctx.DepartmentSkillsets.OrderBy(d => d.DepartmentSkillsetID).ToList();
        }

        public DepartmentSkillset ReadDepartmentSkillset(int dptSklId)
        {
            return _ctx.DepartmentSkillsets.Where(d => d.DepartmentSkillsetID == dptSklId).FirstOrDefault();
        }

        public void CreateDepartmentSkillset(DepartmentSkillset departmentSkillset)
        {
            _ctx.DepartmentSkillsets.Add(departmentSkillset);
        }

        public void DeleteDepartmentSkillset(DepartmentSkillset departmentSkillset)
        {
            _ctx.DepartmentSkillsets.Remove(departmentSkillset);
        }

        public IEnumerable<AssociateDepartmentSkillset> ReadAssociateDepartmentSkillsets()
        {
            return _ctx.AssociateDepartmentSkillsets.OrderBy(d => d.AssociateDepartmentSkillsetID).ToList();
        }

        public AssociateDepartmentSkillset ReadAssociateDepartmentSkillset(int assDptSklId)
        {
            return _ctx.AssociateDepartmentSkillsets.Where(d => d.AssociateDepartmentSkillsetID == assDptSklId).FirstOrDefault();
        }

        public void CreateAssociateDepartmentSkillset(AssociateDepartmentSkillset associateDepartmentSkillset)
        {
            _ctx.AssociateDepartmentSkillsets.Add(associateDepartmentSkillset);
        }

        public void DeleteAssociateDepartmentSkillset(AssociateDepartmentSkillset associateDepartmentSkillset)
        {
            _ctx.AssociateDepartmentSkillsets.Remove(associateDepartmentSkillset);
        }
    }
}