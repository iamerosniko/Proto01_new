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
    [Route("api/Departments")]
    public class DepartmentsController : Controller
    {
        private ApiAccess _webApiAccess;

        public DepartmentsController()
        {
            _webApiAccess = new ApiAccess("Departments");
        }
        // GET: api/Departments
        [HttpGet]
        public async Task<SS_Departments[]> Get()
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest();
            return JsonConvert.DeserializeObject<SS_Departments[]>(result.ToString());
        }

        // GET: api/Departments/5
        [HttpGet("{id}")]
        public async Task<SS_Departments> Get(int id)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest(id.ToString());
            return JsonConvert.DeserializeObject<SS_Departments>(result.ToString());
        }

        // POST: api/Departments
        [HttpPost]
        public async Task<SS_Departments> Post([FromBody]SS_Departments body)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var content = JsonConvert.SerializeObject(body);

            var result = await _webApiAccess.PostRequest(content);
            return JsonConvert.DeserializeObject<SS_Departments>(result.ToString());
        }

        // PUT: api/Departments/5
        [HttpPut("{id}")]
        public async Task<SS_Departments> Put(int id, [FromBody]SS_Departments body)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var content = JsonConvert.SerializeObject(body);

            var result = await _webApiAccess.PutRequest(id.ToString(), content);
            return JsonConvert.DeserializeObject<SS_Departments>(result.ToString());
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
