using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace SkillsetClient.Controllers
{
  [EnableCors("CORS")]
  [Produces("application/json")]
  [Route("api/Clean")]
  public class CleanController : Controller
  {
    public string _apiURL;
    private ApiAccess _webApiAccess;
    private HttpClient _client;

    public CleanController()
    {
      _webApiAccess = new ApiAccess("CleanSkillsetApplication");
      _apiURL = Startup.Configuration["WebApiServer:ApiURL"];
      _apiURL = _apiURL + "/CleanSkillsetApplication";
      //instantiate client
      _client = new HttpClient();
    }
    [HttpPost]
    public async Task<string> Post()
    {
      //_webApiAccess.AssignAuthorization(HttpContext.Session.GetString("apiToken"));
      try
      {
        var request = await _client.PostAsync(_apiURL, null);

        if (request.IsSuccessStatusCode)
        {
          var result = request.Content.ReadAsStringAsync().Result;
          return result;
        }
        return null;
      }
      catch
      {
        return null;
      }
    }
  }
}
