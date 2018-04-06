using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SkillsetAPI.Models;
using SkillsetAPI.Services;
using System.Collections.Generic;

namespace SkillsetAPI.Controllers
{
    //[Authorize]
    //[EnableCors("AllowWebClient")]
    [Produces("application/json")]
    [Route("api/SetUsers")]
    public class SetUsersController : Controller
    {
        private ISkillSetRepository _skillSetRepository;

        public SetUsersController(ISkillSetRepository skillSetRepository)
        {
            _skillSetRepository = skillSetRepository;
        }

        // GET: api/SetUsers
        [HttpGet()]
        public IActionResult GetSetUsers()
        {
            var setUsersEntities = _skillSetRepository.ReadSetUsers();
            var results = Mapper.Map<IEnumerable<SetUserDTO>>(setUsersEntities);

            return Ok(results);
        }

        //GET: api/SetUsers/{id}
        [HttpGet("{id}")]
        public IActionResult GetSetUser(string id)
        {
            var setUser = _skillSetRepository.ReadSetUser(id);

            if (setUser == null)
            {
                return NotFound();
            }

            var setUserResult = Mapper.Map<SetUserDTO>(setUser);

            return Ok(setUserResult);
        }


    }
}
