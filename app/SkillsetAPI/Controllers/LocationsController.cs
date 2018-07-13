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
  [Route("api/Locations")]
  public class LocationsController : Controller
  {
    private ISkillSetRepository _skillSetRepository;

    public LocationsController(ISkillSetRepository skillSetRepository)
    {
      _skillSetRepository = skillSetRepository;
    }

    // GET: api/Locations
    [HttpGet()]
    public IActionResult GetLocations()
    {
      var locationsResult = _skillSetRepository.ReadLocations();

      return Ok(locationsResult.Where(x => x.IsActive == true));
    }

    //GET: api/Locations/{id}
    [HttpGet("{id}", Name = "GetLocation")]
    public IActionResult GetLocation(int id)
    {
      var locationResult = _skillSetRepository.ReadLocation(id);

      if (locationResult == null)
      {
        return NotFound();
      }

      return Ok(locationResult);
    }

    //POST: api/Locations
    [HttpPost()]
    public IActionResult PostDepartment([FromBody] LocationForCreateDTO location)
    {
      if (location == null)
      {
        return BadRequest();
      }

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var newLocationEntity = Mapper.Map<Entities.Location>(location);

      _skillSetRepository.CreateLocation(newLocationEntity);

      if (!_skillSetRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      return CreatedAtRoute("GetLocation",
              new { id = newLocationEntity.LocationID }, newLocationEntity);
    }

    //PUT: api/Locations
    [HttpPut("{id}")]
    public IActionResult PutLocation(int id, [FromBody] LocationForUpdateDTO location)
    {
      if (location == null)
      {
        return BadRequest();
      }

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var locationEntity = _skillSetRepository.ReadLocation(id);
      if (locationEntity == null)
      {
        return NotFound();
      }

      Mapper.Map(location, locationEntity);

      if (!_skillSetRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      return NoContent();
    }

    //DELETE: api/Locations/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteLocation(int id)
    {
      var locationEntity = _skillSetRepository.ReadLocation(id);
      if (locationEntity == null)
      {
        return NotFound();
      }

      _skillSetRepository.DeleteLocation(locationEntity);

      if (!_skillSetRepository.Save())
      {
        return StatusCode(500, "A problem happened while handling your request.");
      }

      return NoContent();
    }
  }
}
