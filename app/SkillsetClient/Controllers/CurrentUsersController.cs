using Microsoft.AspNetCore.Mvc;
using SkillsetClient.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SkillsetClient.Controllers
{
  [Produces("application/json")]
  [Route("api/CurrentUsers")]
  public class CurrentUsersController : Controller
  {
    private string _user;
    // GET: api/CurrentUsers
    [HttpGet("{username}")]
    public async Task<CurrentUser> Get(string username)
    {
      CurrentUser currentUser = new CurrentUser();

      username = username.ToLower();

      var setUsersController = new SetUsersController();
      var setUserAccessController = new SetUserAccessesController();
      var setGroupsController = new SetGroupsController();

      //determine if the user is available 
      try
      {
        //get all
        var users = await setUsersController.Get();
        var groups = await setGroupsController.Get();
        var userAccesses = await setUserAccessController.Get();

        //filter
        var user = users.Where(x => x.user_name == username).FirstOrDefault();

        if (user != null)
        {
          var userAccess = userAccesses.Where(x => x.user_id == user.user_id).FirstOrDefault();

          if (userAccess != null)
          {
            var group = groups.Where(x => x.grp_id == userAccess.grp_id).FirstOrDefault();
            currentUser.UserID = user.user_id;
            currentUser.FirstName = user.user_first_name;
            currentUser.LastName = user.user_last_name;
            currentUser.Role = group.grp_name;
            currentUser.UserName = username;
          }
        }
        else
        {
          return null;
        }
      }
      catch (Exception ex)
      {
        currentUser = new CurrentUser()
        {
          Role = "noaccess",
          FirstName = ex.ToString()
        };
      }

      return currentUser;
    }

    //authentication
    public List<Claim> getCurrentClaims(CurrentUser currentUser)
    {

      List<Claim> claims = new List<Claim>();

      claims.Add(new Claim(ClaimTypes.GivenName, currentUser == null ? "" : currentUser.FirstName));
      claims.Add(new Claim(ClaimTypes.Surname, currentUser == null ? "" : currentUser.LastName));
      claims.Add(new Claim(ClaimTypes.Role, currentUser == null ? "" : currentUser.Role));


      return claims;
    }

  }
}
