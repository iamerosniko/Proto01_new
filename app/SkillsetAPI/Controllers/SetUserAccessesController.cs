using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using SkillsetAPI.Services;

namespace SkillsetAPI.Controllers
{
    //[Authorize]
    [EnableCors("AllowWebClient")]
    [Produces("application/json")]
    [Route("api/SetUserAccesses")]
    public class SetUserAccessesController : Controller
    {
        private ISkillSetRepository _skillSetRepository;

        public SetUserAccessesController(ISkillSetRepository skillSetRepository)
        {
            _skillSetRepository = skillSetRepository;
        }

        // GET: api/SetUserAccesses
        [HttpGet()]
        public IActionResult GetSetUserAccesses()
        {
            var setUserAccessesEnntitiesResults = _skillSetRepository.ReadSetUserAccesses();

            return Ok(setUserAccessesEnntitiesResults);
        }

        //GET: api/SetUserAccesses/{id}
        [HttpGet("{id}")]
        public IActionResult GetSetUserAccess(int id)
        {
            var setUserAccessResult = _skillSetRepository.ReadSetUserAccess(id);

            if (setUserAccessResult == null)
            {
                return NotFound();
            }

            return Ok(setUserAccessResult);
        }
    }
}