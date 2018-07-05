using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SkillsetClient.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkillsetClient.Controllers
{
  [EnableCors("CORS")]
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
      return JsonConvert.DeserializeObject<SS_Associates[]>(result.ToString()).OrderBy(x => x.FullName).ToArray();
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

    [HttpPost("Bulk")]
    public async Task<List<SS_Associates>> BulkPost([FromBody]List<SS_Associates> bodies)
    {
      _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
      _webApiAccess._apiURL += "/Bulk";

      var content = JsonConvert.SerializeObject(bodies);
      try
      {
        var result = await _webApiAccess.PostRequest(content);
        return JsonConvert.DeserializeObject<List<SS_Associates>>(result.ToString());

      }
      catch (Exception Ex)
      {
        System.Diagnostics.Debug.WriteLine(Ex.ToString());
      }
      return null;
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

    [HttpDelete("bulkdelete")]
    public async Task<bool> BulkDelete()
    {
      _webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
      var assocs = await Get();

      foreach (var assoc in assocs)
      {
        var result = await _webApiAccess.DeleteRequest(assoc.AssociateID.ToString());
      }
      return true;
    }
  }
}
