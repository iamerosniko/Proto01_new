using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SkillsetClient.Controllers.FrontEnd
{
    [Produces("application/json")]
    [Route("api/Claims")]
    public class ClaimsController : Controller
    {
        // GET: api/Claims
        [Route("SignedInUsername")]
        [HttpGet]
        public string Get()
        {
            var username = this.User.Identity.Name;
            return username == null ? "" : username;
        }

        // GET: api/Claims/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: api/Claims
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Claims/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
