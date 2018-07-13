using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SkillsetAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SkillsetAPI.Controllers
{
  [EnableCors("CORS")]
  [Produces("application/json")]
  [Route("api/CleanSkillsetApplication")]
  public class CleanSkillsetApplicationController : Controller
  {
    private SkillSetContext _ctx;

    public CleanSkillsetApplicationController(SkillSetContext ctx)
    {
      _ctx = ctx;
    }
    [HttpPost]
    public bool RemoveAll()
    {
      List<AssociateDepartmentSkillset> AssociateDepartmentSkillsets = _ctx.AssociateDepartmentSkillsets.ToList();
      List<DepartmentSkillset> DepartmentSkillsets = _ctx.DepartmentSkillsets.ToList();
      List<Department> Departments = _ctx.Departments.Where(x => x.IsActive == true).ToList();
      List<Department> DepartmentsDel = _ctx.Departments.Where(x => x.IsActive == false).ToList();
      List<AssociateDepartmentSkillset> TempAssociateDepartmentSkillsets = new List<AssociateDepartmentSkillset>();
      List<Associate> Associates = _ctx.Associates.Where(x => x.IsActive == false).ToList();
      List<Skillset> Skillsets = _ctx.Skillsets.Where(x => x.IsActive == false).ToList();
      List<Location> Locations = _ctx.Locations.Where(x => x.IsActive == false).ToList();

      var tempDs = DepartmentSkillsets;
      //filter ds that is no longer needed
      foreach (var dept in Departments)
      {
        tempDs = tempDs.Where(x => x.DepartmentID != dept.DepartmentID).ToList();
      }
      //associate deparmentskillset follows
      foreach (var tempds in tempDs)
      {
        //get AssociateDepartmentSkillsets where tempds is there.
        var ads = AssociateDepartmentSkillsets.Where(x => x.DepartmentSkillsetID == tempds.DepartmentSkillsetID).ToList();
        if (ads.Count() > 0)
        {
          TempAssociateDepartmentSkillsets.AddRange(ads);
        }
      }

      try
      {
        _ctx.RemoveRange(tempDs);
        _ctx.RemoveRange(TempAssociateDepartmentSkillsets);
        _ctx.RemoveRange(Associates);
        _ctx.RemoveRange(Skillsets);
        _ctx.RemoveRange(Locations);
        _ctx.RemoveRange(DepartmentsDel);
      }
      catch (Exception Ex)
      {
        System.Diagnostics.Debug.WriteLine(Ex.ToString());

      }
      return (_ctx.SaveChanges() >= 0);
    }
  }
}
