using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SkillsetClient.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;

namespace SkillsetClient.Controllers
{
  [Produces("application/json")]
  [Route("api/Claims")]
  public class ClaimsController : Controller
  {
    private TokenFactory _tokenFactory;

    // GET: api/Claims
    [Route("SignedInUsername")]
    [HttpGet]
    public async Task<CurrentUser> GetSignInUsername()
    {
      var currentUserController = new CurrentUsersController();

      var username = this.User.Identity.Name;
      var currentUser = await currentUserController.Get(username);

      return currentUser;
    }

    [Route("Authenticate")]
    [HttpPost]
    public async Task<AppToken> GetAuthenticationToken([FromBody] CurrentUser user)
    {

      var currentUserController = new CurrentUsersController();
      var currentUser = await currentUserController.Get(user.UserName);

      if (currentUser != null)
      {
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
          TokenName = "Authentication"
        };
      }
      else
      {
        return new AppToken
        {
          TokenName = "Authentication"
        };
      }
      //create a token and save to session ('authToken');

    }

    [Route("AuthorizeUser")]
    [HttpPost]
    //public async Task<AppToken> GetAuthorizationToken([FromBody] string authenticationtoken)
    public AppToken GetAuthorizationToken([FromBody] AppToken authenticationToken)
    {
      _tokenFactory = new TokenFactory();

      if (authenticationToken != null)
      {
        //1)Extracttoken is used to extract all details required before generating an authorization token
        //2)GenerateAuthorizationToken is used to generate Authorization token
        var authorizationToken = _tokenFactory.GenerateAuthorizationToken(_tokenFactory.ExtractToken(authenticationToken.Token));
        HttpContext.Session.SetString("apiToken", authorizationToken);
        return new AppToken
        {
          Token = authorizationToken,
          TokenName = "Authorization"
        };
      }
      return new AppToken
      {
        TokenName = "Authorization"
      };
    }
  }

  //public class MySignedInUser
  //{
  //  public string UserName { get; set; }
  //  public string FirstName { get; set; }
  //  public string LastName { get; set; }
  //  public string Role { get; set; }
  //}
}
