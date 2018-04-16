using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace SkillsetClient.Controllers
{
  public class TokenFactory
  {
    private List<Claim> _claims;

    #region "Public Methods"
    public List<Claim> ExtractToken(String token)
    {
      List<Claim> claims = new List<Claim>();

      _claims = new List<Claim>();

      var jwtToken = new JwtSecurityToken(token);

      var names = jwtToken.Claims.
          Where(x => x.Type == ClaimTypes.Name);

      var roles = jwtToken.Claims.
          Where(x => x.Type == ClaimTypes.Role);

      var urls = jwtToken.Claims.
          Where(x => x.Type == ClaimTypes.Uri);

      var idS = jwtToken.Claims.
          Where(x => x.Type == ClaimTypes.Sid);

      var firstNames = jwtToken.Claims.
          Where(x => x.Type == ClaimTypes.GivenName);

      var surnames = jwtToken.Claims.
          Where(x => x.Type == ClaimTypes.Surname);

      AddToClaim(names);
      AddToClaim(roles);
      AddToClaim(urls);
      AddToClaim(firstNames);
      AddToClaim(surnames);

      claims = _claims;

      return claims;
    }

    public string GenerateAuthorizationToken(List<Claim> claims)
    {
      var key = new SymmetricSecurityKey(
          Encoding.UTF8.GetBytes(
              Startup.Configuration["WebApiServer:IssuerSigningKey"]));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      var token = new JwtSecurityToken(
          issuer: Startup.Configuration["WebApiServer:ValidIssuer"],
          audience: Startup.Configuration["WebApiServer:ValidAudience"],
          claims: claims,
          expires: DateTime.UtcNow.AddMinutes(30),
          signingCredentials: creds
      );

      System.Diagnostics.Debug.WriteLine(Startup.Configuration["WebApiServer:IssuerSigningKey"]);
      System.Diagnostics.Debug.WriteLine(Startup.Configuration["WebApiServer:ValidAudience"]);
      System.Diagnostics.Debug.WriteLine(Startup.Configuration["WebApiServer:ValidIssuer"]);

      var myToken = new JwtSecurityTokenHandler().WriteToken(token);

      return myToken;
    }

    #endregion

    #region "Private Methods"

    private void AddToClaim(IEnumerable<Claim> claims)
    {
      foreach (var claim in claims)
      {
        _claims.Add(claim);
      }
    }

    #endregion
  }
}
