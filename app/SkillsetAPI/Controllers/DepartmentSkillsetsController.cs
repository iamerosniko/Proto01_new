using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SkillsetAPI.Models;
using SkillsetAPI.Services;

namespace SkillsetAPI.Controllers
{
    [Authorize]
    [EnableCors("AllowWebClient")]
    [Produces("application/json")]
    [Route("api/DepartmentSkillsets")]
    public class DepartmentSkillsetsController : Controller
    {
        private ISkillSetRepository _skillSetRepository;

        public DepartmentSkillsetsController(ISkillSetRepository skillSetRepository)
        {
            _skillSetRepository = skillSetRepository;
        }

        // GET: api/DepartmentSkillsets
        [HttpGet()]
        public IActionResult GetDepartmentSkillsets()
        {
            var departmentSkillsetssResult = _skillSetRepository.ReadDepartmentSkillsets();

            return Ok(departmentSkillsetssResult);
        }

        //GET: api/DepartmentSkillsets/{id}
        [HttpGet("{id}", Name = "GetDepartmentSkillset")]
        public IActionResult GetDepartmentSkillset(int id)
        {
            var departmentSkillsetResult = _skillSetRepository.ReadDepartmentSkillset(id);

            if (departmentSkillsetResult == null)
            {
                return NotFound();
            }

            return Ok(departmentSkillsetResult);
        }

        //POST: api/DepartmentSkillsets
        [HttpPost()]
        public IActionResult PostDepartmentSkillset([FromBody] DepartmentSkillsetForCreateDTO departmentSkillset)
        {
            if (departmentSkillset == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newDepartmentSkillsetEntity = Mapper.Map<Entities.DepartmentSkillset>(departmentSkillset);

            _skillSetRepository.CreateDepartmentSkillset(newDepartmentSkillsetEntity);

            if (!_skillSetRepository.Save())
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            return CreatedAtRoute("GetDepartmentSkillset",
                    new { id = newDepartmentSkillsetEntity.DepartmentSkillsetID }, newDepartmentSkillsetEntity);
        }

        //PUT: api/DepartmentSkillsets
        [HttpPut("{id}")]
        public IActionResult PutDepartmentSkillset(int id, [FromBody] DepartmentSkillsetForCreateDTO departmentSkillset)
        {
            if (departmentSkillset == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var departmentSkillsetEntity = _skillSetRepository.ReadDepartmentSkillset(id);
            if (departmentSkillsetEntity == null)
            {
                return NotFound();
            }

            Mapper.Map(departmentSkillset, departmentSkillsetEntity);

            if (!_skillSetRepository.Save())
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            return NoContent();
        }

        //DELETE: api/DepartmentSkillsets/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteDepartmentSkillset(int id)
        {
            var departmentSkillsetEntity = _skillSetRepository.ReadDepartmentSkillset(id);
            if (departmentSkillsetEntity == null)
            {
                return NotFound();
            }

            _skillSetRepository.DeleteDepartmentSkillset(departmentSkillsetEntity);

            if (!_skillSetRepository.Save())
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            return NoContent();
        }
    }
}