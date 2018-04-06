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
    [Route("api/Associates")]
    public class AssociatesController : Controller
    {
        private ApiAccess _webApiAccess;

        public AssociatesController()
        {
            _webApiAccess = new ApiAccess("Associates");
        }
        // GET: api/Associates
        [HttpGet]
        public async Task<SS_Associates[]> Get()
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest();
            return JsonConvert.DeserializeObject<SS_Associates[]>(result.ToString());
        }

        // GET: api/Associates/5
        [HttpGet("{id}")]
        public async Task<SS_Associates> Get(int id)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest(id.ToString());
            return JsonConvert.DeserializeObject<SS_Associates>(result.ToString());
        }
        // POST: api/Associates
        [HttpPost]
        public async Task<SS_Associates> Post([FromBody]SS_Associates body)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var content = JsonConvert.SerializeObject(body);

            var result = await _webApiAccess.PostRequest(content);
            return JsonConvert.DeserializeObject<SS_Associates>(result.ToString());
        }

        // PUT: api/Associates/5
        [HttpPut("{id}")]
        public async Task<SS_Associates> Put(int id, [FromBody]SS_Associates body)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var content = JsonConvert.SerializeObject(body);

            var result = await _webApiAccess.PutRequest(id.ToString(), content);
            return JsonConvert.DeserializeObject<SS_Associates>(result.ToString());
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
