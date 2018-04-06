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
    [Route("api/DepartmentSkillsets")]
    public class DepartmentSkillsetsController : Controller
    {
        private ApiAccess _webApiAccess;

        public DepartmentSkillsetsController()
        {
            _webApiAccess = new ApiAccess("DepartmentSkillsets");
        }
        // GET: api/DepartmentSkillsets
        [HttpGet]
        public async Task<SS_DepartmentSkillsets[]> Get()
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest();
            return JsonConvert.DeserializeObject<SS_DepartmentSkillsets[]>(result.ToString());
        }

        // GET: api/DepartmentSkillsets/5
        [HttpGet("{id}")]
        public async Task<SS_DepartmentSkillsets> Get(int id)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest(id.ToString());
            return JsonConvert.DeserializeObject<SS_DepartmentSkillsets>(result.ToString());
        }

        // POST: api/DepartmentSkillsets
        [HttpPost]
        public async Task<SS_DepartmentSkillsets> Post([FromBody]SS_DepartmentSkillsets body)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var content = JsonConvert.SerializeObject(body);

            var result = await _webApiAccess.PostRequest(content);
            return JsonConvert.DeserializeObject<SS_DepartmentSkillsets>(result.ToString());
        }

        // PUT: api/DepartmentSkillsets/5
        public async Task<SS_DepartmentSkillsets> Put(int id, [FromBody]SS_DepartmentSkillsets body)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var content = JsonConvert.SerializeObject(body);

            var result = await _webApiAccess.PutRequest(id.ToString(), content);
            return JsonConvert.DeserializeObject<SS_DepartmentSkillsets>(result.ToString());
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
