using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SkillsetClient.Models;

namespace SkillsetClient.Controllers
{
    [Produces("application/json")]
    [Route("api/SetGroups")]
    public class SetGroupsController : Controller
    {
        // GET: api/SetGroups
        private ApiAccess _webApiAccess;

        public SetGroupsController()
        {
            _webApiAccess = new ApiAccess("SetGroups");
        }

        [HttpGet]
        public async Task<SetGroup[]> Get()
        {
            //_webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest();
            return JsonConvert.DeserializeObject<SetGroup[]>(result.ToString());
        }

        // GET: api/SetGroups/5
        [HttpGet("{id}")]
        public async Task<SS_Skillsets> Get(string id)
        {
            //_webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest();
            return JsonConvert.DeserializeObject<SS_Skillsets>(result.ToString());
        }
    }
}
