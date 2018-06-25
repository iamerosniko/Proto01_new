using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using SkillsetAPI.Entities;
using SkillsetAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace SkillsetAPI
{

  public static class SkillSetExtensions
  {
    private static IHostingEnvironment _hostingEnvironment;
    private static string _skills = "/Initializer/Skills.json";
    private static string _departments = "/Initializer/Departments.json";
    private static string _departmentSkillsets = "/Initializer/DepartmentSkillsets.json";
    public static void EnsureSeedDataForContext(this SkillSetContext ctx, IHostingEnvironment hostingEnvironment)
    {
      _hostingEnvironment = hostingEnvironment;
      SeedSkillset(ctx);
      SeedDepartment(ctx);
      SeedDepartmentSkillsets(ctx);
    }

    private static void SeedDepartmentSkillsets(SkillSetContext ctx)
    {
      if (ctx.DepartmentSkillsets.Any())
      {
        return;
      }

      List<Skillset> skills = ctx.Skillsets.ToList();
      List<Department> departments = ctx.Departments.ToList();
      List<DepartmentSkillset> departmentSkillsets = new List<DepartmentSkillset>();
      List<DepartmentSkillsetsSeedDTO> ds = getDepartmentSkillsets();
      foreach (var dSkills in ds)
      {
        DepartmentSkillset tempDS = new DepartmentSkillset();
        Department tempDept = departments.Find(x => x.DepartmentDescr == dSkills.DepartmentDescr);
        if (tempDept != null)
        {
          foreach (var mySkill in dSkills.Skills)
          {
            Skillset tempSkill = skills.Find(x => x.SkillsetDescr == mySkill);
            if (tempSkill != null)
            {
              tempDS.SkillsetID = tempSkill.SkillsetID;
              departmentSkillsets.Add(new DepartmentSkillset
              {
                DepartmentID = tempDept.DepartmentID,
                SkillsetID = tempSkill.SkillsetID
              });
            }
            tempSkill = null;
          }
        }
        //loop skills here then add to context


      }
      ctx.DepartmentSkillsets.AddRange(departmentSkillsets);
      ctx.SaveChanges();
    }

    private static void SeedSkillset(SkillSetContext ctx)
    {
      if (ctx.Skillsets.Any())
      {
        return;
      }

      if (ctx.Skillsets.Count() == 0)
      {
        List<Skillset> skills = getSkills();
        ctx.Skillsets.AddRange(skills);
        ctx.SaveChanges();
      }
    }

    private static void SeedDepartment(SkillSetContext ctx)
    {
      if (ctx.Departments.Any())
      {
        return;
      }

      if (ctx.Departments.Count() == 0)
      {
        List<Department> depts = getDepartments();
        ctx.Departments.AddRange(depts);
        ctx.SaveChanges();
      }
    }

    private static List<Skillset> getSkills()
    {
      string contentRootPath = _hostingEnvironment.ContentRootPath;
      var jsonText = System.IO.File.ReadAllText(contentRootPath + _skills);
      var data = JsonConvert.DeserializeObject<List<Skillset>>(jsonText);
      return data;
    }

    private static List<Department> getDepartments()
    {
      string contentRootPath = _hostingEnvironment.ContentRootPath;
      var jsonText = System.IO.File.ReadAllText(contentRootPath + _departments);
      var data = JsonConvert.DeserializeObject<List<Department>>(jsonText);
      return data;
    }
    private static List<DepartmentSkillsetsSeedDTO> getDepartmentSkillsets()
    {
      string contentRootPath = _hostingEnvironment.ContentRootPath;
      var jsonText = System.IO.File.ReadAllText(contentRootPath + _departmentSkillsets);
      var data = JsonConvert.DeserializeObject<List<DepartmentSkillsetsSeedDTO>>(jsonText);
      return data;
    }
    private static void pushDepartmentSkillset()
    {

    }
  }
}
