using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillsetAPI.Entities;

namespace SkillsetAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/MyUsers")]
    public class MyUsersController : Controller
    {
        private readonly SkillSetContext _context;

        public MyUsersController(SkillSetContext context)
        {
            _context = context;
        }

        // GET: api/MyUsers
        [HttpGet]
        public IEnumerable<SetUser> GetSetUsers()
        {
            return _context.SetUsers;
        }

        // GET: api/MyUsers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSetUser([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var setUser = await _context.SetUsers.SingleOrDefaultAsync(m => m.user_id == id);

            if (setUser == null)
            {
                return NotFound();
            }

            return Ok(setUser);
        }

        // PUT: api/MyUsers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSetUser([FromRoute] string id, [FromBody] SetUser setUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != setUser.user_id)
            {
                return BadRequest();
            }

            _context.Entry(setUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SetUserExists(id))
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

        // POST: api/MyUsers
        [HttpPost]
        public async Task<IActionResult> PostSetUser([FromBody] SetUser setUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SetUsers.Add(setUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSetUser", new { id = setUser.user_id }, setUser);
        }

        // DELETE: api/MyUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSetUser([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var setUser = await _context.SetUsers.SingleOrDefaultAsync(m => m.user_id == id);
            if (setUser == null)
            {
                return NotFound();
            }

            _context.SetUsers.Remove(setUser);
            await _context.SaveChangesAsync();

            return Ok(setUser);
        }

        private bool SetUserExists(string id)
        {
            return _context.SetUsers.Any(e => e.user_id == id);
        }
    }
}