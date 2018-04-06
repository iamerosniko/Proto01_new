using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace SkillsetClient.Controllers
{
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