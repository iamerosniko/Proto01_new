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
    [Route("api/AssociateDepartmentSkillsets")]
    public class AssociateDepartmentSkillsetsController : Controller
    {
        private ISkillSetRepository _skillSetRepository;

        public AssociateDepartmentSkillsetsController(ISkillSetRepository skillSetRepository)
        {
            _skillSetRepository = skillSetRepository;
        }

        // GET: api/AssociateDepartmentSkillsets
        [HttpGet()]
        public IActionResult GetAssociateDepartmentSkillsets()
        {
            var associateDepartmentSkillsetssResult = _skillSetRepository.ReadAssociateDepartmentSkillsets();

            return Ok(associateDepartmentSkillsetssResult);
        }

        //GET: api/AssociateDepartmentSkillsets/{id}
        [HttpGet("{id}", Name = "GetAssociateDepartmentSkillset")]
        public IActionResult GetAssociateDepartmentSkillset(int id)
        {
            var associateDepartmentSkillsetResult = _skillSetRepository.ReadAssociateDepartmentSkillset(id);

            if (associateDepartmentSkillsetResult == null)
            {
                return NotFound();
            }

            return Ok(associateDepartmentSkillsetResult);
        }

        //POST: api/AssociateDepartmentSkillsets
        [HttpPost()]
        public IActionResult PostAssociateDepartmentSkillset([FromBody] AssociateDepartmentSkillsetForCreateDTO associateDepartmentSkillset)
        {
            if (associateDepartmentSkillset == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newAssociateDepartmentSkillsetEntity = Mapper.Map<Entities.AssociateDepartmentSkillset>(associateDepartmentSkillset);

            _skillSetRepository.CreateAssociateDepartmentSkillset(newAssociateDepartmentSkillsetEntity);

            if (!_skillSetRepository.Save())
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            return CreatedAtRoute("GetAssociateDepartmentSkillset",
                    new { id = newAssociateDepartmentSkillsetEntity.AssociateDepartmentSkillsetID }, newAssociateDepartmentSkillsetEntity);
        }

        //PUT: api/AssociateDepartmentSkillsets
        [HttpPut("{id}")]
        public IActionResult PutAssociateDepartmentSkillset(int id, [FromBody] AssociateDepartmentSkillsetForCreateDTO associateDepartmentSkillset)
        {
            if (associateDepartmentSkillset == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var associateDepartmentSkillsetEntity = _skillSetRepository.ReadAssociateDepartmentSkillset(id);
            if (associateDepartmentSkillsetEntity == null)
            {
                return NotFound();
            }

            Mapper.Map(associateDepartmentSkillset, associateDepartmentSkillsetEntity);

            if (!_skillSetRepository.Save())
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            return NoContent();
        }

        //DELETE: api/AssociateDepartmentSkillsets/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteAssociateDepartmentSkillset(int id)
        {
            var associateDepartmentSkillsetEntity = _skillSetRepository.ReadAssociateDepartmentSkillset(id);
            if (associateDepartmentSkillsetEntity == null)
            {
                return NotFound();
            }

            _skillSetRepository.DeleteAssociateDepartmentSkillset(associateDepartmentSkillsetEntity);

            if (!_skillSetRepository.Save())
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            return NoContent();
        }
    }
}