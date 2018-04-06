using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace WebApplication4.Controllers
{
    [Produces("application/json")]
    [Route("api/Values")]
    public class ValuesController : Controller
    {
        // GET: api/Values

        private HttpClient _client;
        [HttpGet]
        public async Task<IEnumerable<string>> Get()
        {
            string result = "";
            try
            {
                _client = new HttpClient(new HttpClientHandler()
                {
                    UseDefaultCredentials = true
                });


                var request = await _client.GetAsync("https://betatestwinauth.azurewebsites.net/api/values/1");
                if (request.IsSuccessStatusCode)
                {
                    result = request.Content.ReadAsStringAsync().Result;
                }
            }
            catch
            {
                return null;
            }
            return new string[] { "value1", "value2", result
    };
        }

        // GET: api/Values/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Values/5
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
