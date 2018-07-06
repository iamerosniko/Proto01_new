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
  [EnableCors("AllowWebClient")]
  [Produces("application/json")]
  [Route("api/Skillsets")]
  public class SkillsetsController : Controller
  {
    private ISkillSetRepository _skillSetRepository;

    public SkillsetsController(ISkillSetRepository skillSetRepository)
    {
      _skillSetRepository = skillSetRepository;
    }

    // GET: api/Skillsets
    [HttpGet()]
    public IActionResult GetSkillsets()
    {
      var skillsetssResult = _skillSetRepository.ReadSkillsets();

      return Ok(skillsetssResult.Where(x => x.IsActive == true));
    }

    //GET: api/Skillsets/{id}
    [HttpGet("{id}", Name = "GetSkillset")]
    public IActionResult GetSkillset(int id)
    {
      var skillsetResult = _skillSetRepository.ReadSkillset(id);

      if (skillsetResult == null)
      {
        return NotFound();
      }

      return Ok(skillsetResult);
    }

    //POST: api/Skillsets
    [HttpPost()]
    public IActionResult PostSkillset([FromBody] SkillsetForCreateDTO skillset)
    {
      if (skillset == null)
      {
        return BadRequest();
      }

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var newSkillsetEntity = Mapper.Map<Entities.Skillset>(skillset);

      _skillSetRepository.CreateSkillset(newSkillsetEntity);

      if (!_skillSetRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      return CreatedAtRoute("GetLocation",
              new { id = newSkillsetEntity.SkillsetID }, newSkillsetEntity);
    }

    //PUT: api/Skillsets
    [HttpPut("{id}")]
    public IActionResult PutSkillset(int id, [FromBody] SkillsetForUpdateDTO skillset)
    {
      if (skillset == null)
      {
        return BadRequest();
      }

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var skillsetEntity = _skillSetRepository.ReadSkillset(id);
      if (skillsetEntity == null)
      {
        return NotFound();
      }

      Mapper.Map(skillset, skillsetEntity);

      if (!_skillSetRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      return NoContent();
    }

    //DELETE: api/Skillsets/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteSkillset(int id)
    {
      var skillsetEntity = _skillSetRepository.ReadSkillset(id);
      if (skillsetEntity == null)
      {
        return NotFound();
      }

      _skillSetRepository.DeleteSkillset(skillsetEntity);

      if (!_skillSetRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      return NoContent();
    }
  }
}
