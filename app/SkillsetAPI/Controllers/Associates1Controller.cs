using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillsetAPI.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetAPI.Controllers
{
  [Produces("application/json")]
  [Route("api/Associates1")]
  public class Associates1Controller : Controller
  {
    private readonly SkillSetContext _context;

    public Associates1Controller(SkillSetContext context)
    {
      _context = context;
    }

    // GET: api/Associates1
    [HttpGet]
    public IEnumerable<Associate> GetAssociates()
    {
      return _context.Associates;
    }

    // GET: api/Associates1/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetAssociate([FromRoute] int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var associate = await _context.Associates.SingleOrDefaultAsync(m => m.AssociateID == id);

      if (associate == null)
      {
        return NotFound();
      }

      return Ok(associate);
    }

    // PUT: api/Associates1/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAssociate([FromRoute] int id, [FromBody] Associate associate)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != associate.AssociateID)
      {
        return BadRequest();
      }

      _context.Entry(associate).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!AssociateExists(id))
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

    [HttpPut("bulkput")]
    public async Task<IActionResult> PutAssociate([FromBody] List<Associate> associates)
    {
      if (associates == null)
      {
        return BadRequest();
      }

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      foreach (var assoc in associates)
      {
        var associate = await _context.Associates.SingleOrDefaultAsync(x => x.FullName == assoc.FullName);
        if (associate != null)
        {
          associate.PhoneNumber = assoc.PhoneNumber;

          await PutAssociate(associate.AssociateID, associate);

        }
      }

      return NoContent();
    }

    // POST: api/Associates1
    [HttpPost]
    public async Task<IActionResult> PostAssociate([FromBody] Associate associate)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _context.Associates.Add(associate);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetAssociate", new { id = associate.AssociateID }, associate);
    }

    // DELETE: api/Associates1/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAssociate([FromRoute] int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var associate = await _context.Associates.SingleOrDefaultAsync(m => m.AssociateID == id);
      if (associate == null)
      {
        return NotFound();
      }

      _context.Associates.Remove(associate);
      await _context.SaveChangesAsync();

      return Ok(associate);
    }

    private bool AssociateExists(int id)
    {
      return _context.Associates.Any(e => e.AssociateID == id);
    }
  }
}
