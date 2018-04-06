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
    [Route("api/AssociateDepartmentSkillsets")]
    public class AssociateDepartmentSkillsetsController : Controller
    {
        private ApiAccess _webApiAccess;

        public AssociateDepartmentSkillsetsController()
        {
            _webApiAccess = new ApiAccess("AssociateDepartmentSkillsets");
        }
        // GET: api/AssociateDepartmentSkillsets
        [HttpGet]
        public async Task<SS_AssociateDepartmentSkillsets[]> Get()
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest();
            return JsonConvert.DeserializeObject<SS_AssociateDepartmentSkillsets[]>(result.ToString());
        }

        // GET: api/AssociateDepartmentSkillsets/5
        [HttpGet("{id}")]
        public async Task<SS_AssociateDepartmentSkillsets> Get(int id)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest(id.ToString());
            return JsonConvert.DeserializeObject<SS_AssociateDepartmentSkillsets>(result.ToString());
        }

        // POST: api/AssociateDepartmentSkillsets
        [HttpPost]
        public async Task<SS_AssociateDepartmentSkillsets> Post([FromBody]SS_AssociateDepartmentSkillsets body)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var content = JsonConvert.SerializeObject(body);

            var result = await _webApiAccess.PostRequest(content);
            return JsonConvert.DeserializeObject<SS_AssociateDepartmentSkillsets>(result.ToString());
        }

        // PUT: api/AssociateDepartmentSkillsets/5
        [HttpPut("{id}")]
        public async Task<SS_AssociateDepartmentSkillsets> Put(int id, [FromBody]SS_AssociateDepartmentSkillsets body)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var content = JsonConvert.SerializeObject(body);

            var result = await _webApiAccess.PutRequest(id.ToString(), content);
            return JsonConvert.DeserializeObject<SS_AssociateDepartmentSkillsets>(result.ToString());
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));

            var result = await _webApiAccess.DeleteRequest(id.ToString());
            return result;
        }
    }
}
