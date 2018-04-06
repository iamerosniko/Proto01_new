using SkillsetAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Services
{
    public interface ISkillSetRepository
    {
        bool Save();

        IEnumerable<SetUser> ReadSetUsers();

        SetUser ReadSetUser(string userId);

        IEnumerable<SetGroup> ReadSetGroups();

        SetGroup ReadSetGroup(string groupId);

        IEnumerable<SetUserAccess> ReadSetUserAccesses();

        SetUserAccess ReadSetUserAccess(int accessId);

        IEnumerable<Associate> ReadAssociates();

        Associate ReadAssociate(int ascId);

        void CreateAssociate(Associate associate);

        void DeleteAssociate(Associate associate);

        IEnumerable<Department> ReadDepartments();

        Department ReadDepartment(int depId);

        void CreateDepartment(Department department);

        void DeleteDepartment(Department department);

        IEnumerable<Location> ReadLocations();

        Location ReadLocation(int locId);

        void CreateLocation(Location location);

        void DeleteLocation(Location location);

        IEnumerable<Skillset> ReadSkillsets();

        Skillset ReadSkillset(int sklId);

        void CreateSkillset(Skillset skillset);

        void DeleteSkillset(Skillset skillset);

        IEnumerable<DepartmentSkillset> ReadDepartmentSkillsets();

        DepartmentSkillset ReadDepartmentSkillset(int dptSklId);

        void CreateDepartmentSkillset(DepartmentSkillset departmentSkillset);

        void DeleteDepartmentSkillset(DepartmentSkillset departmentSkillset);

        IEnumerable<AssociateDepartmentSkillset> ReadAssociateDepartmentSkillsets();

        AssociateDepartmentSkillset ReadAssociateDepartmentSkillset(int assDptSklId);

        void CreateAssociateDepartmentSkillset(AssociateDepartmentSkillset associateDepartmentSkillset);

        void DeleteAssociateDepartmentSkillset(AssociateDepartmentSkillset associateDepartmentSkillset);
    }
}
