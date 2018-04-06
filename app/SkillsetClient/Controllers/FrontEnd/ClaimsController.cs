using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SkillsetClient.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;

namespace SkillsetClient.Controllers.FrontEnd
{
  [Produces("application/json")]
  [Route("api/Claims")]
  public class ClaimsController : Controller
  {
    // GET: api/Claims
    [Route("SignedInUsername")]
    [HttpGet]
    public MySignedInUser GetSignInUsername()
    {
      var username = this.User.Identity.Name;
      return new MySignedInUser
      {
        UserName = username
      };
    }

    [Route("Authenticate")]
    [HttpPost("{username}")]
    public async Task<AppToken> GetAuthenticationToken([FromRoute] string username)
    {
      var currentUserController = new CurrentUsersController();
      var currentUser = await currentUserController.Get(username);

      //create a token and save to session ('authToken');
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Startup.Configuration["IDPServer:IssuerSigningKey"]));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
      var token = new JwtSecurityToken(
         claims: currentUserController.getCurrentClaims(currentUser),
         signingCredentials: creds
      );

      var myToken = new JwtSecurityTokenHandler().WriteToken(token);

      return new AppToken
      {
        Token = myToken,
        TokenName = "Authorization"
      };
    }
  }

  public class MySignedInUser
  {
    public string UserName { get; set; }
  }
}
