using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace SkillsetClient.Controllers
{
  [EnableCors("CORS")]
  [Route("auth")]
  public class AuthController : Controller
  {
    [Route("signin")]
    public IActionResult SignIn()
    {
      return Challenge(new AuthenticationProperties { RedirectUri = "/" });
    }
  }
}
