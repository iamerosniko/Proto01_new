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
    [Route("api/Locations")]
    public class LocationsController : Controller
    {
        // GET: api/Locations
        private ApiAccess _webApiAccess;

        public LocationsController()
        {
            _webApiAccess = new ApiAccess("Locations");
        }
        // GET: api/Location
        [HttpGet]
        public async Task<SS_Locations[]> Get()
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest();
            return JsonConvert.DeserializeObject<SS_Locations[]>(result.ToString());
        }

        // GET: api/Location/5
        [HttpGet("{id}")]
        public async Task<SS_Locations> Get(int id)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var result = await _webApiAccess.GetRequest(id.ToString());
            return JsonConvert.DeserializeObject<SS_Locations>(result.ToString());
        }

        // POST: api/Location
        [HttpPost]
        public async Task<SS_Locations> Post([FromBody]SS_Locations body)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var content = JsonConvert.SerializeObject(body);

            var result = await _webApiAccess.PostRequest(content);
            return JsonConvert.DeserializeObject<SS_Locations>(result.ToString());
        }

        // PUT: api/Location/5
        [HttpPut("{id}")]
        public async Task<SS_Locations> Put(int id, [FromBody]SS_Locations body)
        {
            _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
            var content = JsonConvert.SerializeObject(body);

            var result = await _webApiAccess.PutRequest(id.ToString(), content);
            return JsonConvert.DeserializeObject<SS_Locations>(result.ToString());
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
