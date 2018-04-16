using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace SkillsetClient.Controllers
{
  public class ApiAccess
  {
    private string _apiURL;
    private string _apiToken;
    private HttpClient _client;

    public ApiAccess(string controller)
    {
      _apiURL = Startup.Configuration["WebApiServer:ApiURL"];
      _apiURL = _apiURL + "/" + controller;

      //instantiate client
      _client = new HttpClient();

    }

    public void AssignAuthorization(string token)
    {
      _apiToken = token;
      _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiToken);
    }


    public async Task<string> PostRequest(string body)
    {
      var content = new StringContent(body, Encoding.UTF8, "application/json");

      try
      {
        var request = await _client.PostAsync(_apiURL, content);

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

    public async Task<string> PutRequest(string id, string body)
    {
      var content = new StringContent(body, Encoding.UTF8, "application/json");
      var apiUrl = _apiURL + "/" + id;

      try
      {
        var request = await _client.PutAsync(apiUrl, content);

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

    public async Task<bool> DeleteRequest(string id)
    {
      bool isSuccess = false;
      try
      {
        var request = await _client.DeleteAsync(_apiURL + "/" + id);

        isSuccess = request.IsSuccessStatusCode;
      }
      catch
      {
        return false;
      }

      return isSuccess;
    }

    public async Task<string> GetRequest()
    {
      try
      {
        var request = await _client.GetAsync(_apiURL);
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

    public async Task<string> GetRequest(string id)
    {
      try
      {
        var request = await _client.GetAsync(_apiURL + "/" + id);
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
