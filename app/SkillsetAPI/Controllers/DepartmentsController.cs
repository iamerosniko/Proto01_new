using AutoMapper;
//using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SkillsetAPI.Models;
using SkillsetAPI.Services;
using System.Linq;

namespace SkillsetAPI.Controllers
{
  //[Authorize]
  [EnableCors("CORS")]
  [Produces("application/json")]
  [Route("api/Departments")]
  public class DepartmentsController : Controller
  {
    private ISkillSetRepository _skillSetRepository;

    public DepartmentsController(ISkillSetRepository skillSetRepository)
    {
      _skillSetRepository = skillSetRepository;
    }

    // GET: api/Departments
    [HttpGet()]
    public IActionResult GetDepartments()
    {
      var departmentsResult = _skillSetRepository.ReadDepartments();

      return Ok(departmentsResult.Where(x => x.IsActive == true));
    }

    //GET: api/Departments/{id}
    [HttpGet("{id}", Name = "GetDepartment")]
    public IActionResult GetDepartment(int id)
    {
      var departmentResult = _skillSetRepository.ReadDepartment(id);

      if (departmentResult == null)
      {
        return NotFound();
      }

      return Ok(departmentResult);
    }

    //POST: api/Departments
    [HttpPost()]
    public IActionResult PostDepartment([FromBody] DepartmentForCreateDTO department)
    {
      if (department == null)
      {
        return BadRequest();
      }

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var newDepartmentEntity = Mapper.Map<Entities.Department>(department);

      _skillSetRepository.CreateDepartment(newDepartmentEntity);

      if (!_skillSetRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      return CreatedAtRoute("GetDepartment",
              new { id = newDepartmentEntity.DepartmentID }, newDepartmentEntity);
    }

    //PUT: api/Departments
    [HttpPut("{id}")]
    public IActionResult PutDepartment(int id, [FromBody] DepartmentForUpdateDTO department)
    {
      if (department == null)
      {
        return BadRequest();
      }

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var departmentEntity = _skillSetRepository.ReadDepartment(id);
      if (departmentEntity == null)
      {
        return NotFound();
      }

      Mapper.Map(department, departmentEntity);

      if (!_skillSetRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      return NoContent();
    }

    //DELETE: api/Departments/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteDepartment(int id)
    {
      var departmentEntity = _skillSetRepository.ReadDepartment(id);
      if (departmentEntity == null)
      {
        return NotFound();
      }

      _skillSetRepository.DeleteDepartment(departmentEntity);

      if (!_skillSetRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      return NoContent();
    }
  }
}
