using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillsetAPI.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Controllers
{
  [Produces("application/json")]
  [Route("api/SkillsetsSpecial")]
  public class SkillsetsSpecialController : Controller
  {
    private readonly SkillSetContext _context;

    public SkillsetsSpecialController(SkillSetContext context)
    {
      _context = context;
    }

    // GET: api/SkillsetsSpecial
    [HttpGet]
    public IEnumerable<Skillset> GetSkillsets()
    {
      return _context.Skillsets;
    }

    // GET: api/SkillsetsSpecial/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetSkillset([FromRoute] int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var skillset = await _context.Skillsets.SingleOrDefaultAsync(m => m.SkillsetID == id);

      if (skillset == null)
      {
        return NotFound();
      }

      return Ok(skillset);
    }

    // PUT: api/SkillsetsSpecial/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutSkillset([FromRoute] int id, [FromBody] Skillset skillset)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != skillset.SkillsetID)
      {
        return BadRequest();
      }

      _context.Entry(skillset).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!SkillsetExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/SkillsetsSpecial
    [HttpPost]
    public async Task<IActionResult> PostSkillset([FromBody] Skillset skillset)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _context.Skillsets.Add(skillset);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetSkillset", new { id = skillset.SkillsetID }, skillset);
    }

    [HttpPost("Bulk")]
    public async Task<IActionResult> PostSkillsets([FromBody] List<Skillset> skillsets)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      for (int i = 0; i < skillsets.Count; i++)
      {
        var a = await PostSkillset(skillsets[i]);
      }

      return Ok(skillsets);
    }

    // DELETE: api/SkillsetsSpecial/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSkillset([FromRoute] int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var skillset = await _context.Skillsets.SingleOrDefaultAsync(m => m.SkillsetID == id);
      if (skillset == null)
      {
        return NotFound();
      }

      _context.Skillsets.Remove(skillset);
      await _context.SaveChangesAsync();

      return Ok(skillset);
    }

    private bool SkillsetExists(int id)
    {
      return _context.Skillsets.Any(e => e.SkillsetID == id);
    }
  }
}
