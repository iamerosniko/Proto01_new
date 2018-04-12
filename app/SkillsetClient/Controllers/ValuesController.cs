using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
namespace SkillsetClient.Controllers
{

  [Produces("application/json")]
  [Route("api/Values")]
  public class ValuesController : Controller
  {
    //IHttpContextAccessor _accessor;
    //public ValuesController(IHttpContextAccessor httpContextAccessor)
    //{
    //    //_accessor = httpContextAccessor;
    //}

    [HttpGet]

    public List<string> Get()
    {
      List<string> a = new List<string>();
      try
      {
        IEnumerable<Claim> claims = ((ClaimsIdentity)User.Identity).Claims;

        //IEnumerable<Claim> claims = System.Security.Principal.WindowsIdentity.GetAnonymous().Claims;
        //Claim displayName = ClaimsPrincipal.Current.FindFirst(ClaimsPrincipal.Current.Identities.First().NameClaimType);

        foreach (var vb in claims)
        {
          a.Add(vb.Type);
          a.Add(vb.Value);

          //a.Add(vb.Subject.Name);
          //a.Add(vb.ValueType);
          //a.Add(vb.Value);
        }
        //a.Add(System.Web.HttpContext.Current.User.Identity.Name.ToString());
        //a.Add(_accessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

        //var ipAddress = HttpContext.Connection.RemoteIpAddress;
        //var ipAddress2 = Environment.MachineName;
        //a.Add(ipAddress2);
        ////IPHostEntry entry = Dns.GetHostEntry(ipAddress);
        ////if (entry != null)
        ////{
        ////    a.Add(entry.HostName.ToString());
        ////}
        //a.Add(User.Identity.IsAuthenticated.ToString());


        //a.Add(_accessor.HttpContext.User.Identity.Name);
        a.Add(Request.HttpContext.User.Identity.Name);
        a.Add(HttpContext.Connection.RemoteIpAddress.ToString());
        a.Add(System.Security.Principal.WindowsIdentity.GetCurrent().AuthenticationType);
        a.Add(System.Security.Principal.WindowsIdentity.GetCurrent().Name);
        a.Add(this.User.Identity.Name);
        //var x = User.FindFirst(ClaimTypes.Name);

        ////a.Add(x.Value);
        //a.Add(Environment.UserName);
        //a.Add(User.Identity.Name);
        return a;

      }
      catch (Exception ex)
      {
        a.Add(ex.ToString());
        return a;
      }
    }

  }
}
