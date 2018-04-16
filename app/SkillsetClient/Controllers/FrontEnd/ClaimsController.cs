using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkillsetClient.Models;

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
    public CurrentUser GetSignInUsername()
    {
      var username = this.User.Identity.Name;

      return new CurrentUser
      {
        UserName = username
      };
    }

    [Route("AuthorizeUser")]
    [HttpPost]
    //public async Task<AppToken> GetAuthorizationToken([FromBody] string authenticationtoken)
    public AppToken GetAuthorizationToken([FromBody] AppToken authenticationToken)
    {
      _tokenFactory = new TokenFactory();

      if (authenticationToken.Token != "")
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
}
