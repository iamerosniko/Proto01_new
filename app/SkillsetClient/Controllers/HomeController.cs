using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkillsetClient.Models;
using System.Diagnostics;
using System.Net.Http;

namespace SkillsetClient.Controllers
{
  public class HomeController : Controller
  {
    private HttpClient _client;
    private TokenFactory _tokenFactory;

    public HomeController()
    {
      _tokenFactory = new TokenFactory();
      _client = new HttpClient();
    }

    public IActionResult Index()
    {
      if (HttpContext.User.Identity.Name == "" || HttpContext.User.Identity.Name == null)
      {
        return Redirect("~/Auth/SignIn");
      }
      return View();
    }

    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
  }
}
